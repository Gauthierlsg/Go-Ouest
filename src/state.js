const KEY = 'go-ouest-2025';

let _state = JSON.parse(localStorage.getItem(KEY) || '{"scores":{}}');

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

function _persist() {
  localStorage.setItem(KEY, JSON.stringify(_state));
  _listeners.forEach(fn => fn(_state));
}
