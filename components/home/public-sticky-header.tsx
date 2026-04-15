'use client';

import { usePathname } from 'next/navigation';

import { PublicCountdownStrip } from '@/components/home/public-countdown-strip';
import { PublicSiteNavbar } from '@/components/home/public-site-navbar';
import type {
  CompetitionInfo,
  CompetitionPhase,
} from '@/lib/competition/schedule';

type Props = {
  authed: boolean;
  showGoToDashboard: boolean;
  competitionInfo: CompetitionInfo | null;
  phase: CompetitionPhase;
  startMs: number | null;
  endMs: number | null;
};

export function PublicStickyHeader({
  authed,
  showGoToDashboard,
  competitionInfo,
  phase,
  startMs,
  endMs,
}: Props) {
  const pathname = usePathname();
  const showCountdownStrip = pathname !== '/login';

  return (
    <>
      <PublicSiteNavbar
        authed={authed}
        showGoToDashboard={showGoToDashboard}
        competitionInfo={competitionInfo}
      />
      {showCountdownStrip ? (
        <PublicCountdownStrip phase={phase} startMs={startMs} endMs={endMs} />
      ) : null}
    </>
  );
}
