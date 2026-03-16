import {
  getAppMode,
  getState,
  registerMutationHandler,
  replaceState,
  resetState,
  setAppMode,
  subscribe,
} from './state.js';
import { createMockTournamentState } from './mock-data.js';
import { renderPools } from './views/pools.js';
import { renderPlanning } from './views/planning.js';
import { renderFinale } from './views/finale.js';

const POLL_INTERVAL_MS = 5000;
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
let adminBusy = false;
let remoteBootError = null;

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => goTab(btn.dataset.tab));
});

setupAdminControls();
setupAdminTools();
window.addEventListener('go-ouest:sync-error', event => {
  const message = event.detail?.error?.message || 'Synchronisation impossible.';
  setStatus(message, 'error');
});

subscribe(() => {
  syncUi();
  views[activeTab]();
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
    replaceState(tournament.state, { persist: true, notify: false });

    setAppMode({
      source: 'remote',
      remote: true,
      admin: sessionState.admin,
      readOnly: !sessionState.admin,
      authConfigured: sessionState.authConfigured,
      lastRemoteUpdate: tournament.updatedAt ?? null,
    });

    registerMutationHandler(async action => {
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
    });

    startPolling();
    return true;
  } catch (error) {
    remoteBootError = error;
    stopPolling();
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
      passwordInput.value = '';
      if (getAppMode().remote) {
        setAppMode({ admin: true, readOnly: false });
        await refreshRemoteState({ silent: true, forceRender: true });
        setStatus('Mode admin active sur cet appareil.', 'success');
      } else {
        setAppMode({ admin: true, readOnly: false, source: 'local-admin' });
        setStatus('Mode admin local actif sur cet appareil.', 'warning');
      }
      renderAdminModal();
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
    if (event.key === 'Escape' && !modal.hidden) {
      closeAdminModal();
    }
  });
}

function setupAdminTools() {
  const mockBtn = document.getElementById('backup-mock');
  const resetBtn = document.getElementById('backup-reset');

  mockBtn.addEventListener('click', async () => {
    const shouldGenerate = window.confirm(
      'Generer des scores aleatoires pour tout le tournoi ? Cela remplacera les scores actuels.'
    );
    if (!shouldGenerate) return;

    const nextState = createMockTournamentState();

    try {
      if (getAppMode().remote) {
        await apiRequest(API_TOURNAMENT, {
          method: 'POST',
          body: { type: 'replaceState', state: nextState },
        });
        await refreshRemoteState({ silent: true, forceRender: true });
      } else {
        replaceState(nextState, { persist: true, notify: true });
      }

      setStatus('Mock data generee pour les tests.', 'success');
    } catch (error) {
      setStatus(error.message || 'Generation mock impossible.', 'error');
    }
  });

  resetBtn.addEventListener('click', async () => {
    const shouldReset = window.confirm('Reinitialiser tous les scores du tournoi ?');
    if (!shouldReset) return;

    try {
      if (getAppMode().remote) {
        await apiRequest(API_TOURNAMENT, {
          method: 'POST',
          body: { type: 'reset' },
        });
        await refreshRemoteState({ silent: true, forceRender: true });
      } else {
        resetState();
      }

      setStatus('Scores reinitialises.', 'success');
    } catch (error) {
      setStatus(error.message || 'Reinitialisation impossible.', 'error');
    }
  });
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

function startPolling() {
  stopPolling();
  pollTimer = window.setInterval(() => {
    if (document.visibilityState === 'hidden') return;
    void refreshRemoteState({ silent: true });
  }, POLL_INTERVAL_MS);

  document.addEventListener('visibilitychange', handleVisibilityRefresh);
}

function stopPolling() {
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
  const title = document.getElementById('control-title');
  const meta = document.getElementById('backup-meta');
  const trigger = document.getElementById('admin-access-trigger');
  const syncBadge = document.getElementById('sync-badge');

  document.body.classList.toggle('is-admin', mode.admin);
  document.body.classList.toggle('is-public', !mode.admin);

  adminToolbar.hidden = !mode.admin;

  if (mode.source === 'local-dev') {
    title.textContent = 'Mode local de developpement';
  } else if (mode.source === 'local-admin') {
    title.textContent = 'Console organisateurs locale';
  } else if (mode.admin) {
    title.textContent = 'Console organisateurs';
  } else {
    title.textContent = 'Consultation publique';
  }

  meta.textContent = buildMetaLine(mode);
  syncBadge.textContent = buildSyncBadge(mode);
  trigger.textContent = mode.admin ? 'Admin connecte' : 'Connexion admin';
  trigger.disabled = adminBusy;

  renderAdminModal();
}

function buildMetaLine(mode) {
  const pieces = [];
  const completedMatches = countCompletedMatches();

  if (mode.remote) {
    pieces.push(mode.admin ? 'Synchro cloud active' : 'Scores visibles en direct pour tous');
  } else if (mode.source === 'local-dev') {
    pieces.push('Aucune synchro cloud sur ce poste local');
  } else if (mode.source === 'local-admin') {
    pieces.push('Mode admin local actif uniquement sur cet appareil');
  } else if (mode.source === 'remote-down') {
    pieces.push('Service de synchro temporairement indisponible');
  } else {
    pieces.push('Lecture seule tant que le service admin est indisponible');
  }

  if (mode.lastRemoteUpdate) {
    pieces.push(`Maj ${formatDateTime(mode.lastRemoteUpdate)}`);
  }

  pieces.push(
    completedMatches > 0
      ? `${completedMatches} match${completedMatches > 1 ? 's' : ''} saisi${completedMatches > 1 ? 's' : ''}`
      : 'Aucun score saisi pour l’instant'
  );

  if (!mode.admin && mode.remote) {
    pieces.push('Seuls les organisateurs connectes peuvent modifier les scores');
  }
  if (!mode.authConfigured && mode.remote) {
    pieces.push('Connexion admin non configuree sur ce deploiement');
  }

  return pieces.join(' · ');
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
  document.body.classList.add('admin-modal-open');
  renderAdminModal();
}

function closeAdminModal() {
  const modal = document.getElementById('admin-modal');
  const input = document.getElementById('admin-password');
  modal.hidden = true;
  document.body.classList.remove('admin-modal-open');
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

function countCompletedMatches() {
  return Object.values(getState().scores).filter(score => score?.s1 != null && score?.s2 != null).length;
}

function formatDateTime(value) {
  return new Date(value).toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

function shouldDelayRemoteRefresh() {
  return Boolean(document.querySelector('.sc-input:focus, .b-score-input:focus'));
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
