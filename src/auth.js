import { apiRequest } from './api.js';
import { getAppMode, setAppMode } from './state.js';
import { resolveConfirmModal, setStatus, syncBodyModalState } from './ui.js';
import { refreshRemoteState } from './sync.js';

let adminBusy = false;

export function isAdminBusy() {
  return adminBusy;
}

export function ensureAdminActionAllowed() {
  if (getAppMode().admin) return true;
  setStatus('Connexion admin requise pour cette action.', 'error');
  return false;
}

export function buildSyncBadge(mode) {
  if (mode.source === 'local-dev') return 'Mode local';
  if (mode.source === 'local-admin') return 'Admin local';
  if (!mode.admin) return 'Lecture seule';
  return 'Mode admin';
}

export function canSubmitAdminLogin(mode) {
  if (mode.source === 'local-dev') return true;
  return mode.authConfigured;
}

export function setupAdminControls({ onUpdate }) {
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
    onUpdate();

    try {
      await apiRequest('/api/admin/session', {
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
      onUpdate();
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
    onUpdate();

    try {
      await apiRequest('/api/admin/session', { method: 'DELETE' });
      setAppMode({ admin: false, readOnly: true });
      setStatus('Mode admin desactive sur cet appareil.', 'success');
      closeAdminModal();
    } catch (error) {
      setAdminError(error.message || 'Deconnexion impossible.');
    } finally {
      adminBusy = false;
      onUpdate();
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

export function renderAdminModal(busy) {
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
  const canLogin = canSubmitAdminLogin(mode);

  submit.disabled = busy || !canLogin;
  logoutBtn.disabled = busy;

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
      ? 'Tu peux tester la saisie localement ici, mais rien n\u2019est partage avec les autres appareils.'
      : mode.source === 'local-admin'
        ? 'Tu peux saisir localement sur cet appareil en attendant le retour de la synchro.'
        : 'Tu peux maintenant saisir les scores et utiliser la barre d\u2019actions admin en bas de page.';
    logoutBtn.textContent = mode.source === 'local-dev' ? 'Fermer' : 'Se deconnecter';
  } else {
    title.textContent = 'Connexion admin';
    copy.textContent = !mode.authConfigured
      ? 'La connexion admin n\u2019est pas encore configuree sur ce deploiement.'
      : !mode.remote
        ? 'La synchro distante est indisponible, mais tu peux quand meme ouvrir un mode admin local sur cet appareil.'
        : 'Entrez le mot de passe organisateurs pour debloquer la saisie sur cet appareil.';
    form.hidden = !canLogin;
    loggedPanel.hidden = true;
    input.disabled = busy || !canLogin;
    logoutBtn.textContent = 'Se deconnecter';
  }

  if (modal.hidden) return;

  if (!mode.admin && !busy && !input.disabled) {
    window.setTimeout(() => input.focus(), 0);
  }
}

function openAdminModal() {
  const modal = document.getElementById('admin-modal');
  modal.hidden = false;
  syncBodyModalState();
  renderAdminModal(adminBusy);
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
  document.getElementById('admin-error').textContent = '';
}

function setAdminError(message) {
  document.getElementById('admin-error').textContent = message;
}
