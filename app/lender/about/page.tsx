import type { Metadata } from 'next';
import { HowWeResearchPage } from '@/components/lender/about/how-we-research-page';
import { buildTemplateMetadata } from '@/lib/hub/templates/metadata';
import { HOW_WE_RESEARCH_META } from '@/lib/lender/about/how-we-research';

export const dynamic = 'force-static';

/** Canonical SEO — always /lender/about (never homepage). */
export const metadata: Metadata = buildTemplateMetadata({
  hub: 'lender',
  title: HOW_WE_RESEARCH_META.title,
  description: HOW_WE_RESEARCH_META.description,
  path: HOW_WE_RESEARCH_META.path,
});

/**
 * Lender Trust Hub — How We Research Mortgage Lenders
 * High-trust methodology & independence page at /lender/about
 */
export default function LenderAboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <HowWeResearchPage />
    </div>
  );
}
