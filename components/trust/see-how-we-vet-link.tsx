import Link from 'next/link';
import { ClipboardCheck } from 'lucide-react';
import { HOW_WE_VET_HREF, HOW_WE_VET_LABEL } from '@/lib/trust/vetting-criteria';
import { cn } from '@/lib/utils';

type Props = {
  className?: string;
  /** Visual weight — text link vs chip. */
  variant?: 'link' | 'chip' | 'inline';
  label?: string;
};

/** Canonical CTA into the public vetting methodology section. */
export function SeeHowWeVetLink({
  className,
  variant = 'link',
  label = HOW_WE_VET_LABEL,
}: Props) {
  if (variant === 'chip') {
    return (
      <Link
        href={HOW_WE_VET_HREF}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full border bg-background px-3 py-1.5 text-sm',
          'text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors',
          className
        )}
      >
        <ClipboardCheck className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
        {label}
      </Link>
    );
  }

  if (variant === 'inline') {
    return (
      <Link
        href={HOW_WE_VET_HREF}
        className={cn(
          'font-medium text-primary underline-offset-2 hover:underline',
          className
        )}
      >
        {label}
      </Link>
    );
  }

  return (
    <Link
      href={HOW_WE_VET_HREF}
      className={cn(
        'inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-2 hover:underline',
        className
      )}
    >
      <ClipboardCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
      {label}
    </Link>
  );
}
