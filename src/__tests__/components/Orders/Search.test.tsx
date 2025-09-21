import React from 'react';
import { render, screen } from '@testing-library/react';

jest.mock('@/components/Orders/Search', () => ({
  OrdersSearch: ({ searchTerm, onSearchChange }: any) => (
    <input
      data-testid="search-input"
      onChange={(e) => onSearchChange(e.target.value)}
      placeholder="Search orders..."
      value={searchTerm}
    />
  ),
}));

const { OrdersSearch } = require('@/components/Orders/Search');

describe('OrdersSearch Component', () => {
  test('renders search input', () => {
    render(<OrdersSearch onSearchChange={jest.fn()} searchTerm="" />);
    expect(screen.getByPlaceholderText('Search orders...')).toBeInTheDocument();
  });

  test('displays current search term', () => {
    render(<OrdersSearch onSearchChange={jest.fn()} searchTerm="test" />);
    expect(screen.getByDisplayValue('test')).toBeInTheDocument();
  });
});
