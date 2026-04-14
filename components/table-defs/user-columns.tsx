import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronDown } from 'lucide-react';
import { UserInfo, UserStatus } from '@/lib/types';
import { Badge } from '../ui/badge';

export const userColumns: ColumnDef<UserInfo>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="custom-checkbox ml-4"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="custom-checkbox ml-4"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'username',
    header: ({ column }) => (
      <div
        className="flex items-center cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Username
        <ChevronDown className="ml-2 h-4 w-4" />
      </div>
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <div
        className="flex items-center cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Email
        <ChevronDown className="ml-2 h-4 w-4" />
      </div>
    ),
  },
  {
    accessorKey: 'bhawan',
    header: ({ column }) => (
      <div
        className="flex items-center cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Bhawan
        <ChevronDown className="ml-2 h-4 w-4" />
      </div>
    ),
  },
  {
    accessorKey: 'rank',
    header: ({ column }) => (
      <div
        className="flex items-center cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Rank
        <ChevronDown className="ml-2 h-4 w-4" />
      </div>
    ),
  },
  {
    accessorKey: 'score',
    header: ({ column }) => (
      <div
        className="flex items-center cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Score
        <ChevronDown className="ml-2 h-4 w-4" />
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <div
        className="flex items-center cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Status
        <ChevronDown className="ml-2 h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => {
      const status = row.original.status;
      return <Badge> {UserStatus[status]} </Badge>;
    },
  },
];
