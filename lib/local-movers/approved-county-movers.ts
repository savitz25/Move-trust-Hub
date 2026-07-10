import 'server-only';

import { unstable_cache } from 'next/cache';
import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';
import { companyToLocalMover } from '@/lib/local-movers/company-to-local-mover';
import type { LocalMover } from '@/lib/local-movers/types';

import { APPROVED_COUNTY_MOVERS_TAG } from '@/lib/local-movers/approved-county-movers-tag';

export { APPROVED_COUNTY_MOVERS_TAG };

type AssignmentRow = {
  company_id: string;
  company_slug: string;
};

async function fetchApprovedMoversForCountyUncached(
  stateSlug: string,
  countySlug: string
): Promise<LocalMover[]> {
  if (!isSupabaseAdminConfigured()) return [];

  const admin = createAdminClient();
  const { data: assignments, error: assignmentError } = await admin
    .from('company_destination_assignments')
    .select('company_id, company_slug')
    .eq('state_slug', stateSlug)
    .eq('county_slug', countySlug);

  if (assignmentError || !assignments?.length) return [];

  const companyIds = [...new Set(assignments.map((row: AssignmentRow) => row.company_id))];
  const { data: companies, error: companyError } = await admin
    .from('companies')
    .select(
      'id, slug, name, short_description, headquarters, usdot_number, mc_number, fmcsa_safety_rating, bbb_rating, overall_rating, review_count, services, specialties, is_verified'
    )
    .in('id', companyIds)
    .eq('is_verified', true);

  if (companyError || !companies?.length) return [];

  const order = new Map(companyIds.map((id, index) => [id, index]));
  return companies
    .slice()
    .sort((a, b) => (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0))
    .map((company) => companyToLocalMover(company));
}

const getApprovedMoversForCountyCached = unstable_cache(
  async (stateSlug: string, countySlug: string) =>
    fetchApprovedMoversForCountyUncached(stateSlug, countySlug),
  ['approved-county-movers'],
  { tags: [APPROVED_COUNTY_MOVERS_TAG], revalidate: 300 }
);

export async function getApprovedMoversForCounty(
  stateSlug: string,
  countySlug: string
): Promise<LocalMover[]> {
  return getApprovedMoversForCountyCached(stateSlug, countySlug);
}