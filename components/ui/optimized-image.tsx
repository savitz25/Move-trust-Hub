import type { CSSProperties } from 'react';
import Image, { type ImageProps } from 'next/image';
import { DEFAULT_IMAGE_QUALITY, shouldBypassImageOptimizer } from '@/lib/images/constants';

type OptimizedImageProps = ImageProps & {
  /** Force native <img> (e.g. tiny SVG nav marks). Auto-detected for .svg paths. */
  native?: boolean;
};

/**
 * next/image wrapper with project defaults:
 * - AVIF/WebP via next.config formats
 * - quality 75 (matches next.config qualities)
 * - placeholder="empty" for stable layout without blur LCP cost
 * - native <img> for SVGs (unoptimized / no optimizer round-trip)
 */
export function OptimizedImage({
  src,
  quality = DEFAULT_IMAGE_QUALITY,
  placeholder = 'empty',
  native,
  alt,
  className,
  priority,
  loading,
  fetchPriority,
  sizes,
  width,
  height,
  fill,
  style,
  ...rest
}: OptimizedImageProps) {
  const srcString = typeof src === 'string' ? src : '';
  const useNative = native ?? (srcString ? shouldBypassImageOptimizer(srcString) : false);

  if (useNative && srcString) {
    const resolvedLoading = loading ?? (priority ? 'eager' : 'lazy');
    const imgStyle: CSSProperties | undefined = fill
      ? { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', ...style }
      : style;

    return (
      // eslint-disable-next-line @next/next/no-img-element -- intentional for SVG / optimizer bypass
      <img
        src={srcString}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        sizes={sizes}
        loading={resolvedLoading}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={fetchPriority ?? (priority ? 'high' : 'auto')}
        className={className}
        style={imgStyle}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      quality={quality}
      placeholder={placeholder}
      priority={priority}
      loading={loading}
      fetchPriority={fetchPriority}
      sizes={sizes}
      width={width}
      height={height}
      fill={fill}
      className={className}
      style={style}
      {...rest}
    />
  );
}