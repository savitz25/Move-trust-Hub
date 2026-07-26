'use client';

import {
  useEffect,
  useState,
  type ComponentType,
  type ReactNode,
} from 'react';
import { usePathname } from 'next/navigation';
import { useDeferredLoad } from '@/lib/hooks/use-deferred-load';

/** Routes that need auth/session immediately (must not wait on idle deferral). */
function needsAuthImmediately(pathname: string | null): boolean {
  if (!pathname) return false;
  return (
    // Homepage wizard: Email / Save actions must open the auth modal without a silent no-op
    pathname === '/' ||
    pathname === '/my-move' ||
    pathname.startsWith('/my-move/') || // includes /my-move/reports
    pathname === '/portal' ||
    pathname.startsWith('/portal/')
  );
}

type ProviderComponent = ComponentType<{ children: ReactNode }>;

/**
 * Lazily mounts SaveMyMoveProvider without blanking children.
 *
 * next/dynamic with ssr:false would replace the tree with `null` while the chunk
 * loads — that unmounted the homepage (and could surface as a client exception).
 * Always render children; wrap only after the provider module resolves.
 */
export function DeferredSaveMyMove({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const deferredReady = useDeferredLoad({ idleTimeout: 2500, maxWait: 8000 });
  const shouldLoad = needsAuthImmediately(pathname) || deferredReady;
  const [Provider, setProvider] = useState<ProviderComponent | null>(null);

  useEffect(() => {
    if (!shouldLoad) return;
    let cancelled = false;
    void import('@/components/save-my-move/save-my-move-provider')
      .then((m) => {
        if (!cancelled) setProvider(() => m.SaveMyMoveProvider);
      })
      .catch(() => {
        // Keep children mounted even if the chunk fails — auth actions degrade to no-op fallback.
      });
    return () => {
      cancelled = true;
    };
  }, [shouldLoad]);

  if (!Provider) return <>{children}</>;
  return <Provider>{children}</Provider>;
}
