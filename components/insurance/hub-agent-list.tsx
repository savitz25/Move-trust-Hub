'use client';

import { useMemo, useState } from 'react';
import type { HubAgent } from '@/types/insurance/agent';
import { AgentCard } from '@/components/insurance/agent-card';
import { Checkbox } from '@/components/insurance/ui/checkbox';
import { Label } from '@/components/insurance/ui/label';
import { Select } from '@/components/insurance/ui/select';

type EnrichedHubAgent = HubAgent & {
  googleRating?: number | null;
  bbbAccredited?: boolean | null;
  isEnriched?: boolean;
};

interface HubAgentListProps {
  agents: EnrichedHubAgent[];
  hubLabel: string;
  rankOffset?: number;
  title?: string;
  description?: string;
}

export function HubAgentList({
  agents,
  hubLabel,
  rankOffset = 0,
  title,
  description,
}: HubAgentListProps) {
  const [minRating, setMinRating] = useState('');
  const [bbbOnly, setBbbOnly] = useState(false);

  const filtered = useMemo(() => {
    let result = [...agents];
    if (minRating) {
      const min = Number(minRating);
      result = result.filter((a) => (a.googleRating ?? a.rating) >= min);
    }
    if (bbbOnly) {
      result = result.filter((a) => Boolean(a.bbbAccredited));
    }
    return result.sort((a, b) => {
      const ratingDiff = (b.googleRating ?? b.rating) - (a.googleRating ?? a.rating);
      if (ratingDiff !== 0) return ratingDiff;
      return b.trustScore - a.trustScore;
    });
  }, [agents, minRating, bbbOnly]);

  return (
    <section>
      {title && <h2 className="text-2xl font-bold mb-2">{title}</h2>}
      {description && <p className="text-sm text-muted-foreground mb-4">{description}</p>}

      <div className="mb-6 flex flex-wrap items-end gap-4 rounded-xl border bg-card p-4">
        <div>
          <Label htmlFor="hub-min-rating" className="text-xs text-muted-foreground mb-1.5 block">
            Minimum Google rating
          </Label>
          <Select
            id="hub-min-rating"
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
          >
            <option value="">Any rating</option>
            <option value="4">4+ Stars</option>
            <option value="4.5">4.5+ Stars</option>
          </Select>
        </div>
        <div className="flex items-center gap-2 pb-1">
          <Checkbox
            id="hub-bbb-accredited"
            checked={bbbOnly}
            onCheckedChange={(v) => setBbbOnly(v === true)}
          />
          <Label htmlFor="hub-bbb-accredited" className="text-sm font-normal cursor-pointer">
            BBB Accredited only
          </Label>
        </div>
        <p className="text-xs text-muted-foreground ml-auto">
          Showing {filtered.length} of {agents.length} agencies
        </p>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground rounded-xl border bg-muted/30 p-8 text-center">
          No agencies match these trust filters. Try lowering the minimum rating or clearing BBB
          accreditation.
        </p>
      ) : (
        <div className="space-y-5">
          {filtered.map((agent, i) => (
            <AgentCard key={agent.id} agent={agent} rank={rankOffset + i + 1} hubLabel={hubLabel} />
          ))}
        </div>
      )}
    </section>
  );
}