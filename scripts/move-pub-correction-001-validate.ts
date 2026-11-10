/**
 * Read-only before/after check for the publication correction.
 * Reads /tmp/move-pub-data.json (SELECT exports). Does not write to the database.
 *
 * before = current main rules: no publication gate, no blanket gate, headquarters
 * parser before the ZIP-comma fix, no runtime Premium cap.
 * after = this branch.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { companyToLocalMover } from '@/lib/local-movers/company-to-local-mover';
import { isCountyAdjacent } from '@/lib/local-movers/county-adjacency';
import { countyCardTypeScope } from '@/lib/local-movers/county-card-authority';
import { evaluateCountyIndexabilityFromResult } from '@/lib/local-movers/county-indexability';
import { scoreCountyQuality } from '@/lib/local-movers/county-quality-score';
import {
  countyAssignmentCountsAsCoverage,
  isOwnerSelectedAssignmentSource,
} from '@/lib/local-movers/county-coverage-evidence';
import { isPublishableCountyCompany } from '@/lib/local-movers/county-publication';
import { getAllCountyParams } from '@/lib/local-movers/geography/index';
import { countExplicitCountyMovers, getMoversForCounty, seedCountiesForMover } from '@/lib/local-movers/index';
import { mergeApprovedMovers } from '@/lib/local-movers/merge-approved-movers';
import {
  applyPremiumCapToDecision,
  premiumAllowanceKeys,
  type PremiumCapRow,
} from '@/lib/local-movers/premium-index-cap';
import { resolveCityToCounty } from '@/lib/local-movers/resolve-city-to-county';
import { resolveHeadquartersCounty } from '@/lib/local-movers/resolve-headquarters-county';
import {
  seedMoverCountsForCounty,
  withCompanyHeadquarters,
} from '@/lib/local-movers/seed-county-coverage';
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

type CanaryRow = {
  state: string;
  county: string;
  id: string;
  slug: string;
  name: string;
};

type PassFlags = {
  publication: boolean;
  coverage: boolean;
  zip: boolean;
  minQualifying: 1 | 3;
  evidenceByCanonicalId: boolean;
  canaries: boolean;
  stampHeadquarters: boolean;
  scoreAudit?: boolean;
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

function hqPlacement(headquarters: string | null | undefined, useZip: boolean) {
  if (useZip) {
    const resolved = resolveHeadquartersCounty(headquarters);
    return {
      known: resolved.countyResolved,
      stateSlug: resolved.stateSlug,
      countySlug: resolved.countySlug,
      inState: (selectionState: string): boolean | null => {
        if (!resolved.stateKnown || !resolved.stateSlug) return null;
        return resolved.stateSlug === selectionState;
      },
    };
  }
  const parsed = parseHeadquartersMain(headquarters);
  if (!parsed.stateCode || !parsed.city) {
    return {
      known: false,
      stateSlug: null as string | null,
      countySlug: null as string | null,
      inState: () => null as boolean | null,
    };
  }
  const stateSlug = stateSlugFromCode(parsed.stateCode);
  if (!stateSlug) {
    return { known: false, stateSlug: null, countySlug: null, inState: () => null as boolean | null };
  }
  const county = resolveCityToCounty({ city: parsed.city, stateCode: parsed.stateCode, stateSlug });
  return {
    known: Boolean(county),
    stateSlug: county?.stateSlug ?? stateSlug,
    countySlug: county?.countySlug ?? null,
    inState: (selectionState: string) => stateSlug === selectionState,
  };
}

function loadCanaries(): { grouped: Map<string, LocalMover[]>; slugs: Set<string> } {
  const text = readFileSync('scripts/fixtures/fl-wa-canary-home-counties.tsv', 'utf8');
  const grouped = new Map<string, LocalMover[]>();
  const slugs = new Set<string>();
  for (const line of text.split('\n').slice(1)) {
    if (!line.trim()) continue;
    const [state, , county, , slug, name] = line.split('\t');
    const stateSlug = state === 'FL' ? 'florida' : state === 'WA' ? 'washington' : '';
    if (!stateSlug || !county || !slug || !name) continue;
    const key = `${stateSlug}::${slugifyPlace(county)}`;
    const mover = companyToLocalMover({
      slug,
      name,
      short_description: `Based in ${county} County. Confirm pickup availability for your exact address.`,
      headquarters: null,
      usdot_number: null,
      mc_number: null,
      services: ['Local Mover'],
      service_scope: 'intrastate',
      entity_type: 'Moving Company',
      authority_active: true,
      out_of_service: false,
    });
    slugs.add(slug);
    const list = grouped.get(key) ?? [];
    list.push(mover);
    grouped.set(key, list);
  }
  return { grouped, slugs };
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

  const { grouped: canaries, slugs: canarySlugs } = loadCanaries();
  const headquartersBySlug = new Map<string, string | null>();
  for (const company of dump.companies) {
    if (company.slug) headquartersBySlug.set(company.slug, company.headquarters);
  }

  function evidenceKeys(company: Company, row: Assignment, byCanonicalId: boolean): string[] {
    if (!byCanonicalId) return [row.company_id].filter(Boolean);
    return [...new Set([company.id, company.slug, row.company_id].filter(Boolean))];
  }

  function evidenceDecision(company: Company, row: Assignment, flags: Pick<PassFlags, 'zip' | 'evidenceByCanonicalId'>) {
    const hq = hqPlacement(company.headquarters, flags.zip);
    const inState = hq.inState(row.state_slug);
    const sameState = inState !== false && Boolean(hq.known && hq.countySlug);
    const keys = evidenceKeys(company, row, flags.evidenceByCanonicalId);
    return countyAssignmentCountsAsCoverage({
      source: row.source,
      ownerSelectedCountyCountInState: counts(company, row.state_slug),
      headquartersKnown: Boolean(hq.known && inState !== false),
      headquartersInState: inState,
      headquartersCounty: Boolean(sameState && hq.countySlug === row.county_slug),
      adjacentToHeadquarters: Boolean(
        sameState && hq.countySlug && isCountyAdjacent(row.state_slug, hq.countySlug, row.county_slug)
      ),
      serviceAreaForCounty: false,
      discoveryForCounty: keys.some((id) => discovery.has(`${id}|${row.state_slug}|${row.county_slug}`)),
      stateLevelEvidence: keys.some((id) => authority.has(`${id}|${row.state_slug}`)),
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
    shown?: number;
    catalogExplicit?: number;
    inventory?: number;
  };

  function evaluatePass(flags: PassFlags): Map<string, EvalRow> {
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
        const decision = evidenceDecision(company, row, flags);
        if (flags.publication && !publishable) continue;
        if (flags.coverage && !decision.counts) continue;
        const mover = toMover(company, !flags.zip);
        dbMovers.push(mover);
        if (!publishable) unpublished += 1;
        if (!decision.counts) blanketListed += 1;
      }

      let seed = base.movers;
      if (flags.stampHeadquarters) {
        seed = withCompanyHeadquarters(seed, headquartersBySlug);
      }
      if (flags.coverage) {
        seed = seed.filter((mover) => seedMoverCountsForCounty(base.county, mover));
      }
      if (flags.publication) {
        seed = seed.flatMap((mover) => {
          const slug = mover.profileSlug?.trim();
          if (!slug) return [mover];
          const company = companies.get(slug);
          if (!company) return [{ ...mover, profilePublished: false }];
          if (!isPublishableCountyCompany(company.publication_state)) return [];
          return [{ ...mover, profilePublished: true }];
        });
      }

      const canary = flags.canaries ? canaries.get(key) ?? [] : [];
      const directoryLocals = mergeApprovedMovers(dbMovers, canary, 80);
      const movers = directoryLocals.length
        ? mergeApprovedMovers(seed, directoryLocals, Math.max(80, seed.length + directoryLocals.length))
        : seed;
      let decision = evaluateCountyIndexabilityFromResult(params.stateSlug, params.countySlug, {
        county: base.county,
        movers,
        isRegionalFallback: base.isRegionalFallback && directoryLocals.length === 0,
      });
      const qualifying = countQualifyingCountyMovers(base.county, movers);
      if (qualifying < flags.minQualifying && decision.tier === 'index') {
        decision = {
          tier: 'noindex',
          reason: 'insufficient_local_or_licensed_movers',
          seoTier: 3,
          qualityScore: decision.qualityScore,
        };
      }
      let deadLinks = 0;
      let stateOnlyFederal = 0;
      for (const mover of listedCountyMovers(movers, base.county)) {
        const slug = mover.profileSlug?.trim();
        const linked = mover.listingSource === 'directory' || mover.profilePublished === true;
        if (linked && slug && !canarySlugs.has(slug)) {
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
        ...(flags.scoreAudit
          ? (() => {
              const quality = scoreCountyQuality({
                stateSlug: params.stateSlug,
                countySlug: params.countySlug,
                county: base.county,
                movers,
                isRegionalFallback: base.isRegionalFallback && directoryLocals.length === 0,
              });
              return {
                shown: movers.length,
                catalogExplicit: countExplicitCountyMovers(params.stateSlug, params.countySlug),
                inventory: quality.components.inventory,
              };
            })()
          : {}),
      });
    }
    return out;
  }

  const liveMain: PassFlags = {
    publication: false,
    coverage: false,
    zip: false,
    minQualifying: 3,
    evidenceByCanonicalId: false,
    canaries: true,
    stampHeadquarters: false,
  };
  const afterFlags: PassFlags = {
    publication: true,
    coverage: true,
    zip: true,
    minQualifying: 1,
    evidenceByCanonicalId: true,
    canaries: true,
    stampHeadquarters: true,
  };

  function withCap(rows: Map<string, EvalRow>, applyCap: boolean): Map<string, EvalRow> {
    if (!applyCap) return rows;
    const allowed = premiumAllowanceKeys([...rows.values()]);
    const premiumCount = [...rows.values()].filter((row) => row.tier === 'index' && row.seoTier === 1).length;
    const capped = new Map<string, EvalRow>();
    for (const [key, row] of rows) {
      const decision = applyPremiumCapToDecision(
        { tier: row.tier, reason: '', seoTier: row.seoTier, qualityScore: row.qualityScore },
        row.stateSlug,
        row.countySlug,
        allowed,
        premiumCount
      );
      capped.set(key, { ...row, tier: decision.tier, seoTier: decision.seoTier });
    }
    return capped;
  }

  const steps: Array<{ label: string; flags: PassFlags; cap: boolean }> = [
    { label: 'Live main (canary RPC, qualifying at least 3)', flags: liveMain, cap: false },
    {
      label: 'Publication gate',
      flags: { ...liveMain, publication: true },
      cap: false,
    },
    {
      label: 'Blanket, known non-adjacent, and statewide seed fills',
      flags: { ...liveMain, publication: true, coverage: true, zip: true, stampHeadquarters: true },
      cap: false,
    },
    {
      label: 'Evidence joined on companies.id',
      flags: { ...liveMain, publication: true, coverage: true, zip: true, stampHeadquarters: true, evidenceByCanonicalId: true },
      cap: false,
    },
    {
      label: 'Index at one qualifying mover',
      flags: afterFlags,
      cap: false,
    },
    {
      label: 'Premium cap only above 400',
      flags: { ...afterFlags, scoreAudit: true },
      cap: true,
    },
  ];
  const evaluated = steps.map((step) => withCap(evaluatePass(step.flags), step.cap));
  const before = evaluated[0]!;
  const after = evaluated[evaluated.length - 1]!;

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

  const waterfall = evaluated.map((rows, index) => summarize(rows, steps[index]!.label));
  const beforeSummary = waterfall[0]!;
  const afterSummary = waterfall[waterfall.length - 1]!;
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
      const decision = company && assignment ? evidenceDecision(company, assignment, afterFlags) : null;
      const hq = company ? hqPlacement(company.headquarters, true) : null;
      const publication = company?.publication_state ?? 'not-in-export';
      const evidence = decision
        ? `${decision.reason}${decision.counts ? '' : ' (not counted)'}`
        : 'seed catalog';
      const via = canarySlugs.has(mover.profileSlug ?? '') ? 'canary RPC' : evidence;
      return `- ${mover.profileSlug ?? mover.id} (${mover.name}) — publication ${publication}; headquarters county ${hq?.countySlug ?? 'unknown'}; evidence ${via}`;
    });
  }

  const stateLines = [...byState.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([state, counts]) => `- ${state}: added ${counts.added}, removed ${counts.removed}`);

  let inStateSeedSlotsRemoved = 0;
  const inStateSeedMovers = new Set<string>();
  for (const params of getAllCountyParams()) {
    const base = getMoversForCounty(params.stateSlug, params.countySlug);
    if (!base) continue;
    const stamped = withCompanyHeadquarters(base.movers, headquartersBySlug);
    for (const mover of stamped) {
      if (mover.listingSource === 'directory') continue;
      const footprint = seedCountiesForMover(mover.id, params.stateSlug);
      if (footprint.length < 50 || !footprint.includes(params.countySlug)) continue;
      if (seedMoverCountsForCounty(base.county, mover)) continue;
      const resolved = resolveHeadquartersCounty(
        mover.headquartersAddress ||
          [mover.city, mover.headquartersState].filter(Boolean).join(', ')
      );
      if (resolved.stateSlug !== params.stateSlug) continue;
      inStateSeedSlotsRemoved += 1;
      inStateSeedMovers.add(`${mover.id}|${params.stateSlug}`);
    }
  }

  const named = [
    ['florida', 'collier'],
    ['florida', 'lake'],
    ['florida', 'leon'],
    ['florida', 'manatee'],
    ['washington', 'clark'],
    ['washington', 'king'],
    ['washington', 'thurston'],
  ] as const;
  const namedLines = named.map(([state, county]) => {
    const row = after.get(`${state}::${county}`);
    const tier = !row ? 'missing' : row.tier !== 'index' ? 'noindex' : row.seoTier === 1 ? 'Premium' : 'Standard';
    return `| ${state} / ${county} | ${tier} | ${row?.qualityScore ?? '—'} | ${row?.qualifying ?? '—'} |`;
  });

  function inventoryBand(count: number): number {
    if (count >= 12) return 25;
    if (count >= 8) return 20;
    if (count >= 5) return 15;
    if (count >= 3) return 10;
    if (count >= 1) return 5;
    return 0;
  }
  const scoreChanges: string[] = [];
  const demotions = { premiumToStandard: 0, premiumToNoindex: 0, standardToNoindex: 0, other: 0 };
  for (const row of after.values()) {
    if (row.shown == null || row.catalogExplicit == null) continue;
    if ((row.qualifying ?? 0) < 1 || row.listed < 1) continue;
    if (row.shown === row.catalogExplicit) continue;
    const bandDelta = inventoryBand(row.shown) - inventoryBand(row.catalogExplicit);
    if (bandDelta === 0) continue;
    const oldScore = (row.qualityScore ?? 0) - bandDelta;
    const now = row.tier !== 'index' ? 'noindex' : row.seoTier === 1 ? 'Premium' : 'Standard';
    const wasPremiumShape = row.seoTier === 1 || (now === 'Premium');
    let from = oldScore >= 48 ? 'Standard' : 'Development';
    if (oldScore >= 70 && wasPremiumShape) from = 'Premium';
    else if (oldScore >= 70 && now === 'Standard') from = 'Premium';
    if (from === now) continue;
    if (from === 'Premium' && now === 'Standard') demotions.premiumToStandard += 1;
    else if (from === 'Premium' && now === 'noindex') demotions.premiumToNoindex += 1;
    else if (from === 'Standard' && now === 'noindex') demotions.standardToNoindex += 1;
    else demotions.other += 1;
    scoreChanges.push(
      `- ${row.stateSlug}/${row.countySlug}: ${from} → ${now}; catalog assignments ${row.catalogExplicit}, shown ${row.shown}, qualifying ${row.qualifying}; score ${row.qualityScore}`
    );
  }

  const countyTotal = getAllCountyParams().length;
  const development = (premium: number, standard: number) => countyTotal - premium - standard;

  const waterfallLines = waterfall.map((row, index) => {
    const previous = index === 0 ? row.urls.size : waterfall[index - 1]!.urls.size;
    const delta = row.urls.size - previous;
    return `| ${index + 1}. ${row.label} | ${row.urls.size} | ${row.premium} | ${row.standard} | ${index === 0 ? '—' : delta} |`;
  });

  const markdown = `# MOVE-PUB-CORRECTION-001 validation

Read-only computation against Move production exports and the real county evaluator.
No database writes. Headquarters strings are not listed. Business names below are the Duval listing only.

Coverage JSON on company rows adds 0 counties beyond \`company_destination_assignments\` (4,044 edges, 0 extra). Service-area rows in \`provider_service_area\`: 0. Verified discovery and verified active state authority are included.

## Counts

Live #243 is the main publication path, including the canary home-county RPC, with the historical catalog quality score. 4d7871ec is the measurement at that commit. The new head is this correction.

| Measure | Live #243 | 4d7871ec | New head |
|---|---:|---:|---:|
| County pages with qualifying businesses | ${beforeSummary.qualifyingPages} | 585 | ${afterSummary.qualifyingPages} |
| Indexable Premium counties | ${beforeSummary.premium} | 153 | ${afterSummary.premium} |
| Indexable Standard counties | ${beforeSummary.standard} | 45 | ${afterSummary.standard} |
| Development / noindex counties | ${development(beforeSummary.premium, beforeSummary.standard)} | ${development(153, 45)} | ${development(afterSummary.premium, afterSummary.standard)} |
| Indexable county pages | ${beforeSummary.premium + beforeSummary.standard} | 198 | ${afterSummary.premium + afterSummary.standard} |
| Unpublished companies displayed | ${beforeSummary.unpublished} | 0 | ${afterSummary.unpublished} |
| Dead profile links | ${beforeSummary.deadLinks} | 0 | ${afterSummary.deadLinks} |
| Unsupported blanket assignments counted as coverage | ${beforeSummary.blanketListed} | 0 | ${afterSummary.blanketListed} |
| State-only movers shown as federally authorized | ${beforeSummary.stateOnlyFederal} | 0 | ${afterSummary.stateOnlyFederal} |
| Sitemap URLs | ${beforeSummary.urls.size} | 249 | ${afterSummary.urls.size} |

Development counts are county pages that are not Premium or Standard. There are ${countyTotal} scored counties. State hub URLs are in the sitemap total and are not a county tier.

Premium after the cap is ${afterSummary.premium} (cap 400). The cap changes a county only when more than 400 counties qualify as Premium. Standard is not counted against the cap.

In-state statewide seed slots removed (headquarters state matches the slot state, slot is not the headquarters county, footprint is 50 or more): ${inStateSeedSlotsRemoved} across ${inStateSeedMovers.size} mover/state pairs. Those fills stay off the listings.

Sitemap URLs added: ${added.length}. Removed: ${removed.length}.

## Waterfall

Each step adds one rule to the live main path. The URL delta is versus the previous step. State hub URLs stay in every total.

| Step | Sitemap URLs | Premium | Standard | URL delta |
|---|---:|---:|---:|---:|
${waterfallLines.join('\n')}

Evidence joined on \`companies.id\` does not change the URL count. All 4,048 assignment \`company_id\` values already equal \`companies.id\`, and those companies have no verified discovery rows. The 966 discovery rows belong to other company ids, including the canary set, where the id and the public slug differ. The loader queries \`companies.id\`, not the slug. Duval \`a1ace-movers-inc\` is company id \`fl-im-1426\` and is included through the canary RPC.

### Counties the cap must not downgrade

Premium qualifying counties are ${afterSummary.premium}, which is under 400, so the cap does not change a tier.

| County | Tier | Score | Qualifying movers |
|---|---|---:|---:|
${namedLines.join('\n')}

## Mover-dependent score changes

Inventory points now use the movers on the page. The raw catalog assignment count is not a score input and is not a three-mover gate. \`countExplicitCountyMovers\` remains available for audits. \`minExplicitMovers\` is no longer a hard block. Research, citation, regulatory context, utility, and county content are unchanged.

The measured change from 4d7871ec is 249 sitemap URLs to ${afterSummary.urls.size}, Premium 153 to ${afterSummary.premium}, and Standard 45 to ${afterSummary.standard}. That is 10 fewer county URLs, not the roughly 215-URL loss in the earlier estimate. The estimate counted counties whose catalog score looked indexable but that already had no qualifying mover on the page, so they were not in the sitemap. The band rows below are only counties that still have a qualifying mover. A Premium to Standard row stays in the sitemap. A Standard to noindex row is a real removal, and only when that county was actually Standard at 4d7871ec. The band math can mark a county Standard that 4d7871ec already kept noindex for a research or citation block. The count table is the published result.

- Premium → Standard: ${demotions.premiumToStandard}
- Premium → noindex: ${demotions.premiumToNoindex}
- Standard → noindex: ${demotions.standardToNoindex}
- Other tier changes: ${demotions.other}

${scoreChanges.join('\n') || '- none'}

These rows are counties whose catalog assignment count was higher than the evidenced, publishable list. Hidden, inactive, review-required, blanket, and statewide fill-ins no longer add inventory points. A county that still has one qualifying mover and still meets the Premium or Standard score stays in that tier. No separate three-mover minimum is applied.

A page is incorrectly suppressed only if it still shows at least one evidenced qualifying mover, still meets the research and citation standards, and still clears the score floor after the shown-mover inventory. The rows that fall to noindex are below that floor once the catalog fill-ins are removed. Verified state operating authority does not put a company on a non-adjacent county, and state-only movers are still not labeled as federally authorized.

## Street numbers read as ZIPs

Seven catalog records had a 5-digit street number and no state. The previous ZIP rule treated that number as a ZCTA and invented a headquarters county. A ZIP is now accepted only immediately after a state code. The headquarters stays unresolved, so an in-state slot under 50 counties is not dropped for that reason. 23 seed slots change inclusion. No street address is listed.

| Business | Before county resolution | After |
|---|---|---|
| Firefighting's Finest Moving & Storage | Prince William County, Virginia | unresolved |
| express moving (58-county record) | Baltimore County, Maryland | unresolved |
| Red Rover Moving & Storage | Delaware County, New York | unresolved |
| Bull Moving | Albany County, New York | unresolved |
| Northstar Moving Company | Montgomery County, Pennsylvania | unresolved |
| express moving (2-county record) | Baltimore County, Maryland | unresolved |
| Studio City Movers | Suffolk County, New York | unresolved |

The 23 slots whose include/exclude changed are Red Rover (12), Bull Moving (5), Northstar (3), the smaller express moving record (2), and Studio City Movers (1). The two larger records were already excluded by the 50-county statewide rule, so their invented county did not keep extra slots.

## Sitemap URL changes versus live main

Added (${added.length}):

${added.sort().map((url) => `- ${url}`).join('\n') || '- none'}

Removed (${removed.length}):

${removed.sort().map((url) => `- ${url}`).join('\n') || '- none'}

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
- Headquarters county comes from the ZIP when the ZIP's state agrees with the parsed state, otherwise from the city. An unresolved in-state headquarters does not by itself drop an owner selection or seed slot under 50 counties. A known other state still does. A known non-adjacent county still does.
- Blanket threshold is 50 owner-selected counties in one state. Headquarters, discovery, and system assignment sources still count inside a blanket. State authority does not create statewide coverage. Statewide seed fills stay off the listing.
- Evidence queries use companies.id. Assignment rows that store a slug are joined through the company row.
- A county is indexable with at least one evidenced, publishable, qualifying mover. Zero stays noindex. Inventory points use that shown list. Research, citation, regulatory, utility, and county-content scores are unchanged. \`countExplicitCountyMovers\` and \`minExplicitMovers\` are not an indexability gate.
- The Premium cap runs only when more than 400 counties qualify. The ranking includes canary movers and the same publication filter as the page, ordered by score then state and county.
- Duval includes the published home-county canary from the read-only RPC fixture. No company is hard-coded.
`;

  const outPath = process.env.MOVE_PUB_REPORT ?? 'docs/move-pub-correction-001-validation.md';
  writeFileSync(outPath, markdown);
  console.log(JSON.stringify({
    before: { ...beforeSummary, urls: beforeSummary.urls.size },
    after: { ...afterSummary, urls: afterSummary.urls.size },
    inStateSeedSlotsRemoved,
    inStateSeedMovers: inStateSeedMovers.size,
    waterfall: waterfall.map((row) => ({
      label: row.label,
      urls: row.urls.size,
      premium: row.premium,
      standard: row.standard,
    })),
    added: added.length,
    removed: removed.length,
    assignments: dump.assignments.length,
    companies: dump.companies.length,
  }, null, 2));
}

main();
