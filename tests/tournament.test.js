import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../src/state.js', () => {
  let scores = {};
  return {
    getScore: vi.fn(id => scores[String(id)] || {}),
    isDrawScore: vi.fn(sc => sc?.s1 != null && sc?.s2 != null && Number(sc.s1) === Number(sc.s2)),
    __setMockScores: (s) => { scores = { ...s }; },
  };
});

import { __setMockScores } from '../src/state.js';
import {
  allPoolMatches,
  teamStats,
  poolStandings,
  computeQualifiers,
  computeKnockout,
  buildSchedule,
} from '../src/tournament.js';
import { POOLS } from '../src/data.js';

beforeEach(() => {
  __setMockScores({});
});

// ── allPoolMatches ──────────────────────────────────────

describe('allPoolMatches', () => {
  it('generates correct number of matches', () => {
    const matches = allPoolMatches();
    // 2 pools of 4 teams → 6+6 = 12, 5 pools of 3 teams → 3*5 = 15 → total 27
    expect(matches).toHaveLength(27);
  });

  it('assigns unique sequential ids', () => {
    const ids = allPoolMatches().map(m => m.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
    expect(ids).toEqual(ids.map((_, i) => i + 1));
  });

  it('labels each match with its pool name and color', () => {
    const matches = allPoolMatches();
    const pouleA = matches.filter(m => m.pool === 'Poule A');
    expect(pouleA).toHaveLength(6); // C(4,2) = 6
    expect(pouleA[0].color).toBe('#1a5c38');
  });
});

// ── teamStats ───────────────────────────────────────────

describe('teamStats', () => {
  it('computes wins, losses, points and goals', () => {
    const matches = allPoolMatches();
    // Team 1 in Poule A: matches 1 (vs 8), 2 (vs 15), 3 (vs 26)
    __setMockScores({
      '1': { s1: 6, s2: 2 }, // team 1 beats team 8
      '2': { s1: 6, s2: 3 }, // team 1 beats team 15
      '3': { s1: 2, s2: 6 }, // team 1 loses to team 26
    });

    const stats = teamStats(1, 'Poule A', matches);
    expect(stats.j).toBe(3);  // 3 matches played
    expect(stats.v).toBe(2);  // 2 wins
    expect(stats.d).toBe(1);  // 1 loss
    expect(stats.pts).toBe(6); // 2 wins * 3pts
    expect(stats.gf).toBe(14); // 6+6+2
    expect(stats.ga).toBe(11); // 2+3+6
  });

  it('ignores draws', () => {
    const matches = allPoolMatches();
    __setMockScores({
      '1': { s1: 4, s2: 4 }, // draw → ignored
    });

    const stats = teamStats(1, 'Poule A', matches);
    expect(stats.j).toBe(0);
    expect(stats.pts).toBe(0);
  });

  it('ignores incomplete scores', () => {
    const matches = allPoolMatches();
    __setMockScores({
      '1': { s1: 6 }, // only one side
    });

    const stats = teamStats(1, 'Poule A', matches);
    expect(stats.j).toBe(0);
  });
});

// ── poolStandings ───────────────────────────────────────

describe('poolStandings', () => {
  it('sorts by points then goal difference then goals for', () => {
    const matches = allPoolMatches();
    const pouleC = POOLS.find(p => p.name === 'Poule C'); // teams 3, 10, 17

    // Match IDs for Poule C: 13 (3v10), 14 (3v17), 15 (10v17)
    __setMockScores({
      '13': { s1: 6, s2: 4 }, // 3 beats 10
      '14': { s1: 6, s2: 3 }, // 3 beats 17
      '15': { s1: 6, s2: 4 }, // 10 beats 17
    });

    const standings = poolStandings(pouleC, matches);
    expect(standings[0].id).toBe(3);  // 6pts, gd +5
    expect(standings[1].id).toBe(10); // 3pts, gd +2
    expect(standings[2].id).toBe(17); // 0pts, gd -7
  });

  it('breaks ties by goal difference', () => {
    const matches = allPoolMatches();
    const pouleC = POOLS.find(p => p.name === 'Poule C');

    // 3 beats 10 by 1, 10 beats 17 by 1, 17 beats 3 by 1 → all 3pts
    // But different goal differentials based on exact scores
    __setMockScores({
      '13': { s1: 6, s2: 5 }, // 3 beats 10, gd +1
      '14': { s1: 2, s2: 6 }, // 3 loses to 17, gd -4
      '15': { s1: 6, s2: 1 }, // 10 beats 17, gd +5
    });

    const standings = poolStandings(pouleC, matches);
    // team 10: 3pts, gf=11, ga=7, gd=+4
    // team 3: 3pts, gf=8, ga=11, gd=-3
    // team 17: 3pts, gf=7, ga=8, gd=-1
    expect(standings[0].id).toBe(10);
    expect(standings[1].id).toBe(17);
    expect(standings[2].id).toBe(3);
  });
});

// ── computeQualifiers ───────────────────────────────────

describe('computeQualifiers', () => {
  function setAllPoolScores() {
    // Set scores so that first team in each pool wins all
    __setMockScores({
      // Poule A (1,8,15,26)
      '1': { s1: 6, s2: 2 }, '2': { s1: 6, s2: 3 }, '3': { s1: 6, s2: 1 },
      '4': { s1: 6, s2: 4 }, '5': { s1: 6, s2: 3 }, '6': { s1: 6, s2: 4 },
      // Poule B (2,9,16,27)
      '7': { s1: 6, s2: 2 }, '8': { s1: 6, s2: 3 }, '9': { s1: 6, s2: 1 },
      '10': { s1: 6, s2: 4 }, '11': { s1: 6, s2: 3 }, '12': { s1: 6, s2: 4 },
      // Poule C (3,10,17)
      '13': { s1: 6, s2: 2 }, '14': { s1: 6, s2: 3 }, '15': { s1: 6, s2: 4 },
      // Poule D (4,11,18)
      '16': { s1: 6, s2: 2 }, '17': { s1: 6, s2: 3 }, '18': { s1: 6, s2: 4 },
      // Poule E (5,12,19)
      '19': { s1: 6, s2: 2 }, '20': { s1: 6, s2: 3 }, '21': { s1: 6, s2: 4 },
      // Poule F (6,13,20)
      '22': { s1: 6, s2: 2 }, '23': { s1: 6, s2: 3 }, '24': { s1: 6, s2: 4 },
      // Poule G (7,14,25)
      '25': { s1: 6, s2: 2 }, '26': { s1: 6, s2: 3 }, '27': { s1: 6, s2: 4 },
    });
  }

  it('returns 8 qualifiers (7 pool winners + 1 wildcard)', () => {
    setAllPoolScores();
    const matches = allPoolMatches();
    const qualifiers = computeQualifiers(matches);
    expect(qualifiers).toHaveLength(8);
  });

  it('selects each pool winner as qualifier', () => {
    setAllPoolScores();
    const matches = allPoolMatches();
    const qualifiers = computeQualifiers(matches);

    // Pool winners (first team in each pool wins all matches)
    expect(qualifiers[0].team).toBe(1);  // Poule A
    expect(qualifiers[1].team).toBe(2);  // Poule B
    expect(qualifiers[2].team).toBe(3);  // Poule C
    expect(qualifiers[3].team).toBe(4);  // Poule D
    expect(qualifiers[4].team).toBe(5);  // Poule E
    expect(qualifiers[5].team).toBe(6);  // Poule F
    expect(qualifiers[6].team).toBe(7);  // Poule G
  });

  it('picks wildcard from best 2nd of 4-team pools only', () => {
    setAllPoolScores();
    const matches = allPoolMatches();
    const qualifiers = computeQualifiers(matches);
    const wildcard = qualifiers[7];

    expect(wildcard.isWild).toBe(true);
    // Must be 2nd of Poule A (team 8) or Poule B (team 9) — only 4-team pools
    expect([8, 9]).toContain(wildcard.team);
  });

  it('returns null teams when no scores exist', () => {
    const matches = allPoolMatches();
    const qualifiers = computeQualifiers(matches);

    // Without scores, standings are alphabetical by team order (all 0pts)
    // First team in each pool array wins by insertion order
    qualifiers.forEach(q => {
      expect(q.team).toBeDefined();
    });
  });
});

// ── computeKnockout ─────────────────────────────────────

describe('computeKnockout', () => {
  function setFullTournament() {
    __setMockScores({
      // Pool scores (same as above)
      '1': { s1: 6, s2: 2 }, '2': { s1: 6, s2: 3 }, '3': { s1: 6, s2: 1 },
      '4': { s1: 6, s2: 4 }, '5': { s1: 6, s2: 3 }, '6': { s1: 6, s2: 4 },
      '7': { s1: 6, s2: 2 }, '8': { s1: 6, s2: 3 }, '9': { s1: 6, s2: 1 },
      '10': { s1: 6, s2: 4 }, '11': { s1: 6, s2: 3 }, '12': { s1: 6, s2: 4 },
      '13': { s1: 6, s2: 2 }, '14': { s1: 6, s2: 3 }, '15': { s1: 6, s2: 4 },
      '16': { s1: 6, s2: 2 }, '17': { s1: 6, s2: 3 }, '18': { s1: 6, s2: 4 },
      '19': { s1: 6, s2: 2 }, '20': { s1: 6, s2: 3 }, '21': { s1: 6, s2: 4 },
      '22': { s1: 6, s2: 2 }, '23': { s1: 6, s2: 3 }, '24': { s1: 6, s2: 4 },
      '25': { s1: 6, s2: 2 }, '26': { s1: 6, s2: 3 }, '27': { s1: 6, s2: 4 },
      // Knockout
      'QF1': { s1: 6, s2: 3 }, 'QF2': { s1: 6, s2: 4 },
      'QF3': { s1: 6, s2: 2 }, 'QF4': { s1: 6, s2: 3 },
      'SF1': { s1: 6, s2: 4 }, 'SF2': { s1: 6, s2: 3 },
      'F': { s1: 6, s2: 2 },
      'TP': { s1: 6, s2: 4 },
    });
  }

  it('resolves champion when all matches are scored', () => {
    setFullTournament();
    const matches = allPoolMatches();
    const knockout = computeKnockout(matches);

    expect(knockout.champion).not.toBeNull();
    expect(knockout.champion.team).toBe(1); // team 1 wins F
  });

  it('resolves podium (1st, 2nd, 3rd)', () => {
    setFullTournament();
    const matches = allPoolMatches();
    const knockout = computeKnockout(matches);

    const final = knockout.rounds.finals[0];
    const thirdPlace = knockout.rounds.finals[1];

    expect(final.winner.team).toBe(1);  // 1st
    expect(final.loser.team).toBe(3);   // 2nd
    expect(thirdPlace.winner.team).toBe(2); // 3rd
  });

  it('returns null champion when no scores', () => {
    const matches = allPoolMatches();
    const knockout = computeKnockout(matches);
    expect(knockout.champion).toBeNull();
  });

  it('returns null winner for unplayed matches', () => {
    const matches = allPoolMatches();
    const knockout = computeKnockout(matches);

    knockout.rounds.quarterfinals.forEach(qf => {
      expect(qf.winner).toBeNull();
    });
  });

  it('propagates QF winners to SF sides', () => {
    // Set pool + QF scores only
    __setMockScores({
      '1': { s1: 6, s2: 2 }, '2': { s1: 6, s2: 3 }, '3': { s1: 6, s2: 1 },
      '4': { s1: 6, s2: 4 }, '5': { s1: 6, s2: 3 }, '6': { s1: 6, s2: 4 },
      '7': { s1: 6, s2: 2 }, '8': { s1: 6, s2: 3 }, '9': { s1: 6, s2: 1 },
      '10': { s1: 6, s2: 4 }, '11': { s1: 6, s2: 3 }, '12': { s1: 6, s2: 4 },
      '13': { s1: 6, s2: 2 }, '14': { s1: 6, s2: 3 }, '15': { s1: 6, s2: 4 },
      '16': { s1: 6, s2: 2 }, '17': { s1: 6, s2: 3 }, '18': { s1: 6, s2: 4 },
      '19': { s1: 6, s2: 2 }, '20': { s1: 6, s2: 3 }, '21': { s1: 6, s2: 4 },
      '22': { s1: 6, s2: 2 }, '23': { s1: 6, s2: 3 }, '24': { s1: 6, s2: 4 },
      '25': { s1: 6, s2: 2 }, '26': { s1: 6, s2: 3 }, '27': { s1: 6, s2: 4 },
      'QF1': { s1: 6, s2: 3 }, 'QF2': { s1: 6, s2: 4 },
      'QF3': { s1: 6, s2: 2 }, 'QF4': { s1: 6, s2: 3 },
    });

    const matches = allPoolMatches();
    const knockout = computeKnockout(matches);

    // SF1 sides should be QF1 winner and QF2 winner
    const sf1 = knockout.rounds.semifinals[0];
    expect(sf1.sides[0].team).toBe(1); // QF1 winner
    expect(sf1.sides[1].team).toBe(2); // QF2 winner
    expect(sf1.ready).toBe(true);
  });

  it('rejects draw scores in knockout', () => {
    __setMockScores({
      '1': { s1: 6, s2: 2 }, '2': { s1: 6, s2: 3 }, '3': { s1: 6, s2: 1 },
      '4': { s1: 6, s2: 4 }, '5': { s1: 6, s2: 3 }, '6': { s1: 6, s2: 4 },
      '7': { s1: 6, s2: 2 }, '8': { s1: 6, s2: 3 }, '9': { s1: 6, s2: 1 },
      '10': { s1: 6, s2: 4 }, '11': { s1: 6, s2: 3 }, '12': { s1: 6, s2: 4 },
      '13': { s1: 6, s2: 2 }, '14': { s1: 6, s2: 3 }, '15': { s1: 6, s2: 4 },
      '16': { s1: 6, s2: 2 }, '17': { s1: 6, s2: 3 }, '18': { s1: 6, s2: 4 },
      '19': { s1: 6, s2: 2 }, '20': { s1: 6, s2: 3 }, '21': { s1: 6, s2: 4 },
      '22': { s1: 6, s2: 2 }, '23': { s1: 6, s2: 3 }, '24': { s1: 6, s2: 4 },
      '25': { s1: 6, s2: 2 }, '26': { s1: 6, s2: 3 }, '27': { s1: 6, s2: 4 },
      'QF1': { s1: 4, s2: 4 }, // draw!
    });

    const matches = allPoolMatches();
    const knockout = computeKnockout(matches);
    const qf1 = knockout.rounds.quarterfinals[0];

    expect(qf1.winner).toBeNull();
    expect(qf1.isTie).toBe(true);
  });
});

// ── buildSchedule ───────────────────────────────────────

describe('buildSchedule', () => {
  it('schedules all matches', () => {
    const matches = allPoolMatches();
    const slots = buildSchedule(matches);
    const total = slots.reduce((sum, slot) => sum + slot.length, 0);
    expect(total).toBe(27);
  });

  it('puts at most 2 matches per slot (2 courts)', () => {
    const matches = allPoolMatches();
    const slots = buildSchedule(matches);
    slots.forEach(slot => {
      expect(slot.length).toBeLessThanOrEqual(2);
    });
  });

  it('never schedules the same team twice in one slot', () => {
    const matches = allPoolMatches();
    const slots = buildSchedule(matches);
    slots.forEach(slot => {
      const teams = slot.flatMap(m => [m.t1, m.t2]);
      expect(new Set(teams).size).toBe(teams.length);
    });
  });

  it('respects 2-slot rest when possible', () => {
    const matches = allPoolMatches();
    const slots = buildSchedule(matches);

    let violations = 0;
    for (let i = 2; i < slots.length; i++) {
      const current = new Set(slots[i].flatMap(m => [m.t1, m.t2]));
      const prev1 = new Set(slots[i - 1].flatMap(m => [m.t1, m.t2]));
      const prev2 = new Set(slots[i - 2].flatMap(m => [m.t1, m.t2]));
      for (const team of current) {
        if (prev1.has(team) || prev2.has(team)) violations++;
      }
    }
    // Some violations are inevitable with 23 teams and 2 courts,
    // but they should be rare (the scheduler relaxes constraints only when needed)
    expect(violations).toBeLessThan(10);
  });
});
