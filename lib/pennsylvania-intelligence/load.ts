import 'server-only';
import {
  assertPennsylvaniaMoveSnapshot,
  PENNSYLVANIA_MOVE_SNAPSHOT,
  type PennsylvaniaMoveSnapshot,
} from './snapshot';

export type PennsylvaniaMoveIntelligencePayload = {
  snapshot: PennsylvaniaMoveSnapshot;
};

export async function getPennsylvaniaMoveIntelligence(): Promise<PennsylvaniaMoveIntelligencePayload> {
  return { snapshot: assertPennsylvaniaMoveSnapshot(PENNSYLVANIA_MOVE_SNAPSHOT) };
}
