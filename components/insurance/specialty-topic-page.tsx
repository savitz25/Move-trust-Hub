import type { SpecialtyTopic } from '@/lib/insurance/hubs/specialty-topics';
import { getTopicFeaturedHubs, getSouthFloridaAgents } from '@/lib/insurance/hubs/specialty-topics';
import { AgentCard } from '@/components/insurance/agent-card';
import { ZipSearch } from '@/components/insurance/zip-search';
import { HowItWorks } from '@/components/insurance/how-it-works';
import { DisclaimerBanner } from '@/components/insurance/disclaimer-banner';
import { HealthHubDirectoryTemplate } from '@/components/hub/templates';
import { specialtyTopicToDirectoryData } from '@/lib/hub/templates/adapters';
import { hubPath } from '@/lib/hub/paths';

interface SpecialtyTopicPageProps {
  topic: SpecialtyTopic;
}

export function SpecialtyTopicPage({ topic }: SpecialtyTopicPageProps) {
  const featuredHubs = getTopicFeaturedHubs(topic);
  const agents = topic.filterAgents(getSouthFloridaAgents());
  const hubPathRel = topic.path.replace(/^\/insurance/, '') || '/';

  return (
    <>
      <HealthHubDirectoryTemplate
        hub="insurance"
        data={specialtyTopicToDirectoryData(topic, featuredHubs)}
        path={hubPathRel}
        breadcrumbs={[
          { label: 'Home', href: hubPath('insurance', '/') },
          { label: 'Health Insurance Hubs', href: hubPath('insurance', '/hubs') },
          { label: topic.title },
        ]}
        heroChildren={
          <ZipSearch defaultZip="33101" className="[&_input]:bg-white [&_button]:bg-trust" />
        }
      >
        <section>
          <h2 className="mb-2 text-2xl font-bold">Featured {topic.title}</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Top verified agents from high-volume markets — FL DFS / state DOI verified
          </p>
          <div className="space-y-5">
            {agents.map((agent, index) => (
              <AgentCard key={agent.id} agent={agent} rank={index + 1} hubLabel="South Florida" />
            ))}
          </div>
        </section>
      </HealthHubDirectoryTemplate>

      <HowItWorks />
      <DisclaimerBanner />
    </>
  );
}