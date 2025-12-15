'use client';

import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import {
  challengeDetailsQuery,
  manageChallengeByName,
} from '@/lib/api/challenge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  DownloadIcon,
  PenIcon,
  PowerIcon,
  PowerOffIcon,
  TrashIcon,
} from 'lucide-react';
import { DifficultyRating } from '@/components/ui/difficulty-rating';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const ChallengeDetailsWithActions = ({ name }: { name: string }) => {
  const { data: challenge } = useSuspenseQuery(challengeDetailsQuery(name));
  const isDeployed = challenge.deployedStatus.toLowerCase() === 'deployed';

  const handleManageChallengeState = async ({ action }: { action: string }) => {
    try {
      // TODO: Remove this when Backend server ChallengeMetaData even when the challen is undeployed
      if (action.toLowerCase() === 'undeploy') {
        throw Error('undeploy feature under construction...');
      } else if (action.toLowerCase() === 'purge') {
        throw Error('not a good idea to delete a chalenge!!');
      }
      const res = await manageChallengeByName({
        name: challenge.name,
        action: action,
      });
      toast(res.message);
    } catch (err) {
      toast.error(`Some error occured: ${err}`);
    }
  };

  return (
    <div className="bg-accent p-6 rounded-xl w-full space-y-2">
      {/* Header with actions */}
      <div className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-display">{challenge.name}</h2>
          <Badge variant={isDeployed ? 'primary' : 'default'}>
            {challenge.deployedStatus}
          </Badge>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Button
            size="iconSm"
            variant={'ghost'}
            onClick={() => {
              isDeployed
                ? handleManageChallengeState({
                    action: 'undeploy',
                  })
                : handleManageChallengeState({
                    action: 'deploy',
                  });
            }}
          >
            {isDeployed ? <PowerOffIcon size={16} /> : <PowerIcon size={16} />}
          </Button>
          <Button size="iconSm" variant={'ghost'}>
            <PenIcon size={16} />
          </Button>
          <Button
            size="iconSm"
            variant={'ghost'}
            onClick={() => {
              handleManageChallengeState({
                action: 'purge',
              });
            }}
          >
            <TrashIcon size={16} />
          </Button>
        </div>
      </div>
      {/* Tags with metadata */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {challenge.tags.map((tag) => (
            <Badge key={tag} variant={'default'}>
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center">
          <span className="inline-flex gap-2 pr-2 border-r border-muted-foreground">
            <DifficultyRating difficulty={challenge.difficulty} />{' '}
            {challenge.difficulty}
          </span>
          <span className="px-2 border-r border-muted-foreground">
            {challenge.points} points
          </span>
          <span className="pl-2">{challenge.solvesNumber} solves</span>
        </div>
      </div>

      <p>{challenge.description}</p>

      {challenge.assets.length > 0 && (
        <div className="mb-6">
          {challenge.assets.map((asset) => (
            <div key={asset} className="flex items-center mb-2">
              <a
                href="#"
                className="text-primary hover:underline flex items-center"
              >
                {asset}
                <DownloadIcon size={16} className="ml-2" />
              </a>
            </div>
          ))}
        </div>
      )}
      {challenge.hints.length > 0 && (
        <TooltipProvider>
          <div className="flex items-center gap-2">
            <span>Hints</span>
            {challenge.hints.map((hint, index) => (
              <Tooltip key={index}>
                <TooltipTrigger>
                  <div
                    className={cn(
                      'font-mono text-xs size-5',
                      'text-muted-foreground border border-muted-foreground'
                    )}
                  >
                    {index + 1}
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  className="bg-muted-foreground [&_svg]:bg-muted-foreground [&_svg]:fill-muted-foreground"
                  side="top"
                >
                  <p>{hint.points}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
      )}
    </div>
  );
};

export { ChallengeDetailsWithActions };
