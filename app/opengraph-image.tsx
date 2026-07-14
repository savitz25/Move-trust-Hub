import { ImageResponse } from 'next/og';
import { MOVE_OG_CONFIG } from '@/lib/og/trust-hub-og-config';
import { TrustHubOgImage } from '@/lib/og/trust-hub-og-image';

export const runtime = 'edge';
export const alt = MOVE_OG_CONFIG.alt;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(<TrustHubOgImage config={MOVE_OG_CONFIG} />, { ...size });
}