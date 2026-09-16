import 'server-only';
import { assertOregonMoveSnapshot, OREGON_MOVE_SNAPSHOT, type OregonMoveSnapshot } from './snapshot';

export type OregonMoveIntelligencePayload = {
  snapshot: OregonMoveSnapshot;
};

export async function getOregonMoveIntelligence(): Promise<OregonMoveIntelligencePayload> {
  return { snapshot: assertOregonMoveSnapshot(OREGON_MOVE_SNAPSHOT) };
}
