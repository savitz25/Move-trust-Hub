/**
 * Task 011A — regulatory eligibility for intrastate moves.
 * Fail closed. Federal USDOT alone never qualifies a state-only move when state authority is required.
 * State authority never qualifies an interstate move.
 */
import type {
  IntrastateEligibilityInput,
  IntrastateEligibilityResult,
  ProviderStateAuthorityRecord,
  StateAuthorityRequirement,
  StateRegulatorySourceMatrixRow,
} from '@/lib/state-hhg/types';

function normState(code: string): string {
  return code.trim().toUpperCase();
}

export function classifyMoveJurisdiction(
  originState: string,
  destinationState: string
): IntrastateEligibilityResult['moveKind'] {
  return normState(originState) === normState(destinationState)
    ? 'same_state_intrastate'
    : 'interstate';
}

function isUsableAuthority(row: ProviderStateAuthorityRecord, asOfIso: string): boolean {
  if (row.verificationState !== 'VERIFIED') return false;
  if (row.status === 'suspended' || row.status === 'revoked' || row.status === 'inactive') {
    return false;
  }
  if (row.status === 'expired') return false;
  if (row.expirationDate && row.expirationDate < asOfIso.slice(0, 10)) return false;
  return row.status === 'active';
}

/**
 * isProviderEligibleForIntrastateMove(provider, state)
 *
 * Same-state: require verified state authority when the matrix says YES/CONDITIONAL.
 * Interstate: this function returns not-eligible for intrastate path; callers use FMCSA HHG.
 */
export function isProviderEligibleForIntrastateMove(
  input: IntrastateEligibilityInput,
  matrixRow: Pick<
    StateRegulatorySourceMatrixRow,
    'intrastateHhgAuthorityRequired' | 'stateCode'
  >,
  options?: { asOf?: string }
): IntrastateEligibilityResult {
  const moveKind = classifyMoveJurisdiction(input.originState, input.destinationState);
  const asOf = options?.asOf ?? new Date().toISOString();

  if (moveKind === 'interstate') {
    return {
      eligible: false,
      moveKind,
      reason:
        'Interstate moves require FMCSA household-goods eligibility — state authority does not qualify interstate carriage.',
      requiredState: null,
      authority: null,
    };
  }

  const requiredState = normState(input.originState);
  if (requiredState !== normState(matrixRow.stateCode)) {
    return {
      eligible: false,
      moveKind,
      reason: 'matrix_row_state_mismatch',
      requiredState,
      authority: null,
    };
  }

  const requirement: StateAuthorityRequirement = matrixRow.intrastateHhgAuthorityRequired;

  if (requirement === 'UNKNOWN') {
    return {
      eligible: false,
      moveKind,
      reason: 'state_authority_requirement_unknown_fail_closed',
      requiredState,
      authority: null,
    };
  }

  if (requirement === 'NO') {
    // Still fail closed on identity: require at least one non-historical state observation or explicit waiver path later.
    return {
      eligible: false,
      moveKind,
      reason:
        'state_does_not_require_mover_license_but_011a_still_blocks_auto_publish_without_explicit_policy',
      requiredState,
      authority: null,
    };
  }

  const authorities = input.stateAuthorities.filter(
    (row) =>
      normState(row.stateCode) === requiredState &&
      (row.authorityType === 'intrastate_hhg_carrier' ||
        row.authorityType === 'intrastate_mover_registration' ||
        row.authorityType === 'intrastate_certificate' ||
        row.authorityType === 'local_mover_license')
  );

  const usable = authorities.find((row) => isUsableAuthority(row, asOf)) ?? null;
  if (!usable) {
    return {
      eligible: false,
      moveKind,
      reason: 'missing_verified_active_state_hhg_authority',
      requiredState,
      authority: null,
    };
  }

  // USDOT alone is never enough — we already required VERIFIED state authority above.
  return {
    eligible: true,
    moveKind,
    reason: 'verified_state_authority',
    requiredState,
    authority: usable,
  };
}

/** What does NOT qualify a normal local mover listing. */
export const LOCAL_PUBLICATION_DISQUALIFIERS = [
  'has_usdot_only',
  'nearby_geography_only',
  'power_units_only',
  'website_only',
  'name_contains_moving',
  'google_reviews_only',
  'inferred_capability_without_state_authority',
  'federal_hhg_authority_alone_for_state_only_move',
  'expired_or_revoked_state_authority',
  'identity_review_required',
] as const;

/** What DOES qualify (future publication gate). */
export const LOCAL_PUBLICATION_REQUIREMENTS = [
  'state_authority_verified_where_required',
  'acceptable_identity_confidence',
  'current_active_status',
  'appropriate_mover_role_not_broker_only_unless_broker_product',
  'derived_geography_only_after_eligibility_gate',
] as const;
