'use client';

// type
import { type FC, Suspense, useMemo, useState } from 'react';
// hooks
import { useCustomers } from '@/hooks/useCustomers';
import { useOrders } from '@/hooks/useOrders';

import { Card, CardContent } from '@/components/ui/card';
import { Customer, Order } from '@/providers/type';
import dynamic from 'next/dynamic';

const CustomersSearchFilters = dynamic(
  () => import('@/components/Customers/Tools').then((mod) => mod.CustomersSearchFilters),
  {
    loading: () => (
      <div className="flex gap-2">
        <div className="h-10 w-48 bg-gray-200 rounded-md animate-pulse" />
        <div className="h-10 w-32 bg-gray-200 rounded-md animate-pulse" />
      </div>
    ),
    ssr: false,
  },
);

const CustomersGrid = dynamic(
  () => import('@/components/Customers/Grid').then((mod) => mod.CustomersGrid),
  {
    loading: () => (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="h-4 bg-gray-200 rounded-md animate-pulse mb-2 w-3/4" />
              <div className="h-3 bg-gray-200 rounded-md animate-pulse mb-1 w-1/2" />
              <div className="h-3 bg-gray-200 rounded-md animate-pulse w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    ),
    ssr: false,
  },
);

const CustomerDetailsDialog = dynamic(
  () => import('@/components/Customers/DetailModal').then((mod) => mod.CustomerDetailsDialog),
  {
    ssr: false,
  },
);

const CustomersPage: FC = () => {
  const { data: customers = [], isLoading: customersLoading, error } = useCustomers();
  const { data: orders = [] } = useOrders();

  const [searchTerm, setSearchTerm] = useState('');
  const [cityFilter, setCityFilter] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const cities = useMemo(() => {
    const uniqueCities = [...new Set(customers.map((customer: Customer) => customer.city))];

    return uniqueCities.sort();
  }, [customers]);

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer: Customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCity = cityFilter === 'all' || customer.city === cityFilter;

      return matchesSearch && matchesCity;
    });
  }, [
customers,
searchTerm,
cityFilter
]);

  const customerOrders = useMemo(() => {
    if (!selectedCustomer) {
      return [];
    }

    return orders
      .filter((order: Order) => order.customerId === selectedCustomer.id)
      .sort((a: Order, b: Order) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [selectedCustomer, orders]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleCityFilterChange = (value: string) => {
    setCityFilter(value);
  };

  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

  const handleCloseDialog = () => {
    setSelectedCustomer(null);
  };

  if (error) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Customers</h1>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-red-600">
              <p className="text-lg font-semibold mb-2">Failed to load customers</p>
              <p className="text-sm text-gray-600">Please try refreshing the page</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Customers</h1>

        <Suspense
          fallback={
            <div className="flex gap-2">
              <div className="h-10 w-48 bg-gray-200 rounded-md animate-pulse" />
              <div className="h-10 w-32 bg-gray-200 rounded-md animate-pulse" />
            </div>
          }
        >
          <CustomersSearchFilters
            cities={cities}
            cityFilter={cityFilter}
            onCityFilterChange={handleCityFilterChange}
            onSearchChange={handleSearchChange}
            searchTerm={searchTerm}
          />
        </Suspense>
      </div>

      <Suspense
        fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="h-4 bg-gray-200 rounded-md animate-pulse mb-2 w-3/4" />
                  <div className="h-3 bg-gray-200 rounded-md animate-pulse mb-1 w-1/2" />
                  <div className="h-3 bg-gray-200 rounded-md animate-pulse w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        }
      >
        <CustomersGrid
          customers={customers}
          filteredCustomers={filteredCustomers}
          isLoading={customersLoading}
          onSelectCustomer={handleSelectCustomer}
        />
      </Suspense>

      {selectedCustomer && (
        <Suspense fallback={null}>
          <CustomerDetailsDialog
            customer={selectedCustomer}
            customerOrders={customerOrders}
            onClose={handleCloseDialog}
          />
        </Suspense>
      )}
    </div>
  );
};

export default CustomersPage;
