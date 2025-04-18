'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useChallengeParams } from '@/lib/hooks/use-challenge-params';
import { DifficultyRating } from '@/components/ui/difficulty-rating';
import { SolveStatusIcon } from '@/components/ui/solve-status-icon';

export const ChallengeHeader = () => {
  const { tag } = useChallengeParams();
  return (
    <div className="flex flex-row py-5 items-center justify-between sticky top-0 z-50 bg-background shadow-2xl">
      <div className="inline-flex items-end gap-4">
        <h1 className="text-2xl font-bold uppercase">{tag}</h1>
      </div>
      <div className="flex flex-row gap-3">
        <StatusSelect />
        <DifficultySelect />
      </div>
    </div>
  );
};

const StatusSelect: React.FC = () => {
  const { status, updateStatus } = useChallengeParams();

  return (
    <Select value={status} onValueChange={updateStatus}>
      <SelectTrigger className="w-42 text-sm rounded-lg border-b">
        <SelectValue placeholder="Filter by" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Status</SelectLabel>
          <SelectItem value="unsolved">
            <SolveStatusIcon status="unsolved" /> Unsolved
          </SelectItem>
          <SelectItem value="solved">
            <SolveStatusIcon status="solved" /> Solved
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

const DifficultySelect: React.FC = () => {
  const { difficulty, updateDifficulty } = useChallengeParams();

  return (
    <Select value={difficulty} onValueChange={updateDifficulty}>
      <SelectTrigger className="w-42 text-sm rounded-lg border-b">
        <SelectValue placeholder="Select Difficulty" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Difficulty</SelectLabel>
          <SelectItem value="easy">
            <DifficultyRating difficulty="easy" /> Easy
          </SelectItem>
          <SelectItem value="medium">
            <DifficultyRating difficulty="medium" /> Medium
          </SelectItem>
          <SelectItem value="hard">
            <DifficultyRating difficulty="hard" /> Hard
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
