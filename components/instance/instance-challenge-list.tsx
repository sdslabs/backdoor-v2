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

function orphanMetadata(instance: InstanceResponse): ChallengeMetadata {
  return {
    id: instance.instance_id,
    name: instance.challenge_name,
    tags: [],
    points: 0,
    difficulty: 'medium',
    solvesNumber: 0,
    solveStatus: 'unsolved',
    isInstanced: true,
    createdAt: new Date(0),
  };
}

function matchesFilters(
  meta: ChallengeMetadata | undefined,
  tag: string,
  status: string,
  difficulty: string
): boolean {
  if (!meta) {
    return (
      tag === 'all' && status === 'all' && (!difficulty || difficulty === 'all')
    );
  }
  return (
    (tag === 'all' || meta.tags.includes(tag as ChallengeTag)) &&
    (status === 'all' || meta.solveStatus === status) &&
    (!difficulty || difficulty === 'all' || difficulty === meta.difficulty)
  );
}

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

  const metaByName = new Map<string, ChallengeMetadata>();
  allChallenges?.forEach((c) => metaByName.set(c.name, c));

  const rows =
    userInstances?.map((instance) => {
      const meta = metaByName.get(instance.challenge_name);
      return {
        instance,
        meta: meta ?? orphanMetadata(instance),
      };
    }) ?? [];

  const filteredRows = rows.filter(({ instance }) =>
    matchesFilters(
      metaByName.get(instance.challenge_name),
      tag,
      status,
      difficulty ?? ''
    )
  );

  const paginatedRows = filteredRows.slice(
    (Number(page) - 1) * PAGE_SIZE,
    Number(page) * PAGE_SIZE
  );

  const totalPages = Math.ceil(filteredRows.length / PAGE_SIZE);

  const handleChallengeClick = (challengeName: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('instance', challengeName);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  if (filteredRows.length === 0) {
    return (
      <div className="col-span-full">
        <div className="text-center text-muted-foreground py-12">
          No active instances :(
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginatedRows.map(({ instance, meta }) => (
          <InstanceChallengeCard
            key={instance.instance_id}
            {...meta}
            instance={instance}
            onClick={() => handleChallengeClick(instance.challenge_name)}
          />
        ))}
      </div>
      {filteredRows.length > PAGE_SIZE && (
        <ChallengePagination totalPages={totalPages} />
      )}
    </>
  );
};

export { InstanceChallengeList };
