import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Company } from '@/types';

/** Fields needed to render /compare without the full directory payload */
export type CompareSnapshot = Pick<
  Company,
  | 'id'
  | 'slug'
  | 'name'
  | 'overallRating'
  | 'reviewCount'
  | 'reputationScore'
  | 'avgPricePerMove'
  | 'priceRange'
  | 'yearsInBusiness'
  | 'foundedYear'
  | 'fmcsaSafetyRating'
  | 'fmcsaComplaints'
  | 'fmcsaShipments'
  | 'bbbRating'
  | 'bbbAccredited'
  | 'coverage'
  | 'services'
  | 'specialties'
  | 'usdotNumber'
  | 'mcNumber'
  | 'headquarters'
  | 'serviceScope'
  | 'entityType'
  | 'isVerified'
  | 'shortDescription'
  | 'description'
  | 'website'
  | 'lastUpdated'
  | 'ratingBreakdown'
>;

function toSnapshot(company: Company): CompareSnapshot {
  return {
    id: company.id,
    slug: company.slug,
    name: company.name,
    overallRating: company.overallRating,
    reviewCount: company.reviewCount,
    reputationScore: company.reputationScore,
    avgPricePerMove: company.avgPricePerMove,
    priceRange: company.priceRange,
    yearsInBusiness: company.yearsInBusiness,
    foundedYear: company.foundedYear,
    fmcsaSafetyRating: company.fmcsaSafetyRating,
    fmcsaComplaints: company.fmcsaComplaints,
    fmcsaShipments: company.fmcsaShipments,
    bbbRating: company.bbbRating,
    bbbAccredited: company.bbbAccredited,
    coverage: company.coverage,
    services: company.services ?? [],
    specialties: company.specialties ?? [],
    usdotNumber: company.usdotNumber,
    mcNumber: company.mcNumber,
    headquarters: company.headquarters,
    serviceScope: company.serviceScope,
    entityType: company.entityType,
    isVerified: company.isVerified,
    shortDescription: company.shortDescription ?? '',
    description: company.description ?? '',
    website: company.website ?? '',
    lastUpdated: company.lastUpdated ?? new Date().toISOString(),
    ratingBreakdown: company.ratingBreakdown ?? {
      fiveStar: 0,
      fourStar: 0,
      threeStar: 0,
      twoStar: 0,
      oneStar: 0,
    },
  };
}

function snapshotAsCompany(snap: CompareSnapshot): Company {
  return snap as Company;
}

interface CompareState {
  selectedSlugs: string[];
  snapshots: Record<string, CompareSnapshot>;
  hasHydrated: boolean;

  toggleCompany: (company: Company) => void;
  removeCompany: (slug: string) => void;
  clearAll: () => void;
  isSelected: (slug: string) => boolean;
  canAddMore: () => boolean;
  setHasHydrated: (v: boolean) => void;
  getSelectedCompanies: (allCompanies: Company[]) => Company[];
}

export const MAX_COMPARE = 4;

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      selectedSlugs: [],
      snapshots: {},
      hasHydrated: false,

      setHasHydrated: (v) => set({ hasHydrated: v }),

      toggleCompany: (company) => {
        const { selectedSlugs, snapshots } = get();
        const isSelected = selectedSlugs.includes(company.slug);

        if (isSelected) {
          const nextSnaps = { ...snapshots };
          delete nextSnaps[company.slug];
          set({
            selectedSlugs: selectedSlugs.filter((s) => s !== company.slug),
            snapshots: nextSnaps,
          });
        } else if (selectedSlugs.length < MAX_COMPARE) {
          set({
            selectedSlugs: [...selectedSlugs, company.slug],
            snapshots: { ...snapshots, [company.slug]: toSnapshot(company) },
          });
        }
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

      getSelectedCompanies: (allCompanies) => {
        const { selectedSlugs, snapshots } = get();
        return selectedSlugs
          .map((slug) => {
            const fromList = allCompanies.find((c) => c.slug === slug);
            if (fromList) return fromList;
            const snap = snapshots[slug];
            return snap ? snapshotAsCompany(snap) : null;
          })
          .filter(Boolean) as Company[];
      },
    }),
    {
      name: 'im-compare-storage',
      version: 2,
      partialize: (state) => ({
        selectedSlugs: state.selectedSlugs,
        snapshots: state.snapshots,
      }),
      migrate: (persisted, version) => {
        const p = persisted as {
          selectedSlugs?: string[];
          snapshots?: Record<string, CompareSnapshot>;
        };
        if (version < 2) {
          return {
            selectedSlugs: p.selectedSlugs ?? [],
            snapshots: p.snapshots ?? {},
          };
        }
        return p as { selectedSlugs: string[]; snapshots: Record<string, CompareSnapshot> };
      },
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
