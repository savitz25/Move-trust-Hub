import { hubPath } from '@/lib/hub/paths';

/** Full App Router href under the Insurance hub (includes `/insurance` prefix). */
export function insuranceHref(path: string = '/'): string {
  return hubPath('insurance', path);
}