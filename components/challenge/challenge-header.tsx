'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Brain, CheckCircle, Clock, Star } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChallengeDifficulty, ChallengeSolveStatus } from '@/lib/types';

export const ChallengeHeader = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const status = searchParams.get('status') || 'unsolved';
  const difficulty = searchParams.get('difficulty') || 'easy';
  const selectedTag = searchParams.get('tag') || 'all';

  const handleParamChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`?${params.toString()}`);
  };

  const handleFilterChange = (value: string) =>
    handleParamChange('status', value);
  const handleDifficultyChange = (value: string) =>
    handleParamChange('difficulty', value);

  return (
    <div className="flex flex-row py-5 items-center justify-between sticky top-0 z-50 bg-background shadow-2xl">
      <div className="inline-flex items-end gap-4">
        <h1 className="text-2xl font-bold uppercase">{selectedTag}</h1>
      </div>
      <div className="flex flex-row gap-3">
        <StatusSelect status={status} onStatusChange={handleFilterChange} />
        <DifficultySelect
          difficulty={difficulty as keyof typeof ChallengeDifficulty}
          onDifficultyChange={handleDifficultyChange}
        />
      </div>
    </div>
  );
};

interface StatusSelectProps {
  status: string;
  onStatusChange: (value: string) => void;
}
const StatusSelect: React.FC<StatusSelectProps> = ({
  status,
  onStatusChange,
}) => {
  const getSolveStatusIcon = (solveStatus: ChallengeSolveStatus) => {
    switch (solveStatus) {
      case 'solved':
        return <CheckCircle className="text-success" size={10} />;
      case 'attempted':
        return <Clock className="text-progress" size={10} />;
      case 'unsolved':
        return <Brain className="text-muted-foreground" size={10} />;
    }
  };

  return (
    <Select value={status} onValueChange={onStatusChange}>
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
          <SelectItem value="attempted">
            {getSolveStatusIcon('attempted')} Attempted
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

interface DifficultySelectProps {
  difficulty: keyof typeof ChallengeDifficulty;
  onDifficultyChange: (value: keyof typeof ChallengeDifficulty) => void;
}
const DifficultySelect: React.FC<DifficultySelectProps> = ({
  difficulty,
  onDifficultyChange,
}) => {
  const renderStars = (difficulty: keyof typeof ChallengeDifficulty) => {
    return (
      <div className="flex flex-row gap-1 mr-1">
        {Array.from({ length: 3 }, (_, i) => (
          <Star
            key={i}
            fill={i < ChallengeDifficulty[difficulty] ? 'currentColor' : 'none'}
            size={10}
            className={
              i < ChallengeDifficulty[difficulty]
                ? 'text-primary'
                : 'text-muted-foreground'
            }
          />
        ))}
      </div>
    );
  };

  return (
    <Select value={difficulty} onValueChange={onDifficultyChange}>
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
