'use client';

import { ChallengeCard } from './challenge-card';
import { ChallengeTag } from '@/lib/types';
import { useChallengeParams } from '@/lib/hooks/use-challenge-params';
import { ChallengePagination } from './challenge-pagination';
import { useSuspenseQuery } from '@tanstack/react-query';
import { allChallengesMetadataQuery } from '@/lib/api/challenge';

const PAGE_SIZE = 12;

const ChallengeList = () => {
  const { data: challenges } = useSuspenseQuery(allChallengesMetadataQuery());
  const { tag, status, difficulty, page } = useChallengeParams();

  const filteredChallenges = challenges?.filter(
    ({ tags, solveStatus, difficulty: challengeDifficulty }) => {
      return (
        (tag === 'all' || tags.includes(tag as ChallengeTag)) &&
        (status === 'all' || solveStatus === status) &&
        (!difficulty ||
          difficulty === 'all' ||
          difficulty === challengeDifficulty)
      );
    }
  );

  const paginatedChallenges = filteredChallenges?.slice(
    (Number(page) - 1) * PAGE_SIZE,
    Number(page) * PAGE_SIZE
  );

  const totalPages = Math.ceil((filteredChallenges?.length || 0) / PAGE_SIZE);

  if (filteredChallenges?.length === 0) {
    return (
      <div className="col-span-full">
        <div className="text-center text-muted-foreground">
          No challenges found :(
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginatedChallenges?.map((challenge, i) => (
          <ChallengeCard key={i} {...challenge} />
        ))}
      </div>
      {filteredChallenges && filteredChallenges.length > PAGE_SIZE && (
        <ChallengePagination totalPages={totalPages} />
      )}
    </>
  );
};

export { ChallengeList };
