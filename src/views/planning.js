import {
  KNOCKOUT_BREAK_MIN,
  MATCH_DURATION_MIN,
  SLOT_MIN,
  START_HOUR,
  TRANSITION_MIN,
} from '../data.js';
import { allPoolMatches, buildSchedule, computeKnockout, label } from '../tournament.js';
import { commitScore, getScore, isReadOnlyMode, setDraftScore } from '../state.js';

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

  container.innerHTML = `
    <div class="banner">
      ⚠️ <strong>${poolMatches.length} matchs de poule + 8 matchs de phase finale · pause ${KNOCKOUT_BREAK_MIN} min · fin estimée ${fmtClock(planning.endMinutes)} (~${minutesToHuman(totalDuration)}).</strong>
      Si ça dépasse : réduire les matchs à <strong>${MATCH_DURATION_MIN - 2}-${MATCH_DURATION_MIN - 1} min</strong> et garder la transition fluide.
    </div>
    <div class="planning-header">
      <span class="section-title">Planning</span>
      <span class="planning-meta">Début ${String(START_HOUR).padStart(2, '0')}h00 · matchs ${MATCH_DURATION_MIN} min + ${TRANSITION_MIN} min transition · pause ${KNOCKOUT_BREAK_MIN} min avant les quarts</span>
    </div>
    <div class="courts-grid">
      <div class="court-card">
        <div class="court-hdr c1-hdr">🎾 Terrain 1</div>
        ${planning.courts[0].map(row => renderRow(row, readOnly)).join('')}
      </div>
      <div class="court-card">
        <div class="court-hdr c2-hdr">🎾 Terrain 2</div>
        ${planning.courts[1].map(row => renderRow(row, readOnly)).join('')}
      </div>
    </div>`;

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
  const courts = [[], []];
  const startMinutes = START_HOUR * 60;

  poolSlots.forEach((slot, slotIdx) => {
    const slotStart = startMinutes + slotIdx * SLOT_MIN;
    courts[0].push(slot[0] ? buildPoolRow(slot[0], slotStart) : buildEmptyRow(slotStart));
    courts[1].push(slot[1] ? buildPoolRow(slot[1], slotStart) : buildEmptyRow(slotStart));
  });

  const poolEndMinutes = startMinutes + poolSlots.length * SLOT_MIN;
  courts[0].push(buildBreakRow(poolEndMinutes));
  courts[1].push(buildBreakRow(poolEndMinutes));

  const knockoutStart = poolEndMinutes + KNOCKOUT_BREAK_MIN;
  const { rounds } = computeKnockout(poolMatches);
  const matchesById = Object.fromEntries(
    [...rounds.quarterfinals, ...rounds.semifinals, ...rounds.finals].map(match => [match.id, match])
  );

  const knockoutSlots = [
    ['QF1', 'QF2'],
    ['QF3', 'QF4'],
    ['SF1', 'SF2'],
    ['TP', 'F'],
  ];

  knockoutSlots.forEach((slot, slotIdx) => {
    const slotStart = knockoutStart + slotIdx * SLOT_MIN;
    courts[0].push(buildKnockoutRow(matchesById[slot[0]], slotStart, slot[0]));
    courts[1].push(buildKnockoutRow(matchesById[slot[1]], slotStart, slot[1]));
  });

  return {
    courts,
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

function buildBreakRow(startMinutes) {
  return {
    type: 'break',
    startMinutes,
    label: 'Pause avant la phase finale',
    detail: `${KNOCKOUT_BREAK_MIN} min · calcul des qualifiés`,
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

function renderRow(row, readOnly) {
  if (row.type === 'empty') {
    return `
      <div class="empty-slot">
        <span class="m-time">${fmtClock(row.startMinutes)}</span>
        <span>—</span>
      </div>`;
  }

  if (row.type === 'break') {
    return `
      <div class="planning-break-row">
        <span class="m-time">${fmtClock(row.startMinutes)}</span>
        <div class="m-body">
          <div class="planning-break-title">${row.label}</div>
          <div class="planning-break-meta">${row.detail}</div>
        </div>
      </div>`;
  }

  const sc = getScore(row.matchId);
  const disabled = readOnly || !row.editable;
  return `
    <div class="match-row ${row.kind === 'knockout' ? 'match-row--knockout' : ''}" data-mid="${row.matchId}">
      <span class="m-time">${fmtClock(row.startMinutes)}</span>
      <div class="m-body">
        <div class="m-teams">${row.leftLabel} <span class="vs">vs</span> ${row.rightLabel}</div>
        <div class="m-subline">
          <span class="m-pool-tag" style="background:${row.tagColor}">${row.tag}</span>
          <span class="m-stage-copy">${row.detail}</span>
        </div>
      </div>
      <div class="m-score">
        <input class="sc-input" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2"
          value="${sc.s1 ?? ''}" placeholder="—"
          data-mid="${row.matchId}" data-side="s1" ${disabled ? 'disabled' : ''}>
        <span class="sc-sep">:</span>
        <input class="sc-input" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2"
          value="${sc.s2 ?? ''}" placeholder="—"
          data-mid="${row.matchId}" data-side="s2" ${disabled ? 'disabled' : ''}>
      </div>
    </div>`;
}
