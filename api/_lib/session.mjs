import crypto from 'node:crypto';

const COOKIE_NAME = 'go_ouest_admin';
const SESSION_TTL_SECONDS = 60 * 60 * 18;

export function isAdminRequest(req) {
  const token = parseCookies(req)[COOKIE_NAME];
  if (!token) return false;

  const [payload, signature] = token.split('.');
  if (!payload || !signature) return false;

  const expected = sign(payload);
  if (!safeEqual(signature, expected)) return false;

  try {
    const parsed = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return parsed.role === 'admin' && Number(parsed.exp) > Date.now();
  } catch {
    return false;
  }
}

export function isAdminPasswordValid(password) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return safeEqual(String(password ?? ''), expected);
}

export function isAuthConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD && process.env.ADMIN_SESSION_SECRET);
}

export function setAdminSessionCookie(res) {
  const payload = Buffer.from(
    JSON.stringify({
      role: 'admin',
      exp: Date.now() + SESSION_TTL_SECONDS * 1000,
    })
  ).toString('base64url');

  const signature = sign(payload);
  res.setHeader('Set-Cookie', serializeCookie(`${payload}.${signature}`, SESSION_TTL_SECONDS));
}

export function clearAdminSessionCookie(res) {
  res.setHeader('Set-Cookie', serializeCookie('', 0));
}

function parseCookies(req) {
  const header = req.headers?.cookie || '';
  return header
    .split(';')
    .map(part => part.trim())
    .filter(Boolean)
    .reduce((acc, pair) => {
      const eqIdx = pair.indexOf('=');
      if (eqIdx === -1) return acc;
      const key = pair.slice(0, eqIdx).trim();
      const value = pair.slice(eqIdx + 1).trim();
      acc[key] = decodeURIComponent(value);
      return acc;
    }, {});
}

function sign(payload) {
  const secret = process.env.ADMIN_SESSION_SECRET || '';
  return crypto.createHmac('sha256', secret).update(payload).digest('base64url');
}

function safeEqual(a, b) {
  const left = Buffer.from(String(a));
  const right = Buffer.from(String(b));
  if (left.length !== right.length) return false;
  return crypto.timingSafeEqual(left, right);
}

function serializeCookie(value, maxAge) {
  const parts = [
    `${COOKIE_NAME}=${encodeURIComponent(value)}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    `Max-Age=${maxAge}`,
  ];

  if (process.env.NODE_ENV === 'production') {
    parts.push('Secure');
  }

  return parts.join('; ');
}
