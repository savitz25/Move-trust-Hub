import { ImageResponse } from 'next/og';
import { getOgLogoDataUrl } from '@/lib/og/get-og-logo-src';
import { INSURANCE_OG_CONFIG } from '@/lib/og/trust-hub-og-config';
import { TrustHubOgImage } from '@/lib/og/trust-hub-og-image';

export const alt = INSURANCE_OG_CONFIG.alt;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function InsuranceOpenGraphImage() {
  const logoSrc = getOgLogoDataUrl();
  return new ImageResponse(<TrustHubOgImage config={INSURANCE_OG_CONFIG} logoSrc={logoSrc} />, {
    ...size,
  });
}