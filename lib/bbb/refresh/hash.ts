import { createHash } from 'crypto';
import type { BbbBusinessSnapshot } from '@/lib/bbb/refresh/types';

export function computeBbbDataHash(snapshot: BbbBusinessSnapshot): string {
  const payload = JSON.stringify({
    id: snapshot.businessId,
    bbb: snapshot.bbbId,
    rating: snapshot.rating,
    accredited: snapshot.accredited,
    complaints: snapshot.complaintsLast36m,
    reviews: snapshot.customerReviews,
    alerts: snapshot.alertCount,
  });
  return createHash('sha256').update(payload).digest('hex');
}