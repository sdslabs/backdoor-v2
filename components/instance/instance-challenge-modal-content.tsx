'use client';

import { Bookmark, DownloadIcon, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DifficultyRating } from '@/components/ui/difficulty-rating';
import { useSuspenseQuery, useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  challengeDownloadAssets,
  challengeQuery,
} from '@/lib/api/challenge';
import { HintButtons } from '@/components/challenge/details/hint-button-with-modal';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { submissionsByChallengeTableQuery } from '@/lib/api/submissions';
import { InstanceControlPanel } from './instance-control-panel';
import { userInstanceByChallengeQuery, checkSolution } from '@/lib/api/instances';
import { toast } from 'sonner';

const InstanceChallengeModalContent: React.FC<{ challengeName: string }> = ({
  challengeName,
}) => {
  const queryClient = useQueryClient();
  const { data: challenge } = useSuspenseQuery(challengeQuery(challengeName));
  const { data: submissions } = useSuspenseQuery(
    submissionsByChallengeTableQuery({ challengeId: challenge.id, limit: 1000 })
  );
  const { data: instance, refetch: refetchInstance } = useQuery({
    ...userInstanceByChallengeQuery(challengeName),
    refetchInterval: 10000,
  });

  const [checkResult, setCheckResult] = useState<{
    message: string;
    success: boolean;
  } | null>(null);

  const checkSolutionMutation = useMutation({
    mutationFn: () => {
      if (!instance) {
        throw new Error('No active instance');
      }
      return checkSolution(challenge.id, instance.instance_id);
    },
    onSuccess: (data) => {
      setCheckResult(data);
      if (data.success) {
        toast.success('Challenge solved!');
        // Invalidate queries to refresh solve status
        queryClient.invalidateQueries({ queryKey: ['challenge', challengeName] });
        queryClient.invalidateQueries({ queryKey: ['challenges'] });
      } else {
        toast.error(data.message || 'Check failed');
      }
    },
    onError: (error: Error & { response?: { data?: { error?: string } } }) => {
      const errorMessage =
        error.response?.data?.error || error.message || 'Failed to check solution';
      setCheckResult({ message: errorMessage, success: false });
      toast.error(errorMessage);
    },
  });

  const solvers = submissions.data
    .filter((submission) => submission.correct)
    .map((submission) => ({
      username: submission.username,
      solvedAt: submission.solvedAt,
    }));

  if (!challenge) {
    return <div className="text-red-500">Challenge not found</div>;
  }

  const hasActiveInstance = instance && instance.instance_id;

  return (
    <div className="bg-accent text-secondary-foreground px-4 pb-4 pt-2 max-w-4xl w-full font-sans">
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="mb-2 bg-transparent p-0 h-auto border-b border-border justify-start rounded-none">
          <TabsTrigger
            value="details"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent px-4 pb-2 shadow-none"
          >
            Challenge
          </TabsTrigger>
          <TabsTrigger
            value="instance"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent px-4 pb-2 shadow-none"
          >
            Instance
          </TabsTrigger>
          <TabsTrigger
            value="solvers"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent px-4 pb-2 shadow-none"
          >
            {challenge.solvesNumber} Solves
          </TabsTrigger>
        </TabsList>

        {/* Challenge Details Tab */}
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
            <HintButtons hints={challenge.hints} />
          )}

          {/* Check Solution Section */}
          {!challenge.solveStatus ? (
            <div className="space-y-4">
              {!hasActiveInstance ? (
                <div className="p-4 bg-muted/50 rounded-lg border border-border">
                  <p className="text-muted-foreground text-sm text-center">
                    Spawn an instance first to check your solution. Go to the Instance tab.
                  </p>
                </div>
              ) : (
                <>
                  <Button
                    onClick={() => checkSolutionMutation.mutate()}
                    disabled={checkSolutionMutation.isPending}
                    className="w-full"
                    size="lg"
                  >
                    {checkSolutionMutation.isPending ? (
                      <>
                        <Loader2 className="size-4 animate-spin mr-2" />
                        Checking Solution...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="size-4 mr-2" />
                        Check Solution
                      </>
                    )}
                  </Button>

                  {checkResult && (
                    <div
                      className={`p-4 rounded-lg border ${
                        checkResult.success
                          ? 'bg-green-500/10 border-green-500/20'
                          : 'bg-red-500/10 border-red-500/20'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {checkResult.success ? (
                          <CheckCircle2 className="size-5 text-green-500 shrink-0 mt-0.5" />
                        ) : (
                          <AlertCircle className="size-5 text-red-500 shrink-0 mt-0.5" />
                        )}
                        <p
                          className={`text-sm ${
                            checkResult.success ? 'text-green-500' : 'text-red-500'
                          }`}
                        >
                          {checkResult.message}
                        </p>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          ) : (
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <p className="text-green-500 text-center font-semibold">
                Challenge Solved!
              </p>
            </div>
          )}
        </TabsContent>

        {/* Instance Tab */}
        <TabsContent value="instance" className="space-y-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Instance Management</h3>
            <p className="text-muted-foreground text-sm">
              This challenge requires a dedicated instance. Spawn an instance to
              get your unique connection endpoint, then complete the task and check your solution.
            </p>
          </div>
          <InstanceControlPanel
            challengeName={challengeName}
            challengeId={challenge.id}
            instance={instance || null}
            onInstanceChange={() => refetchInstance()}
          />
        </TabsContent>

        {/* Solvers Tab */}
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
};

export { InstanceChallengeModalContent };
