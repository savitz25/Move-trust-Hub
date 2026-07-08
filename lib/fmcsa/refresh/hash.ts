import { createHash } from 'crypto';
import {
  deriveUsdotStatus,
  extractEntityType,
  extractPowerUnits,
  formatAuthorityStatus,
} from '@/lib/fmcsa/carrier-fields';
import type { FmcsaCarrierSnapshot } from '@/lib/fmcsa/refresh/types';

/** Deterministic hash of FMCSA fields used for change detection. */
export function computeFmcsaDataHash(snapshot: FmcsaCarrierSnapshot): string {
  const carrier = snapshot.raw;
  const payload = JSON.stringify({
    dot: snapshot.dotNumber,
    mc: snapshot.mcNumber ?? '',
    entityType: extractEntityType(carrier) ?? '',
    usdotStatus: deriveUsdotStatus(carrier),
    powerUnits: extractPowerUnits(carrier) ?? '',
    authorityStatus: formatAuthorityStatus(carrier) ?? '',
    allowed: snapshot.allowedToOperate,
    authority: snapshot.authorityActive,
    oos: snapshot.outOfService,
    safety: snapshot.safetyRating,
    complaints: snapshot.complaintsLast12m,
    shipments: snapshot.shipments,
    revoked: snapshot.revocationDate ?? '',
    commonAuth: snapshot.commonAuthorityStatus ?? '',
    brokerAuth: snapshot.brokerAuthorityStatus ?? '',
  });
  return createHash('sha256').update(payload).digest('hex');
}