import type { Provider } from '@/types/insurance/provider';
import { hubCanonicalUrl } from '@/lib/hub/paths';
import { getProviderLicenseUrl } from '@/lib/insurance/providers/license';
import {
  defaultMethodologyUrl,
  defaultStandardUrl,
  type TrustProfileShell,
  type TrustSourceRef,
} from '@/lib/network/trust-profile';

/**
 * Map an Insurance Trust Hub provider into the shared Trust Profile shell.
 */
export function toInsuranceTrustProfile(provider: Provider): TrustProfileShell {
  const sources: TrustSourceRef[] = [];
  const licenseUrl = getProviderLicenseUrl(provider);

  // Prefer hide: only show DOI chip when listing is verified (or has license + verified)
  if (provider.is_verified) {
    sources.push({
      id: 'doi',
      label: provider.license_number
        ? `DOI / license ${provider.license_number}`
        : 'State DOI pathway',
      status: 'verified',
      url: licenseUrl,
      note: 'Re-confirm Active status on the state DOI site before buying coverage',
      lastChecked: provider.enriched_at ?? provider.updated_at ?? undefined,
    });
  }

  if (provider.npi) {
    sources.push({
      id: 'nppes',
      label: `NPI ${provider.npi}`,
      status: 'verified',
      note: 'Medicare NPI when known from verified CMS/NPPES data',
    });
  }

  if (provider.bbb_accredited && provider.bbb_rating) {
    sources.push({
      id: 'bbb',
      label: `BBB ${provider.bbb_rating}${provider.bbb_accredited ? ' Accredited' : ''}`,
      status: 'verified',
      note: 'Public BBB listing — not a DOI license',
    });
  }

  if (provider.google_rating != null) {
    sources.push({
      id: 'google',
      label: 'Google rating',
      status: 'verified',
      note: 'External reputation reference only',
    });
  }

  const address = [provider.city, provider.state, provider.zip].filter(Boolean).join(', ') || undefined;

  const score =
    typeof provider.trust_score === 'number' && provider.trust_score > 0
      ? provider.trust_score
      : undefined;

  return {
    hub: 'insurance',
    entityId: provider.slug || provider.id,
    displayName: provider.name?.trim() || 'Unnamed agency',
    profileUrl: hubCanonicalUrl('insurance', `/providers/${provider.slug}`),
    serviceScope: 'unknown',
    verification: {
      primaryLabel: provider.is_verified
        ? 'License pathway checked'
        : 'Verify license with state DOI',
      isVerified: Boolean(provider.is_verified),
      sources,
    },
    reputation: score
      ? {
          score,
          scoreLabel: 'Trust Score',
          scoreMax: 100,
          summary:
            'Research aid only — not underwriting, not a quote, and not enrollment.',
        }
      : undefined,
    contact: {
      phone: provider.phone?.trim() || undefined,
      website: provider.website?.trim() || undefined,
      address,
    },
    updatedAt: provider.enriched_at || provider.updated_at || undefined,
    methodologyUrl: defaultMethodologyUrl('insurance'),
    standardUrl: defaultStandardUrl(),
    extensions: {
      insurance: {
        licenseNumber: provider.license_number ?? undefined,
        npn: provider.npi ?? undefined,
        state: provider.state,
        city: provider.city,
        linesOfAuthority: provider.insurance_types?.length
          ? [...provider.insurance_types]
          : undefined,
      },
    },
  };
}
