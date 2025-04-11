'use client';

import { CheckCircle, Clock, Star } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ChallengeDifficulty,
  ChallengeDifficultyValue,
  ChallengeSolveStatus,
} from '@/lib/types';
import { useChallengeParams } from '@/hooks/use-challenge-params';

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

  const getSolveStatusIcon = (solveStatus: ChallengeSolveStatus) => {
    switch (solveStatus) {
      case 'solved':
        return <CheckCircle className="text-success" size={10} />;
      case 'unsolved':
        return <Clock className="text-progress" size={10} />;
    }
  };

  return (
    <Select value={status} onValueChange={updateStatus}>
      <SelectTrigger className="w-42 text-sm rounded-lg border-b">
        <SelectValue placeholder="Filter by" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Status</SelectLabel>
          <SelectItem value="unsolved">
            {getSolveStatusIcon('unsolved')} Unsolved
          </SelectItem>
          <SelectItem value="solved">
            {getSolveStatusIcon('solved')} Solved
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

const DifficultySelect: React.FC = () => {
  const { difficulty, updateDifficulty } = useChallengeParams();

  const renderStars = (difficulty: ChallengeDifficulty) => {
    return (
      <div className="flex flex-row gap-1 mr-1">
        {Array.from({ length: 3 }, (_, i) => (
          <Star
            key={i}
            fill={
              i < ChallengeDifficultyValue[difficulty] ? 'currentColor' : 'none'
            }
            size={10}
            className={
              i < ChallengeDifficultyValue[difficulty]
                ? 'text-primary'
                : 'text-muted-foreground'
            }
          />
        ))}
      </div>
    );
  };

  return (
    <Select value={difficulty} onValueChange={updateDifficulty}>
      <SelectTrigger className="w-42 text-sm rounded-lg border-b">
        <SelectValue placeholder="Select Difficulty" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Difficulty</SelectLabel>
          <SelectItem value="easy">{renderStars('easy')} Easy</SelectItem>
          <SelectItem value="medium">{renderStars('medium')} Medium</SelectItem>
          <SelectItem value="hard">{renderStars('hard')} Hard</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
