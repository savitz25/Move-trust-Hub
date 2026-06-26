'use client';

import dynamic from 'next/dynamic';
import { useDeferredLoad } from '@/lib/hooks/use-deferred-load';

const Chatbot = dynamic(
  () => import('@/components/chatbot').then((m) => m.Chatbot),
  { ssr: false }
);

const Toaster = dynamic(
  () => import('@/components/ui/sonner').then((m) => m.Toaster),
  { ssr: false }
);

function DeferredToaster() {
  const ready = useDeferredLoad({ idleTimeout: 2000, maxWait: 8000 });
  if (!ready) return null;
  return <Toaster position="top-center" richColors closeButton />;
}

function DeferredChatbot() {
  const ready = useDeferredLoad({
    idleTimeout: 6000,
    maxWait: 20000,
    includeScroll: true,
  });
  if (!ready) return null;
  return <Chatbot />;
}

export function DeferredWidgets() {
  return (
    <>
      <DeferredToaster />
      <DeferredChatbot />
    </>
  );
}