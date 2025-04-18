import {
  ctfParticipationQuery,
  pointsOverTimeQuery,
  solveHistoryQuery,
} from '@/lib/api/profile/queries';
import { getQueryClient } from '@/lib/utils/get-query-client';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import PointsTimeGraph from './points-time-graph';
import PointsTimeGraphSkeleton from './skeletons/points-time-graph-skeleton';
import SolveHistorySkeleton from './skeletons/solve-history-skeleton';
import SolveHistoryComponent from './solve-history';
import YearlyActivityHeader from './yearly-activity-header';

interface YearlyActivityProps {
  username?: string;
}

async function YearlyActivity({ username }: YearlyActivityProps) {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery(pointsOverTimeQuery(username));
  queryClient.prefetchQuery(solveHistoryQuery(username));
  queryClient.prefetchQuery(ctfParticipationQuery());

  return (
    <div>
      <YearlyActivityHeader />
      {/* Solve history */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<SolveHistorySkeleton />}>
          <SolveHistoryComponent username={username} />
        </Suspense>
      </HydrationBoundary>

      {/* Points history graph */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<PointsTimeGraphSkeleton />}>
          <PointsTimeGraph username={username} />
        </Suspense>
      </HydrationBoundary>
    </div>
  );
}

export default YearlyActivity;
