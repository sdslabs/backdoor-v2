import { cookies } from 'next/headers';

import { PublicStickyHeader } from '@/components/home/public-sticky-header';
import {
  beastTimeToMillis,
  getCompetitionPhaseFromInfo,
} from '@/lib/competition/schedule';
import { getCompetitionInfoSSR } from '@/lib/server/competition-info';

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = Boolean((await cookies()).get('auth')?.value?.trim());

  const info = await getCompetitionInfoSSR();
  const phase = info ? getCompetitionPhaseFromInfo(info) : 'invalid';
  const showGoToDashboard = authed && phase === 'active';
  const startMs = info
    ? beastTimeToMillis(info.starting_time, info.timezone)
    : null;
  const endMs = info
    ? beastTimeToMillis(info.ending_time, info.timezone)
    : null;

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <div className="sticky top-0 z-50">
        <PublicStickyHeader
          authed={authed}
          showGoToDashboard={showGoToDashboard}
          competitionInfo={info}
          phase={phase}
          startMs={startMs}
          endMs={endMs}
        />
      </div>
      <div className="w-full flex-1 px-[10%]">{children}</div>
    </div>
  );
}
