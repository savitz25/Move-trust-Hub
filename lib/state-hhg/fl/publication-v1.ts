/**
 * Florida household-goods publication qualification V1.
 *
 * Design / QA only. Does not publish companies, mutate canonical contacts,
 * or change Trust Score. Missing FMCSA/USDOT is labeled, never treated as
 * "this mover has no USDOT."
 */

import {
  addressSupportsHomeCounty,
  classifyAddressQuality,
} from '@/lib/state-hhg/discovery/address-quality';
import { isPoBox } from '@/lib/state-hhg/contact-quality';
import {
  isFranchiseOrNetworkBrandName,
  normalizeEmail,
  normalizeLegalName,
  normalizePhone,
  normalizeUsdot,
} from '@/lib/state-hhg/normalize';
import {
  resolveFloridaCounty,
  type CountyResolution,
} from '@/lib/state-hhg/fl/zip-county';

export const FL_PUBLICATION_RULESET_VERSION = 'FL_HHG_PUBLICATION_V1';

export const FL_003_SAFETY = {
  googlePlacesRequests: 0 as const,
  livePublication: false as const,
  canonicalContactsMutated: false as const,
  trustScoreChanged: false as const,
  floridaAuthorityPubliclyExposed: false as const,
  rulesetVersion: FL_PUBLICATION_RULESET_VERSION,
};

export const PUBLICATION_COHORTS = [
  'PUBLICATION_READY',
  'REVIEW_REQUIRED',
  'DUPLICATE_OR_OVERLAP',
  'INSUFFICIENT_IDENTITY',
  'INSUFFICIENT_GEOGRAPHY',
  'STATUS_BLOCKED',
  'BROKER_ONLY',
  'HISTORICAL',
  'OUT_OF_SCOPE',
  'EXISTING_PROVIDER_LINK_CANDIDATE',
] as const;

export type PublicationCohort = (typeof PUBLICATION_COHORTS)[number];

export type IdentityStrength = 'EXACT_UNIQUE' | 'REVIEW_REQUIRED' | 'INSUFFICIENT';

export type FederalIdLabel =
  | 'NO_FEDERAL_ID_IN_CURRENT_MTH_DATA'
  | 'FEDERAL_ID_VERIFIED'
  | 'FEDERAL_ID_REVIEW_REQUIRED';

export type CollisionKind =
  | 'NONE'
  | 'FDACS_INTERNAL_DUPLICATE'
  | 'EXISTING_COMPANY_EXACT'
  | 'ALREADY_LINKED_EXISTING_PROVIDER'
  | 'FRANCHISE_WITHOUT_USDOT';

export const REVIEW_BUCKETS = [
  'likely_existing_provider_overlap',
  'franchise_ambiguity',
  'shared_contact',
  'name_collision',
  'geography_conflict',
  'state_source_duplicate',
  'other',
] as const;

export type ReviewBucket = (typeof REVIEW_BUCKETS)[number];

export type QualificationInput = {
  regulatoryId: string;
  licenseType: 'IM' | 'MB' | string;
  status: 'active' | 'expired' | 'revoked' | 'unknown' | string;
  statusRaw?: string | null;
  legalName: string;
  dbaName?: string | null;
  physicalStreet?: string | null;
  physicalCity?: string | null;
  physicalState?: string | null;
  physicalPostalCode?: string | null;
  physicalAddress?: string | null;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  usdotNumber?: string | null;
  mcNumber?: string | null;
  existingCompanyId?: string | null;
  existingPublicationState?: string | null;
  existingIndexable?: boolean | null;
  alreadyLinkedViaAuthority?: boolean;
  matchDecision?: 'VERIFIED' | 'REVIEW_REQUIRED' | 'NOT_FOUND' | 'NOT_APPLICABLE' | string | null;
  matchMethod?: string | null;
  matchReviewReason?: string | null;
  duplicateGroupId?: string | null;
  duplicateKind?: 'definite' | 'probable' | null;
  duplicateSurvivor?: boolean;
};

export type QualificationResult = {
  rulesetVersion: typeof FL_PUBLICATION_RULESET_VERSION;
  regulatoryId: string;
  cohort: PublicationCohort;
  reasons: string[];
  identityStrength: IdentityStrength;
  collision: CollisionKind;
  federalIdLabel: FederalIdLabel;
  county: CountyResolution;
  existingCompanyId: string | null;
  reviewBucket: ReviewBucket | null;
  websiteRequired: false;
  emailRequired: false;
  phoneRequired: false;
  fmcsaRequired: false;
  googlePlacesRequests: 0;
};

export type CollisionIndex = {
  byNameAddress: Map<string, string[]>;
};

export type DuplicateGroup = {
  id: string;
  kind: 'definite' | 'probable';
  evidence: string;
  regulatoryIds: string[];
  survivorRegulatoryId: string | null;
};

function digits(value: string | null | undefined): string {
  return String(value ?? '').replace(/\D/g, '');
}

function hasUsableStreet(street: string | null | undefined): boolean {
  const t = String(street ?? '').replace(/\s+/g, ' ').trim();
  if (t.length < 8) return false;
  return /\d/.test(t);
}

function floridaState(value: string | null | undefined): boolean {
  return String(value ?? '').trim().toUpperCase() === 'FL';
}

function nameAddressKey(
  legalName: string,
  street: string,
  city: string,
  zip: string
): string {
  return [
    normalizeLegalName(legalName) ?? '',
    String(street)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, ' ')
      .trim(),
    String(city)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, ' ')
      .trim(),
    digits(zip).slice(0, 5),
  ].join('|');
}

export function federalIdLabelFor(row: Pick<QualificationInput, 'usdotNumber' | 'mcNumber'>): FederalIdLabel {
  const usdot = normalizeUsdot(row.usdotNumber);
  const mc = String(row.mcNumber ?? '').trim();
  if (usdot) return 'FEDERAL_ID_VERIFIED';
  if (mc) return 'FEDERAL_ID_REVIEW_REQUIRED';
  if (String(row.usdotNumber ?? '').trim()) return 'FEDERAL_ID_REVIEW_REQUIRED';
  return 'NO_FEDERAL_ID_IN_CURRENT_MTH_DATA';
}

export function classifyReviewBucket(input: {
  cohort: PublicationCohort;
  collision: CollisionKind;
  matchReviewReason?: string | null;
  countyConfidence?: CountyResolution['confidence'];
  franchise?: boolean;
}): ReviewBucket | null {
  if (input.cohort !== 'REVIEW_REQUIRED' && input.collision !== 'FDACS_INTERNAL_DUPLICATE') {
    if (input.cohort !== 'INSUFFICIENT_IDENTITY' || !input.franchise) {
      if (input.cohort !== 'DUPLICATE_OR_OVERLAP') return null;
    }
  }
  const reason = String(input.matchReviewReason ?? '');
  if (input.collision === 'FRANCHISE_WITHOUT_USDOT' || reason.includes('franchise') || input.franchise) {
    return 'franchise_ambiguity';
  }
  if (input.collision === 'FDACS_INTERNAL_DUPLICATE' || reason.includes('duplicate')) {
    return 'state_source_duplicate';
  }
  if (reason.includes('collision') || reason.includes('name')) return 'name_collision';
  if (reason.includes('shared') || reason.includes('phone') || reason.includes('email')) {
    return 'shared_contact';
  }
  if (input.countyConfidence === 'COUNTY_REVIEW_REQUIRED' || reason.includes('geograph')) {
    return 'geography_conflict';
  }
  if (reason.includes('existing') || input.collision === 'EXISTING_COMPANY_EXACT') {
    return 'likely_existing_provider_overlap';
  }
  if (input.cohort === 'REVIEW_REQUIRED') return 'other';
  return null;
}

export function buildCollisionIndex(rows: QualificationInput[]): CollisionIndex {
  const byNameAddress = new Map<string, string[]>();
  for (const row of rows) {
    const street = row.physicalStreet ?? row.physicalAddress ?? '';
    if (!hasUsableStreet(street) || !row.physicalCity || digits(row.physicalPostalCode).length < 5) {
      continue;
    }
    const key = nameAddressKey(row.legalName, street, row.physicalCity, row.physicalPostalCode ?? '');
    const list = byNameAddress.get(key) ?? [];
    list.push(row.regulatoryId);
    byNameAddress.set(key, list);
  }
  return { byNameAddress };
}

export function detectFdacsDuplicateGroups(rows: QualificationInput[]): DuplicateGroup[] {
  const groups: DuplicateGroup[] = [];
  const seen = new Set<string>();

  const pushGroup = (
    kind: DuplicateGroup['kind'],
    evidence: string,
    members: QualificationInput[]
  ) => {
    const ids = [...new Set(members.map((m) => m.regulatoryId))].sort();
    if (ids.length < 2) return;
    const key = `${kind}:${ids.join(',')}`;
    if (seen.has(key)) return;
    seen.add(key);
    groups.push({
      id: `dup-${groups.length + 1}`,
      kind,
      evidence,
      regulatoryIds: ids,
      survivorRegulatoryId: kind === 'definite' ? ids[0]! : null,
    });
  };

  const byNameAddr = new Map<string, QualificationInput[]>();
  const byNamePhone = new Map<string, QualificationInput[]>();
  const byNameEmail = new Map<string, QualificationInput[]>();
  const byPhone = new Map<string, QualificationInput[]>();
  const byEmail = new Map<string, QualificationInput[]>();
  const byAddr = new Map<string, QualificationInput[]>();

  for (const row of rows) {
    const legal = normalizeLegalName(row.legalName);
    const street = row.physicalStreet ?? row.physicalAddress ?? '';
    const zip = digits(row.physicalPostalCode).slice(0, 5);
    const phone = normalizePhone(row.phone);
    const email = normalizeEmail(row.email);
    if (legal && hasUsableStreet(street) && zip.length === 5) {
      const key = nameAddressKey(row.legalName, street, row.physicalCity ?? '', zip);
      byNameAddr.set(key, [...(byNameAddr.get(key) ?? []), row]);
      const addrKey = `${street.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()}|${zip}`;
      byAddr.set(addrKey, [...(byAddr.get(addrKey) ?? []), row]);
    }
    if (legal && phone) {
      byNamePhone.set(`${legal}|${phone}`, [...(byNamePhone.get(`${legal}|${phone}`) ?? []), row]);
      byPhone.set(phone, [...(byPhone.get(phone) ?? []), row]);
    }
    if (legal && email) {
      byNameEmail.set(`${legal}|${email}`, [...(byNameEmail.get(`${legal}|${email}`) ?? []), row]);
      byEmail.set(email, [...(byEmail.get(email) ?? []), row]);
    }
  }

  for (const members of byNameAddr.values()) pushGroup('definite', 'legal_name_and_address', members);
  for (const members of byNamePhone.values()) pushGroup('definite', 'legal_name_and_phone', members);
  for (const members of byNameEmail.values()) pushGroup('definite', 'legal_name_and_email', members);

  for (const members of byPhone.values()) {
    const names = new Set(members.map((m) => normalizeLegalName(m.legalName)));
    if (names.size > 1) pushGroup('probable', 'shared_phone_different_legal_name', members);
  }
  for (const members of byEmail.values()) {
    const names = new Set(members.map((m) => normalizeLegalName(m.legalName)));
    if (names.size > 1) pushGroup('probable', 'shared_email_different_legal_name', members);
  }
  for (const members of byAddr.values()) {
    const names = new Set(members.map((m) => normalizeLegalName(m.legalName)));
    if (names.size > 1) pushGroup('probable', 'shared_address_different_legal_name', members);
  }

  return groups;
}

function identityStrength(row: QualificationInput): IdentityStrength {
  const legal = normalizeLegalName(row.legalName);
  if (!legal || legal.length < 3) return 'INSUFFICIENT';
  const franchise =
    isFranchiseOrNetworkBrandName(row.legalName) || isFranchiseOrNetworkBrandName(row.dbaName);
  const usdot = normalizeUsdot(row.usdotNumber);
  if (franchise && !usdot) return 'INSUFFICIENT';
  const streetOk = hasUsableStreet(row.physicalStreet ?? row.physicalAddress);
  const zipOk = digits(row.physicalPostalCode).length >= 5;
  if (streetOk && zipOk) return 'EXACT_UNIQUE';
  if (streetOk || zipOk) return 'REVIEW_REQUIRED';
  return 'INSUFFICIENT';
}

function collisionFor(row: QualificationInput, index: CollisionIndex | undefined): CollisionKind {
  const franchise =
    isFranchiseOrNetworkBrandName(row.legalName) || isFranchiseOrNetworkBrandName(row.dbaName);
  if (franchise && !normalizeUsdot(row.usdotNumber)) return 'FRANCHISE_WITHOUT_USDOT';
  if (row.existingCompanyId && row.alreadyLinkedViaAuthority) {
    return 'ALREADY_LINKED_EXISTING_PROVIDER';
  }
  if (row.existingCompanyId && row.matchDecision === 'VERIFIED' && !row.alreadyLinkedViaAuthority) {
    return 'EXISTING_COMPANY_EXACT';
  }
  if (row.duplicateGroupId && row.duplicateKind === 'definite' && row.duplicateSurvivor === false) {
    return 'FDACS_INTERNAL_DUPLICATE';
  }
  if (row.duplicateGroupId && row.duplicateKind === 'probable') {
    return 'FDACS_INTERNAL_DUPLICATE';
  }
  if (!index) return 'NONE';
  const street = row.physicalStreet ?? row.physicalAddress ?? '';
  if (hasUsableStreet(street) && row.physicalCity && digits(row.physicalPostalCode).length >= 5) {
    const key = nameAddressKey(row.legalName, street, row.physicalCity, row.physicalPostalCode ?? '');
    const peers = (index.byNameAddress.get(key) ?? []).filter((id) => id !== row.regulatoryId);
    if (peers.length > 0) return 'FDACS_INTERNAL_DUPLICATE';
  }
  return 'NONE';
}

export function qualifyFloridaPublicationCandidate(
  row: QualificationInput,
  opts?: { collisionIndex?: CollisionIndex; county?: CountyResolution }
): QualificationResult {
  const reasons: string[] = [];
  const county =
    opts?.county ??
    resolveFloridaCounty({
      zip: row.physicalPostalCode,
      city: row.physicalCity,
      street: row.physicalStreet,
      fullAddress: row.physicalAddress,
    });
  const strength = identityStrength(row);
  const collision = collisionFor(row, opts?.collisionIndex);
  const federalIdLabel = federalIdLabelFor(row);
  const franchise =
    isFranchiseOrNetworkBrandName(row.legalName) || isFranchiseOrNetworkBrandName(row.dbaName);
  const quality = classifyAddressQuality(row.physicalAddress ?? row.physicalStreet);

  const base = {
    rulesetVersion: FL_PUBLICATION_RULESET_VERSION as typeof FL_PUBLICATION_RULESET_VERSION,
    regulatoryId: row.regulatoryId,
    identityStrength: strength,
    collision,
    federalIdLabel,
    county,
    existingCompanyId: row.existingCompanyId ?? null,
    websiteRequired: false as const,
    emailRequired: false as const,
    phoneRequired: false as const,
    fmcsaRequired: false as const,
    googlePlacesRequests: 0 as const,
  };

  const finish = (cohort: PublicationCohort, extraReasons: string[]): QualificationResult => {
    const allReasons = [...reasons, ...extraReasons];
    return {
      ...base,
      cohort,
      reasons: allReasons,
      reviewBucket: classifyReviewBucket({
        cohort,
        collision,
        matchReviewReason: row.matchReviewReason ?? allReasons.join('; '),
        countyConfidence: county.confidence,
        franchise,
      }),
    };
  };

  if (String(row.licenseType).toUpperCase() === 'MB') {
    return finish('BROKER_ONLY', ['Intrastate household-goods broker (MB) is out of mover-publication scope.']);
  }

  if (String(row.status) === 'expired') {
    return finish('HISTORICAL', ['FDACS registration is expired.']);
  }
  if (String(row.status) === 'revoked') {
    return finish('STATUS_BLOCKED', ['FDACS registration is revoked.']);
  }
  if (String(row.status) !== 'active') {
    return finish('STATUS_BLOCKED', [
      `FDACS status "${row.status}" is not an active IM registration.`,
    ]);
  }

  if (String(row.licenseType).toUpperCase() !== 'IM') {
    return finish('OUT_OF_SCOPE', [
      `License type ${row.licenseType} is outside Florida IM mover scope.`,
    ]);
  }

  if (!String(row.regulatoryId).startsWith('FL-FDACS-IM-')) {
    return finish('INSUFFICIENT_IDENTITY', ['Missing stable FDACS IM regulatory id.']);
  }

  if (!normalizeLegalName(row.legalName)) {
    return finish('INSUFFICIENT_IDENTITY', ['Legal name is missing after normalization.']);
  }

  if (collision === 'ALREADY_LINKED_EXISTING_PROVIDER') {
    return finish('DUPLICATE_OR_OVERLAP', [
      `Already linked to existing company ${row.existingCompanyId} (${row.existingPublicationState ?? 'unknown publication_state'}).`,
    ]);
  }

  if (collision === 'EXISTING_COMPANY_EXACT') {
    return finish('EXISTING_PROVIDER_LINK_CANDIDATE', [
      `Exact identity match to existing MoveTrustHub company ${row.existingCompanyId}; do not create a second canonical company.`,
    ]);
  }

  if (collision === 'FRANCHISE_WITHOUT_USDOT') {
    return finish('INSUFFICIENT_IDENTITY', [
      'Franchise / national brand name is not unique identity without USDOT.',
    ]);
  }

  if (collision === 'FDACS_INTERNAL_DUPLICATE') {
    if (row.duplicateKind === 'probable') {
      return finish('REVIEW_REQUIRED', [
        'Shared phone, email, or address with a different FDACS legal name; fail-closed, no auto-merge.',
      ]);
    }
    return finish('DUPLICATE_OR_OVERLAP', [
      'Another FDACS registration shares corroborated legal name and contact/address evidence.',
    ]);
  }

  if (row.matchDecision === 'REVIEW_REQUIRED') {
    return finish('REVIEW_REQUIRED', [
      `Identity match is REVIEW_REQUIRED (${row.matchReviewReason ?? 'fail-closed'}); no fuzzy merge.`,
    ]);
  }

  if (strength === 'INSUFFICIENT') {
    return finish('INSUFFICIENT_IDENTITY', [
      'Legal name plus Florida physical identity is not strong enough for a unique company record.',
    ]);
  }

  if (isPoBox(row.physicalAddress ?? row.physicalStreet) || quality === 'PO_BOX') {
    return finish('INSUFFICIENT_GEOGRAPHY', ['Physical location is a PO Box, not an operating address.']);
  }

  if (!addressSupportsHomeCounty(quality) && !hasUsableStreet(row.physicalStreet ?? row.physicalAddress)) {
    return finish('INSUFFICIENT_GEOGRAPHY', ['Florida physical street address is missing or incomplete.']);
  }

  if (!floridaState(row.physicalState)) {
    return finish('INSUFFICIENT_GEOGRAPHY', ['Physical address is not a Florida location.']);
  }

  if (!hasUsableStreet(row.physicalStreet ?? row.physicalAddress) || !row.physicalCity) {
    return finish('INSUFFICIENT_GEOGRAPHY', ['Florida physical street address is missing or incomplete.']);
  }

  if (county.confidence === 'COUNTY_UNRESOLVED') {
    return finish('INSUFFICIENT_GEOGRAPHY', [county.evidence]);
  }
  if (county.confidence === 'COUNTY_REVIEW_REQUIRED') {
    return finish('REVIEW_REQUIRED', [county.evidence]);
  }

  const readyReasons = [
    'Active Florida IM registration with unique identity and COUNTY_VERIFIED geography.',
  ];
  if (federalIdLabel === 'NO_FEDERAL_ID_IN_CURRENT_MTH_DATA') {
    readyReasons.push(
      'No FMCSA/USDOT number in current MoveTrustHub data; not treated as proof that no USDOT exists.'
    );
  } else if (federalIdLabel === 'FEDERAL_ID_VERIFIED') {
    readyReasons.push('Federal identifier present in current MoveTrustHub data.');
  } else {
    readyReasons.push('Federal identifier present but needs review; Florida IM eligibility does not require it.');
  }
  if (!normalizeEmail(row.email)) {
    readyReasons.push('Email is absent; allowed when identity and location are complete.');
  }
  if (!normalizePhone(row.phone)) {
    readyReasons.push('Phone is absent; allowed when identity and location are complete.');
  }
  if (!String(row.website ?? '').trim()) {
    readyReasons.push('Website is not required for publication readiness.');
  }

  return finish('PUBLICATION_READY', readyReasons);
}

export function selectPublicationReadySample<T extends { regulatoryId: string; county?: string | null; email?: string | null; legalName?: string }>(
  rows: T[],
  n = 50
): T[] {
  const sorted = [...rows].sort((a, b) => a.regulatoryId.localeCompare(b.regulatoryId));
  if (sorted.length <= n) return sorted;
  const buckets = new Map<string, T[]>();
  for (const row of sorted) {
    const key = row.county || '_none';
    buckets.set(key, [...(buckets.get(key) ?? []), row]);
  }
  const picked: T[] = [];
  const used = new Set<string>();
  const take = (row: T | undefined) => {
    if (!row || used.has(row.regulatoryId) || picked.length >= n) return;
    used.add(row.regulatoryId);
    picked.push(row);
  };
  for (const list of buckets.values()) take(list[0]);
  const noEmail = sorted.filter((r) => !normalizeEmail(r.email ?? null));
  const gmail = sorted.filter((r) => /@(gmail|yahoo|hotmail|aol)\./i.test(r.email ?? ''));
  const corporate = sorted.filter((r) => r.email && !/@(gmail|yahoo|hotmail|aol|outlook)\./i.test(r.email));
  for (const list of [noEmail, gmail, corporate]) {
    take(list[0]);
    take(list[Math.floor(list.length / 2)]);
  }
  let i = 0;
  while (picked.length < n && i < sorted.length) {
    take(sorted[i]);
    i += Math.max(1, Math.floor(sorted.length / n));
  }
  for (const row of sorted) take(row);
  return picked.slice(0, n);
}
