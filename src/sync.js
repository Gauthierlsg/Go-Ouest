import {
  getAppMode,
  getState,
  mergeStates,
  registerMutationHandler,
  replaceState,
  setAppMode,
} from './state.js';
import { supabase } from './supabase.js';
import { apiRequest } from './api.js';
import { setStatus } from './ui.js';

const POLL_INTERVAL_MS = 60_000;
const API_TOURNAMENT = '/api/tournament';
const API_ADMIN_SESSION = '/api/admin/session';

let pollTimer = null;
let realtimeChannel = null;
let remoteBootError = null;
let tournamentWriteQueue = Promise.resolve();
let shouldDelayFn = () => false;

export function setShouldDelay(fn) {
  shouldDelayFn = fn;
}

export async function boot() {
  const sessionState = await fetchAdminSessionState();
  const remoteReady = await connectRemote(sessionState);

  if (!remoteReady) {
    enableLocalFallback(remoteBootError, sessionState);
  }
}

export async function refreshRemoteState(options = {}) {
  const { silent = false, forceRender = false } = options;
  if (!getAppMode().remote) return;
  if (shouldDelayFn()) return;

  try {
    const tournament = await apiRequest(API_TOURNAMENT);
    const { changed } = replaceState(tournament.state, {
      persist: true,
      notify: true,
    });
    setAppMode(
      { lastRemoteUpdate: tournament.updatedAt ?? null },
      { forceNotify: forceRender && !changed }
    );
  } catch (error) {
    if (error.status === 401) {
      setAppMode({ admin: false, readOnly: true });
    }
    if (!silent) {
      setStatus(error.message || 'Synchronisation impossible.', 'error');
    }
  }
}

export function runTournamentWrite(action) {
  const task = async () => {
    try {
      const result = await apiRequest(API_TOURNAMENT, {
        method: 'POST',
        body: action,
      });
      if (result?.updatedAt) {
        setAppMode({ lastRemoteUpdate: result.updatedAt });
      }
      return result;
    } catch (error) {
      if (error.status === 401) {
        setAppMode({ admin: false, readOnly: true });
      }
      throw error;
    }
  };

  const queued = tournamentWriteQueue.then(task, task);
  tournamentWriteQueue = queued.catch(() => {});
  return queued;
}

async function connectRemote(sessionState) {
  try {
    const tournament = await apiRequest(API_TOURNAMENT);
    const merged = mergeStates(getState(), tournament.state);
    replaceState(merged, { persist: true, notify: false });

    setAppMode({
      source: 'remote',
      remote: true,
      admin: sessionState.admin,
      readOnly: !sessionState.admin,
      authConfigured: sessionState.authConfigured,
      lastRemoteUpdate: tournament.updatedAt ?? null,
    });

    registerMutationHandler(action => runTournamentWrite(action));

    startSync();
    return true;
  } catch (error) {
    remoteBootError = error;
    stopSync();
    registerMutationHandler(null);
    return false;
  }
}

async function fetchAdminSessionState() {
  try {
    const session = await apiRequest(API_ADMIN_SESSION);
    return {
      admin: Boolean(session.admin),
      authConfigured: session.configured !== false,
    };
  } catch (error) {
    return {
      admin: false,
      authConfigured: error.status === 503 ? false : true,
    };
  }
}

function enableLocalFallback(error, sessionState) {
  const localDev = isLocalDev();
  if (localDev) {
    setAppMode({
      source: 'local-dev',
      remote: false,
      admin: true,
      readOnly: false,
      authConfigured: true,
      lastRemoteUpdate: null,
    });
    setStatus('API Vercel indisponible ici : mode local de developpement actif.', 'info');
    return;
  }

  setAppMode({
    source: 'remote-down',
    remote: false,
    admin: false,
    readOnly: true,
    authConfigured: sessionState?.authConfigured ?? false,
    lastRemoteUpdate: null,
  });

  setStatus(
    error?.message || 'Synchronisation indisponible : la page reste en lecture seule.',
    'error'
  );
}

function startSync() {
  stopSync();

  if (supabase) {
    realtimeChannel = supabase
      .channel('tournament')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'tournament_state', filter: 'id=eq.main' },
        payload => {
          if (shouldDelayFn()) return;
          const merged = mergeStates(getState(), payload.new.state);
          const { changed } = replaceState(merged, { persist: true, notify: true });
          if (changed) setAppMode({ lastRemoteUpdate: new Date().toISOString() });
        }
      )
      .subscribe();
  }

  pollTimer = window.setInterval(() => {
    if (document.visibilityState === 'hidden') return;
    void refreshRemoteState({ silent: true });
  }, POLL_INTERVAL_MS);

  document.addEventListener('visibilitychange', handleVisibilityRefresh);
}

function stopSync() {
  if (realtimeChannel) {
    supabase?.removeChannel(realtimeChannel);
    realtimeChannel = null;
  }
  if (pollTimer) {
    window.clearInterval(pollTimer);
    pollTimer = null;
  }
  document.removeEventListener('visibilitychange', handleVisibilityRefresh);
}

function handleVisibilityRefresh() {
  if (document.visibilityState !== 'visible') return;
  void refreshRemoteState({ silent: true, forceRender: true });
}

function isLocalDev() {
  return ['localhost', '127.0.0.1'].includes(window.location.hostname);
}
