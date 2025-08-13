'use client';

import { challengeSubmissionsColumns } from '@/components/table-defs/challenge-submissions-columns';
import { DataTable } from '@/components/ui/data-table';
import { challengeDetailsQuery } from '@/lib/api/challenge';
import { useSuspenseQuery } from '@tanstack/react-query';
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

const ChallengeSubmissionsTable = ({ name }: { name: string }) => {
  const { data: challenge } = useSuspenseQuery(challengeDetailsQuery(name));

  const table = useReactTable({
    data: challenge.solves,
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
  });

  return <DataTable table={table} />;
};

export { ChallengeSubmissionsTable };
