'use client';

import type {
  ChallengeDetails,
  ChallengeMetadata,
} from '@/lib/types/challenge';
import { Badge } from '@/components/ui/badge';
import { DifficultyRating } from '@/components/ui/difficulty-rating';
import { SolveStatusIcon } from '@/components/ui/solve-status-icon';
import { useChallengeParams } from '@/lib/hooks/use-challenge-params';
import { useAuthStore } from '@/lib/stores/auth-store';
import { useRouter } from 'next/navigation';

const ChallengeCard: React.FC<ChallengeMetadata> = ({
  id,
  name,
  tags,
  points,
  difficulty,
  solvesNumber,
  solveStatus,
}) => {
  const { updateName } = useChallengeParams();
  const { role } = useAuthStore();
  const router = useRouter();

  const handleClick = () => {
    if (role === 'admin') {
      router.push(`/dashboard/challenge-details/${name}`);
    } else {
      updateName(name);
    }
  };

  return (
    <>
      <div
        className="p-6 bg-accent rounded-xl flex flex-col gap-4 cursor-pointer"
        onClick={handleClick}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <h3 className="text-foreground font-display text-2xl line-clamp-1">
              {name}
            </h3>
            <SolveStatusIcon status={solveStatus} />
          </div>
          <div className="flex items-center">
            <span className="pr-2 border-r border-muted-foreground text-sm">
              {points} points
            </span>
            <span className="pl-2">
              <DifficultyRating difficulty={difficulty} />
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            {tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
          <p className="text-accent-foreground text-sm">
            {solvesNumber} solves
          </p>
        </div>
      </div>
    </>
  );
};

export { ChallengeCard };
