import { userTableServerQuery } from '@/lib/api/users/server-queries';
import { getQueryClient } from '@/lib/query-client';
import { Suspense } from 'react';
import { UserTableSkeleton } from '@/components/users';
import { UsersTable } from '@/components/users';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

const UsersPage = () => {
  const queryClient = getQueryClient();
  queryClient.prefetchQuery(userTableServerQuery());

  return (
    <Suspense fallback={<UserTableSkeleton />}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UsersTable />
      </HydrationBoundary>
    </Suspense>
  );
};

export default UsersPage;
