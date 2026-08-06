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
        className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-border/80 bg-background px-3 py-2 text-[#3d4f63] transition-colors hover:border-primary/35 hover:bg-primary/[0.04] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        <ClipboardCheck className="h-3.5 w-3.5 text-emerald-700" aria-hidden="true" />
        {HOW_WE_VET_LABEL}
      </Link>
      <Link
        href="/verify-dot"
        className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-border/80 bg-background px-3 py-2 text-[#3d4f63] transition-colors hover:border-primary/35 hover:bg-primary/[0.04] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        <ShieldCheck className="h-3.5 w-3.5 text-emerald-700" aria-hidden="true" />
        Verify DOT #
      </Link>
      <Link
        href={reviewHref}
        className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-border/80 bg-background px-3 py-2 text-[#3d4f63] transition-colors hover:border-primary/35 hover:bg-primary/[0.04] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        <MessageSquarePlus className="h-3.5 w-3.5" aria-hidden="true" />
        Leave a Review
      </Link>
      <Link
        href="/moving-calculator"
        className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-border/80 bg-background px-3 py-2 text-[#3d4f63] transition-colors hover:border-primary/35 hover:bg-primary/[0.04] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        <Calculator className="h-3.5 w-3.5" aria-hidden="true" />
        Moving Calculator
      </Link>
      <Link
        href="/compare"
        className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-border/80 bg-background px-3 py-2 text-[#3d4f63] transition-colors hover:border-primary/35 hover:bg-primary/[0.04] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        <Scale className="h-3.5 w-3.5" aria-hidden="true" />
        Compare Movers
      </Link>
    </nav>
  );
}
