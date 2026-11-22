export const rejectedPaths = [
  '/local-movers/florida', '/local-movers', '/companies', '/companies/some-slug',
  '/compare', '/sitemap.xml', '/sitemap-local', '/api', '/api/revalidate-local-movers',
  '/local-movers/florida/..', '/local-movers/florida/%2e%2e',
  '/local-movers/florida/%252e%252e', '/local-movers/../miami-dade',
  '/local-movers/Florida/Miami-Dade', '/local-movers/florida/miami-dade/',
  '/local-movers/florida/miami-dade?x=1', '/local-movers/florida/miami-dade#fragment',
  '/local-movers/florida/miami-dade/more', '/other/florida/miami-dade',
  'https://example.invalid/local-movers/florida/miami-dade',
  '//example.invalid/local-movers/florida/miami-dade',
  '/local-movers/florida/miami-dade\n', '/local-movers/florida/miami-dade\r\n',
  '/local-movers/florida/miami%2fdade', '/local-movers//miami-dade',
  '/local-movers/florida\\miami-dade',
];
