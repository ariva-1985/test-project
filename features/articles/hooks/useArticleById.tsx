import { useQuery } from '@tanstack/react-query';
import ApiClient from '@/services/api';
import type { UIArticle } from '@/types';
import { mapHNtoUIArticle } from '@/features/articles/utils';

export function useArticleById(id: number) {
  return useQuery<UIArticle | null>({
    queryKey: ['article', id],
    queryFn: async () => {
      const res = await ApiClient.articles.getArticleById(id);
      return mapHNtoUIArticle(res?.data ?? null);
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 1,
  });
}
