import React from 'react';
import { Button } from '../ui/button';
import { Table } from '@tanstack/react-table';
import { UserInfo } from '@/lib/types';
import { Input } from '../ui/input';
import { getAuthenticatedAxios } from '@/lib/api/axios';
import { toast } from 'sonner';
import { banUserQuery, banUsers } from '@/lib/api/users';
import { getCsvBlob } from 'tanstack-table-export-to-csv';
import { download } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';

const UserActions = ({ table }: { table: Table<UserInfo> }) => {
  const banSelectedUsers = async () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const selectedUsers = selectedRows.map((row) => row.original);
    const selectedUserIds = selectedRows.map((rows) => rows.original.id);
    if (selectedUserIds.length === 0) {
      toast.error('No users selected');
      return;
    }
    try {
      await mutateUser(selectedUserIds);
      toast.success(`Banned users successfully`);
    } catch (err) {
      toast.error(`Error banning users`);
    }
    table.resetRowSelection();
  };

  const handleExportToCsv = (): void => {
    const headers = table
      .getHeaderGroups()
      .map((x) => x.headers)
      .flat();

    const rows = table.getCoreRowModel().rows;

    const csvBlob = getCsvBlob(headers, rows);
    download(csvBlob, 'userData.csv');
  };

  const { mutate: mutateUser } = useMutation(banUserQuery());

  return (
    <div className="bg-muted rounded-t-lg flex flex-row items-center justify-between py-3 px-4">
      <h2 className="text-xl">Player Data</h2>
      <div className="flex items-center gap-2">
        <Input
          placeholder="Search by username..."
          className="min-w-[300px]"
          onChange={(e) => {
            table.getColumn('username')?.setFilterValue(e.target.value);
          }}
        />
        <Button variant={'secondary'} onClick={() => banSelectedUsers()}>
          Ban Selected
        </Button>
        <Button onClick={() => handleExportToCsv()}>
          Export Data (PDF/CSV)
        </Button>
      </div>
    </div>
  );
};

export default UserActions;
