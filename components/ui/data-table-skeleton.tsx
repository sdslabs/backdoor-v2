import React from 'react';
import { Skeleton } from './skeleton';

const DataTableSkeleton = ({
  rows = 10,
  pagination = false,
}: {
  rows?: number;
  pagination?: boolean;
}) => {
  return (
    <div className="bg-accent/50 rounded-lg">
      <Skeleton className="h-10 w-full bg-accent rounded-b-none" />
      <div className="py-4 px-3">
        {Array.from({ length: rows }).map((_, index) => (
          <div key={index} className="flex gap-4 my-3">
            <Skeleton className="h-8 w-1/3 bg-secondary" />
            <Skeleton className="h-8 w-1/3 bg-secondary" />
            <Skeleton className="h-8 w-1/3 bg-secondary" />
          </div>
        ))}
      </div>
      {pagination && (
        <div className="flex items-center justify-center gap-2 w-full py-4">
          <Skeleton className="size-8 bg-secondary" />
          <Skeleton className="h-8 w-24 bg-secondary" />
          <Skeleton className="size-8 bg-secondary" />
        </div>
      )}
    </div>
  );
};

export { DataTableSkeleton };
