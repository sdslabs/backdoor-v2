import { BASE_URL } from '@/lib/constants';
import type { CompetitionInfo } from '@/lib/competition/schedule';

export function competitionLogoSrc(info: CompetitionInfo): string | null {
  const raw = info.logo_url?.trim();
  if (!raw) return null;
  if (raw.startsWith('http://') || raw.startsWith('https://')) return raw;
  return `${BASE_URL}/api/info/logo/${raw.replace(/^\//, '')}`;
}
