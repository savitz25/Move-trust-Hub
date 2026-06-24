import type { Metadata } from 'next';
import { JsonLd } from '@/lib/seo/json-ld';
import { buildAutoTransportSchemaGraph } from '@/lib/auto-transport/schema';

export const metadata: Metadata = {
  title: 'Auto Transport Calculator & Car Shipping Companies | Free Instant Estimates',
  description:
    'Estimate open and enclosed car shipping costs by ZIP code. Compare FMCSA-licensed auto transport companies, ratings, and services — then request free carrier quotes.',
  keywords: [
    'auto transport calculator',
    'car shipping cost',
    'vehicle transport estimate',
    'open auto transport',
    'enclosed car shipping',
    'ship a car cross country',
    'auto transport companies',
  ],
  openGraph: {
    title: 'Auto Transport Calculator & Car Shipping Directory',
    description:
      'Get an instant open or enclosed auto transport price range, then compare top-rated car shipping companies.',
    url: 'https://www.movetrusthub.com/auto-transport',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.movetrusthub.com/auto-transport',
  },
};

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