// type
import { OrdersPaginationProps } from '@/components/Orders/Pagination/type';
// components
import { Button } from '@/components/ui/button';

export const OrdersPagination = ({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onPageChange,
}: OrdersPaginationProps) => {
  if (totalPages <= 1) {
    return null;
  }

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex items-center justify-between mt-4">
      <div className="text-sm text-gray-600">
        Showing {startItem} to {endItem} of {totalItems} orders
      </div>
      <div className="flex gap-2">
        <Button
          disabled={currentPage === 1}
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          variant="outline"
        >
          Previous
        </Button>
        <div className="flex gap-1">
          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i + 1}
              onClick={() => onPageChange(i + 1)}
              size="sm"
              variant={currentPage === i + 1 ? 'default' : 'outline'}
            >
              {i + 1}
            </Button>
          ))}
        </div>
        <Button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          variant="outline"
        >
          Next
        </Button>
      </div>
    </div>
  );
};
