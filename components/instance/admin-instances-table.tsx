'use client';

import { useState } from 'react';
import { useSuspenseQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminAllInstancesQuery } from '@/lib/api/instances';
import {
  adminKillInstance,
  adminKillUserInstances,
  adminKillChallengeInstances,
} from '@/lib/api/instances';
import { AdminInstanceResponse } from '@/lib/types/instance';
import { InstanceTimer } from './instance-timer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import {
  Trash2,
  Search,
  Server,
  User,
  Swords,
  RefreshCw,
  Loader2,
} from 'lucide-react';

const AdminInstancesTable: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: instances } = useSuspenseQuery(adminAllInstancesQuery());
  const [searchQuery, setSearchQuery] = useState('');
  const [pendingAction, setPendingAction] = useState<string | null>(null);

  const invalidateQueries = () => {
    queryClient.invalidateQueries({ queryKey: ['admin-instances'] });
  };

  const killInstanceMutation = useMutation({
    mutationFn: adminKillInstance,
    onSuccess: () => {
      toast.success('Instance terminated');
      invalidateQueries();
      setPendingAction(null);
    },
    onError: (error: Error & { response?: { data?: { error?: string } } }) => {
      const errorMessage =
        error.response?.data?.error || error.message || 'Failed to kill instance';
      toast.error(errorMessage);
      setPendingAction(null);
    },
  });

  const killUserInstancesMutation = useMutation({
    mutationFn: adminKillUserInstances,
    onSuccess: (data) => {
      toast.success(data.message);
      invalidateQueries();
      setPendingAction(null);
    },
    onError: (error: Error & { response?: { data?: { error?: string } } }) => {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        'Failed to kill user instances';
      toast.error(errorMessage);
      setPendingAction(null);
    },
  });

  const killChallengeInstancesMutation = useMutation({
    mutationFn: adminKillChallengeInstances,
    onSuccess: (data) => {
      toast.success(data.message);
      invalidateQueries();
      setPendingAction(null);
    },
    onError: (error: Error & { response?: { data?: { error?: string } } }) => {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        'Failed to kill challenge instances';
      toast.error(errorMessage);
      setPendingAction(null);
    },
  });

  const isLoading =
    killInstanceMutation.isPending ||
    killUserInstancesMutation.isPending ||
    killChallengeInstancesMutation.isPending;

  // Filter instances based on search query
  const filteredInstances = instances.filter(
    (instance) =>
      instance.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      instance.challenge_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      instance.instance_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get unique users and challenges for bulk actions
  const uniqueUsers = [...new Set(instances.map((i) => i.user_id))];
  const uniqueChallenges = [...new Set(instances.map((i) => i.challenge_name))];

  // Group instances by user
  const instancesByUser = instances.reduce(
    (acc, instance) => {
      if (!acc[instance.user_id]) {
        acc[instance.user_id] = {
          username: instance.username,
          instances: [],
        };
      }
      acc[instance.user_id].instances.push(instance);
      return acc;
    },
    {} as Record<string, { username: string; instances: AdminInstanceResponse[] }>
  );

  // Group instances by challenge
  const instancesByChallenge = instances.reduce(
    (acc, instance) => {
      if (!acc[instance.challenge_name]) {
        acc[instance.challenge_name] = [];
      }
      acc[instance.challenge_name].push(instance);
      return acc;
    },
    {} as Record<string, AdminInstanceResponse[]>
  );

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-accent rounded-lg">
          <div className="flex items-center gap-3">
            <Server className="size-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Total Instances</p>
              <p className="text-2xl font-bold">{instances.length}</p>
            </div>
          </div>
        </div>
        <div className="p-4 bg-accent rounded-lg">
          <div className="flex items-center gap-3">
            <User className="size-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Unique Users</p>
              <p className="text-2xl font-bold">{uniqueUsers.length}</p>
            </div>
          </div>
        </div>
        <div className="p-4 bg-accent rounded-lg">
          <div className="flex items-center gap-3">
            <Swords className="size-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Active Challenges</p>
              <p className="text-2xl font-bold">{uniqueChallenges.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Refresh */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search by username, challenge, or instance ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => invalidateQueries()}
          disabled={isLoading}
        >
          <RefreshCw className={`size-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Bulk Actions */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(instancesByChallenge).map(([challengeName, instances]) => (
          <AlertDialog key={challengeName}>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" disabled={isLoading}>
                <Swords className="size-3 mr-1" />
                Kill all {challengeName} ({instances.length})
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Kill All Challenge Instances</AlertDialogTitle>
                <AlertDialogDescription>
                  This will terminate all {instances.length} instances for the
                  challenge &quot;{challengeName}&quot;. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    setPendingAction(`challenge-${challengeName}`);
                    killChallengeInstancesMutation.mutate(challengeName);
                  }}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {pendingAction === `challenge-${challengeName}` ? (
                    <Loader2 className="size-4 animate-spin mr-2" />
                  ) : null}
                  Kill All
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ))}
      </div>

      {/* Instances Table */}
      {filteredInstances.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          {instances.length === 0
            ? 'No active instances'
            : 'No instances match your search'}
        </div>
      ) : (
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Challenge</TableHead>
                <TableHead>Connection</TableHead>
                <TableHead>Time Left</TableHead>
                <TableHead>Container</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInstances.map((instance) => (
                <TableRow key={instance.instance_id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{instance.username}</span>
                      <span className="text-xs text-muted-foreground">
                        {instance.user_id.slice(0, 8)}...
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{instance.challenge_name}</span>
                  </TableCell>
                  <TableCell>
                    <code className="text-sm bg-muted px-2 py-1 rounded">
                      {instance.hosted_address}:{instance.port}
                    </code>
                  </TableCell>
                  <TableCell>
                    <InstanceTimer
                      expiresAt={instance.expires_at}
                      className="text-sm font-mono"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">
                        {instance.deployment_type}
                      </span>
                      <span className="text-xs text-muted-foreground truncate max-w-24">
                        {instance.container_id.slice(0, 12)}...
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {/* Kill user's instances */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            disabled={isLoading}
                            title="Kill all user instances"
                          >
                            <User className="size-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Kill All User Instances
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This will terminate all{' '}
                              {instancesByUser[instance.user_id]?.instances.length || 0}{' '}
                              instances for user &quot;{instance.username}&quot;.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => {
                                setPendingAction(`user-${instance.user_id}`);
                                killUserInstancesMutation.mutate(instance.user_id);
                              }}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Kill All
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>

                      {/* Kill this instance */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="destructive"
                            size="icon"
                            disabled={isLoading}
                            title="Kill instance"
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Kill Instance</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will terminate the instance for{' '}
                              {instance.username} on {instance.challenge_name}.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => {
                                setPendingAction(instance.instance_id);
                                killInstanceMutation.mutate(instance.instance_id);
                              }}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              {pendingAction === instance.instance_id ? (
                                <Loader2 className="size-4 animate-spin mr-2" />
                              ) : null}
                              Kill
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export { AdminInstancesTable };
