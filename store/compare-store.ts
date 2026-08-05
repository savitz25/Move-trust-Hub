import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Company, Region, ServiceType } from '@/types';

export const MAX_COMPARE = 4;
export const COMPARE_STORAGE_KEY = 'im-compare-storage';

/** Minimal fields needed to render /compare without the full directory payload */
export type CompareSnapshot = {
  id: string;
  slug: string;
  name: string;
  overallRating: number;
  reviewCount: number;
  reputationScore: number;
  avgPricePerMove: number;
  priceRange: string;
  yearsInBusiness: number;
  foundedYear: number;
  fmcsaSafetyRating: Company['fmcsaSafetyRating'];
  fmcsaComplaints: number;
  fmcsaShipments: number;
  bbbRating: Company['bbbRating'];
  bbbAccredited: boolean;
  coverage: Region | string;
  services: ServiceType[] | string[];
  specialties: string[];
  usdotNumber: string;
  mcNumber: string;
  headquarters: string;
  serviceScope?: Company['serviceScope'];
  entityType?: string | null;
  isVerified: boolean;
  shortDescription: string;
  description: string;
  website: string;
  lastUpdated: string;
  ratingBreakdown: Company['ratingBreakdown'];
};

function safeNum(v: unknown, fallback = 0): number {
  const n = typeof v === 'number' ? v : Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function safeStr(v: unknown, fallback = ''): string {
  if (typeof v === 'string') return v;
  if (v == null) return fallback;
  return String(v);
}

function safeStrArr(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v.map((x) => safeStr(x)).filter(Boolean);
}

/** Humanize slug when we only have the URL param */
export function titleFromSlug(slug: string): string {
  return slug
    .split(/[-_]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export function placeholderCompanyFromSlug(slug: string): Company {
  const name = titleFromSlug(slug);
  return {
    id: `placeholder:${slug}`,
    slug,
    name,
    shortDescription: '',
    description: '',
    foundedYear: 0,
    headquarters: '—',
    website: '',
    usdotNumber: '',
    mcNumber: '',
    fmcsaSafetyRating: 'Not Rated',
    fmcsaComplaints: 0,
    fmcsaShipments: 0,
    bbbRating: 'NR',
    bbbAccredited: false,
    overallRating: 0,
    reviewCount: 0,
    reputationScore: 0,
    yearsInBusiness: 0,
    avgPricePerMove: 0,
    priceRange: '—',
    coverage: 'Continental US',
    services: [],
    specialties: [],
    ratingBreakdown: {
      fiveStar: 0,
      fourStar: 0,
      threeStar: 0,
      twoStar: 0,
      oneStar: 0,
    },
    isVerified: false,
    lastUpdated: new Date().toISOString(),
  };
}

export function toSnapshot(company: Company): CompareSnapshot {
  return {
    id: safeStr(company.id, company.slug),
    slug: safeStr(company.slug),
    name: safeStr(company.name, titleFromSlug(company.slug)),
    overallRating: safeNum(company.overallRating),
    reviewCount: safeNum(company.reviewCount),
    reputationScore: safeNum(company.reputationScore),
    avgPricePerMove: safeNum(company.avgPricePerMove),
    priceRange: safeStr(company.priceRange, '—'),
    yearsInBusiness: safeNum(company.yearsInBusiness),
    foundedYear: safeNum(company.foundedYear),
    fmcsaSafetyRating: company.fmcsaSafetyRating || 'Not Rated',
    fmcsaComplaints: safeNum(company.fmcsaComplaints),
    fmcsaShipments: safeNum(company.fmcsaShipments),
    bbbRating: company.bbbRating || 'NR',
    bbbAccredited: Boolean(company.bbbAccredited),
    coverage: (company.coverage as Region) || 'Continental US',
    services: safeStrArr(company.services) as ServiceType[],
    specialties: safeStrArr(company.specialties),
    usdotNumber: safeStr(company.usdotNumber),
    mcNumber: safeStr(company.mcNumber),
    headquarters: safeStr(company.headquarters, '—'),
    serviceScope: company.serviceScope,
    entityType: company.entityType ?? null,
    isVerified: Boolean(company.isVerified),
    shortDescription: safeStr(company.shortDescription),
    description: safeStr(company.description),
    website: safeStr(company.website),
    lastUpdated: safeStr(company.lastUpdated, new Date().toISOString()),
    ratingBreakdown: company.ratingBreakdown ?? {
      fiveStar: 0,
      fourStar: 0,
      threeStar: 0,
      twoStar: 0,
      oneStar: 0,
    },
    // Cast extras stored on snapshot for badge/profile parity (optional)
    ...(company.usdotStatus ? { usdotStatus: company.usdotStatus } : {}),
    ...(company.authorityActive != null
      ? { authorityActive: company.authorityActive }
      : {}),
  } as CompareSnapshot;
}

/** Normalize any partial snapshot / company into a render-safe Company */
export function ensureCompany(input: Partial<Company> & { slug: string }): Company {
  const base = placeholderCompanyFromSlug(input.slug);
  return {
    ...base,
    ...input,
    id: safeStr(input.id, base.id),
    slug: safeStr(input.slug, base.slug),
    name: safeStr(input.name, base.name),
    overallRating: safeNum(input.overallRating, base.overallRating),
    reviewCount: safeNum(input.reviewCount, base.reviewCount),
    reputationScore: safeNum(input.reputationScore, base.reputationScore),
    avgPricePerMove: safeNum(input.avgPricePerMove, base.avgPricePerMove),
    priceRange: safeStr(input.priceRange, base.priceRange),
    yearsInBusiness: safeNum(input.yearsInBusiness, base.yearsInBusiness),
    foundedYear: safeNum(input.foundedYear, base.foundedYear),
    fmcsaSafetyRating: input.fmcsaSafetyRating || base.fmcsaSafetyRating,
    fmcsaComplaints: safeNum(input.fmcsaComplaints, base.fmcsaComplaints),
    fmcsaShipments: safeNum(input.fmcsaShipments, base.fmcsaShipments),
    bbbRating: input.bbbRating || base.bbbRating,
    bbbAccredited: Boolean(input.bbbAccredited),
    coverage: (input.coverage as Region) || base.coverage,
    services: (safeStrArr(input.services).length
      ? safeStrArr(input.services)
      : base.services) as ServiceType[],
    specialties: safeStrArr(input.specialties),
    usdotNumber: safeStr(input.usdotNumber),
    mcNumber: safeStr(input.mcNumber),
    headquarters: safeStr(input.headquarters, base.headquarters),
    isVerified: Boolean(input.isVerified),
    shortDescription: safeStr(input.shortDescription),
    description: safeStr(input.description),
    website: safeStr(input.website),
    lastUpdated: safeStr(input.lastUpdated, base.lastUpdated),
    ratingBreakdown: input.ratingBreakdown ?? base.ratingBreakdown,
    serviceScope: input.serviceScope ?? base.serviceScope,
    entityType: input.entityType ?? base.entityType ?? null,
    usdotStatus: input.usdotStatus ?? base.usdotStatus,
    authorityActive: input.authorityActive ?? base.authorityActive,
    googleData: input.googleData ?? base.googleData,
  };
}

export function parseAddQueryParams(searchParams: {
  getAll: (k: string) => string[];
  get: (k: string) => string | null;
}): string[] {
  const raw: string[] = [];
  for (const v of searchParams.getAll('add')) {
    if (!v) continue;
    // Support ?add=a,b,c and repeated ?add=
    for (const part of v.split(',')) {
      const s = part.trim().toLowerCase();
      if (s) raw.push(s);
    }
  }
  // Dedupe preserving order, cap at MAX_COMPARE
  const seen = new Set<string>();
  const out: string[] = [];
  for (const s of raw) {
    if (seen.has(s)) continue;
    seen.add(s);
    out.push(s);
    if (out.length >= MAX_COMPARE) break;
  }
  return out;
}

/**
 * True when this is a stub (placeholder or thin snapshot) and should be
 * upgraded by live profile lookup when possible.
 */
export function isThinCompanyMetrics(c: Partial<Company> | null | undefined): boolean {
  if (!c) return true;
  const rep = safeNum(c.reputationScore);
  const rating = safeNum(c.overallRating);
  const reviews = safeNum(c.reviewCount);
  const usdot = safeStr(c.usdotNumber).replace(/\D/g, '');
  const hasId = usdot.length >= 5;
  const hasServices = Array.isArray(c.services) && c.services.length > 0;
  // Real profiles: rep/rating/reviews and/or USDOT
  if (rep >= 10 || rating >= 1 || reviews >= 1) return false;
  if (hasId && (rep > 0 || rating > 0 || hasServices)) return false;
  if (hasId && c.isVerified) return false;
  // Placeholder ids always thin
  if (safeStr(c.id).startsWith('placeholder:')) return true;
  // No license + all zeros → thin
  return !hasId && rep === 0 && rating === 0 && reviews === 0;
}

function richnessScore(c: Partial<Company> | null | undefined): number {
  if (!c) return 0;
  let s = 0;
  s += Math.min(safeNum(c.reputationScore), 100);
  s += safeNum(c.overallRating) * 10;
  s += Math.min(safeNum(c.reviewCount), 50);
  if (safeStr(c.usdotNumber).replace(/\D/g, '').length >= 5) s += 20;
  if (Array.isArray(c.services) && c.services.length) s += 5;
  if (c.serviceScope === 'interstate') s += 5;
  if (c.isVerified) s += 5;
  if (!safeStr(c.id).startsWith('placeholder:')) s += 3;
  return s;
}

/**
 * Resolve slugs → companies never returns null entries and never throws.
 * Priority among candidates: richest metrics (live list / snapshot), else placeholder.
 */
export function resolveCompareCompanies(
  slugs: string[],
  allCompanies: Company[],
  snapshots: Record<string, CompareSnapshot | undefined>
): Company[] {
  const list = Array.isArray(allCompanies) ? allCompanies : [];
  const bySlug = new Map<string, Company>();
  for (const c of list) {
    if (c?.slug) bySlug.set(c.slug.toLowerCase(), ensureCompany(c));
  }

  const out: Company[] = [];
  for (const rawSlug of slugs.slice(0, MAX_COMPARE)) {
    const slug = rawSlug?.trim().toLowerCase();
    if (!slug) continue;
    try {
      const candidates: Company[] = [];
      const fromList = bySlug.get(slug);
      if (fromList) candidates.push(fromList);

      const snap = snapshots?.[slug] ?? snapshots?.[rawSlug];
      if (snap && typeof snap === 'object') {
        candidates.push(ensureCompany({ ...snap, slug: snap.slug || slug }));
      }

      if (candidates.length === 0) {
        out.push(placeholderCompanyFromSlug(slug));
        continue;
      }

      // Prefer fullest metrics (not first match)
      candidates.sort((a, b) => richnessScore(b) - richnessScore(a));
      out.push(candidates[0]!);
    } catch (e) {
      console.warn('[resolveCompareCompanies] slug failed, using placeholder', slug, e);
      out.push(placeholderCompanyFromSlug(slug));
    }
  }
  return out;
}

interface CompareState {
  selectedSlugs: string[];
  snapshots: Record<string, CompareSnapshot>;
  hasHydrated: boolean;

  toggleCompany: (company: Company) => void;
  addSlugWithOptionalCompany: (slug: string, company?: Company | null) => void;
  /** Merge live/profile companies into snapshots (upgrade thin placeholders). */
  hydrateCompanies: (companies: Company[]) => void;
  removeCompany: (slug: string) => void;
  clearAll: () => void;
  isSelected: (slug: string) => boolean;
  canAddMore: () => boolean;
  setHasHydrated: (v: boolean) => void;
}

function clearCorruptCompareStorage() {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(COMPARE_STORAGE_KEY);
  } catch {
    // ignore
  }
}

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      selectedSlugs: [],
      snapshots: {},
      hasHydrated: false,

      setHasHydrated: (v) => set({ hasHydrated: v }),

      toggleCompany: (company) => {
        if (!company?.slug) return;
        const slug = company.slug;
        const { selectedSlugs, snapshots } = get();
        const isSelected = selectedSlugs.includes(slug);

        if (isSelected) {
          const nextSnaps = { ...snapshots };
          delete nextSnaps[slug];
          set({
            selectedSlugs: selectedSlugs.filter((s) => s !== slug),
            snapshots: nextSnaps,
          });
        } else if (selectedSlugs.length < MAX_COMPARE) {
          set({
            selectedSlugs: [...selectedSlugs, slug],
            snapshots: { ...snapshots, [slug]: toSnapshot(ensureCompany(company)) },
          });
        }
      },

      addSlugWithOptionalCompany: (slug, company) => {
        const s = slug?.trim().toLowerCase();
        if (!s) return;
        const { selectedSlugs, snapshots } = get();
        if (selectedSlugs.includes(s) || selectedSlugs.length >= MAX_COMPARE) return;
        const snap = company
          ? toSnapshot(ensureCompany({ ...company, slug: s }))
          : toSnapshot(placeholderCompanyFromSlug(s));
        set({
          selectedSlugs: [...selectedSlugs, s],
          snapshots: { ...snapshots, [s]: snap },
        });
      },

      hydrateCompanies: (companies) => {
        if (!Array.isArray(companies) || companies.length === 0) return;
        const { snapshots, selectedSlugs } = get();
        const next = { ...snapshots };
        let changed = false;
        for (const raw of companies) {
          if (!raw?.slug) continue;
          const slug = raw.slug.toLowerCase();
          const rich = ensureCompany({ ...raw, slug });
          if (isThinCompanyMetrics(rich)) continue;
          const existing = next[slug];
          if (!existing || richnessScore(rich) > richnessScore(existing)) {
            next[slug] = toSnapshot(rich);
            changed = true;
          }
          // Ensure slug is selected if we hydrated from deep link list
          if (!selectedSlugs.includes(slug) && selectedSlugs.length < MAX_COMPARE) {
            // do not auto-add — only upgrade snapshots for existing selection
          }
        }
        if (changed) set({ snapshots: next });
      },

      removeCompany: (slug) => {
        set((state) => {
          const nextSnaps = { ...state.snapshots };
          delete nextSnaps[slug];
          return {
            selectedSlugs: state.selectedSlugs.filter((s) => s !== slug),
            snapshots: nextSnaps,
          };
        });
      },

      clearAll: () => set({ selectedSlugs: [], snapshots: {} }),

      isSelected: (slug) => get().selectedSlugs.includes(slug),

      canAddMore: () => get().selectedSlugs.length < MAX_COMPARE,
    }),
    {
      name: COMPARE_STORAGE_KEY,
      version: 3,
      storage: createJSONStorage(() => {
        if (typeof window === 'undefined') {
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          };
        }
        return localStorage;
      }),
      partialize: (state) => ({
        selectedSlugs: Array.isArray(state.selectedSlugs) ? state.selectedSlugs : [],
        snapshots:
          state.snapshots && typeof state.snapshots === 'object' ? state.snapshots : {},
      }),
      migrate: (persisted, version) => {
        try {
          const p = (persisted ?? {}) as {
            selectedSlugs?: unknown;
            snapshots?: unknown;
            state?: { selectedSlugs?: unknown; snapshots?: unknown };
          };
          // Handle both raw partial and accidental full wrapper
          const rawSlugs = Array.isArray(p.selectedSlugs)
            ? p.selectedSlugs
            : Array.isArray(p.state?.selectedSlugs)
              ? p.state!.selectedSlugs
              : [];
          const rawSnaps =
            p.snapshots && typeof p.snapshots === 'object'
              ? p.snapshots
              : p.state?.snapshots && typeof p.state.snapshots === 'object'
                ? p.state.snapshots
                : {};

          const selectedSlugs = (rawSlugs as unknown[])
            .map((s) => safeStr(s).trim())
            .filter(Boolean)
            .slice(0, MAX_COMPARE);

          const snapshots: Record<string, CompareSnapshot> = {};
          for (const [k, v] of Object.entries(rawSnaps as Record<string, unknown>)) {
            if (!k || !v || typeof v !== 'object') continue;
            try {
              const o = v as Partial<Company>;
              snapshots[k] = toSnapshot(
                ensureCompany({ ...o, slug: safeStr(o.slug, k) })
              );
            } catch {
              snapshots[k] = toSnapshot(placeholderCompanyFromSlug(k));
            }
          }

          // v1 had only selectedSlugs — fine
          void version;
          return { selectedSlugs, snapshots };
        } catch (e) {
          console.error('[compare-store] migrate failed, resetting', e);
          clearCorruptCompareStorage();
          return { selectedSlugs: [], snapshots: {} };
        }
      },
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error('[compare-store] rehydrate error', error);
          clearCorruptCompareStorage();
        }
        // Always mark hydrated so UI is not stuck / never crashes on missing flag
        try {
          useCompareStore.setState({ hasHydrated: true });
        } catch {
          state?.setHasHydrated?.(true);
        }
      },
    }
  )
);

/** One-shot: clear device compare storage (recovery from corrupt persist). */
export function resetCompareStorage() {
  clearCorruptCompareStorage();
  useCompareStore.setState({
    selectedSlugs: [],
    snapshots: {},
    hasHydrated: true,
  });
}
