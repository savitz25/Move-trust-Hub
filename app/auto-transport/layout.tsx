import type { Metadata } from 'next';
import { JsonLd } from '@/lib/seo/json-ld';
import { buildAutoTransportSchemaGraph } from '@/lib/auto-transport/schema';
import { buildMovePageMetadata } from '@/lib/seo/move-metadata';

export const metadata: Metadata = buildMovePageMetadata({
  title: 'Auto Transport Calculator & Car Shipping Companies | Free Instant Estimates',
  description:
    'Estimate open and enclosed car shipping costs by ZIP code. Compare FMCSA-licensed auto transport companies, ratings, and services — then request free carrier quotes.',
  path: '/auto-transport',
  keywords: [
    'auto transport calculator',
    'car shipping cost',
    'vehicle transport estimate',
    'open auto transport',
    'enclosed car shipping',
    'ship a car cross country',
    'auto transport companies',
  ],
});

export default function AutoTransportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={buildAutoTransportSchemaGraph()} />
      {children}
    </>
  );
}