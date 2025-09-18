import ApiClient from '@/services/api';
import { useQuery } from '@tanstack/react-query';

export function useTopArticlesIds() {
  return useQuery<number[]>({
    queryKey: ['topArticlesIds'],
    queryFn: async ({ signal }) => {
      const res = await ApiClient.articles.getTopArticlesIds();
      return res.data?.slice(0, 20) ?? [];
    },
    retry: 1,
  });
}
