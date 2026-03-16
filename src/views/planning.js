import {
  KNOCKOUT_BREAK_MIN,
  MATCH_DURATION_MIN,
  SLOT_MIN,
  START_HOUR,
  TRANSITION_MIN,
} from '../data.js';
import { allPoolMatches, buildSchedule, computeKnockout, label } from '../tournament.js';
import {
  commitScore,
  countInvalidDrawScores,
  getScore,
  isDrawScore,
  isReadOnlyMode,
  setDraftScore,
} from '../state.js';

const KNOCKOUT_CONFIG = [
  {
    id: 'QF1',
    round: 'Quart de finale',
    tag: 'QF1',
    color: '#a34710',
    fallbacks: ['1er Poule A', 'Meilleur 2e'],
  },
  {
    id: 'QF2',
    round: 'Quart de finale',
    tag: 'QF2',
    color: '#a34710',
    fallbacks: ['1er Poule B', '1er Poule G'],
  },
  {
    id: 'QF3',
    round: 'Quart de finale',
    tag: 'QF3',
    color: '#a34710',
    fallbacks: ['1er Poule C', '1er Poule F'],
  },
  {
    id: 'QF4',
    round: 'Quart de finale',
    tag: 'QF4',
    color: '#a34710',
    fallbacks: ['1er Poule D', '1er Poule E'],
  },
  {
    id: 'SF1',
    round: 'Demi-finale',
    tag: 'SF1',
    color: '#7c3aed',
    fallbacks: ['Vainqueur QF1', 'Vainqueur QF2'],
  },
  {
    id: 'SF2',
    round: 'Demi-finale',
    tag: 'SF2',
    color: '#7c3aed',
    fallbacks: ['Vainqueur QF3', 'Vainqueur QF4'],
  },
  {
    id: 'TP',
    round: '3e place',
    tag: '3e place',
    color: '#0f766e',
    fallbacks: ['Perdant SF1', 'Perdant SF2'],
  },
  {
    id: 'F',
    round: 'Finale',
    tag: 'Finale',
    color: '#c2450a',
    fallbacks: ['Vainqueur SF1', 'Vainqueur SF2'],
  },
];

function sanitizeScore(value) {
  return value.replace(/\D+/g, '').slice(0, 2);
}

function fmtClock(totalMinutes) {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

function minutesToHuman(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h${minutes > 0 ? String(minutes).padStart(2, '0') : ''}`;
}

export function renderPlanning(container) {
  const readOnly = isReadOnlyMode();
  const poolMatches = allPoolMatches();
  const poolSlots = buildSchedule(poolMatches);
  const planning = buildPlanningRows(poolMatches, poolSlots);
  const totalDuration = planning.endMinutes - START_HOUR * 60;
  const invalidDrawCount = countInvalidDrawScores();
  const invalidDrawLabel = invalidDrawCount > 1 ? 'scores invalides' : 'score invalide';

  container.innerHTML = `
    <div class="banner">
      ⚠️ <strong>${poolMatches.length} matchs de poule + 8 matchs de phase finale · pause ${KNOCKOUT_BREAK_MIN} min · fin estimée ${fmtClock(planning.endMinutes)} (~${minutesToHuman(totalDuration)}).</strong>
      Si ça dépasse : réduire les matchs à <strong>${MATCH_DURATION_MIN - 2}-${MATCH_DURATION_MIN - 1} min</strong> et garder la transition fluide.
    </div>
    ${invalidDrawCount ? `
      <div class="banner error">
        ⚠️ <div><strong>${invalidDrawCount} ${invalidDrawLabel}.</strong> Les matchs nuls sont interdits : saisis le point decisif pour valider ces matchs.</div>
      </div>
    ` : ''}
    <div class="planning-header">
      <span class="section-title">Planning</span>
      <span class="planning-meta">Début ${String(START_HOUR).padStart(2, '0')}h00 · matchs ${MATCH_DURATION_MIN} min + ${TRANSITION_MIN} min transition · pause ${KNOCKOUT_BREAK_MIN} min avant les quarts</span>
    </div>
    <section class="planning-section">
      <div class="planning-section__header">
        <div>
          <div class="planning-section__eyebrow">Bloc 1</div>
          <h3 class="planning-section__title">Phase de poules</h3>
        </div>
        <div class="planning-section__meta">${poolMatches.length} matchs · fin estimée ${fmtClock(planning.poolEndMinutes)}</div>
      </div>
      ${renderCourtsGrid(planning.poolCourts, readOnly)}
    </section>

    <div class="planning-separator" role="separator" aria-label="Pause avant la phase finale">
      <div class="planning-separator__line"></div>
      <div class="planning-separator__badge">
        <span class="planning-separator__eyebrow">Transition</span>
        <strong>${fmtClock(planning.poolEndMinutes)} · Pause ${KNOCKOUT_BREAK_MIN} min</strong>
        <span>Calcul des qualifiés puis lancement de la phase finale à ${fmtClock(planning.knockoutStart)}</span>
      </div>
      <div class="planning-separator__line"></div>
    </div>

    <section class="planning-section planning-section--knockout">
      <div class="planning-section__header">
        <div>
          <div class="planning-section__eyebrow">Bloc 2</div>
          <h3 class="planning-section__title">Phase finale</h3>
        </div>
        <div class="planning-section__meta">8 matchs à élimination directe · fin estimée ${fmtClock(planning.endMinutes)}</div>
      </div>
      ${renderCourtsGrid(planning.knockoutCourts, readOnly)}
    </section>`;

  if (container.dataset.scoreBound === 'true') return;

  container.addEventListener('input', e => {
    if (isReadOnlyMode()) return;
    const inp = e.target;
    if (!inp.dataset.mid) return;
    const value = sanitizeScore(inp.value);
    if (inp.value !== value) inp.value = value;
    setDraftScore(inp.dataset.mid, inp.dataset.side, value);
  });

  container.addEventListener('focusout', e => {
    if (isReadOnlyMode()) return;
    const inp = e.target;
    if (!inp.dataset.mid) return;
    const value = sanitizeScore(inp.value);
    if (inp.value !== value) inp.value = value;
    void commitScore(inp.dataset.mid, inp.dataset.side, value);
  });

  container.addEventListener('keydown', e => {
    if (e.key !== 'Enter') return;
    const inp = e.target;
    if (!inp.dataset.mid) return;
    inp.blur();
  });
  container.dataset.scoreBound = 'true';
}

function buildPlanningRows(poolMatches, poolSlots) {
  const poolCourts = [[], []];
  const startMinutes = START_HOUR * 60;

  poolSlots.forEach((slot, slotIdx) => {
    const slotStart = startMinutes + slotIdx * SLOT_MIN;
    poolCourts[0].push(slot[0] ? buildPoolRow(slot[0], slotStart) : buildEmptyRow(slotStart));
    poolCourts[1].push(slot[1] ? buildPoolRow(slot[1], slotStart) : buildEmptyRow(slotStart));
  });

  const poolEndMinutes = startMinutes + poolSlots.length * SLOT_MIN;
  const knockoutStart = poolEndMinutes + KNOCKOUT_BREAK_MIN;
  const { rounds } = computeKnockout(poolMatches);
  const matchesById = Object.fromEntries(
    [...rounds.quarterfinals, ...rounds.semifinals, ...rounds.finals].map(match => [match.id, match])
  );
  const knockoutCourts = [[], []];

  const knockoutSlots = [
    ['QF1', 'QF2'],
    ['QF3', 'QF4'],
    ['SF1', 'SF2'],
    ['TP', 'F'],
  ];

  knockoutSlots.forEach((slot, slotIdx) => {
    const slotStart = knockoutStart + slotIdx * SLOT_MIN;
    knockoutCourts[0].push(buildKnockoutRow(matchesById[slot[0]], slotStart, slot[0]));
    knockoutCourts[1].push(buildKnockoutRow(matchesById[slot[1]], slotStart, slot[1]));
  });

  return {
    poolCourts,
    knockoutCourts,
    poolEndMinutes,
    knockoutStart,
    endMinutes: knockoutStart + knockoutSlots.length * SLOT_MIN,
  };
}

function buildPoolRow(match, startMinutes) {
  return {
    type: 'match',
    matchId: match.id,
    startMinutes,
    leftLabel: label(match.t1),
    rightLabel: label(match.t2),
    tag: match.pool,
    tagColor: match.color,
    detail: 'Phase de poules',
    editable: true,
    kind: 'pool',
  };
}

function buildKnockoutRow(match, startMinutes, id) {
  const config = KNOCKOUT_CONFIG.find(item => item.id === id);
  return {
    type: 'match',
    matchId: match.id,
    startMinutes,
    leftLabel: sideLabel(match.sides[0], config.fallbacks[0]),
    rightLabel: sideLabel(match.sides[1], config.fallbacks[1]),
    tag: config.tag,
    tagColor: config.color,
    detail: config.round,
    editable: match.ready,
    kind: 'knockout',
  };
}

function buildEmptyRow(startMinutes) {
  return {
    type: 'empty',
    startMinutes,
  };
}

function sideLabel(side, fallback) {
  return side?.team ? label(side.team) : fallback;
}

function renderCourtsGrid(courts, readOnly) {
  return `
    <div class="courts-grid">
      <div class="court-card">
        <div class="court-hdr c1-hdr">🎾 Terrain 1</div>
        ${courts[0].map(row => renderRow(row, readOnly)).join('')}
      </div>
      <div class="court-card">
        <div class="court-hdr c2-hdr">🎾 Terrain 2</div>
        ${courts[1].map(row => renderRow(row, readOnly)).join('')}
      </div>
    </div>`;
}

function renderRow(row, readOnly) {
  if (row.type === 'empty') {
    return `
      <div class="empty-slot">
        <span class="m-time">${fmtClock(row.startMinutes)}</span>
        <span>—</span>
      </div>`;
  }

  const sc = getScore(row.matchId);
  const invalidDraw = isDrawScore(sc);
  const disabled = readOnly || !row.editable;
  return `
    <div class="match-row ${row.kind === 'knockout' ? 'match-row--knockout' : ''} ${invalidDraw ? 'match-row--invalid' : ''}" data-mid="${row.matchId}">
      <span class="m-time">${fmtClock(row.startMinutes)}</span>
      <div class="m-body">
        <div class="m-teams">${row.leftLabel} <span class="vs">vs</span> ${row.rightLabel}</div>
        <div class="m-subline">
          <span class="m-pool-tag" style="background:${row.tagColor}">${row.tag}</span>
          <span class="m-stage-copy ${invalidDraw ? 'm-stage-copy--error' : ''}">${invalidDraw ? 'Score incorrect : pas de match nul, ajouter le point decisif' : row.detail}</span>
        </div>
      </div>
      <div class="m-score">
        <input class="sc-input ${invalidDraw ? 'sc-input--invalid' : ''}" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2"
          value="${sc.s1 ?? ''}" placeholder="—"
          data-mid="${row.matchId}" data-side="s1" ${disabled ? 'disabled' : ''}>
        <span class="sc-sep">:</span>
        <input class="sc-input ${invalidDraw ? 'sc-input--invalid' : ''}" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2"
          value="${sc.s2 ?? ''}" placeholder="—"
          data-mid="${row.matchId}" data-side="s2" ${disabled ? 'disabled' : ''}>
      </div>
    </div>`;
}
