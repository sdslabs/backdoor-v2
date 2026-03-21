'use client';

import { challengeSubmissionsColumns } from '@/components/table-defs/challenge-submissions-columns';
import { DataTable } from '@/components/ui/data-table';
import { TablePagination } from '@/components/ui/table-pagination';
import { challengeDetailsQuery } from '@/lib/api/challenge';
import { submissionsByChallengeTableQuery } from '@/lib/api/submissions';
import { CHALLENGE_SUBMISSIONS_TABLE_PAGE_LIMIT } from '@/lib/constants';
import { useSuspenseQuery } from '@tanstack/react-query';
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  PaginationState,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import SubmissionsActions from '@/components/submissions/submissions-action';

const ChallengeSubmissionsTable = ({ name }: { name: string }) => {
  const { data: challenge } = useSuspenseQuery(challengeDetailsQuery(name));
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: CHALLENGE_SUBMISSIONS_TABLE_PAGE_LIMIT,
  });
  const { data: submissions } = useSuspenseQuery(
    submissionsByChallengeTableQuery({
      challengeId: challenge.id,
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
    })
  );
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: submissions.data,
    columns: challengeSubmissionsColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      sorting: [
        {
          id: 'solvedAt',
          desc: true,
        },
      ],
    },
    rowCount: submissions.total,
    state: {
      columnFilters,
      pagination,
      columnVisibility: {
        Cheating: false,
      },
    },
    manualPagination: true,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
  });

  return (
    <div>
      <SubmissionsActions table={table} hideChallengeFilter />
      <DataTable table={table} />
      <TablePagination table={table} />
    </div>
  );
};

export { ChallengeSubmissionsTable };
