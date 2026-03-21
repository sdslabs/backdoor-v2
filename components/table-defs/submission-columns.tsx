import { ColumnDef } from '@tanstack/react-table';
import { Submission, SubmissionResp } from '@/lib/types';
import { cn } from '@/lib/utils';

export const submissionColumns: ColumnDef<Submission>[] = [
  {
    accessorKey: 'solvedAt',
    header: 'Time',
    cell: ({ row }) => {
      const date = row.getValue('solvedAt') as Date;
      return date.toLocaleString();
    },
  },
  {
    accessorKey: 'username',
    header: 'Player',
  },
  {
    accessorKey: 'name',
    header: 'Challenge',
  },
  {
    accessorKey: 'flag',
    header: 'Flag',
    cell: ({ row }) => {
      const { correct, flag } = row.original;
      return (
        <span
          className={cn(
            correct ? 'text-emerald-500' : 'text-destructive',
            'font-mono text-sm'
          )}
        >
          {flag}
        </span>
      );
    },
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
    accessorKey: 'tags',
    header: 'Tags',
    cell: ({ row }) => {
      const tags = row.getValue('tags') as string[];
      if (!tags || !Array.isArray(tags) || tags.length === 0) {
        return <span className="text-xs text-muted-foreground">No tags</span>;
      }
      return (
        <div className="flex gap-1">
          {tags.map((tag) => (
            <span key={tag} className="text-xs bg-secondary px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: 'Cheating',
    header: '',
    enableHiding: true,
    enableColumnFilter: true,
  },
];
