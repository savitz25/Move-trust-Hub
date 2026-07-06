'use client';

import dynamic from 'next/dynamic';
import type { ComponentType, ReactNode } from 'react';

type ClientLoaderOptions = {
  /** Default false — keeps heavy client islands off the server HTML. */
  ssr?: boolean;
  loading?: () => ReactNode;
};

/**
 * Standard dynamic import for client islands.
 * Pattern: Server page fetches data → passes props → *Loader hydrates on demand.
 */
export function createClientLoader<P extends object>(
  importFn: () => Promise<Record<string, ComponentType<P>>>,
  exportName: string,
  options: ClientLoaderOptions = {},
) {
  const { ssr = false, loading } = options;

  return dynamic(
    () => importFn().then((mod) => mod[exportName]),
    { ssr, loading },
  );
}