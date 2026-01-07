import { Submission, UserSolveResp } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { ChevronDown } from 'lucide-react';

export const challengeSubmissionsColumns: ColumnDef<Submission>[] = [
  {
    accessorKey: 'username',
    header: () => (
      <div className="flex items-center">
        Username
        <ChevronDown className="ml-2 h-4 w-4" />
      </div>
    ),
  },
  {
    accessorKey: 'flag',
    header: () => (
      <div className="flex items-center">
        Flag
        <ChevronDown className="ml-2 h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => {
      const { correct, flag } = row.original;
      return (
        <span
          className={cn(
            correct ? 'text-emerald-500' : 'text-destructive',
            'font-semibold'
          )}
        >
          {flag}
        </span>
      );
    },
  },
  {
    accessorKey: 'solvedAt',
    header: () => (
      <div className="flex items-center">
        Solved At
        <ChevronDown className="ml-2 h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => {
      const date = row.getValue('solvedAt') as Date;
      if (!date) return '-';
      return date.toLocaleString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    },
  },
  {
    accessorKey: 'Cheating',
    header: '',
    enableHiding: true,
    enableColumnFilter: true,
  },
];
