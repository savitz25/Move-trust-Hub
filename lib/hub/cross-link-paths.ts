/** Paths that show the cross-hub life-event promo bar (server-safe). */
export function shouldShowCrossLinks(pathname: string): boolean {
  return (
    pathname === '/' ||
    pathname === '/lender' ||
    pathname === '/insurance' ||
    pathname === '/moving-calculator' ||
    pathname === '/companies' ||
    pathname === '/auto-transport' ||
    pathname.startsWith('/lender/calculators') ||
    pathname.startsWith('/insurance/calculators') ||
    pathname.startsWith('/moving-to/')
  );
}