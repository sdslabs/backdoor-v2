import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Table } from '@tanstack/react-table';
import { Submission, SubmissionResp, UserInfo } from '@/lib/types';

const SubmissionsActions = ({ table }: { table: Table<Submission> }) => {
  const [showCheating, setShowCheating] = useState<'all' | 'cheat'>('all');

  const toggleFilter = () => {
    if (showCheating === 'all') {
      setShowCheating('cheat');
      table.getColumn('Cheating')?.setFilterValue(true);
    } else {
      setShowCheating('all');
      table.getColumn('Cheating')?.setFilterValue(undefined);
    }
  };

  return (
    <div className="bg-muted rounded-t-lg flex flex-row items-center justify-between py-3 px-4">
      <h2 className="text-xl font-semibold">Submissions Log</h2>
      <div className="flex items-center gap-2">
        <Button
          onClick={toggleFilter}
          variant={showCheating === 'cheat' ? 'default' : 'outline'}
        >
          {showCheating === 'all' ? 'All' : 'Cheating'}
        </Button>
      </div>
    </div>
  );
};

export default SubmissionsActions;
