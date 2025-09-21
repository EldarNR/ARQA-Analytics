// type
import type { Customer } from '@/providers/type';

export interface CustomersGridProps {
  customers: Customer[];
  filteredCustomers: Customer[];
  isLoading: boolean;
  onSelectCustomer: (customer: Customer) => void;
}
