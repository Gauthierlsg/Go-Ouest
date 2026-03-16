import { BlobNotFoundError, BlobPreconditionFailedError, get, put } from '@vercel/blob';

const STATE_PATHNAME = process.env.TOURNAMENT_STATE_PATH || 'go-ouest-2026/tournament-state.json';
const MAX_WRITE_RETRIES = 4;

export function isStorageConfigured() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export async function readTournamentDocument() {
  ensureStorageConfigured();

  try {
    const result = await get(STATE_PATHNAME, {
      access: 'private',
      token: process.env.BLOB_READ_WRITE_TOKEN,
      useCache: false,
    });

    if (!result || result.statusCode !== 200 || !result.stream) {
      return {
        state: defaultState(),
        updatedAt: null,
        etag: null,
      };
    }

    const text = await new Response(result.stream).text();
    const parsed = parseDocument(text);

    return {
      state: parsed.state,
      updatedAt: parsed.updatedAt || result.blob.uploadedAt?.toISOString?.() || null,
      etag: result.blob.etag || null,
    };
  } catch (error) {
    if (error instanceof BlobNotFoundError) {
      return {
        state: defaultState(),
        updatedAt: null,
        etag: null,
      };
    }
    throw error;
  }
}

export async function mutateTournamentState(mutator) {
  ensureStorageConfigured();

  let lastError = null;

  for (let attempt = 0; attempt < MAX_WRITE_RETRIES; attempt += 1) {
    const current = await readTournamentDocument();
    const nextState = sanitizeState(mutator(cloneState(current.state)));
    const updatedAt = new Date().toISOString();
    const body = JSON.stringify({ state: nextState, updatedAt }, null, 2);

    try {
      const result = await put(STATE_PATHNAME, body, {
        access: 'private',
        token: process.env.BLOB_READ_WRITE_TOKEN,
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType: 'application/json',
        cacheControlMaxAge: 60,
        ifMatch: current.etag || undefined,
      });

      return {
        state: nextState,
        updatedAt,
        etag: result.etag,
      };
    } catch (error) {
      if (error instanceof BlobPreconditionFailedError) {
        lastError = error;
        continue;
      }
      throw error;
    }
  }

  throw lastError || new Error('Impossible d’enregistrer l’état du tournoi.');
}

export function sanitizeImportedState(payload) {
  return normalizeImport(payload);
}

function defaultState() {
  return { scores: {} };
}

function parseDocument(text) {
  try {
    const parsed = JSON.parse(text);
    if (parsed?.state) {
      return {
        state: sanitizeState(parsed.state),
        updatedAt: parsed.updatedAt ?? null,
      };
    }

    return {
      state: sanitizeState(parsed),
      updatedAt: null,
    };
  } catch {
    return {
      state: defaultState(),
      updatedAt: null,
    };
  }
}

function normalizeImport(payload) {
  if (typeof payload === 'string') {
    try {
      payload = JSON.parse(payload);
    } catch {
      throw new Error('Le JSON importe est invalide.');
    }
  }

  const candidate = payload?.state ?? payload;
  if (!candidate || typeof candidate !== 'object') {
    throw new Error('Le JSON importe ne contient pas d’état valide.');
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
    throw new Error('BLOB_READ_WRITE_TOKEN manquant pour la synchro du tournoi.');
  }
}
