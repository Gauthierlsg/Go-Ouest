import { DUOS, POOLS } from './data.js';
import { allPoolMatches } from './tournament.js';
import { subscribe } from './state.js';
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

// Re-render active tab when scores change
subscribe(() => views[activeTab]());

// Initial render
views.poules();
