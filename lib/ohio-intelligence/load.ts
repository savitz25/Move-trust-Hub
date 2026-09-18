import 'server-only';
import { assertOhioMoveSnapshot, OHIO_MOVE_SNAPSHOT, type OhioMoveSnapshot } from './snapshot';

export type OhioMoveIntelligencePayload = {
  snapshot: OhioMoveSnapshot;
};

export async function getOhioMoveIntelligence(): Promise<OhioMoveIntelligencePayload> {
  return { snapshot: assertOhioMoveSnapshot(OHIO_MOVE_SNAPSHOT) };
}
