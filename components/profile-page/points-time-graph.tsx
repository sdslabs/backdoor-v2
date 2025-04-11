'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { fetchPointsOverTime } from '@/lib/data/profile';
import { PointsOverTime } from '@/lib/types/profile';
import { useEffect, useState } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import PointsTimeGraphSkeleton from './skeletons/points-time-graph-skeleton';

const chartConfig = {
  points: {
    label: 'Points',
    color: 'var(--primary)',
  },
} satisfies ChartConfig;

function PointsTimeGraph() {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<PointsOverTime[]>([]);

  useEffect(() => {
    setLoading(true);
    fetchPointsOverTime()
      .then((data) => {
        setChartData(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <PointsTimeGraphSkeleton />;
  }

  return (
    <Card className="my-4">
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) =>
                value.toLocaleDateString('en-US', { month: 'short' })
              }
            />
            <YAxis />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillPoints" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="1%"
                  stopColor="var(--primary)"
                  stopOpacity={0.9}
                />
                <stop offset="80%" stopColor="var(--primary)" stopOpacity={0} />
              </linearGradient>
            </defs>

            <Area
              dataKey="points"
              type="linear"
              fill="url(#fillPoints)"
              fillOpacity={0.4}
              stroke="var(--primary)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default PointsTimeGraph;
