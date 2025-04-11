'use client';

import { fetchChallengeData } from '@/lib/data/challenge';
import { Bookmark, DownloadIcon } from 'lucide-react';
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import ChallengeDetailsSkeleton from './skeletons/challenge-details-skeleton';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { DifficultyRating } from '@/components/ui/difficulty-rating';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';

const ChallengeDetails: React.FC<{ challengeId: string }> = ({
  challengeId,
}) => {
  const [flagInput, setFlagInput] = useState('');

  const { data: challenge, isLoading } = useQuery({
    queryKey: ['challenge', challengeId],
    queryFn: () => fetchChallengeData(challengeId),
    refetchOnWindowFocus: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting flag:', flagInput);
    setFlagInput('');
  };

  if (isLoading) {
    return <ChallengeDetailsSkeleton />;
  } else if (!challenge) {
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

        <form onSubmit={handleSubmit} className="flex mt-4">
          <Input
            type="text"
            placeholder="Enter flag"
            autoFocus
            className="rounded-r-none !border-r-none text-center"
            value={flagInput}
            onChange={(e) => setFlagInput(e.target.value)}
          />
          <Button type="submit" className="rounded-l-none">
            Submit
          </Button>
        </form>
      </div>
    );
  }
};

export default ChallengeDetails;
