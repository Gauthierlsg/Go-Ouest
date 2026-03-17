import { createClient } from '@supabase/supabase-js';

const TABLE = 'tournament_state';
const ROW_ID = 'main';

function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error('SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY manquant.');
  }
  return createClient(url, key, { auth: { persistSession: false } });
}

export function isStorageConfigured() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export async function readTournamentDocument() {
  ensureStorageConfigured();
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from(TABLE)
    .select('state, updated_at')
    .eq('id', ROW_ID)
    .single();

  if (error) throw new Error(`Lecture tournoi: ${error.message}`);

  return {
    state: sanitizeState(data.state),
    updatedAt: data.updated_at,
  };
}

export async function mutateTournamentState(mutator) {
  return mutateTournamentStateWithOptions(mutator);
}

export async function mutateTournamentStateWithOptions(mutator, _options = {}) {
  ensureStorageConfigured();
  const supabase = getSupabaseAdmin();

  const { data: current, error: readError } = await supabase
    .from(TABLE)
    .select('state')
    .eq('id', ROW_ID)
    .single();

  if (readError) throw new Error(`Lecture tournoi: ${readError.message}`);

  const nextState = sanitizeState(mutator(cloneState(current.state)));

  const { error: writeError } = await supabase
    .from(TABLE)
    .update({ state: nextState })
    .eq('id', ROW_ID);

  if (writeError) throw new Error(`Écriture tournoi: ${writeError.message}`);

  return { state: nextState, updatedAt: new Date().toISOString() };
}

export function sanitizeImportedState(payload) {
  return normalizeImport(payload);
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function defaultState() {
  return { scores: {} };
}

function normalizeImport(payload) {
  if (typeof payload === 'string') {
    try {
      payload = JSON.parse(payload);
    } catch {
      throw new Error('Le JSON importé est invalide.');
    }
  }

  const candidate = payload?.state ?? payload;
  if (!candidate || typeof candidate !== 'object') {
    throw new Error("Le JSON importé ne contient pas d'état valide.");
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

function normalizeScoreValue(value) {
  if (value === '' || value == null) return null;
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric < 0) return undefined;
  return numeric;
}

function cloneState(value) {
  return JSON.parse(JSON.stringify(value));
}

function ensureStorageConfigured() {
  if (!isStorageConfigured()) {
    throw new Error('SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY manquant pour la synchro du tournoi.');
  }
}
