'use client';

import * as React from 'react';
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Search } from 'lucide-react';
import { leaderboardEntries } from '@/lib/data/leaderboard';
import Navbar from '@/components/navbar';
import { DataTable } from '@/components/ui/data-table';
import LeaderboardGraph from '@/components/leaderboard/leaderboard-graph';
import { Pagination } from '@/components/pagination';
import { leaderboardColumns } from '@/components/table-defs/leaderboard-columns';

export default function LeaderboardPage() {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [currentPage, setCurrentPage] = React.useState(0);
  const rowsPerPage = 20;

  const table = useReactTable({
    data: leaderboardEntries,
    columns: leaderboardColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      columnFilters,
      pagination: {
        pageIndex: currentPage,
        pageSize: rowsPerPage,
      },
    },
    onColumnFiltersChange: setColumnFilters,
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
      <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
        <Navbar />
        <LeaderboardGraph />

        <div className="bg-secondary text-secondary-foreground rounded-2xl mt-12 p-6 sm:p-8 w-full sm:w-3/4 mx-auto">
          <h2 className="text-lg font-semibold mb-3">
            Who are you looking for?
          </h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Type a player ID"
              value={
                (table.getColumn('playerId')?.getFilterValue() as string) ?? ''
              }
              onChange={(e) =>
                table.getColumn('playerId')?.setFilterValue(e.target.value)
              }
              className="w-full bg-background border border-border text-foreground py-2 px-4 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-highlight focus:border-highlight"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>

        <div className="bg-card text-card-foreground rounded-2xl mt-12 overflow-hidden">
          <div className="flex justify-between items-center p-6 sm:p-8">
            <h2 className="text-2xl font-bold mx-auto">Leaderboard</h2>
          </div>

          <DataTable table={table} />
          <Pagination table={table} />
        </div>
      </div>
    </div>
  );
}
