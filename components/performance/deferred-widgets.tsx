'use client';

import dynamic from 'next/dynamic';

const Chatbot = dynamic(
  () => import('@/components/chatbot').then((m) => m.Chatbot),
  { ssr: false }
);

const Toaster = dynamic(
  () => import('@/components/ui/sonner').then((m) => m.Toaster),
  { ssr: false }
);

export function DeferredWidgets() {
  return (
    <>
      <Toaster position="top-center" richColors closeButton />
      <Chatbot />
    </>
  );
}