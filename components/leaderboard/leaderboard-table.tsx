'use client';

import React, { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { leaderboardTableQuery } from '@/lib/api/leaderboard';
import { DataTable } from '@/components/ui/data-table';
import { TablePagination } from '@/components/ui/table-pagination';
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  PaginationState,
  useReactTable,
} from '@tanstack/react-table';
import { LEADERBOARD_TABLE_PAGE_LIMIT } from '@/lib/constants';
import { leaderboardColumns } from '../table-defs/leaderboard-columns';

export const LeaderboardTable = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: LEADERBOARD_TABLE_PAGE_LIMIT,
  });

  const { data: tableData } = useSuspenseQuery(
    leaderboardTableQuery({
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
    })
  );
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: tableData.data,
    columns: leaderboardColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
    rowCount: tableData.total,
    state: {
      columnFilters,
      pagination,
    },
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
  });

  return (
    <div className="bg-card text-card-foreground">
      <div className="flex justify-between items-center p-5 sm:p-8">
        <h2 className="text-2xl font-bold mx-auto">Leaderboard</h2>
      </div>
      <DataTable table={table} />
      <TablePagination table={table} />
    </div>
  );
};
