'use client';

import { fetchChallengeMetadata } from '@/lib/data/challenge';
import ChallengeCardSkeleton from './skeletons/challenge-card-skeleton';
import ChallengeCard from './challenge-card';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { ChallengeTag } from '@/lib/types';

const ChallengeList = () => {
  const { data: challenges, isPending } = useQuery({
    queryKey: ['challenges'],
    queryFn: fetchChallengeMetadata,
  });

  const searchParams = useSearchParams();
  const {
    tag = 'all' as ChallengeTag,
    status = 'unsolved',
    difficulty = 'easy',
  } = Object.fromEntries(searchParams.entries());

  const filteredChallenges = challenges?.filter((challenge) => {
    const matchTag =
      tag === 'all' ? true : challenge.tags.includes(tag as ChallengeTag);
    const matchStatus = challenge.solveStatus === status;
    const matchDifficulty = difficulty === challenge.difficulty;
    return matchTag && matchStatus && matchDifficulty;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {isPending
        ? Array.from({ length: 6 }).map((_, index) => (
            <ChallengeCardSkeleton key={index} />
          ))
        : filteredChallenges?.map((challenge, i) => (
            <ChallengeCard key={i} {...challenge} />
          ))}
    </div>
  );
};

export { ChallengeList };
