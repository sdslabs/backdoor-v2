import { Button } from '@/components/ui/button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
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
            className="bg-transparent border-none text-gray-400 hover:bg-gray-800 h-10 w-10 p-0"
          >
            {page}
          </Button>
        );
      } else {
        return (
          <Button
            key={index}
            className={`${
              currentPage === page
                ? 'bg-primary text-white'
                : 'bg-transparent text-gray-400'
            } border-none hover:bg-gray-800 h-10 w-10 p-0 rounded-full`}
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
      <div className="bg-black p-2 rounded-lg flex space-x-1">
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          className="bg-transparent border-none text-gray-400 hover:bg-gray-800 h-10 w-10 p-0"
        >
          &lt;
        </Button>
        {renderPagination()}
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          className="bg-transparent border-none text-gray-400 hover:bg-gray-800 h-10 w-10 p-0"
        >
          &gt;
        </Button>
      </div>
    </div>
  );
}
