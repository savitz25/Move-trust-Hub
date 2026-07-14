import { getCounty } from '../../lib/local-movers/geography/index';
import { buildCountyPageMetadata } from '../../lib/local-movers/seo-metadata';
import { getMoversForCounty } from '../../lib/local-movers/index';
import { getLocalState } from '../../lib/local-movers/states';
import { evaluateCountyIndexability } from '../../lib/local-movers/county-indexability';
import type { LiveCountyProbe } from './live-county-audit';

export type RenderedMetadataProbeResult = {
  label: string;
  path: string;
  probeGroup: LiveCountyProbe['probeGroup'];
  pass: boolean;
  title: string;
  robots: unknown;
  errors: string[];
};

export function auditRenderedMetadataProbes(
  probes: LiveCountyProbe[]
): { results: RenderedMetadataProbeResult[]; failedProbeCount: number; pass: boolean } {
  const results: RenderedMetadataProbeResult[] = [];

  for (const probe of probes) {
    const county = getCounty(probe.stateSlug, probe.countySlug);
    const state = getLocalState(probe.stateSlug);
    const result = getMoversForCounty(probe.stateSlug, probe.countySlug);
    const errors: string[] = [];

    if (!county || !state || !result) {
      results.push({
        label: probe.label,
        path: probe.path,
        probeGroup: probe.probeGroup,
        pass: false,
        title: '',
        robots: null,
        errors: ['missing_county_or_movers'],
      });
      continue;
    }

    const indexDecision = evaluateCountyIndexability(probe.stateSlug, probe.countySlug);
    const metadata = buildCountyPageMetadata(
      county,
      state.name,
      result.movers,
      probe.path,
      indexDecision
    );

    const title = typeof metadata.title === 'string' ? metadata.title : '';
    const description = metadata.description ?? '';

    if ('keywords' in metadata && metadata.keywords !== undefined) {
      errors.push('metadata_contains_keywords');
    }
    if (!title.includes('Movers Serving')) {
      errors.push('title_missing_movers_serving');
    }
    if (/\bloup river sherman\b/i.test(description)) {
      errors.push('description_artifact');
    }
    if (indexDecision.tier === 'index' && metadata.robots?.index !== true) {
      errors.push('robots_not_index_for_tier1');
    }
    if (indexDecision.tier === 'noindex' && metadata.robots?.index !== false) {
      errors.push('robots_not_noindex_for_tier2');
    }

    results.push({
      label: probe.label,
      path: probe.path,
      probeGroup: probe.probeGroup,
      pass: errors.length === 0,
      title,
      robots: metadata.robots,
      errors,
    });
  }

  const failedProbeCount = results.filter((r) => !r.pass).length;
  return { results, failedProbeCount, pass: failedProbeCount === 0 };
}