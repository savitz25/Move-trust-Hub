import { SEARCH_QUERY_MAX_LENGTH } from '@/lib/search/types';

export function boundSearchQuery(raw: string): string {
  return raw.replace(/\s+/g, ' ').trim().slice(0, SEARCH_QUERY_MAX_LENGTH);
}

export function normalizeSearchText(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function digitsOnly(value: string): string {
  return value.replace(/\D/g, '');
}

export function searchTokens(value: string): string[] {
  return normalizeSearchText(value).split(' ').filter((token) => token.length > 0);
}
