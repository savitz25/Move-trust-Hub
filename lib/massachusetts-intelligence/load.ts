import 'server-only';

import { assertMassachusettsMoveSnapshot, MASSACHUSETTS_MOVE_SNAPSHOT } from './snapshot';

export async function getMassachusettsMoveIntelligence() {
  return { snapshot: assertMassachusettsMoveSnapshot(MASSACHUSETTS_MOVE_SNAPSHOT) };
}
