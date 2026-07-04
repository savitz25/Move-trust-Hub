import type { LucideIcon } from 'lucide-react';
import type { HubId } from '@/lib/hub/types';

export type TemplateBreadcrumb = {
  label: string;
  href?: string;
};

export type TemplateFaqItem = {
  question: string;
  answer: string;
};

export type TemplateRelatedLink = {
  href: string;
  label: string;
  description?: string;
};

export type ResourceArticleSection = {
  heading: string;
  content: string;
  bullets?: string[];
};

export type ResourceArticleData = {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  publishedAt: string;
  updatedAt: string;
  variant?: 'guide' | 'comparison';
  sections: ResourceArticleSection[];
  relatedLinks: TemplateRelatedLink[];
};

export type StateGuideData = {
  slug: string;
  name: string;
  code?: string;
  tagline: string;
  description: string;
  considerations: string[];
  relatedLinks?: TemplateRelatedLink[];
};

export type CalculatorCardData = {
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export type HealthHubDirectoryData = {
  title: string;
  subtitle: string;
  marketSnapshot: string;
  focusPoints: string[];
  featuredMetros: TemplateRelatedLink[];
  trustLabel?: string;
};

export type HubSectionPreset = {
  hub: HubId;
  section: 'resources' | 'guides' | 'calculators' | 'directories' | 'compare';
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: TemplateRelatedLink;
  secondaryCta?: TemplateRelatedLink;
  links: TemplateRelatedLink[];
  faq?: TemplateFaqItem[];
};

export type TemplateMetadataInput = {
  hub: HubId;
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: 'website' | 'article';
  noIndex?: boolean;
};