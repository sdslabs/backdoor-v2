'use client';

import { useState, useMemo } from 'react';
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { submissions, Submission } from '@/lib/data/submissions';
import Navbar from '@/components/navbar';
import { DataTable } from '@/components/data-table';
import { Pagination } from '@/components/pagination';

const columns: ColumnDef<Submission>[] = [
  {
    accessorKey: 'timestamp',
    header: 'Time',
    cell: ({ row }) => {
      const date = new Date(row.getValue('timestamp'));
      return date.toLocaleString();
    },
  },
  {
    accessorKey: 'playerId',
    header: 'Player',
  },
  {
    accessorKey: 'challengeTitle',
    header: 'Challenge',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'points',
    header: 'Points',
  },
  {
    accessorKey: 'flag',
    header: 'Submitted Flag',
    cell: ({ row }) => {
      const flag = row.getValue('flag') as string;
      return <span className="font-mono text-sm">{flag}</span>;
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      const statusColors = {
        correct: 'text-green-500',
        incorrect: 'text-red-500',
        flagged: 'text-orange-500',
        suspicious: 'text-yellow-500',
      };
      return (
        <span className={statusColors[status as keyof typeof statusColors]}>
          {status.toUpperCase()}
        </span>
      );
    },
  },
  {
    accessorKey: 'timeTaken',
    header: 'Time Taken',
    cell: ({ row }) => {
      const seconds = row.getValue('timeTaken') as number;
      return `${seconds}s`;
    },
  },
  {
    accessorKey: 'ipAddress',
    header: 'IP Address',
  },
];

export default function SubmissionsPage() {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 20;

  const filteredData = useMemo(() => {
    if (statusFilter === 'all') return submissions;
    return submissions.filter(
      (submission) => submission.status === statusFilter
    );
  }, [statusFilter]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredData.slice(startIndex, startIndex + rowsPerPage);
  }, [currentPage, filteredData]);

  const table = useReactTable({
    data: paginatedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="p-6 max-w-7xl mx-auto">
        <Navbar />

        <div className="bg-secondary rounded-lg p-6 mb-6 w-3/4 mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Submissions Log</h1>
            <select
              className="bg-black/50 text-white rounded-md py-2 px-4"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Submissions</option>
              <option value="correct">Correct</option>
              <option value="incorrect">Incorrect</option>
              <option value="flagged">Flagged</option>
              <option value="suspicious">Suspicious</option>
            </select>
          </div>
        </div>

        <div className="bg-secondary rounded-lg overflow-hidden">
          <DataTable table={table} />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
