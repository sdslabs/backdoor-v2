import { redirect } from 'next/navigation';

import { BASE_URL } from '@/lib/constants';
import { getCompetitionPhaseFromInfo } from '@/lib/competition/schedule';
import { getCompetitionInfoSSR } from '@/lib/server/competition-info';
import { getSessionAdminNav } from '@/lib/server/session-nav';

export default async function CompetitionGatePage() {
  if (await getSessionAdminNav()) {
    redirect('/dashboard/challenge');
  }

  const info = await getCompetitionInfoSSR();
  if (!info) {
    redirect('/dashboard/challenge');
  }

  const phase = getCompetitionPhaseFromInfo(info);
  if (phase === 'active' || phase === 'invalid') {
    redirect('/dashboard/challenge');
  }

  const logoSrc =
    info.logo_url &&
    (info.logo_url.startsWith('http://') ||
      info.logo_url.startsWith('https://'))
      ? info.logo_url
      : info.logo_url
        ? `${BASE_URL}/api/info/logo/${info.logo_url.replace(/^\//, '')}`
        : null;

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg rounded-xl border border-border bg-card/60 p-8 shadow-sm backdrop-blur-sm">
        {logoSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logoSrc}
            alt=""
            className="mx-auto mb-6 h-16 w-auto object-contain"
          />
        ) : null}
        <h1 className="text-center font-display text-3xl text-primary">
          {info.name}
        </h1>
        <p className="mt-3 text-center text-lg text-muted-foreground">
          {phase === 'pre'
            ? 'The competition has not started yet.'
            : 'The competition has ended.'}
        </p>
        <div className="mt-8 space-y-4 text-sm leading-relaxed text-secondary-foreground">
          {info.about ? (
            <div>
              <h2 className="mb-1 font-semibold text-foreground">About</h2>
              <p className="whitespace-pre-wrap">{info.about}</p>
            </div>
          ) : null}
          {info.prizes ? (
            <div>
              <h2 className="mb-1 font-semibold text-foreground">Prizes</h2>
              <p className="whitespace-pre-wrap">{info.prizes}</p>
            </div>
          ) : null}
          <div className="border-t border-border pt-4 text-xs text-muted-foreground">
            <p>Scheduled start: {info.starting_time}</p>
            <p className="mt-1">Scheduled end: {info.ending_time}</p>
            {info.timezone ? (
              <p className="mt-1">Timezone: {info.timezone}</p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
