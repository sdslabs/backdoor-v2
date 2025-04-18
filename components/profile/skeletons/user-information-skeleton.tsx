import { Skeleton } from '@/components/ui/skeleton';

function UserInformationSkeleton() {
  return (
    <div className="flex items-start mb-8 my-4 bg-accent rounded-lg p-4">
      <div className="mr-7 mt-2">
        <Skeleton className="h-20 w-20 rounded-full" />
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center">
              <Skeleton className="mr-4 h-10 w-60 my-2" />
              <Skeleton className="h-15 w-15 rounded-full" />
            </div>
            <Skeleton className="h-6 w-32 my-3" />
            <div className="text-base font-semibold text-secondary-text">
              <Skeleton className="h-4 w-50 my-2 rounded-sm" />
              <Skeleton className="h-4 w-50 my-2 rounded-sm" />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-highlight my-2">
                <Skeleton className="h-10 w-10 rounded-md" />
              </div>
              <div className="text-xl text-secondary-text font-semibold my-2">
                <Skeleton className="h-4 w-10 rounded-sm" />
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold my-2">
                <Skeleton className="h-10 w-10 rounded-md" />
              </div>
              <div className="text-xl text-secondary-text font-semibold my-2">
                <Skeleton className="h-4 w-10 rounded-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInformationSkeleton;
