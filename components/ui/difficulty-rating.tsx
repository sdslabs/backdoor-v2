import { ChallengeDifficulty, ChallengeDifficultyValue } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';
import React from 'react';

interface DifficultyRatingProps {
  difficulty: ChallengeDifficulty;
  starSize?: number;
  className?: string;
}

export const DifficultyRating: React.FC<DifficultyRatingProps> = ({
  difficulty,
  starSize = 18,
  className,
}) => {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      {Array.from({ length: 3 }, (_, i) => (
        <Star
          key={i}
          fill={
            i < ChallengeDifficultyValue[difficulty] ? 'currentColor' : 'none'
          }
          size={starSize}
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
