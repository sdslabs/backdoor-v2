'use client';

import { Badge } from '@/components/ui/badge';
import { DifficultyRating } from '@/components/ui/difficulty-rating';
import { SolveStatusIcon } from '@/components/ui/solve-status-icon';
import { InstanceTimer } from './instance-timer';
import { InstanceResponse } from '@/lib/types/instance';
import { ChallengeMetadata } from '@/lib/types/challenge';
import { Server, Play } from 'lucide-react';

interface InstanceChallengeCardProps extends ChallengeMetadata {
  instance?: InstanceResponse | null;
  onClick?: () => void;
}

const InstanceChallengeCard: React.FC<InstanceChallengeCardProps> = ({
  name,
  tags,
  points,
  difficulty,
  solvesNumber,
  solveStatus,
  instance,
  onClick,
}) => {
  const hasActiveInstance = instance && instance.instance_id;

  return (
    <div
      className="p-6 bg-accent rounded-xl flex flex-col gap-4 cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all"
      onClick={onClick}
    >
      {/* Header */}
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

      {/* Instance Status Badge */}
      <div className="flex items-center gap-2">
        <div
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
            hasActiveInstance
              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
              : 'bg-muted text-muted-foreground border border-border'
          }`}
        >
          {hasActiveInstance ? (
            <>
              <Server className="size-3 animate-pulse" />
              <span>Running</span>
              <span className="mx-1">•</span>
              <InstanceTimer
                expiresAt={instance!.expires_at}
                className="text-xs"
              />
            </>
          ) : (
            <>
              <Play className="size-3" />
              <span>Instance Required</span>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2 flex-wrap">
          {tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        <p className="text-accent-foreground text-sm">{solvesNumber} solves</p>
      </div>
    </div>
  );
};

export { InstanceChallengeCard };
