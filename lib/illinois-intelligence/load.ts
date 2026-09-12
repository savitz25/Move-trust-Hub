import 'server-only';
import { assertIllinoisMoveSnapshot, ILLINOIS_MOVE_SNAPSHOT, type IllinoisMoveSnapshot } from './snapshot';

export type IllinoisMoveIntelligencePayload = {
  snapshot: IllinoisMoveSnapshot;
};

export async function getIllinoisMoveIntelligence(): Promise<IllinoisMoveIntelligencePayload> {
  return { snapshot: assertIllinoisMoveSnapshot(ILLINOIS_MOVE_SNAPSHOT) };
}
