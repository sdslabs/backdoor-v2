'use client';

import { challengeDetailsQuery } from '@/lib/api/challenge';
import { useSuspenseQuery } from '@tanstack/react-query';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

const chartConfig = {
  submissions: {
    label: 'Submissions',
    color: 'var(--primary)',
  },
} satisfies ChartConfig;

const ChallengeSubmissionsStatistics = ({ name }: { name: string }) => {
  const { data: challenge } = useSuspenseQuery(challengeDetailsQuery(name));
  const totalSolves = challenge.solves.length;
  const correctSolves = challenge.solvesNumber;
  const metadata = [
    {
      label: 'Total Solves',
      value: totalSolves,
    },
    {
      label: 'Correct Solves',
      value: correctSolves,
    },
    {
      label: 'Solve Rate (%)',
      value: `${Math.round((correctSolves / totalSolves) * 100)}`,
    },
  ];

  let counter = 0;
  const submissionsChartData = challenge.solves.map((solve) => {
    if (solve.correct) {
      counter++;
    }
    return {
      date: solve.solvedAt,
      submissions: counter,
    };
  });

  return (
    <div className="bg-accent rounded-xl p-4 space-y-4">
      <div className="flex gap-4 w-full">
        {metadata.map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center gap-2 bg-card p-4 rounded-xl basis-1/3 border-b"
          >
            <span className="text-2xl font-display text-center font-medium">
              {item.value}
            </span>
            <span className="text-sm font-medium">{item.label}</span>
          </div>
        ))}
      </div>
      <div className="bg-card rounded-xl py-4 pr-6">
        <ChartContainer config={chartConfig}>
          <AreaChart accessibilityLayer data={submissionsChartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={true}
              tickMargin={8}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'short',
                })
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
              dataKey="submissions"
              type="linear"
              fill="url(#fillPoints)"
              fillOpacity={0.4}
              stroke="var(--primary)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export { ChallengeSubmissionsStatistics };
