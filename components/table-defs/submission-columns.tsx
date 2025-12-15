import { ColumnDef } from '@tanstack/react-table';
import { Submission, SubmissionResp } from '@/lib/types';

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
];
