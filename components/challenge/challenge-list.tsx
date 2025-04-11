'use client';

import { fetchChallengeMetadata } from '@/lib/data/challenge';
import ChallengeCardSkeleton from './skeletons/challenge-card-skeleton';
import ChallengeCard from './challenge-card';
import { useQuery } from '@tanstack/react-query';
import { ChallengeTag } from '@/lib/types';
import { useChallengeParams } from '@/hooks/use-challenge-params';

const ChallengeList = () => {
  const { data: challenges, isPending } = useQuery({
    queryKey: ['challenges'],
    queryFn: fetchChallengeMetadata,
  });

  const { tag, status, difficulty } = useChallengeParams();

  const filteredChallenges = challenges?.filter(
    ({ tags, solveStatus, difficulty: challengeDifficulty }) => {
      return (
        (tag === 'all' || tags.includes(tag as ChallengeTag)) &&
        solveStatus === status &&
        (!difficulty || difficulty === challengeDifficulty)
      );
    }
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {isPending ? (
        Array.from({ length: 6 }).map((_, index) => (
          <ChallengeCardSkeleton key={index} />
        ))
      ) : filteredChallenges?.length === 0 ? (
        <div className="col-span-full">
          <div className="text-center text-muted-foreground">
            No challenges found :(
          </div>
        </div>
      ) : (
        filteredChallenges?.map((challenge, i) => (
          <ChallengeCard key={i} {...challenge} />
        ))
      )}
    </div>
  );
};

export { ChallengeList };
