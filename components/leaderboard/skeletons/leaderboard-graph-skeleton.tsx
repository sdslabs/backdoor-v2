'use client';

import { Skeleton } from '@/components/ui/skeleton';

export const LeaderboardGraphSkeleton = () => {
  return (
    <div className="bg-accent h-[480px] rounded-2xl mt-12 p-12 sm:p-8">
      <Skeleton className="h-full w-full rounded-lg" />
    </div>
  );
};
