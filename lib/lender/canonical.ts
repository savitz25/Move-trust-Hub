import { hubCanonicalUrl } from '@/lib/hub/paths';

/** Lender hub root — https://www.movetrusthub.com/lender */
export const LENDER_HUB_URL = hubCanonicalUrl('lender', '/');

/** Absolute canonical URL for a lender route (hub-relative path). */
export function lenderCanonical(hubRelativePath: string): string {
  return hubCanonicalUrl('lender', hubRelativePath);
}

/** Convert a full app path (/lender/...) to an absolute canonical URL. */
export function lenderCanonicalFromAppPath(appPath: string): string {
  const relative =
    appPath.startsWith('/lender') ? appPath.slice('/lender'.length) || '/' : appPath;
  return lenderCanonical(relative);
}