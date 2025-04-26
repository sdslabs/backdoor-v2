import { Skeleton } from '@/components/ui/skeleton';

const ChallengeDetailsWithActionsSkeleton = () => {
  return (
    <div className="bg-accent rounded-xl p-6 space-y-6">
      {/* Header: Title, status, tags */}
      <div className="flex items-center gap-4">
        <Skeleton className="h-8 w-48 rounded" />
        <Skeleton className="h-6 w-20 rounded" />
        <Skeleton className="h-6 w-12 rounded" />
      </div>
      {/* Description */}
      <Skeleton className="h-5 w-3/4 rounded" />
      <Skeleton className="h-5 w-2/3 rounded" />
      {/* Assets */}
      <div className="flex gap-2">
        <Skeleton className="h-4 w-32 rounded" />
        <Skeleton className="h-4 w-32 rounded" />
      </div>
      {/* Hints */}
      <div className="flex gap-2">
        <Skeleton className="h-8 w-8 rounded" />
        <Skeleton className="h-8 w-8 rounded" />
      </div>
      {/* Actions */}
      <div className="flex gap-2">
        <Skeleton className="h-8 w-8 rounded" />
        <Skeleton className="h-8 w-8 rounded" />
        <Skeleton className="h-8 w-8 rounded" />
      </div>
    </div>
  );
};

export { ChallengeDetailsWithActionsSkeleton };
