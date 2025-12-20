import React from 'react';
import { Button } from '../ui/button';
import { Table } from '@tanstack/react-table';
import { UserInfo } from '@/lib/types';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import { userStatusMutation } from '@/lib/api/users';
import { getCsvBlob } from 'tanstack-table-export-to-csv';
import { download } from '@/lib/utils';
import { QueryClient, useMutation } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/query-client';

const UserActions = ({ table }: { table: Table<UserInfo> }) => {
  const queryClient: QueryClient = getQueryClient();

  type UserActionType = 'ban' | 'unban';

  const modifySelectedUsersStatus = async (action: UserActionType) => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const selectedUserIds = selectedRows.map((rows) => rows.original.id);

    if (selectedUserIds.length === 0) {
      toast.error('No users selected');
      return;
    }
    try {
      await mutateUserStatus({ userIds: selectedUserIds, action });
      toast.success(
        `${action === 'ban' ? 'Banned' : 'Unbanned'} users successfully`
      );
    } catch (err) {
      toast.error(`Error ${action === 'ban' ? 'banning' : 'unbanning'} users`);
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

  const { mutate: mutateUserStatus } = useMutation({
    ...userStatusMutation(),
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
        <div className="flex flex-row gap-1">
          <Button
            variant={'destructive'}
            onClick={() => {
              modifySelectedUsersStatus('ban');
            }}
          >
            Ban
          </Button>
          <Button
            variant={'default'}
            onClick={() => modifySelectedUsersStatus('unban')}
          >
            Unban
          </Button>
        </div>
        <Button onClick={() => handleExportToCsv()}>Export Data CSV</Button>
      </div>
    </div>
  );
};

export default UserActions;
