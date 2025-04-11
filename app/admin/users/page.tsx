'use client';

import * as React from 'react';
import {
  ColumnFiltersState,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
  useReactTable,
  getPaginationRowModel,
} from '@tanstack/react-table';
import { ChevronDown, Search, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { users } from '@/lib/data/users';
import Navbar from '@/components/navbar';
import { DataTable } from '@/components/ui/data-table';
import { Pagination } from '@/components/pagination';
import { userColumns } from '@/components/table-defs/user-columns';

export default function UsersPage() {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [currentPage, setCurrentPage] = React.useState(0);
  const rowsPerPage = 20;

  const categories = [
    'All',
    ...new Set(users.flatMap((u) => u.solvedChallenges.map((c) => c.category))),
  ];

  const table = useReactTable({
    data: users,
    columns: userColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      columnFilters,
      sorting,
      rowSelection,
      pagination: {
        pageIndex: currentPage,
        pageSize: rowsPerPage,
      },
    },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: (updater) => {
      const next =
        typeof updater === 'function'
          ? updater({ pageIndex: currentPage, pageSize: rowsPerPage })
          : updater;
      setCurrentPage(next.pageIndex);
    },
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
                  placeholder="Search by player ID or email"
                  value={
                    (table.getColumn('playerId')?.getFilterValue() as string) ??
                    ''
                  }
                  onChange={(e) =>
                    table.getColumn('playerId')?.setFilterValue(e.target.value)
                  }
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
                  value={
                    (table.getColumn('category')?.getFilterValue() as string) ??
                    'All'
                  }
                  onChange={(e) =>
                    table
                      .getColumn('category')
                      ?.setFilterValue(
                        e.target.value === 'All' ? undefined : e.target.value
                      )
                  }
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
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
