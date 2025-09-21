// type
import type { Order, OrderTimelineProps } from '@/components/Customers/TimeLine/type';
// libraries
import { format } from 'date-fns';

export const OrderTimeline = ({ orders }: OrderTimelineProps) => {
  if (orders.length <= 1) {
    return null;
  }

  return (
    <div className="mt-6 pt-4 border-t">
      <h4 className="font-semibold mb-3 text-sm text-gray-600">Order Timeline</h4>
      <div className="space-y-2">
        {orders.slice(0, 5).map((order: Order) => (
          <div className="flex items-center gap-3 text-sm" key={order.id}>
            <div className="w-2 h-2 bg-blue-400 rounded-full" />
            <span className="text-gray-500">{format(new Date(order.date), 'MMM dd')}</span>
            <span className="font-medium">{order.id}</span>
            <span className="text-gray-500">•</span>
            <span className="text-green-600 font-medium">
              {new Intl.NumberFormat('kk-KZ', {
                style: 'currency',
                currency: 'KZT',
                notation: 'compact',
                maximumFractionDigits: 0,
              }).format(order.total)}
            </span>
          </div>
        ))}
        {orders.length > 5 && (
          <div className="text-xs text-gray-500 pl-5">... and {orders.length - 5} more orders</div>
        )}
      </div>
    </div>
  );
};
