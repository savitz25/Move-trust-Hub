import { FMCSA_CLASSIFICATION_RULE_VERSION, type AuthorityEvent, type CurrentAuthorityFact, type FmcsaClassification, type FmcsaClassificationInput, type FmcsaClassificationResult, type FmcsaReasonCode } from './types';

const active = (authority: CurrentAuthorityFact) => authority.authorityStatus.toLowerCase() === 'active';
const hhgCarrier = (authority: CurrentAuthorityFact) => /motor carrier of household goods/i.test(authority.authorityType);
const hhgBroker = (authority: CurrentAuthorityFact) => /broker of household goods/i.test(authority.authorityType);
const hhgForwarder = (authority: CurrentAuthorityFact) => /freight forwarder of household goods/i.test(authority.authorityType);

function eventDate(event: AuthorityEvent): number {
  if (!event.eventDate) return Number.NEGATIVE_INFINITY;
  const digits = event.eventDate.replace(/\D/g, '').slice(0, 8);
  return digits.length === 8 ? Number(digits) : Number.NEGATIVE_INFINITY;
}

function hasUnresolvedAdverseEvent(authority: CurrentAuthorityFact, events: AuthorityEvent[]): FmcsaReasonCode | null {
  const related = events.filter((event) => event.docketNumber === authority.docketNumber && event.authorityType === authority.authorityType);
  const latestActive = Math.max(...related.filter((event) => event.authorityStatus.toLowerCase() === 'active').map(eventDate), Number.NEGATIVE_INFINITY);
  const adverse = related.filter((event) => /revok|suspend/i.test(`${event.authorityStatus} ${event.reason ?? ''}`)).sort((a, b) => eventDate(b) - eventDate(a))[0];
  if (!adverse || eventDate(adverse) <= latestActive) return null;
  return /suspend/i.test(`${adverse.authorityStatus} ${adverse.reason ?? ''}`) ? 'AUTHORITY_SUSPENDED' : 'AUTHORITY_REVOKED';
}

function carrierFilingConflicts(authority: CurrentAuthorityFact): FmcsaReasonCode[] {
  const conflicts: FmcsaReasonCode[] = [];
  if (authority.cargoRequired === true && authority.cargoOnFile !== true) conflicts.push('MISSING_REQUIRED_CARGO_FILING');
  if ((authority.minimumBipdCoverage ?? 0) > 0 && (authority.bipdOnFile ?? 0) < (authority.minimumBipdCoverage ?? 0)) conflicts.push('MISSING_REQUIRED_BIPD_FILING');
  return conflicts;
}

export function classifyFmcsaProvider(input: FmcsaClassificationInput): FmcsaClassificationResult {
  const reasons: FmcsaReasonCode[] = [];
  const conflicts: FmcsaReasonCode[] = [];
  const supporting = new Set<string>();
  if (input.knownV1Provider) reasons.push('V1_KNOWN_PROVIDER');
  if (input.householdGoodsCargo) reasons.push('HHG_CARGO_REPORTED');
  if (input.censusStatus === 'A') reasons.push('ACTIVE_USDOT');
  if (input.censusStatus === 'I') reasons.push('INACTIVE_USDOT');

  const activeHhgCarriers = input.currentAuthorities.filter((a) => active(a) && hhgCarrier(a));
  const activeHhgBrokers = input.currentAuthorities.filter((a) => active(a) && hhgBroker(a));
  const activeHhgForwarders = input.currentAuthorities.filter((a) => active(a) && hhgForwarder(a));
  const usableCarriers = activeHhgCarriers.filter((authority) => {
    const adverse = hasUnresolvedAdverseEvent(authority, input.authorityEvents);
    if (adverse) conflicts.push(adverse);
    const filing = carrierFilingConflicts(authority);
    conflicts.push(...filing);
    if (!adverse && filing.length === 0) supporting.add(authority.sourceRecordKey);
    return !adverse && filing.length === 0;
  });
  const usableBrokers = activeHhgBrokers.filter((authority) => {
    const adverse = hasUnresolvedAdverseEvent(authority, input.authorityEvents);
    if (adverse) conflicts.push(adverse);
    const funded = authority.bondOnFile === true || input.brokerFinancialResponsibilityReported;
    if (!funded) conflicts.push('MISSING_BROKER_FINANCIAL_RESPONSIBILITY');
    if (!adverse && funded) supporting.add(authority.sourceRecordKey);
    return !adverse && funded;
  });

  const result = (classification: FmcsaClassification): FmcsaClassificationResult => ({
    classification,
    ruleVersion: FMCSA_CLASSIFICATION_RULE_VERSION,
    reasonCodes: [...new Set(reasons)],
    conflictCodes: [...new Set(conflicts)],
    supportingSourceRecordKeys: [...supporting],
  });

  if (input.censusStatus !== 'A') return result(input.censusStatus === 'I' ? 'INACTIVE_ENTITY' : 'NEEDS_REGULATORY_REVIEW');
  if (usableCarriers.length && usableBrokers.length) {
    reasons.push('ACTIVE_INTERSTATE_HHG_AUTHORITY', 'ACTIVE_BROKER_AUTHORITY', 'BROKER_BOND_REPORTED');
    return result('DUAL_ROLE_CARRIER_BROKER');
  }
  if (usableCarriers.length) { reasons.push('ACTIVE_INTERSTATE_HHG_AUTHORITY'); return result('INTERSTATE_CARRIER'); }
  if (usableBrokers.length) { reasons.push('ACTIVE_BROKER_AUTHORITY', 'BROKER_BOND_REPORTED'); return result('AUTHORIZED_BROKER'); }
  if (conflicts.length && (activeHhgCarriers.length || activeHhgBrokers.length)) { reasons.push('SOURCE_CONFLICT'); return result('NEEDS_REGULATORY_REVIEW'); }
  if (activeHhgForwarders.length) { reasons.push('ACTIVE_HHG_FREIGHT_FORWARDER_AUTHORITY'); activeHhgForwarders.forEach((a) => supporting.add(a.sourceRecordKey)); return result('HHG_FREIGHT_FORWARDER'); }
  if (input.householdGoodsCargo || input.knownV1Provider) { reasons.push('NO_INTERSTATE_HHG_AUTHORITY', 'STATE_AUTHORITY_PENDING'); return result('LOCAL_INTRASTATE_CARRIER_CANDIDATE'); }
  return result('NEEDS_REGULATORY_REVIEW');
}

export function preserveAuthorityRows<T>(rows: T[]): T[] { return [...rows]; }

export function preferCurrentMotus<T>(motus: T | undefined, legacy: T | undefined): { current?: T; history: T[] } {
  return { current: motus ?? legacy, history: [legacy, motus].filter((item): item is T => item !== undefined) };
}
