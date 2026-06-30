import { JsonLd } from '@/lib/seo/json-ld';
import { buildBasicRouteGuideSchemaGraph } from '@/lib/seo/build-basic-route-guide-schema';
import type { RouteGuide } from '@/lib/resources/routes';

export function BasicRouteGuideSchema({
  route,
  path,
}: {
  route: RouteGuide;
  path: string;
}) {
  return <JsonLd data={buildBasicRouteGuideSchemaGraph(route, path)} />;
}