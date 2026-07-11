'use client';

import type { MapStatesFile } from '@/lib/map/types';

const COVERED_FILL = '#0A4D8C';
const DEFAULT_FILL = '#cbd5e1';
const STROKE = '#f8fafc';

type Props = {
  statesGeo: MapStatesFile;
  companyName: string;
  coveredStateSlugs: Set<string>;
};

/** Interactive SVG map — geo data is server-provided (no loading flash). */
export function CoverageMapClient({ statesGeo, companyName, coveredStateSlugs }: Props) {
  return (
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
  );
}