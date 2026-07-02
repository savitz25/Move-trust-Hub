import { JsonLd } from '@/lib/seo/json-ld';

type SchemaInjectorProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

/** Renders JSON-LD schema graphs with a stable script tag for crawlers. */
export function SchemaInjector({ data }: SchemaInjectorProps) {
  return <JsonLd data={data} />;
}