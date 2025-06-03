import { Skeleton } from '@/components/ui/skeleton';

const ChallengeSubmissionsStatisticsSkeleton = () => {
  return (
    <div className="bg-accent rounded-xl p-4 space-y-4">
      {/* Stats header */}
      <div className="flex gap-4 w-full">
        <Skeleton className="h-16 w-full rounded-xl basis-1/3" />
        <Skeleton className="h-16 w-full rounded-xl basis-1/3" />
        <Skeleton className="h-16 w-full rounded-xl basis-1/3" />
      </div>
      {/* Chart area */}
      <Skeleton className="bg-card rounded-xl w-full h-64" />
    </div>
  );
};

export { ChallengeSubmissionsStatisticsSkeleton };
