export interface CustomersSearchFiltersProps {
  searchTerm: string;
  cityFilter: string;
  cities: string[];
  onSearchChange: (value: string) => void;
  onCityFilterChange: (value: string) => void;
}
