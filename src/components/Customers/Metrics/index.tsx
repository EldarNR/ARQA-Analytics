// type
import { CustomerMetricsProps } from '@/components/Customers/Metrics/type';
// components
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// libraries
import { format } from 'date-fns';
// icons
import { CalendarIcon, DollarSignIcon, ShoppingCartIcon } from 'lucide-react';

export const CustomerMetrics = ({ customer, customerOrders }: CustomerMetricsProps) => {
  const averageOrder =
    customerOrders.length > 0
      ? customerOrders.reduce((sum, order) => sum + order.total, 0) / customerOrders.length
      : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Customer Metrics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <DollarSignIcon className="h-4 w-4 text-green-600" />
            <span className="text-sm text-gray-600">Lifetime Value</span>
          </div>
          <span className="text-lg font-bold text-green-600">
            {new Intl.NumberFormat('kk-KZ', {
              style: 'currency',
              currency: 'KZT',
              minimumFractionDigits: 0,
            }).format(customer.ltv)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShoppingCartIcon className="h-4 w-4 text-blue-600" />
            <span className="text-sm text-gray-600">Total Orders</span>
          </div>
          <span className="text-lg font-bold text-blue-600">{customer.ordersCount}</span>
        </div>

        {customerOrders.length > 0 && (
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-purple-600" />
              <span className="text-sm text-gray-600">Last Order</span>
            </div>
            <span className="text-sm font-medium text-purple-600">
              {format(new Date(customerOrders[0].date), 'MMM dd, yyyy')}
            </span>
          </div>
        )}

        {customerOrders.length > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Average Order</span>
            <span className="text-sm font-medium">
              {new Intl.NumberFormat('kk-KZ', {
                style: 'currency',
                currency: 'KZT',
                minimumFractionDigits: 0,
              }).format(averageOrder)}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
