import {
  leaderboardGraphQuery,
  leaderboardTableQuery,
} from '@/lib/api/leaderboard/queries';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/get-query-client';
import React, { Suspense } from 'react';
import {
  LeaderboardGraph,
  LeaderboardGraphSkeleton,
  LeaderboardTable,
  LeaderboardTableSkeleton,
} from '@/components/leaderboard';

const Leaderboard = () => {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery(leaderboardGraphQuery());
  queryClient.prefetchQuery(leaderboardTableQuery());

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
