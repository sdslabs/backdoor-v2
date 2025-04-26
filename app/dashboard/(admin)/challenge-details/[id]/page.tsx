import {
  ChallengeDetailsWithActions,
  ChallengeSubmissionsStatistics,
  ChallengeSubmissionsTable,
} from '@/components/challenge';
import { challengeDetailsQuery } from '@/lib/api/challenge';
import { getQueryClient } from '@/lib/get-query-client';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';

const ChallengeDetailsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const queryClient = getQueryClient();
  queryClient.prefetchQuery(challengeDetailsQuery(id));

  return (
    <div className="w-full flex flex-col gap-4 p-5">
      <Suspense fallback={<div>Loading...</div>}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ChallengeDetailsWithActions id={id} />
        </HydrationBoundary>
      </Suspense>
      <div className="flex flex-row gap-4">
        <div className="basis-1/2">
          <Suspense fallback={<div>Loading...</div>}>
            <HydrationBoundary state={dehydrate(queryClient)}>
              <ChallengeSubmissionsTable id={id} />
            </HydrationBoundary>
          </Suspense>
        </div>
        <div className="basis-1/2">
          <Suspense fallback={<div>Loading...</div>}>
            <HydrationBoundary state={dehydrate(queryClient)}>
              <ChallengeSubmissionsStatistics id={id} />
            </HydrationBoundary>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetailsPage;
