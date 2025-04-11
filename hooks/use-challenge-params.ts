import { useSearchParams, useRouter } from 'next/navigation';
import {
  ChallengeTag,
  ChallengeDifficulty,
  ChallengeSolveStatus,
} from '@/lib/types';

export function useChallengeParams() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get('id');
  const tag = (searchParams.get('tag') || 'all') as ChallengeTag;
  const status = (searchParams.get('status') ||
    'unsolved') as ChallengeSolveStatus;
  const difficulty =
    searchParams.get('difficulty') || ('' as ChallengeDifficulty);
  const page = parseInt(searchParams.get('page') || '1');

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (key === 'tag') {
      params.set('status', 'unsolved');
      params.delete('difficulty');
      params.delete('page');
    }
    params.set(key, value);
    router.push(`?${params.toString()}`);
  };

  return {
    id,
    tag,
    status,
    difficulty,
    page,
    updateId: (value: string) => updateParams('id', value),
    updateTag: (value: ChallengeTag) => updateParams('tag', value),
    updateStatus: (value: ChallengeSolveStatus) =>
      updateParams('status', value),
    updateDifficulty: (value: string) => updateParams('difficulty', value),
    updatePage: (value: number) =>
      updateParams('page', String(Math.floor(value))), // Just in case trying to pass a float lol.
  };
}
