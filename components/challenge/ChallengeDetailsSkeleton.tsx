import { Skeleton } from '@/components/ui/skeleton';
import { Star, Bookmark, DownloadIcon } from 'lucide-react';

const ChallengeDetailsSkeleton = () => {
  return (
    <div className="bg-accent text-secondary-foreground p-4 max-w-4xl w-full font-sans">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-48 bg-accent-foreground rounded-md" />
          <Bookmark size={22} className="text-accent-foreground" />
        </div>
        <div className="flex items-center gap-1">
          {[...Array(3)].map((_, i) => (
            <Star key={i} size={18} className="text-accent-foreground" />
          ))}
        </div>
      </div>

      <div className="flex justify-between align-center">
        <div className="flex gap-2 mb-6 flex-wrap">
          {[...Array(3)].map((_, i) => (
            <Skeleton
              key={i}
              className="h-5 w-12 bg-accent-foreground rounded-md"
            />
          ))}
        </div>
        <Skeleton className="h-4 w-20 bg-accent-foreground rounded-md" />
      </div>

      <Skeleton className="h-20 w-full bg-accent-foreground rounded-md mb-6" />

      <div className="mb-6">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex items-center mb-2">
            <Skeleton className="h-5 w-32 bg-accent-foreground rounded-md" />
            <DownloadIcon size={16} className="text-accent-foreground ml-2" />
          </div>
        ))}
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          {[...Array(2)].map((_, i) => (
            <Skeleton
              key={i}
              className="w-6 h-6 bg-accent-foreground rounded-md"
            />
          ))}
        </div>
      </div>

      <div className="flex mt-4">
        <Skeleton className="h-12 flex-grow bg-accent-foreground rounded-l-lg" />
        <Skeleton className="h-12 w-24 bg-accent-foreground rounded-r-lg" />
      </div>
    </div>
  );
};

export default ChallengeDetailsSkeleton;
