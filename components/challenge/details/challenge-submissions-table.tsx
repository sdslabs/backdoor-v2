'use client';

import { challengeSubmissionsColumns } from '@/components/table-defs/challenge-submissions-columns';
import { DataTable } from '@/components/ui/data-table';
import { TablePagination } from '@/components/ui/table-pagination';
import { challengeDetailsQuery } from '@/lib/api/challenge';
import { submissionsByChallengeTableQuery } from '@/lib/api/submissions';
import { CHALLENGE_SUBMISSIONS_TABLE_PAGE_LIMIT } from '@/lib/constants';
import { useSuspenseQuery } from '@tanstack/react-query';
import {
  getCoreRowModel,
  getSortedRowModel,
  PaginationState,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';

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

  const table = useReactTable({
    data: submissions.data,
    columns: challengeSubmissionsColumns,
    getCoreRowModel: getCoreRowModel(),
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
      pagination,
    },
    manualPagination: true,
    onPaginationChange: setPagination,
  });

  return (
    <div>
      <DataTable table={table} />
      <TablePagination table={table} />
    </div>
  );
};

export { ChallengeSubmissionsTable };
