import { JsonLd } from '@/lib/seo/json-ld';
import { buildRouteGuideSchemaGraph } from '@/lib/seo/build-route-guide-schema';
import type { RouteGuide } from '@/lib/resources/routes';
import type { RouteGuideExtendedContent } from '@/lib/resources/routes/types';

const SITE_URL = 'https://www.movetrusthub.com';

export function RouteGuideSchema({
  route,
  content,
  path,
}: {
  route: RouteGuide;
  content: RouteGuideExtendedContent;
  path: string;
}) {
  const canonical = `${SITE_URL}${path}`;
  const data = buildRouteGuideSchemaGraph(route, content, canonical);
  return <JsonLd data={data} />;
}