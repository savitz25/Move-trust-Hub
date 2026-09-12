import issue from './association-discrepancy.json';
import type { Company } from '@/types';

export type AssociationIntegrity = {
  status: 'under_review' | 'source_changed_review_required';
  issueId: string;
  recordId: string;
  observedMc: string | null;
  observedAt: string | null;
  observedFingerprint: string | null;
  disputedMc: string;
  officialObservedUsdot: string;
  sourceAsOf: string;
  officialObservedMc: string;
  officialObservedAt: string;
  corroboratedUsdot: string | null;
  officialUrl: string | null;
  message: string;
};

/** One MC observation only. MX, FF and multiple dockets are separate relationships. */
export function mcValue(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  return value.trim().match(/^(?:MC[-\s]*)?(\d{1,8})$/i)?.[1] ?? null;
}

export function associationIntegrity(input: {
  id: string;
  usdot?: string | null;
  mc?: string | null;
  checkedAt?: string | null;
  fingerprint?: string | null;
  previous?: AssociationIntegrity;
}): AssociationIntegrity | undefined {
  if (!issue.recordIds.includes(input.id)) return undefined;
  // Re-projection retains the observation while the trusted field remains empty.
  const observedMc = input.mc ? mcValue(input.mc) ?? input.mc : input.previous?.observedMc ?? null;
  const fingerprint = input.fingerprint ?? input.previous?.observedFingerprint ?? null;
  const changed = input.usdot !== issue.expected.usdot || observedMc !== issue.expected.mc ||
    Boolean(fingerprint && fingerprint !== issue.expected.fingerprint);
  const corroboratedUsdot = input.usdot === issue.official.usdot ? input.usdot : null;
  return {
    status: changed ? 'source_changed_review_required' : 'under_review',
    issueId: issue.id,
    recordId: input.id,
    observedMc,
    observedAt: input.checkedAt ?? input.previous?.observedAt ?? null,
    observedFingerprint: fingerprint,
    disputedMc: issue.expected.mc,
    officialObservedUsdot: issue.official.usdot,
    sourceAsOf: issue.official.asOf,
    officialObservedMc: issue.official.mc,
    officialObservedAt: issue.official.retrievedAt,
    corroboratedUsdot,
    officialUrl: corroboratedUsdot ? issue.official.url : null,
    message: corroboratedUsdot
      ? 'The stored MC association is under review. It is not a confirmed MC relationship or a finding about the business authorization. The corroborated USDOT identity remains available for research.'
      : 'The source identity changed after an MC association review. A fresh source review is required before confirming this relationship; the earlier identifiers have not been substituted.',
  };
}

/** Raw observations remain in provenance, never trusted MC fields. No automatic expiry. */
export function projectCompanyAssociation<T extends Pick<Company, 'id' | 'usdotNumber' | 'mcNumber'> & {
  identifierIntegrity?: AssociationIntegrity;
  fmcsaLastChecked?: string | null;
}>(company: T): T {
  const integrity = associationIntegrity({
    id: company.id, usdot: company.usdotNumber, mc: company.mcNumber,
    checkedAt: company.fmcsaLastChecked, previous: company.identifierIntegrity,
  });
  return integrity ? { ...company, mcNumber: '', identifierIntegrity: integrity } : company;
}

/** Legacy equality cannot authorize a join through an association awaiting review. */
export function associationAllowsMc(integrity: AssociationIntegrity | undefined): boolean {
  return !integrity;
}

export const reviewedAssociationRecordIds: readonly string[] = issue.recordIds;
