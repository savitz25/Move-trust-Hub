import type { MetadataRoute } from 'next';
import { generateInsuranceSitemap } from '@/lib/insurance/seo/generate-insurance-sitemap';

/** Internal route /insurance/sitemap.xml — rewritten from apex /sitemap.xml on ITH host. */
export default function sitemap(): MetadataRoute.Sitemap {
  return generateInsuranceSitemap();
}
