import { isLocalMover, type LocalMoverInput } from '@/lib/companies/is-local-mover';
import { extractCargoCarried, extractEntityType } from '@/lib/fmcsa/carrier-fields';
import { formatEntityTypeLabel } from '@/lib/fmcsa/entity-type-display';
import type { ProviderCapability } from '@/lib/provider/types';

export type CapabilityInput = LocalMoverInput & {
  coverage?: string | null;
  specialties?: readonly string[] | null;
};

function servicesList(input: CapabilityInput): string[] {
  if (!Array.isArray(input.services)) return [];
  return input.services.map((item) => String(item));
}

function hasAutoSignal(input: CapabilityInput): boolean {
  const blob = [
    ...servicesList(input),
    ...(input.specialties ?? []).map(String),
    input.coverage ?? '',
  ]
    .join(' ')
    .toLowerCase();
  return /auto\s*transport|vehicle shipping|car shipping|open transport|enclosed transport/.test(
    blob
  );
}

function hasHhgCargo(input: CapabilityInput): boolean {
  const cargo = input.fmcsaRaw ? extractCargoCarried(input.fmcsaRaw) : null;
  if (!cargo) return false;
  return /household|hhg/i.test(cargo);
}

function hasAutoCargo(input: CapabilityInput): boolean {
  const cargo = input.fmcsaRaw ? extractCargoCarried(input.fmcsaRaw) : null;
  if (!cargo) return false;
  return /motor vehicle|driveaway|carhaul|auto/i.test(cargo);
}

function entityKey(input: CapabilityInput): string {
  const stored = formatEntityTypeLabel(input.entityType);
  const fromRaw = input.fmcsaRaw
    ? formatEntityTypeLabel(extractEntityType(input.fmcsaRaw))
    : null;
  return ((stored || fromRaw || '') as string).toUpperCase().replace(/\s+/g, '');
}

function isBrokerEntity(key: string, services: string[]): boolean {
  if (key === 'BROKER') return true;
  if (key === 'CARRIER/BROKER' || key === 'BROKER/CARRIER') return true;
  return services.some((item) => /broker/i.test(item));
}

function isCarrierEntity(key: string, services: string[]): boolean {
  if (key === 'CARRIER') return true;
  if (key === 'CARRIER/BROKER' || key === 'BROKER/CARRIER') return true;
  return services.some(
    (item) => /^carrier$/i.test(item.trim()) || /carrier\s*\/\s*broker/i.test(item)
  );
}

/**
 * Infer independently stored capabilities. Never collapses Carrier+Broker into a
 * single exclusive type. USDOT registration alone is not interstate HHG authority.
 */
export function inferProviderCapabilities(input: CapabilityInput): ProviderCapability[] {
  const capabilities = new Set<ProviderCapability>();
  const services = servicesList(input);
  const key = entityKey(input);
  const auto = hasAutoSignal(input) || hasAutoCargo(input);
  const hhgCargo = hasHhgCargo(input);
  const local = isLocalMover(input);

  if (local) {
    capabilities.add('hhg_intrastate');
    capabilities.add('hhg_local');
  }

  const broker = isBrokerEntity(key, services);
  const carrier = isCarrierEntity(key, services);

  if (auto) {
    if (broker) capabilities.add('auto_broker');
    if (carrier) capabilities.add('auto_carrier');
    if (!broker && !carrier) {
      if (services.some((item) => /^broker$/i.test(item.trim()))) {
        capabilities.add('auto_broker');
      } else if (services.some((item) => /^carrier$/i.test(item.trim()))) {
        capabilities.add('auto_carrier');
      } else {
        capabilities.add('auto_broker');
      }
    }
  }

  const interstateScope = (input.serviceScope ?? '').toLowerCase() === 'interstate';
  const hasHhgService = services.some((item) =>
    /full service|household|local\s*mover/i.test(item)
  );
  const treatAsHhg = hhgCargo || hasHhgService || local || (interstateScope && !auto);

  if (treatAsHhg && !local) {
    if (broker) capabilities.add('hhg_broker');
    if (carrier) capabilities.add('hhg_interstate_carrier');
  } else if (auto && hasHhgService) {
    if (broker) capabilities.add('hhg_broker');
    if (carrier) capabilities.add('hhg_interstate_carrier');
  }

  return [...capabilities];
}
