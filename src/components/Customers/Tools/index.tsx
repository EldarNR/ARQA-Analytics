// type
import { CustomersSearchFiltersProps } from '@/components/Customers/Tools/type';
// components
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
// icons
import { SearchIcon } from 'lucide-react';

export const CustomersSearchFilters = ({
  searchTerm,
  cityFilter,
  cities,
  onSearchChange,
  onCityFilterChange,
}: CustomersSearchFiltersProps) => {
  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          className="pl-10 w-64"
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search customers..."
          value={searchTerm}
        />
      </div>
      <Select onValueChange={onCityFilterChange} value={cityFilter}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="All Cities" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Cities</SelectItem>
          {cities.map((city) => (
            <SelectItem key={city} value={city}>
              {city}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
