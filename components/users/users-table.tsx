'use client';

import { userColumns } from '@/components/table-defs/user-columns';
import { useSuspenseQuery } from '@tanstack/react-query';
import { userTableQuery } from '@/lib/api/users/client-queries';
import {
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
  PaginationState,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';
import { useState } from 'react';
import { USERS_TABLE_PAGE_LIMIT } from '@/lib/constants';
import { DataTable } from '@/components/ui/data-table';
import { TablePagination } from '@/components/ui/table-pagination';
import UserActions from './user-actions';

const UsersTable = () => {
  const { data: usersData } = useSuspenseQuery(userTableQuery());
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: USERS_TABLE_PAGE_LIMIT,
  });

  const table = useReactTable({
    data: usersData,
    columns: userColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    rowCount: usersData.length,
    state: {
      columnFilters,
      pagination,
    },
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
  });

  return (
    <div className="w-full p-5">
      <UserActions table={table} />
      <DataTable table={table} />
      {table.getFilteredRowModel().rows.length > USERS_TABLE_PAGE_LIMIT && (
        <TablePagination table={table} />
      )}
    </div>
  );
};

export { UsersTable };
