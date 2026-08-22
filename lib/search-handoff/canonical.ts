/** Ask query strings never belong on canonical URLs. */

export function cleanCanonicalPath(path: string): string {
  return (path.split('?')[0] || '/').replace(/\/$/, '') || '/';
}

export function hrefHasAskParams(href: string): boolean {
  return /[?&]src=ask(?:&|$)/i.test(href);
}
