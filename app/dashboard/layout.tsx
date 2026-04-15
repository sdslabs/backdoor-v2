import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { Navbar, type NavbarCompetitionTimer } from '@/components/ui/navbar';
import {
  beastTimeToMillis,
  getCompetitionPhaseFromInfo,
  type CompetitionPhase,
} from '@/lib/competition/schedule';
import { getCompetitionInfoSSR } from '@/lib/server/competition-info';
import { getSessionAdminNav } from '@/lib/server/session-nav';

const COMPETITION_PATH = '/dashboard/competition';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sessionAdminNav = await getSessionAdminNav();

  let competitionGate:
    | {
        mode: 'pre';
        competitionName: string;
        targetEpochMs: number;
      }
    | {
        mode: 'post';
        competitionName: string;
      }
    | undefined;

  let contestantCompetitionPhase: CompetitionPhase | undefined;
  let competitionTimer: NavbarCompetitionTimer | undefined;

  const info = await getCompetitionInfoSSR();
  if (info) {
    const phase = getCompetitionPhaseFromInfo(info);
    const startMs = beastTimeToMillis(info.starting_time, info.timezone);
    const endMs = beastTimeToMillis(info.ending_time, info.timezone);

    if (!sessionAdminNav) {
      contestantCompetitionPhase = phase;
      if (phase === 'pre' && startMs != null) {
        competitionGate = {
          mode: 'pre',
          competitionName: info.name,
          targetEpochMs: startMs,
        };
      } else if (phase === 'post') {
        competitionGate = {
          mode: 'post',
          competitionName: info.name,
        };
      }
    }

    if (!competitionGate) {
      if (phase === 'active' && endMs != null) {
        competitionTimer = {
          kind: 'countdown',
          targetEpochMs: endMs,
          label: 'Ends in',
        };
      } else if (phase === 'pre' && sessionAdminNav && startMs != null) {
        competitionTimer = {
          kind: 'countdown',
          targetEpochMs: startMs,
          label: 'Starts in',
        };
      } else if (phase === 'post' && sessionAdminNav) {
        competitionTimer = { kind: 'ended' };
      }
    }
  }

  if (
    !sessionAdminNav &&
    (contestantCompetitionPhase === 'pre' ||
      contestantCompetitionPhase === 'post')
  ) {
    const pathname = (await headers()).get('x-dashboard-pathname') ?? '';
    if (!pathname.startsWith(COMPETITION_PATH)) {
      redirect(COMPETITION_PATH);
    }
  }

  return (
    <div className="w-full h-screen flex flex-col">
      <Navbar
        sessionAdminNav={sessionAdminNav}
        competitionGate={competitionGate}
        competitionTimer={competitionTimer}
      />
      <div className="flex-1">{children}</div>
    </div>
  );
}
