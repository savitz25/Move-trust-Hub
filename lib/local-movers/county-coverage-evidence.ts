/**
 * County coverage evidence.
 *
 * An owner-selected county is not evidence of service when the selection is a
 * blanket. A selection is a blanket when either signal is true:
 * - the company has at least BLANKET_SELF_SELECTED_COUNTY_THRESHOLD
 *   owner-selected counties in that state, or
 * - the headquarters county is known, and this county is neither the
 *   headquarters county nor adjacent to it.
 *
 * The threshold is the audit signal for a statewide self-selection (50+
 * counties in one state). Adjacency inside that blanket is not separate
 * evidence, because a statewide click includes neighbors automatically.
 *
 * These still count, including inside a blanket:
 * - a service-area record for this county
 * - discovery evidence for this county
 * - the headquarters county itself
 * - system assignment sources (onboarding approval or onboarding coverage)
 *
 * Verified state authority, or a state-level service area, shows the company
 * may operate in the state. It is not county evidence. It keeps an
 * owner-selected county only when the company is under the blanket threshold.
 *
 * When the headquarters county cannot be resolved, the selection is not
 * treated as adjacent or as the headquarters county. It does not count
 * unless verified state-level evidence exists and the selection is under
 * the blanket threshold.
 *
 * Individually evidenced counties are kept when a company serves many
 * counties. Unsupported selections do not count toward listing or indexability.
 * Company profiles still show the owner-stated list, labeled as such.
 */

export const BLANKET_SELF_SELECTED_COUNTY_THRESHOLD = 50;

const OWNER_SELECTED_ASSIGNMENT_SOURCES = new Set([
  'local_intrastate_selection',
  'local_intrastate',
  'intrastate',
  'repair_local_county_placement',
]);

const SYSTEM_ASSIGNMENT_SOURCES = new Set(['onboarding_approval', 'onboarding_coverage']);

export type CountyCoverageFacts = {
  source?: string | null;
  ownerSelectedCountyCountInState: number;
  headquartersKnown: boolean;
  headquartersCounty: boolean;
  adjacentToHeadquarters: boolean;
  serviceAreaForCounty: boolean;
  discoveryForCounty: boolean;
  /** Verified state authority or a state-level service area. Not a county. */
  stateLevelEvidence: boolean;
};

export type CountyCoverageDecision = {
  counts: boolean;
  reason: string;
};

/** Missing source fails closed as owner-selected. Production rows carry a source. */
export function isOwnerSelectedAssignmentSource(source: string | null | undefined): boolean {
  if (!source) return true;
  return OWNER_SELECTED_ASSIGNMENT_SOURCES.has(source) || source.includes('local_intrastate');
}

export function isSystemAssignmentSource(source: string | null | undefined): boolean {
  return Boolean(source && SYSTEM_ASSIGNMENT_SOURCES.has(source));
}

export function countyAssignmentCountsAsCoverage(
  facts: CountyCoverageFacts
): CountyCoverageDecision {
  if (facts.serviceAreaForCounty) return { counts: true, reason: 'service_area' };
  if (facts.discoveryForCounty) return { counts: true, reason: 'discovery' };
  if (facts.headquartersCounty) return { counts: true, reason: 'headquarters_county' };
  if (isSystemAssignmentSource(facts.source)) {
    return { counts: true, reason: 'system_assignment' };
  }

  const blanket =
    facts.ownerSelectedCountyCountInState >= BLANKET_SELF_SELECTED_COUNTY_THRESHOLD;
  const knownNonAdjacent =
    facts.headquartersKnown && !facts.headquartersCounty && !facts.adjacentToHeadquarters;

  if (blanket) return { counts: false, reason: 'blanket_owner_selection' };

  if (knownNonAdjacent && facts.stateLevelEvidence) {
    return { counts: true, reason: 'state_level_evidence' };
  }
  if (knownNonAdjacent) return { counts: false, reason: 'not_adjacent_to_headquarters' };

  if (facts.adjacentToHeadquarters) {
    return { counts: true, reason: 'adjacent_to_headquarters' };
  }
  if (!facts.headquartersKnown) {
    if (facts.stateLevelEvidence) return { counts: true, reason: 'state_level_evidence' };
    return { counts: false, reason: 'owner_selection_headquarters_unknown' };
  }
  if (facts.stateLevelEvidence) return { counts: true, reason: 'state_level_evidence' };
  return { counts: false, reason: 'unsupported_owner_selection' };
}

/**
 * Static seed and statewide catalog fills.
 * A repeated paste of the same mover across a state is not county evidence.
 * Headquarters and adjacency still count below the blanket threshold.
 * No company names are special-cased.
 */
export function seedSlotCountsAsCoverage(facts: {
  countiesInState: number;
  headquartersKnown: boolean;
  headquartersCounty: boolean;
  adjacentToHeadquarters: boolean;
}): CountyCoverageDecision {
  if (facts.headquartersCounty) return { counts: true, reason: 'headquarters_county' };
  if (facts.countiesInState >= BLANKET_SELF_SELECTED_COUNTY_THRESHOLD) {
    return { counts: false, reason: 'blanket_seed_fill' };
  }
  if (facts.headquartersKnown && !facts.adjacentToHeadquarters) {
    return { counts: false, reason: 'seed_not_adjacent_to_headquarters' };
  }
  if (facts.adjacentToHeadquarters) {
    return { counts: true, reason: 'adjacent_to_headquarters' };
  }
  // A seed slot with no resolved headquarters county is not county evidence.
  // Catalog rows often store a street fragment in the city field.
  return { counts: false, reason: 'seed_headquarters_unknown' };
}
