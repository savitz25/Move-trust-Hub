import 'server-only';

import { assertTennesseeMoveSnapshot, TENNESSEE_MOVE_SNAPSHOT } from './snapshot';

export async function getTennesseeMoveIntelligence() {
  return { snapshot: assertTennesseeMoveSnapshot(TENNESSEE_MOVE_SNAPSHOT) };
}
