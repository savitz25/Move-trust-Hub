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
  };
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
 * Resolve slugs → companies never returns null entries and never throws.
 * Priority: directory list → snapshot → lightweight placeholder from slug.
 */
export function resolveCompareCompanies(
  slugs: string[],
  allCompanies: Company[],
  snapshots: Record<string, CompareSnapshot | undefined>
): Company[] {
  const list = Array.isArray(allCompanies) ? allCompanies : [];
  const bySlug = new Map<string, Company>();
  for (const c of list) {
    if (c?.slug) bySlug.set(c.slug, c);
  }

  const out: Company[] = [];
  for (const slug of slugs.slice(0, MAX_COMPARE)) {
    if (!slug) continue;
    try {
      const fromList = bySlug.get(slug);
      if (fromList) {
        out.push(ensureCompany(fromList));
        continue;
      }
      const snap = snapshots?.[slug];
      if (snap && typeof snap === 'object') {
        out.push(ensureCompany({ ...snap, slug: snap.slug || slug }));
        continue;
      }
      out.push(placeholderCompanyFromSlug(slug));
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
        const s = slug?.trim();
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
