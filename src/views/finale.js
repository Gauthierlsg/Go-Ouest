import { allPoolMatches, computeKnockout, label } from '../tournament.js';
import { getScore, setScore } from '../state.js';

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
  <div class="b-match-wrap">
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
        <div class="bracket">

          <!-- Quarts de finale : 2 paires de 2 matchs -->
          <div class="b-round">
            <div class="b-round-title">Quarts de finale</div>
            <div class="b-pair">
              ${bMatch(rounds.quarterfinals[0], `${q0?.pool ?? '—'} vs ${q7?.pool ?? '—'}`)}
              ${bMatch(rounds.quarterfinals[1], `${q1?.pool ?? '—'} vs ${q6?.pool ?? '—'}`)}
            </div>
            <div class="b-round-spacer"></div>
            <div class="b-pair">
              ${bMatch(rounds.quarterfinals[2], `${q2?.pool ?? '—'} vs ${q5?.pool ?? '—'}`)}
              ${bMatch(rounds.quarterfinals[3], `${q3?.pool ?? '—'} vs ${q4?.pool ?? '—'}`)}
            </div>
          </div>

          <!-- Demi-finales : 1 paire de 2 matchs, alignée avec les QF -->
          <div class="b-round">
            <div class="b-round-title">Demi-finales</div>
            <div class="b-pair b-pair--sf" style="margin-top:3rem">
              ${bMatch(rounds.semifinals[0], 'Vainqueurs QF1/QF2')}
              ${bMatch(rounds.semifinals[1], 'Vainqueurs QF3/QF4')}
            </div>
          </div>

          <!-- Finale + 3ème place, centrés sur la SF -->
          <div class="b-round">
            <div class="b-round-title">Finale</div>
            <div class="b-pair b-pair--solo" style="margin-top:9rem">
              ${bMatch(rounds.finals[0], 'Vainqueurs SF')}
            </div>
            <div class="b-label-3rd" style="margin-top:1.5rem">3ème place</div>
            <div class="b-pair b-pair--solo" style="margin-top:0.5rem">
              ${bMatch(rounds.finals[1], 'Perdants SF')}
            </div>
          </div>

          <!-- Champion -->
          <div class="b-round">
            <div class="b-round-title" style="margin-top:10rem">Champion</div>
            <div class="trophy-box">
              <div class="trophy-icon">🏆</div>
              <div class="trophy-name">GO OUEST 2026</div>
              <div class="trophy-sub">${champion?.team ? label(champion.team) : 'À déterminer'}</div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div class="section-card" style="margin-top:1.25rem">
      <div class="section-title" style="margin-bottom:1rem">Qualifiés provisoires</div>
      <div class="qual-grid">${qualCards}</div>
    </div>`;

  if (container.dataset.scoreBound === 'true') return;

  container.addEventListener('input', e => {
    const inp = e.target;
    if (!inp.dataset.mid) return;
    const value = sanitizeScore(inp.value);
    if (inp.value !== value) inp.value = value;
    setScore(inp.dataset.mid, inp.dataset.side, value, { notify: false });
  });

  container.addEventListener('change', e => {
    const inp = e.target;
    if (!inp.dataset.mid) return;
    const value = sanitizeScore(inp.value);
    if (inp.value !== value) inp.value = value;
    setScore(inp.dataset.mid, inp.dataset.side, value);
  });

  container.addEventListener('focusout', e => {
    const inp = e.target;
    if (!inp.dataset.mid) return;
    const value = sanitizeScore(inp.value);
    if (inp.value !== value) inp.value = value;
    setScore(inp.dataset.mid, inp.dataset.side, value);
  });
  container.dataset.scoreBound = 'true';
}
