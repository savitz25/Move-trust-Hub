import { getArticleBySlug } from '@/lib/insurance/resources/articles';
import { resolveInsuranceResourceSlug } from '@/lib/insurance/resources/slug-aliases';
import { getHubBySlug } from '@/lib/insurance/hubs/registry';
import {
  getClusterState,
  isLenderClusterSlug,
} from '@/lib/lender/clusters/registry';
import { CALCULATORS } from '@/lib/lender/calculators/registry';
import type { HubId } from '@/lib/hub/types';
import { hubPath } from '@/lib/hub/paths';

export type LegacySuggestion = {
  href: string;
  label: string;
  description?: string;
};

export type LegacyResolution =
  | { type: 'redirect'; destination: string; reason: string }
  | {
      type: 'fallback';
      reason: string;
      title: string;
      message: string;
      requestedPath: string;
      suggestions: LegacySuggestion[];
    };

const INSURANCE_SEGMENT_ALIASES: Record<string, string> = {
  guide: 'resources',
  guides: 'resources',
  comparison: 'resources',
  comparisons: 'resources',
  'health-hub': 'hubs/health-insurance',
  'health-hubs': 'hubs/health-insurance',
  'medicare-hub': 'hubs/medicare',
  'aca-hub': 'hubs/aca',
  agents: 'directory',
  agencies: 'directory',
  'premium-estimator': 'calculators/premium-estimator',
  'medicare-gap-calculator': 'calculators/medicare-gap',
  'aca-subsidy-calculator': 'calculators/aca-subsidy',
};

const LENDER_SEGMENT_ALIASES: Record<string, string> = {
  'mortgage-lenders': 'local-lenders',
  lenders: 'lenders',
  banks: 'fdic-insured-banks',
  'auto-loans': 'auto-loan-companies',
  'auto-lenders': 'auto-loan-companies',
  county: 'local-lenders',
  counties: 'local-lenders',
};

const LENDER_CALC_LEGACY: Record<string, string> = {
  'mortgage-payment': 'payment',
  payment: 'payment',
  piti: 'payment',
  affordability: 'affordability',
  refinance: 'refinance',
  va: 'payment',
  amortization: 'amortization',
  'rent-vs-buy': 'rent-vs-buy',
  heloc: 'heloc',
  'down-payment': 'down-payment',
  rental: 'rental',
  dti: 'dti',
  closing: 'closing',
  compare: 'compare',
};

const CALC_IDS = new Set<string>(CALCULATORS.map((c) => c.id));

function insuranceSuggestions(): LegacySuggestion[] {
  return [
    {
      href: hubPath('insurance', '/hubs/browse'),
      label: 'Browse health insurance markets',
      description: 'DOI-verified agents by state and MSA',
    },
    {
      href: hubPath('insurance', '/resources'),
      label: 'Insurance guides',
      description: 'ACA, Medicare, auto, and homeowners explainers',
    },
    {
      href: hubPath('insurance', '/calculators'),
      label: 'Premium & subsidy calculators',
    },
    {
      href: hubPath('insurance', '/directory'),
      label: 'Agency directory',
    },
  ];
}

function lenderSuggestions(): LegacySuggestion[] {
  return [
    {
      href: hubPath('lender', '/local-lenders'),
      label: 'Local mortgage lenders',
      description: 'NMLS-verified brokers by state and market cluster',
    },
    {
      href: hubPath('lender', '/calculators'),
      label: 'Mortgage calculators',
    },
    {
      href: hubPath('lender', '/fdic-insured-banks'),
      label: 'FDIC insured banks',
    },
    {
      href: hubPath('lender', '/compare'),
      label: 'Compare lenders',
    },
  ];
}

function fallback(
  hub: HubId,
  segments: string[],
  reason: string,
  title: string,
  message: string
): LegacyResolution {
  return {
    type: 'fallback',
    reason,
    title,
    message,
    requestedPath: `/${segments.join('/')}`,
    suggestions: hub === 'insurance' ? insuranceSuggestions() : lenderSuggestions(),
  };
}

export function resolveInsuranceLegacyPath(segments: string[]): LegacyResolution {
  if (segments.length === 0) {
    return {
      type: 'redirect',
      destination: hubPath('insurance', '/'),
      reason: 'empty_legacy_path',
    };
  }

  const [head, second, ...rest] = segments;
  const aliasTarget = INSURANCE_SEGMENT_ALIASES[head];
  if (aliasTarget && segments.length === 1) {
    return {
      type: 'redirect',
      destination: hubPath('insurance', `/${aliasTarget}`),
      reason: `segment_alias:${head}`,
    };
  }

  if (head === 'resources' && second) {
    const canonical = resolveInsuranceResourceSlug(second);
    const article = getArticleBySlug(canonical);
    if (article) {
      const dest = hubPath('insurance', `/resources/${canonical}`);
      return {
        type: 'redirect',
        destination: dest,
        reason: canonical !== second ? `resource_alias:${second}` : `resource:${canonical}`,
      };
    }
    return fallback(
      'insurance',
      segments,
      'unknown_resource',
      'Guide not found',
      'This insurance guide may have moved. Browse our current resources or market hubs below.'
    );
  }

  if ((head === 'guides' || head === 'comparisons' || head === 'comparison') && second) {
    const canonical = resolveInsuranceResourceSlug(second);
    if (getArticleBySlug(canonical)) {
      return {
        type: 'redirect',
        destination: hubPath('insurance', `/resources/${canonical}`),
        reason: `legacy_${head}:${second}`,
      };
    }
  }

  if (head === 'hubs' && second && !rest.length) {
    const specialty = ['health-insurance', 'medicare', 'aca', 'south-florida', 'browse'];
    if (specialty.includes(second)) {
      return {
        type: 'redirect',
        destination: hubPath('insurance', `/hubs/${second}`),
        reason: `hub_specialty:${second}`,
      };
    }
  }

  if (head === 'hubs' && second && rest[0] && !rest[1]) {
    const hub = getHubBySlug(second, rest[0]);
    if (hub) {
      return {
        type: 'redirect',
        destination: hubPath('insurance', `/hubs/${second}/${rest[0]}`),
        reason: 'hub_msa',
      };
    }
  }

  if (head === 'calculators' && second) {
    const known = ['premium-estimator', 'medicare-gap', 'aca-subsidy'];
    if (known.includes(second)) {
      return {
        type: 'redirect',
        destination: hubPath('insurance', `/calculators/${second}`),
        reason: `calculator:${second}`,
      };
    }
  }

  if (head === 'tools' && second) {
    return {
      type: 'redirect',
      destination: hubPath('insurance', `/tools/${second}`),
      reason: `tool:${second}`,
    };
  }

  if (INSURANCE_SEGMENT_ALIASES[head]) {
    return {
      type: 'redirect',
      destination: hubPath('insurance', `/${INSURANCE_SEGMENT_ALIASES[head]}`),
      reason: `segment_alias:${head}`,
    };
  }

  return fallback(
    'insurance',
    segments,
    'unmatched_legacy',
    'Page not found',
    'This insurance directory page does not exist or may have moved during our site migration.'
  );
}

export function resolveLenderLegacyPath(segments: string[]): LegacyResolution {
  if (segments.length === 0) {
    return {
      type: 'redirect',
      destination: hubPath('lender', '/'),
      reason: 'empty_legacy_path',
    };
  }

  const [head, second, third] = segments;
  const headAlias = LENDER_SEGMENT_ALIASES[head];
  if (headAlias && segments.length === 1) {
    return {
      type: 'redirect',
      destination: hubPath('lender', `/${headAlias}`),
      reason: `segment_alias:${head}`,
    };
  }

  if (head === 'calculators' && second) {
    const calcId = LENDER_CALC_LEGACY[second] ?? second;
    if (CALC_IDS.has(calcId)) {
      return {
        type: 'redirect',
        destination: `${hubPath('lender', '/calculators')}?calc=${calcId}`,
        reason: `calculator:${second}`,
      };
    }
  }

  if (head === 'local-lenders' && second && third) {
    if (isLenderClusterSlug(third)) {
      const canonicalState = getClusterState(third)!;
      const dest = hubPath('lender', `/local-lenders/${canonicalState}/${third}`);
      return {
        type: 'redirect',
        destination: dest,
        reason: second !== canonicalState ? `cluster_state_fix:${third}` : `cluster:${third}`,
      };
    }
  }

  if (head === 'local-lenders' && second && !third && isLenderClusterSlug(second)) {
    const state = getClusterState(second)!;
    return {
      type: 'redirect',
      destination: hubPath('lender', `/local-lenders/${state}/${second}`),
      reason: `cluster_shorthand:${second}`,
    };
  }

  if (head === 'mortgage-lenders') {
    const tail = segments.slice(1).join('/');
    return {
      type: 'redirect',
      destination: hubPath('lender', tail ? `/local-lenders/${tail}` : '/local-lenders'),
      reason: 'mortgage_lenders_alias',
    };
  }

  if (head === 'credit-repair' || head === 'mca-companies') {
    return fallback(
      'lender',
      segments,
      'vertical_sunset',
      'Directory section unavailable',
      'This lender directory section is not published on Move Trust Hub yet. Explore mortgage lenders, calculators, and FDIC banks below.'
    );
  }

  if (LENDER_SEGMENT_ALIASES[head]) {
    const tail = segments.slice(1).join('/');
    const base = LENDER_SEGMENT_ALIASES[head];
    return {
      type: 'redirect',
      destination: hubPath('lender', tail ? `/${base}/${tail}` : `/${base}`),
      reason: `segment_alias:${head}`,
    };
  }

  return fallback(
    'lender',
    segments,
    'unmatched_legacy',
    'Page not found',
    'This lender directory page does not exist or may have moved during our site migration.'
  );
}

export function hubNotFoundFallback(hub: 'insurance' | 'lender'): LegacyResolution {
  return hub === 'insurance'
    ? fallback(
        'insurance',
        [],
        'not_found',
        'Page not found',
        'This insurance directory page does not exist yet or may have moved. Try the homepage, health hubs browser, or calculators.'
      )
    : fallback(
        'lender',
        [],
        'not_found',
        'Page not found',
        'This lender directory page does not exist yet or may have moved. Try the homepage, calculators, or local lender browser.'
      );
}

export function resolveHubLegacyPath(hub: HubId, segments: string[] | undefined): LegacyResolution {
  const path = segments ?? [];
  if (hub === 'insurance') return resolveInsuranceLegacyPath(path);
  if (hub === 'lender') return resolveLenderLegacyPath(path);
  return {
    type: 'redirect',
    destination: '/',
    reason: 'move_hub',
  };
}