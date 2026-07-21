/**
 * Route carriers with USDOT but no interstate operating authority into the
 * Intrastate / Local onboarding funnel.
 *
 * Common pattern: local movers register a USDOT (often ACTIVE) for legitimacy
 * but never obtain Common/Contract/Broker operating authority.
 */

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
  /** Optional raw carrier for supplemental authority rows */
  fmcsaRaw?: Record<string, unknown> | null;
};

function norm(value: string | null | undefined): string {
  return (value ?? '').trim().toUpperCase();
}

function isActiveAuthorityCode(code: string | null | undefined): boolean {
  const c = norm(code);
  return c === 'A' || c === 'ACTIVE';
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
 * Business rule: USDOT active (or registered) + no interstate operating authority
 * → force Intrastate / Local onboarding.
 *
 * Local movers often keep an ACTIVE USDOT without Common/Contract/Broker OA.
 */
export function shouldForceIntrastateFromAuthority(
  input: AuthorityRoutingInput
): boolean {
  if (hasActiveInterstateOperatingAuthority(input)) {
    return false;
  }

  // Active / allowed-to-operate USDOT without interstate OA → local funnel
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

/** Build routing input from FmcsaSuggestionPreview-like client objects. */
export function authorityRoutingFromSuggestionPreview(preview: {
  usdotStatus?: string | null;
  allowedToOperate?: string | null;
  authorityStatus?: string | null;
}): AuthorityRoutingInput {
  return {
    usdotStatus: preview.usdotStatus ?? null,
    allowedToOperate: preview.allowedToOperate ?? null,
    authorityStatus: preview.authorityStatus ?? null,
  };
}

/** Build routing input from fmcsa_raw census object. */
export function authorityRoutingFromFmcsaRaw(
  raw: Record<string, unknown> | null | undefined
): AuthorityRoutingInput {
  if (!raw) return {};
  return {
    allowedToOperate: String(raw.allowedToOperate ?? raw.allowToOperate ?? ''),
    commonAuthorityStatus: String(raw.commonAuthorityStatus ?? ''),
    contractAuthorityStatus: String(raw.contractAuthorityStatus ?? ''),
    brokerAuthorityStatus: String(raw.brokerAuthorityStatus ?? ''),
    fmcsaRaw: raw,
  };
}
