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
import { mergeCoverageIntoFmcsaPreview } from '@/lib/suggestions/suggestion-coverage-storage';
import { packFmcsaPreviewWithEnrichment } from '@/lib/suggestions/suggestion-enrichment-storage';
import type { WebsiteCoverageData } from '@/lib/verification/coverage-scrape-types';
import { toFmcsaSuggestionPreview } from '@/lib/suggestions/fmcsa-lookup';
import { preferPublicCompanyName } from '@/lib/companies/public-display-name';

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
  contact_email?: string | null;
  authority_status: string | null | undefined;
  fmcsa_preview: Json | null;
  fmcsa_raw: Json | null;
  google_data?: Json | null;
  public_scrape_data?: Json | null;
  service_scope?: string;
  selected_counties?: Json;
};

export function buildCompanySuggestionInsertRow(input: {
  parsed: SuggestCompanyInput;
  companyName: string;
  fmcsa: SuggestionFmcsaData | null;
  carrierParsed: ReturnType<
    typeof import('@/lib/verify-dot/schema').parseCarrierNumber
  > | null;
  enrichment: CompanyEnrichmentResult;
  userIp: string | null;
  emailHash: string;
  ipHash: string | null;
  includeEnrichment?: boolean;
  coverage?: WebsiteCoverageData | null;
  /** Merged contact after FMCSA → Google → website cascade */
  resolvedPhone?: string | null;
  resolvedContactEmail?: string | null;
}): CompanySuggestionInsertRow {
  const {
    parsed,
    companyName,
    fmcsa,
    carrierParsed,
    enrichment,
    userIp,
    emailHash,
    ipHash,
    coverage,
  } = input;
  const includeEnrichment = input.includeEnrichment !== false;

  const scope = parsed.serviceScope === 'intrastate' ? 'intrastate' : 'interstate';
  const publicName =
    preferPublicCompanyName({
      legalName: fmcsa?.legalName,
      dbaName: fmcsa?.dbaName,
      fallback: companyName,
    }) || companyName;
  const row: CompanySuggestionInsertRow = {
    name: publicName.slice(0, 200),
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
    headquarters: fmcsa?.headquarters ?? parsed.headquarters ?? null,
    phone:
      input.resolvedPhone ??
      fmcsa?.phone ??
      parsed.phone ??
      enrichment.google?.phone ??
      null,
    contact_email: input.resolvedContactEmail ?? parsed.contactEmail ?? null,
    authority_status:
      scope === 'intrastate' ? 'Local / in-state (no USDOT)' : fmcsa?.authorityStatus ?? null,
    service_scope: scope,
    selected_counties: (parsed.selectedCounties ?? []) as unknown as Json,
    fmcsa_preview: packFmcsaPreviewWithEnrichment(
      fmcsa ? toFmcsaSuggestionPreview(fmcsa) : null,
      enrichment
    ) ?? toJsonbColumn(fmcsa?.fmcsaPreview ?? null, {
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

  if (coverage) {
    row.fmcsa_preview = mergeCoverageIntoFmcsaPreview(row.fmcsa_preview, coverage);
  }

  return row;
}