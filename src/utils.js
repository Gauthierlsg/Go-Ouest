export function sanitizeScore(value) {
  return value.replace(/\D+/g, '').slice(0, 2);
}
