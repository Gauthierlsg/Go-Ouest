import { allPoolMatches, computeKnockout, label } from '../tournament.js';
import { getScore, isReadOnlyMode, setScore } from '../state.js';

const BRACKET_CONNECTIONS = [
  ['QF1', 'SF1'],
  ['QF2', 'SF1'],
  ['QF3', 'SF2'],
  ['QF4', 'SF2'],
  ['SF1', 'F'],
  ['SF2', 'F'],
  ['SF1', 'TP'],
  ['SF2', 'TP'],
  ['F', 'CHAMPION'],
];

function sanitizeScore(value) {
  return value.replace(/\D+/g, '').slice(0, 2);
}

const teamTag = (team) => {
  if (!team?.team) return '<span class="b-team-meta">À déterminer</span>';
  return `<span class="m-pool-tag" style="background:${team.color ?? '#888'}">${team.pool ?? 'Phase finale'}${team.isWild ? ' ⭐' : ''}</span>`;
};

const bTeam = (team, matchId, side, isDisabled) => {
  if (!team?.team) return `<div class="b-team b-team--tbd"><span>À déterminer</span></div>`;
  const sc = getScore(matchId);
  return `
    <div class="b-team">
      <div class="b-team-main">
        ${teamTag(team)}
        <span>${label(team.team)}</span>
      </div>
      <div class="b-score">
        <input class="b-score-input" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2"
          value="${sc[side] ?? ''}" placeholder="—"
          data-mid="${matchId}" data-side="${side}" ${isDisabled ? 'disabled' : ''}>
      </div>
    </div>`;
};

const bMatch = (match, sideLabel) => `
  <div class="b-match-wrap" data-match-id="${match.id}">
    <div class="b-match">
      <div class="b-match-head">
        <span>${match.label}</span>
        ${match.isTie ? '<span class="b-error">Pas de match nul</span>' : `<span class="b-side-label">${sideLabel}</span>`}
      </div>
      ${bTeam(match.sides[0], match.id, 's1', !match.ready)}
      ${bTeam(match.sides[1], match.id, 's2', !match.ready)}
    </div>
  </div>`;

export function renderFinale(container) {
  const readOnly = isReadOnlyMode();
  const matches = allPoolMatches();
  const { qualifiers, rounds, champion } = computeKnockout(matches);
  const [q0, q1, q2, q3, q4, q5, q6, q7] = qualifiers;

  const qualCards = qualifiers.map((q, i) => `
    <div class="qual-card" style="border-color:${q?.color||'#aaa'}">
      <div class="qual-pool" style="color:${q?.color||'#aaa'}">
        ${q?.pool || '—'}${q?.isWild ? ' ⭐ Wildcard' : ''}
      </div>
      <div class="qual-name">${q?.team ? label(q.team) : '—'}</div>
      <div class="qual-meta">QF${i + 1} · ${q?.pts ?? 0} pts</div>
    </div>`).join('');

  container.innerHTML = `
    <div class="banner info">
      ℹ️ Les quarts se remplissent selon les résultats des poules.
      Saisissez ensuite les scores de phase finale ici pour faire avancer automatiquement le bracket.
    </div>

    <div class="section-card">
      <div class="section-title" style="margin-bottom:1rem">Phase finale · 8 qualifiés</div>
      <div class="bracket-wrap">
        <div class="bracket-stage">
          <svg class="bracket-svg" aria-hidden="true"></svg>
          <div class="bracket">

            <div class="b-round b-round--quarters">
              <div class="b-round-title">Quarts de finale</div>
              <div class="b-round-body">
                ${bMatchWithMode(rounds.quarterfinals[0], `${q0?.pool ?? '—'} vs ${q7?.pool ?? '—'}`, readOnly)}
                ${bMatchWithMode(rounds.quarterfinals[1], `${q1?.pool ?? '—'} vs ${q6?.pool ?? '—'}`, readOnly)}
                ${bMatchWithMode(rounds.quarterfinals[2], `${q2?.pool ?? '—'} vs ${q5?.pool ?? '—'}`, readOnly)}
                ${bMatchWithMode(rounds.quarterfinals[3], `${q3?.pool ?? '—'} vs ${q4?.pool ?? '—'}`, readOnly)}
              </div>
            </div>

            <div class="b-round b-round--semis">
              <div class="b-round-title">Demi-finales</div>
              <div class="b-round-body">
                ${bMatchWithMode(rounds.semifinals[0], 'Vainqueurs QF1/QF2', readOnly)}
                ${bMatchWithMode(rounds.semifinals[1], 'Vainqueurs QF3/QF4', readOnly)}
              </div>
            </div>

            <div class="b-round b-round--finals">
              <div class="b-round-title">Finale</div>
              <div class="b-round-body">
                ${bMatchWithMode(rounds.finals[0], 'Vainqueurs SF', readOnly)}
                <div class="b-label-3rd">3ème place</div>
                ${bMatchWithMode(rounds.finals[1], 'Perdants SF', readOnly)}
              </div>
            </div>

            <div class="b-round b-round--champion">
              <div class="b-round-title">Champion</div>
              <div class="b-round-body">
                <div class="trophy-box" data-node-id="CHAMPION">
                  <div class="trophy-icon">🏆</div>
                  <div class="trophy-name">GO OUEST 2026</div>
                  <div class="trophy-sub">${champion?.team ? label(champion.team) : 'À déterminer'}</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div class="section-card" style="margin-top:1.25rem">
      <div class="section-title" style="margin-bottom:1rem">Qualifiés provisoires</div>
      <div class="qual-grid">${qualCards}</div>
    </div>`;

  ensureBracketLayout(container);
  scheduleBracketLayout(container);

  if (container.dataset.scoreBound === 'true') return;

  container.addEventListener('input', e => {
    if (isReadOnlyMode()) return;
    const inp = e.target;
    if (!inp.dataset.mid) return;
    const value = sanitizeScore(inp.value);
    if (inp.value !== value) inp.value = value;
    setScore(inp.dataset.mid, inp.dataset.side, value, { notify: false });
  });

  container.addEventListener('change', e => {
    if (isReadOnlyMode()) return;
    const inp = e.target;
    if (!inp.dataset.mid) return;
    const value = sanitizeScore(inp.value);
    if (inp.value !== value) inp.value = value;
    setScore(inp.dataset.mid, inp.dataset.side, value);
  });

  container.addEventListener('focusout', e => {
    if (isReadOnlyMode()) return;
    const inp = e.target;
    if (!inp.dataset.mid) return;
    const value = sanitizeScore(inp.value);
    if (inp.value !== value) inp.value = value;
    setScore(inp.dataset.mid, inp.dataset.side, value);
  });
  container.dataset.scoreBound = 'true';
}

function ensureBracketLayout(container) {
  if (!container._bracketResizeObserver) {
    container._bracketResizeObserver = new ResizeObserver(() => scheduleBracketLayout(container));
  }

  const stage = container.querySelector('.bracket-stage');
  if (container._observedBracketStage && container._observedBracketStage !== stage) {
    container._bracketResizeObserver.unobserve(container._observedBracketStage);
  }
  if (stage && container._observedBracketStage !== stage) {
    container._bracketResizeObserver.observe(stage);
    container._observedBracketStage = stage;
  }

  if (!container._bracketWindowBound) {
    container._bracketWindowBound = true;
    window.addEventListener('resize', () => scheduleBracketLayout(container));
  }
}

function scheduleBracketLayout(container) {
  if (container._bracketRaf) cancelAnimationFrame(container._bracketRaf);
  container._bracketRaf = requestAnimationFrame(() => {
    container._bracketRaf = null;
    applyBracketLayout(container);
  });
}

function applyBracketLayout(container) {
  const stage = container.querySelector('.bracket-stage');
  if (!stage) return;

  const bodies = {
    quarters: stage.querySelector('.b-round--quarters .b-round-body'),
    semis: stage.querySelector('.b-round--semis .b-round-body'),
    finals: stage.querySelector('.b-round--finals .b-round-body'),
    champion: stage.querySelector('.b-round--champion .b-round-body'),
  };

  const elements = {
    QF1: stage.querySelector('[data-match-id="QF1"]'),
    QF2: stage.querySelector('[data-match-id="QF2"]'),
    QF3: stage.querySelector('[data-match-id="QF3"]'),
    QF4: stage.querySelector('[data-match-id="QF4"]'),
    SF1: stage.querySelector('[data-match-id="SF1"]'),
    SF2: stage.querySelector('[data-match-id="SF2"]'),
    F: stage.querySelector('[data-match-id="F"]'),
    TP: stage.querySelector('[data-match-id="TP"]'),
    CHAMPION: stage.querySelector('[data-node-id="CHAMPION"]'),
  };

  if (Object.values(bodies).some(body => !body) || Object.values(elements).some(element => !element)) return;

  const label = stage.querySelector('.b-label-3rd');
  if (!label) return;

  const matchHeight = elements.QF1.getBoundingClientRect().height;
  const trophyHeight = elements.CHAMPION.getBoundingClientRect().height;
  const labelHeight = label.getBoundingClientRect().height;
  const gap = 16;
  const groupGap = 24;
  const thirdPlaceGap = 28;
  const thirdPlaceLabelGap = 10;

  const top = {
    QF1: 0,
    QF2: matchHeight + gap,
  };
  top.QF3 = top.QF2 + matchHeight + groupGap;
  top.QF4 = top.QF3 + matchHeight + gap;
  top.SF1 = midpoint(top.QF1 + matchHeight / 2, top.QF2 + matchHeight / 2) - matchHeight / 2;
  top.SF2 = midpoint(top.QF3 + matchHeight / 2, top.QF4 + matchHeight / 2) - matchHeight / 2;
  top.F = midpoint(top.SF1 + matchHeight / 2, top.SF2 + matchHeight / 2) - matchHeight / 2;

  const labelTop = top.F + matchHeight + thirdPlaceGap;
  top.TP = labelTop + labelHeight + thirdPlaceLabelGap;
  top.CHAMPION = top.F + (matchHeight - trophyHeight) / 2;

  const stageHeight = Math.max(
    top.QF4 + matchHeight,
    top.SF2 + matchHeight,
    top.TP + matchHeight,
    top.CHAMPION + trophyHeight
  );

  Object.values(bodies).forEach(body => {
    body.style.height = `${stageHeight}px`;
  });

  ['QF1', 'QF2', 'QF3', 'QF4', 'SF1', 'SF2', 'F', 'TP'].forEach(id => {
    const el = elements[id];
    el.style.top = `${top[id]}px`;
  });

  label.style.top = `${labelTop}px`;
  elements.CHAMPION.style.top = `${top.CHAMPION}px`;

  drawBracketSvg(stage);
}

function midpoint(a, b) {
  return (a + b) / 2;
}

function drawBracketSvg(stage) {
  const svg = stage.querySelector('.bracket-svg');
  if (!svg) return;

  const stageRect = stage.getBoundingClientRect();
  const width = Math.ceil(stageRect.width);
  const height = Math.ceil(stageRect.height);

  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  svg.setAttribute('width', width);
  svg.setAttribute('height', height);

  svg.innerHTML = BRACKET_CONNECTIONS
    .map(([fromId, toId]) => {
      const from = getBracketNode(stage, fromId);
      const to = getBracketNode(stage, toId);
      if (!from || !to) return '';

      const start = getAnchor(from, 'right', stageRect);
      const end = getAnchor(to, 'left', stageRect);
      const midX = start.x + (end.x - start.x) / 2;
      return `<path d="M ${start.x} ${start.y} L ${midX} ${start.y} L ${midX} ${end.y} L ${end.x} ${end.y}" />`;
    })
    .join('');
}

function getBracketNode(stage, id) {
  if (id === 'CHAMPION') return stage.querySelector('[data-node-id="CHAMPION"]');
  return stage.querySelector(`[data-match-id="${id}"] .b-match`);
}

function getAnchor(node, side, stageRect) {
  const rect = node.getBoundingClientRect();
  return {
    x: Math.round((side === 'left' ? rect.left : rect.right) - stageRect.left),
    y: Math.round(rect.top + rect.height / 2 - stageRect.top),
  };
}

function bMatchWithMode(match, sideLabel, readOnly) {
  return `
    <div class="b-match-wrap" data-match-id="${match.id}">
      <div class="b-match">
        <div class="b-match-head">
          <span>${match.label}</span>
          ${match.isTie ? '<span class="b-error">Pas de match nul</span>' : `<span class="b-side-label">${sideLabel}</span>`}
        </div>
        ${bTeam(match.sides[0], match.id, 's1', !match.ready || readOnly)}
        ${bTeam(match.sides[1], match.id, 's2', !match.ready || readOnly)}
      </div>
    </div>`;
}
