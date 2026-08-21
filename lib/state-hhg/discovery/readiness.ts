/**
 * NEW_PROVIDER_CANDIDATE readiness segmentation for 011D.2 preparation.
 * Does NOT create canonical providers. Publication: 0.
 */
import {
  addressSupportsHomeCounty,
  classifyAddressQuality,
} from '@/lib/state-hhg/discovery/address-quality';
import type {
  NewProviderReadiness,
  NewProviderReadinessRow,
} from '@/lib/state-hhg/discovery/types';
import { isFranchiseOrNetworkBrandName } from '@/lib/state-hhg/normalize';

export type NewProviderCandidateInput = {
  stagingKey: string;
  stateCode: 'FL' | 'WA';
  authorityNumber: string | null;
  legalName: string | null;
  dba: string | null;
  disposition: string;
  statusNormalized: string;
  authorityStatus?: string | null;
  roleClass: string;
  usdot: string | null;
  phone: string | null;
  email: string | null;
  physicalAddress: string | null;
  city?: string | null;
  postalCode?: string | null;
  /** When already geocoded via Census (not Google). */
  countyFips?: string | null;
  geocodeStatus?: string | null;
  reviewReason?: string | null;
  identityConflict?: boolean;
};

const STATE_FIPS = { FL: '12', WA: '53' } as const;

export function classifyNewProviderReadiness(
  input: NewProviderCandidateInput
): NewProviderReadinessRow {
  const notes: string[] = [];
  const addressRaw = input.physicalAddress;
  const quality = classifyAddressQuality(addressRaw);
  const franchiseHold =
    isFranchiseOrNetworkBrandName(input.legalName) ||
    isFranchiseOrNetworkBrandName(input.dba);
  const active =
    (input.authorityStatus ?? input.statusNormalized ?? '').toLowerCase() ===
      'active' ||
    input.statusNormalized.toLowerCase() === 'active';

  const expected = STATE_FIPS[input.stateCode];
  const geocodeOk =
    (input.geocodeStatus === 'MATCH' || input.geocodeStatus === 'TIE') &&
    Boolean(input.countyFips) &&
    String(input.countyFips).startsWith(expected);
  const homeCountyResolvable =
    addressSupportsHomeCounty(quality) && geocodeOk;

  let readiness: NewProviderReadiness;

  if (!active || input.statusNormalized.toLowerCase() === 'inactive') {
    readiness = 'INACTIVE_HOLD';
    notes.push('authority_not_active');
  } else if (
    franchiseHold ||
    input.disposition === 'REVIEW_REQUIRED' ||
    input.identityConflict ||
    input.reviewReason ||
    input.roleClass === 'broker'
  ) {
    readiness = 'REVIEW_REQUIRED';
    if (franchiseHold) notes.push('franchise_or_network_brand_fail_closed');
    if (input.roleClass === 'broker') notes.push('broker_only');
    if (input.identityConflict) notes.push('identity_conflict');
    if (input.reviewReason) notes.push(`review:${input.reviewReason}`);
  } else if (!addressSupportsHomeCounty(quality) || !homeCountyResolvable) {
    readiness = 'ADDRESS_UNRESOLVED';
    notes.push(`address_quality_${quality}`);
    if (!geocodeOk) notes.push('geocode_unresolved_or_out_of_state');
  } else if (!input.phone || !String(input.phone).trim()) {
    // 011D.1/011D.2A canonicalization rule: phone required
    readiness = 'ADDRESS_UNRESOLVED';
    notes.push('phone_required_missing');
  } else if (!input.authorityNumber || !input.legalName) {
    readiness = 'REVIEW_REQUIRED';
    notes.push('missing_authority_or_legal_name');
  } else {
    readiness = 'READY_FOR_CANONICALIZATION';
    notes.push('active_authority');
    notes.push('physical_operating_or_business_address');
    notes.push('home_county_resolvable');
    notes.push('phone_present');
    notes.push('mover_role');
    notes.push('not_franchise_hold');
  }

  return {
    stagingKey: input.stagingKey,
    stateCode: input.stateCode,
    authorityNumber: input.authorityNumber,
    legalName: input.legalName,
    dba: input.dba,
    disposition: input.disposition,
    statusNormalized: input.statusNormalized,
    roleClass: input.roleClass,
    usdot: input.usdot,
    phone: input.phone,
    email: input.email,
    physicalAddress: addressRaw,
    addressQuality: quality,
    homeCountyResolvable,
    franchiseHold,
    readiness,
    notes,
  };
}

export function summarizeReadiness(rows: readonly NewProviderReadinessRow[]) {
  const by: Record<NewProviderReadiness, number> = {
    READY_FOR_CANONICALIZATION: 0,
    REVIEW_REQUIRED: 0,
    INACTIVE_HOLD: 0,
    ADDRESS_UNRESOLVED: 0,
  };
  let withPhone = 0;
  let withEmail = 0;
  let withDba = 0;
  let withUsdot = 0;
  let physicalOk = 0;
  let homeResolvable = 0;
  let active = 0;

  for (const r of rows) {
    by[r.readiness]++;
    if (r.phone) withPhone++;
    if (r.email) withEmail++;
    if (r.dba) withDba++;
    if (r.usdot) withUsdot++;
    if (
      r.addressQuality === 'PHYSICAL_OPERATING' ||
      r.addressQuality === 'BUSINESS_ADDRESS'
    ) {
      physicalOk++;
    }
    if (r.homeCountyResolvable) homeResolvable++;
    if (r.statusNormalized.toLowerCase() === 'active') active++;
  }

  return {
    total: rows.length,
    readiness: by,
    activeAuthority: active,
    physicalOperatingAddress: physicalOk,
    resolvableHomeCounty: homeResolvable,
    phone: withPhone,
    email: withEmail,
    dba: withDba,
    usdot: withUsdot,
  };
}

/** 011D.2 canonicalization gate — design only, not executed here. */
export const CANONICALIZATION_RULE_011D2 = {
  requiredFields: [
    'state_authority_number',
    'legal_name',
    'physical_address',
    'phone',
    'state_regulator_source',
  ] as const,
  optionalHelpful: ['dba', 'usdot', 'email'] as const,
  usdotRequired: false,
  franchisePolicy:
    'Fail-closed: local franchise authority belongs to local regulated entity; do not collapse into parent brand.',
  duplicatePrevention: [
    'same state authority number',
    'same legal entity',
    'same verified state record',
  ] as const,
  publicationRequires: [
    'canonical identity resolved',
    'active VERIFIED state mover authority',
    'appropriate mover role',
    'not broker-only',
    'not review-required',
    'safe operating location',
    'at least VERIFIED_HOME_COUNTY',
  ] as const,
} as const;
