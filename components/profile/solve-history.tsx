'use client';

import { CheckCircle, Shield } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  ctfParticipationQuery,
  solveHistoryQuery,
} from '@/lib/api/profile/client-queries';
import { useSuspenseQuery } from '@tanstack/react-query';
import { transformData } from './util';

interface SolveHistoryComponentProps {
  username?: string;
}

function SolveHistoryComponent({ username }: SolveHistoryComponentProps) {
  const { data: solveHistory } = useSuspenseQuery(solveHistoryQuery(username));
  const { data: ctfParticipation } = useSuspenseQuery(ctfParticipationQuery());

  const combinedSolveHistory = transformData(
    solveHistory || [],
    ctfParticipation || []
  );

  return (
    <div className="border border-secondary rounded-lg px-3 text-base my-4">
      <Accordion type="single" collapsible className="w-full h-full">
        <AccordionItem value="history" className="border-b-0">
          <AccordionTrigger className="text-base hover:no-underline font-bold">
            Show solve history
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-0 text-base">
            {combinedSolveHistory.map((monthGroup) => (
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
                                  <AccordionContent className="pl-8 py-2 text-base font-semibold text-foreground">
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
