'use client';

import { useState, useMemo } from 'react';
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  getPaginationRowModel,
} from '@tanstack/react-table';
import { ChevronDown, Search, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { users, User } from '@/lib/data/users';
import Navbar from '@/components/navbar';
import { DataTable } from '@/components/ui/data-table';
import { Pagination } from '@/components/pagination';

const columns: ColumnDef<User>[] = [
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
  },
  {
    accessorKey: 'playerId',
    header: ({ column }) => (
      <div
        className="flex items-center cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        PlayerID
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
        Qty. solved
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
        Date joined
        <ChevronDown className="ml-2 h-4 w-4" />
      </div>
    ),
  },
];

export default function UsersPage() {
  const [filter, setFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 20;

  const uniqueCategories = useMemo(() => {
    const categories = new Set<string>();
    categories.add('All');
    users.forEach((user) => {
      user.solvedChallenges.forEach((challenge) => {
        categories.add(challenge.category);
      });
    });
    return Array.from(categories);
  }, []);

  const filteredData = useMemo(() => {
    const filtered = users.filter((user) => {
      const searchFields = [
        user.playerId,
        user.email,
        user.totalPoints.toString(),
        user.dateJoined,
      ];

      const matchesSearch = searchFields.some((field) =>
        field.toLowerCase().includes(filter.toLowerCase())
      );

      const matchesCategory =
        categoryFilter === 'All' ||
        user.solvedChallenges.some(
          (challenge) => challenge.category === categoryFilter
        );

      return matchesSearch && matchesCategory;
    });
    if (filter) setCurrentPage(0);
    return filtered;
  }, [filter, categoryFilter]);

  const table = useReactTable({
    data: filteredData, // ✅ pass the full dataset
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination: {
        pageIndex: currentPage,
        pageSize: rowsPerPage,
      },
      sorting,
      rowSelection,
    },
    onPaginationChange: (updater) => {
      const next =
        typeof updater === 'function'
          ? updater({ pageIndex: currentPage, pageSize: rowsPerPage })
          : updater;
      setCurrentPage(next.pageIndex);
    },
    manualPagination: false,
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="p-6 max-w-7xl mx-auto">
        <Navbar />
        <div className="bg-muted rounded-lg p-6 mb-6 w-3/4 mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:space-x-4 space-y-4 md:space-y-0">
            <div className="flex-1">
              <h2 className="mb-2">Who are you looking for?</h2>
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Type here"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="w-full bg-background border border-border text-muted-foreground py-2 px-4 pr-10 rounded focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <Search className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>
            <div className="md:w-1/3">
              <h2 className="mb-2">Category</h2>
              <div className="flex space-x-3">
                <select
                  className="bg-background text-foreground border border-border rounded-md py-2 px-4 flex-1 h-11"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  {uniqueCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <Button className="bg-primary hover:bg-primary/90 px-4 h-11 rounded-md">
                  SEARCH
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-muted rounded-lg overflow-hidden">
          <div className="flex justify-between items-center p-6">
            <h2 className="text-xl font-bold">Player Data</h2>
            <div className="flex space-x-2">
              <Button variant="outline" className="text-muted-foreground">
                BAN SELECTED
              </Button>
              <Button className="bg-primary hover:bg-primary/80 flex items-center">
                EXPORT PLAYER DATA (PDF/CSV)
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="ghost" className="text-muted-foreground p-2">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <DataTable table={table} />
          <Pagination table={table} />
        </div>
      </div>
    </div>
  );
}
