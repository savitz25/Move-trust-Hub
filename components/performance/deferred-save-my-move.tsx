'use client';

import dynamic from 'next/dynamic';
import { useDeferredLoad } from '@/lib/hooks/use-deferred-load';

const SaveMyMoveProvider = dynamic(
  () =>
    import('@/components/save-my-move/save-my-move-provider').then(
      (m) => m.SaveMyMoveProvider
    ),
  { ssr: false }
);

export function DeferredSaveMyMove({ children }: { children: React.ReactNode }) {
  const ready = useDeferredLoad({ idleTimeout: 2500, maxWait: 8000 });

  if (!ready) return <>{children}</>;
  return <SaveMyMoveProvider>{children}</SaveMyMoveProvider>;
}