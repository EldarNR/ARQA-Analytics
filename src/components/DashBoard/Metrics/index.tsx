// libraries
import { useVisits, Visit } from '@/hooks/useVisits';

// components
import { DashBoardMetricsProps } from '@/components/DashBoard/Metrics/type';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// icons
import { DollarSignIcon, ShoppingCartIcon, TargetIcon, TrendingUpIcon } from 'lucide-react';

const DashboardMetrics = ({ orders, filters }: DashBoardMetricsProps) => {
  const { data: visits = [] } = useVisits();

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

  const filteredVisits = visits.filter((visit: Visit) => {
    if (filters) {
      if (filters.channel !== 'all' && visit.channel !== filters.channel) {
        return false;
      }
      if (filters.city !== 'all' && visit.city !== filters.city) {
        return false;
      }

      // Здесь можно добавить фильтрацию по датам для visits
      const visitDate = new Date(visit.date);
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

      if (visitDate < fromDate || visitDate > toDate) {
        return false;
      }
    }

    return true;
  });

  const totalVisits = filteredVisits.reduce((sum: number, visit: Visit) => sum + visit.visits, 0);
  const conversionRate = totalVisits > 0 ? ((totalOrders / totalVisits) * 100).toFixed(2) : '0.00';

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('kk-KZ', {
      style: 'currency',
      currency: 'KZT',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('kk-KZ').format(num);
  };

  const metrics = [
    {
      title: 'Revenue',
      value: formatCurrency(totalRevenue),
      icon: DollarSignIcon,
      description: 'Total revenue generated',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Orders',
      value: formatNumber(totalOrders),
      icon: ShoppingCartIcon,
      description: 'Total number of orders',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'AOV',
      value: formatCurrency(avgOrderValue),
      icon: TrendingUpIcon,
      description: 'Average order value',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Conversion Rate',
      value: `${conversionRate}%`,
      icon: TargetIcon,
      description: 'Estimated conversion rate',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;

        return (
          <Card className="relative overflow-hidden" key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{metric.title}</CardTitle>
              <div className={`p-2 rounded-full ${metric.bgColor}`}>
                <Icon className={`h-4 w-4 ${metric.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${metric.color}`}>{metric.value}</div>
              <p className="text-xs text-gray-500 mt-1">{metric.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default DashboardMetrics;
