'use client';

import { Bookmark, DownloadIcon } from 'lucide-react';
import React, { useActionState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { DifficultyRating } from '@/components/ui/difficulty-rating';
import { cn, downloadAssets } from '@/lib/utils';
import { useSuspenseQuery } from '@tanstack/react-query';
import { challengeQuery, submitFlag } from '@/lib/api/challenge';

const ChallengeModalContent: React.FC<{ challengeName: string }> = ({
  challengeName,
}) => {
  const { data: challenge } = useSuspenseQuery(challengeQuery(challengeName));
  const [flagSubmitState, handleFlagSubmission, flagSubmissionPending] =
    useActionState(submitFlag, null);

  if (!challenge) {
    return <div className="text-red-500">Challenge not found</div>;
  } else {
    return (
      <div className="bg-accent text-secondary-foreground p-4 max-w-4xl w-full font-sans ">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-display">{challenge.name}</h2>
            <Bookmark
              size={22}
              className="text-muted-foreground cursor-pointer hover:text-primary transition"
            />
          </div>
          <DifficultyRating difficulty={challenge.difficulty} />
        </div>

        <div className="flex justify-between align-center">
          <div className="flex gap-2 mb-6 flex-wrap">
            {challenge.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>

          <div className="flex justify-between mb-6">
            <div></div>
            <div className="text-right ">{challenge.solvesNumber} solves</div>
          </div>
        </div>

        <p className="mb-6 text-accent-foreground">{challenge.description}</p>

        {challenge.assets.length > 0 && (
          <div className="mb-6">
            {challenge.assets.map((asset) => (
              <div key={asset} className="flex items-center mb-2">
                <a
                  href={downloadAssets(challenge.name, asset)}
                  target="_blank"
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
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
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
                      <p>{hint}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
          </TooltipProvider>
        )}

        <form action={handleFlagSubmission} className="flex mt-4 w-full">
          <Input
            type="text"
            name="flag"
            id="flag"
            placeholder="Enter flag"
            autoFocus
            className="rounded-r-none !border-r-none text-center"
            disabled={flagSubmissionPending}
          />
          <input
            hidden
            className="hidden"
            name="challengeId"
            id="challengeId"
            defaultValue={challenge.id}
          />
          <Button
            type="submit"
            className="rounded-l-none"
            disabled={flagSubmissionPending}
          >
            {flagSubmissionPending ? 'Submitting...' : 'Submit'}
          </Button>
        </form>

        {flagSubmitState?.error && (
          <div className="mt-2 text-red-500 text-sm">
            {flagSubmitState.error}
          </div>
        )}
        {flagSubmitState?.success && (
          <div className="mt-2 text-green-500 text-sm">
            Flag submitted successfully!
          </div>
        )}
      </div>
    );
  }
};

export { ChallengeModalContent };
