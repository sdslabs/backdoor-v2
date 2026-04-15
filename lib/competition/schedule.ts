import { DateTime } from 'luxon';

/** Matches beast/api/response.go `CompetitionInfoResp` JSON. */
export type CompetitionInfo = {
  name: string;
  about: string;
  prizes: string;
  starting_time: string;
  ending_time: string;
  timezone: string;
  logo_url: string;
};

const MONTH_INDEX: Record<string, number> = {
  january: 1,
  february: 2,
  march: 3,
  april: 4,
  may: 5,
  june: 6,
  july: 7,
  august: 8,
  september: 9,
  october: 10,
  november: 11,
  december: 12,
};

/** Mirrors beast/core/utils/dateparser.go zone handling (`strings.Split(TimeZone, ":")[0]`). */
export function beastCompetitionZoneKey(timezoneRaw: string): string {
  const key = timezoneRaw.split(':')[0]?.trim() ?? '';
  return key === '' ? 'UTC' : key;
}

/**
 * Parses Beast `starting_time` / `ending_time` strings into epoch ms in the configured zone,
 * matching the string manipulation in `beast/core/utils/dateparser.go` + `dateparse.ParseLocal`.
 */
export function beastTimeToMillis(
  beastTime: string,
  timezoneRaw: string
): number | null {
  const segments = beastTime.split(',');
  if (segments.length < 2) return null;

  const clockToken = segments[0].trim().split(/\s+/)[0];
  const dateSegment = segments[1].trim();
  const dateWords = dateSegment.split(/\s+/).filter(Boolean);
  if (dateWords.length < 3) return null;

  const day = Number.parseInt(dateWords[0] ?? '', 10);
  const month = MONTH_INDEX[(dateWords[1] ?? '').toLowerCase()];
  const year = Number.parseInt(dateWords[2] ?? '', 10);
  const [h, m, s] = (clockToken ?? '0:0:0')
    .split(':')
    .map((x) => Number.parseInt(x, 10));

  if (
    !Number.isFinite(day) ||
    !month ||
    !Number.isFinite(year) ||
    !Number.isFinite(h) ||
    !Number.isFinite(m) ||
    !Number.isFinite(s)
  ) {
    return null;
  }

  const zone = beastCompetitionZoneKey(timezoneRaw);
  let dt = DateTime.fromObject(
    { year, month, day, hour: h, minute: m, second: s },
    { zone }
  );
  if (!dt.isValid) {
    dt = DateTime.fromObject(
      { year, month, day, hour: h, minute: m, second: s },
      { zone: 'UTC' }
    );
  }
  if (!dt.isValid) return null;
  return dt.toMillis();
}

export type CompetitionPhase = 'pre' | 'active' | 'post' | 'invalid';

/** Same boundaries as `utils.CheckTime()` in Beast (inclusive start/end instants). */
export function getCompetitionPhaseFromInfo(
  info: CompetitionInfo,
  nowMs: number = Date.now()
): CompetitionPhase {
  const start = beastTimeToMillis(info.starting_time, info.timezone);
  const end = beastTimeToMillis(info.ending_time, info.timezone);
  if (start === null || end === null) return 'invalid';
  if (nowMs < start) return 'pre';
  if (nowMs > end) return 'post';
  return 'active';
}
