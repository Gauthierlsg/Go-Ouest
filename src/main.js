import {
  clearSharedState,
  exportState,
  getState,
  importState,
  isReadOnlyMode,
  resetState,
  showSharedState,
  subscribe,
} from './state.js';
import { renderPools } from './views/pools.js';
import { renderPlanning } from './views/planning.js';
import { renderFinale } from './views/finale.js';

// Tab routing
const views = {
  poules:   () => renderPools(document.getElementById('poules')),
  planning: () => renderPlanning(document.getElementById('planning')),
  finale:   () => renderFinale(document.getElementById('finale')),
};

let activeTab = 'poules';
let backupMessageTimer = null;
let sharedPayload = null;

function goTab(id) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.querySelector(`[data-tab="${id}"]`).classList.add('active');
  activeTab = id;
  views[id]();
}

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => goTab(btn.dataset.tab));
});

hydrateSharedModeFromUrl();
setupBackupControls();

// Re-render active tab when scores change
subscribe(() => {
  syncReadOnlyUi();
  renderShareState();
  views[activeTab]();
  updateBackupMeta();
});

// Initial render
syncReadOnlyUi();
renderShareState();
views.poules();
updateBackupMeta();

function setupBackupControls() {
  const exportBtn = document.getElementById('backup-export');
  const shareBtn = document.getElementById('backup-share');
  const importBtn = document.getElementById('backup-import-trigger');
  const importInput = document.getElementById('backup-import-input');
  const resetBtn = document.getElementById('backup-reset');

  exportBtn.addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(exportState(), null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `go-ouest-2026-backup-${timestampForFilename()}.json`;
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setBackupMessage('Backup JSON exporte.', 'success');
  });

  shareBtn.addEventListener('click', async () => {
    const url = buildShareUrl(exportState());
    try {
      await navigator.clipboard.writeText(url);
      setBackupMessage('Lien de partage copie.', 'success');
    } catch {
      window.prompt('Copie ce lien de partage :', url);
      setBackupMessage('Lien de partage genere.', 'success');
    }
  });

  importBtn.addEventListener('click', () => importInput.click());

  importInput.addEventListener('change', async event => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    const shouldImport = window.confirm('Importer ce backup remplacera les scores actuels sur cet appareil. Continuer ?');
    if (!shouldImport) return;

    try {
      const text = await file.text();
      importState(text);
      setBackupMessage('Backup importe avec succes.', 'success');
    } catch (error) {
      setBackupMessage(error.message || 'Import impossible.', 'error');
    }
  });

  resetBtn.addEventListener('click', () => {
    const hasScores = countCompletedMatches() > 0;
    const shouldReset = window.confirm(
      hasScores
        ? 'Reinitialiser tous les scores locaux ? Pense a exporter un backup avant de confirmer.'
        : 'Reinitialiser les scores locaux ?'
    );
    if (!shouldReset) return;
    resetState();
    setBackupMessage('Scores reinitialises.', 'success');
  });
}

function updateBackupMeta() {
  const meta = document.getElementById('backup-meta');
  if (!meta) return;

  if (isReadOnlyMode()) {
    meta.textContent = 'Mode partage lecture seule actif sur cet appareil';
    return;
  }

  const completedMatches = countCompletedMatches();
  const totalEntries = Object.keys(getState().scores).length;
  meta.textContent =
    completedMatches > 0
      ? `${completedMatches} match${completedMatches > 1 ? 's' : ''} saisi${completedMatches > 1 ? 's' : ''} · ${totalEntries} entree${totalEntries > 1 ? 's' : ''} sauvegardee${totalEntries > 1 ? 's' : ''} localement`
      : 'Aucun score saisi pour l’instant · sauvegarde locale active';
}

function setBackupMessage(message, kind) {
  const status = document.getElementById('backup-status');
  if (!status) return;

  status.textContent = message;
  status.dataset.kind = kind;

  if (backupMessageTimer) clearTimeout(backupMessageTimer);
  backupMessageTimer = window.setTimeout(() => {
    status.textContent = '';
    status.dataset.kind = '';
  }, 3500);
}

function countCompletedMatches() {
  return Object.values(getState().scores).filter(score => score?.s1 != null && score?.s2 != null).length;
}

function timestampForFilename() {
  const now = new Date();
  const pad = value => String(value).padStart(2, '0');
  return [
    now.getFullYear(),
    pad(now.getMonth() + 1),
    pad(now.getDate()),
    '-',
    pad(now.getHours()),
    pad(now.getMinutes()),
    pad(now.getSeconds()),
  ].join('');
}

function hydrateSharedModeFromUrl() {
  const hash = window.location.hash.startsWith('#') ? window.location.hash.slice(1) : '';
  if (!hash) return;

  const params = new URLSearchParams(hash);
  const encoded = params.get('share');
  if (!encoded) return;

  try {
    sharedPayload = decodeSharePayload(encoded);
    showSharedState(sharedPayload);
  } catch {
    sharedPayload = null;
    clearShareHash();
    setBackupMessage('Lien de partage invalide.', 'error');
  }
}

function renderShareState() {
  const panel = document.getElementById('share-panel');
  if (!panel) return;

  if (!isReadOnlyMode() || !sharedPayload) {
    panel.hidden = true;
    panel.innerHTML = '';
    return;
  }

  const exportedAt = sharedPayload.exportedAt
    ? new Date(sharedPayload.exportedAt).toLocaleString('fr-FR')
    : 'date inconnue';

  panel.hidden = false;
  panel.innerHTML = `
    <div class="share-panel__copy">
      <div class="share-panel__title">Lien partage lecture seule</div>
      <div class="share-panel__meta">Snapshot charge depuis un autre appareil · exporte le ${exportedAt}</div>
    </div>
    <div class="share-panel__actions">
      <button id="share-import-local" class="backup-btn backup-btn--primary" type="button">Copier sur cet appareil</button>
      <button id="share-exit" class="backup-btn" type="button">Quitter le partage</button>
    </div>`;

  panel.querySelector('#share-import-local')?.addEventListener('click', () => {
    const payload = sharedPayload;
    sharedPayload = null;
    clearShareHash();
    clearSharedState();
    importState(payload);
    setBackupMessage('Etat partage importe localement.', 'success');
  });

  panel.querySelector('#share-exit')?.addEventListener('click', () => {
    sharedPayload = null;
    clearShareHash();
    clearSharedState();
    setBackupMessage('Mode partage ferme.', 'success');
  });
}

function syncReadOnlyUi() {
  const readOnly = isReadOnlyMode();
  document.body.dataset.readonly = readOnly ? 'true' : 'false';
  document.getElementById('backup-import-trigger')?.toggleAttribute('disabled', readOnly);
  document.getElementById('backup-reset')?.toggleAttribute('disabled', readOnly);
}

function buildShareUrl(payload) {
  const url = new URL(window.location.href);
  url.hash = `share=${encodeSharePayload(payload)}`;
  return url.toString();
}

function clearShareHash() {
  const url = new URL(window.location.href);
  url.hash = '';
  window.history.replaceState({}, '', url);
}

function encodeSharePayload(payload) {
  const json = JSON.stringify(payload);
  const bytes = new TextEncoder().encode(json);
  let binary = '';
  bytes.forEach(byte => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function decodeSharePayload(encoded) {
  const base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, char => char.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes));
}
