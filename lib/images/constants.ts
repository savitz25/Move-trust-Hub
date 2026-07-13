/** Responsive `sizes` presets — keep in sync with layout CSS (hub-logo-slot, footer slots). */
export const IMAGE_SIZES = {
  headerLogo: '(max-width: 768px) 180px, 300px',
  footerLogo: '192px',
  reviewThumb: '80px',
  contentWide: '(max-width: 768px) 100vw, 72rem',
} as const;

export const DEFAULT_IMAGE_QUALITY = 75;

/** SVG and logo PNG must bypass the optimizer to preserve alpha (no white WebP matte). */
export function shouldBypassImageOptimizer(src: string): boolean {
  if (/\.svg($|\?)/i.test(src)) return true;
  return /\/logo\.png($|\?)/i.test(src) || src === '/logo.png';
}