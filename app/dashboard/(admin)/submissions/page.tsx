import { Suspense } from 'react';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/get-query-client';
import {
  SubmissionsTable,
  SubmissionTableSkeleton,
} from '@/components/submissions';
import { submissionsTableQuery } from '@/lib/api/submissions/queries';

const SubmissionsPage = () => {
  const queryClient = getQueryClient();
  queryClient.prefetchQuery(submissionsTableQuery());

  return (
    <Suspense fallback={<SubmissionTableSkeleton />}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SubmissionsTable />
      </HydrationBoundary>
    </Suspense>
  );
};

export default SubmissionsPage;
