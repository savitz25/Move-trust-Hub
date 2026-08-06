/**
 * FMCSA onboarding path classifier (order matters).
 *
 * 1. USDOT not ACTIVE → reject/pending handled elsewhere; do not force local here.
 * 2. Entity BROKER (broker-equivalent) + USDOT ACTIVE → ALWAYS INTERSTATE
 *    (ignore Operating Authority "NOT AUTHORIZED" / None for path selection).
 * 3. Entity CARRIER (not broker) + ACTIVE + no interstate OA → LOCAL / INTRASTATE.
 * 4. ACTIVE + authorized interstate common/contract/broker OA → INTERSTATE.
 *
 * Brokers arrange interstate moves and often lack common/contract carrier authority.
 */

import { extractEntityType } from '@/lib/fmcsa/carrier-fields';

export type AuthorityRoutingInput = {
  /** FMCSA census allowedToOperate (Y/N) */
  allowedToOperate?: string | null;
  usdotStatus?: string | null;
  commonAuthorityStatus?: string | null;
  contractAuthorityStatus?: string | null;
  brokerAuthorityStatus?: string | null;
  /** Human-readable authority string from formatAuthorityStatus / preview */
  authorityStatus?: string | null;
  /** Snapshot-level boolean when available */
  authorityActive?: boolean | null;
  /** FMCSA entity type (BROKER, CARRIER, HHG Broker, etc.) */
  entityType?: string | null;
  /** Optional raw carrier for supplemental authority rows + entity extract */
  fmcsaRaw?: Record<string, unknown> | null;
};

function norm(value: string | null | undefined): string {
  return (value ?? '').trim().toUpperCase();
}

function isActiveAuthorityCode(code: string | null | undefined): boolean {
  const c = norm(code);
  return c === 'A' || c === 'ACTIVE';
}

/**
 * Pure broker / broker-equivalent entity types for interstate onboarding.
 * Does NOT include CARRIER or CARRIER/BROKER mixed types (carriers keep OA rules).
 */
export function isFmcsaBrokerEntity(
  entityType?: string | null,
  fmcsaRaw?: Record<string, unknown> | null
): boolean {
  const labels: string[] = [];
  if (entityType?.trim()) labels.push(entityType);
  if (fmcsaRaw && typeof fmcsaRaw === 'object') {
    const fromRaw = extractEntityType(fmcsaRaw);
    if (fromRaw?.trim()) labels.push(fromRaw);
    const direct = String(
      fmcsaRaw.entityType ?? fmcsaRaw.entity_type ?? ''
    ).trim();
    if (direct) labels.push(direct);
  }

  for (const label of labels) {
    const n = norm(label).replace(/[_/]+/g, ' ').replace(/\s+/g, ' ').trim();
    if (!n || !n.includes('BROKER')) continue;
    // Mixed carrier+broker keeps carrier OA rules
    if (n.includes('CARRIER')) continue;
    // Broker, HHG Broker, Property Broker, Household Goods Broker, Freight Forwarder/Broker, etc.
    return true;
  }

  return false;
}

/** True when any common/contract/broker authority is active. */
export function hasActiveInterstateOperatingAuthority(
  input: AuthorityRoutingInput
): boolean {
  if (input.authorityActive === true) return true;

  if (
    isActiveAuthorityCode(input.commonAuthorityStatus) ||
    isActiveAuthorityCode(input.contractAuthorityStatus) ||
    isActiveAuthorityCode(input.brokerAuthorityStatus)
  ) {
    return true;
  }

  const raw = input.fmcsaRaw;
  if (raw) {
    if (
      isActiveAuthorityCode(String(raw.commonAuthorityStatus ?? '')) ||
      isActiveAuthorityCode(String(raw.contractAuthorityStatus ?? '')) ||
      isActiveAuthorityCode(String(raw.brokerAuthorityStatus ?? ''))
    ) {
      return true;
    }
  }

  const label = norm(input.authorityStatus);
  // Explicit OA positives only — bare "ACTIVE" often means USDOT census, not OA.
  if (
    label &&
    !label.includes('NOT AUTHORIZED') &&
    !label.includes('NONE') &&
    !label.includes('INACTIVE') &&
    (label.includes('COMMON: ACTIVE') ||
      label.includes('CONTRACT: ACTIVE') ||
      label.includes('BROKER: ACTIVE') ||
      label.includes('COMMON:ACTIVE') ||
      label.includes('CONTRACT:ACTIVE') ||
      label.includes('BROKER:ACTIVE'))
  ) {
    return true;
  }

  // Supplemental authority rows often include "AUTHORIZED" wording
  const supplemental = raw?._supplemental;
  if (supplemental && typeof supplemental === 'object') {
    const authRows = (supplemental as { authority?: unknown }).authority;
    if (Array.isArray(authRows)) {
      for (const row of authRows) {
        if (!row || typeof row !== 'object') continue;
        const auth =
          (row as { carrierAuthority?: unknown }).carrierAuthority &&
          typeof (row as { carrierAuthority: unknown }).carrierAuthority === 'object'
            ? ((row as { carrierAuthority: Record<string, unknown> }).carrierAuthority)
            : (row as Record<string, unknown>);
        const status = norm(String(auth.authority ?? auth.status ?? ''));
        if (
          status &&
          !status.includes('NOT') &&
          (status.includes('AUTHORIZED') || status === 'ACTIVE' || status === 'A')
        ) {
          return true;
        }
      }
    }
  }

  return false;
}

/** USDOT census active / allowed to operate. */
export function isFmcsaUsdotActive(input: AuthorityRoutingInput): boolean {
  const status = norm(input.usdotStatus);
  if (status === 'ACTIVE') return true;
  const allowed = norm(input.allowedToOperate);
  return allowed === 'Y' || allowed === 'YES' || allowed === 'ACTIVE';
}

/**
 * Explicit "not authorized" language on authority fields (codes N/None or labels).
 */
export function hasNotAuthorizedAuthoritySignal(input: AuthorityRoutingInput): boolean {
  const codes = [
    input.commonAuthorityStatus,
    input.contractAuthorityStatus,
    input.brokerAuthorityStatus,
  ]
    .map(norm)
    .filter(Boolean);

  if (codes.length > 0 && codes.every((c) => c === 'N' || c === 'NONE' || c === 'I' || c === 'INACTIVE')) {
    return true;
  }

  const label = norm(input.authorityStatus);
  if (!label) {
    // No authority fields at all while USDOT is active → treat as not authorized for interstate
    return codes.length === 0;
  }

  if (
    label.includes('NOT AUTHORIZED') ||
    label.includes('NO AUTHORITY') ||
    label.includes('UNAUTHORIZED') ||
    label === 'NONE' ||
    label === 'INACTIVE' ||
    label === 'REGISTERED' // registered USDOT without OA
  ) {
    return true;
  }

  // e.g. "Common: None · Contract: None · Broker: None"
  if (
    (label.includes('NONE') || label.includes('INACTIVE')) &&
    !label.includes('ACTIVE')
  ) {
    return true;
  }

  return false;
}

/**
 * ACTIVE broker path: interstate directory eligibility regardless of carrier OA.
 */
export function isActiveBrokerInterstatePath(input: AuthorityRoutingInput): boolean {
  return isFmcsaBrokerEntity(input.entityType, input.fmcsaRaw) && isFmcsaUsdotActive(input);
}

/**
 * Force Intrastate / Local onboarding when ACTIVE carrier has no interstate OA.
 * Never forces local for ACTIVE pure brokers (entity type BROKER etc.).
 */
export function shouldForceIntrastateFromAuthority(
  input: AuthorityRoutingInput
): boolean {
  // Rule 2: ACTIVE broker → main /companies interstate path; ignore OA Not Authorized
  if (isActiveBrokerInterstatePath(input)) {
    return false;
  }

  if (hasActiveInterstateOperatingAuthority(input)) {
    return false;
  }

  // Rule 3: Active USDOT carrier (not broker) without interstate OA → local funnel
  if (isFmcsaUsdotActive(input)) {
    return true;
  }

  // Explicit not-authorized wording when USDOT status is missing but OA is clear
  if (hasNotAuthorizedAuthoritySignal(input) && input.authorityActive === false) {
    return true;
  }

  return false;
}

export function forceIntrastateUserMessage(): string {
  return (
    'This USDOT is active (or registered) but FMCSA shows no interstate Operating Authority ' +
    '(Not Authorized). Many legitimate local movers obtain a USDOT for customer trust without ' +
    'applying for interstate authority. We will continue onboarding as Intrastate / Local — ' +
    'county pages only, not the main interstate directory. FMCSA name, address, and phone are kept.'
  );
}

/** UI copy for ACTIVE broker → interstate (do not show county-only blocker). */
export function activeBrokerInterstateUserMessage(): string {
  return (
    'This USDOT is an active FMCSA broker. Brokers are onboarded to the interstate directory ' +
    'even when carrier operating authority is Not Authorized. Brokers arrange interstate moves ' +
    'and often do not hold common or contract carrier authority. Full FMCSA entity type, ' +
    'authority, MC, and address are still stored on the profile.'
  );
}

/** Build routing input from FmcsaSuggestionPreview-like client objects. */
export function authorityRoutingFromSuggestionPreview(preview: {
  usdotStatus?: string | null;
  allowedToOperate?: string | null;
  authorityStatus?: string | null;
  entityType?: string | null;
}): AuthorityRoutingInput {
  return {
    usdotStatus: preview.usdotStatus ?? null,
    allowedToOperate: preview.allowedToOperate ?? null,
    authorityStatus: preview.authorityStatus ?? null,
    entityType: preview.entityType ?? null,
  };
}

/** Build routing input from fmcsa_raw census object. */
export function authorityRoutingFromFmcsaRaw(
  raw: Record<string, unknown> | null | undefined
): AuthorityRoutingInput {
  if (!raw) return {};
  const extracted = extractEntityType(raw);
  return {
    allowedToOperate: String(raw.allowedToOperate ?? raw.allowToOperate ?? ''),
    commonAuthorityStatus: String(raw.commonAuthorityStatus ?? ''),
    contractAuthorityStatus: String(raw.contractAuthorityStatus ?? ''),
    brokerAuthorityStatus: String(raw.brokerAuthorityStatus ?? ''),
    entityType: extracted ?? (String(raw.entityType ?? raw.entity_type ?? '') || null),
    fmcsaRaw: raw,
  };
}
