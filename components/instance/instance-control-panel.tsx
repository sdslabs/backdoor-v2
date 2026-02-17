'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { InstanceTimer } from './instance-timer';
import { InstanceResponse } from '@/lib/types/instance';
import {
  spawnInstance,
  extendInstance,
  killInstance,
  checkSolution,
} from '@/lib/api/instances';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  Play,
  Square,
  Clock,
  Copy,
  CheckCircle,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from 'lucide-react';

interface InstanceControlPanelProps {
  challengeName: string;
  challengeId?: string;
  instance: InstanceResponse | null;
  onInstanceChange?: () => void;
  onSolve?: () => void;
}

const InstanceControlPanel: React.FC<InstanceControlPanelProps> = ({
  challengeName,
  challengeId,
  instance,
  onInstanceChange,
  onSolve,
}) => {
  const queryClient = useQueryClient();
  const [copied, setCopied] = useState(false);
  const [checkResult, setCheckResult] = useState<{
    message: string;
    success: boolean;
  } | null>(null);

  const invalidateQueries = () => {
    queryClient.invalidateQueries({ queryKey: ['user-instances'] });
    queryClient.invalidateQueries({
      queryKey: ['user-instance', challengeName],
    });
    onInstanceChange?.();
  };

  const spawnMutation = useMutation({
    mutationFn: () => spawnInstance(challengeName),
    onSuccess: () => {
      toast.success('Instance spawned successfully!');
      invalidateQueries();
    },
    onError: (error: Error & { response?: { data?: { error?: string } } }) => {
      const errorMessage =
        error.response?.data?.error || error.message || 'Failed to spawn instance';
      toast.error(errorMessage);
    },
  });

  const extendMutation = useMutation({
    mutationFn: () => extendInstance(challengeName, 300),
    onSuccess: () => {
      toast.success('Instance extended by 5 minutes!');
      invalidateQueries();
    },
    onError: (error: Error & { response?: { data?: { error?: string } } }) => {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        'Failed to extend instance';
      toast.error(errorMessage);
    },
  });

  const killMutation = useMutation({
    mutationFn: () => killInstance(challengeName),
    onSuccess: () => {
      toast.success('Instance terminated');
      invalidateQueries();
    },
    onError: (error: Error & { response?: { data?: { error?: string } } }) => {
      const errorMessage =
        error.response?.data?.error || error.message || 'Failed to kill instance';
      toast.error(errorMessage);
    },
  });

  const checkSolutionMutation = useMutation({
    mutationFn: () => {
      if (!instance || !challengeId) {
        throw new Error('Missing instance or challenge ID');
      }
      return checkSolution(challengeId, instance.instance_id);
    },
    onSuccess: (data) => {
      setCheckResult(data);
      if (data.success) {
        toast.success('Challenge solved!');
        queryClient.invalidateQueries({ queryKey: ['challenge', challengeName] });
        queryClient.invalidateQueries({ queryKey: ['challenges'] });
        onSolve?.();
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

  const isLoading =
    spawnMutation.isPending ||
    extendMutation.isPending ||
    killMutation.isPending ||
    checkSolutionMutation.isPending;

  const copyConnectionString = () => {
    if (instance) {
      const connectionString = `${instance.hosted_address}:${instance.port}`;
      navigator.clipboard.writeText(connectionString);
      setCopied(true);
      toast.success('Connection string copied!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!instance) {
    // No active instance - show spawn button
    return (
      <div className="flex flex-col gap-4">
        <div className="p-4 bg-muted/50 rounded-lg border border-border">
          <p className="text-muted-foreground text-sm text-center">
            No active instance. Spawn one to start the challenge.
          </p>
        </div>
        <Button
          onClick={() => spawnMutation.mutate()}
          disabled={isLoading}
          className="w-full"
          variant="default"
        >
          {spawnMutation.isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Play className="size-4" />
          )}
          {spawnMutation.isPending ? 'Spawning...' : 'Spawn Instance'}
        </Button>
      </div>
    );
  }

  // Active instance - show controls
  return (
    <div className="flex flex-col gap-4">
      {/* Connection Info */}
      <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Connection</span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Time left:</span>
            <InstanceTimer
              expiresAt={instance.expires_at}
              onExpire={invalidateQueries}
              className="text-sm font-bold"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <code className="flex-1 px-3 py-2 bg-background rounded text-sm font-mono text-foreground">
            {instance.hosted_address}:{instance.port}
          </code>
          <Button
            size="icon"
            variant="outline"
            onClick={copyConnectionString}
            className="shrink-0"
          >
            {copied ? (
              <CheckCircle className="size-4 text-green-500" />
            ) : (
              <Copy className="size-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Instance Actions */}
      <div className="flex gap-2">
        <Button
          onClick={() => extendMutation.mutate()}
          disabled={isLoading}
          variant="outline"
          className="flex-1"
        >
          {extendMutation.isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Clock className="size-4" />
          )}
          Extend (+5 min)
        </Button>
        <Button
          onClick={() => killMutation.mutate()}
          disabled={isLoading}
          variant="destructive"
          className="flex-1"
        >
          {killMutation.isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Square className="size-4" />
          )}
          Stop Instance
        </Button>
      </div>

      {/* Check Solution Button */}
      {challengeId && (
        <>
          <Button
            onClick={() => checkSolutionMutation.mutate()}
            disabled={isLoading}
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
                  <CheckCircle className="size-5 text-green-500 shrink-0 mt-0.5" />
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
  );
};

export { InstanceControlPanel };
