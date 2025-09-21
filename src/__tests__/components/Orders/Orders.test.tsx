import React from 'react';
import { render, screen } from '@testing-library/react';

import Orders from '@/app/orders/page';

// Моки для хуков
jest.mock('@/hooks/useOrders', () => ({
  useOrders: jest.fn(() => ({
    data: [],
    isLoading: false,
    error: null,
  })),
}));

jest.mock('@/hooks/useCustomers', () => ({
  useCustomers: jest.fn(() => ({
    data: [],
    isLoading: false,
  })),
}));

jest.mock('@/hooks/useUpdateOrderStatus', () => ({
  useUpdateOrderStatus: jest.fn(() => ({
    mutate: jest.fn(),
    isPending: false,
  })),
}));

jest.mock('@/components/Orders/Search', () => ({
  OrdersSearch: () => <div data-testid="search">Search</div>,
}));

// Моки для остальных компонентов
jest.mock('@/components/Orders/Details', () => ({
  OrderDetailsDialog: () => null,
}));

jest.mock('@/components/Orders/Header', () => ({
  OrdersTableHeader: () => (
    <thead data-testid="table-header">
      <tr>
        <th>Header</th>
      </tr>
    </thead>
  ),
}));

jest.mock('@/components/Orders/TabelRow', () => ({
  OrdersTableRow: () => (
    <tr data-testid="order-row">
      <td>Order</td>
    </tr>
  ),
}));

jest.mock('@/components/Orders/Pagination', () => ({
  OrdersPagination: () => <div data-testid="pagination">Pagination</div>,
}));

// Mock UI компонентов
jest.mock('@/components/ui/card', () => ({
  Card: ({ children }: any) => <div data-testid="card">{children}</div>,
  CardContent: ({ children }: any) => <div data-testid="card-content">{children}</div>,
  CardHeader: ({ children }: any) => <div data-testid="card-header">{children}</div>,
  CardTitle: ({ children }: any) => <h3 data-testid="card-title">{children}</h3>,
}));

jest.mock('@/components/ui/table', () => ({
  Table: ({ children }: any) => <table data-testid="table">{children}</table>,
  TableBody: ({ children }: any) => <tbody data-testid="table-body">{children}</tbody>,
}));

describe('Orders Component', () => {
  const mockUseOrders = require('@/hooks/useOrders').useOrders;
  const mockUseCustomers = require('@/hooks/useCustomers').useCustomers;

  beforeEach(() => {
    mockUseOrders.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });

    mockUseCustomers.mockReturnValue({
      data: [],
      isLoading: false,
    });
  });

  test('renders orders page', () => {
    render(<Orders />);
    expect(screen.getByText('Orders')).toBeInTheDocument();
  });

  test('shows search component', () => {
    render(<Orders />);
    expect(screen.getByTestId('search')).toBeInTheDocument();
  });

  test('shows loading state', () => {
    mockUseOrders.mockReturnValue({
      data: [],
      isLoading: true,
      error: null,
    });

    render(<Orders />);
    expect(screen.getByText('Orders')).toBeInTheDocument();
  });
});
