import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Skeleton } from '@/components/ui/skeleton';

function SolveHistorySkeleton() {
  return (
    <div className="border border-secondary rounded-lg px-3 text-base my-4 bg-accent">
      <Accordion type="single" collapsible className="w-full h-full">
        <AccordionItem value="history" className="border-b-0">
          <AccordionTrigger className="text-base hover:no-underline font-bold">
            <Skeleton className="h-5 w-35" />
          </AccordionTrigger>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default SolveHistorySkeleton;
