'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

function pad2(n: number) {
  return n.toString().padStart(2, '0');
}

export function HomeHeroCountdown({
  targetEpochMs,
  label,
  centered = false,
  compact = false,
  onPrimary = false,
}: {
  targetEpochMs: number;
  label: string;
  centered?: boolean;
  /** Smaller typography for the top hero row */
  compact?: boolean;
  /** Light text on `bg-primary` (nav strip) */
  onPrimary?: boolean;
}) {
  const [remainingMs, setRemainingMs] = useState(() =>
    Math.max(0, targetEpochMs - Date.now())
  );

  useEffect(() => {
    const tick = () => setRemainingMs(Math.max(0, targetEpochMs - Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [targetEpochMs]);

  const totalSec = Math.floor(remainingMs / 1000);
  const days = Math.floor(totalSec / 86400);
  const hours = Math.floor((totalSec % 86400) / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;

  return (
    <div
      className={cn(
        'tabular-nums font-medium tracking-tight',
        onPrimary ? 'text-primary-foreground' : 'text-foreground',
        compact
          ? 'mt-0 flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-lg sm:text-xl'
          : centered
            ? 'mt-1 flex flex-wrap items-baseline justify-center gap-x-2 gap-y-1 text-2xl sm:text-3xl'
            : 'mt-6 text-2xl sm:text-3xl'
      )}
      suppressHydrationWarning
    >
      <span
        className={cn(
          'font-sans',
          onPrimary ? 'text-primary-foreground/85' : 'text-muted-foreground',
          compact
            ? 'text-sm sm:text-base'
            : centered
              ? 'text-lg sm:text-xl'
              : 'mr-3 text-lg sm:text-xl'
        )}
      >
        {label}
      </span>
      {days > 0 ? (
        <span className={cn(!centered && !compact && 'mr-2')}>
          {days}d{compact || centered ? ' ' : ''}
        </span>
      ) : null}
      <span>
        {pad2(hours)}:{pad2(minutes)}:{pad2(seconds)}
      </span>
    </div>
  );
}
