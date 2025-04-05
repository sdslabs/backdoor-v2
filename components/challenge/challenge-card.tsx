import { Star, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { ChallengeMetadata, ChallengeDifficulty } from '@/lib/types/challenge';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface ChallengeCardProps extends ChallengeMetadata {
  onClick?: () => void;
}

const getSolveStatusIcon = (solveStatus: string) => {
  switch (solveStatus) {
    case 'solved':
      return <CheckCircle className="text-success" size={18} />;
    case 'unsolved':
      return <Clock className="text-progress" size={18} />;
    default:
      return <AlertCircle className="text-muted-foreground" size={18} />;
  }
};

const ChallengeCard: React.FC<ChallengeCardProps> = ({
  id,
  name,
  tags,
  points,
  difficulty,
  solvesNumber,
  solveStatus,
  deployedStatus,
  onClick,
}) => {
  return (
    <>
      <Link href={`/challenge?id=${id}`}>
        <div
          className="p-6 bg-accent rounded-xl flex flex-col gap-4 cursor-pointer"
          onClick={onClick}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <h3 className="text-foreground font-display text-2xl">{name}</h3>
              {getSolveStatusIcon(solveStatus)}
            </div>
            <div className="flex gap-1">
              {[...Array(3)].map((_, index) => (
                <Star
                  key={index}
                  size={16}
                  className={
                    index < ChallengeDifficulty[difficulty]
                      ? 'text-primary'
                      : 'text-accent-foreground'
                  }
                />
              ))}
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
      </Link>
    </>
  );
};

export default ChallengeCard;
