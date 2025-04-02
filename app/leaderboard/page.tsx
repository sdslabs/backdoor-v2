'use client';

import { useState, useMemo } from 'react';
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Search } from 'lucide-react';
import { leaderboardEntries, LeaderboardEntry } from '@/lib/data/leaderboard';
import Navbar from '@/components/navbar';
import { DataTable } from '@/components/data-table';
import { Pagination } from '@/components/pagination';

const columns: ColumnDef<LeaderboardEntry>[] = [
  {
    accessorKey: 'rank',
    header: () => <div className="text-center">Rank</div>,
    cell: ({ row }) => (
      <div className="text-center pl-6">{row.getValue('rank')}</div>
    ),
  },
  {
    accessorKey: 'playerId',
    header: 'Player',
  },
  {
    accessorKey: 'totalPoints',
    header: 'Points',
  },
];

export default function LeaderboardPage() {
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 20;

  const filteredData = useMemo(() => {
    const filtered = leaderboardEntries.filter((entry) =>
      entry.playerId.toLowerCase().includes(filter.toLowerCase())
    );
    if (filter) setCurrentPage(1);
    return filtered;
  }, [filter]);

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
          <div className="flex-1">
            <h2 className="mb-2">Who are you looking for?</h2>
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Type here"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full bg-black/50 border border-gray-800 text-gray-300 py-2 px-4 pr-10 rounded focus:outline-none focus:ring-1 focus:ring-highlight focus:border-highlight"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <Search className="h-4 w-4 text-gray-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-secondary rounded-lg overflow-hidden">
          <div className="flex justify-between items-center p-6">
            <h2 className="text-xl font-bold mx-auto">Leaderboard</h2>
          </div>

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
