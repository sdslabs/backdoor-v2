import {
  leaderboardGraphQuery,
  leaderboardTableQuery,
} from '@/lib/api/leaderboard';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/query-client';
import React, { Suspense } from 'react';
import {
  LeaderboardGraph,
  LeaderboardGraphSkeleton,
  LeaderboardTable,
  LeaderboardTableSkeleton,
} from '@/components/leaderboard';

const Leaderboard = async () => {
  const queryClient = getQueryClient();

  // Prefetch queries on the server using unified fetchers
  await Promise.all([
    queryClient.prefetchQuery(leaderboardGraphQuery()),
    queryClient.prefetchQuery(
      leaderboardTableQuery({ page: 1, mode: 'overall' })
    ),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <section className="flex flex-col gap-8">
      <HydrationBoundary state={dehydratedState}>
        <Suspense fallback={<LeaderboardGraphSkeleton />}>
          <LeaderboardGraph />
        </Suspense>
        <Suspense fallback={<LeaderboardTableSkeleton />}>
          <LeaderboardTable />
        </Suspense>
      </HydrationBoundary>
    </section>
  );
};

export default Leaderboard;
