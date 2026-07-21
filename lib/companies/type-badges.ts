/**
 * Company type badges for directory / profile / county UI.
 * Derived from onboarding funnel (service_scope) + FMCSA entity type.
 */

import { mergeServicesWithEntityType } from '@/lib/fmcsa/derive-directory-services';
import {
  formatEntityTypeLabel,
  resolveEntityTypeForDisplay,
} from '@/lib/fmcsa/entity-type-display';
import type { Company, ServiceType } from '@/types';

export type CompanyTypeBadgeId =
  | 'local-mover'
  | 'carrier'
  | 'broker'
  | 'carrier-broker';

export type CompanyTypeBadge = {
  id: CompanyTypeBadgeId;
  /** User-facing label */
  label: string;
  /** Short help text for title attributes */
  description: string;
  /** Visual variant for Badge styling */
  variant: 'local' | 'carrier' | 'broker' | 'mixed';
};

const LOCAL_BADGE: CompanyTypeBadge = {
  id: 'local-mover',
  label: 'Local Mover',
  description: 'Intrastate / local mover — listed on selected county pages only',
  variant: 'local',
};

const CARRIER_BADGE: CompanyTypeBadge = {
  id: 'carrier',
  label: 'Carrier',
  description: 'FMCSA entity type: Carrier (interstate operating authority)',
  variant: 'carrier',
};

const BROKER_BADGE: CompanyTypeBadge = {
  id: 'broker',
  label: 'Broker',
  description: 'FMCSA entity type: Broker',
  variant: 'broker',
};

const MIXED_BADGE: CompanyTypeBadge = {
  id: 'carrier-broker',
  label: 'Carrier/Broker',
  description: 'FMCSA entity type: Carrier and Broker authority',
  variant: 'mixed',
};

export type TypeBadgeInput = {
  serviceScope?: string | null;
  entityType?: string | null;
  services?: ServiceType[] | null;
  fmcsaRaw?: Record<string, unknown> | null;
  /** USDOT digits — absence helps detect local when service_scope column is missing */
  usdotNumber?: string | null;
  /** Local-movers catalog flag when Company is not available */
  isLocalOnly?: boolean;
};

function looksLocalWithoutScopeColumn(input: TypeBadgeInput): boolean {
  // Prod may lag the service_scope migration; treat no-USDOT + no FMCSA entity as local.
  const usdot = (input.usdotNumber ?? '').replace(/\D/g, '');
  if (usdot.length >= 5) return false;
  const entity = formatEntityTypeLabel(input.entityType);
  if (entity && entity !== 'Not Available') return false;
  const services = input.services ?? [];
  if (
    services.includes('Carrier') ||
    services.includes('Broker') ||
    services.includes('Carrier / Broker')
  ) {
    return false;
  }
  return true;
}

/**
 * Resolve 0–1 primary type badges for a company.
 * Local movers always get "Local Mover". Interstate get Carrier / Broker / Carrier/Broker.
 */
export function resolveCompanyTypeBadges(input: TypeBadgeInput): CompanyTypeBadge[] {
  const scope = (input.serviceScope ?? '').toLowerCase();
  if (scope === 'intrastate' || input.isLocalOnly) {
    return [LOCAL_BADGE];
  }
  // When scope is unset/default interstate but company has no USDOT identity, prefer Local Mover.
  if (scope !== 'interstate' && looksLocalWithoutScopeColumn(input)) {
    return [LOCAL_BADGE];
  }
  if (!scope && looksLocalWithoutScopeColumn(input)) {
    return [LOCAL_BADGE];
  }

  const label =
    resolveEntityTypeForDisplay({
      entityType: input.entityType,
      fmcsaRaw: input.fmcsaRaw ?? null,
      services: input.services ?? undefined,
    }) || formatEntityTypeLabel(input.entityType);

  if (!label || label === 'Not Available') {
    // Fallback from service tags only when entity type is unknown
    const services = input.services ?? [];
    if (services.includes('Carrier / Broker')) return [MIXED_BADGE];
    if (services.includes('Broker') && services.includes('Carrier')) return [MIXED_BADGE];
    if (services.includes('Broker')) return [BROKER_BADGE];
    if (services.includes('Carrier')) return [CARRIER_BADGE];
    return [];
  }

  const key = label.toUpperCase().replace(/\s+/g, '');
  if (key === 'CARRIER/BROKER' || key === 'BROKER/CARRIER') return [MIXED_BADGE];
  if (key === 'BROKER') return [BROKER_BADGE];
  if (key === 'CARRIER') return [CARRIER_BADGE];

  // Unknown FMCSA census types (e.g. Freight Forwarder) — show cleaned label once
  return [
    {
      id: 'carrier',
      label,
      description: `FMCSA entity type: ${label}`,
      variant: 'carrier',
    },
  ];
}

export function resolveCompanyTypeBadgesFromCompany(
  company: Pick<Company, 'serviceScope' | 'entityType' | 'services' | 'usdotNumber'> & {
    fmcsaRaw?: Record<string, unknown> | null;
  }
): CompanyTypeBadge[] {
  return resolveCompanyTypeBadges({
    serviceScope: company.serviceScope,
    entityType: company.entityType,
    services: company.services,
    fmcsaRaw: company.fmcsaRaw ?? null,
    usdotNumber: company.usdotNumber,
  });
}

/**
 * Services array to store on publish (includes Carrier/Broker type tags for interstate).
 */
export function servicesForPublishedCompany(input: {
  serviceScope: 'interstate' | 'intrastate';
  entityType?: string | null;
  baseServices?: ServiceType[];
}): ServiceType[] {
  const base = input.baseServices?.length
    ? [...input.baseServices]
    : (['Full Service'] as ServiceType[]);
  if (input.serviceScope === 'intrastate') {
    return [...new Set(base)];
  }
  return mergeServicesWithEntityType(base, input.entityType);
}
