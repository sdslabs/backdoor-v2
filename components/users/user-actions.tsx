import React from 'react';
import { Button } from '../ui/button';
import { Table } from '@tanstack/react-table';
import { UserInfo } from '@/lib/types';
import { Input } from '../ui/input';
import { getAuthenticatedAxios } from '@/lib/api/axios';
import { toast } from 'sonner';
import { banUser } from '@/lib/api/users';
import { getCsvBlob } from 'tanstack-table-export-to-csv';
import { download } from '@/lib/utils';

const UserActions = ({ table }: { table: Table<UserInfo> }) => {
  const banSelectedUsers = async () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const selectedUsers = selectedRows.map((row) => row.original);
    if (selectedUsers.length === 0) {
      toast.error('No users selected');
      return;
    }

    selectedUsers.forEach(async (user) => {
      try {
        await banUser(user.id);
        toast.success(`Banned user ${user.username}`);
      } catch (err) {
        toast.error(`Error banning user ${user.username}`);
      }
    });
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
