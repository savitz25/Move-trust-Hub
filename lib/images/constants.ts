/** Responsive `sizes` presets — keep in sync with layout CSS (hub-logo-slot, footer slots). */
export const IMAGE_SIZES = {
  /** Matches .hub-logo-slot: 10rem → 12.5rem → 15rem (never request > ~480px). */
  headerLogo: '(max-width: 640px) 160px, (max-width: 1024px) 200px, 240px',
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