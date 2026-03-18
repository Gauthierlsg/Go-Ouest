import { initHeaderArt } from './header-art.js';
import { getAppMode, subscribe } from './state.js';
import { renderPools } from './views/pools.js';
import { renderPlanning } from './views/planning.js';
import { renderFinale } from './views/finale.js';
import { resolveConfirmModal, setStatus, setupConfirmModal } from './ui.js';
import { boot, setShouldDelay } from './sync.js';
import { buildSyncBadge, isAdminBusy, renderAdminModal, setupAdminControls } from './auth.js';
import { isAdminToolBusy, scheduleToolbarOffsetSync, setupAdminTools, setupAdminToolbarLayout } from './admin-tools.js';

const views = {
  poules: () => renderPools(document.getElementById('poules')),
  planning: () => renderPlanning(document.getElementById('planning')),
  finale: () => renderFinale(document.getElementById('finale')),
};

let activeTab = 'poules';
let scoreInputActivating = false;
let scoreActivatingTimer = null;
let deferredRenderTimer = null;

// ── Tab navigation ──────────────────────────────────────

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => goTab(btn.dataset.tab));
});

function goTab(id) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.querySelector(`[data-tab="${id}"]`).classList.add('active');
  activeTab = id;
  views[id]();
}

// ── Score input transition tracking ─────────────────────
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

function isScoreInputFocused() {
  return Boolean(document.querySelector('.sc-input:focus, .b-score-input:focus'));
}

function isScoreInputTransitioning() {
  return scoreInputActivating || isScoreInputFocused();
}

// ── UI sync ─────────────────────────────────────────────

function syncUi() {
  const mode = getAppMode();
  const busy = isAdminBusy() || isAdminToolBusy();
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
  trigger.disabled = busy;
  mockBtn.disabled = !mode.admin || isAdminToolBusy();
  resetBtn.disabled = !mode.admin || isAdminToolBusy();

  if (!mode.admin) {
    resolveConfirmModal(false);
  }

  scheduleToolbarOffsetSync();
  renderAdminModal(busy);
}

// ── Wiring ──────────────────────────────────────────────

initHeaderArt();
setupAdminControls({ onUpdate: syncUi });
setupAdminTools({ onUpdate: syncUi });
setupAdminToolbarLayout();
setupConfirmModal();
setShouldDelay(isScoreInputTransitioning);

window.addEventListener('go-ouest:sync-error', event => {
  const message = event.detail?.error?.message || 'Synchronisation impossible.';
  setStatus(message, 'error');
});

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
