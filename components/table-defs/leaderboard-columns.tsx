import { ColumnDef } from '@tanstack/react-table';
import { LeaderboardEntry } from '@/lib/types';

export const leaderboardColumns: ColumnDef<LeaderboardEntry>[] = [
  {
    accessorKey: 'rank',
    header: () => <div className="text-center">Rank</div>,
    cell: ({ row }) => (
      <div className="text-center pl-6">{row.getValue('rank')}</div>
    ),
  },
  {
    accessorKey: 'playerId',
    header: 'Player',
  },
  {
    accessorKey: 'totalPoints',
    header: 'Points',
  },
];
