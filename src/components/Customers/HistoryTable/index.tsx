// type
import type { Order, OrderHistoryTableProps } from '@/components/Customers/HistoryTable/type';
// components
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
// helpers
import { getStatusBadgeVariant } from '@/helpers/getStatusBadgeVariant';
import { format } from 'date-fns';

export const OrderHistoryTable = ({ orders }: OrderHistoryTableProps) => {
  return (
    <>
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Channel</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead>Items</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order: Order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{format(new Date(order.date), 'MMM dd, yyyy')}</TableCell>
                <TableCell>{order.channel}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(order.status)}>{order.status}</Badge>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {new Intl.NumberFormat('kk-KZ', {
                    style: 'currency',
                    currency: 'KZT',
                    minimumFractionDigits: 0,
                  }).format(order.total)}
                </TableCell>
                <TableCell>
                  <div className="text-sm text-gray-600">
                    {order.items.length} item{order.items.length > 1 ? 's' : ''}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="md:hidden space-y-3">
        {orders.map((order: Order) => (
          <Card key={order.id}>
            <CardContent className="pt-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-medium">{order.id}</div>
                  <div className="text-sm text-gray-600">
                    {format(new Date(order.date), 'MMM dd, yyyy')}
                  </div>
                </div>
                <Badge variant={getStatusBadgeVariant(order.status)}>{order.status}</Badge>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  {order.channel} • {order.items.length} item
                  {order.items.length > 1 ? 's' : ''}
                </div>
                <div className="font-bold text-green-600">
                  {new Intl.NumberFormat('kk-KZ', {
                    style: 'currency',
                    currency: 'KZT',
                    minimumFractionDigits: 0,
                  }).format(order.total)}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};
