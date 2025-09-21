// type
import { CustomerDetailsDialogProps } from '@/components/Customers/DetailModal/type';
// components
import { OrderHistoryTable } from '@/components/Customers/HistoryTable';
import { CustomerContactInfo } from '@/components/Customers/Information';
import { CustomerMetrics } from '@/components/Customers/Metrics';
import { OrderTimeline } from '@/components/Customers/TimeLine';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
// icons
import { ShoppingCartIcon, UserIcon } from 'lucide-react';

export const CustomerDetailsDialog = ({
  customer,
  customerOrders,
  onClose,
}: CustomerDetailsDialogProps) => {
  return (
    <Dialog onOpenChange={() => onClose()} open={!!customer}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserIcon className="h-5 w-5" />
            {customer?.name}
          </DialogTitle>
          <DialogDescription>Customer details and order history</DialogDescription>
        </DialogHeader>

        {customer && (
          <div className="space-y-6">
            {/* Customer Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CustomerContactInfo customer={customer} />
              <CustomerMetrics customer={customer} customerOrders={customerOrders} />
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Order History ({customerOrders.length} orders)
                </CardTitle>
              </CardHeader>
              <CardContent>
                {customerOrders.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <ShoppingCartIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium mb-2">No orders found</p>
                    <p className="text-sm">This customer hasn&#39;t placed any orders yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <OrderHistoryTable orders={customerOrders} />
                    <OrderTimeline orders={customerOrders} />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
