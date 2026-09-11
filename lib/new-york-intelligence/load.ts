import 'server-only';
import { assertNewYorkMoveSnapshot, NEW_YORK_MOVE_SNAPSHOT, type NewYorkMoveSnapshot } from './snapshot';

export type NewYorkMoveIntelligencePayload = {
  snapshot: NewYorkMoveSnapshot;
};

export async function getNewYorkMoveIntelligence(): Promise<NewYorkMoveIntelligencePayload> {
  return { snapshot: assertNewYorkMoveSnapshot(NEW_YORK_MOVE_SNAPSHOT) };
}
