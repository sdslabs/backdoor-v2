'use client';

import { useState } from 'react';

function YearlyActivityHeader() {
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );
  return (
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
  );
}

export default YearlyActivityHeader;
