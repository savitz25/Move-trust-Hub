import { hubCanonicalUrl } from '@/lib/hub/paths';
import type { HubId } from '@/lib/hub/types';

export function buildCalculatorToolSchema(
  hub: HubId,
  params: {
    path: string;
    name: string;
    description: string;
  }
): Record<string, unknown> {
  const url = hubCanonicalUrl(hub, params.path);
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: params.name,
    description: params.description,
    url,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    provider: {
      '@type': 'Organization',
      name: 'Move Trust Hub',
    },
  };
}