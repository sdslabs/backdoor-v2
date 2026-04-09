import {
  InstanceChallengeList,
  InstanceChallengeModal,
  InstanceChallengeHeader,
} from '@/components/instance';
import { ChallengeTagsSidebar } from '@/components/challenge';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/query-client';
import { allChallengesMetadataQuery } from '@/lib/api/challenge';
import { Suspense } from 'react';
import { ChallengeListSkeleton } from '@/components/challenge';

/*
  User instances page

  Lists instances the user has spawned (GET /instances). Open a row to manage
  that instance (extend, stop, check solution) via the same modal as Challenges.

  URL Params:
  * @param instance - challenge name for modal
  * @param tag - challenge tag filter (all, web, pwn, etc.)
  * @param status - challenge status (solved, unsolved)
  * @param difficulty - challenge difficulty (easy, medium, hard)
*/

const InstancesPage = async () => {
  const queryClient = getQueryClient();

  // Prefetch challenges metadata on the server
  await queryClient.prefetchQuery(allChallengesMetadataQuery());

  return (
    <div className="flex flex-row gap-8 w-full">
      <ChallengeTagsSidebar />
      <div className="flex flex-1 flex-col">
        <InstanceChallengeHeader />
        <Suspense fallback={<ChallengeListSkeleton />}>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <InstanceChallengeList />
          </HydrationBoundary>
        </Suspense>
      </div>
      <InstanceChallengeModal />
    </div>
  );
};

export default InstancesPage;
