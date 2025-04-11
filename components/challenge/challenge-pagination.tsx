'use client';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useChallengeParams } from '@/hooks/use-challenge-params';

export const ChallengePagination: React.FC<{ totalPages: number }> = ({
  totalPages,
}) => {
  const { page, updatePage } = useChallengeParams();
  return (
    <Pagination className="my-6">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => updatePage(page > 1 ? page - 1 : 1)}
          />
        </PaginationItem>
        {[...Array(totalPages)].map((_, index) => {
          return (
            <PaginationItem key={index}>
              <PaginationLink
                isActive={page === index + 1}
                onClick={() => updatePage(index + 1)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext onClick={() => updatePage(page + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
