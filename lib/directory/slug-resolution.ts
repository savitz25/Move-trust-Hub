import { slugifyCompanyName } from '@/lib/utils/slugify';
import { normalizeUsdot } from '@/lib/trust/license-verification';
import type { Company } from '@/types';

function collapseSlug(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function slugVariants(input: string): string[] {
  const trimmed = input.trim().toLowerCase();
  const slugified = slugifyCompanyName(trimmed);
  const collapsed = collapseSlug(trimmed);
  const collapsedFromSlug = collapseSlug(slugified);
  return [...new Set([trimmed, slugified, collapsed, collapsedFromSlug].filter(Boolean))];
}

function companyMatchesSlugVariant(company: Company, variant: string): boolean {
  const variants = slugVariants(variant);
  const companySlugs = [
    company.slug,
    slugifyCompanyName(company.name),
    collapseSlug(company.slug),
    collapseSlug(company.name),
  ].filter(Boolean);

  return variants.some((v) => companySlugs.some((cs) => cs === v || collapseSlug(cs) === collapseSlug(v)));
}

/** Resolve a company from directory list using slug, name aliases, or USDOT patterns. */
export function resolveCompanyFromList(
  companies: Company[],
  slugOrAlias: string
): Company | undefined {
  const input = slugOrAlias.trim();
  if (!input) return undefined;

  const direct = companies.find((c) => c.slug === input);
  if (direct) return direct;

  const byAlias = companies.find((c) => companyMatchesSlugVariant(c, input));
  if (byAlias) return byAlias;

  const dotPrefix = input.match(/^dot-(\d{3,8})$/i);
  if (dotPrefix) {
    const target = dotPrefix[1]!;
    const byDot = companies.find((c) => normalizeUsdot(c.usdotNumber) === target);
    if (byDot) return byDot;
  }

  if (/^\d{3,8}$/.test(input)) {
    const byDot = companies.find((c) => normalizeUsdot(c.usdotNumber) === input);
    if (byDot) return byDot;
  }

  return undefined;
}

/** Canonical public profile path for a company record. */
export function companyProfilePath(company: Pick<Company, 'slug'>): string {
  return `/companies/${company.slug}`;
}

/** Predict profile slug before a company is approved (name-first, matches resolveUniqueCompanySlug). */
export function predictCompanyProfileSlug(params: {
  name: string;
  usdot?: string | null;
}): string {
  const nameSlug = slugifyCompanyName(params.name);
  if (nameSlug && nameSlug !== 'company') return nameSlug;
  const dot = params.usdot?.replace(/\D/g, '');
  return dot && dot.length >= 3 ? `dot-${dot}` : 'company';
}