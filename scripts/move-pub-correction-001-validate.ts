/**
 * Read-only before/after check for the publication correction.
 * Reads /tmp/move-pub-data.json (SELECT exports). Does not write to the database.
 *
 * before = current main rules: no publication gate, no blanket gate, headquarters
 * parser before the ZIP-comma fix, no runtime Premium cap.
 * after = this branch.
 */
import { writeFileSync } from 'node:fs';
import { companyToLocalMover } from '@/lib/local-movers/company-to-local-mover';
import { isCountyAdjacent } from '@/lib/local-movers/county-adjacency';
import { countyCardTypeScope } from '@/lib/local-movers/county-card-authority';
import { evaluateCountyIndexabilityFromResult } from '@/lib/local-movers/county-indexability';
import {
  countyAssignmentCountsAsCoverage,
  isOwnerSelectedAssignmentSource,
} from '@/lib/local-movers/county-coverage-evidence';
import { isPublishableCountyCompany } from '@/lib/local-movers/county-publication';
import { getAllCountyParams } from '@/lib/local-movers/geography/index';
import { getMoversForCounty } from '@/lib/local-movers/index';
import { mergeApprovedMovers } from '@/lib/local-movers/merge-approved-movers';
import { parseHeadquarters } from '@/lib/local-movers/parse-headquarters';
import {
  applyPremiumCapToDecision,
  premiumAllowanceKeys,
  type PremiumCapRow,
} from '@/lib/local-movers/premium-index-cap';
import { resolveCityToCounty } from '@/lib/local-movers/resolve-city-to-county';
import { seedMoverCountsForCounty } from '@/lib/local-movers/seed-county-coverage';
import { localStates } from '@/lib/local-movers/states';
import type { LocalMover } from '@/lib/local-movers/types';
import { resolveCompanyTypeBadges } from '@/lib/companies/type-badges';
import {
  countQualifyingCountyMovers,
  listedCountyMovers,
} from '@/lib/seo/unique-local-movers';

type Assignment = {
  company_id: string;
  company_slug: string;
  state_slug: string;
  county_slug: string;
  source: string | null;
};

type Company = {
  id: string;
  slug: string;
  name: string;
  headquarters: string | null;
  publication_state: string | null;
  service_scope: string | null;
  is_verified: boolean | null;
  usdot_number: string | null;
  mc_number: string | null;
  entity_type: string | null;
  authority_active: boolean | null;
  out_of_service: boolean | null;
  status_code: string | null;
};

type Discovery = { company_id: string; state_code: string; county_name: string };
type Authority = { company_id: string; state_code: string };

type Dump = {
  assignments: Assignment[];
  companies: Company[];
  discovery: Discovery[];
  authority: Authority[];
};

const INTERNAL = new Set(['REVIEW_REQUIRED', 'INACTIVE', 'INGESTED', 'CLASSIFIED']);

function slugifyPlace(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-county$/, '');
}

function stateSlugFromCode(code: string | null | undefined): string | null {
  if (!code) return null;
  return localStates.find((state) => state.code === code.trim().toUpperCase())?.slug ?? null;
}

/** Headquarters parser as it behaved on main, before the bare-ZIP fix. */
function parseHeadquartersMain(raw: string | null | undefined): { city: string; stateCode?: string } {
  const text = (raw ?? '').trim();
  if (!text) return { city: '' };
  const parts = text.split(',').map((part) => part.trim()).filter(Boolean);
  if (parts.length >= 2) {
    const last = parts[parts.length - 1]!;
    const stateMatch = last.match(/^([A-Za-z]{2})(?:\s+\d{5}(?:-\d{4})?)?$/);
    if (stateMatch) {
      return { city: parts.length >= 3 ? parts[parts.length - 2]! : parts[0]!, stateCode: stateMatch[1]!.toUpperCase() };
    }
  }
  return { city: text };
}

function hqPlacement(headquarters: string | null | undefined, useMainParser: boolean) {
  const parsed = useMainParser ? parseHeadquartersMain(headquarters) : parseHeadquarters(headquarters);
  if (!parsed.stateCode || !parsed.city) return { known: false, stateSlug: null as string | null, countySlug: null as string | null };
  const stateSlug = stateSlugFromCode(parsed.stateCode);
  if (!stateSlug) return { known: false, stateSlug: null, countySlug: null };
  const county = resolveCityToCounty({ city: parsed.city, stateCode: parsed.stateCode, stateSlug });
  if (!county) return { known: false, stateSlug, countySlug: null };
  return { known: true, stateSlug: county.stateSlug, countySlug: county.countySlug };
}

function loadDump(): Dump {
  const path = process.env.MOVE_PUB_DATA ?? '/tmp/move-pub-data.json';
  return JSON.parse(require('node:fs').readFileSync(path, 'utf8')) as Dump;
}

function main() {
  const dump = loadDump();
  const companies = new Map<string, Company>();
  for (const company of dump.companies) {
    companies.set(company.id, company);
    if (company.slug) companies.set(company.slug, company);
  }

  const discovery = new Set<string>();
  for (const row of dump.discovery) {
    const stateSlug = stateSlugFromCode(row.state_code);
    const countySlug = slugifyPlace(row.county_name ?? '');
    if (!stateSlug || !countySlug) continue;
    discovery.add(`${row.company_id}|${stateSlug}|${countySlug}`);
  }
  const authority = new Set<string>();
  for (const row of dump.authority) {
    const stateSlug = stateSlugFromCode(row.state_code);
    if (!stateSlug) continue;
    authority.add(`${row.company_id}|${stateSlug}`);
  }

  const ownerCounts = new Map<string, Set<string>>();
  const byCounty = new Map<string, Assignment[]>();
  for (const row of dump.assignments) {
    const key = `${row.state_slug}::${row.county_slug}`;
    const list = byCounty.get(key) ?? [];
    list.push(row);
    byCounty.set(key, list);
    if (!isOwnerSelectedAssignmentSource(row.source)) continue;
    for (const id of [row.company_id, row.company_slug]) {
      if (!id) continue;
      const countKey = `${id}|${row.state_slug}`;
      const set = ownerCounts.get(countKey) ?? new Set<string>();
      set.add(row.county_slug);
      ownerCounts.set(countKey, set);
    }
  }

  function companyFor(row: Assignment): Company | undefined {
    return companies.get(row.company_id) ?? companies.get(row.company_slug);
  }

  function toMover(company: Company, useMainParser: boolean): LocalMover {
    const mover = companyToLocalMover({
      slug: company.slug,
      name: company.name,
      headquarters: company.headquarters,
      service_scope: company.service_scope,
      usdot_number: company.usdot_number,
      mc_number: company.mc_number,
      entity_type: company.entity_type,
      authority_active: company.authority_active,
      out_of_service: company.out_of_service,
      fmcsa_raw: company.status_code ? { statusCode: company.status_code } : null,
    });
    if (useMainParser) {
      const parsed = parseHeadquartersMain(company.headquarters);
      mover.city = parsed.city;
      mover.headquartersState = parsed.stateCode;
    }
    return mover;
  }

  function counts(company: Company, stateSlug: string): number {
    return Math.max(
      ownerCounts.get(`${company.id}|${stateSlug}`)?.size ?? 0,
      company.slug ? ownerCounts.get(`${company.slug}|${stateSlug}`)?.size ?? 0 : 0
    );
  }

  function evidenceDecision(company: Company, row: Assignment) {
    const hq = hqPlacement(company.headquarters, false);
    const same = Boolean(hq.known && hq.stateSlug === row.state_slug && hq.countySlug);
    return countyAssignmentCountsAsCoverage({
      source: row.source,
      ownerSelectedCountyCountInState: counts(company, row.state_slug),
      headquartersKnown: hq.known,
      headquartersCounty: Boolean(same && hq.countySlug === row.county_slug),
      adjacentToHeadquarters: Boolean(
        same && hq.countySlug && isCountyAdjacent(row.state_slug, hq.countySlug, row.county_slug)
      ),
      serviceAreaForCounty: false,
      discoveryForCounty:
        discovery.has(`${company.id}|${row.state_slug}|${row.county_slug}`) ||
        discovery.has(`${company.slug}|${row.state_slug}|${row.county_slug}`),
      stateLevelEvidence:
        authority.has(`${company.id}|${row.state_slug}`) ||
        authority.has(`${company.slug}|${row.state_slug}`),
    });
  }

  type EvalRow = PremiumCapRow & {
    qualifying: number;
    listed: number;
    movers: LocalMover[];
    unpublished: number;
    deadLinks: number;
    blanketListed: number;
    stateOnlyFederal: number;
  };

  function evaluatePass(after: boolean): Map<string, EvalRow> {
    const out = new Map<string, EvalRow>();
    for (const params of getAllCountyParams()) {
      const base = getMoversForCounty(params.stateSlug, params.countySlug);
      if (!base) continue;
      const key = `${params.stateSlug}::${params.countySlug}`;
      let unpublished = 0;
      let blanketListed = 0;
      const dbMovers: LocalMover[] = [];
      const seen = new Set<string>();
      for (const row of byCounty.get(key) ?? []) {
        const company = companyFor(row);
        if (!company || seen.has(company.id)) continue;
        seen.add(company.id);
        const publishable = isPublishableCountyCompany(company.publication_state);
        const decision = evidenceDecision(company, row);
        if (after) {
          if (!publishable || !decision.counts) continue;
        }
        const mover = toMover(company, !after);
        dbMovers.push(mover);
        if (!publishable) unpublished += 1;
        if (!decision.counts) blanketListed += 1;
      }

      let seed = base.movers;
      if (after) {
        seed = seed
          .filter((mover) => seedMoverCountsForCounty(base.county, mover))
          .flatMap((mover) => {
            const slug = mover.profileSlug?.trim();
            if (!slug) return [mover];
            const company = companies.get(slug);
            if (!company) return [{ ...mover, profilePublished: false }];
            if (!isPublishableCountyCompany(company.publication_state)) return [];
            return [{ ...mover, profilePublished: true }];
          });
      }

      const movers = mergeApprovedMovers(
        seed,
        dbMovers,
        Math.max(80, seed.length + dbMovers.length)
      );
      const decision = evaluateCountyIndexabilityFromResult(params.stateSlug, params.countySlug, {
        county: base.county,
        movers,
        isRegionalFallback: base.isRegionalFallback && dbMovers.length === 0,
      });
      let deadLinks = 0;
      let stateOnlyFederal = 0;
      for (const mover of listedCountyMovers(movers, base.county)) {
        const slug = mover.profileSlug?.trim();
        const linked = mover.listingSource === 'directory' || mover.profilePublished === true;
        if (linked && slug) {
          const company = companies.get(slug);
          if (!company || !isPublishableCountyCompany(company.publication_state)) deadLinks += 1;
        }
        if (mover.regulatoryStanding?.basis === 'state_only') {
          const scope = countyCardTypeScope(mover);
          const badges = resolveCompanyTypeBadges({
            ...scope,
            services: mover.services,
            usdotNumber: scope.serviceScope === 'intrastate' ? undefined : mover.usdotNumber,
            mcNumber: scope.serviceScope === 'intrastate' ? undefined : mover.mcNumber,
          });
          if (scope.serviceScope === 'interstate' || badges.some((badge) => /interstate/i.test(badge.label))) {
            stateOnlyFederal += 1;
          }
        }
      }
      out.set(key, {
        stateSlug: params.stateSlug,
        countySlug: params.countySlug,
        tier: decision.tier,
        seoTier: decision.seoTier,
        qualityScore: decision.qualityScore,
        qualifying: countQualifyingCountyMovers(base.county, movers),
        listed: listedCountyMovers(movers, base.county).length,
        movers: listedCountyMovers(movers, base.county),
        unpublished,
        deadLinks,
        blanketListed,
        stateOnlyFederal,
      });
    }
    return out;
  }

  const before = evaluatePass(false);
  const afterRaw = evaluatePass(true);
  const allowed = premiumAllowanceKeys([...afterRaw.values()]);
  const after = new Map<string, EvalRow>();
  for (const [key, row] of afterRaw) {
    const capped = applyPremiumCapToDecision(
      { tier: row.tier, reason: '', seoTier: row.seoTier, qualityScore: row.qualityScore },
      row.stateSlug,
      row.countySlug,
      allowed
    );
    after.set(key, { ...row, tier: capped.tier, seoTier: capped.seoTier });
  }

  function summarize(rows: Map<string, EvalRow>, label: string) {
    let qualifyingPages = 0;
    let premium = 0;
    let standard = 0;
    let unpublished = 0;
    let deadLinks = 0;
    let blanketListed = 0;
    let stateOnlyFederal = 0;
    const urls = new Set<string>();
    for (const state of localStates) urls.add(`/local-movers/${state.slug}`);
    for (const row of rows.values()) {
      if (row.qualifying > 0) qualifyingPages += 1;
      unpublished += row.unpublished;
      deadLinks += row.deadLinks;
      blanketListed += row.blanketListed;
      stateOnlyFederal += row.stateOnlyFederal;
      if (row.tier === 'index' && row.seoTier === 1) premium += 1;
      if (row.tier === 'index' && row.seoTier === 2) standard += 1;
      if (row.tier === 'index') urls.add(`/local-movers/${row.stateSlug}/${row.countySlug}`);
    }
    return { label, qualifyingPages, premium, standard, unpublished, deadLinks, blanketListed, stateOnlyFederal, urls };
  }

  const beforeSummary = summarize(before, 'before');
  const afterSummary = summarize(after, 'after');
  const added: string[] = [];
  const removed: string[] = [];
  for (const url of afterSummary.urls) if (!beforeSummary.urls.has(url)) added.push(url);
  for (const url of beforeSummary.urls) if (!afterSummary.urls.has(url)) removed.push(url);
  const byState = new Map<string, { added: number; removed: number }>();
  for (const url of [...added, ...removed]) {
    const state = url.split('/')[2] ?? '';
    const bucket = byState.get(state) ?? { added: 0, removed: 0 };
    if (added.includes(url)) bucket.added += 1;
    else bucket.removed += 1;
    byState.set(state, bucket);
  }

  const duvalKey = 'florida::duval';
  function duvalLines(rows: Map<string, EvalRow>): string[] {
    const row = rows.get(duvalKey);
    if (!row) return ['(no Duval county)'];
    return row.movers.map((mover) => {
      const company = mover.profileSlug ? companies.get(mover.profileSlug) : undefined;
      const assignment = (byCounty.get(duvalKey) ?? []).find(
        (item) => item.company_slug === mover.profileSlug || item.company_id === company?.id
      );
      const decision = company && assignment ? evidenceDecision(company, assignment) : null;
      const hq = company ? hqPlacement(company.headquarters, false) : null;
      const publication = company?.publication_state ?? 'not-in-export';
      const evidence = decision
        ? `${decision.reason}${decision.counts ? '' : ' (not counted)'}`
        : 'seed catalog';
      return `- ${mover.name} — publication ${publication}; headquarters county ${hq?.countySlug ?? 'unknown'}; evidence ${evidence}`;
    });
  }

  const stateLines = [...byState.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([state, counts]) => `- ${state}: added ${counts.added}, removed ${counts.removed}`);

  const markdown = `# MOVE-PUB-CORRECTION-001 validation

Read-only computation against Move production exports and the real county evaluator.
No database writes. Headquarters strings are not listed. Business names below are the Duval listing only.

Coverage JSON on company rows adds 0 counties beyond \`company_destination_assignments\` (4,044 edges, 0 extra). Service-area rows in \`provider_service_area\`: 0. Verified discovery and verified active state authority are included.

## Counts

| Measure | Before (main rules) | After (this branch) |
|---|---:|---:|
| County pages with qualifying businesses | ${beforeSummary.qualifyingPages} | ${afterSummary.qualifyingPages} |
| Indexable Premium counties | ${beforeSummary.premium} | ${afterSummary.premium} |
| Indexable Standard counties | ${beforeSummary.standard} | ${afterSummary.standard} |
| Unpublished companies displayed | ${beforeSummary.unpublished} | ${afterSummary.unpublished} |
| Dead profile links | ${beforeSummary.deadLinks} | ${afterSummary.deadLinks} |
| Unsupported blanket assignments counted as coverage | ${beforeSummary.blanketListed} | ${afterSummary.blanketListed} |
| State-only movers shown as federally authorized | ${beforeSummary.stateOnlyFederal} | ${afterSummary.stateOnlyFederal} |
| Sitemap URLs | ${beforeSummary.urls.size} | ${afterSummary.urls.size} |

Premium after the cap is ${afterSummary.premium} (cap 400). Standard is not counted against the cap.

Sitemap URLs added: ${added.length}. Removed: ${removed.length}.

### Per state

${stateLines.join('\n') || '- none'}

## Duval / Jacksonville

The city hub takes Duval first, so this is the Duval county list.

### Before

${duvalLines(before).join('\n') || '- none'}

### After

${duvalLines(after).join('\n') || '- none'}

## Rules applied

- Publication uses \`isConsumerVisibleCompany\`. \`REVIEW_REQUIRED\`, \`INACTIVE\`, \`INGESTED\`, and \`CLASSIFIED\` are excluded. Null stays visible. There is no \`is_published\` column.
- Blanket threshold is 50 owner-selected counties in one state. A known headquarters that is not adjacent is the other blanket signal. Headquarters, discovery, and system assignment sources still count inside a blanket. State authority does not create statewide coverage.
- Seed slots and owner selections without a resolved headquarters county do not count, unless the owner selection is under the blanket threshold and has verified state-level evidence. No company is hard-coded. The Duval list does not include the separate home-county canary RPC.
- Over-cap Premium counties fall back to Standard when the score still meets the Standard floor (48). Otherwise they are noindex.
- The existing qualifying threshold of 3 is unchanged. There is no new blanket minimum of 3 listed movers. Zero qualifying movers is noindex.
`;

  const outPath = process.env.MOVE_PUB_REPORT ?? 'docs/move-pub-correction-001-validation.md';
  writeFileSync(outPath, markdown);
  console.log(JSON.stringify({
    before: { ...beforeSummary, urls: beforeSummary.urls.size },
    after: { ...afterSummary, urls: afterSummary.urls.size },
    added: added.length,
    removed: removed.length,
    assignments: dump.assignments.length,
    companies: dump.companies.length,
  }, null, 2));
}

main();
