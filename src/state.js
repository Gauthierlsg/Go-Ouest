const KEY = 'go-ouest-2026';
const LEGACY_KEYS = ['go-ouest-2025'];
const BACKUP_FORMAT = 'go-ouest-backup';
const BACKUP_VERSION = 1;

let _state = loadState();
let _transientState = null;

export function getState() {
  return currentState();
}

export function setScore(matchId, side, value, options = {}) {
  const { notify = true } = options;
  if (!_state.scores[matchId]) _state.scores[matchId] = {};
  _state.scores[matchId][side] = value === '' ? null : Number(value);
  _persist(notify);
}

export function getScore(matchId) {
  return currentState().scores[matchId] || {};
}

export function exportState() {
  return {
    format: BACKUP_FORMAT,
    version: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    state: JSON.parse(JSON.stringify(currentState())),
  };
}

export function importState(payload) {
  const nextState = normalizeImport(payload);
  _state = nextState;
  _persist(true);
  return _state;
}

export function resetState() {
  _state = { scores: {} };
  _persist(true);
  return _state;
}

export function showSharedState(payload) {
  _transientState = normalizeImport(payload);
  _notify();
  return _transientState;
}

export function clearSharedState() {
  _transientState = null;
  _notify();
}

export function isReadOnlyMode() {
  return _transientState != null;
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

function currentState() {
  return _transientState ?? _state;
}

function normalizeState(raw) {
  try {
    const parsed = JSON.parse(raw);
    return sanitizeState(parsed);
  } catch {
    return { scores: {} };
  }
}

function normalizeImport(payload) {
  if (typeof payload === 'string') {
    try {
      payload = JSON.parse(payload);
    } catch {
      throw new Error('Le fichier importe n’est pas un JSON valide.');
    }
  }

  const candidate = payload?.state ?? payload;
  if (!candidate || typeof candidate !== 'object') {
    throw new Error('Le fichier importe ne contient pas d’etats de tournoi.');
  }
  if (!('scores' in candidate)) {
    throw new Error('Le fichier importe ne contient pas de scores de tournoi.');
  }

  return sanitizeState(candidate);
}

function sanitizeState(candidate) {
  const scores = candidate?.scores;
  if (!scores || typeof scores !== 'object' || Array.isArray(scores)) {
    return { scores: {} };
  }

  const nextScores = {};
  Object.entries(scores).forEach(([matchId, sides]) => {
    if (!sides || typeof sides !== 'object' || Array.isArray(sides)) return;
    const normalized = {};
    ['s1', 's2'].forEach(side => {
      const value = normalizeScoreValue(sides[side]);
      if (value !== undefined) normalized[side] = value;
    });
    if (Object.keys(normalized).length > 0) nextScores[matchId] = normalized;
  });

  return { scores: nextScores };
}

function normalizeScoreValue(value) {
  if (value === '' || value == null) return null;
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric < 0) return undefined;
  return numeric;
}

function _persist(notify = true) {
  localStorage.setItem(KEY, JSON.stringify(_state));
  if (notify) _notify();
}

function _notify() {
  const snapshot = currentState();
  _listeners.forEach(fn => fn(snapshot));
}
