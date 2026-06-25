import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

export function getRatingColor(rating: number): string {
  if (rating >= 4.5) return 'text-emerald-600';
  if (rating >= 4.0) return 'text-emerald-600';
  if (rating >= 3.5) return 'text-amber-600';
  return 'text-rose-600';
}

export function calculateComplaintRatio(complaints: number, shipments: number): number {
  if (shipments === 0) return 0;
  return Number(((complaints / shipments) * 1000).toFixed(2)); // per 1000 shipments
}
