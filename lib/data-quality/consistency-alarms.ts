/**
 * Phase 2 — classification consistency alarms for public output quality.
 * Alarms flag problems; blocking rules must not invent regulatory facts.
 */

import type { Company } from '@/types';
import type { LocalMover } from '@/lib/local-movers/types';
import { hasActiveDotLicense } from '@/lib/trust/verification-status';

export type DataQualityAlarm = {
  code: string;
  severity: 'flag' | 'block';
  message: string;
};

export type AlarmSubject = {
  name: string;
  serviceScope?: string | null;
  coverage?: string | null;
  entityType?: string | null;
  services?: string[];
  shortDescription?: string;
  description?: string;
  usdotNumber?: string | null;
  mcNumber?: string | null;
  authorityActive?: boolean | null;
  outOfService?: boolean;
  usdotStatus?: string | null;
  overallRating?: number;
  reviewCount?: number;
  isVerified?: boolean;
  isLocalOnly?: boolean;
};

function textBlob(s: AlarmSubject): string {
  return [s.shortDescription, s.description, s.name].filter(Boolean).join(' ').toLowerCase();
}

/** Broker language that falsely implies the broker operates trucks. */
export function brokerImpliesHauling(text: string): boolean {
  const t = text.toLowerCase();
  if (!/\bbroker\b/.test(t)) return false;
  return (
    /\bour\s+trucks?\b/.test(t) ||
    /\bwe\s+haul\b/.test(t) ||
    /\bwe\s+transport\s+your\b/.test(t) ||
    /\bour\s+crew\s+loads\b/.test(t) ||
    /\bcompany\s+owned\s+fleet\b/.test(t)
  );
}

export function evaluateDataQualityAlarms(subject: AlarmSubject): DataQualityAlarm[] {
  const alarms: DataQualityAlarm[] = [];
  const scope = (subject.serviceScope || '').toLowerCase();
  const coverage = (subject.coverage || '').toLowerCase();
  const entity = (subject.entityType || '').toLowerCase();
  const services = (subject.services || []).map((s) => s.toLowerCase());
  const isLocal =
    subject.isLocalOnly ||
    scope === 'intrastate' ||
    services.includes('local mover');
  const isBroker =
    (entity.includes('broker') && !entity.includes('carrier')) ||
    (services.includes('broker') && !services.some((s) => s.includes('carrier')));

  // Local + all 50 states
  if (
    isLocal &&
    (coverage.includes('all 50') || coverage === 'continental us' || coverage.includes('nationwide'))
  ) {
    alarms.push({
      code: 'local_with_national_coverage',
      severity: 'flag',
      message:
        'Local / intrastate classification conflicts with national (All 50 States) coverage claim',
    });
  }

  if (isBroker && brokerImpliesHauling(textBlob(subject))) {
    alarms.push({
      code: 'broker_implies_hauling',
      severity: 'flag',
      message:
        'Broker listing text implies physical hauling — brokers arrange transportation with carriers',
    });
  }

  const oos =
    subject.outOfService === true ||
    (subject.usdotStatus || '').toUpperCase().includes('OUT OF SERVICE') ||
    subject.authorityActive === false ||
    (subject.usdotStatus || '').toUpperCase() === 'INACTIVE';

  if (oos && subject.isVerified) {
    alarms.push({
      code: 'verified_while_oos_or_inactive',
      severity: 'block',
      message:
        'Cannot present FMCSA Verified / directory verified while authority is inactive or out of service',
    });
  }

  if ((subject.overallRating ?? 0) > 0 && (subject.reviewCount ?? 0) <= 0) {
    alarms.push({
      code: 'rating_without_review_volume',
      severity: 'flag',
      message: 'Star rating present without review volume / source basis',
    });
  }

  return alarms;
}

export function evaluateCompanyAlarms(company: Company): DataQualityAlarm[] {
  return evaluateDataQualityAlarms({
    name: company.name,
    serviceScope: company.serviceScope,
    coverage: company.coverage,
    entityType: company.entityType,
    services: company.services as string[],
    shortDescription: company.shortDescription,
    description: company.description,
    usdotNumber: company.usdotNumber,
    mcNumber: company.mcNumber,
    authorityActive: company.authorityActive,
    outOfService: company.outOfService,
    usdotStatus: company.usdotStatus,
    overallRating: company.overallRating,
    reviewCount: company.reviewCount,
    isVerified: company.isVerified,
  });
}

export function evaluateLocalMoverAlarms(mover: LocalMover): DataQualityAlarm[] {
  return evaluateDataQualityAlarms({
    name: mover.name,
    serviceScope: mover.isLocalOnly ? 'intrastate' : undefined,
    entityType: mover.entityType,
    services: mover.services,
    shortDescription: mover.shortDescription,
    usdotNumber: mover.usdotNumber,
    mcNumber: mover.mcNumber,
    authorityActive: mover.authorityActive,
    outOfService: mover.outOfService,
    usdotStatus: mover.usdotStatus,
    overallRating: mover.rating,
    reviewCount: mover.reviewCount,
    isLocalOnly: mover.isLocalOnly,
  });
}

/**
 * Whether public UI may show Directory / FMCSA Verified style presentation.
 * Blocks OOS / inactive authority regardless of stored isVerified flag.
 */
export function allowVerifiedPresentation(company: {
  usdotNumber?: string | null;
  mcNumber?: string | null;
  authorityActive?: boolean | null;
  outOfService?: boolean;
  usdotStatus?: string | null;
  isVerified?: boolean;
}): boolean {
  if (company.outOfService) return false;
  if (company.authorityActive === false) return false;
  const status = (company.usdotStatus || '').toUpperCase();
  if (status.includes('OUT OF SERVICE') || status === 'INACTIVE' || status === 'REVOKED') {
    return false;
  }
  // Prefer live DOT license check when fields exist
  try {
    if (
      company.usdotNumber &&
      !hasActiveDotLicense({
        usdotNumber: company.usdotNumber || '',
        mcNumber: company.mcNumber || '',
        authorityActive: company.authorityActive,
        outOfService: company.outOfService,
        usdotStatus: company.usdotStatus as 'ACTIVE' | 'OUT OF SERVICE' | 'INACTIVE' | null,
      })
    ) {
      // Incomplete data: do not block solely on missing authority flags
      if (company.authorityActive === false || company.outOfService) return false;
    }
  } catch {
    // ignore
  }
  return true;
}

export function hasBlockingAlarms(alarms: DataQualityAlarm[]): boolean {
  return alarms.some((a) => a.severity === 'block');
}
