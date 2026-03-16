import { POOLS } from '../data.js';
import { label, allPoolMatches, poolStandings } from '../tournament.js';

export function renderPools(container) {
  const matches = allPoolMatches();

  const rankClass = i => ['r1', 'r2', 'r3', 'rn'][Math.min(i, 3)];

  const poolCard = pool => {
    const standings = poolStandings(pool, matches);
    const rows = standings.map((s, i) => `
      <tr class="${i === 0 ? 'q' : ''}">
        <td><span class="rnk ${rankClass(i)}">${i + 1}</span></td>
        <td><span class="duo-name">${label(s.id)}</span></td>
        <td>${s.j}</td>
        <td>${s.v}</td>
        <td>${s.d}</td>
        <td><span class="pts-badge">${s.pts}</span></td>
      </tr>`).join('');

    return `
      <div class="pool-card">
        <div class="pool-hdr" style="background:${pool.color}">
          <h3>${pool.name}</h3>
          <span class="badge">${pool.teams.length} duos</span>
        </div>
        <table class="stand-table">
          <thead><tr><th>#</th><th>Duo</th><th>J</th><th>V</th><th>D</th><th>Pts</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>`;
  };

  container.innerHTML = `
    <div class="banner info">
      ℹ️ <div>
        <strong>Format :</strong> 7 poules → top 1 de chaque poule + meilleur 2ème = <strong>8 qualifiés</strong>.
        Ligne <span class="q-sample">verte</span> = qualifié provisoire.
      </div>
    </div>
    <div class="pools-grid">${POOLS.map(poolCard).join('')}</div>`;
}
