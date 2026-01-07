import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Table } from '@tanstack/react-table';
import { Submission, SubmissionResp, UserInfo } from '@/lib/types';
import { Search, X } from 'lucide-react';

const SubmissionsActions = ({
  table,
  hideChallengeFilter = false,
}: {
  table: Table<Submission>;
  hideChallengeFilter?: boolean;
}) => {
  const [showCheating, setShowCheating] = useState<'all' | 'cheat'>('all');
  const [challengeFilter, setChallengeFilter] = useState('');
  const [userFilter, setUserFilter] = useState('');

  const toggleFilter = () => {
    if (showCheating === 'all') {
      setShowCheating('cheat');
      table.getColumn('Cheating')?.setFilterValue(true);
    } else {
      setShowCheating('all');
      table.getColumn('Cheating')?.setFilterValue(undefined);
    }
  };

  React.useEffect(() => {
    if (challengeFilter) {
      table.getColumn('name')?.setFilterValue(challengeFilter);
    } else {
      table.getColumn('name')?.setFilterValue(undefined);
    }
  }, [challengeFilter, table]);

  React.useEffect(() => {
    if (userFilter) {
      table.getColumn('username')?.setFilterValue(userFilter);
    } else {
      table.getColumn('username')?.setFilterValue(undefined);
    }
  }, [userFilter, table]);

  const clearFilters = () => {
    setChallengeFilter('');
    setUserFilter('');
    setShowCheating('all');
    table.getColumn('Cheating')?.setFilterValue(undefined);
  };

  const hasActiveFilters =
    (!hideChallengeFilter && challengeFilter) ||
    userFilter ||
    showCheating !== 'all';

  return (
    <div className="bg-muted rounded-t-lg py-3 px-4">
      <div className="flex flex-row items-center justify-between mb-3">
        <h2 className="text-xl font-semibold">Submissions Log</h2>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="gap-2"
          >
            <X className="h-4 w-4" />
            Clear Filters
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        {!hideChallengeFilter && (
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search challenge..."
              value={challengeFilter}
              onChange={(e) => setChallengeFilter(e.target.value)}
              className="w-[200px]"
            />
          </div>
        )}
        <Input
          placeholder="Search user..."
          value={userFilter}
          onChange={(e) => setUserFilter(e.target.value)}
          className="w-[200px]"
        />
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
