import { readFileSync } from 'fs';
import { join } from 'path';

export const OG_LOGO_RELATIVE_PATH = 'public/brand/move-trust-hub-logo-transparent.png';

/** Native dimensions of MoveTrustHub-recreated-transparent.png */
export const OG_LOGO_NATIVE = { width: 759, height: 239 } as const;

/** Display height for 1200×630 OG cards (~200px tall per brand spec). */
export const OG_LOGO_DISPLAY_HEIGHT = 200;

export const OG_LOGO_DISPLAY_WIDTH = Math.round(
  (OG_LOGO_NATIVE.width / OG_LOGO_NATIVE.height) * OG_LOGO_DISPLAY_HEIGHT
);

export function getOgLogoDataUrl(): string {
  const logoPath = join(process.cwd(), OG_LOGO_RELATIVE_PATH);
  const data = readFileSync(logoPath);
  return `data:image/png;base64,${data.toString('base64')}`;
}