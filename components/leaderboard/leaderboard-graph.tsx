'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

import { useSuspenseQuery } from '@tanstack/react-query';
import { leaderboardGraphQuery } from '@/lib/api/leaderboard/client-queries';
import { MOCK_LEADERBOARD_GRAPH_DATA } from '@/lib/api/leaderboard/mock-data';

interface FlattenedGraphEntry {
  hour: string;
  [playerId: string]: string | number;
}

const flattenHourlyData = (
  graphData: typeof MOCK_LEADERBOARD_GRAPH_DATA
): FlattenedGraphEntry[] => {
  const allHoursSet = new Set<string>();

  const playerMap = new Map<string, Map<string, number>>();

  graphData.forEach((entry) => {
    const progressMap = new Map<string, number>();

    entry.hourlyProgress.forEach((progress) => {
      allHoursSet.add(progress.hour);
      progressMap.set(progress.hour, progress.points);
    });

    playerMap.set(entry.playerId, progressMap);
  });

  const allHours = Array.from(allHoursSet).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  const result: FlattenedGraphEntry[] = [];
  const playerIds = graphData.map((entry) => entry.playerId);
  const lastSeenPoints = new Map<string, number>();

  allHours.forEach((hour) => {
    const entry: FlattenedGraphEntry = { hour };
    playerIds.forEach((id) => {
      const playerProgress = playerMap.get(id);
      const currentPoints = playerProgress?.get(hour);
      if (currentPoints !== undefined) {
        entry[id] = currentPoints;
        lastSeenPoints.set(id, currentPoints);
      } else {
        entry[id] = lastSeenPoints.get(id) ?? 0;
      }
    });
    result.push(entry);
  });

  return result;
};

const formatHour = (iso: string) => {
  const date = new Date(iso);
  return `${date.getHours().toString().padStart(2, '0')}:${date
    .getMinutes()
    .toString()
    .padStart(2, '0')}`;
};

// Pre-generate colors for each player
const playerColors = (graphData: typeof MOCK_LEADERBOARD_GRAPH_DATA) =>
  graphData.map((_, index) => {
    const hue = (index * 360) / graphData.length;
    const saturation = 85;
    const lightness = 60;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  });

export const LeaderboardGraph = () => {
  const { data: graphData } = useSuspenseQuery(leaderboardGraphQuery());
  const data = flattenHourlyData(graphData);

  return (
    <div className="bg-accent rounded-lg mt-12 p-5 sm:p-8">
      <h2 className="text-2xl font-bold text-center mb-6">
        Top 10 Players Over Time
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="hour"
            tickFormatter={formatHour}
            label={{
              value: 'Hour',
              position: 'insideBottomRight',
              offset: -5,
            }}
          />
          <YAxis />
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload || !payload.length) return null;

              return (
                <div className="bg-popover backdrop-blur-md rounded-lg px-4 py-3 border border-border shadow-md">
                  {payload.map((entry, index) => (
                    <div key={index} className="text-muted-foreground text-sm">
                      <span
                        className="inline-block w-2 h-2 rounded-full mr-2"
                        style={{ backgroundColor: entry.color }}
                      ></span>
                      {entry.name}:{' '}
                      <span className="text-primary font-semibold">
                        {entry.value}
                      </span>
                    </div>
                  ))}
                </div>
              );
            }}
          />
          <Legend />
          {graphData.map((entry, index) => (
            <Line
              key={entry.playerId}
              type="monotone"
              dataKey={entry.playerId}
              stroke={playerColors(graphData)[index]}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
