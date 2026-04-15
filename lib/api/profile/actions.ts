'use server';

import { createHash } from 'crypto';

import { SESSION_USERNAME_COOKIE } from '@/lib/constants';
import type { UserProfile } from '@/lib/types/profile';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createAuthenticatedServerAxios } from '@/lib/api/axios/server-axios';

/**
 * Backend user info response shape from GET /api/info/user/:username
 */
interface BackendUserResp {
  id: number;
  username: string;
  role: string;
  status: number;
  score: number;
  rank: number;
  email: string;
  bhawan?: string;
  challenges: BackendChallengeSolve[];
}

interface BackendChallengeSolve {
  id: number;
  name: string;
  category: string;
  tags: string[];
  solvedAt: string;
  points: number;
}

/**
 * Transform backend user response into the frontend UserProfile shape.
 */
function transformBackendUser(data: BackendUserResp): UserProfile {
  const challenges = data.challenges || [];
  const totalPoints = data.score;
  const totalSolves = challenges.length;

  // Compute category breakdown
  const categories: Record<string, number> = {};
  for (const ch of challenges) {
    const cat = ch.category || 'misc';
    categories[cat] = (categories[cat] || 0) + 1;
  }

  // Find favorite category
  let favoriteCategory = 'N/A';
  let maxCount = 0;
  for (const [cat, count] of Object.entries(categories)) {
    if (count > maxCount) {
      maxCount = count;
      favoriteCategory = cat;
    }
  }

  // Compute average time to solve (we don't have per-challenge timing from the backend, so set to 0)
  const averageTimeToSolve = 0;

  return {
    id: String(data.id),
    username: data.username,
    name: data.username, // backend doesn't have a display name; use username
    email: data.email,
    bhawan: data.bhawan ?? '',
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(data.username)}`,
    role: data.role === 'admin' || data.role === 'author' ? 'admin' : 'user',
    createdAt: new Date(), // Not provided by backend
    lastActive: new Date(), // Not provided by backend
    bio: '',
    socialLinks: {},
    stats: {
      totalPoints,
      rank: data.rank,
      totalSolves,
      totalChallenges: totalSolves, // we know what they solved, not total available
      solveRate: 0,
      averageTimeToSolve,
      favoriteCategory,
      categories,
    },
  };
}

function jwtPayload(token: string): Record<string, unknown> | null {
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

function isUrlSafeUsername(s: string): boolean {
  return /^[a-zA-Z0-9_.-]+$/.test(s) && s.length <= 64;
}

function readUsernameFromJwt(token: string | undefined): string | undefined {
  if (!token) return undefined;
  const payload = jwtPayload(token);
  if (!payload) return undefined;

  const tryString = (v: unknown): string | undefined =>
    typeof v === 'string' && v.trim() ? v.trim() : undefined;

  const candidates: unknown[] = [
    payload.username,
    payload.user_name,
    payload.preferred_username,
    payload.unique_name,
    payload.login,
  ];

  for (const c of candidates) {
    const s = tryString(c);
    if (!s) continue;
    const base = s.includes('@') ? (s.split('@')[0] ?? s) : s;
    if (isUrlSafeUsername(base)) return base;
  }

  const sub = tryString(payload.sub);
  if (sub && !sub.includes('@') && isUrlSafeUsername(sub)) {
    return sub;
  }

  return undefined;
}

function syntheticUsernameFromToken(token: string): string {
  return `u${createHash('sha256').update(token).digest('hex').slice(0, 14)}`;
}

/**
 * Fetch a user profile from the backend API.
 * Returns null if the user is not found.
 */
async function fetchUserProfileFromBackend(
  username: string
): Promise<UserProfile | null> {
  try {
    const axios = await createAuthenticatedServerAxios();
    const res = await axios.get(`/info/user/${encodeURIComponent(username)}`);
    const data = res.data as BackendUserResp;
    return transformBackendUser(data);
  } catch (err: unknown) {
    const axiosError = err as { response?: { status?: number } };
    if (
      axiosError?.response?.status === 404 ||
      axiosError?.response?.status === 500
    ) {
      return null;
    }
    console.error('Error fetching user profile from backend:', err);
    return null;
  }
}

/** Username for the current session from cookies/JWT, or `null` if not signed in. */
export async function resolveSessionUsername(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth')?.value?.trim();
  if (!token) {
    return null;
  }

  let username =
    cookieStore.get(SESSION_USERNAME_COOKIE)?.value?.trim() ||
    readUsernameFromJwt(token);

  if (!username) {
    username = syntheticUsernameFromToken(token);
  }

  return username;
}

/** Session-backed profile when an auth token is present; otherwise `null`. Never redirects. */
export async function resolveCurrentUserProfile(): Promise<UserProfile | null> {
  const username = await resolveSessionUsername();
  if (!username) {
    return null;
  }

  // Try to fetch the real profile from the backend
  const profile = await fetchUserProfileFromBackend(username);
  if (profile) {
    return profile;
  }

  // Fallback: return a minimal profile from JWT data
  return {
    id: username,
    username,
    name: username,
    email: `${username}@example.com`,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(username)}`,
    role: 'user',
    createdAt: new Date(),
    lastActive: new Date(),
    bio: '',
    socialLinks: {},
    stats: {
      totalPoints: 0,
      rank: 0,
      totalSolves: 0,
      totalChallenges: 0,
      solveRate: 0,
      averageTimeToSolve: 0,
      favoriteCategory: 'N/A',
      categories: {},
    },
  };
}

export async function getCurrentUser(): Promise<UserProfile> {
  const profile = await resolveCurrentUserProfile();
  if (!profile) {
    redirect('/login');
  }
  return profile;
}

export async function getUserProfile(
  username?: string
): Promise<UserProfile | null> {
  if (!username) {
    // If no username provided, return current user
    return resolveCurrentUserProfile();
  }

  // Fetch from backend
  return fetchUserProfileFromBackend(username);
}
