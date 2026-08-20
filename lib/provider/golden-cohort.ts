/** Inspectable Task 001 golden cohort — existing records, not fake production entities. */
export const PROVIDER_FOUNDATION_GOLDEN_COHORT = [
  { id: 'montway-auto-transport', expect: 'auto_broker' },
  { id: 'local-intrastate', expect: 'local_mover', note: 'Any companies.service_scope=intrastate row' },
  { id: 'carrier-only', expect: 'hhg_carrier', note: 'entity_type CARRIER without broker' },
  { id: 'broker-only', expect: 'hhg_broker', note: 'entity_type BROKER without Auto Transport' },
  { id: 'carrier-broker', expect: 'hhg_carrier_broker', note: 'entity_type CARRIER/BROKER' },
  { id: 'auto-carrier', expect: 'auto_carrier', note: 'Auto Transport + Carrier specialty fleet' },
  { id: 'hhg-plus-auto', expect: 'multi_service', note: 'Full Service + Auto Transport on one company id' },
  { id: 'inactive', expect: 'INACTIVE', note: 'out_of_service or authority_active=false' },
  { id: 'usdot-125563-cluster', expect: 'REVIEW_REQUIRED', note: 'Shared placeholder USDOT across national brands' },
] as const;
