'use client';

// libraries
import { Suspense, useMemo, useState } from 'react';
// hooks
import { useExportCSV } from '@/hooks/useExportCSV';
import { useOrders } from '@/hooks/useOrders';

import DashboardFilters from '@/components/DashBoard/Filter';
// type
import type { DashboardFilters as FiltersType } from '@/components/DashBoard/Filter/type';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
// icons
import { DownloadIcon } from 'lucide-react';
// components - динамический импорт тяжелых компонентов
import dynamic from 'next/dynamic';

// Динамический импорт тяжелых компонентов
const DashboardChart = dynamic(() => import('@/components/DashBoard/Chart'), {
  loading: () => (
    <CardContent className="pt-6">
      <Skeleton className="h-64 w-full" />
    </CardContent>
  ),
  ssr: false,
});

const DashboardMetrics = dynamic(() => import('@/components/DashBoard/Metrics'), {
  loading: () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <Card key={i}>
          <CardContent className="pt-6">
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-8 w-32" />
          </CardContent>
        </Card>
      ))}
    </div>
  ),
  ssr: false,
});

// Опционально: динамический импорт фильтров если они тяжелые
// const DashboardFilters = dynamic(() => import('@/components/DashBoard/Filter'), {
//   loading: () => <Skeleton className="h-10 w-32" />,
//   ssr: false
// });

const Dashboard = () => {
  const { data: orders, isLoading, error } = useOrders();
  const { exportToCSV } = useExportCSV();

  const [filters, setFilters] = useState<FiltersType>({
    period: '30d',
    channel: 'all',
    city: 'all',
  });

  const filteredOrders = useMemo(() => {
    if (!orders) {
      return [];
    }

    let filtered = orders;

    if (filters.channel !== 'all') {
      filtered = filtered.filter((order) => order.channel === filters.channel);
    }

    if (filters.city !== 'all') {
      filtered = filtered.filter((order) => order.city === filters.city);
    }

    const now = new Date();
    let fromDate = new Date();

    switch (filters.period) {
      case '7d':
        fromDate.setDate(now.getDate() - 7);
        break;

      case '30d':
        fromDate.setDate(now.getDate() - 30);
        break;

      case 'qtd':
        const currentQuarter = Math.floor((now.getMonth() + 3) / 3);

        fromDate = new Date(now.getFullYear(), (currentQuarter - 1) * 3, 1);
        break;

      case 'ytd':
        fromDate = new Date(now.getFullYear(), 0, 1);
        break;

      case 'custom':
        if (filters.dateFrom) {
          fromDate = filters.dateFrom;
        }
        break;
    }

    const toDate = filters.period === 'custom' && filters.dateTo ? filters.dateTo : now;

    filtered = filtered.filter((order: { date: string | number | Date }) => {
      const orderDate = new Date(order.date);

      return orderDate >= fromDate && orderDate <= toDate;
    });

    return filtered;
  }, [orders, filters]);

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-red-600">
              <p className="text-lg font-semibold mb-2">Failed to load dashboard data</p>
              <p className="text-sm text-gray-600">Please try refreshing the page</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-32" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-8 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardContent className="pt-6">
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex gap-2">
          <DashboardFilters filters={filters} onFiltersChange={setFilters} />
        </div>
      </div>

      <div className="space-y-6">
        <Suspense
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="pt-6">
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-8 w-32" />
                  </CardContent>
                </Card>
              ))}
            </div>
          }
        >
          <DashboardMetrics filters={filters} orders={filteredOrders} />
        </Suspense>

        <Card>
          <Suspense
            fallback={
              <CardContent className="pt-6">
                <Skeleton className="h-64 w-full" />
              </CardContent>
            }
          >
            <DashboardChart orders={filteredOrders} />
          </Suspense>
        </Card>

        <div className="flex justify-end">
          <Button
            className="gap-2"
            onClick={() =>
              exportToCSV(
                filteredOrders,
                `dashboard-export-${new Date().toISOString().split('T')[0]}.csv`,
              )
            }
          >
            <DownloadIcon className="h-4 w-4" />
            Export CSV ({filteredOrders.length} orders)
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
