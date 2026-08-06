import { Suspense } from 'react';
import { buildResourceMetadata } from '@/lib/seo/resource-metadata';
import { PlanWorkspace } from '@/components/my-move-plan/plan-workspace';
import type { MyMovePlanStep } from '@/lib/my-move-plan/types';

export const metadata = buildResourceMetadata(
  '/my-move/plans',
  'Move plan — My Move',
  'Open, edit, and email a saved Move Trust Hub move plan from your Move HQ dashboard.'
);

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{ planId: string }>;
  searchParams: Promise<{ step?: string; send?: string }>;
};

function parseStep(raw: string | undefined): MyMovePlanStep | null {
  if (raw === 'route' || raw === 'shortlist' || raw === 'inventory' || raw === 'report') {
    return raw;
  }
  return null;
}

export default async function MyMovePlanWorkspacePage({ params, searchParams }: PageProps) {
  const { planId: rawId } = await params;
  const sp = await searchParams;
  const planId = decodeURIComponent(rawId || '').trim();
  const step = parseStep(sp.step);
  const autoSend = sp.send === '1' || sp.send === 'true';

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
      <Suspense
        fallback={
          <p className="text-sm text-muted-foreground py-16 text-center">Loading plan…</p>
        }
      >
        <PlanWorkspace planId={planId} step={step} autoSend={autoSend} />
      </Suspense>
    </div>
  );
}
