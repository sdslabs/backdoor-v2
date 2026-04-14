/**
 * Decode JWT payload (middle segment) without verifying the signature.
 * Used on the server to derive UI from the same token the API trusts; tampering
 * without the signing key would fail backend calls anyway.
 *
 * Beast issues HS256 JWTs with role in claim `eml` (see beast/pkg/auth/token.go CustomClaims).
 */
export function decodeJwtPayload(
  token: string
): Record<string, unknown> | null {
  const parts = token.split('.');
  if (parts.length < 2) return null;
  try {
    const b64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const padded = b64 + '='.repeat((4 - (b64.length % 4)) % 4);
    const json = Buffer.from(padded, 'base64').toString('utf8');
    return JSON.parse(json) as Record<string, unknown>;
  } catch {
    return null;
  }
}

/** Raw role string from Beast JWT claims. */
export function backendRoleFromJwtPayload(
  payload: Record<string, unknown>
): string | undefined {
  const eml = payload.eml;
  if (typeof eml === 'string' && eml.trim()) {
    return eml.trim().toLowerCase();
  }
  return undefined;
}

/** Matches lib/api/profile/actions transformBackendUser admin mapping. */
export function isPrivilegedNavbarBackendRole(role: string): boolean {
  return role === 'admin' || role === 'author';
}
