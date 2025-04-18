'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function PointsTimeGraphSkeleton() {
  return (
    <Card className="my-4">
      <CardContent className="space-y-6 p-6">
        {/* Chart area */}
        <div className="relative h-[300px] w-full">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 flex h-full flex-col justify-between">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-12" />
            ))}
          </div>

          {/* Main chart area with grid lines */}
          <div className="ml-12 h-full space-y-6">
            <div className="absolute left-0 top-0 h-full w-full">
              <div className="relative h-full">
                <div className="absolute left-0 top-0 h-full w-full">
                  <div className="absolute left-0 top-0 h-full w-full">
                    <div className="absolute left-0 top-0 h-full w-full">
                      <Skeleton className="h-full w-full rounded-t-lg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* X-axis labels */}
          <div className="absolute bottom-0 left-12 right-0 flex justify-between">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-10" />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default PointsTimeGraphSkeleton;
