// type
import type { OrdersSearchProps } from '@/components/Orders/Search/type';
// components
import { Input } from '@/components/ui/input';
// icons
import { SearchIcon } from 'lucide-react';

export const OrdersSearch = ({ searchTerm, onSearchChange }: OrdersSearchProps) => {
  return (
    <div className="relative">
      <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
      <Input
        className="pl-10 w-64"
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search orders..."
        value={searchTerm}
      />
    </div>
  );
};
