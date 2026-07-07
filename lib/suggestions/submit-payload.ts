import 'server-only';

import type { Json } from '@/types/supabase';
import type { SuggestionFmcsaData } from '@/lib/suggestions/fmcsa-lookup';
import type { SuggestCompanyInput } from '@/lib/suggestions/schema';
import type { CompanyEnrichmentResult } from '@/lib/verification/types';
import {
  toGoogleDataColumn,
  toJsonbColumn,
  toPublicScrapeColumn,
} from '@/lib/suggestions/jsonb-payload';

export type CompanySuggestionInsertRow = {
  name: string;
  usdot: string | null;
  mc_number: string | null;
  details: string | null;
  status: 'pending';
  suggested_by_name: string;
  suggested_by_email: string;
  submitter_ip: string | null;
  ip_hash: string | null;
  email_hash: string;
  source_page: string;
  legal_name: string;
  headquarters: string | null | undefined;
  phone: string | null | undefined;
  authority_status: string | null | undefined;
  fmcsa_preview: Json | null;
  fmcsa_raw: Json | null;
  google_data?: Json | null;
  public_scrape_data?: Json | null;
};

export function buildCompanySuggestionInsertRow(input: {
  parsed: SuggestCompanyInput;
  companyName: string;
  fmcsa: SuggestionFmcsaData | null;
  carrierParsed: ReturnType<
    typeof import('@/lib/verify-dot/schema').parseCarrierNumber
  >;
  enrichment: CompanyEnrichmentResult;
  userIp: string | null;
  emailHash: string;
  ipHash: string | null;
  includeEnrichment?: boolean;
}): CompanySuggestionInsertRow {
  const { parsed, companyName, fmcsa, carrierParsed, enrichment, userIp, emailHash, ipHash } =
    input;
  const includeEnrichment = input.includeEnrichment !== false;

  const row: CompanySuggestionInsertRow = {
    name: companyName.slice(0, 200),
    usdot: fmcsa?.usdot ?? (carrierParsed?.type === 'DOT' ? carrierParsed.value : null),
    mc_number: fmcsa?.mcNumber ?? (carrierParsed?.type === 'MC' ? carrierParsed.value : null),
    details: parsed.details ?? null,
    status: 'pending',
    suggested_by_name: parsed.suggestedByName,
    suggested_by_email: parsed.suggestedByEmail,
    submitter_ip: userIp,
    ip_hash: ipHash,
    email_hash: emailHash,
    source_page: parsed.sourcePage || '/companies',
    legal_name: (fmcsa?.legalName ?? companyName).slice(0, 200),
    headquarters: fmcsa?.headquarters ?? null,
    phone: fmcsa?.phone ?? null,
    authority_status: fmcsa?.authorityStatus ?? null,
    fmcsa_preview: toJsonbColumn(fmcsa?.fmcsaPreview ?? null, {
      label: 'fmcsa_preview',
      maxBytes: 60_000,
    }),
    fmcsa_raw: toJsonbColumn(fmcsa?.fmcsaRaw ?? null, {
      label: 'fmcsa_raw',
      maxBytes: 80_000,
    }),
  };

  if (includeEnrichment) {
    row.google_data = toGoogleDataColumn(enrichment.google);
    row.public_scrape_data = toPublicScrapeColumn(enrichment.publicScrape);
  }

  return row;
}