/**
 * Centralized company type badges for directory / profile / county UI.
 *
 * Priority:
 * 1. service_scope = intrastate (or isLocalOnly) → Local Mover
 * 2. Infer local when no USDOT and no carrier/broker signals
 * 3. entity_type / fmcsa_raw / services → Carrier | Broker | Carrier/Broker
 * 4. USDOT present → default Carrier
 * 5. Last resort → Local Mover if no USDOT, else Carrier
 */

import {
  companyResolvesAsLocalMover,
  isLocalMover,
  type LocalMoverInput,
} from '@/lib/companies/is-local-mover';
import { extractEntityType } from '@/lib/fmcsa/carrier-fields';
import { mergeServicesWithEntityType } from '@/lib/fmcsa/derive-directory-services';
import {
  formatEntityTypeLabel,
  resolveEntityTypeForDisplay,
} from '@/lib/fmcsa/entity-type-display';
import type { Company, ServiceType } from '@/types';

export { companyResolvesAsLocalMover, isLocalMover };
export type { LocalMoverInput };

export type CompanyTypeBadgeId =
  | 'local-mover'
  | 'carrier'
  | 'broker'
  | 'carrier-broker';

export type CompanyTypeBadge = {
  id: CompanyTypeBadgeId;
  label: string;
  description: string;
  variant: 'local' | 'carrier' | 'broker' | 'mixed';
};

export const LOCAL_MOVER_BADGE: CompanyTypeBadge = {
  id: 'local-mover',
  label: 'Local Mover',
  description: 'Intrastate / local mover — listed on selected county pages only',
  variant: 'local',
};

export const CARRIER_BADGE: CompanyTypeBadge = {
  id: 'carrier',
  label: 'Carrier',
  description: 'FMCSA entity type: Carrier (interstate operating authority)',
  variant: 'carrier',
};

export const BROKER_BADGE: CompanyTypeBadge = {
  id: 'broker',
  label: 'Broker',
  description: 'FMCSA entity type: Broker',
  variant: 'broker',
};

export const CARRIER_BROKER_BADGE: CompanyTypeBadge = {
  id: 'carrier-broker',
  label: 'Carrier/Broker',
  description: 'FMCSA entity type: Carrier and Broker authority',
  variant: 'mixed',
};

export type TypeBadgeInput = LocalMoverInput;

function usdotDigits(value: string | null | undefined): string {
  return (value ?? '').replace(/\D/g, '');
}

function hasUsdot(input: TypeBadgeInput): boolean {
  return usdotDigits(input.usdotNumber).length >= 5;
}

function servicesList(input: TypeBadgeInput): string[] {
  if (!Array.isArray(input.services)) return [];
  return input.services.map((s) => String(s));
}

function servicesSuggestBroker(services: string[]): boolean {
  return services.some((s) => /broker/i.test(s));
}

function servicesSuggestCarrier(services: string[]): boolean {
  return services.some(
    (s) =>
      /^carrier$/i.test(s.trim()) ||
      /carrier\s*\/\s*broker/i.test(s) ||
      /full service/i.test(s)
  );
}

function servicesSuggestMixed(services: string[]): boolean {
  return services.some((s) => /carrier\s*\/\s*broker|broker\s*\/\s*carrier/i.test(s));
}

/** Broker signals from FMCSA raw when entity_type is blank. */
function fmcsaSuggestsBrokerOnly(raw: Record<string, unknown> | null | undefined): boolean {
  if (!raw || typeof raw !== 'object') return false;
  const broker =
    String(raw.brokerAuthorityStatus ?? raw.brokerAuthority ?? '').toUpperCase();
  const common =
    String(raw.commonAuthorityStatus ?? raw.commonAuthority ?? '').toUpperCase();
  const contract =
    String(raw.contractAuthorityStatus ?? raw.contractAuthority ?? '').toUpperCase();
  const brokerActive = /ACTIVE|AUTHORIZED|Y|YES/.test(broker);
  const carrierActive =
    /ACTIVE|AUTHORIZED|Y|YES/.test(common) || /ACTIVE|AUTHORIZED|Y|YES/.test(contract);
  return brokerActive && !carrierActive;
}

function fmcsaSuggestsMixed(raw: Record<string, unknown> | null | undefined): boolean {
  if (!raw || typeof raw !== 'object') return false;
  const broker =
    String(raw.brokerAuthorityStatus ?? raw.brokerAuthority ?? '').toUpperCase();
  const common =
    String(raw.commonAuthorityStatus ?? raw.commonAuthority ?? '').toUpperCase();
  const contract =
    String(raw.contractAuthorityStatus ?? raw.contractAuthority ?? '').toUpperCase();
  const brokerActive = /ACTIVE|AUTHORIZED|Y|YES/.test(broker);
  const carrierActive =
    /ACTIVE|AUTHORIZED|Y|YES/.test(common) || /ACTIVE|AUTHORIZED|Y|YES/.test(contract);
  return brokerActive && carrierActive;
}

function badgeFromEntityLabel(label: string | null | undefined): CompanyTypeBadge | null {
  if (!label || label === 'Not Available') return null;
  const key = label.toUpperCase().replace(/\s+/g, '');
  if (key === 'CARRIER/BROKER' || key === 'BROKER/CARRIER') return CARRIER_BROKER_BADGE;
  if (key === 'BROKER') return BROKER_BADGE;
  if (key === 'CARRIER') return CARRIER_BADGE;
  // Other census types — still show a type badge
  return {
    id: 'carrier',
    label,
    description: `FMCSA entity type: ${label}`,
    variant: 'carrier',
  };
}

function resolveInterstateTypeBadge(input: TypeBadgeInput): CompanyTypeBadge {
  const services = servicesList(input);

  // 1) Stored / resolved entity type (includes fmcsa_raw extract via resolveEntityTypeForDisplay)
  const label =
    resolveEntityTypeForDisplay({
      entityType: input.entityType,
      fmcsaRaw: input.fmcsaRaw ?? null,
      services: services as ServiceType[],
    }) || formatEntityTypeLabel(input.entityType);

  const fromLabel = badgeFromEntityLabel(label);
  if (fromLabel) return fromLabel;

  // 2) Authority flags in fmcsa_raw
  if (fmcsaSuggestsMixed(input.fmcsaRaw)) return CARRIER_BROKER_BADGE;
  if (fmcsaSuggestsBrokerOnly(input.fmcsaRaw)) return BROKER_BADGE;

  // 3) Services tags
  if (servicesSuggestMixed(services)) return CARRIER_BROKER_BADGE;
  if (servicesSuggestBroker(services) && servicesSuggestCarrier(services)) {
    return CARRIER_BROKER_BADGE;
  }
  if (servicesSuggestBroker(services)) return BROKER_BADGE;
  if (services.some((s) => /^carrier$/i.test(s.trim()))) return CARRIER_BADGE;

  // 4) Default for interstate / USDOT companies
  if (hasUsdot(input)) return CARRIER_BADGE;

  // 5) Directory listing with no signals — still show Carrier (main directory = interstate)
  return CARRIER_BADGE;
}

/**
 * Resolve type badges for a company (always returns at least one badge when possible).
 */
export function resolveCompanyTypeBadges(input: TypeBadgeInput): CompanyTypeBadge[] {
  if (isLocalMover(input)) {
    return [LOCAL_MOVER_BADGE];
  }
  return [resolveInterstateTypeBadge(input)];
}

export function resolveCompanyTypeBadgesFromCompany(
  company: Pick<
    Company,
    'serviceScope' | 'entityType' | 'services' | 'usdotNumber' | 'mcNumber'
  > & {
    fmcsaRaw?: Record<string, unknown> | null;
  }
): CompanyTypeBadge[] {
  return resolveCompanyTypeBadges({
    serviceScope: company.serviceScope,
    entityType: company.entityType,
    services: company.services,
    fmcsaRaw: company.fmcsaRaw ?? null,
    usdotNumber: company.usdotNumber,
    mcNumber: company.mcNumber,
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
