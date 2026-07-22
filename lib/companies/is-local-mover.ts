/**
 * Shared Local Mover detection for type badges + directory filters.
 * Safe to import from both without circular deps on derive-directory-services.
 */

import { extractEntityType } from '@/lib/fmcsa/carrier-fields';
import {
  formatEntityTypeLabel,
} from '@/lib/fmcsa/entity-type-display';
import type { Company, ServiceType } from '@/types';

export type LocalMoverInput = {
  serviceScope?: string | null;
  entityType?: string | null;
  services?: Array<string | ServiceType> | null;
  fmcsaRaw?: Record<string, unknown> | null;
  usdotNumber?: string | null;
  mcNumber?: string | null;
  isLocalOnly?: boolean;
};

function usdotDigits(value: string | null | undefined): string {
  return (value ?? '').replace(/\D/g, '');
}

function hasUsdot(input: LocalMoverInput): boolean {
  return usdotDigits(input.usdotNumber).length >= 5;
}

function servicesList(input: LocalMoverInput): string[] {
  if (!Array.isArray(input.services)) return [];
  return input.services.map((s) => String(s));
}

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

function hasCarrierOrBrokerSignal(input: LocalMoverInput): boolean {
  const entity = formatEntityTypeLabel(input.entityType);
  if (entity && entity !== 'Not Available') return true;
  if (input.fmcsaRaw) {
    const fromRaw = formatEntityTypeLabel(extractEntityType(input.fmcsaRaw));
    if (fromRaw && fromRaw !== 'Not Available') return true;
    if (fmcsaSuggestsBrokerOnly(input.fmcsaRaw) || fmcsaSuggestsMixed(input.fmcsaRaw)) {
      return true;
    }
  }
  const services = servicesList(input);
  if (services.some((s) => /broker/i.test(s))) return true;
  if (services.some((s) => /^carrier$/i.test(s.trim()))) return true;
  if (services.some((s) => /carrier\s*\/\s*broker|broker\s*\/\s*carrier/i.test(s))) {
    return true;
  }
  return false;
}

/**
 * Local when: explicit intrastate flag, Local Mover service tag, or no USDOT + no
 * carrier/broker signals (handles missing service_scope column).
 */
export function isLocalMover(input: LocalMoverInput): boolean {
  if (input.isLocalOnly) return true;
  const services = servicesList(input);
  if (services.some((s) => /^local\s*mover$/i.test(s.trim()))) return true;
  const scope = (input.serviceScope ?? '').toLowerCase().trim();
  if (scope === 'intrastate') return true;
  if (scope === 'interstate') {
    return !hasUsdot(input) && !hasCarrierOrBrokerSignal(input);
  }
  return !hasUsdot(input) && !hasCarrierOrBrokerSignal(input);
}

export function companyResolvesAsLocalMover(
  company: Pick<
    Company,
    'serviceScope' | 'entityType' | 'services' | 'usdotNumber' | 'mcNumber'
  > & {
    fmcsaRaw?: Record<string, unknown> | null;
    isLocalOnly?: boolean;
  }
): boolean {
  return isLocalMover({
    serviceScope: company.serviceScope,
    entityType: company.entityType,
    services: company.services,
    fmcsaRaw: company.fmcsaRaw ?? null,
    usdotNumber: company.usdotNumber,
    mcNumber: company.mcNumber,
    isLocalOnly: company.isLocalOnly,
  });
}
