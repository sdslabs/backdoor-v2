import { Skeleton } from '@/components/ui/skeleton';

const TableRowSkeleton = () => (
  <tr className="border-b border-border/40">
    <td className="py-4 px-4">
      <Skeleton className="h-4 w-4 rounded-full" />
    </td>
    <td className="py-4 px-4">
      <Skeleton className="h-4 w-24" />
    </td>
    <td className="py-4 px-4">
      <Skeleton className="h-4 w-16" />
    </td>
    <td className="py-4 px-4">
      <Skeleton className="h-4 w-12" />
    </td>
    <td className="py-4 px-4">
      <Skeleton className="h-4 w-20" />
    </td>
  </tr>
);

export const SubmissionTableSkeleton = () => {
  return (
    <div className="bg-accent rounded-2xl p-6 sm:p-8">
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/40">
              <th className="py-4 px-4 text-left text-sm font-medium text-muted-foreground">
                <Skeleton className="h-4 w-4" />
              </th>
              <th className="py-4 px-4 text-left text-sm font-medium text-muted-foreground">
                <Skeleton className="h-4 w-24" />
              </th>
              <th className="py-4 px-4 text-left text-sm font-medium text-muted-foreground">
                <Skeleton className="h-4 w-16" />
              </th>
              <th className="py-4 px-4 text-left text-sm font-medium text-muted-foreground">
                <Skeleton className="h-4 w-12" />
              </th>
              <th className="py-4 px-4 text-left text-sm font-medium text-muted-foreground">
                <Skeleton className="h-4 w-20" />
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }).map((_, index) => (
              <TableRowSkeleton key={index} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-6">
        <Skeleton className="h-4 w-32" />
        <div className="flex items-center gap-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-8 w-8" />
          ))}
        </div>
      </div>
    </div>
  );
};
