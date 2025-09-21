'use client';

// libraries
import { FC, Suspense, useMemo, useState } from 'react';
// hooks
import { useCustomers } from '@/hooks/useCustomers';
import { useOrders } from '@/hooks/useOrders';
import { useUpdateOrderStatus } from '@/hooks/useUpdateOrderStatus';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody } from '@/components/ui/table';
// type
import type { Customer, Order, SortDirection, SortField } from '@/providers/type';
import dynamic from 'next/dynamic';

const OrdersSearch = dynamic(
  () => import('@/components/Orders/Search').then((mod) => mod.OrdersSearch),
  {
    loading: () => <div className="w-64 h-10 bg-gray-200 rounded-md animate-pulse" />,
    ssr: false,
  },
);

const OrdersTableHeader = dynamic(
  () => import('@/components/Orders/Header').then((mod) => mod.OrdersTableHeader),
  {
    loading: () => (
      <thead>
        <tr>
          {[
'Date',
'Customer',
'City',
'Channel',
'Status',
'Total',
''
].map((header) => (
            <th className="h-12 px-4 text-left align-middle" key={header}>
              <div className="h-4 bg-gray-200 rounded-md animate-pulse w-20" />
            </th>
          ))}
        </tr>
      </thead>
    ),
    ssr: false,
  },
);

const OrdersTableRow = dynamic(
  () => import('@/components/Orders/TabelRow').then((mod) => mod.OrdersTableRow),
  {
    ssr: false,
  },
);

const OrdersPagination = dynamic(
  () => import('@/components/Orders/Pagination').then((mod) => mod.OrdersPagination),
  {
    loading: () => (
      <div className="flex justify-between items-center mt-4">
        <div className="h-6 bg-gray-200 rounded-md animate-pulse w-32" />
        <div className="flex gap-2">
          <div className="h-8 w-8 bg-gray-200 rounded-md animate-pulse" />
          <div className="h-8 w-8 bg-gray-200 rounded-md animate-pulse" />
        </div>
      </div>
    ),
    ssr: false,
  },
);

const OrderDetailsDialog = dynamic(
  () => import('@/components/Orders/Details').then((mod) => mod.OrderDetailsDialog),
  {
    ssr: false,
  },
);

const Orders: FC = () => {
  const { data: orders = [], isLoading: ordersLoading, error } = useOrders();
  const { data: customersData = [], isLoading: customersLoading } = useCustomers();
  const { mutate: updateOrderStatus, isPending: isUpdatingStatus } = useUpdateOrderStatus();

  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const customersMap = useMemo(() => {
    const map = new Map<string, Customer>();

    customersData.forEach((customer: Customer) => {
      map.set(customer.id, customer);
    });

    return map;
  }, [customersData]);

  const filteredAndSortedOrders = useMemo(() => {
    const filtered = orders.filter((order: Order) => {
      const customer = customersMap.get(order.customerId);
      const customerName = customer?.name || order.customerId;

      return (
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.channel.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.status.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    filtered.sort((a: Order, b: Order) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      if (sortField === 'customerId') {
        aValue = customersMap.get(a.customerId)?.name || a.customerId;
        bValue = customersMap.get(b.customerId)?.name || b.customerId;
      }

      if (sortField === 'date') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (sortField === 'total') {
        aValue = Number(aValue);
        bValue = Number(bValue);
      }

      if (aValue < bValue) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortDirection === 'asc' ? 1 : -1;
      }

      return 0;
    });

    return filtered;
  }, [
orders,
searchTerm,
sortField,
sortDirection,
customersMap
]);

  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;

    return filteredAndSortedOrders.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedOrders, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedOrders.length / itemsPerPage);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    updateOrderStatus({ id: orderId, status: newStatus });
  };

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleCloseDialog = () => {
    setSelectedOrder(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (error) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Orders</h1>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-red-600">
              <p className="text-lg font-semibold mb-2">Failed to load orders</p>
              <p className="text-sm text-gray-600">
                {error.message || 'Please try refreshing the page'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isLoading = ordersLoading || customersLoading;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Orders</h1>
        <div className="flex items-center gap-4">
          <Suspense fallback={<div className="w-64 h-10 bg-gray-200 rounded-md animate-pulse" />}>
            <OrdersSearch onSearchChange={handleSearchChange} searchTerm={searchTerm} />
          </Suspense>
          {isUpdatingStatus && (
            <div className="text-sm text-blue-600 flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
              Updating...
            </div>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Orders List ({filteredAndSortedOrders.length} orders)</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div className="h-12 bg-gray-100 animate-pulse rounded" key={i} />
              ))}
            </div>
          ) : (
            <>
              <Table>
                <Suspense
                  fallback={
                    <thead>
                      <tr>
                        {[
'Date',
'Customer',
'City',
'Channel',
'Status',
'Total',
''
].map(
                          (header) => (
                            <th className="h-12 px-4 text-left align-middle" key={header}>
                              <div className="h-4 bg-gray-200 rounded-md animate-pulse w-20" />
                            </th>
                          ),
                        )}
                      </tr>
                    </thead>
                  }
                >
                  <OrdersTableHeader
                    onSort={handleSort}
                    sortDirection={sortDirection}
                    sortField={sortField}
                  />
                </Suspense>

                <TableBody>
                  <Suspense
                    fallback={
                      <>
                        {[...Array(5)].map((_, i) => (
                          <tr className="h-12 bg-gray-100 animate-pulse" key={i}>
                            <td colSpan={7} />
                          </tr>
                        ))}
                      </>
                    }
                  >
                    {paginatedOrders.map((order: Order) => (
                      <OrdersTableRow
                        customer={customersMap.get(order.customerId)}
                        isUpdating={isUpdatingStatus}
                        key={order.id}
                        onOrderClick={handleOrderClick}
                        onStatusChange={handleStatusChange}
                        order={order}
                      />
                    ))}
                  </Suspense>
                </TableBody>
              </Table>

              <Suspense
                fallback={
                  <div className="flex justify-between items-center mt-4">
                    <div className="h-6 bg-gray-200 rounded-md animate-pulse w-32" />
                    <div className="flex gap-2">
                      <div className="h-8 w-8 bg-gray-200 rounded-md animate-pulse" />
                      <div className="h-8 w-8 bg-gray-200 rounded-md animate-pulse" />
                    </div>
                  </div>
                }
              >
                <OrdersPagination
                  currentPage={currentPage}
                  itemsPerPage={itemsPerPage}
                  onPageChange={handlePageChange}
                  totalItems={filteredAndSortedOrders.length}
                  totalPages={totalPages}
                />
              </Suspense>
            </>
          )}
        </CardContent>
      </Card>

      {selectedOrder && (
        <Suspense fallback={null}>
          <OrderDetailsDialog
            customer={customersMap.get(selectedOrder.customerId)}
            onClose={handleCloseDialog}
            order={selectedOrder}
          />
        </Suspense>
      )}
    </div>
  );
};

export default Orders;
