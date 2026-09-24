import 'server-only';

import { assertGeorgiaMoveSnapshot, GEORGIA_MOVE_SNAPSHOT } from './snapshot';

export async function getGeorgiaMoveIntelligence() {
  return { snapshot: assertGeorgiaMoveSnapshot(GEORGIA_MOVE_SNAPSHOT) };
}
