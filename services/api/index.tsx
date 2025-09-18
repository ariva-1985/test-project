import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { createArticlesApi } from '@/services/api/articles';

const BASE_URL = process.env.BASE_URL ?? 'https://hacker-news.firebaseio.com/v0';

function createApiClient() {
  const _client: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 7000,
  });

  return {
    articles: createArticlesApi(_client),
  };
}

export default createApiClient();
