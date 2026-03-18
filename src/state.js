const KEY = 'go-ouest-2026';
const LEGACY_KEYS = ['go-ouest-2025'];
const BACKUP_FORMAT = 'go-ouest-backup';
const BACKUP_VERSION = 1;
const DEFAULT_APP_MODE = {
  source: 'booting',
  admin: false,
  readOnly: true,
  remote: false,
  authConfigured: true,
  lastRemoteUpdate: null,
};

let _state = loadState();
let _appMode = { ...DEFAULT_APP_MODE };
let _mutationHandler = null;
const _listeners = [];

export function getState() {
  return _state;
}

export function getScore(matchId) {
  return _state.scores[String(matchId)] || {};
}

export function isDrawScore(score) {
  return score?.s1 != null && score?.s2 != null && Number(score.s1) === Number(score.s2);
}

export function countInvalidDrawScores() {
  return Object.values(_state.scores).filter(score => isDrawScore(score)).length;
}

export function exportState() {
  return {
    format: BACKUP_FORMAT,
    version: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    state: cloneState(_state),
  };
}

export function importState(payload) {
  const nextState = normalizeImport(payload);
  replaceState(nextState, { persist: true, notify: true });
  return _state;
}

export function resetState() {
  replaceState(defaultState(), { persist: true, notify: true });
  return _state;
}

export function replaceState(nextState, options = {}) {
  const { notify = true, persist = true } = options;
  const sanitized = sanitizeState(nextState);
  const changed = !statesEqual(_state, sanitized);
  _state = sanitized;
  if (persist) _persistLocal();
  if (notify && changed) _notify();
  return { changed, state: _state };
}

export function getAppMode() {
  return { ..._appMode };
}

export function isReadOnlyMode() {
  return _appMode.readOnly;
}

export function setAppMode(nextMode, options = {}) {
  const { forceNotify = false } = options;
  const merged = { ..._appMode, ...nextMode };
  const changed = !shallowEqual(_appMode, merged);
  _appMode = merged;
  if (changed || forceNotify) _notify();
  return _appMode;
}

export function registerMutationHandler(handler) {
  _mutationHandler = handler || null;
}

export function setDraftScore(matchId, side, value) {
  if (isReadOnlyMode()) return _state;
  applyScoreUpdate(_state, matchId, side, value);
  _persistLocal();
  return _state;
}

export async function commitScore(matchId, side, value) {
  if (isReadOnlyMode()) return _state;

  const previousState = cloneState(_state);
  applyScoreUpdate(_state, matchId, side, value);
  _persistLocal();
  _notify();

  if (isDrawScore(getScore(matchId))) {
    emitSyncError(new Error('Match nul interdit : saisis le point decisif pour departager le match.'));
    return _state;
  }

  if (!_mutationHandler) return _state;

  try {
    const result = await _mutationHandler({
      type: 'setScore',
      matchId: String(matchId),
      side,
      value: normalizeScoreValue(value),
    });

    if (result?.state) {
      replaceState(result.state, { persist: true, notify: true });
    }
    return _state;
  } catch (error) {
    // Keep local score even if remote sync fails — it will be re-synced on
    // the next successful write. Reverting here causes data loss on flaky
    // mobile connections.
    emitSyncError(error);
    throw error;
  }
}

export function subscribe(fn) {
  _listeners.push(fn);
  return () => {
    const idx = _listeners.indexOf(fn);
    if (idx >= 0) _listeners.splice(idx, 1);
  };
}

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

  return defaultState();
}

function defaultState() {
  return { scores: {} };
}

function normalizeState(raw) {
  try {
    return sanitizeState(JSON.parse(raw));
  } catch {
    return defaultState();
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
    throw new Error('Le fichier importe ne contient pas d’état de tournoi.');
  }
  if (!('scores' in candidate)) {
    throw new Error('Le fichier importe ne contient pas de scores de tournoi.');
  }

  return sanitizeState(candidate);
}

function sanitizeState(candidate) {
  const scores = candidate?.scores;
  if (!scores || typeof scores !== 'object' || Array.isArray(scores)) {
    return defaultState();
  }

  const nextScores = {};
  Object.entries(scores).forEach(([matchId, sides]) => {
    if (!sides || typeof sides !== 'object' || Array.isArray(sides)) return;

    const normalized = {};
    ['s1', 's2'].forEach(side => {
      const value = normalizeScoreValue(sides[side]);
      if (value !== undefined) normalized[side] = value;
    });

    if (normalized.s1 == null && normalized.s2 == null) return;
    nextScores[String(matchId)] = normalized;
  });

  return { scores: nextScores };
}

function applyScoreUpdate(state, matchId, side, value) {
  if (side !== 's1' && side !== 's2') return;

  const normalized = normalizeScoreValue(value);
  if (normalized === undefined) return;

  const key = String(matchId);
  const current = state.scores[key] ? { ...state.scores[key] } : {};
  current[side] = normalized;

  if (current.s1 == null && current.s2 == null) {
    delete state.scores[key];
    return;
  }

  state.scores[key] = current;
}

function normalizeScoreValue(value) {
  if (value === '' || value == null) return null;
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric < 0) return undefined;
  return numeric;
}

// Merge local and remote states, keeping the union of scores.
// Prefers the more complete score (both sides set) when there's a conflict.
// Used at boot time so local drafts aren't wiped by a lagging remote.
export function mergeStates(localState, remoteState) {
  const local = sanitizeState(localState);
  const remote = sanitizeState(remoteState);
  const merged = { ...remote.scores };

  Object.entries(local.scores).forEach(([matchId, localScore]) => {
    const remoteScore = remote.scores[matchId];
    if (!remoteScore) {
      merged[matchId] = localScore;
      return;
    }
    const localComplete = localScore.s1 != null && localScore.s2 != null;
    const remoteComplete = remoteScore.s1 != null && remoteScore.s2 != null;
    if (localComplete && !remoteComplete) merged[matchId] = localScore;
  });

  return { scores: merged };
}

function statesEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function shallowEqual(a, b) {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return false;
  return aKeys.every(key => a[key] === b[key]);
}

function cloneState(value) {
  return JSON.parse(JSON.stringify(value));
}

function emitSyncError(error) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('go-ouest:sync-error', { detail: { error } }));
}

function _persistLocal() {
  localStorage.setItem(KEY, JSON.stringify(_state));
}

function _notify() {
  const snapshot = getState();
  const mode = getAppMode();
  _listeners.forEach(fn => fn(snapshot, mode));
}
