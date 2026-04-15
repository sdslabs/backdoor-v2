import { cache } from 'react';

import { API_BASE_URL } from '@/lib/constants';
import type { CompetitionInfo } from '@/lib/competition/schedule';

async function fetchCompetitionInfoOnce(): Promise<CompetitionInfo | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/info/competition-info`, {
      next: { revalidate: 15 },
    });
    if (!res.ok) return null;
    return (await res.json()) as CompetitionInfo;
  } catch {
    return null;
  }
}

/** Deduped per request; used by dashboard layout and public home. */
export const getCompetitionInfoSSR = cache(fetchCompetitionInfoOnce);
