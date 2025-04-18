import { CTFParticipation } from '@/lib/types/profile';

import { SolveHistory } from '@/lib/types/profile';

interface ChallengeDetails {
  id: string;
  name: string;
  type: 'challenge' | 'ctf';
  time?: string;
  points: number;
  timestamp: string;
  timeTaken?: string;
  flagsSubmitted?: number;
  position?: number;
  category: string;
}

interface DateGroup {
  date: string;
  solves: ChallengeDetails[];
}

interface MonthGroup {
  month: string;
  dates: DateGroup[];
}

interface CTFItem {
  id: string;
  challengeId: string;
  challengeName: string;
  points: number;
  solvedAt: Date;
  category: string;
  type: 'ctf';
  flagsSubmitted: number;
  position: number;
}

type CombinedItem = SolveHistory | CTFItem;

function isCTFItem(item: CombinedItem): item is CTFItem {
  return 'type' in item && item.type === 'ctf';
}

export function transformData(
  solves: SolveHistory[],
  ctfs: CTFParticipation[]
): MonthGroup[] {
  // Group by month and date
  const combinedData: CombinedItem[] = [
    ...solves,
    ...ctfs.map((ctf) => ({
      id: ctf.id,
      challengeId: ctf.id,
      challengeName: ctf.name,
      points: ctf.points,
      solvedAt: ctf.timestampStart,
      category: 'ctf',
      type: 'ctf' as const,
      flagsSubmitted: ctf.flagsSubmitted,
      position: ctf.position,
    })),
  ];

  const groupedByMonth = combinedData.reduce(
    (acc, item) => {
      const date = new Date(item.solvedAt);
      const monthKey = date.toLocaleString('default', {
        month: 'long',
        year: 'numeric',
      });
      const dateKey = date.toLocaleString('default', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });

      if (!acc[monthKey]) {
        acc[monthKey] = {};
      }

      if (!acc[monthKey][dateKey]) {
        acc[monthKey][dateKey] = [];
      }

      const isCTF = isCTFItem(item);
      acc[monthKey][dateKey].push({
        id: item.id,
        name: item.challengeName,
        type: isCTF ? 'ctf' : 'challenge',
        points: item.points,
        timestamp: isCTF
          ? `${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })} - ${new Date(ctfs.find((ctf) => ctf.id === item.id)?.timestampEnd || date).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`
          : date.toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
            }),
        flagsSubmitted: isCTF ? item.flagsSubmitted : undefined,
        position: isCTF ? item.position : undefined,
        category: item.category,
      });

      return acc;
    },
    {} as Record<string, Record<string, ChallengeDetails[]>>
  );

  // Convert to the required format and sort
  const result = Object.entries(groupedByMonth).map(([month, dates]) => ({
    month,
    dates: Object.entries(dates).map(([date, solves]) => ({
      date,
      solves,
    })),
  }));

  // Sort months in descending order (newest first)
  result.sort((a, b) => {
    const dateA = new Date(a.month);
    const dateB = new Date(b.month);
    return dateB.getTime() - dateA.getTime();
  });

  // Sort dates within each month in descending order (newest first)
  result.forEach((monthGroup) => {
    monthGroup.dates.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
  });

  return result;
}
