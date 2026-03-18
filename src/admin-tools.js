import {
  getAppMode,
  replaceState,
  resetState,
} from './state.js';
import { createMockTournamentState } from './mock-data.js';
import { openConfirmModal, setStatus } from './ui.js';
import { runTournamentWrite } from './sync.js';
import { ensureAdminActionAllowed } from './auth.js';

let adminToolBusy = false;
let toolbarOffsetRaf = null;

export function isAdminToolBusy() {
  return adminToolBusy;
}

export function setupAdminTools({ onUpdate }) {
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

    await runAdminTool(onUpdate, async () => {
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

    await runAdminTool(onUpdate, async () => {
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

async function runAdminTool(onUpdate, work, fallbackMessage) {
  adminToolBusy = true;
  onUpdate();

  try {
    await work();
  } catch (error) {
    setStatus(error.message || fallbackMessage, 'error');
  } finally {
    adminToolBusy = false;
    onUpdate();
  }
}

export function setupAdminToolbarLayout() {
  const toolbar = document.getElementById('admin-toolbar');
  if (!toolbar) return;

  window.addEventListener('resize', scheduleToolbarOffsetSync);

  if ('ResizeObserver' in window) {
    new ResizeObserver(() => scheduleToolbarOffsetSync()).observe(toolbar);
  }

  scheduleToolbarOffsetSync();
}

export function scheduleToolbarOffsetSync() {
  if (toolbarOffsetRaf) {
    window.cancelAnimationFrame(toolbarOffsetRaf);
  }

  toolbarOffsetRaf = window.requestAnimationFrame(() => {
    toolbarOffsetRaf = null;
    document.documentElement.style.setProperty('--admin-toolbar-offset', '0px');
  });
}
