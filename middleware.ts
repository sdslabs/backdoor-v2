import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { API_BASE_URL } from '@/lib/constants';
import {
  getCompetitionPhaseFromInfo,
  type CompetitionInfo,
  type CompetitionPhase,
} from '@/lib/competition/schedule';
import { isPrivilegedNavbarRoleFromToken } from '@/lib/server/jwt-role-edge';

const COMPETITION_PATH = '/dashboard/competition';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/dashboard')) {
    const token = request.cookies.get('auth')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    if (!isPrivilegedNavbarRoleFromToken(token)) {
      let phase: CompetitionPhase = 'invalid';
      try {
        const res = await fetch(`${API_BASE_URL}/info/competition-info`, {
          cache: 'no-store',
        });
        if (res.ok) {
          const info = (await res.json()) as CompetitionInfo;
          phase = getCompetitionPhaseFromInfo(info);
        }
      } catch {
        phase = 'invalid';
      }

      if (phase === 'pre' || phase === 'post') {
        if (!pathname.startsWith(COMPETITION_PATH)) {
          return NextResponse.redirect(new URL(COMPETITION_PATH, request.url));
        }
      } else if (phase === 'active') {
        if (pathname.startsWith(COMPETITION_PATH)) {
          return NextResponse.redirect(
            new URL('/dashboard/challenge', request.url)
          );
        }
      }
    }
  }

  if (pathname === '/') {
    const token = request.cookies.get('auth')?.value;
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  const requestHeaders = new Headers(request.headers);
  if (pathname.startsWith('/dashboard')) {
    requestHeaders.set('x-dashboard-pathname', pathname);
  }
  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ['/dashboard', '/dashboard/:path*', '/'],
};
