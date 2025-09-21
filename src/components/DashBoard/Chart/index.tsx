'use client';
// libraries
import { useMemo } from 'react';
import { Bar, Line } from 'react-chartjs-2';

// components
import { ChartProps } from '@/components/DashBoard/Chart/type';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { eachDayOfInterval, format, parseISO } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
);

const DashboardChart = ({ orders }: ChartProps) => {
  const chartData = useMemo(() => {
    if (!orders.length) {
      return {
        labels: [],
        revenueData: [],
        ordersData: [],
      };
    }

    const dates = orders
      .map((order) => parseISO(order.date))
      .sort((a, b) => a.getTime() - b.getTime());
    const minDate = dates[0];
    const maxDate = dates[dates.length - 1];

    const dateRange = eachDayOfInterval({ start: minDate, end: maxDate });

    const dailyData = dateRange.map((date) => {
      const dayOrders = orders.filter((order) => {
        const orderDate = parseISO(order.date);

        return format(orderDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
      });

      const revenue = dayOrders.reduce((sum, order) => sum + order.total, 0);
      const ordersCount = dayOrders.length;

      return {
        date: format(date, 'MMM dd'),
        fullDate: format(date, 'yyyy-MM-dd'),
        revenue,
        ordersCount,
      };
    });

    return {
      labels: dailyData.map((item) => item.date),
      revenueData: dailyData.map((item) => item.revenue),
      ordersData: dailyData.map((item) => item.ordersCount),
    };
  }, [orders]);

  const channelData = useMemo(() => {
    const channels = orders.reduce(
      (acc, order) => {
        if (!acc[order.channel]) {
          acc[order.channel] = { revenue: 0, orders: 0 };
        }
        acc[order.channel].revenue += order.total;
        acc[order.channel].orders += 1;

        return acc;
      },
      {} as Record<string, { revenue: number; orders: number }>,
    );

    return {
      labels: Object.keys(channels),
      revenueData: Object.values(channels).map((channel) => channel.revenue),
      ordersData: Object.values(channels).map((channel) => channel.orders),
    };
  }, [orders]);

  const revenueChartData = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Revenue (₸)',
        data: chartData.revenueData,
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 2,
        borderRadius: 4,
      },
    ],
  };

  const ordersChartData = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Orders',
        data: chartData.ordersData,
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 2,
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const channelChartData = {
    labels: channelData.labels,
    datasets: [
      {
        label: 'Revenue by Channel (₸)',
        data: channelData.revenueData,
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(6, 182, 212, 0.8)',
        ],
        borderColor: [
          'rgb(239, 68, 68)',
          'rgb(245, 158, 11)',
          'rgb(139, 92, 246)',
          'rgb(6, 182, 212)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            if (context.dataset.label?.includes('Revenue')) {
              return `${context.dataset.label}: ${new Intl.NumberFormat('kk-KZ', {
                style: 'currency',
                currency: 'KZT',
                minimumFractionDigits: 0,
              }).format(context.parsed.y)}`;
            }

            return `${context.dataset.label}: ${context.parsed.y}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            if (typeof value === 'number') {
              return new Intl.NumberFormat('kk-KZ', {
                style: 'currency',
                currency: 'KZT',
                minimumFractionDigits: 0,
                notation: 'compact',
              }).format(value);
            }

            return value;
          },
        },
      },
    },
  };

  const lineChartOptions: ChartOptions<'bar' | 'line'> = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  if (!orders.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Analytics Charts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center text-gray-500">
            No data available for the selected filters
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Analytics Charts</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs className="w-full" defaultValue="revenue">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="revenue">Revenue Trend</TabsTrigger>
            <TabsTrigger value="orders">Orders Trend</TabsTrigger>
            <TabsTrigger value="channels">By Channel</TabsTrigger>
          </TabsList>

          <TabsContent value="revenue">
            <div className="h-64 mt-4">
              <Bar data={revenueChartData} options={chartOptions} />
            </div>
          </TabsContent>

          <TabsContent value="orders">
            <div className="h-64 mt-4">
              <Line data={ordersChartData} options={lineChartOptions} />
            </div>
          </TabsContent>

          <TabsContent value="channels">
            <div className="h-64 mt-4">
              <Bar data={channelChartData} options={chartOptions} />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DashboardChart;
