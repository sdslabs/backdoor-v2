import { ColumnDef } from '@tanstack/react-table';
import { BhawanRankingEntry } from '@/lib/types/leaderboard';

export const bhawanRankingColumns: ColumnDef<BhawanRankingEntry>[] = [
  {
    accessorKey: 'rank',
    header: () => <div className="text-center">Rank</div>,
    cell: ({ row }) => (
      <div className="text-center pl-6">{row.getValue('rank')}</div>
    ),
  },
  {
    accessorKey: 'bhawan',
    header: 'Bhawan',
  },
  {
    accessorKey: 'topPoints',
    header: 'Top score',
  },
  {
    accessorKey: 'topPlayer',
    header: 'Top player',
  },
];
