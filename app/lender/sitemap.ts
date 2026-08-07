import type { MetadataRoute } from 'next';

/**
 * Phase 0 domain separation:
 * Lender Trust Hub is a standalone apex (lendertrusthub.com).
 * Never emit lender URLs under movetrusthub.com/lender/sitemap.xml —
 * crawlers that hit this path must not discover a Move-hosted lender index.
 * (Middleware/config 301 /lender/* → LTH; empty sitemap is belt-and-suspenders.)
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [];
}
