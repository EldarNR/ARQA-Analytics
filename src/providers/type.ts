export interface Order {
  id: string;
  date: string;
  customerId: string;
  city: string;
  channel: string;
  status: string;
  total: number;
  items: Item[];
  comment: string;
}

export interface Item {
  sku: string;
  name: string;
  qty: number;
  price: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  ltv: any;
  ordersCount: number;
}

export type SortField = 'id' | 'date' | 'customerId' | 'city' | 'channel' | 'status' | 'total';

export type SortDirection = 'asc' | 'desc';
