interface Order {
  id: string;
  date: string;
  customerId: string;
  city: string;
  channel: string;
  status: string;
  total: number;
  items: Array<{
    sku: string;
    name: string;
    qty: number;
    price: number;
  }>;
  comment?: string;
}

export interface ChartProps {
  orders: Order[];
}
