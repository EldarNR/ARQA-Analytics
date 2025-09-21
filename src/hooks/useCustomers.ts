// libraries
import { useQuery } from '@tanstack/react-query';
// config
import { API_URL } from '@/hooks/config';

// types
import { Customer } from '@/providers/type';

export const useCustomers = () => {
  return useQuery<Customer[]>({
    queryKey: ['customers'],
    queryFn: async (): Promise<Customer[]> => {
      const res = await fetch(`${API_URL}/customers`);

      if (!res.ok) {
        throw new Error(`Failed to fetch customers: ${res.status} ${res.statusText}`);
      }

      const data = (await res.json()) as Customer[];

      return data;
    },
  });
};
