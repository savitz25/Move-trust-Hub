import { NJ_MOVE_PUBLIC_SNAPSHOT } from './public-snapshot';
import {
  fmcsaActiveImpliesNjLicensed,
  mapNjPmwClass,
  njLicenseImpliesFmcsaInterstate,
  pwOnlyAppearsInConsumerMoverSearch,
} from './adapter';

export const NJ_MOVE_INTEL_VERSION = 'nj-move-002-public-v1';
export const NJ_MOVE_PUBLIC_PATH = '/new-jersey';
export const NJ_MOVE_PUBLIC_FINGERPRINT =
  '1e451e11970e4c0dbe602422a283d1b426708ac15cc89ddd397b10c3f20df248';

export type NjMovePublicSnapshot = typeof NJ_MOVE_PUBLIC_SNAPSHOT;

export type NjProfileMatch = 'EXACT' | 'HIGH_CONFIDENCE' | 'REVIEW_REQUIRED' | 'UNRESOLVED' | 'NONE';

export type NjProfileEvidence = {
  match: NjProfileMatch;
  render: boolean;
  attachments: Array<{
    kind: 'license_identity' | 'regulatory';
    label: string;
    detail: string;
    adverse: boolean;
  }>;
  njLicensedBadge: false;
  njUnlicensedBadge: false;
};

export function assertNjMovePublicSnapshot(
  value: NjMovePublicSnapshot = NJ_MOVE_PUBLIC_SNAPSHOT,
): NjMovePublicSnapshot {
  if (value.version !== NJ_MOVE_INTEL_VERSION) {
    throw new Error(`Unexpected NJ move contract ${value.version}`);
  }
  if (value.fingerprint !== NJ_MOVE_PUBLIC_FINGERPRINT) {
    throw new Error('NJ move public snapshot fingerprint drifted');
  }
  if (value.authority.licenseCountPublished !== null) {
    throw new Error('Missing PM/PW/PC roster must stay unknown, not a published count');
  }
  if (value.osm.years['2025'].novs !== 11 || value.osm.years['2024'].novs !== 23) {
    throw new Error('Operation Safe Move acquired NOV counts drifted');
  }
  if (value.osm.rows.length !== 34) {
    throw new Error('Source-level OSM rows must be 11 + 23');
  }
  if (value.osm.years['2023'].respondents !== null) {
    throw new Error('2023 highlight count must not invent a respondent table');
  }
  if (value.profileAttachments.length !== 0) {
    throw new Error('This snapshot has no production-approved NJ profile attachments');
  }
  if (value.publication.rankings || value.publication.trustScore) {
    throw new Error('NJ publication must not rank or score');
  }
  if (pwOnlyAppearsInConsumerMoverSearch() || njLicenseImpliesFmcsaInterstate() || fmcsaActiveImpliesNjLicensed()) {
    throw new Error('NJ authority invariants broken');
  }
  if (mapNjPmwClass('PW')?.consumerMoverSearch !== false) {
    throw new Error('PW-only must not appear as a consumer mover');
  }
  return value;
}

export function selectNjPmwProfileEvidence(input: {
  usdot?: string | null;
  njLicenseNumber?: string | null;
  legalName?: string | null;
  city?: string | null;
}): NjProfileEvidence {
  assertNjMovePublicSnapshot();
  const empty: NjProfileEvidence = {
    match: 'NONE',
    render: false,
    attachments: [],
    njLicensedBadge: false,
    njUnlicensedBadge: false,
  };
  if (input.njLicenseNumber && /^\S+$/.test(input.njLicenseNumber)) {
    return empty;
  }
  if (input.usdot && input.njLicenseNumber) {
    return empty;
  }
  if (input.legalName && input.city) {
    return { ...empty, match: 'REVIEW_REQUIRED' };
  }
  if (input.legalName) {
    return { ...empty, match: 'UNRESOLVED' };
  }
  return empty;
}

export { NJ_MOVE_PUBLIC_SNAPSHOT };
