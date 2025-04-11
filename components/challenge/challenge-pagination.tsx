'use client';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@/components/ui/pagination';
import { useChallengeParams } from '@/hooks/use-challenge-params';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const ChallengePagination: React.FC<{ totalPages: number }> = ({
  totalPages,
}) => {
  const { page, updatePage } = useChallengeParams();
  return (
    <Pagination className="my-6">
      <PaginationContent>
        <PaginationItem className="mr-1">
          <Button
            size={'icon'}
            variant={'ghost'}
            disabled={page === 1}
            onClick={() => updatePage(page > 1 ? page - 1 : 1)}
          >
            <ChevronLeft />
          </Button>
        </PaginationItem>
        {[...Array(totalPages)].map((_, index) => {
          return (
            <PaginationItem key={index}>
              <Button
                size={'icon'}
                variant={page === index + 1 ? 'default' : 'ghost'}
                onClick={() => updatePage(index + 1)}
              >
                {index + 1}
              </Button>
            </PaginationItem>
          );
        })}
        <PaginationItem className="ml-1">
          <Button
            size={'icon'}
            variant={'ghost'}
            disabled={page === totalPages}
            onClick={() =>
              updatePage(page < totalPages ? page + 1 : totalPages)
            }
          >
            <ChevronRight />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
