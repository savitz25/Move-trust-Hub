import type { CapabilityInput } from '@/lib/provider/infer-capabilities';
import { classifyProvider } from '@/lib/provider/classification';
import { resolveProviderEligibility } from '@/lib/provider/eligibility';
import type { CapabilityEvidenceState } from '@/lib/provider/types';

export const FMCSA_AGENCY_EXPANDED =
  'FMCSA is the Federal Motor Carrier Safety Administration — the U.S. agency that licenses interstate motor carriers and brokers.';

function authorityBadge(
  verifiedLabel: string,
  inferredLabel: string,
  evidenceState: CapabilityEvidenceState
): string {
  return evidenceState === 'VERIFIED' ? verifiedLabel : inferredLabel;
}

export function regulatoryCopyForProvider(
  input: CapabilityInput,
  options?: {
    evidenceState?: CapabilityEvidenceState;
    networkKind?: 'van_line';
    historicalAuthority?: boolean;
  }
): {
  headline: string;
  badgeLabel: string;
  detail: string;
} {
  const classified = classifyProvider(input);
  const eligibility = resolveProviderEligibility(input);
  const roles = new Set(classified.roles);
  const evidenceState = options?.evidenceState ?? 'INFERRED';
  const vanLineNote =
    options?.networkKind === 'van_line'
      ? ' This listing is a van-line / network brand. Interstate household-goods moves are typically performed by independently authorized agents; do not treat one agent USDOT as the network’s universal authority.'
      : '';
  const historicalNote = options?.historicalAuthority
    ? ' Current FMCSA operating authority for this van-line registrant is inactive; this is historical identity, not an active-authority claim.'
    : '';

  if (roles.has('local_mover') && !eligibility.interstateHhgCarrier) {
    return {
      headline: 'Local / in-state mover',
      badgeLabel: 'Local Mover',
      detail:
        'This listing is a local or in-state household-goods mover. A USDOT number, if present, is a federal registration identifier — it does not by itself mean the company is authorized to perform interstate household-goods moves.',
    };
  }

  if (roles.has('hhg_broker') && !roles.has('hhg_carrier') && !roles.has('hhg_carrier_broker')) {
    return {
      headline: 'Household-goods broker',
      badgeLabel: authorityBadge(
        'Federal HHG Broker Authority Verified',
        'Household-goods broker',
        evidenceState
      ),
      detail:
        'This company arranges household-goods transportation. It is not itself the motor carrier that physically hauls the shipment unless a separate carrier authority is also on file.',
    };
  }

  if (roles.has('hhg_carrier_broker')) {
    return {
      headline: 'Carrier + Broker',
      badgeLabel: authorityBadge(
        'Federal HHG Carrier and Broker Authority Verified',
        'Carrier + Broker',
        evidenceState
      ),
      detail:
        `This company holds both household-goods carrier and broker authority. Confirm in writing whether it will haul the load itself or arrange a third-party carrier.${vanLineNote}${historicalNote}`,
    };
  }

  if (roles.has('hhg_carrier')) {
    return {
      headline: 'Interstate household-goods carrier',
      badgeLabel: authorityBadge(
        'Federal HHG Carrier Authority Verified',
        'Interstate household-goods carrier',
        evidenceState
      ),
      detail:
        `Licensed by the U.S. Department of Transportation for interstate household-goods carriage. Confirm the current SAFER record before booking.${vanLineNote}${historicalNote}`,
    };
  }

  if (roles.has('auto_broker') && !roles.has('auto_carrier') && !roles.has('auto_carrier_broker')) {
    return {
      headline: 'Auto transport broker',
      badgeLabel: authorityBadge(
        'Auto Broker Authority Verified',
        'Auto transport broker',
        evidenceState
      ),
      detail:
        'This company arranges vehicle shipping with independent carriers. It is not itself the trucking carrier unless a separate auto-carrier authority is also on file.',
    };
  }

  if (roles.has('auto_carrier_broker')) {
    return {
      headline: 'Auto Carrier + Broker',
      badgeLabel: authorityBadge(
        'Auto Carrier and Broker Authority Verified',
        'Auto Carrier + Broker',
        evidenceState
      ),
      detail:
        'This company holds both auto-carrier and auto-broker roles. Confirm who will physically transport the vehicle.',
    };
  }

  if (roles.has('auto_carrier')) {
    return {
      headline: 'Auto transport carrier',
      badgeLabel: authorityBadge(
        'Auto Carrier Authority Verified',
        'Auto transport carrier',
        evidenceState
      ),
      detail:
        'This company is classified as an auto-transport carrier from published authority and service evidence. A USDOT registration or generic property authority alone does not verify auto-carrier authority.',
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
