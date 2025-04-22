import React from 'react';
import { Button } from '../ui/button';
import { Table } from '@tanstack/react-table';
import { UserInfo } from '@/lib/types';
import { Input } from '../ui/input';

const UserActions = ({ table }: { table: Table<UserInfo> }) => {
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
        <Button variant={'secondary'}>Ban Selected</Button>
        <Button>Export Data (PDF/CSV)</Button>
      </div>
    </div>
  );
};

export default UserActions;
