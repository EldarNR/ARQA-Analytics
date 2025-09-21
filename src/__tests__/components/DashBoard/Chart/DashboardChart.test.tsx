import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DashboardChart from '@/components/DashBoard/Chart';

// Моки для Chart.js
jest.mock('chart.js', () => ({
  Chart: {
    register: jest.fn(),
  },
  CategoryScale: {},
  LinearScale: {},
  BarElement: {},
  LineElement: {},
  PointElement: {},
  Title: {},
  Tooltip: {},
  Legend: {},
}));

// Моки для react-chartjs-2 с уникальными testid
jest.mock('react-chartjs-2', () => ({
  Bar: jest.fn(({ data }) => {
    // Определяем тип Bar chart по данным
    const isRevenue =
      data.datasets[0].label?.includes('Revenue') && !data.datasets[0].label?.includes('Channel');
    const isChannel = data.datasets[0].label?.includes('Channel');

    if (isChannel) {
      return <div data-testid="bar-chart-channels">Bar Chart Mock - Channels</div>;
    } else if (isRevenue) {
      return <div data-testid="bar-chart-revenue">Bar Chart Mock - Revenue</div>;
    }

    return <div data-testid="bar-chart-generic">Bar Chart Mock</div>;
  }),
  Line: jest.fn(() => <div data-testid="line-chart">Line Chart Mock</div>),
}));

// Моки для date-fns
jest.mock('date-fns', () => ({
  eachDayOfInterval: jest.fn(() => [new Date('2024-01-15'), new Date('2024-01-16')]),
  format: jest.fn((date, formatString) => {
    if (formatString === 'MMM dd') {
      return 'Jan 15';
    }
    if (formatString === 'yyyy-MM-dd') {
      return '2024-01-15';
    }

    return 'Jan 15';
  }),
  parseISO: jest.fn((dateString) => new Date(dateString)),
}));

// Mock UI компонентов
jest.mock('@/components/ui/card', () => ({
  Card: ({ children }: any) => <div data-testid="card">{children}</div>,
  CardContent: ({ children }: any) => <div data-testid="card-content">{children}</div>,
  CardHeader: ({ children }: any) => <div data-testid="card-header">{children}</div>,
  CardTitle: ({ children }: any) => <h3 data-testid="card-title">{children}</h3>,
}));

jest.mock('@/components/ui/tabs', () => ({
  Tabs: ({ children, defaultValue }: any) => (
    <div data-default-value={defaultValue} data-testid="tabs">
      {children}
    </div>
  ),
  TabsList: ({ children }: any) => <div data-testid="tabs-list">{children}</div>,
  TabsTrigger: ({ children, value }: any) => (
    <button data-testid={`tab-trigger-${value}`} data-value={value}>
      {children}
    </button>
  ),
  TabsContent: ({ children, value }: any) => (
    <div data-testid={`tab-content-${value}`} data-value={value}>
      {children}
    </div>
  ),
}));

// Mock данные
const mockOrders = [
  {
    id: '1',
    date: '2024-01-15T10:00:00Z',
    customerId: 'cust-1',
    city: 'Almaty',
    channel: 'Website',
    status: 'completed',
    total: 15000,
    items: [{ sku: 'sku1', name: 'Product 1', qty: 2, price: 7500 }],
  },
];

const emptyOrders: any[] = [];

describe('DashboardChart Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders no data message when orders are empty', () => {
    render(<DashboardChart orders={emptyOrders} />);
    expect(screen.getByText('No data available for the selected filters')).toBeInTheDocument();
  });

  test('renders with data', () => {
    render(<DashboardChart orders={mockOrders} />);
    expect(screen.getByText('Analytics Charts')).toBeInTheDocument();
    expect(screen.getByText('Revenue Trend')).toBeInTheDocument();
    expect(screen.getByText('Orders Trend')).toBeInTheDocument();
    expect(screen.getByText('By Channel')).toBeInTheDocument();
  });

  test('switches between tabs correctly', async () => {
    const user = userEvent.setup();

    render(<DashboardChart orders={mockOrders} />);

    const ordersTab = screen.getByTestId('tab-trigger-orders');
    const channelsTab = screen.getByTestId('tab-trigger-channels');

    await user.click(ordersTab);
    await user.click(channelsTab);

    expect(screen.getByTestId('tab-trigger-channels')).toBeInTheDocument();
  });

  test('renders revenue bar chart by default', () => {
    render(<DashboardChart orders={mockOrders} />);

    expect(screen.getByTestId('tabs')).toHaveAttribute('data-default-value', 'revenue');

    expect(screen.getByTestId('tab-content-revenue')).toBeInTheDocument();
  });

  test('renders different chart types in different tabs', () => {
    render(<DashboardChart orders={mockOrders} />);

    const revenueContent = screen.getByTestId('tab-content-revenue');

    expect(revenueContent).toBeInTheDocument();

    const ordersContent = screen.getByTestId('tab-content-orders');

    expect(ordersContent).toBeInTheDocument();

    const channelsContent = screen.getByTestId('tab-content-channels');

    expect(channelsContent).toBeInTheDocument();
  });

  test('handles multiple bar charts correctly', () => {
    render(<DashboardChart orders={mockOrders} />);

    const revenueTab = screen.getByTestId('tab-content-revenue');
    const channelsTab = screen.getByTestId('tab-content-channels');

    expect(revenueTab).toBeInTheDocument();
    expect(channelsTab).toBeInTheDocument();
  });

  test('verifies tab content structure', () => {
    render(<DashboardChart orders={mockOrders} />);

    expect(screen.getByTestId('tab-content-revenue')).toBeInTheDocument();
    expect(screen.getByTestId('tab-content-orders')).toBeInTheDocument();
    expect(screen.getByTestId('tab-content-channels')).toBeInTheDocument();

    expect(screen.getByTestId('tab-trigger-revenue')).toHaveTextContent('Revenue Trend');
    expect(screen.getByTestId('tab-trigger-orders')).toHaveTextContent('Orders Trend');
    expect(screen.getByTestId('tab-trigger-channels')).toHaveTextContent('By Channel');
  });
});
