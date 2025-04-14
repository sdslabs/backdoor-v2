'use client';
import { useState } from 'react';
import SolveHistoryComponent from './solve-history';
import PointsTimeGraph from './points-time-graph';

interface YearlyActivityProps {
  username?: string;
}

function YearlyActivity({ username }: YearlyActivityProps) {
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );
  return (
    <div>
      <div className="my-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-semibold">Yearly activity:</h2>
          <select
            className="bg-background text-foreground border border-secondary rounded px-2 py-1"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            {Array.from({ length: new Date().getFullYear() - 2019 }, (_, i) => (
              <option
                key={new Date().getFullYear() - i}
                value={String(new Date().getFullYear() - i)}
              >
                {new Date().getFullYear() - i}
              </option>
            ))}
          </select>
        </div>
        {/* Space for Github Activity Component */}
        {/* <div className="border border-secondary rounded-lg p-4"></div> */}
      </div>
      {/* Solve history */}
      <SolveHistoryComponent username={username} />

      {/* Points history graph */}
      <PointsTimeGraph username={username} />
    </div>
  );
}

export default YearlyActivity;
