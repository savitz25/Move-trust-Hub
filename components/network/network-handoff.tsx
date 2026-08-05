import { ArrowUpRight } from 'lucide-react';
import {
  resolveNetworkHandoff,
  type NetworkHandoffContext,
  type NetworkHandoffGeography,
  type NetworkHandoffVariant,
} from '@/lib/network/network-handoff';
import { TrustMark } from '@/components/network/trust-mark';
import { CrossHubLink } from '@/components/network/cross-hub-link';
import { cn } from '@/lib/utils';

export type NetworkHandoffProps = {
  context: NetworkHandoffContext;
  geography?: NetworkHandoffGeography;
  variant?: NetworkHandoffVariant;
  className?: string;
};

/**
 * Contextual hub→hub journey module (LifeJourneyNext / NetworkJourneyStrip).
 * One module, 1–2 links max. Not for company profiles or sitewide footers.
 */
export function NetworkHandoff({
  context,
  geography,
  variant = 'card',
  className,
}: NetworkHandoffProps) {
  const content = resolveNetworkHandoff(context, geography);
  const links = content.links.slice(0, 2);

  if (links.length === 0) return null;

  if (variant === 'compact') {
    return (
      <aside
        className={cn(
          'border-t border-border/60 py-4 text-sm text-muted-foreground',
          className
        )}
        aria-label={content.label}
      >
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground/80">
          {content.label}
        </p>
        <p className="mt-1.5 leading-relaxed text-foreground/80">{content.body}</p>
        <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
          {links.map((link) => (
            <li key={link.href}>
              <CrossHubLink
                href={link.href}
                currentHub="move"
                className="font-medium text-primary underline-offset-2 hover:underline"
              >
                {link.label}
              </CrossHubLink>
            </li>
          ))}
        </ul>
        <div className="mt-2">
          <TrustMark variant="text" />
        </div>
      </aside>
    );
  }

  if (variant === 'inline') {
    return (
      <aside
        className={cn(
          'rounded-lg border border-border/60 bg-muted/20 px-4 py-3 text-sm',
          className
        )}
        aria-label={content.label}
      >
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          {content.label}
        </p>
        <p className="mt-1.5 leading-relaxed text-muted-foreground">{content.body}</p>
        <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
          {links.map((link) => (
            <CrossHubLink
              key={link.href}
              href={link.href}
              currentHub="move"
              className="inline-flex items-center gap-1 font-semibold text-foreground underline-offset-2 hover:underline"
            >
              {link.label}
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden />
            </CrossHubLink>
          ))}
        </p>
        <div className="mt-2">
          <TrustMark variant="text" />
        </div>
      </aside>
    );
  }

  // card (default)
  return (
    <aside
      className={cn(
        'rounded-xl border border-border/70 bg-card px-5 py-5 sm:px-6',
        className
      )}
      aria-label={content.label}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        {content.label}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
        {content.body}
      </p>
      <ul className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        {links.map((link) => (
          <li key={link.href}>
            <CrossHubLink
              href={link.href}
              currentHub="move"
              className="inline-flex min-h-10 w-full items-center justify-center gap-1.5 rounded-lg border border-border/80 bg-background px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary/30 hover:bg-muted/40 sm:w-auto"
            >
              {link.label}
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden />
            </CrossHubLink>
          </li>
        ))}
      </ul>
      <div className="mt-3">
        <TrustMark />
      </div>
    </aside>
  );
}
