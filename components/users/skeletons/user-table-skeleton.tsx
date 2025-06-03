import { DataTableSkeleton } from '@/components/ui/data-table-skeleton';
import { USERS_TABLE_PAGE_LIMIT } from '@/lib/constants';

export const UserTableSkeleton = () => {
  return <DataTableSkeleton rows={USERS_TABLE_PAGE_LIMIT} pagination />;
};
