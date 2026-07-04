import type { Article } from '@/lib/insurance/resources/articles';
import type { DestinationState } from '@/lib/insurance/destinations/data';
import { insuranceHref } from '@/lib/insurance/paths';
import { hubPath } from '@/lib/hub/paths';
import type { HubId } from '@/lib/hub/types';
import type { InsuranceHub } from '@/types/insurance/agent';
import type { SpecialtyTopic } from '@/lib/insurance/hubs/specialty-topics';
import type { HealthHubDirectoryData, ResourceArticleData, StateGuideData } from '@/lib/hub/templates/types';

export function normalizeHubHref(hub: HubId, href: string): string {
  if (href.startsWith('http')) return href;
  if (hub === 'insurance' && (href.startsWith('/insurance') || href === '/insurance')) {
    return href;
  }
  if (hub === 'lender' && (href.startsWith('/lender') || href === '/lender')) {
    return href;
  }
  return hubPath(hub, href);
}

export function articleToResourceData(
  article: Article & { variant?: ResourceArticleData['variant'] }
): ResourceArticleData {
  const variant =
    article.variant ??
    (article.slug.includes('vs') || article.title.toLowerCase().includes(' vs ')
      ? 'comparison'
      : 'guide');

  return {
    slug: article.slug,
    title: article.title,
    description: article.description,
    category: article.category,
    readTime: article.readTime,
    publishedAt: article.publishedAt,
    updatedAt: article.updatedAt,
    variant,
    sections: article.sections,
    relatedLinks: article.relatedLinks.map((link) => ({
      ...link,
      href: normalizeHubHref('insurance', link.href),
    })),
  };
}

export function destinationToStateGuideData(dest: DestinationState): StateGuideData {
  return {
    slug: dest.slug,
    name: dest.name,
    code: dest.code,
    tagline: dest.tagline,
    description: dest.description,
    considerations: dest.insuranceNotes,
    relatedLinks: dest.relatedLinks.map((link) => ({
      ...link,
      href: normalizeHubHref('insurance', link.href),
    })),
  };
}

export function specialtyTopicToDirectoryData(
  topic: SpecialtyTopic,
  featuredHubs: InsuranceHub[]
): HealthHubDirectoryData {
  return {
    title: topic.h1,
    subtitle: topic.subtitle,
    marketSnapshot: topic.marketSnapshot,
    focusPoints: topic.healthNeeds,
    featuredMetros: featuredHubs.map((hub) => ({
      href: hubPath('insurance', `/hubs/${hub.stateSlug}/${hub.slug}`),
      label: hub.shortName,
      description: hub.enrollmentHighlight,
    })),
    trustLabel: 'Verified · Independent · Licensed Only',
  };
}

/** @deprecated Use normalizeHubHref('insurance', path) */
export function insuranceArticleHref(path: string): string {
  return insuranceHref(path);
}