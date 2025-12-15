import React from 'react';
import { Button } from '../ui/button';
import { Table } from '@tanstack/react-table';
import { Submission, SubmissionResp, UserInfo } from '@/lib/types';

const SubmissionsActions = ({ table }: { table: Table<Submission> }) => {
  return (
    <div className="bg-muted rounded-t-lg flex flex-row items-center justify-between py-3 px-4">
      <h2 className="text-2xltext-xl">Submissions Log</h2>
      <div className="flex items-center gap-2">
        <Button>All / Cheat</Button>
      </div>
    </div>
  );
};

export default SubmissionsActions;
