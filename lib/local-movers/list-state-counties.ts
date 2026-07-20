import 'server-only';

import { getCountiesForState } from '@/lib/local-movers/geography/index';
import { US_STATES } from '@/lib/verify-dot/us-states';

export type StateCountyOption = {
  stateSlug: string;
  countySlug: string;
  name: string;
  stateCode: string;
  stateName: string;
};

const CODE_TO_SLUG: Record<string, string> = Object.fromEntries(
  US_STATES.map((s) => [
    s.value,
    s.label
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, ''),
  ])
);

/** Counties for multi-select local coverage (full state list as service-area proxy). */
export function listCountiesForStateCode(stateCode: string): StateCountyOption[] {
  const code = stateCode.trim().toUpperCase();
  const state = US_STATES.find((s) => s.value === code);
  if (!state) return [];
  const stateSlug = CODE_TO_SLUG[code] || code.toLowerCase();

  return getCountiesForState(stateSlug).map((c) => ({
    stateSlug: c.stateSlug,
    countySlug: c.slug,
    name: c.name,
    stateCode: c.stateCode || code,
    stateName: state.label,
  }));
}
