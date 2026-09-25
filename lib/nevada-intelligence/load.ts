import 'server-only';

import { NEVADA_NTA_HHG_ROWS } from './lookup';
import { assertNevadaMoveSnapshot, NEVADA_MOVE_SNAPSHOT } from './snapshot';

export async function getNevadaMoveIntelligence() {
  return { snapshot: assertNevadaMoveSnapshot(NEVADA_MOVE_SNAPSHOT), rows: NEVADA_NTA_HHG_ROWS };
}
