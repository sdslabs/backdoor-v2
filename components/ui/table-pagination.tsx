'use client';

import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@/components/ui/pagination';
import { Table } from '@tanstack/react-table';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps<TData> {
  table: Table<TData>;
}

export function TablePagination<TData>({ table }: PaginationProps<TData>) {
  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();
  return (
    <Pagination className="my-6">
      <PaginationContent>
        <PaginationItem className="mr-1">
          <Button
            size={'icon'}
            variant={'ghost'}
            disabled={currentPage === 1}
            onClick={() => table.previousPage()}
          >
            <ChevronLeft />
          </Button>
        </PaginationItem>
        {[...Array(totalPages)].map((_, index) => {
          return (
            <PaginationItem key={index}>
              <Button
                size={'icon'}
                variant={currentPage === index + 1 ? 'default' : 'ghost'}
                onClick={() => table.setPageIndex(index)}
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
            disabled={currentPage === totalPages}
            onClick={() => table.nextPage()}
          >
            <ChevronRight />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
