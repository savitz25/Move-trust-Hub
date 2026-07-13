import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SpecialtyTopicPage } from '@/components/insurance/specialty-topic-page';
import { getSpecialtyTopic } from '@/lib/insurance/hubs/specialty-topics';
import { buildTemplateMetadata } from '@/lib/hub/templates/metadata';

const topic = getSpecialtyTopic('aca');
if (!topic) throw new Error('aca topic missing');

export const metadata: Metadata = buildTemplateMetadata({
  hub: 'insurance',
  title: topic.metaTitle,
  description: topic.metaDescription,
  path: '/hubs/aca',
});

export default function AcaTopicPage() {
  const t = getSpecialtyTopic('aca');
  if (!t) notFound();
  return <SpecialtyTopicPage topic={t} />;
}