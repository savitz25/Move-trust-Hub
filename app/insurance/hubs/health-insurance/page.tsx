import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SpecialtyTopicPage } from '@/components/insurance/specialty-topic-page';
import { getSpecialtyTopic } from '@/lib/insurance/hubs/specialty-topics';
import { buildTemplateMetadata } from '@/lib/hub/templates/metadata';

const topic = getSpecialtyTopic('health-insurance');
if (!topic) throw new Error('health-insurance topic missing');

export const metadata: Metadata = buildTemplateMetadata({
  hub: 'insurance',
  title: topic.metaTitle,
  description: topic.metaDescription,
  path: '/insurance/hubs/health-insurance',
  keywords: ['health insurance agents', 'ACA', 'Medicare', 'employer plans'],
});

export default function HealthInsuranceTopicPage() {
  const t = getSpecialtyTopic('health-insurance');
  if (!t) notFound();
  return <SpecialtyTopicPage topic={t} />;
}