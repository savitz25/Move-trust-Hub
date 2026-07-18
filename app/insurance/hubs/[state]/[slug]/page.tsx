import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getHubBySlug, getAllHubParams } from '@/lib/insurance/hubs/registry';
import { HubPageView } from '@/components/insurance/hub-page-view';
import { evaluateInsuranceHubIndexability } from '@/lib/hub/indexability';
import { buildHubMetadata } from '@/lib/hub/metadata';
import { ssgParams } from '@/lib/ssg/ssg-params';

export const dynamic = 'force-static';
export const dynamicParams = true;

export function generateStaticParams() {
  return ssgParams(getAllHubParams());
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string; slug: string }>;
}): Promise<Metadata> {
  const { state, slug } = await params;
  const hub = getHubBySlug(state, slug);
  if (!hub) return { title: 'Insurance Hub | Insurance Trust Hub' };

  const indexDecision = evaluateInsuranceHubIndexability(hub);
  return buildHubMetadata('insurance', {
    title: hub.metaTitle,
    description: hub.metaDescription,
    path: `/hubs/${state}/${slug}`,
    noIndex: indexDecision.tier === 'noindex',
  });
}

export default async function HubPage({
  params,
}: {
  params: Promise<{ state: string; slug: string }>;
}) {
  const { state, slug } = await params;
  const hub = getHubBySlug(state, slug);
  if (!hub) notFound();

  return <HubPageView hub={hub} />;
}