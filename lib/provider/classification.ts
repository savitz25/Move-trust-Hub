import { inferProviderCapabilities, type CapabilityInput } from '@/lib/provider/infer-capabilities';
import type {
  ConsumerRole,
  ProviderCapability,
  ProviderClassification,
  PublicationState,
} from '@/lib/provider/types';

const HHG_LABEL: Record<string, string> = {
  hhg_carrier: 'Carrier',
  hhg_broker: 'Broker',
  hhg_carrier_broker: 'Carrier + Broker',
  local_mover: 'Local Mover',
};

const AUTO_LABEL: Record<string, string> = {
  auto_carrier: 'Auto Carrier',
  auto_broker: 'Auto Broker',
  auto_carrier_broker: 'Auto Carrier + Broker',
};

export function resolveConsumerRoles(
  capabilities: readonly ProviderCapability[]
): ConsumerRole[] {
  const set = new Set(capabilities);
  const roles: ConsumerRole[] = [];

  const hhgCarrier = set.has('hhg_interstate_carrier');
  const hhgBroker = set.has('hhg_broker');
  const local = set.has('hhg_intrastate') || set.has('hhg_local');
  const autoCarrier = set.has('auto_carrier');
  const autoBroker = set.has('auto_broker');

  if (hhgCarrier && hhgBroker) roles.push('hhg_carrier_broker');
  else if (hhgCarrier) roles.push('hhg_carrier');
  else if (hhgBroker) roles.push('hhg_broker');
  else if (local) roles.push('local_mover');

  if (autoCarrier && autoBroker) roles.push('auto_carrier_broker');
  else if (autoCarrier) roles.push('auto_carrier');
  else if (autoBroker) roles.push('auto_broker');

  const markets = [hhgCarrier || hhgBroker || local, autoCarrier || autoBroker].filter(Boolean)
    .length;
  if (markets > 1) roles.push('multi_service');

  return roles;
}

export function classifyProvider(input: CapabilityInput): ProviderClassification {
  const capabilities = inferProviderCapabilities(input);
  const roles = resolveConsumerRoles(capabilities);
  const hhgRole = roles.find(
    (role) =>
      role === 'local_mover' ||
      role === 'hhg_carrier' ||
      role === 'hhg_broker' ||
      role === 'hhg_carrier_broker'
  );
  const autoRole = roles.find(
    (role) =>
      role === 'auto_carrier' || role === 'auto_broker' || role === 'auto_carrier_broker'
  );

  const displayRoles = [
    hhgRole ? HHG_LABEL[hhgRole] : null,
    autoRole ? AUTO_LABEL[autoRole] : null,
  ].filter((value): value is string => Boolean(value));

  return {
    capabilities,
    roles,
    hhgLabel: hhgRole ? HHG_LABEL[hhgRole] : null,
    autoLabel: autoRole ? AUTO_LABEL[autoRole] : null,
    displayRoles,
    publicationState: 'CLASSIFIED',
    indexable: false,
    identityReviewRequired: false,
  };
}
