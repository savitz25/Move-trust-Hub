/**
 * Centralized company type badges for directory / profile / county UI.
 *
 * Geography (Local / Regional) is decided separately on county pages.
 * These badges describe FMCSA-style entity role:
 * - Local / Intrastate
 * - Interstate Carrier (operates trucks under motor carrier authority)
 * - Broker (arranges transportation; does not itself act as the hauling carrier)
 * - Carrier + Broker (both authorities — never imply broker alone hauls)
 *
 * Priority:
 * 1. service_scope = intrastate (or isLocalOnly) → Local / Intrastate
 * 2. Infer local when no USDOT and no carrier/broker signals
 * 3. entity_type / fmcsa_raw / services → Interstate Carrier | Broker | both
 * 4. USDOT is registration only — never treat it as HHG carrier if broker-only
 * 5. Multiple markets (HHG + auto) emit multiple badges on one canonical company
 */

import {
  companyResolvesAsLocalMover,
  isLocalMover,
  type LocalMoverInput,
} from '@/lib/companies/is-local-mover';
import { classifyProvider } from '@/lib/provider/classification';
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
  | 'carrier-broker'
  | 'auto-carrier'
  | 'auto-broker'
  | 'auto-carrier-broker';

export type CompanyTypeBadge = {
  id: CompanyTypeBadgeId;
  label: string;
  description: string;
  variant: 'local' | 'carrier' | 'broker' | 'mixed';
};

export const LOCAL_MOVER_BADGE: CompanyTypeBadge = {
  id: 'local-mover',
  label: 'Local / Intrastate',
  description:
    'Primarily local or in-state household goods service — not an FMCSA interstate motor carrier listing by itself',
  variant: 'local',
};

export const CARRIER_BADGE: CompanyTypeBadge = {
  id: 'carrier',
  label: 'Interstate Carrier',
  description:
    'Motor carrier — authorized to operate commercial trucks and transport household goods under its own operating authority (verify on FMCSA SAFER)',
  variant: 'carrier',
};

export const BROKER_BADGE: CompanyTypeBadge = {
  id: 'broker',
  label: 'Broker',
  description:
    'Household goods broker — arranges transportation with carriers; does not itself operate as the motor carrier hauling your goods. Confirm who holds the USDOT/MC on your estimate and who will physically transport the shipment.',
  variant: 'broker',
};

export const CARRIER_BROKER_BADGE: CompanyTypeBadge = {
  id: 'carrier-broker',
  label: 'Carrier + Broker',
  description:
    'Holds both motor carrier and broker authority. Still confirm in writing whether the company you hired will haul the load itself or arrange a third-party carrier.',
  variant: 'mixed',
};

export const AUTO_CARRIER_BADGE: CompanyTypeBadge = {
  id: 'auto-carrier',
  label: 'Auto Carrier',
  description: 'Auto-transport carrier — physically hauls vehicles under published carrier authority.',
  variant: 'carrier',
};

export const AUTO_BROKER_BADGE: CompanyTypeBadge = {
  id: 'auto-broker',
  label: 'Auto Broker',
  description:
    'Auto-transport broker — arranges vehicle shipping; does not itself act as the hauling carrier unless a separate carrier authority is on file.',
  variant: 'broker',
};

export const AUTO_CARRIER_BROKER_BADGE: CompanyTypeBadge = {
  id: 'auto-carrier-broker',
  label: 'Auto Carrier + Broker',
  description: 'Holds both auto-carrier and auto-broker roles. Confirm who will transport the vehicle.',
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

  // 4) USDOT is registration, not HHG carrier authority. Only default to
  // Carrier when there is no broker signal.
  if (hasUsdot(input) && servicesSuggestBroker(services) && !servicesSuggestCarrier(services)) {
    return BROKER_BADGE;
  }
  if (hasUsdot(input) && !servicesSuggestBroker(services)) return CARRIER_BADGE;

  // 5) Directory listing with no signals — still show Carrier (main directory = interstate)
  return CARRIER_BADGE;
}

/**
 * Resolve type badges for a company (always returns at least one badge when possible).
 * Carrier + Broker is derived from independent capabilities, not a single stored type.
 */
export function resolveCompanyTypeBadges(input: TypeBadgeInput): CompanyTypeBadge[] {
  const classified = classifyProvider(input);
  const badges: CompanyTypeBadge[] = [];
  for (const role of classified.roles) {
    if (role === 'local_mover') badges.push(LOCAL_MOVER_BADGE);
    if (role === 'hhg_carrier') badges.push(CARRIER_BADGE);
    if (role === 'hhg_broker') badges.push(BROKER_BADGE);
    if (role === 'hhg_carrier_broker') badges.push(CARRIER_BROKER_BADGE);
    if (role === 'auto_carrier') badges.push(AUTO_CARRIER_BADGE);
    if (role === 'auto_broker') badges.push(AUTO_BROKER_BADGE);
    if (role === 'auto_carrier_broker') badges.push(AUTO_CARRIER_BROKER_BADGE);
  }
  if (badges.length) return badges;
  if (isLocalMover(input)) return [LOCAL_MOVER_BADGE];
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
