import { DataTableSkeleton } from '@/components/ui/data-table-skeleton';
import { LEADERBOARD_TABLE_PAGE_LIMIT } from '@/lib/constants';

export const LeaderboardTableSkeleton = () => {
  return <DataTableSkeleton rows={LEADERBOARD_TABLE_PAGE_LIMIT} pagination />;
};
