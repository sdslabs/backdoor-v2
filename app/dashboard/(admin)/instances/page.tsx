import { AdminInstancesTable } from '@/components/instance';
import { adminAllInstancesQuery } from '@/lib/api/instances';
import { getQueryClient } from '@/lib/query-client';
import { Suspense } from 'react';
import { DataTableSkeleton } from '@/components/ui/data-table-skeleton';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

/*
  Admin Instance Management Page
  
  This page allows admins to:
  - View all active instances across all users
  - Kill individual instances
  - Kill all instances for a specific user
  - Kill all instances for a specific challenge
  - Monitor instance health and expiration times
*/

const AdminInstancesPage = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(adminAllInstancesQuery());

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display">Instance Management</h1>
        <p className="text-muted-foreground">
          Monitor and manage all active challenge instances
        </p>
      </div>
      <Suspense fallback={<DataTableSkeleton />}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <AdminInstancesTable />
        </HydrationBoundary>
      </Suspense>
    </div>
  );
};

export default AdminInstancesPage;
