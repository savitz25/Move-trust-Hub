import type { Metadata } from 'next';
import { MortgageDecisionCenter } from '@/components/lender/resources/mortgage-decision-center';
import { buildTemplateMetadata } from '@/lib/hub/templates/metadata';
import { DECISION_CENTER_META } from '@/lib/lender/resources/decision-center';

export const dynamic = 'force-static';

export const metadata: Metadata = buildTemplateMetadata({
  hub: 'lender',
  title: DECISION_CENTER_META.title,
  description: DECISION_CENTER_META.description,
  path: DECISION_CENTER_META.path,
});

/**
 * Lender Trust Hub — Mortgage Decision Center
 * Guided decision-support experience at /lender/resources
 */
export default function LenderResourcesPage() {
  return (
    <div className="min-h-screen bg-background">
      <MortgageDecisionCenter />
    </div>
  );
}
