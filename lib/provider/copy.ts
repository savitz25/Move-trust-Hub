import type { CapabilityInput } from '@/lib/provider/infer-capabilities';
import { classifyProvider } from '@/lib/provider/classification';
import { resolveProviderEligibility } from '@/lib/provider/eligibility';

export const FMCSA_AGENCY_EXPANDED =
  'FMCSA is the Federal Motor Carrier Safety Administration — the U.S. agency that licenses interstate motor carriers and brokers.';

export function regulatoryCopyForProvider(input: CapabilityInput): {
  headline: string;
  badgeLabel: string;
  detail: string;
} {
  const classified = classifyProvider(input);
  const eligibility = resolveProviderEligibility(input);
  const roles = new Set(classified.roles);

  if (roles.has('local_mover') && !eligibility.interstateHhgCarrier) {
    return {
      headline: 'Local / in-state mover',
      badgeLabel: 'Business Identity Verified',
      detail:
        'This listing is a local or in-state household-goods mover. A USDOT number, if present, is a federal registration identifier — it does not by itself mean the company is authorized to perform interstate household-goods moves.',
    };
  }

  if (roles.has('hhg_broker') && !roles.has('hhg_carrier') && !roles.has('hhg_carrier_broker')) {
    return {
      headline: 'Household-goods broker',
      badgeLabel: 'Federal HHG Broker Authority Verified',
      detail:
        'This company arranges household-goods transportation. It is not itself the motor carrier that physically hauls the shipment unless a separate carrier authority is also on file.',
    };
  }

  if (roles.has('hhg_carrier_broker')) {
    return {
      headline: 'Carrier + Broker',
      badgeLabel: 'Federal HHG Carrier and Broker Authority Verified',
      detail:
        'This company holds both household-goods carrier and broker authority. Confirm in writing whether it will haul the load itself or arrange a third-party carrier.',
    };
  }

  if (roles.has('hhg_carrier')) {
    return {
      headline: 'Interstate household-goods carrier',
      badgeLabel: 'Federal HHG Carrier Authority Verified',
      detail:
        'Licensed by the U.S. Department of Transportation for interstate household-goods carriage. Confirm the current SAFER record before booking.',
    };
  }

  if (roles.has('auto_broker') && !roles.has('auto_carrier') && !roles.has('auto_carrier_broker')) {
    return {
      headline: 'Auto transport broker',
      badgeLabel: 'Auto Broker Authority Verified',
      detail:
        'This company arranges vehicle shipping with independent carriers. It is not itself the trucking carrier unless a separate auto-carrier authority is also on file.',
    };
  }

  if (roles.has('auto_carrier_broker')) {
    return {
      headline: 'Auto Carrier + Broker',
      badgeLabel: 'Auto Carrier and Broker Authority Verified',
      detail:
        'This company holds both auto-carrier and auto-broker roles. Confirm who will physically transport the vehicle.',
    };
  }

  if (roles.has('auto_carrier')) {
    return {
      headline: 'Auto transport carrier',
      badgeLabel: 'Auto Carrier Authority Verified',
      detail:
        'This company is classified as an auto-transport carrier from published authority and service evidence.',
    };
  }

  return {
    headline: 'Listed provider',
    badgeLabel: 'Business Identity Verified',
    detail:
      'Regulatory claims are limited to authorities actually on file. USDOT registration is not by itself interstate household-goods or auto-transport authority.',
  };
}

export function shouldShowHouseholdMovePrice(input: CapabilityInput): boolean {
  const classified = classifyProvider(input);
  const autoOnly =
    classified.roles.some((role) => role.startsWith('auto_')) &&
    !classified.roles.some(
      (role) =>
        role === 'hhg_carrier' ||
        role === 'hhg_broker' ||
        role === 'hhg_carrier_broker' ||
        role === 'local_mover'
    );
  return !autoOnly;
}
