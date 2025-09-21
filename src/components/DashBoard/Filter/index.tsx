'use client';
// libraries
import { useState } from 'react';
// config
import { CHANNELS, CITIES, PERIOD_PRESETS } from '@/components/DashBoard/Filter/config';

// type
import type { DashboardFilters, DashboardFiltersProps } from '@/components/DashBoard/Filter/type';
// components
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { format } from 'date-fns';
import { CalendarIcon, FilterIcon } from 'lucide-react';

const DashboardFilters = ({ filters, onFiltersChange }: DashboardFiltersProps) => {
  const [tempFilters, setTempFilters] = useState<DashboardFilters>(filters);
  const [isOpen, setIsOpen] = useState(false);

  const handleApplyFilters = () => {
    onFiltersChange(tempFilters);
    setIsOpen(false);
  };

  const handleResetFilters = () => {
    const resetFilters: DashboardFilters = {
      period: '30d',
      channel: 'all',
      city: 'all',
    };

    setTempFilters(resetFilters);
    onFiltersChange(resetFilters);
    setIsOpen(false);
  };

  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger asChild>
        <Button className="gap-2" variant="outline">
          <FilterIcon className="h-4 w-4" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Dashboard Filters</SheetTitle>
          <SheetDescription>Configure filters for your dashboard data</SheetDescription>
        </SheetHeader>

        <div className="space-y-6 mt-6 ml-4">
          <div className="space-y-2">
            <Label htmlFor="period">Period</Label>
            <Select
              onValueChange={(value) => setTempFilters((prev) => ({ ...prev, period: value }))}
              value={tempFilters.period}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                {PERIOD_PRESETS.map((preset) => (
                  <SelectItem key={preset.value} value={preset.value}>
                    {preset.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {tempFilters.period === 'custom' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Date From</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button className="w-full justify-start" variant="outline">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {tempFilters.dateFrom ? format(tempFilters.dateFrom, 'PPP') : 'Pick a date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      onSelect={(date) =>
                        setTempFilters((prev) => {
                          return { ...prev, dateFrom: date };
                        })
                      }
                      selected={tempFilters.dateFrom}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Date To</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button className="w-full justify-start" variant="outline">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {tempFilters.dateTo ? format(tempFilters.dateTo, 'PPP') : 'Pick a date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      initialFocus
                      mode="single"
                      onSelect={(date) => setTempFilters((prev) => ({ ...prev, dateTo: date }))}
                      selected={tempFilters.dateTo}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="channel">Channel</Label>
            <Select
              onValueChange={(value) => setTempFilters((prev) => ({ ...prev, channel: value }))}
              value={tempFilters.channel}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select channel" />
              </SelectTrigger>
              <SelectContent>
                {CHANNELS.map((channel) => (
                  <SelectItem key={channel.value} value={channel.value}>
                    {channel.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Select
              onValueChange={(value) => setTempFilters((prev) => ({ ...prev, city: value }))}
              value={tempFilters.city}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                {CITIES.map((city) => (
                  <SelectItem key={city.value} value={city.value}>
                    {city.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex mt-8 ml-2 gap-5">
          <Button className="flex-1" onClick={handleApplyFilters}>
            Apply Filters
          </Button>
          <Button onClick={handleResetFilters} variant="outline">
            Reset
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default DashboardFilters;
