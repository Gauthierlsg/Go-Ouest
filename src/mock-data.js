import { allPoolMatches } from './tournament.js';

const KNOCKOUT_MATCH_IDS = ['QF1', 'QF2', 'QF3', 'QF4', 'SF1', 'SF2', 'F', 'TP'];

export function createMockTournamentState() {
  const scores = {};

  allPoolMatches().forEach(match => {
    scores[String(match.id)] = createPoolScore();
  });

  KNOCKOUT_MATCH_IDS.forEach(matchId => {
    scores[matchId] = createKnockoutScore();
  });

  return { scores };
}

function createPoolScore() {
  return createDecidedScore(4, 9);
}

function createKnockoutScore() {
  return createDecidedScore(4, 9);
}

function createDecidedScore(minWinner, maxWinner) {
  const winner = randomInt(minWinner, maxWinner);
  const loser = randomInt(0, Math.max(0, winner - 1));

  return Math.random() < 0.5
    ? { s1: winner, s2: loser }
    : { s1: loser, s2: winner };
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
