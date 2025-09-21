// type
import type { Customer, Order } from '@/providers/type';

export interface OrdersTableRowProps {
  order: Order;
  customer?: Customer;
  onOrderClick: (order: Order) => void;
  onStatusChange: (orderId: string, newStatus: string) => void;
  isUpdating?: boolean;
}
