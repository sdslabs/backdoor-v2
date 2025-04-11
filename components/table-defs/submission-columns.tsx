// app/(your-folder)/submission-columns.tsx or wherever it's appropriate

import { ColumnDef } from '@tanstack/react-table';
import { Submission } from '@/lib/data/submissions';

export const submissionColumns: ColumnDef<Submission>[] = [
  {
    accessorKey: 'timestamp',
    header: 'Time',
    cell: ({ row }) => {
      const date = new Date(row.getValue('timestamp'));
      return date.toLocaleString();
    },
  },
  {
    accessorKey: 'playerId',
    header: 'Player',
  },
  {
    accessorKey: 'challengeTitle',
    header: 'Challenge',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'points',
    header: 'Points',
  },
  {
    accessorKey: 'flag',
    header: 'Submitted Flag',
    cell: ({ row }) => {
      const flag = row.getValue('flag') as string;
      return <span className="font-mono text-sm text-foreground">{flag}</span>;
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      const statusColors = {
        correct: 'text-primary',
        incorrect: 'text-destructive',
        flagged: 'text-highlight',
        suspicious: 'text-muted-foreground',
      };
      return (
        <span className={statusColors[status as keyof typeof statusColors]}>
          {status.toUpperCase()}
        </span>
      );
    },
  },
  {
    accessorKey: 'timeTaken',
    header: 'Time Taken',
    cell: ({ row }) => {
      const seconds = row.getValue('timeTaken') as number;
      return `${seconds}s`;
    },
  },
  {
    accessorKey: 'ipAddress',
    header: 'IP Address',
  },
];
