import { CURATED_STATE_SLUGS } from '../local-movers/curated-states';
import { localStates } from '../local-movers/states';
import type { MoveHomeSiteCoverage } from './home-types';

export function buildMoveHomeSiteCoverage(): MoveHomeSiteCoverage {
  const landingCount = localStates.length;
  const includesDc = localStates.some((s) => s.slug === 'district-of-columbia');
  const curatedCount = CURATED_STATE_SLUGS.size;
  const allFiftyStatesAndDc =
    landingCount === 51 && includesDc && curatedCount === landingCount;

  return {
    landingCount,
    stateCount: includesDc ? landingCount - 1 : landingCount,
    includesDc,
    allFiftyStatesAndDc,
    source: 'MoveTrustHub local-movers state inventory (code)',
    limitation:
      'This is a site-coverage fact for research landings, not a count of movers and not a quality ranking. Headquarters is not service territory.',
  };
}
