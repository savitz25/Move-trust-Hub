import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

type MoveHqEmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
};

export function MoveHqEmptyState({
  icon: Icon,
  title,
  description,
  ctaLabel,
  ctaHref,
}: MoveHqEmptyStateProps) {
  return (
    <div className="rounded-xl border border-dashed bg-muted/20 px-6 py-8 text-center">
      <Icon className="mx-auto h-8 w-8 text-primary/70 mb-3" aria-hidden="true" />
      <p className="font-semibold">{title}</p>
      <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">{description}</p>
      <Button asChild size="sm" className="mt-4">
        <Link href={ctaHref}>{ctaLabel}</Link>
      </Button>
    </div>
  );
}