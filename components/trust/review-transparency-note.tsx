import Link from 'next/link';
import { Info } from 'lucide-react';
import { REVIEW_TRANSPARENCY_DISCLAIMER } from '@/lib/trust/review-display-policy';

type Props = {
  className?: string;
  compact?: boolean;
};

export function ReviewTransparencyNote({ className = '', compact = false }: Props) {
  return (
    <aside
      className={`rounded-lg border border-amber-200/70 bg-amber-50/40 px-4 py-3 text-sm text-muted-foreground leading-relaxed ${className}`}
      role="note"
    >
      <p className="font-medium text-foreground inline-flex items-center gap-1.5 mb-1">
        <Info className="h-4 w-4 text-amber-600 shrink-0" aria-hidden="true" />
        Review transparency
      </p>
      <p className={compact ? 'text-xs' : ''}>{REVIEW_TRANSPARENCY_DISCLAIMER}</p>
      {!compact ? (
        <p className="text-xs mt-2">
          Submit a moderated review on our{' '}
          <Link href="/review" className="text-primary hover:underline font-medium">
            review page
          </Link>
          .
        </p>
      ) : null}
    </aside>
  );
}