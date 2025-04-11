import { useSearchParams, useRouter } from 'next/navigation';
import {
  ChallengeTag,
  ChallengeDifficulty,
  ChallengeSolveStatus,
} from '@/lib/types';

export function useChallengeParams() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tag = (searchParams.get('tag') || 'all') as ChallengeTag;
  const status = (searchParams.get('status') ||
    'unsolved') as ChallengeSolveStatus;
  const difficulty = searchParams.get('difficulty') as ChallengeDifficulty | '';

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (key === 'tag') {
      params.set('status', 'unsolved');
      params.set('difficulty', '');
    }
    params.set(key, value);
    router.push(`?${params.toString()}`);
  };

  return {
    tag,
    status,
    difficulty,
    updateTag: (value: ChallengeTag) => updateParams('tag', value),
    updateStatus: (value: ChallengeSolveStatus) =>
      updateParams('status', value),
    updateDifficulty: (value: string) => updateParams('difficulty', value),
  };
}
