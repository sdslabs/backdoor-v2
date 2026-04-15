'use client';

import type { ReactNode } from 'react';

import { HomeHeroCountdown } from '@/components/home/home-hero-countdown';
import type { CompetitionPhase } from '@/lib/competition/schedule';

export function PublicCountdownStrip({
  phase,
  startMs,
  endMs,
}: {
  phase: CompetitionPhase;
  startMs: number | null;
  endMs: number | null;
}) {
  let body: ReactNode = null;

  if (phase === 'pre' && startMs != null) {
    body = (
      <HomeHeroCountdown
        targetEpochMs={startMs}
        label="Starts in"
        compact
        centered
        onPrimary
      />
    );
  } else if (phase === 'active' && endMs != null) {
    body = (
      <HomeHeroCountdown
        targetEpochMs={endMs}
        label="Ends in"
        compact
        centered
        onPrimary
      />
    );
  } else if (phase === 'active') {
    body = (
      <p className="text-center text-sm font-medium text-primary-foreground sm:text-base">
        Competition is live
      </p>
    );
  } else if (phase === 'post') {
    body = (
      <p className="text-center text-sm font-medium text-primary-foreground sm:text-base">
        Competition has ended
      </p>
    );
  }

  if (!body) return null;

  return (
    <div className="border-b-2 border-border/70 bg-primary">
      <div className="flex justify-center px-[10%] py-1.5 sm:py-2">{body}</div>
    </div>
  );
}
