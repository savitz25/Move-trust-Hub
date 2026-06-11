import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Company } from '@/types';

interface CompareState {
  selectedSlugs: string[];
  selectedCompanies: Company[]; // hydrated from slugs when needed

  toggleCompany: (company: Company) => void;
  removeCompany: (slug: string) => void;
  clearAll: () => void;
  isSelected: (slug: string) => boolean;
  canAddMore: () => boolean;
}

const MAX_COMPARE = 4;

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      selectedSlugs: [],
      selectedCompanies: [],

      toggleCompany: (company) => {
        const { selectedSlugs } = get();
        const isSelected = selectedSlugs.includes(company.slug);

        if (isSelected) {
          set({
            selectedSlugs: selectedSlugs.filter(s => s !== company.slug),
          });
        } else if (selectedSlugs.length < MAX_COMPARE) {
          set({
            selectedSlugs: [...selectedSlugs, company.slug],
          });
        }
      },

      removeCompany: (slug) => {
        set((state) => ({
          selectedSlugs: state.selectedSlugs.filter(s => s !== slug),
        }));
      },

      clearAll: () => set({ selectedSlugs: [] }),

      isSelected: (slug) => get().selectedSlugs.includes(slug),

      canAddMore: () => get().selectedSlugs.length < MAX_COMPARE,
    }),
    {
      name: 'im-compare-storage',
      partialize: (state) => ({ selectedSlugs: state.selectedSlugs }),
    }
  )
);
