import statesGeo from '@/public/geo/us-states.json';
import type { MapStatesFile } from '@/lib/map/types';
import { resolveCompanyCoverageDisplay } from '@/lib/map/resolve-company-coverage-display';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CoverageMapClient } from '@/components/map/coverage-map-client';

type Props = {
  companyName: string;
  coverage: string;
  headquarters?: string;
  assignmentStateSlugs?: string[];
};

/** Server-rendered coverage summary + map (no "loading" text for crawlers). */
export function CoverageAreaCard({
  companyName,
  coverage,
  headquarters,
  assignmentStateSlugs,
}: Props) {
  const geo = statesGeo as MapStatesFile;
  const coverageDisplay = resolveCompanyCoverageDisplay({
    coverage,
    headquarters,
    assignmentStateSlugs,
  });

  const coveredStateNames = geo.states
    .filter((state) => coverageDisplay.coveredStateSlugs.has(state.slug))
    .map((state) => state.name)
    .sort((a, b) => a.localeCompare(b));

  const { description, isNational } = coverageDisplay;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Coverage Area</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="coverage-map bg-muted/40 rounded-lg p-2 sm:p-3 border">
          <CoverageMapClient
            statesGeo={geo}
            companyName={companyName}
            coveredStateSlugs={coverageDisplay.coveredStateSlugs}
          />

          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <span
                className="inline-block h-2.5 w-2.5 rounded-sm"
                style={{ backgroundColor: '#0A4D8C', opacity: 0.9 }}
              />
              Served
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span
                className="inline-block h-2.5 w-2.5 rounded-sm border border-border/60"
                style={{ backgroundColor: '#cbd5e1', opacity: 0.45 }}
              />
              Not served
            </span>
          </div>
        </div>

        <p className="sr-only">
          {companyName} serves {description}.
          {coveredStateNames.length > 0
            ? ` States highlighted on the map: ${coveredStateNames.join(', ')}.`
            : ''}
        </p>

        <div className="mt-3 text-sm">
          <span className="font-medium">{companyName}</span> serves{' '}
          <span className="font-semibold">{description}</span>.
          {isNational ? (
            <span className="block text-xs text-muted-foreground mt-1 leading-relaxed">
              Interstate routes across the continental United States
              {description === 'All 50 States'
                ? ', including Alaska and Hawaii on select lanes'
                : ''}
              .
            </span>
          ) : coveredStateNames.length > 1 ? (
            <span className="block text-xs text-muted-foreground mt-1 leading-relaxed">
              Highlighted states: {coveredStateNames.join(', ')}.
            </span>
          ) : coveredStateNames.length === 1 ? (
            <span className="block text-xs text-muted-foreground mt-1 leading-relaxed">
              Primary state: {coveredStateNames[0]}.
            </span>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}