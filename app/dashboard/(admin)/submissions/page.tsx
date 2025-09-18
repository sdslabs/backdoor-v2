import { Suspense } from 'react';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/query-client';
import {
  SubmissionsTable,
  SubmissionTableSkeleton,
} from '@/components/submissions';
import { submissionsTableServerQuery } from '@/lib/api/submissions/server-queries';

const SubmissionsPage = () => {
  const queryClient = getQueryClient();
  queryClient.prefetchQuery(submissionsTableServerQuery());

  return (
    <Suspense fallback={<SubmissionTableSkeleton />}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SubmissionsTable />
      </HydrationBoundary>
    </Suspense>
  );
};

export default SubmissionsPage;
