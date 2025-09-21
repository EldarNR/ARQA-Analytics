// type
import { OrderDetailsDialogProps } from '@/components/Orders/Details/type';
// components
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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

export const OrderDetailsDialog = ({ order, customer, onClose }: OrderDetailsDialogProps) => {
  return (
    <Dialog onOpenChange={() => onClose()} open={!!order}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Order Details - {order?.id}</DialogTitle>
          <DialogDescription>Complete order information and items</DialogDescription>
        </DialogHeader>

        {order && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Order Information</h4>
                <div className="space-y-1 text-sm">
                  <div>
                    <strong>Date:</strong> {format(new Date(order.date), 'PPP')}
                  </div>
                  <div>
                    <strong>Customer:</strong> {customer?.name || order.customerId}
                  </div>
                  <div>
                    <strong>City:</strong> {order.city}
                  </div>
                  <div>
                    <strong>Channel:</strong> {order.channel}
                  </div>
                  <div>
                    <strong>Status:</strong>
                    <Badge className="ml-2" variant={getStatusBadgeVariant(order.status)}>
                      {order.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Total</h4>
                <div className="text-2xl font-bold text-green-600">
                  {new Intl.NumberFormat('kk-KZ', {
                    style: 'currency',
                    currency: 'KZT',
                    minimumFractionDigits: 0,
                  }).format(order.total)}
                </div>
                {order.comment && (
                  <div className="mt-4">
                    <h4 className="font-semibold mb-1">Comment</h4>
                    <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">{order.comment}</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Order Items</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>SKU</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead className="text-right">Qty</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.sku}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell className="text-right">{item.qty}</TableCell>
                      <TableCell className="text-right">
                        {new Intl.NumberFormat('kk-KZ', {
                          style: 'currency',
                          currency: 'KZT',
                          minimumFractionDigits: 0,
                        }).format(item.price)}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {new Intl.NumberFormat('kk-KZ', {
                          style: 'currency',
                          currency: 'KZT',
                          minimumFractionDigits: 0,
                        }).format(item.price * item.qty)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
