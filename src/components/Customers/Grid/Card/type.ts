import { Customer } from '@/providers/type';

export interface CustomerCardProps {
  customer: Customer;
  onSelect: (customer: Customer) => void;
}
