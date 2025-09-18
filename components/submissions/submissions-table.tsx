'use client';

import { submissionsTableQuery } from '@/lib/api/submissions/client-queries';
import { SUBMISSIONS_TABLE_PAGE_LIMIT } from '@/lib/constants';
import { useSuspenseQuery } from '@tanstack/react-query';
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  PaginationState,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import { submissionColumns } from '@/components/table-defs/submission-columns';
import { DataTable } from '@/components/ui/data-table';
import { TablePagination } from '@/components/ui/table-pagination';

const SubmissionsTable = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: SUBMISSIONS_TABLE_PAGE_LIMIT,
  });

  const { data: tableData } = useSuspenseQuery(
    submissionsTableQuery({
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
    })
  );
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: tableData.data,
    columns: submissionColumns,
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
    <div className="w-full p-5">
      <h2 className="text-2xl font-semibold mb-4">Submissions Log</h2>
      <DataTable table={table} />
      <TablePagination table={table} />
    </div>
  );
};

export { SubmissionsTable };
