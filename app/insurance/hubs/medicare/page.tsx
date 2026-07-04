import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SpecialtyTopicPage } from '@/components/insurance/specialty-topic-page';
import { getSpecialtyTopic } from '@/lib/insurance/hubs/specialty-topics';
import { buildTemplateMetadata } from '@/lib/hub/templates/metadata';

const topic = getSpecialtyTopic('medicare');
if (!topic) throw new Error('medicare topic missing');

export const metadata: Metadata = buildTemplateMetadata({
  hub: 'insurance',
  title: topic.metaTitle,
  description: topic.metaDescription,
  path: '/insurance/hubs/medicare',
  keywords: ['Medicare agents', 'Medicare Advantage', 'Medigap', 'Part D'],
});

export default function MedicareTopicPage() {
  const t = getSpecialtyTopic('medicare');
  if (!t) notFound();
  return <SpecialtyTopicPage topic={t} />;
}