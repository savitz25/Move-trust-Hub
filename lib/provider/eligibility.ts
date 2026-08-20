import type { CapabilityInput } from '@/lib/provider/infer-capabilities';
import { classifyProvider } from '@/lib/provider/classification';
import type { ProviderEligibility } from '@/lib/provider/types';

function isActiveAuthority(input: CapabilityInput): boolean {
  const company = input as CapabilityInput & {
    authorityActive?: boolean | null;
    outOfService?: boolean | null;
    usdotStatus?: string | null;
  };
  if (company.outOfService) return false;
  const status = (company.usdotStatus ?? '').toUpperCase();
  if (status === 'OUT OF SERVICE' || status === 'INACTIVE') return false;
  if (company.authorityActive === false) return false;
  return true;
}

/**
 * USDOT registration is not interstate HHG authority.
 * Property authority is not proof of consumer auto transport.
 * State/local listings are not interstate HHG eligibility.
 */
export function resolveProviderEligibility(
  input: CapabilityInput & {
    authorityActive?: boolean | null;
    outOfService?: boolean | null;
    usdotStatus?: string | null;
  }
): ProviderEligibility {
  const classified = classifyProvider(input);
  const caps = new Set(classified.capabilities);
  const active = isActiveAuthority(input);
  const reasons: string[] = [];

  const interstateHhgCarrier = caps.has('hhg_interstate_carrier') && active;
  if (caps.has('hhg_interstate_carrier') && !active) {
    reasons.push('HHG carrier capability is present but authority is not active.');
  }
  if (!caps.has('hhg_interstate_carrier') && (input.usdotNumber ?? '').replace(/\D/g, '')) {
    reasons.push('USDOT registration alone does not grant interstate household-goods carrier authority.');
  }

  const interstateHhgBroker = caps.has('hhg_broker') && active;
  const intrastateHhg = caps.has('hhg_intrastate') || caps.has('hhg_local');
  const autoTransport =
    (caps.has('auto_carrier') || caps.has('auto_broker')) &&
    (active || Boolean(input.services?.some((item) => /auto/i.test(String(item)))));

  if (caps.has('auto_carrier') || caps.has('auto_broker')) {
    reasons.push('Auto classification requires auto-transport service evidence, not property authority alone.');
  }

  return {
    interstateHhgCarrier,
    interstateHhgBroker,
    intrastateHhg,
    autoTransport,
    reasons,
  };
}

export function isEligibleInterstateHhgCarrier(
  input: Parameters<typeof resolveProviderEligibility>[0]
): boolean {
  return resolveProviderEligibility(input).interstateHhgCarrier;
}
