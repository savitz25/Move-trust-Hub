import Link from 'next/link';
import { MessageSquarePlus, ShieldCheck, Calculator, Scale, ClipboardCheck } from 'lucide-react';
import { buildReviewPageUrl } from '@/lib/reviews/review-url';
import { HOW_WE_VET_HREF, HOW_WE_VET_LABEL } from '@/lib/trust/vetting-criteria';

type Props = {
  className?: string;
  carrierQuery?: string;
};

/**
 * Cross-links high-trust tools for E-E-A-T and internal linking clusters.
 */
export function TrustToolsBar({ className = '', carrierQuery }: Props) {
  const reviewHref = buildReviewPageUrl({ carrier: carrierQuery });

  return (
    <nav
      aria-label="Trust and research tools"
      className={`flex flex-wrap gap-2 text-sm ${className}`}
    >
      <Link
        href={HOW_WE_VET_HREF}
        className="inline-flex items-center gap-1.5 rounded-full border bg-background px-3 py-1.5 text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
      >
        <ClipboardCheck className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
        {HOW_WE_VET_LABEL}
      </Link>
      <Link
        href="/verify-dot"
        className="inline-flex items-center gap-1.5 rounded-full border bg-background px-3 py-1.5 text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
      >
        <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
        Verify DOT #
      </Link>
      <Link
        href={reviewHref}
        className="inline-flex items-center gap-1.5 rounded-full border bg-background px-3 py-1.5 text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
      >
        <MessageSquarePlus className="h-3.5 w-3.5" aria-hidden="true" />
        Leave a Review
      </Link>
      <Link
        href="/moving-calculator"
        className="inline-flex items-center gap-1.5 rounded-full border bg-background px-3 py-1.5 text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
      >
        <Calculator className="h-3.5 w-3.5" aria-hidden="true" />
        Moving Calculator
      </Link>
      <Link
        href="/compare"
        className="inline-flex items-center gap-1.5 rounded-full border bg-background px-3 py-1.5 text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
      >
        <Scale className="h-3.5 w-3.5" aria-hidden="true" />
        Compare Movers
      </Link>
    </nav>
  );
}
