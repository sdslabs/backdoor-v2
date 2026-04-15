'use client';

function formatDate(ms: number) {
  return new Date(ms).toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatTime(ms: number) {
  return new Date(ms).toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  });
}

function TimeBlock({
  label,
  ms,
  rawFallback,
}: {
  label: string;
  ms: number | null;
  rawFallback: string;
}) {
  if (ms == null) {
    return (
      <div className="rounded-xl border-2 border-border/80 bg-background/50 p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        <p className="mt-2 font-mono text-sm leading-relaxed text-foreground">
          {rawFallback}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border-2 border-border/80 bg-background/50 p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 text-lg font-medium leading-snug text-foreground sm:text-xl">
        {formatDate(ms)}
      </p>
      <p className="mt-1 tabular-nums text-base text-muted-foreground sm:text-lg">
        {formatTime(ms)}
      </p>
    </div>
  );
}

export function LocalScheduleTimes({
  startMs,
  endMs,
  fallbackStart,
  fallbackEnd,
}: {
  startMs: number | null;
  endMs: number | null;
  fallbackStart: string;
  fallbackEnd: string;
}) {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <div className="space-y-4">
      <TimeBlock label="Starts" ms={startMs} rawFallback={fallbackStart} />
      <TimeBlock label="Ends" ms={endMs} rawFallback={fallbackEnd} />
    </div>
  );
}
