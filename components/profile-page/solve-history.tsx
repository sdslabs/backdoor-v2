'use client';

import { CheckCircle, Shield } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { fetchCTFParticipation, fetchSolveHistory } from '@/lib/data/profile';
import type { CTFParticipation, SolveHistory } from '@/lib/types/profile';
import { useEffect, useState } from 'react';
import SolveHistorySkeleton from './skeletons/solve-history-skeleton';

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

function transformData(
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

  // Convert to the required format
  return Object.entries(groupedByMonth).map(([month, dates]) => ({
    month,
    dates: Object.entries(dates).map(([date, solves]) => ({
      date,
      solves,
    })),
  }));
}

function SolveHistoryComponent() {
  const [loading, setLoading] = useState(true);
  const [solveHistory, setSolveHistory] = useState<MonthGroup[]>([]);

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchSolveHistory(), fetchCTFParticipation()])
      .then(([solves, ctfs]) => {
        const transformedData = transformData(solves, ctfs);
        setSolveHistory(transformedData);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <SolveHistorySkeleton />;
  }

  return (
    <div className="border border-secondary rounded-lg px-3 text-base my-4">
      <Accordion type="single" collapsible className="w-full h-full">
        <AccordionItem value="history" className="border-b-0">
          <AccordionTrigger className="text-base hover:no-underline font-bold">
            Show solve history
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-0 text-base">
            {solveHistory.map((monthGroup) => (
              <Accordion
                key={monthGroup.month}
                type="single"
                collapsible
                defaultValue={monthGroup.month}
                className="mb-2"
              >
                <AccordionItem value={monthGroup.month} className="border-b-0">
                  <AccordionTrigger className="py-2 hover:no-underline">
                    <div className="flex justify-between items-center w-full text-base">
                      <span className="font-semibold">{monthGroup.month}</span>
                      <span className="mr-4 font-bold">
                        {monthGroup.dates.reduce(
                          (total, date) => total + date.solves.length,
                          0
                        )}{' '}
                        solves
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-8 pt-0">
                    {monthGroup.dates.map((dateGroup) => (
                      <Accordion
                        key={dateGroup.date}
                        type="single"
                        collapsible
                        defaultValue={dateGroup.date}
                        className="mb-2"
                      >
                        <AccordionItem
                          value={dateGroup.date}
                          className="border-b-0"
                        >
                          <AccordionTrigger className="py-2 text-base hover:no-underline">
                            <div className="flex justify-between items-center w-full">
                              <span className="font-semibold">
                                {dateGroup.date}
                              </span>
                              <span className="mr-4 font-bold">
                                {dateGroup.solves.length} solves
                              </span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pl-8 pt-0">
                            {dateGroup.solves.map((challenge) => (
                              <Accordion
                                key={challenge.id}
                                type="single"
                                collapsible
                                className="mb-2"
                              >
                                <AccordionItem
                                  value={challenge.id}
                                  className="border-b-0"
                                >
                                  <AccordionTrigger className="py-2 hover:no-underline">
                                    <div className="flex justify-between items-center w-full">
                                      <div className="flex items-center text-primary text-xl font-bold">
                                        {challenge.type === 'challenge' ? (
                                          <CheckCircle
                                            size={24}
                                            className="mr-2 text-muted-foreground"
                                          />
                                        ) : (
                                          <Shield
                                            size={24}
                                            className="mr-2 text-muted-foreground"
                                          />
                                        )}
                                        <span className="">
                                          {challenge.name}
                                        </span>
                                      </div>
                                      <span className="text-muted-foreground text-base font-bold">
                                        {challenge.timestamp}
                                      </span>
                                    </div>
                                  </AccordionTrigger>
                                  <AccordionContent className="pl-8 py-2 text-base font-semibold text-primary-text">
                                    {challenge.timeTaken && (
                                      <div className="flex flex-row gap-4 mb-1">
                                        <span>Time taken :</span>
                                        <span className="font-bold">
                                          {challenge.timeTaken}
                                        </span>
                                      </div>
                                    )}
                                    {challenge.flagsSubmitted !== undefined && (
                                      <div className="flex flex-row gap-4 mb-1">
                                        <span>Flags submitted (team) :</span>
                                        <span className="font-bold">
                                          {challenge.flagsSubmitted}
                                        </span>
                                      </div>
                                    )}
                                    <div className="flex flex-row gap-4 mb-1">
                                      <span>Points gained :</span>
                                      <span className="font-bold">
                                        {challenge.points}
                                      </span>
                                    </div>
                                    {challenge.position !== undefined && (
                                      <div className="flex flex-row gap-4 mb-1">
                                        <span>Position secured :</span>
                                        <span className="font-bold">
                                          {challenge.position}
                                        </span>
                                      </div>
                                    )}
                                  </AccordionContent>
                                </AccordionItem>
                              </Accordion>
                            ))}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default SolveHistoryComponent;
