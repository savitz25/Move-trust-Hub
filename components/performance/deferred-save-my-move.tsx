'use client';

import dynamic from 'next/dynamic';

const SaveMyMoveProvider = dynamic(
  () =>
    import('@/components/save-my-move/save-my-move-provider').then(
      (m) => m.SaveMyMoveProvider
    ),
  { ssr: false }
);

export function DeferredSaveMyMove({ children }: { children: React.ReactNode }) {
  return <SaveMyMoveProvider>{children}</SaveMyMoveProvider>;
}