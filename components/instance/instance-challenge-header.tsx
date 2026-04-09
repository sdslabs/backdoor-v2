'use client';

import { Server } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { userInstancesQuery } from '@/lib/api/instances';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useChallengeParams } from '@/lib/hooks/use-challenge-params';
import {
  ChallengeDifficulty,
  ChallengeSolveStatus,
} from '@/lib/types/challenge';

const InstanceChallengeHeader: React.FC = () => {
  const { data: userInstances } = useQuery({
    ...userInstancesQuery(),
    refetchInterval: 30000,
  });

  const { status, difficulty, updateStatus, updateDifficulty } =
    useChallengeParams();

  const activeInstanceCount = userInstances?.length || 0;

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-bold">Instances</h2>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
          <Server className="size-4 text-primary" />
          <span className="text-sm font-medium text-primary">
            {activeInstanceCount} active
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Select
          value={status || 'all'}
          onValueChange={(value) => updateStatus(value as ChallengeSolveStatus)}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="solved">Solved</SelectItem>
            <SelectItem value="unsolved">Unsolved</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={difficulty || 'all'}
          onValueChange={(value) =>
            updateDifficulty(value as ChallengeDifficulty | 'all')
          }
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export { InstanceChallengeHeader };
