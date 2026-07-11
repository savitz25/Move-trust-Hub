'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Filter } from 'lucide-react';

const RATING_OPTIONS = [
  { value: '', label: 'Any rating' },
  { value: '4.5', label: '4.5+ stars' },
  { value: '4.0', label: '4.0+ stars' },
  { value: '3.5', label: '3.5+ stars' },
];

export function LenderDirectoryFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const minRating = searchParams.get('minRating') ?? '';
  const bbbAccredited = searchParams.get('bbbAccredited') === 'true';

  function updateParams(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value == null || value === '') params.delete(key);
      else params.set(key, value);
    }
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  }

  return (
    <div
      className="mb-6 flex flex-wrap items-center gap-3 rounded-xl border border-zinc-200 bg-white p-4"
      aria-label="Filter lenders"
    >
      <span className="flex items-center gap-1.5 text-sm font-medium text-[#0A2540]">
        <Filter className="h-4 w-4" aria-hidden="true" />
        Filters
      </span>

      <label className="flex items-center gap-2 text-sm text-zinc-600">
        <span className="sr-only">Minimum Google rating</span>
        <select
          value={minRating}
          onChange={(e) => updateParams({ minRating: e.target.value || null })}
          className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm text-[#0A2540] focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20"
        >
          {RATING_OPTIONS.map((opt) => (
            <option key={opt.value || 'any'} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>

      <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-600">
        <input
          type="checkbox"
          checked={bbbAccredited}
          onChange={(e) =>
            updateParams({ bbbAccredited: e.target.checked ? 'true' : null })
          }
          className="h-4 w-4 rounded border-zinc-300 text-[#3B82F6] focus:ring-[#3B82F6]/30"
        />
        BBB Accredited only
      </label>
    </div>
  );
}