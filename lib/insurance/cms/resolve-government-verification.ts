import type { EnrichedProvider } from '@/lib/insurance/enrichment/merge';
import type { GovernmentVerificationData, CmsParticipationStatus } from '@/lib/insurance/cms/types';
import { CMS_COMPLAINT_DATASET_META } from '@/lib/insurance/cms/complaint-rankings';
import { lookupNpiEnrollment, normalizeNpi, PPEF_DATASET_META } from '@/lib/insurance/cms/ppef-lookup';

function isMedicareFocused(provider: EnrichedProvider): boolean {
  if (provider.specialties.some((s) => s === 'Medicare Specialists')) return true;
  if (provider.insurance_types.includes('medicare')) return true;
  const blob = `${provider.short_description ?? ''} ${provider.description ?? ''}`.toLowerCase();
  return blob.includes('medicare');
}

/** Optional NPI on provider records (never invented). */
function providerNpi(provider: EnrichedProvider): string | null {
  const raw = (provider as EnrichedProvider & { npi?: string | null }).npi;
  return normalizeNpi(raw);
}

function resolveParticipation(provider: EnrichedProvider): {
  status: CmsParticipationStatus;
  label: string;
  notes: string | null;
  npi: string | null;
  dataSourceLabel: string;
  lastCmsUpdate: string;
} {
  const medicare = isMedicareFocused(provider);
  const npi = providerNpi(provider);
  const npiHit = lookupNpiEnrollment(npi);

  if (npiHit) {
    return {
      status: npiHit.status,
      label: npiHit.label,
      notes: npiHit.notes,
      npi: npiHit.npi,
      dataSourceLabel: npiHit.dataSourceLabel,
      lastCmsUpdate: npiHit.lastCmsUpdate,
    };
  }

  if (!medicare) {
    return {
      status: 'not_applicable',
      label: 'Not a Medicare-focused listing',
      notes:
        'This agency is not tagged primarily for Medicare Advantage / Part D enrollment. CMS PPEF / Opt Out checks apply when an NPI is on file or the listing is Medicare-focused.',
      npi: null,
      dataSourceLabel: 'State DOI listing · CMS fields not applicable',
      lastCmsUpdate: CMS_COMPLAINT_DATASET_META.syncedAt,
    };
  }

  // Medicare-focused, no NPI on record — do not invent NPI or enrollment
  if (provider.is_verified) {
    return {
      status: 'pending',
      label: 'Pending NPI / PECOS match',
      notes: `DOI-verified Medicare-related listing. CMS Opt Out list (${PPEF_DATASET_META.optOutCount.toLocaleString()} NPIs, ${PPEF_DATASET_META.optOutVintage}) is loaded; PPEF active-enrollment match requires a listing NPI. No NPI is shown until supplied by verified data — never fabricated.`,
      npi: null,
      dataSourceLabel: 'CMS Opt Out Affidavits · PPEF when NPI available · state DOI',
      lastCmsUpdate: CMS_COMPLAINT_DATASET_META.syncedAt,
    };
  }

  return {
    status: 'pending',
    label: 'Pending verification',
    notes:
      'Medicare-related listing without a completed CMS NPI match. Confirm participation with CMS tools and your state DOI before enrollment decisions.',
    npi: null,
    dataSourceLabel: 'CMS public datasets (scheduled import) · state DOI cross-check',
    lastCmsUpdate: CMS_COMPLAINT_DATASET_META.syncedAt,
  };
}

/**
 * Build Government Verification panel props from an enriched provider.
 * NPI is never invented — only shown when present on the provider record and validated.
 */
export function resolveGovernmentVerification(
  provider: EnrichedProvider
): GovernmentVerificationData {
  const { status, label, notes, npi, dataSourceLabel, lastCmsUpdate } =
    resolveParticipation(provider);

  return {
    title: 'Government Verification',
    cmsParticipation: status,
    cmsParticipationLabel: label,
    npi,
    medicareNotes: notes,
    lastCmsUpdate,
    dataSourceLabel,
    licenseVerified: provider.is_verified,
    licenseNumber: provider.license_number,
    licenseState: provider.state,
  };
}

export function providerIsMedicareSpecialist(provider: EnrichedProvider): boolean {
  return isMedicareFocused(provider);
}

/** Signals for Trust Score Government Standing factor. */
export function resolveGovernmentStandingInput(provider: EnrichedProvider) {
  const verification = resolveGovernmentVerification(provider);
  return {
    cmsParticipation: verification.cmsParticipation,
    hasNpi: Boolean(verification.npi),
    isMedicareSpecialist: isMedicareFocused(provider),
    isLicenseVerified: provider.is_verified,
    complaintRatePerThousand: null as number | null,
    hasEnforcementFlag:
      verification.cmsParticipation === 'inactive' ? true : (null as boolean | null),
  };
}
