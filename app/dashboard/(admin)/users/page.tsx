import { userTableQuery } from '@/lib/api/users/queries';
import { getQueryClient } from '@/lib/get-query-client';
import { Suspense } from 'react';
import { UserTableSkeleton } from '@/components/users';
import { UsersTable } from '@/components/users';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

const UsersPage = () => {
  const queryClient = getQueryClient();
  queryClient.prefetchQuery(userTableQuery());

  return (
    <Suspense fallback={<UserTableSkeleton />}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UsersTable />
      </HydrationBoundary>
    </Suspense>
  );
};

export default UsersPage;
