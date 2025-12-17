import React from 'react';
import { Button } from '../ui/button';
import { Table } from '@tanstack/react-table';
import { UserInfo } from '@/lib/types';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import { banUserMutation, unbanUserMutation } from '@/lib/api/users';
import { getCsvBlob } from 'tanstack-table-export-to-csv';
import { download } from '@/lib/utils';
import { QueryClient, useMutation } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/query-client';

const UserActions = ({ table }: { table: Table<UserInfo> }) => {
  const queryClient: QueryClient = getQueryClient();

  const banSelectedUsers = async () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const selectedUsers = selectedRows.map((row) => row.original);
    const selectedUserIds = selectedRows.map((rows) => rows.original.id);

    if (selectedUserIds.length === 0) {
      toast.error('No users selected');
      return;
    }
    try {
      await mutateUserBan(selectedUserIds);
      toast.success(`Banned users successfully`);
    } catch (err) {
      toast.error(`Error banning users`);
    }
    queryClient.refetchQueries({ queryKey: ['users'] });
    table.resetRowSelection();
  };

  const unbanSelectedUsers = async () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const selectedUsers = selectedRows.map((row) => row.original);
    const selectedUserIds = selectedRows.map((rows) => rows.original.id);

    if (selectedUserIds.length === 0) {
      toast.error('No users selected');
      return;
    }
    try {
      await mutateUserUnban(selectedUserIds);
      toast.success(`Unbanned users successfully`);
    } catch (err) {
      toast.error(`Error banning users`);
    }

    // TODO: fix autoupdate table status
    queryClient.refetchQueries({ queryKey: ['users'] });
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

  const { mutate: mutateUserBan } = useMutation({
    ...banUserMutation(),
  });

  const { mutate: mutateUserUnban } = useMutation({
    ...unbanUserMutation(),
  });

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
        <Button
          variant={'secondary'}
          onClick={() => {
            banSelectedUsers();
          }}
        >
          Ban Selected
        </Button>
        <Button variant={'secondary'} onClick={() => unbanSelectedUsers()}>
          Unban Selected
        </Button>
        <Button onClick={() => handleExportToCsv()}>Export Data CSV</Button>
      </div>
    </div>
  );
};

export default UserActions;
