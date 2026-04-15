'use client';

import type { CompetitionPhase } from '@/lib/competition/schedule';

import { HomeHeroCountdown } from '@/components/home/home-hero-countdown';

export function HomeHeroStatus({
  phase,
  startMs,
  endMs,
  centered = false,
  compact = false,
}: {
  phase: CompetitionPhase;
  startMs: number | null;
  endMs: number | null;
  centered?: boolean;
  compact?: boolean;
}) {
  if (phase === 'pre' && startMs != null) {
    return (
      <HomeHeroCountdown
        targetEpochMs={startMs}
        label="Starts in"
        centered={centered}
        compact={compact}
      />
    );
  }
  if (phase === 'active' && endMs != null) {
    return (
      <HomeHeroCountdown
        targetEpochMs={endMs}
        label="Ends in"
        centered={centered}
        compact={compact}
      />
    );
  }
  if (phase === 'active') {
    return (
      <p
        className={
          compact
            ? 'text-base text-muted-foreground sm:text-lg'
            : centered
              ? 'mx-auto max-w-lg text-center text-xl text-muted-foreground sm:text-2xl'
              : 'mt-6 text-xl text-muted-foreground sm:text-2xl'
        }
      >
        Competition is live
      </p>
    );
  }
  if (phase === 'post') {
    return (
      <p
        className={
          compact
            ? 'text-base text-muted-foreground sm:text-lg'
            : centered
              ? 'mx-auto max-w-lg text-center text-xl text-muted-foreground sm:text-2xl'
              : 'mt-6 text-xl text-muted-foreground sm:text-2xl'
        }
      >
        Competition has ended
      </p>
    );
  }
  return null;
}
