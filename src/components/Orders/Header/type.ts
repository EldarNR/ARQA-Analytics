// type
import { SortDirection, SortField } from '@/providers/type';

export interface OrdersTableHeaderProps {
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}
