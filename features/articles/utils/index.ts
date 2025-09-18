import striptags from 'striptags';
import he from 'he';
import { HNArticle, UIArticle } from '@/types';
import { Linking } from 'react-native';

export function sanitizeHtmlText(raw: string = ''): string {
  return he.decode(striptags(raw));
}

export function formatDate(unixTimeInSeconds: number = 0): string {
  return new Date(unixTimeInSeconds * 1000).toLocaleDateString('it-IT');
}

export function mapHNtoUIArticle(article: HNArticle | null): UIArticle | null {
  if (!article) return null;
  return {
    id: article.id,
    title: sanitizeHtmlText(article.title),
    author: article.by ?? '',
    publish_date: formatDate(article.time),
    score: article.score ?? 0,
    url: article.url ?? '',
    number_of_comments: article.descendants ?? 0,
  };
}

export async function openExternalUrl(url: string) {
  try {
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    } else {
      console.error(`Cannot open external url ${url}`);
    }
  } catch (e) {
    console.error(`Failed to open external url ${url}`, e);
  }
}

export const sleep = (timeout = 1000) => new Promise((resolve) => setTimeout(resolve, timeout));
