// libraries
import { useQuery } from '@tanstack/react-query';
// config
import { API_URL } from '@/hooks/config';

// type
import { Order } from '@/providers/type';

export const useOrders = () => {
  return useQuery<Order[]>({
    queryKey: ['orders'],
    queryFn: async (): Promise<Order[]> => {
      const res = await fetch(`${API_URL}/orders`);

      if (!res.ok) {
        throw new Error(`Failed to fetch orders: ${res.status} ${res.statusText}`);
      }

      const data = (await res.json()) as Order[];

      return data;
    },
  });
};
