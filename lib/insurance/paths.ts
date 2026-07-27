import { hubPath } from '@/lib/hub/paths';

/**
 * Public InsuranceTrustHub href (apex paths on insurancetrusthub.com).
 * Admin routes remain under `/insurance/admin`.
 */
export function insuranceHref(path: string = '/'): string {
  return hubPath('insurance', path);
}