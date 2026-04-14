'use client';

import React, { useEffect, useState } from 'react';
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
import { bhawanRankingColumns } from '../table-defs/bhawan-ranking-columns';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type {
  BhawanRankingEntry,
  LeaderboardEntry,
  LeaderboardMode,
} from '@/lib/types/leaderboard';

function BhawanRankingsTableInner() {
  const { data: tableData } = useSuspenseQuery(
    leaderboardTableQuery({ page: 1, mode: 'bhawan_rankings' })
  );
  if (tableData.mode !== 'bhawan_rankings') {
    throw new Error('Expected bhawan_rankings');
  }
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable<BhawanRankingEntry>({
    data: tableData.data,
    columns: bhawanRankingColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { columnFilters },
    onColumnFiltersChange: setColumnFilters,
  });
  return <DataTable table={table} />;
}

function PlayersLeaderboardTableInner({
  mode,
}: {
  mode: 'overall' | 'my_bhawan';
}) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: LEADERBOARD_TABLE_PAGE_LIMIT,
  });

  const { data: tableData } = useSuspenseQuery(
    leaderboardTableQuery({
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
      mode,
    })
  );

  if (tableData.mode === 'bhawan_rankings') {
    throw new Error('Expected player leaderboard');
  }

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable<LeaderboardEntry>({
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
    <>
      <DataTable table={table} />
      <TablePagination table={table} />
    </>
  );
}

export const LeaderboardTable = () => {
  const [mode, setMode] = useState<LeaderboardMode>('overall');

  return (
    <div className="bg-card text-card-foreground">
      <div className="flex flex-col gap-4 p-5 sm:p-8">
        <h2 className="text-2xl font-bold mx-auto">Leaderboard</h2>
        <Tabs
          value={mode}
          onValueChange={(v) => setMode(v as LeaderboardMode)}
          className="mx-auto w-full max-w-lg"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overall" title="RJB and SB only">
              Freshers
            </TabsTrigger>
            <TabsTrigger value="my_bhawan">My bhawan</TabsTrigger>
            <TabsTrigger value="bhawan_rankings">Hostels</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      {mode === 'bhawan_rankings' ? (
        <BhawanRankingsTableInner key="bhawan_rankings" />
      ) : (
        <PlayersLeaderboardTableInner key={mode} mode={mode} />
      )}
    </div>
  );
};
