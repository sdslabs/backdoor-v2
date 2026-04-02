'use client';

import { InstanceChallengeCard } from './instance-challenge-card';
import { ChallengeMetadata, ChallengeTag } from '@/lib/types/challenge';
import { InstanceResponse } from '@/lib/types/instance';
import { useSuspenseQuery, useQuery } from '@tanstack/react-query';
import { allChallengesMetadataQuery } from '@/lib/api/challenge';
import { userInstancesQuery } from '@/lib/api/instances';
import { useChallengeParams } from '@/lib/hooks/use-challenge-params';
import { ChallengePagination } from '@/components/challenge/list/challenge-pagination';
import { useRouter, useSearchParams } from 'next/navigation';

const PAGE_SIZE = 12;

const InstanceChallengeList: React.FC = () => {
  const { data: allChallenges } = useSuspenseQuery(
    allChallengesMetadataQuery()
  );
  const { data: userInstances } = useQuery({
    ...userInstancesQuery(),
    refetchInterval: 30000,
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const { tag, status, difficulty, page } = useChallengeParams();

  // Create a map of challenge name to instance for quick lookup
  const instanceMap = new Map<string, InstanceResponse>();
  userInstances?.forEach((instance) => {
    instanceMap.set(instance.challenge_name, instance);
  });

  const instancedChallenges = allChallenges?.filter((c) => c.isInstanced) ?? [];

  const filteredChallenges = instancedChallenges.filter(
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

  const handleChallengeClick = (challengeName: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('instance', challengeName);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  if (filteredChallenges?.length === 0) {
    return (
      <div className="col-span-full">
        <div className="text-center text-muted-foreground py-12">
          No instance challenges found :(
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginatedChallenges?.map((challenge, i) => (
          <InstanceChallengeCard
            key={i}
            {...challenge}
            instance={instanceMap.get(challenge.name)}
            onClick={() => handleChallengeClick(challenge.name)}
          />
        ))}
      </div>
      {filteredChallenges && filteredChallenges.length > PAGE_SIZE && (
        <ChallengePagination totalPages={totalPages} />
      )}
    </>
  );
};

export { InstanceChallengeList };
