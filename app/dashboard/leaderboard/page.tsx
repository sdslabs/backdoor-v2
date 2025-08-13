import {
  leaderboardGraphServerQuery,
  leaderboardTableServerQuery,
} from '@/lib/api/leaderboard/server-queries';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/get-query-client';
import React, { Suspense } from 'react';
import {
  LeaderboardGraph,
  LeaderboardGraphSkeleton,
  LeaderboardTable,
  LeaderboardTableSkeleton,
} from '@/components/leaderboard';

const Leaderboard = async () => {
  const queryClient = getQueryClient();

  // Prefetch queries on the server using server-side fetchers
  await queryClient.prefetchQuery(leaderboardGraphServerQuery());
  await queryClient.prefetchQuery(leaderboardTableServerQuery());

  return (
    <section className="flex flex-col gap-8">
      <Suspense fallback={<LeaderboardGraphSkeleton />}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <LeaderboardGraph />
        </HydrationBoundary>
      </Suspense>
      <Suspense fallback={<LeaderboardTableSkeleton />}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <LeaderboardTable />
        </HydrationBoundary>
      </Suspense>
    </section>
  );
};

export default Leaderboard;
