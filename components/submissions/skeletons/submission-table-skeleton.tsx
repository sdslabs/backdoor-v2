import { DataTableSkeleton } from '@/components/ui/data-table-skeleton';
import { SUBMISSIONS_TABLE_PAGE_LIMIT } from '@/lib/constants';

export const SubmissionTableSkeleton = () => {
  return <DataTableSkeleton rows={SUBMISSIONS_TABLE_PAGE_LIMIT} pagination />;
};
