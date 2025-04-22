'use client';

import { useState, useMemo } from 'react';
import {
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from '@tanstack/react-table';
import { submissions, Submission } from '@/lib/data/submissions';
import Navbar from '@/components/navbar';
import { DataTable } from '@/components/ui/data-table';
import { Pagination } from '@/components/ui/table-pagination';
import { submissionColumns } from '@/components/table-defs/submission-columns';

export default function SubmissionsPage() {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 20;

  const filteredData = useMemo(() => {
    if (statusFilter === 'all') return submissions;
    return submissions.filter(
      (submission) => submission.status === statusFilter
    );
  }, [statusFilter]);

  const table = useReactTable({
    data: filteredData,
    columns: submissionColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination: {
        pageIndex: currentPage,
        pageSize: rowsPerPage,
      },
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
        <div className="bg-secondary rounded-lg p-6 mb-6 w-3/4 mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Submissions Log</h1>
            <select
              className="bg-popover text-popover-foreground rounded-md py-2 px-4"
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
          <Pagination table={table} />
        </div>
      </div>
    </div>
  );
}
