import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getCountyPath, getStatePath } from '@/lib/local-movers/index';
import { getLocalState } from '@/lib/local-movers/states';

export type CompanyCountyCoverage = {
  stateSlug: string;
  countySlug: string;
  name?: string;
};

/**
 * Bidirectional SEO links: directory profile → county guides the mover serves.
 * Server-rendered for crawlability.
 */
export function CompanyLocalCountyLinks({
  companyName,
  coverageCounties,
  assignmentStateSlugs = [],
  maxCounties = 12,
}: {
  companyName: string;
  coverageCounties?: CompanyCountyCoverage[] | null;
  assignmentStateSlugs?: string[];
  maxCounties?: number;
}) {
  const counties = (coverageCounties ?? []).filter(
    (c) => c.stateSlug && c.countySlug
  );
  const stateSlugs = [
    ...new Set([
      ...counties.map((c) => c.stateSlug),
      ...assignmentStateSlugs.filter(Boolean),
    ]),
  ].slice(0, 8);

  if (!counties.length && !stateSlugs.length) return null;

  const shownCounties = counties.slice(0, maxCounties);

  return (
    <Card className="border-primary/15 bg-primary/[0.03]">
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" aria-hidden />
          Local mover guides
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm space-y-3">
        <p className="text-muted-foreground leading-relaxed">
          Find {companyName} and other licensed movers on our county-level guides
          (part of the Move Trust Hub local network).
        </p>
        {shownCounties.length > 0 ? (
          <ul className="flex flex-wrap gap-2">
            {shownCounties.map((c) => {
              const stateName = getLocalState(c.stateSlug)?.name ?? c.stateSlug;
              const label =
                c.name?.trim() ||
                `${c.countySlug.replace(/-/g, ' ')} County, ${stateName}`;
              return (
                <li key={`${c.stateSlug}/${c.countySlug}`}>
                  <Link
                    href={getCountyPath(c.stateSlug, c.countySlug)}
                    className="inline-flex rounded-full border bg-card px-3 py-1 text-xs font-medium text-primary hover:border-primary/40 hover:bg-primary/5"
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : null}
        {stateSlugs.length > 0 ? (
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs">
            <span className="text-muted-foreground">State overviews:</span>
            {stateSlugs.map((slug) => {
              const state = getLocalState(slug);
              return (
                <Link
                  key={slug}
                  href={getStatePath(slug)}
                  className="font-medium text-primary underline underline-offset-2"
                >
                  {state?.name ?? slug}
                </Link>
              );
            })}
          </div>
        ) : null}
        <p className="text-xs text-muted-foreground">
          <Link href="/local-movers" className="underline underline-offset-2">
            Browse all local mover states
          </Link>
          {' · '}
          <Link href="/moving-calculator" className="underline underline-offset-2">
            Moving calculator
          </Link>
          {' · '}
          <Link href="/verify-dot" className="underline underline-offset-2">
            Verify DOT
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
