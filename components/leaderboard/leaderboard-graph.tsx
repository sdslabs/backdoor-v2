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
import { leaderboardGraphData } from '@/lib/data/leaderboard-graph';

// Utility functions
const flattenHourlyData = () => {
  const allHoursSet = new Set<string>();
  const playerMap: { [key: string]: { [hour: string]: number } } = {};

  leaderboardGraphData.forEach((entry) => {
    const progressMap: { [hour: string]: number } = {};
    let lastPoints = 0;

    entry.hourlyProgress.forEach((progress) => {
      allHoursSet.add(progress.hour);
      lastPoints = progress.points;
      progressMap[progress.hour] = progress.points;
    });

    playerMap[entry.playerId] = progressMap;
  });

  const allHours = Array.from(allHoursSet).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  const result: any[] = [];
  const playerIds = leaderboardGraphData.map((entry) => entry.playerId);
  const lastSeenPoints: { [playerId: string]: number } = {};

  allHours.forEach((hour) => {
    const entry: any = { hour };
    playerIds.forEach((id) => {
      const currentPoints = playerMap[id][hour];
      if (currentPoints !== undefined) {
        entry[id] = currentPoints;
        lastSeenPoints[id] = currentPoints;
      } else {
        entry[id] = lastSeenPoints[id] ?? 0;
      }
    });
    result.push(entry);
  });

  return result;
};

const formatHour = (iso: string) => {
  const date = new Date(iso);
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
};

export default function LeaderboardGraph() {
  const data = flattenHourlyData();

  return (
    <div className="bg-secondary rounded-2xl mt-12 p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-center mb-6">
        Top 10 Players Over Time
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="hour"
            tickFormatter={formatHour}
            label={{ value: 'Hour', position: 'insideBottomRight', offset: -5 }}
          />
          <YAxis />
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload || !payload.length) return null;

              return (
                <div className="bg-black/80 backdrop-blur-md rounded-lg px-4 py-3 border border-gray-700 shadow-md">
                  {payload.map((entry, index) => (
                    <div key={index} className="text-gray-200 text-sm">
                      <span
                        className="inline-block w-2 h-2 rounded-full mr-2"
                        style={{ backgroundColor: entry.color }}
                      ></span>
                      {entry.name}:{' '}
                      <span className="text-highlight font-semibold">
                        {entry.value}
                      </span>
                    </div>
                  ))}
                </div>
              );
            }}
          />
          <Legend />
          {leaderboardGraphData.map((entry) => (
            <Line
              key={entry.playerId}
              type="monotone"
              dataKey={entry.playerId}
              stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
