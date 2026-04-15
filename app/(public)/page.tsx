import { LocalScheduleTimes } from '@/components/home/local-schedule-times';
import { beastTimeToMillis } from '@/lib/competition/schedule';
import {
  HYDRA_ABOUT_PARAGRAPHS,
  HYDRA_PRIZE_BULLETS,
  HYDRA_PRIZES_INTRO,
} from '@/lib/home/hydra-static-copy';
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
          <div className="flex flex-col gap-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {HYDRA_ABOUT_PARAGRAPHS.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="flex min-h-0 flex-col gap-10 overflow-y-auto py-8 pl-4 sm:py-10 md:min-h-[min(60vh,32rem)] md:pl-8">
          <div>
            <h2 className="mb-4 font-display text-2xl text-foreground sm:text-3xl">
              Prizes and Recognition
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {HYDRA_PRIZES_INTRO}
            </p>
            <ul className="list-disc space-y-3 pl-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {HYDRA_PRIZE_BULLETS.map(({ title, body }) => (
                <li key={title}>
                  <span className="font-medium text-foreground">{title}:</span>{' '}
                  {body}
                </li>
              ))}
            </ul>
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
