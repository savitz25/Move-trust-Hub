import 'server-only';
import {
  assertNorthCarolinaMoveSnapshot,
  NORTH_CAROLINA_MOVE_SNAPSHOT,
  type NorthCarolinaMoveSnapshot,
} from './snapshot';

export type NorthCarolinaMoveIntelligencePayload = {
  snapshot: NorthCarolinaMoveSnapshot;
};

export async function getNorthCarolinaMoveIntelligence(): Promise<NorthCarolinaMoveIntelligencePayload> {
  return { snapshot: assertNorthCarolinaMoveSnapshot(NORTH_CAROLINA_MOVE_SNAPSHOT) };
}
