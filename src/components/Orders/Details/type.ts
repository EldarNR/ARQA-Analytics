// types
import type { Customer, Order } from '@/providers/type';

export interface OrderDetailsDialogProps {
  order: Order | null;
  customer?: Customer;
  onClose: () => void;
}
