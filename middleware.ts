import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { API_BASE_URL } from '@/lib/constants';
import {
  getCompetitionPhaseFromInfo,
  type CompetitionInfo,
  type CompetitionPhase,
} from '@/lib/competition/schedule';
import { isPrivilegedNavbarRoleFromToken } from '@/lib/server/jwt-role-edge';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/dashboard/competition') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (pathname === '/login') {
    const token = request.cookies.get('auth')?.value;
    if (token && isPrivilegedNavbarRoleFromToken(token)) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  if (pathname.startsWith('/dashboard')) {
    const token = request.cookies.get('auth')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
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
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }
  }

  if (pathname === '/') {
    const token = request.cookies.get('auth')?.value;
    if (token && isPrivilegedNavbarRoleFromToken(token)) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/dashboard/:path*', '/', '/login'],
};
