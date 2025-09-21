export interface DashboardFilters {
  period: string;
  channel: string;
  city: string;
  dateFrom?: Date;
  dateTo?: Date;
}

export interface DashboardFiltersProps {
  filters: DashboardFilters;
  onFiltersChange: (filters: DashboardFilters) => void;
}
