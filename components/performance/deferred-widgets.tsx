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

function DeferredToaster({ interactionOnly }: { interactionOnly: boolean }) {
  const ready = useDeferredLoad({
    idleTimeout: 2500,
    maxWait: 10_000,
    interactionOnly,
  });
  if (!ready) return null;
  return <Toaster position="top-center" richColors closeButton />;
}

function DeferredChatbot({
  enabled,
  interactionOnly,
}: {
  enabled: boolean;
  interactionOnly: boolean;
}) {
  const ready = useDeferredLoad({
    idleTimeout: 8_000,
    maxWait: 30_000,
    interactionOnly,
  });
  if (!enabled || !ready) return null;
  return <Chatbot />;
}

export function DeferredWidgets({
  enableChatbot = false,
  interactionOnly = true,
}: {
  enableChatbot?: boolean;
  interactionOnly?: boolean;
}) {
  return (
    <>
      <DeferredToaster interactionOnly={interactionOnly} />
      <DeferredChatbot enabled={enableChatbot} interactionOnly={interactionOnly} />
    </>
  );
}