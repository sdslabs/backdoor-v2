'use client';

import { Button } from '@/components/ui/button';
import { Table } from '@tanstack/react-table';

interface PaginationProps<TData> {
  table: Table<TData>;
}

export function Pagination<TData>({ table }: PaginationProps<TData>) {
  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();

  const onPageChange = (page: number) => {
    table.setPageIndex(page - 1);
  };

  const renderPagination = () => {
    const pageNumbers: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pageNumbers.push(1, 2, 3, 4, '...');
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(
          1,
          '...',
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pageNumbers.push(
          1,
          '...',
          currentPage - 1,
          currentPage,
          currentPage + 1,
          '...'
        );
      }
    }

    return pageNumbers.map((page, index) => {
      if (page === '...') {
        return (
          <Button
            key={index}
            className="bg-transparent border-none text-muted-foreground hover:bg-muted h-10 w-10 p-0"
            disabled
          >
            ...
          </Button>
        );
      } else {
        return (
          <Button
            key={index}
            className={`${
              currentPage === page
                ? 'bg-primary text-primary-foreground'
                : 'bg-transparent text-muted-foreground'
            } border-none hover:bg-muted h-10 w-10 p-0 rounded-full`}
            onClick={() => onPageChange(Number(page))}
          >
            {page}
          </Button>
        );
      }
    });
  };

  return (
    <div className="flex items-center justify-center py-4">
      <div className="bg-muted p-2 rounded-lg flex space-x-1">
        <Button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="bg-transparent border-none text-muted-foreground hover:bg-muted h-10 w-10 p-0"
        >
          &lt;
        </Button>
        {renderPagination()}
        <Button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="bg-transparent border-none text-muted-foreground hover:bg-muted h-10 w-10 p-0"
        >
          &gt;
        </Button>
      </div>
    </div>
  );
}
