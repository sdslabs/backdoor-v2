import { Skeleton } from '@/components/ui/skeleton';

const ChallengeCardSkeleton = () => {
  return (
    <div className="p-6 bg-accent rounded-xl flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Skeleton className="h-6 w-32 bg-secondary rounded-md" />
          <Skeleton className="h-5 w-5 bg-secondary rounded-full" />
        </div>
        <div className="flex gap-1">
          {[...Array(3)].map((_, index) => (
            <Skeleton
              key={index}
              className="h-4 w-4 bg-secondary rounded-full"
            />
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          {[...Array(2)].map((_, index) => (
            <Skeleton
              key={index}
              className="h-5 w-12 bg-secondary rounded-md"
            />
          ))}
        </div>
        <Skeleton className="h-4 w-12 bg-secondary rounded-md" />
      </div>
    </div>
  );
};

export default ChallengeCardSkeleton;
