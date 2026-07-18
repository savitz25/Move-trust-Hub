'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { useDeferredLoad } from '@/lib/hooks/use-deferred-load';

const SaveMyMoveProvider = dynamic(
  () =>
    import('@/components/save-my-move/save-my-move-provider').then(
      (m) => m.SaveMyMoveProvider
    ),
  { ssr: false }
);

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

export function DeferredSaveMyMove({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const deferredReady = useDeferredLoad({ idleTimeout: 2500, maxWait: 8000 });
  const ready = needsAuthImmediately(pathname) || deferredReady;

  if (!ready) return <>{children}</>;
  return <SaveMyMoveProvider>{children}</SaveMyMoveProvider>;
}
