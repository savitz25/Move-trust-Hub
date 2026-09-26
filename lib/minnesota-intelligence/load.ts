import 'server-only';

import { assertMinnesotaMoveSnapshot, MINNESOTA_MOVE_SNAPSHOT } from './snapshot';

export async function getMinnesotaMoveIntelligence() {
  return { snapshot: assertMinnesotaMoveSnapshot(MINNESOTA_MOVE_SNAPSHOT) };
}
