import { redirect } from 'next/navigation';

import { Navbar, type NavbarCompetitionTimer } from '@/components/ui/navbar';
import {
  beastTimeToMillis,
  getCompetitionPhaseFromInfo,
  type CompetitionPhase,
} from '@/lib/competition/schedule';
import { getCompetitionInfoSSR } from '@/lib/server/competition-info';
import { getSessionAdminNav } from '@/lib/server/session-nav';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sessionAdminNav = await getSessionAdminNav();

  let competitionTimer: NavbarCompetitionTimer | undefined;
  let contestantCompetitionPhase: CompetitionPhase | undefined;

  const info = await getCompetitionInfoSSR();
  if (info) {
    const phase = getCompetitionPhaseFromInfo(info);
    const startMs = beastTimeToMillis(info.starting_time, info.timezone);
    const endMs = beastTimeToMillis(info.ending_time, info.timezone);

    if (!sessionAdminNav) {
      contestantCompetitionPhase = phase;
    }

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

  if (
    !sessionAdminNav &&
    (contestantCompetitionPhase === 'pre' ||
      contestantCompetitionPhase === 'post')
  ) {
    redirect('/login');
  }

  return (
    <div className="container mx-auto flex h-screen w-full max-w-none flex-col px-4">
      <Navbar
        sessionAdminNav={sessionAdminNav}
        competitionTimer={competitionTimer}
      />
      <div className="flex-1">{children}</div>
    </div>
  );
}
