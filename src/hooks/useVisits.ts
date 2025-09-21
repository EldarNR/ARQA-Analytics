// libraries
import { useQuery } from '@tanstack/react-query';
// config
import { API_URL } from '@/hooks/config';

export interface Visit {
  date: string;
  channel: string;
  city: string;
  visits: number;
}

export const useVisits = () => {
  return useQuery({
    queryKey: ['visits'],
    queryFn: async (): Promise<Visit[]> => {
      const res = await fetch(`${API_URL}/visits`);

      if (!res.ok) {
        throw new Error('Failed to fetch visits');
      }

      return res.json();
    },
  });
};
