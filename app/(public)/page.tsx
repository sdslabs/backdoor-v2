import { LocalScheduleTimes } from '@/components/home/local-schedule-times';
import { beastTimeToMillis } from '@/lib/competition/schedule';
import { getCompetitionInfoSSR } from '@/lib/server/competition-info';

export default async function HomePage() {
  const info = await getCompetitionInfoSSR();
  const startMs = info
    ? beastTimeToMillis(info.starting_time, info.timezone)
    : null;
  const endMs = info
    ? beastTimeToMillis(info.ending_time, info.timezone)
    : null;

  return (
    <div className="flex min-h-[calc(100dvh-10rem)] w-full flex-col">
      <div className="grid min-h-0 flex-1 w-full grid-cols-1 divide-y-2 divide-border/70 md:grid-cols-2 md:divide-x-2 md:divide-y-0">
        <div className="flex min-h-0 flex-col gap-4 overflow-y-auto py-8 pr-4 sm:py-10 md:min-h-[min(60vh,32rem)] md:pr-8">
          <h2 className="font-display text-2xl text-foreground sm:text-3xl">
            About
          </h2>
          {info?.about ? (
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground sm:text-base">
              {info.about}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              No description has been published yet.
            </p>
          )}
        </div>

        <div className="flex min-h-0 flex-col gap-10 overflow-y-auto py-8 pl-4 sm:py-10 md:min-h-[min(60vh,32rem)] md:pl-8">
          <div>
            <h2 className="mb-4 font-display text-2xl text-foreground sm:text-3xl">
              Prizes
            </h2>
            {info?.prizes ? (
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground sm:text-base">
                {info.prizes}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                No prize information yet.
              </p>
            )}
          </div>

          <div>
            <h2 className="mb-4 font-display text-2xl text-foreground sm:text-3xl">
              Schedule
            </h2>
            {info ? (
              <LocalScheduleTimes
                startMs={startMs}
                endMs={endMs}
                fallbackStart={info.starting_time}
                fallbackEnd={info.ending_time}
              />
            ) : (
              <p className="text-sm text-muted-foreground">
                Schedule is unavailable.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
