import { DUOS, POOLS } from './data.js';
import { getScore } from './state.js';

export const duo = id => DUOS.find(d => d.id === id);
export const label = id => { const d = duo(id); return `${d.p1} & ${d.p2}`; };

export function allPoolMatches() {
  const list = []; let mid = 1;
  POOLS.forEach(pool => {
    const t = pool.teams;
    for (let i = 0; i < t.length; i++)
      for (let j = i + 1; j < t.length; j++)
        list.push({ id: mid++, pool: pool.name, color: pool.color, t1: t[i], t2: t[j] });
  });
  return list;
}

// Proportional interleave: each pool's matches are spread evenly across
// the full schedule using fractional positioning, so no pool clusters early or late.
function interleaveByPool(matches) {
  const byPool = {};
  matches.forEach(m => { (byPool[m.pool] ??= []).push(m); });
  const pools = Object.values(byPool);
  const total = matches.length;
  const positioned = [];
  pools.forEach((pool, pi) => {
    const step = total / pool.length;
    const offset = pi * (step / pools.length);
    pool.forEach((m, i) => positioned.push({ m, pos: offset + i * step }));
  });
  positioned.sort((a, b) => a.pos - b.pos);
  return positioned.map(p => p.m);
}

// Greedy conflict-free scheduler: 2 courts, no shared team in same slot,
// no team plays two consecutive slots (back-to-back rest constraint)
export function buildSchedule(matches) {
  const rem = interleaveByPool(matches); const slots = [];
  while (rem.length) {
    const prev = new Set(
      (slots[slots.length - 1] || []).flatMap(m => [m.t1, m.t2])
    );
    const used = new Set(); const slot = [];
    // Two passes: first avoid back-to-back, then relax if needed
    for (let pass = 0; pass < 2 && slot.length < 2; pass++) {
      for (let i = 0; i < rem.length && slot.length < 2; i++) {
        const m = rem[i];
        const backToBack = pass === 0 && (prev.has(m.t1) || prev.has(m.t2));
        if (!used.has(m.t1) && !used.has(m.t2) && !backToBack) {
          slot.push(m); used.add(m.t1); used.add(m.t2);
          rem.splice(i--, 1);
        }
      }
    }
    slots.push(slot);
  }
  return slots;
}

export function teamStats(tid, poolName, matches) {
  let j = 0, v = 0, d = 0, n = 0, pts = 0, gf = 0, ga = 0;
  matches
    .filter(m => m.pool === poolName && (m.t1 === tid || m.t2 === tid))
    .forEach(m => {
      const sc = getScore(m.id);
      if (sc.s1 == null || sc.s2 == null) return;
      const mine = m.t1 === tid ? sc.s1 : sc.s2;
      const theirs = m.t1 === tid ? sc.s2 : sc.s1;
      j++; gf += mine; ga += theirs;
      if (mine > theirs) { v++; pts += 3; }
      else if (mine === theirs) { n++; pts += 1; }
      else d++;
    });
  return { j, v, d, n, pts, gf, ga };
}

export function poolStandings(pool, matches) {
  return pool.teams
    .map(id => ({ id, ...teamStats(id, pool.name, matches) }))
    .sort((a, b) => b.pts - a.pts || (b.gf - b.ga) - (a.gf - a.ga) || b.gf - a.gf);
}

export function computeQualifiers(matches) {
  const winners = POOLS.map(pool => {
    const s = poolStandings(pool, matches);
    return { team: s[0]?.id, pool: pool.name, color: pool.color, pts: s[0]?.pts ?? 0 };
  });
  // Wildcard : meilleur 2ème des poules de 4 uniquement
  const bestRunnerUp = POOLS
    .filter(pool => pool.teams.length >= 4)
    .map(pool => {
      const s = poolStandings(pool, matches);
      return { team: s[1]?.id, pool: pool.name, color: pool.color, pts: s[1]?.pts ?? 0, isWild: true };
    }).sort((a, b) => b.pts - a.pts)[0];
  return [...winners, bestRunnerUp];
}
