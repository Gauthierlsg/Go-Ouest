const KEY = 'go-ouest-2026';
const LEGACY_KEYS = ['go-ouest-2025'];

let _state = loadState();

export function getState() {
  return _state;
}

export function setScore(matchId, side, value) {
  if (!_state.scores[matchId]) _state.scores[matchId] = {};
  _state.scores[matchId][side] = value === '' ? null : Number(value);
  _persist();
}

export function getScore(matchId) {
  return _state.scores[matchId] || {};
}

export function subscribe(fn) {
  _listeners.push(fn);
}

const _listeners = [];

function loadState() {
  const raw = localStorage.getItem(KEY);
  if (raw) return normalizeState(raw);

  for (const legacyKey of LEGACY_KEYS) {
    const legacyRaw = localStorage.getItem(legacyKey);
    if (!legacyRaw) continue;
    const migrated = normalizeState(legacyRaw);
    localStorage.setItem(KEY, JSON.stringify(migrated));
    return migrated;
  }

  return { scores: {} };
}

function normalizeState(raw) {
  try {
    const parsed = JSON.parse(raw);
    return { scores: parsed?.scores ?? {} };
  } catch {
    return { scores: {} };
  }
}

function _persist() {
  localStorage.setItem(KEY, JSON.stringify(_state));
  _listeners.forEach(fn => fn(_state));
}
