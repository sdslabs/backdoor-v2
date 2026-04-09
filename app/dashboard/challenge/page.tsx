import {
  ChallengeList,
  ChallengeTagsSidebar,
  ChallengeHeader,
  ChallengeListSkeleton,
} from '@/components/challenge';
import { InstanceChallengeModal } from '@/components/instance';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/query-client';
import { allChallengesMetadataQuery } from '@/lib/api/challenge';
import { Suspense } from 'react';

/* 
  This is the main page for the challenge dashboard.
  It contains the challenge list and the challenge tags sidebar.
  The challenge list is filtered by the selected tags, status and difficulty.
  The challenge tags sidebar allows the user to filter the challenges by tags.
  The instance challenge modal opens when a challenge is clicked (spawn / manage instance).

  All the states are in the URL.
  URL Params - 
  * @param instance - challenge name for instance modal
  * @param tag - challenge tag (all, web, pwn, etc.)
  * @param status - challenge status (solved, unsolved)
  * @param difficulty - challenge difficulty (easy, medium, hard)
*/

const ChallengePage = async () => {
  const queryClient = getQueryClient();

  // Prefetch queries on the server using unified fetchers
  await queryClient.prefetchQuery(allChallengesMetadataQuery());

  return (
    <div className="flex flex-row gap-8 w-full">
      <ChallengeTagsSidebar />
      <div className="flex flex-1 flex-col">
        <ChallengeHeader />
        <Suspense fallback={<ChallengeListSkeleton />}>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <ChallengeList />
          </HydrationBoundary>
        </Suspense>
      </div>
      <InstanceChallengeModal />
    </div>
  );
};

export default ChallengePage;
