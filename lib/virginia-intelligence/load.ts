import 'server-only';
import { assertVirginiaMoveSnapshot, VIRGINIA_MOVE_SNAPSHOT, type VirginiaMoveSnapshot } from './snapshot';
import { lookupVirginiaHhg, type VaHhgLookup } from './lookup';

export type VirginiaMoveIntelligencePayload = {
  snapshot: VirginiaMoveSnapshot;
  lookup: VaHhgLookup;
};

export async function getVirginiaMoveIntelligence(authority?: string): Promise<VirginiaMoveIntelligencePayload> {
  return {
    snapshot: assertVirginiaMoveSnapshot(VIRGINIA_MOVE_SNAPSHOT),
    lookup: lookupVirginiaHhg(authority),
  };
}
