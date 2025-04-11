import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronDown } from 'lucide-react';
import { User } from '@/lib/data/users';

export const userColumns: ColumnDef<User>[] = [
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
    accessorKey: 'playerId',
    header: ({ column }) => (
      <div
        className="flex items-center cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Player ID
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
        Email ID
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
    accessorKey: 'totalPoints',
    header: ({ column }) => (
      <div
        className="flex items-center cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Points
        <ChevronDown className="ml-2 h-4 w-4" />
      </div>
    ),
  },
  {
    accessorKey: 'solvedChallenges',
    header: ({ column }) => (
      <div
        className="flex items-center cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Qty. Solved
        <ChevronDown className="ml-2 h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => row.original.solvedChallenges.length,
    sortingFn: (rowA, rowB) =>
      rowA.original.solvedChallenges.length -
      rowB.original.solvedChallenges.length,
  },
  {
    accessorKey: 'dateJoined',
    header: ({ column }) => (
      <div
        className="flex items-center cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Date Joined
        <ChevronDown className="ml-2 h-4 w-4" />
      </div>
    ),
  },
];
