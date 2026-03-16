import { SLOT_MIN, START_HOUR } from '../data.js';
import { allPoolMatches, buildSchedule, label } from '../tournament.js';
import { getScore, setScore } from '../state.js';

function sanitizeScore(value) {
  return value.replace(/\D+/g, '').slice(0, 2);
}

function fmtTime(slotIdx) {
  const total = START_HOUR * 60 + slotIdx * SLOT_MIN;
  const h = Math.floor(total / 60), m = total % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export function renderPlanning(container) {
  const matches = allPoolMatches();
  const slots = buildSchedule(matches);
  const totalMin = slots.length * SLOT_MIN;
  const totalH = Math.floor(totalMin / 60), totalM = totalMin % 60;

  const matchRow = (m, slotIdx) => {
    if (!m) return `<div class="empty-slot"><span class="m-time">${fmtTime(slotIdx)}</span><span>—</span></div>`;
    const sc = getScore(m.id);
    return `
      <div class="match-row" data-mid="${m.id}">
        <span class="m-time">${fmtTime(slotIdx)}</span>
        <div class="m-body">
          <div class="m-teams">${label(m.t1)} <span class="vs">vs</span> ${label(m.t2)}</div>
          <span class="m-pool-tag" style="background:${m.color}">${m.pool}</span>
        </div>
        <div class="m-score">
          <input class="sc-input" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2"
            value="${sc.s1 ?? ''}" placeholder="—"
            data-mid="${m.id}" data-side="s1">
          <span class="sc-sep">:</span>
          <input class="sc-input" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2"
            value="${sc.s2 ?? ''}" placeholder="—"
            data-mid="${m.id}" data-side="s2">
        </div>
      </div>`;
  };

  let c1 = '', c2 = '';
  slots.forEach((slot, i) => {
    c1 += matchRow(slot[0] || null, i);
    c2 += matchRow(slot[1] || null, i);
  });

  container.innerHTML = `
    <div class="banner">
      ⚠️ <strong>${matches.length} matchs · ${slots.length} créneaux · ~${totalH}h${totalM > 0 ? totalM : ''}.</strong>
      Si ça dépasse 6h : réduire les matchs à <strong>12-13 min</strong> (transition incluse).
    </div>
    <div class="planning-header">
      <span class="section-title">Planning</span>
      <span class="planning-meta">Début 10h00 · matchs de 15 min</span>
    </div>
    <div class="courts-grid">
      <div class="court-card">
        <div class="court-hdr c1-hdr">🎾 Terrain 1</div>
        ${c1}
      </div>
      <div class="court-card">
        <div class="court-hdr c2-hdr">🎾 Terrain 2</div>
        ${c2}
      </div>
    </div>`;

  if (container.dataset.scoreBound === 'true') return;

  container.addEventListener('input', e => {
    const inp = e.target;
    if (!inp.dataset.mid) return;
    const value = sanitizeScore(inp.value);
    if (inp.value !== value) inp.value = value;
    setScore(Number(inp.dataset.mid), inp.dataset.side, value, { notify: false });
  });

  container.addEventListener('change', e => {
    const inp = e.target;
    if (!inp.dataset.mid) return;
    const value = sanitizeScore(inp.value);
    if (inp.value !== value) inp.value = value;
    setScore(Number(inp.dataset.mid), inp.dataset.side, value);
  });

  container.addEventListener('focusout', e => {
    const inp = e.target;
    if (!inp.dataset.mid) return;
    const value = sanitizeScore(inp.value);
    if (inp.value !== value) inp.value = value;
    setScore(Number(inp.dataset.mid), inp.dataset.side, value);
  });
  container.dataset.scoreBound = 'true';
}
