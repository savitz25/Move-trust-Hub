import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type MoveHqEmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  /** Smaller, quieter empty state for secondary dashboard sections */
  quiet?: boolean;
};

export function MoveHqEmptyState({
  icon: Icon,
  title,
  description,
  ctaLabel,
  ctaHref,
  quiet = false,
}: MoveHqEmptyStateProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-dashed text-center',
        quiet
          ? 'border-border/70 bg-muted/10 px-4 py-5'
          : 'bg-muted/20 px-6 py-8'
      )}
    >
      <Icon
        className={cn(
          'mx-auto text-primary/70 mb-2',
          quiet ? 'h-6 w-6 opacity-70' : 'h-8 w-8 mb-3'
        )}
        aria-hidden="true"
      />
      <p className={cn('font-semibold', quiet && 'text-sm text-muted-foreground')}>{title}</p>
      <p
        className={cn(
          'text-muted-foreground mt-1 max-w-sm mx-auto',
          quiet ? 'text-xs' : 'text-sm'
        )}
      >
        {description}
      </p>
      <Button asChild size="sm" variant={quiet ? 'ghost' : 'default'} className="mt-3">
        <Link href={ctaHref}>{ctaLabel}</Link>
      </Button>
    </div>
  );
}