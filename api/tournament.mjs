import { readJsonBody } from './_lib/json.mjs';
import { isAdminRequest } from './_lib/session.mjs';
import {
  isStorageConfigured,
  mutateTournamentState,
  mutateTournamentStateWithOptions,
  readTournamentDocument,
  sanitizeImportedState,
} from './_lib/storage.mjs';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  try {
    if (!isStorageConfigured()) {
      return res.status(503).json({
        ok: false,
        error: 'Stockage Vercel Blob non configure pour ce deploiement.',
      });
    }

    if (req.method === 'GET') {
      const current = await readTournamentDocument();
      return res.status(200).json({
        ok: true,
        state: current.state,
        updatedAt: current.updatedAt,
      });
    }

    if (req.method !== 'POST') {
      res.setHeader('Allow', 'GET, POST');
      return res.status(405).json({ ok: false, error: 'Methode non autorisee.' });
    }

    if (!isAdminRequest(req)) {
      return res.status(401).json({
        ok: false,
        error: 'Connexion admin requise pour modifier les scores.',
      });
    }

    const action = await readJsonBody(req);
    const result = await handleAction(action);
    return res.status(200).json({
      ok: true,
      state: result.state,
      updatedAt: result.updatedAt,
    });
  } catch (error) {
    return res.status(error.statusCode || 400).json({
      ok: false,
      error: error.message || 'Erreur serveur tournoi.',
    });
  }
}

async function handleAction(action) {
  switch (action?.type) {
    case 'setScore':
      return mutateTournamentState(state => {
        const next = ensureStateShape(state);
        applyScore(next, action.matchId, action.side, action.value);
        return next;
      });

    case 'reset':
      return mutateTournamentStateWithOptions(() => ({ scores: {} }), {
        overwriteOnConflict: true,
      });

    case 'replaceState':
      return mutateTournamentStateWithOptions(() => sanitizeImportedState(action.state), {
        overwriteOnConflict: true,
      });

    default:
      throw new Error('Action tournoi inconnue.');
  }
}

function ensureStateShape(state) {
  return state?.scores && typeof state.scores === 'object'
    ? state
    : { scores: {} };
}

function applyScore(state, matchId, side, value) {
  if (side !== 's1' && side !== 's2') {
    throw new Error('Cote de score invalide.');
  }

  const normalized = normalizeScoreValue(value);
  if (normalized === undefined) {
    throw new Error('Valeur de score invalide.');
  }

  const key = String(matchId);
  const current = state.scores[key] ? { ...state.scores[key] } : {};
  current[side] = normalized;

  if (current.s1 == null && current.s2 == null) {
    delete state.scores[key];
    return;
  }

  if (current.s1 != null && current.s2 != null && current.s1 === current.s2) {
    throw new Error('Match nul interdit : saisis le point decisif pour departager le match.');
  }

  state.scores[key] = current;
}

function normalizeScoreValue(value) {
  if (value === '' || value == null) return null;
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric < 0) return undefined;
  return numeric;
}

