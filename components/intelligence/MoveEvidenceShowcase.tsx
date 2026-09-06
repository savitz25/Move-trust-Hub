import Link from 'next/link';
import { loadMoveNetworkMetrics } from '@/lib/metrics/load-network-metrics';
import { buildMoveHomepageEvidenceInventory, MOVE_CONSUMER_RULES, MOVE_EVIDENCE_FAMILY_LABELS, MOVE_HOMEPAGE_STATE_CARDS, type MoveHomepageMeasure } from '@/lib/intelligence/move-home-evidence-inventory';

const number = new Intl.NumberFormat('en-US');

function MeasureTrace({ measure }: { measure: MoveHomepageMeasure }) {
  return <details className="mt-3 text-xs text-muted-foreground">
    <summary className="inline-flex min-h-10 cursor-pointer items-center font-semibold text-primary hover:underline" data-intel-event="move_intel_trace_number">Trace this measure</summary>
    <dl className="grid gap-2 rounded-xl border border-border bg-muted/30 p-3 sm:grid-cols-2">
      <div><dt className="font-semibold text-foreground">What it counts</dt><dd>{measure.trace.counts}</dd></div>
      <div><dt className="font-semibold text-foreground">What it does not count</dt><dd>{measure.trace.doesNotCount}</dd></div>
      <div><dt className="font-semibold text-foreground">Grain</dt><dd>{measure.grain.replaceAll('_', ' ')}</dd></div>
      <div><dt className="font-semibold text-foreground">Evidence class</dt><dd>{measure.entityClass}</dd></div>
      <div><dt className="font-semibold text-foreground">Geography</dt><dd>{measure.trace.geographicCoverage}</dd></div>
      <div><dt className="font-semibold text-foreground">Agency / source</dt><dd>{measure.contributingSourceSystems.join(' · ')}</dd></div>
      {measure.sourceAsOf ? <div><dt className="font-semibold text-foreground">Source / snapshot clock</dt><dd>{measure.sourceAsOf}</dd></div> : null}
      <div><dt className="font-semibold text-foreground">Network generated</dt><dd>{measure.generatedAt.slice(0, 10)}</dd></div>
      <div><dt className="font-semibold text-foreground">Publication context</dt><dd>{measure.publicationStatus.replaceAll('_', ' ')}</dd></div>
      <div><dt className="font-semibold text-foreground">Accepted artifact</dt><dd>{measure.acceptedArtifact}</dd></div>
    </dl>
    <Link href={measure.destination} className="mt-2 inline-flex font-semibold text-primary hover:underline">Open related research →</Link>
  </details>;
}

export function MoveEvidenceShowcase() {
  const inventory = buildMoveHomepageEvidenceInventory(loadMoveNetworkMetrics());
  const highlights = inventory.filter((m) => ['federal_publishable_directory_profiles', 'federal_directory_authority_active', 'federal_mc_identities_in_directory', 'published_state_intelligence_pages'].includes(m.key));
  return <>
    <section className="move-section border-b border-border/60 bg-[#0A2540] text-white" aria-labelledby="moat-heading"><div className="move-section-inner">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-300">Official evidence · separate grains</p>
      <h2 id="moat-heading" className="mt-2 max-w-4xl text-3xl font-semibold tracking-tight sm:text-4xl">A mover directory is only the first layer.</h2>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-200 sm:text-base">MoveTrustHub connects federal mover identity with authority, operating role, state household-goods systems, regulatory evidence, and consumer rules. Incompatible evidence families are never added together.</p>
      <ul className="mt-7 grid gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/15 sm:grid-cols-2 lg:grid-cols-4">{highlights.map((m) => <li key={m.key} className="bg-[#0A2540] p-5"><p className="break-words text-3xl font-semibold tabular-nums">{m.value === null ? 'Unknown' : number.format(m.value)}</p><p className="mt-1 text-sm font-medium text-slate-100">{m.label}</p><p className="mt-2 text-xs leading-relaxed text-slate-300">{m.description}</p></li>)}</ul>
    </div></section>

    <section className="move-section" aria-labelledby="inventory-heading"><div className="move-section-inner">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Full public evidence inventory</p>
      <h2 id="inventory-heading" className="mt-2 text-3xl font-semibold tracking-tight text-[#0A2540] sm:text-4xl">Every measure keeps its own source and grain.</h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">These {inventory.length} publication-eligible measures project from the specialist-owned network contract. Unknown, request-only, and search-only coverage remains visible instead of becoming zero.</p>
      <div className="mt-8 space-y-9">{Object.entries(MOVE_EVIDENCE_FAMILY_LABELS).map(([family, label]) => { const rows = inventory.filter((m) => m.family === family); return <section key={family} aria-labelledby={`family-${family.toLowerCase()}`}><h3 id={`family-${family.toLowerCase()}`} className="text-lg font-semibold text-[#0A2540]">{label}</h3>{rows.length ? <ul className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">{rows.map((m) => <li key={m.key} className="min-w-0 rounded-2xl border border-border bg-card p-4"><p className="break-words text-2xl font-semibold tabular-nums text-[#0A2540]">{m.value === null ? m.valueState.replaceAll('_', ' ') : number.format(m.value)}</p><p className="mt-1 font-medium">{m.label}</p><p className="mt-2 text-xs leading-relaxed text-muted-foreground">{m.description}</p><MeasureTrace measure={m} /></li>)}</ul> : <p className="mt-2 rounded-xl border border-dashed border-border p-4 text-sm text-muted-foreground">No standalone count is published for this family. Profile and official verification research can still exist; missing is not zero.</p>}</section>; })}</div>
    </div></section>

    <section id="state-intelligence" className="move-section border-y border-border/60 bg-muted/20" aria-labelledby="state-intel-heading"><div className="move-section-inner">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Five specialist state surfaces</p>
      <h2 id="state-intel-heading" className="mt-2 text-3xl font-semibold tracking-tight text-[#0A2540] sm:text-4xl">State authority changes the research question.</h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">These cards explain research coverage, not mover quality. State permits, registrations, and certificates remain separate from FMCSA interstate operating authority.</p>
      <ul className="mt-7 grid gap-4 lg:grid-cols-2">{MOVE_HOMEPAGE_STATE_CARDS.map((card) => <li key={card.href} className="rounded-2xl border border-border bg-card p-5"><p className="text-xs font-semibold uppercase tracking-wide text-primary">{card.regulator}</p><h3 className="mt-1 text-xl font-semibold text-[#0A2540]">{card.state}</h3><p className="mt-3 text-sm"><strong>State authority:</strong> {card.authority}</p><p className="mt-2 text-sm"><strong>Roster coverage:</strong> {card.roster}</p><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.evidence}</p><p className="mt-3 text-xs text-muted-foreground">{card.sourceClock}</p><Link href={card.href} data-intel-event="move_intel_state_click" className="mt-4 inline-flex min-h-10 items-center font-semibold text-primary hover:underline">Explore {card.state} intelligence →</Link></li>)}</ul>
      <p className="mt-5 rounded-xl border border-border bg-white p-4 text-sm text-muted-foreground"><strong className="text-foreground">Arizona coverage:</strong> National FMCSA research remains available. Arizona does not have a comparable state household-goods licensing universe, so no Arizona specialist state page is implied.</p>
    </div></section>

    <section className="move-section" aria-labelledby="rules-heading"><div className="move-section-inner"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Beyond the directory</p><h2 id="rules-heading" className="mt-2 text-3xl font-semibold tracking-tight text-[#0A2540] sm:text-4xl">Consumer rules are evidence, too.</h2><div className="mt-7 grid gap-5 lg:grid-cols-2">{Object.entries(MOVE_CONSUMER_RULES).map(([state, rules]) => <article key={state} className="rounded-2xl border border-border p-5"><h3 className="text-xl font-semibold text-[#0A2540]">{state}</h3><ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">{rules.map((rule) => <li key={rule}>{rule}</li>)}</ul></article>)}</div><p className="mt-5 text-sm text-muted-foreground">These rules guide verification and planning; they do not prove that a particular mover complied.</p></div></section>
  </>;
}
