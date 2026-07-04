import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { hubPath } from '@/lib/hub/paths';
import type { HubId } from '@/lib/hub/types';
import type { TemplateBreadcrumb } from '@/lib/hub/templates/types';

type HubBreadcrumbsProps = {
  hub: HubId;
  items: TemplateBreadcrumb[];
  className?: string;
};

function resolveHref(hub: HubId, href: string): string {
  if (href.startsWith('http') || href.startsWith('/insurance') || href.startsWith('/lender')) {
    return href;
  }
  return hubPath(hub, href);
}

export function HubBreadcrumbs({ hub, items, className }: HubBreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={className ?? 'container mx-auto px-4 pt-6'}>
      <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1">
              {index > 0 ? (
                <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-60" aria-hidden="true" />
              ) : null}
              {item.href && !isLast ? (
                <Link
                  href={resolveHref(hub, item.href)}
                  className="hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? 'font-medium text-foreground' : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}