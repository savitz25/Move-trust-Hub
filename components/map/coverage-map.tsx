'use client';

import { useEffect, useMemo, useState } from 'react';
import type { MapStatesFile } from '@/lib/map/types';
import { resolveCompanyCoverageDisplay } from '@/lib/map/resolve-company-coverage-display';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const COVERED_FILL = '#0A4D8C';
const DEFAULT_FILL = '#cbd5e1';
const STROKE = '#f8fafc';

interface Props {
  companyName: string;
  /** Coverage label from company record (region name or scraped summary). */
  coverage: string;
  headquarters?: string;
  /** Optional state slugs from destination assignments — reinforces onboarded coverage. */
  assignmentStateSlugs?: string[];
}

function CoverageMapSkeleton() {
  return (
    <div
      className="coverage-map bg-muted/40 rounded-lg border aspect-[16/9] animate-pulse"
      aria-hidden="true"
    />
  );
}

export function CoverageMap({
  companyName,
  coverage,
  headquarters,
  assignmentStateSlugs,
}: Props) {
  const [statesGeo, setStatesGeo] = useState<MapStatesFile | null>(null);
  const [loading, setLoading] = useState(true);

  const coverageDisplay = useMemo(
    () =>
      resolveCompanyCoverageDisplay({
        coverage,
        headquarters,
        assignmentStateSlugs,
      }),
    [coverage, headquarters, assignmentStateSlugs]
  );

  const { coveredStateSlugs, description, isNational } = coverageDisplay;

  useEffect(() => {
    let cancelled = false;

    fetch('/geo/us-states.json')
      .then((res) => res.json() as Promise<MapStatesFile>)
      .then((data) => {
        if (!cancelled) setStatesGeo(data);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const coveredStateNames = useMemo(() => {
    if (!statesGeo) return [];
    return statesGeo.states
      .filter((state) => coveredStateSlugs.has(state.slug))
      .map((state) => state.name)
      .sort((a, b) => a.localeCompare(b));
  }, [statesGeo, coveredStateSlugs]);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Coverage Area</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="coverage-map bg-muted/40 rounded-lg p-2 sm:p-3 border">
          {loading || !statesGeo ? (
            <CoverageMapSkeleton />
          ) : (
            <svg
              viewBox={statesGeo.viewBox}
              className="w-full h-auto max-h-[280px] sm:max-h-[320px] mx-auto"
              role="img"
              aria-label={`United States map showing ${companyName} service coverage`}
            >
              <title>{`${companyName} coverage area`}</title>
              {statesGeo.states.map((state) => {
                const covered = coveredStateSlugs.has(state.slug);
                return (
                  <path
                    key={state.slug}
                    d={state.path}
                    fill={covered ? COVERED_FILL : DEFAULT_FILL}
                    fillOpacity={covered ? 0.9 : 0.45}
                    stroke={STROKE}
                    strokeWidth={0.5}
                    className={covered ? 'state-covered' : 'state-uncovered'}
                    aria-hidden="true"
                  >
                    <title>{`${state.name}${covered ? ' — served' : ''}`}</title>
                  </path>
                );
              })}
            </svg>
          )}

          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <span
                className="inline-block h-2.5 w-2.5 rounded-sm"
                style={{ backgroundColor: COVERED_FILL, opacity: 0.9 }}
              />
              Served
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span
                className="inline-block h-2.5 w-2.5 rounded-sm border border-border/60"
                style={{ backgroundColor: DEFAULT_FILL, opacity: 0.45 }}
              />
              Not served
            </span>
          </div>
        </div>

        <p className="sr-only">
          {coveredStateNames.length > 0
            ? `States served: ${coveredStateNames.join(', ')}`
            : 'Coverage states loading'}
        </p>

        <div className="mt-3 text-sm">
          <span className="font-medium">{companyName}</span> serves{' '}
          <span className="font-semibold">{description}</span>.
          {isNational ? (
            <span className="block text-xs text-muted-foreground mt-1">
              Interstate routes across the continental United States
              {description === 'All 50 States' ? ', including Alaska and Hawaii on select lanes' : ''}.
            </span>
          ) : coveredStateNames.length > 1 ? (
            <span className="block text-xs text-muted-foreground mt-1">
              Highlighted states: {coveredStateNames.join(', ')}.
            </span>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}