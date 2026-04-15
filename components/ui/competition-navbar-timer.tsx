'use client';

import { useEffect, useState } from 'react';

function pad2(n: number) {
  return n.toString().padStart(2, '0');
}

export function CompetitionNavbarTimer({
  targetEpochMs,
  label = 'Starts in',
}: {
  targetEpochMs: number;
  /** e.g. "Starts in" before opening, "Ends in" while running */
  label?: string;
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
      className="tabular-nums text-sm font-medium text-foreground tracking-tight"
      suppressHydrationWarning
    >
      <span className="text-muted-foreground mr-2">{label}</span>
      {days > 0 ? <span>{days}d </span> : null}
      <span>
        {pad2(hours)}:{pad2(minutes)}:{pad2(seconds)}
      </span>
    </div>
  );
}
