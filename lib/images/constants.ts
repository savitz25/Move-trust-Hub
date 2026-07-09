/** Responsive `sizes` presets — keep in sync with layout CSS (hub-logo-slot, footer slots). */
export const IMAGE_SIZES = {
  headerLogo: '(max-width: 768px) 180px, 300px',
  footerLogo: '192px',
  reviewThumb: '80px',
  contentWide: '(max-width: 768px) 100vw, 72rem',
} as const;

export const DEFAULT_IMAGE_QUALITY = 75;

/** SVG and other vector assets should bypass the image optimizer. */
export function shouldBypassImageOptimizer(src: string): boolean {
  return /\.svg($|\?)/i.test(src);
}