// type
import type { OrdersTableRowProps } from '@/components/Orders/TabelRow/type';
// components
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TableCell, TableRow } from '@/components/ui/table';
// helpers
import { getStatusBadgeVariant } from '@/helpers/getStatusBadgeVariant';
import { format } from 'date-fns';
// icons
import { EyeIcon, Loader2, MoreHorizontalIcon } from 'lucide-react';

export const OrdersTableRow = ({
  order,
  customer,
  onOrderClick,
  onStatusChange,
  isUpdating = false,
}: OrdersTableRowProps) => {
  return (
    <TableRow
      className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      onClick={() => onOrderClick(order)}
    >
      <TableCell className="font-medium text-gray-900 dark:text-gray-100">{order.id}</TableCell>

      <TableCell className="text-gray-700 dark:text-gray-300">
        {format(new Date(order.date), 'MMM dd, yyyy')}
      </TableCell>

      <TableCell className="text-gray-700 dark:text-gray-300">
        {customer?.name || order.customerId}
      </TableCell>

      <TableCell className="text-gray-700 dark:text-gray-300">{order.city}</TableCell>

      <TableCell className="text-gray-700 dark:text-gray-300">{order.channel}</TableCell>

      <TableCell>
        <Badge variant={getStatusBadgeVariant(order.status)}>{order.status}</Badge>
      </TableCell>

      <TableCell className="text-right font-medium text-gray-900 dark:text-gray-100">
        {new Intl.NumberFormat('kk-KZ', {
          style: 'currency',
          currency: 'KZT',
          minimumFractionDigits: 0,
        }).format(order.total)}
      </TableCell>

      <TableCell onClick={(e) => e.stopPropagation()}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
              disabled={isUpdating}
              variant="ghost"
            >
              {isUpdating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <MoreHorizontalIcon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
          >
            <DropdownMenuItem
              className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              onClick={() => onOrderClick(order)}
            >
              <EyeIcon className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>

            <DropdownMenuItem
              className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={order.status === 'New' || isUpdating}
              onClick={() => onStatusChange(order.id, 'New')}
            >
              Mark as New
            </DropdownMenuItem>

            <DropdownMenuItem
              className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={order.status === 'Processing' || isUpdating}
              onClick={() => onStatusChange(order.id, 'Processing')}
            >
              Mark as Processing
            </DropdownMenuItem>

            <DropdownMenuItem
              className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={order.status === 'Shipped' || isUpdating}
              onClick={() => onStatusChange(order.id, 'Shipped')}
            >
              Mark as Shipped
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};
