import { cookies } from 'next/headers';

import {
  backendRoleFromJwtPayload,
  decodeJwtPayload,
  isPrivilegedNavbarBackendRole,
} from '@/lib/server/decode-auth-jwt';

/**
 * Whether the current `auth` cookie JWT indicates a role that should see admin navigation.
 * Based on JWT payload only (not persisted client stores).
 */
export async function getSessionAdminNav(): Promise<boolean> {
  const token = (await cookies()).get('auth')?.value?.trim();
  if (!token) return false;

  const payload = decodeJwtPayload(token);
  if (!payload) return false;

  const role = backendRoleFromJwtPayload(payload);
  if (!role) return false;

  return isPrivilegedNavbarBackendRole(role);
}
