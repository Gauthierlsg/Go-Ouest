import {
  getAppMode,
  getState,
  mergeStates,
  registerMutationHandler,
  replaceState,
  resetState,
  setAppMode,
  subscribe,
} from './state.js';
import { supabase } from './supabase.js';
import { createMockTournamentState } from './mock-data.js';
import { renderPools } from './views/pools.js';
import { renderPlanning } from './views/planning.js';
import { renderFinale } from './views/finale.js';
import { injectSpeedInsights } from '@vercel/speed-insights';

// Fallback poll interval quand Realtime est actif (filet de sécurité)
const POLL_INTERVAL_MS = 60_000;
const API_TOURNAMENT = '/api/tournament';
const API_ADMIN_SESSION = '/api/admin/session';

const views = {
  poules: () => renderPools(document.getElementById('poules')),
  planning: () => renderPlanning(document.getElementById('planning')),
  finale: () => renderFinale(document.getElementById('finale')),
};

let activeTab = 'poules';
let statusTimer = null;
let pollTimer = null;
let realtimeChannel = null;
let adminBusy = false;
let adminToolBusy = false;
let remoteBootError = null;
let toolbarOffsetRaf = null;
let adminToolbarObserver = null;
let tournamentWriteQueue = Promise.resolve();
let confirmModalResolver = null;
let scoreInputActivating = false;
let scoreActivatingTimer = null;
let deferredRenderTimer = null;

// Initialize Speed Insights
injectSpeedInsights();

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => goTab(btn.dataset.tab));
});

setupAdminControls();
setupAdminTools();
setupAdminToolbarLayout();
setupConfirmModal();
window.addEventListener('go-ouest:sync-error', event => {
  const message = event.detail?.error?.message || 'Synchronisation impossible.';
  setStatus(message, 'error');
});

// On mobile, tapping a new input fires focusout on the previous one BEFORE
// focus settles on the new one. We track pointerdown/Tab to know a transition
// is in progress and defer the re-render, preventing the double-tap issue
// and broken Tab navigation on desktop.
function markScoreInputActivating() {
  scoreInputActivating = true;
  clearTimeout(scoreActivatingTimer);
  scoreActivatingTimer = setTimeout(() => { scoreInputActivating = false; }, 400);
}

document.addEventListener('pointerdown', e => {
  if (!e.target.matches('.sc-input, .b-score-input')) return;
  markScoreInputActivating();
}, true);

document.addEventListener('keydown', e => {
  if (e.key !== 'Tab') return;
  if (!e.target.matches('.sc-input, .b-score-input')) return;
  markScoreInputActivating();
}, true);

subscribe(() => {
  syncUi();
  if (isScoreInputTransitioning()) {
    clearTimeout(deferredRenderTimer);
    deferredRenderTimer = setTimeout(() => {
      if (!isScoreInputTransitioning()) views[activeTab]();
    }, 400);
  } else {
    clearTimeout(deferredRenderTimer);
    views[activeTab]();
  }
});

void init();

async function init() {
  await boot();
  syncUi();
  views.poules();
}

function goTab(id) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.querySelector(`[data-tab="${id}"]`).classList.add('active');
  activeTab = id;
  views[id]();
}

async function boot() {
  const sessionState = await fetchAdminSessionState();
  const remoteReady = await connectRemote(sessionState);

  if (!remoteReady) {
    enableLocalFallback(remoteBootError, sessionState);
  }
}

async function connectRemote(sessionState) {
  try {
    const tournament = await apiRequest(API_TOURNAMENT);
    // Merge remote state with local so scores entered offline or not yet
    // synced to Blob are not wiped on reload.
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

function setupAdminControls() {
  const trigger = document.getElementById('admin-access-trigger');
  const modal = document.getElementById('admin-modal');
  const closeTargets = modal.querySelectorAll('[data-admin-close]');
  const form = document.getElementById('admin-login-form');
  const passwordInput = document.getElementById('admin-password');
  const logoutBtn = document.getElementById('admin-logout');

  trigger.addEventListener('click', () => openAdminModal());

  closeTargets.forEach(target => {
    target.addEventListener('click', () => closeAdminModal());
  });

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (adminBusy) return;

    clearAdminError();
    adminBusy = true;
    syncUi();

    try {
      await apiRequest(API_ADMIN_SESSION, {
        method: 'POST',
        body: { password: passwordInput.value },
      });
      if (getAppMode().remote) {
        setAppMode({ admin: true, readOnly: false });
        await refreshRemoteState({ silent: true, forceRender: true });
      } else {
        setAppMode({ admin: true, readOnly: false, source: 'local-admin' });
      }
      closeAdminModal();
      setStatus(
        getAppMode().remote
          ? 'Mode admin active sur cet appareil.'
          : 'Mode admin local actif sur cet appareil.',
        getAppMode().remote ? 'success' : 'warning'
      );
    } catch (error) {
      setAdminError(error.message || 'Connexion admin impossible.');
    } finally {
      adminBusy = false;
      syncUi();
    }
  });

  logoutBtn.addEventListener('click', async () => {
    if (adminBusy) return;
    if (getAppMode().source === 'local-dev') {
      closeAdminModal();
      return;
    }

    adminBusy = true;
    clearAdminError();
    syncUi();

    try {
      await apiRequest(API_ADMIN_SESSION, { method: 'DELETE' });
      setAppMode({ admin: false, readOnly: true });
      setStatus('Mode admin desactive sur cet appareil.', 'success');
      closeAdminModal();
    } catch (error) {
      setAdminError(error.message || 'Deconnexion impossible.');
    } finally {
      adminBusy = false;
      syncUi();
    }
  });

  document.addEventListener('keydown', event => {
    const confirmModal = document.getElementById('confirm-modal');
    if (event.key === 'Escape' && confirmModal && !confirmModal.hidden) {
      resolveConfirmModal(false);
      return;
    }
    if (event.key === 'Escape' && !modal.hidden) {
      closeAdminModal();
    }
  });
}

function setupAdminTools() {
  const mockBtn = document.getElementById('backup-mock');
  const resetBtn = document.getElementById('backup-reset');

  [mockBtn, resetBtn].forEach(button => {
    button.addEventListener('pointerdown', event => {
      event.preventDefault();
    });
  });

  mockBtn.addEventListener('click', async () => {
    if (!ensureAdminActionAllowed() || adminToolBusy) return;

    const shouldGenerate = await openConfirmModal({
      title: 'Generer des mock data ?',
      copy: 'Tous les scores actuels seront remplaces par des resultats aleatoires pour tester le tournoi.',
      submitLabel: 'Generer',
      submitVariant: 'primary',
    });
    if (!shouldGenerate) return;

    await runAdminTool(async () => {
      const nextState = createMockTournamentState();

      if (getAppMode().remote) {
        const result = await runTournamentWrite({
          type: 'replaceState',
          state: nextState,
        });
        if (result?.state) {
          replaceState(result.state, { persist: true, notify: true });
        }
      } else {
        replaceState(nextState, { persist: true, notify: true });
      }

      setStatus('Mock data generee pour les tests.', 'success');
    }, 'Generation mock impossible.');
  });

  resetBtn.addEventListener('click', async () => {
    if (!ensureAdminActionAllowed() || adminToolBusy) return;

    const shouldReset = await openConfirmModal({
      title: 'Reinitialiser tous les scores ?',
      copy: 'Tous les scores de poules et de phase finale seront effaces sur tous les appareils synchronises.',
      submitLabel: 'Reinitialiser',
      submitVariant: 'danger',
    });
    if (!shouldReset) return;

    await runAdminTool(async () => {
      if (getAppMode().remote) {
        const result = await runTournamentWrite({ type: 'reset' });
        if (result?.state) {
          replaceState(result.state, { persist: true, notify: true });
        }
      } else {
        resetState();
      }

      setStatus('Scores reinitialises.', 'success');
    }, 'Reinitialisation impossible.');
  });
}

function setupConfirmModal() {
  const modal = document.getElementById('confirm-modal');
  const closeTargets = modal.querySelectorAll('[data-confirm-close]');
  const submit = document.getElementById('confirm-modal-submit');

  closeTargets.forEach(target => {
    target.addEventListener('click', () => resolveConfirmModal(false));
  });

  submit.addEventListener('click', () => resolveConfirmModal(true));

  // Intercept footer external links
  document.querySelector('.site-footer').addEventListener('click', async e => {
    const link = e.target.closest('a[data-confirm-label]');
    if (!link) return;
    e.preventDefault();
    const confirmed = await openConfirmModal({
      title: link.dataset.confirmLabel,
      copy: link.dataset.confirmDesc,
      submitLabel: 'Ouvrir',
    });
    if (confirmed) window.open(link.href, '_blank', 'noopener');
  });
}

async function runAdminTool(work, fallbackMessage) {
  adminToolBusy = true;
  syncUi();

  try {
    await work();
  } catch (error) {
    setStatus(error.message || fallbackMessage, 'error');
  } finally {
    adminToolBusy = false;
    syncUi();
  }
}

function setupAdminToolbarLayout() {
  const toolbar = document.getElementById('admin-toolbar');
  if (!toolbar) return;

  window.addEventListener('resize', scheduleAdminToolbarOffsetSync);

  if ('ResizeObserver' in window) {
    adminToolbarObserver = new ResizeObserver(() => {
      scheduleAdminToolbarOffsetSync();
    });
    adminToolbarObserver.observe(toolbar);
  }

  scheduleAdminToolbarOffsetSync();
}

async function refreshRemoteState(options = {}) {
  const { silent = false, forceRender = false } = options;
  if (!getAppMode().remote) return;
  if (shouldDelayRemoteRefresh()) return;

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

function startSync() {
  stopSync();

  // Realtime Supabase : mise à jour instantanée sur tous les appareils
  if (supabase) {
    realtimeChannel = supabase
      .channel('tournament')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'tournament_state', filter: 'id=eq.main' },
        payload => {
          if (shouldDelayRemoteRefresh()) return;
          const merged = mergeStates(getState(), payload.new.state);
          const { changed } = replaceState(merged, { persist: true, notify: true });
          if (changed) setAppMode({ lastRemoteUpdate: new Date().toISOString() });
        }
      )
      .subscribe();
  }

  // Fallback poll (filet de sécurité si Realtime tombe)
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

function syncUi() {
  const mode = getAppMode();
  const adminToolbar = document.getElementById('admin-toolbar');
  const trigger = document.getElementById('admin-access-trigger');
  const syncBadge = document.getElementById('sync-badge');
  const mockBtn = document.getElementById('backup-mock');
  const resetBtn = document.getElementById('backup-reset');

  document.body.classList.toggle('is-admin', mode.admin);
  document.body.classList.toggle('is-public', !mode.admin);

  adminToolbar.hidden = !mode.admin;
  adminToolbar.setAttribute('aria-hidden', String(!mode.admin));
  adminToolbar.inert = !mode.admin;
  syncBadge.textContent = buildSyncBadge(mode);
  trigger.classList.toggle('admin-access-btn--active', mode.admin);
  trigger.title = mode.admin ? 'Admin connecté' : 'Connexion admin';
  trigger.disabled = adminBusy || adminToolBusy;
  mockBtn.disabled = !mode.admin || adminToolBusy;
  resetBtn.disabled = !mode.admin || adminToolBusy;

  if (!mode.admin) {
    resolveConfirmModal(false);
  }

  scheduleAdminToolbarOffsetSync();
  renderAdminModal();
}

function scheduleAdminToolbarOffsetSync() {
  if (toolbarOffsetRaf) {
    window.cancelAnimationFrame(toolbarOffsetRaf);
  }

  toolbarOffsetRaf = window.requestAnimationFrame(() => {
    toolbarOffsetRaf = null;
    syncAdminToolbarOffset();
  });
}

function syncAdminToolbarOffset() {
  // toolbar is now inside the footer (not fixed), no offset needed
  document.documentElement.style.setProperty('--admin-toolbar-offset', '0px');
}

function ensureAdminActionAllowed() {
  if (getAppMode().admin) return true;
  setStatus('Connexion admin requise pour cette action.', 'error');
  return false;
}

function buildSyncBadge(mode) {
  if (mode.source === 'local-dev') return 'Mode local';
  if (mode.source === 'local-admin') return 'Admin local';
  if (!mode.admin) return 'Lecture seule';
  return 'Mode admin';
}

function renderAdminModal() {
  const mode = getAppMode();
  const modal = document.getElementById('admin-modal');
  const title = document.getElementById('admin-modal-title');
  const copy = document.getElementById('admin-modal-copy');
  const form = document.getElementById('admin-login-form');
  const loggedPanel = document.getElementById('admin-logged-panel');
  const loggedText = loggedPanel.querySelector('.admin-logged-panel__text');
  const input = document.getElementById('admin-password');
  const submit = document.getElementById('admin-login-submit');
  const logoutBtn = document.getElementById('admin-logout');
  const canSubmitLogin = canSubmitAdminLogin(mode);

  submit.disabled = adminBusy || !canSubmitLogin;
  logoutBtn.disabled = adminBusy;

  if (mode.admin) {
    title.textContent = mode.source === 'local-dev'
      ? 'Mode local de developpement'
      : mode.source === 'local-admin'
        ? 'Mode admin local'
        : 'Mode admin actif';
    copy.textContent = mode.source === 'local-dev'
      ? 'Cette version locale reste editable sur cet appareil meme sans API admin.'
      : mode.source === 'local-admin'
        ? 'Le mot de passe a ete accepte, mais la synchro distante est indisponible. Les changements resteront locaux a cet appareil.'
        : 'Cet appareil peut saisir les scores, generer des donnees de test et reinitialiser le tournoi.';
    form.hidden = true;
    loggedPanel.hidden = false;
    loggedText.textContent = mode.source === 'local-dev'
      ? 'Tu peux tester la saisie localement ici, mais rien n’est partage avec les autres appareils.'
      : mode.source === 'local-admin'
        ? 'Tu peux saisir localement sur cet appareil en attendant le retour de la synchro.'
        : 'Tu peux maintenant saisir les scores et utiliser la barre d’actions admin en bas de page.';
    logoutBtn.textContent = mode.source === 'local-dev' ? 'Fermer' : 'Se deconnecter';
  } else {
    title.textContent = 'Connexion admin';
    copy.textContent = !mode.authConfigured
      ? 'La connexion admin n’est pas encore configuree sur ce deploiement.'
      : !mode.remote
        ? 'La synchro distante est indisponible, mais tu peux quand meme ouvrir un mode admin local sur cet appareil.'
        : 'Entrez le mot de passe organisateurs pour debloquer la saisie sur cet appareil.';
    form.hidden = !canSubmitLogin;
    loggedPanel.hidden = true;
    input.disabled = adminBusy || !canSubmitLogin;
    logoutBtn.textContent = 'Se deconnecter';
  }

  if (modal.hidden) return;

  if (!mode.admin && !adminBusy && !input.disabled) {
    window.setTimeout(() => input.focus(), 0);
  }
}

function openAdminModal() {
  const modal = document.getElementById('admin-modal');
  modal.hidden = false;
  syncBodyModalState();
  renderAdminModal();
}

function closeAdminModal() {
  const modal = document.getElementById('admin-modal');
  const input = document.getElementById('admin-password');
  modal.hidden = true;
  syncBodyModalState();
  input.value = '';
  clearAdminError();
}

function clearAdminError() {
  const error = document.getElementById('admin-error');
  error.textContent = '';
}

function setAdminError(message) {
  const error = document.getElementById('admin-error');
  error.textContent = message;
}

function setStatus(message, kind = '') {
  const status = document.getElementById('backup-status');
  status.textContent = message;
  status.dataset.kind = kind;

  if (statusTimer) clearTimeout(statusTimer);
  statusTimer = window.setTimeout(() => {
    status.textContent = '';
    status.dataset.kind = '';
  }, 3500);
}

function openConfirmModal(options) {
  const modal = document.getElementById('confirm-modal');
  const title = document.getElementById('confirm-modal-title');
  const copy = document.getElementById('confirm-modal-copy');
  const submit = document.getElementById('confirm-modal-submit');

  if (confirmModalResolver) {
    confirmModalResolver(false);
    confirmModalResolver = null;
  }

  title.textContent = options.title;
  copy.textContent = options.copy;
  submit.textContent = options.submitLabel || 'Confirmer';
  submit.classList.remove('backup-btn--primary', 'backup-btn--danger');
  submit.classList.add(
    options.submitVariant === 'danger' ? 'backup-btn--danger' : 'backup-btn--primary'
  );

  modal.hidden = false;
  syncBodyModalState();

  return new Promise(resolve => {
    confirmModalResolver = resolve;
    window.setTimeout(() => submit.focus(), 0);
  });
}

function resolveConfirmModal(confirmed) {
  const modal = document.getElementById('confirm-modal');
  const resolver = confirmModalResolver;

  modal.hidden = true;
  syncBodyModalState();
  confirmModalResolver = null;

  if (resolver) resolver(confirmed);
}

function syncBodyModalState() {
  const adminModal = document.getElementById('admin-modal');
  const confirmModal = document.getElementById('confirm-modal');
  const hasOpenModal = (adminModal && !adminModal.hidden) || (confirmModal && !confirmModal.hidden);
  document.body.classList.toggle('admin-modal-open', Boolean(hasOpenModal));
}

function runTournamentWrite(action) {
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

function isScoreInputFocused() {
  return Boolean(document.querySelector('.sc-input:focus, .b-score-input:focus'));
}

function isScoreInputTransitioning() {
  return scoreInputActivating || isScoreInputFocused();
}

function shouldDelayRemoteRefresh() {
  return isScoreInputTransitioning();
}

function isLocalDev() {
  return ['localhost', '127.0.0.1'].includes(window.location.hostname);
}

function canSubmitAdminLogin(mode) {
  if (mode.source === 'local-dev') return true;
  return mode.authConfigured;
}

async function apiRequest(url, options = {}) {
  const request = {
    method: options.method || 'GET',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      ...options.headers,
    },
  };

  if (options.body !== undefined) {
    request.body = JSON.stringify(options.body);
    request.headers['Content-Type'] = 'application/json';
  }

  let response;
  try {
    response = await fetch(url, request);
  } catch {
    throw new Error('API Vercel indisponible sur cet environnement.');
  }

  const data = await parseJsonResponse(response);
  if (!response.ok) {
    const error = new Error(data?.error || data?.message || `Erreur ${response.status}`);
    error.status = response.status;
    error.payload = data;
    throw error;
  }

  return data;
}

async function parseJsonResponse(response) {
  const type = response.headers.get('content-type') || '';
  if (type.includes('application/json')) {
    return response.json();
  }

  const text = await response.text();
  if (!text) return {};

  try {
    return JSON.parse(text);
  } catch {
    return { message: text };
  }
}
