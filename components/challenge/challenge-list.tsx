'use client';

import ChallengeCardSkeleton from './skeletons/challenge-card-skeleton';
import ChallengeCard from './challenge-card';
import { ChallengeTag } from '@/lib/types';
import { useChallengeParams } from '@/hooks/use-challenge-params';
import { ChallengePagination } from './challenge-pagination';
import { useAllChallengesMetadata } from '@/lib/api/challenge/queries';

const PAGE_SIZE = 12;

const ChallengeList = () => {
  const { data: challenges, isLoading } = useAllChallengesMetadata();

  const { tag, status, difficulty, page } = useChallengeParams();

  const filteredChallenges = challenges?.filter(
    ({ tags, solveStatus, difficulty: challengeDifficulty }) => {
      return (
        (tag === 'all' || tags.includes(tag as ChallengeTag)) &&
        solveStatus === status &&
        (!difficulty || difficulty === challengeDifficulty)
      );
    }
  );

  const paginatedChallenges = filteredChallenges?.slice(
    (Number(page) - 1) * PAGE_SIZE,
    Number(page) * PAGE_SIZE
  );

  const totalPages = Math.ceil((filteredChallenges?.length || 0) / PAGE_SIZE);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          Array.from({ length: 9 }).map((_, index) => (
            <ChallengeCardSkeleton key={index} />
          ))
        ) : filteredChallenges?.length === 0 ? (
          <div className="col-span-full">
            <div className="text-center text-muted-foreground">
              No challenges found :(
            </div>
          </div>
        ) : (
          paginatedChallenges?.map((challenge, i) => (
            <ChallengeCard key={i} {...challenge} />
          ))
        )}
      </div>
      {filteredChallenges && filteredChallenges.length > PAGE_SIZE && (
        <ChallengePagination totalPages={totalPages} />
      )}
    </>
  );
};

export { ChallengeList };
