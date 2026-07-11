import Link from 'next/link';
import { cn } from '@/lib/utils';
import { METHODOLOGY_ANCHORS, methodologyHref } from '@/lib/trust/site-stats';

type MethodologyAnchor = keyof typeof METHODOLOGY_ANCHORS;

type MethodologyLinkProps = {
  children: React.ReactNode;
  anchor?: MethodologyAnchor;
  className?: string;
  title?: string;
};

/** Links a metric or badge to the canonical scoring methodology page. */
export function MethodologyLink({
  children,
  anchor,
  className,
  title = 'How we calculate and display this metric',
}: MethodologyLinkProps) {
  return (
    <Link
      href={methodologyHref(anchor)}
      className={cn(
        'underline decoration-muted-foreground/40 underline-offset-2 hover:decoration-primary hover:text-primary transition-colors',
        className
      )}
      title={title}
    >
      {children}
    </Link>
  );
}