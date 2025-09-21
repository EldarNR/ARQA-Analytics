// type
import { OrdersTableHeaderProps } from '@/components/Orders/Header/type';
// components
import { TableHead, TableHeader, TableRow } from '@/components/ui/table';
// type
import { SortDirection, SortField } from '@/providers/type';
// icons
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

const SortIcon = ({
  field,
  sortField,
  sortDirection,
}: {
  field: SortField;
  sortField: SortField;
  sortDirection: SortDirection;
}) => {
  if (sortField !== field) {
    return null;
  }

  return sortDirection === 'asc' ? (
    <ChevronUpIcon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
  ) : (
    <ChevronDownIcon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
  );
};

export const OrdersTableHeader = ({ sortField, sortDirection, onSort }: OrdersTableHeaderProps) => {
  return (
    <TableHeader>
      <TableRow className="bg-gray-50 dark:bg-gray-800">
        <TableHead
          className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
          text-gray-900 dark:text-gray-100 font-semibold"
          onClick={() => onSort('id')}
        >
          <div className="flex items-center gap-1">
            Order ID
            <SortIcon field="id" sortDirection={sortDirection} sortField={sortField} />
          </div>
        </TableHead>

        <TableHead
          className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
          text-gray-900 dark:text-gray-100 font-semibold"
          onClick={() => onSort('date')}
        >
          <div className="flex items-center gap-1">
            Date
            <SortIcon field="date" sortDirection={sortDirection} sortField={sortField} />
          </div>
        </TableHead>

        <TableHead
          className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
          text-gray-900 dark:text-gray-100 font-semibold"
          onClick={() => onSort('customerId')}
        >
          <div className="flex items-center gap-1">
            Customer
            <SortIcon field="customerId" sortDirection={sortDirection} sortField={sortField} />
          </div>
        </TableHead>

        <TableHead
          className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
          text-gray-900 dark:text-gray-100 font-semibold"
          onClick={() => onSort('city')}
        >
          <div className="flex items-center gap-1">
            City
            <SortIcon field="city" sortDirection={sortDirection} sortField={sortField} />
          </div>
        </TableHead>

        <TableHead
          className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
          text-gray-900 dark:text-gray-100 font-semibold"
          onClick={() => onSort('channel')}
        >
          <div className="flex items-center gap-1">
            Channel
            <SortIcon field="channel" sortDirection={sortDirection} sortField={sortField} />
          </div>
        </TableHead>

        <TableHead
          className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
          text-gray-900 dark:text-gray-100 font-semibold"
          onClick={() => onSort('status')}
        >
          <div className="flex items-center gap-1">
            Status
            <SortIcon field="status" sortDirection={sortDirection} sortField={sortField} />
          </div>
        </TableHead>

        <TableHead
          className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
          text-gray-900 dark:text-gray-100 font-semibold text-right"
          onClick={() => onSort('total')}
        >
          <div className="flex items-center justify-end gap-1">
            Total
            <SortIcon field="total" sortDirection={sortDirection} sortField={sortField} />
          </div>
        </TableHead>

        <TableHead className="w-[50px] text-gray-900 dark:text-gray-100 font-semibold">
          Actions
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};
