/**
 * Minimal JWT payload decode for Edge middleware (no Node `Buffer`).
 * Beast HS256 JWTs carry role in `eml` (see beast/pkg/auth/token.go).
 */

export function decodeJwtPayloadEdge(
  token: string
): Record<string, unknown> | null {
  const parts = token.split('.');
  if (parts.length < 2) return null;
  try {
    const b64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const padded = b64 + '='.repeat((4 - (b64.length % 4)) % 4);
    const json = atob(padded);
    return JSON.parse(json) as Record<string, unknown>;
  } catch {
    return null;
  }
}

/** Admin and author see the full dashboard regardless of competition window. */
export function isPrivilegedNavbarRoleFromToken(token: string): boolean {
  const payload = decodeJwtPayloadEdge(token);
  if (!payload) return false;
  const eml = payload.eml;
  if (typeof eml !== 'string' || !eml.trim()) return false;
  const role = eml.trim().toLowerCase();
  return role === 'admin' || role === 'author';
}
