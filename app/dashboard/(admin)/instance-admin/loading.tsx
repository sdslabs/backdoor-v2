import { DataTableSkeleton } from '@/components/ui/data-table-skeleton';

export default function AdminInstancesLoading() {
  return (
    <div className="space-y-6">
      <div>
        <div className="h-9 w-64 bg-muted rounded animate-pulse" />
        <div className="h-5 w-96 bg-muted rounded animate-pulse mt-2" />
      </div>
      <DataTableSkeleton />
    </div>
  );
}
