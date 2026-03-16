import { allPoolMatches, computeQualifiers, label } from '../tournament.js';

const bTeam = (q) => {
  const name = q?.team ? label(q.team) : '— À déterminer —';
  const tag = q?.team
    ? `<span class="m-pool-tag" style="background:${q.color}">${q.pool}${q.isWild ? ' ⭐' : ''}</span> `
    : '';
  return `<div class="b-team"><div>${tag}${name}</div><span class="b-sc">—</span></div>`;
};

const bMatch = (q1, q2) => `
  <div class="b-match-wrap">
    <div class="b-match">
      ${bTeam(q1)}
      ${bTeam(q2)}
    </div>
  </div>`;

export function renderFinale(container) {
  const matches = allPoolMatches();
  const qualifiers = computeQualifiers(matches);
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
      ℹ️ Le bracket se remplit automatiquement selon les résultats des poules.
      Entrez les scores dans l'onglet <strong>Planning</strong>.
    </div>

    <div class="section-card">
      <div class="section-title" style="margin-bottom:1rem">Phase finale · 8 qualifiés</div>
      <div class="bracket-wrap">
        <div class="bracket">

          <!-- Quarts de finale : 2 paires de 2 matchs -->
          <div class="b-round">
            <div class="b-round-title">Quarts de finale</div>
            <div class="b-pair">
              ${bMatch(q0, q7)}
              ${bMatch(q1, q6)}
            </div>
            <div class="b-round-spacer"></div>
            <div class="b-pair">
              ${bMatch(q2, q5)}
              ${bMatch(q3, q4)}
            </div>
          </div>

          <!-- Demi-finales : 1 paire de 2 matchs, alignée avec les QF -->
          <div class="b-round">
            <div class="b-round-title">Demi-finales</div>
            <div class="b-pair b-pair--sf" style="margin-top:3rem">
              ${bMatch(null, null)}
              ${bMatch(null, null)}
            </div>
          </div>

          <!-- Finale + 3ème place, centrés sur la SF -->
          <div class="b-round">
            <div class="b-round-title">Finale</div>
            <div class="b-pair b-pair--solo" style="margin-top:9rem">
              ${bMatch(null, null)}
            </div>
            <div class="b-label-3rd" style="margin-top:1.5rem">3ème place</div>
            <div class="b-pair b-pair--solo" style="margin-top:0.5rem">
              ${bMatch(null, null)}
            </div>
          </div>

          <!-- Champion -->
          <div class="b-round">
            <div class="b-round-title" style="margin-top:10rem">Champion</div>
            <div class="trophy-box">
              <div class="trophy-icon">🏆</div>
              <div class="trophy-name">GO OUEST 2026</div>
              <div class="trophy-sub">À déterminer</div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div class="section-card" style="margin-top:1.25rem">
      <div class="section-title" style="margin-bottom:1rem">Qualifiés provisoires</div>
      <div class="qual-grid">${qualCards}</div>
    </div>`;
}
