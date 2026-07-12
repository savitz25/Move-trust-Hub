'use client';

import { createClientLoader } from '@/lib/performance/create-client-loader';
import { useInView } from '@/lib/hooks/use-in-view';
type LeadCaptureProps = {
  stateName: string;
  categoryId: 'fdic' | 'mortgage' | 'auto' | 'credit-repair' | 'mca';
  variant?: 'default' | 'hero-compact' | 'sidebar-minimal' | 'state-page-v2';
};

const LeadCaptureForm = createClientLoader<LeadCaptureProps>(
  () => import('@/components/lender/directory/LeadCaptureForm'),
  'LeadCaptureForm',
);

function LeadCapturePlaceholder({ variant }: { variant?: LeadCaptureProps['variant'] }) {
  const height = variant === 'sidebar-minimal' ? 'h-40' : 'h-56';
  return (
    <div
      className={`rounded-2xl border border-zinc-200 bg-zinc-50 ${height} animate-pulse`}
      aria-hidden="true"
    />
  );
}

/** Lead form island — loads when sidebar/main column enters viewport. */
export function LeadCaptureLoader(props: LeadCaptureProps) {
  const { ref, inView } = useInView({ rootMargin: '240px 0px', idleDelay: 900 });

  return (
    <div ref={ref}>
      {inView ? <LeadCaptureForm {...props} /> : <LeadCapturePlaceholder variant={props.variant} />}
    </div>
  );
}