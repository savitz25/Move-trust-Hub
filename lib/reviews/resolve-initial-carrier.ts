import 'server-only';

import { lookupCarrierForReview, type LookupCarrierResult } from '@/actions/reviews';
import { getMovingCompanyBySlug } from '@/lib/reviews/companies';
import { getAllCompanies } from '@/lib/data-server';

export type ReviewDeepLinkParams = {
  slug?: string;
  carrier?: string;
};

function displayNumberFromCompany(company: {
  dot_number: string | null;
  mc_number: string | null;
  slug: string;
}): string {
  if (company.dot_number) return `DOT ${company.dot_number}`;
  if (company.mc_number) return `MC-${company.mc_number}`;
  return company.slug;
}

export async function resolveInitialReviewCarrier(
  params: ReviewDeepLinkParams
): Promise<LookupCarrierResult | null> {
  const slug = params.slug?.trim();
  const carrier = params.carrier?.trim();

  if (slug) {
    const company = await getMovingCompanyBySlug(slug);
    if (company) {
      const legacyProfileSlug = company.legacy_company_id
        ? (await getAllCompanies()).find((c) => c.id === company.legacy_company_id)?.slug ??
          null
        : null;

      return {
        success: true,
        displayNumber: displayNumberFromCompany(company),
        preview: {
          name: company.name,
          dotNumber: company.dot_number,
          mcNumber: company.mc_number,
          address: company.address,
          slug: company.slug,
          inDatabase: true,
          avgRating: Number(company.avg_rating),
          approvedReviewCount: company.approved_review_count,
          legacyProfileSlug,
        },
      };
    }

    const dotMatch = slug.match(/^dot-(\d{3,8})$/i);
    if (dotMatch) {
      return lookupCarrierForReview(`DOT ${dotMatch[1]}`);
    }

    const mcMatch = slug.match(/^mc-(\d{3,8})$/i);
    if (mcMatch) {
      return lookupCarrierForReview(`MC-${mcMatch[1]}`);
    }
  }

  if (carrier) {
    return lookupCarrierForReview(carrier);
  }

  return null;
}