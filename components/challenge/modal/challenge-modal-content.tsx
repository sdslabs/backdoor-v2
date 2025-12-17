'use client';

import { Bookmark, DownloadIcon } from 'lucide-react';
import React, { useActionState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DifficultyRating } from '@/components/ui/difficulty-rating';
import { cn } from '@/lib/utils';
import { useSuspenseQuery } from '@tanstack/react-query';
import {
  challengeDownloadAssets,
  challengeQuery,
  submitFlag,
} from '@/lib/api/challenge';
import { HintButtons } from '@/components/challenge/details/hint-button-with-modal';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { submissionsByChallengeTableQuery } from '@/lib/api/submissions';

const ChallengeModalContent: React.FC<{ challengeName: string }> = ({
  challengeName,
}) => {
  const { data: challenge } = useSuspenseQuery(challengeQuery(challengeName));
  const { data: submissions } = useSuspenseQuery(
    submissionsByChallengeTableQuery({ challengeName, limit: 1000 })
  );
  const [flagSubmitState, handleFlagSubmission, flagSubmissionPending] =
    useActionState(submitFlag, null);

  const solvers = submissions.data
    .filter((submission) => submission.correct)
    .map((submission) => ({
      username: submission.username,
      solvedAt: submission.solvedAt,
    }));

  if (!challenge) {
    return <div className="text-red-500">Challenge not found</div>;
  } else {
    return (
      <div className="bg-accent text-secondary-foreground px-4 pb-4 pt-2 max-w-4xl w-full font-sans ">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="mb-2 bg-transparent p-0 h-auto border-b border-border justify-start rounded-none">
            <TabsTrigger
              value="details"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent px-4 pb-2 shadow-none"
            >
              Challenge
            </TabsTrigger>
            <TabsTrigger
              value="solvers"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent px-4 pb-2 shadow-none"
            >
              {challenge.solvesNumber} Solves
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-display">{challenge.name}</h2>
                <Bookmark
                  size={22}
                  className="text-muted-foreground cursor-pointer hover:text-primary transition"
                />
              </div>
              <div className="flex items-center">
                <span className="pr-2 border-r border-muted-foreground text-sm">
                  {challenge.points} points
                </span>
                <span className="pl-2">
                  <DifficultyRating difficulty={challenge.difficulty} />
                </span>
              </div>
            </div>

            <div className="flex gap-2 flex-wrap mb-4">
              {challenge.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>

            <p className="text-accent-foreground">{challenge.description}</p>

            {challenge.assets.length > 0 && (
              <div>
                {challenge.assets.map((asset) => (
                  <div
                    key={asset}
                    className="flex items-center mb-2 cursor-pointer"
                    onClick={() =>
                      challengeDownloadAssets(challenge.name, asset)
                    }
                  >
                    <a
                      target="_blank"
                      className="text-primary hover:underline flex items-center "
                    >
                      {asset}
                      <DownloadIcon size={16} className="ml-2" />
                    </a>
                  </div>
                ))}
              </div>
            )}

            {challenge.hints.length > 0 && (
              <HintButtons hints={challenge.hints} />
            )}

            {!challenge.solveStatus ? (
              <>
                <form action={handleFlagSubmission} className="flex w-full">
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
                {flagSubmitState?.success ? (
                  <div className="mt-2 text-green-500 text-sm">
                    {flagSubmitState.message}
                  </div>
                ) : (
                  <div className="mt-2 text-red-500 text-sm">
                    {flagSubmitState?.message || ''}
                  </div>
                )}
              </>
            ) : (
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-green-500 text-center font-semibold">
                  Challenge Solved!
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="solvers" className="mt-0">
            <div className="max-h-[60vh] overflow-y-auto">
              {solvers.length > 0 ? (
                <div className="divide-y divide-border">
                  {solvers.map((solver, index) => (
                    <div
                      key={`${solver.username}-${index}`}
                      className="flex items-center justify-between py-3 px-2 hover:bg-accent/50 transition-colors"
                    >
                      <span className="font-medium">{solver.username}</span>
                      <span className="text-sm text-muted-foreground">
                        {solver.solvedAt.toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit',
                          hour12: true,
                        })}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <p className="text-muted-foreground">No solvers yet</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  }
};

export { ChallengeModalContent };
