import type { Metadata } from 'next';
import { buildHubMetadata } from '@/lib/hub/metadata';
import { normalizeHubMetadataPath } from '@/lib/hub/paths';
import type { TemplateMetadataInput } from '@/lib/hub/templates/types';

export function buildTemplateMetadata(input: TemplateMetadataInput): Metadata {
  const path = normalizeHubMetadataPath(input.hub, input.path);
  const base = buildHubMetadata(input.hub, {
    title: input.title,
    description: input.description,
    path,
    noIndex: input.noIndex,
  });

  if (input.type === 'article') {
    return {
      ...base,
      openGraph: {
        ...base.openGraph,
        type: 'article',
      },
    };
  }

  return base;
}

export function buildArticleTemplateMetadata(
  hub: 'insurance' | 'lender',
  article: {
    title: string;
    description: string;
    slug: string;
    category?: string;
    variant?: 'guide' | 'comparison';
  }
): Metadata {
  return buildTemplateMetadata({
    hub,
    title: article.title,
    description: article.description,
    path: `/resources/${article.slug}`,
    type: 'article',
  });
}