import type { AxiosInstance, AxiosResponse } from 'axios';
import { HNArticle } from '@/types';

export function createArticlesApi(_client: AxiosInstance) {
  return {
    getTopArticlesIds(): Promise<AxiosResponse<number[]>> {
      return _client.get(`/topstories.json`);
    },
    getArticleById(id: number): Promise<AxiosResponse<HNArticle>> {
      return _client.get(`/item/${id}.json`);
    },
  };
}
