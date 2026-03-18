import { readJsonBody } from '../_lib/json.mjs';
import {
  clearAdminSessionCookie,
  isAdminPasswordValid,
  isAdminRequest,
  isAuthConfigured,
  setAdminSessionCookie,
} from '../_lib/session.mjs';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  try {
    if (req.method === 'GET') {
      return res.status(200).json({
        ok: true,
        admin: isAdminRequest(req),
        configured: isAuthConfigured(),
      });
    }

    if (req.method === 'POST') {
      if (!isAuthConfigured()) {
        return res.status(503).json({
          ok: false,
          error: 'Connexion admin non configuree sur ce deploiement.',
        });
      }

      const body = await readJsonBody(req);
      if (!isAdminPasswordValid(body?.password)) {
        return res.status(401).json({
          ok: false,
          error: 'Mot de passe admin incorrect.',
        });
      }

      setAdminSessionCookie(res);
      return res.status(200).json({ ok: true, admin: true, configured: true });
    }

    if (req.method === 'DELETE') {
      clearAdminSessionCookie(res);
      return res.status(200).json({ ok: true, admin: false, configured: isAuthConfigured() });
    }

    res.setHeader('Allow', 'GET, POST, DELETE');
    return res.status(405).json({ ok: false, error: 'Methode non autorisee.' });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      error: error.message || 'Erreur session admin.',
    });
  }
}

