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
 * An unresolved headquarters county does not, by itself, drop an in-state
 * selection under the blanket threshold, or a seed slot under that threshold.
 * A known headquarters in another county that is not adjacent still does not
 * count. A 50-plus selection still does not count without individual evidence.
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
  /** True when the headquarters county itself was resolved. */
  headquartersKnown: boolean;
  /**
   * True when the headquarters state matches this selection.
   * False when it is a different state. Null when the state is unknown.
   */
  headquartersInState?: boolean | null;
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

  // Verified state operating authority is statewide. It is not proof that
  // the company serves this county, including a county that is not adjacent
  // to headquarters.
  if (knownNonAdjacent) return { counts: false, reason: 'not_adjacent_to_headquarters' };

  if (facts.adjacentToHeadquarters) {
    return { counts: true, reason: 'adjacent_to_headquarters' };
  }
  if (!facts.headquartersKnown) {
    if (facts.headquartersInState === false) {
      return { counts: false, reason: 'out_of_state_headquarters' };
    }
    return { counts: true, reason: 'in_state_headquarters_unresolved' };
  }
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
  /** Null when the headquarters state is unknown. */
  headquartersInState?: boolean | null;
}): CountyCoverageDecision {
  if (facts.headquartersCounty) return { counts: true, reason: 'headquarters_county' };
  if (facts.countiesInState >= BLANKET_SELF_SELECTED_COUNTY_THRESHOLD) {
    return { counts: false, reason: 'blanket_seed_fill' };
  }
  if (facts.headquartersInState === false) {
    return { counts: false, reason: 'seed_out_of_state' };
  }
  if (facts.headquartersKnown && !facts.adjacentToHeadquarters) {
    return { counts: false, reason: 'seed_not_adjacent_to_headquarters' };
  }
  if (facts.adjacentToHeadquarters) {
    return { counts: true, reason: 'adjacent_to_headquarters' };
  }
  // Unresolved headquarters does not by itself drop a below-threshold seed slot.
  return { counts: true, reason: 'seed_headquarters_unresolved' };
}
