import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  METHODOLOGY_ANCHORS,
  methodologyHref,
  type MethodologyReturnContext,
} from '@/lib/trust/methodology-paths';

type MethodologyAnchor = keyof typeof METHODOLOGY_ANCHORS;

type MethodologyLinkProps = {
  children: React.ReactNode;
  anchor?: MethodologyAnchor;
  className?: string;
  title?: string;
  returnContext?: MethodologyReturnContext;
};

/** Links a metric or badge to the canonical scoring methodology page. */
export function MethodologyLink({
  children,
  anchor,
  className,
  title = 'How we calculate and display this metric',
  returnContext,
}: MethodologyLinkProps) {
  return (
    <Link
      href={methodologyHref(anchor, returnContext)}
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