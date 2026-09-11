import Link from 'next/link';
import { MOVE_ASK_MAX_QUERY } from '@/lib/move-ask/contract';

export const MOVE_SEARCH_EXAMPLES = [
  'current interstate movers headquartered in Florida',
  'moving brokers in Florida',
  'USDOT 3244649',
  'Florida intrastate movers',
  'carrier vs broker',
];

export function SpecialistSearchShell({ query = '', compact = false, filters = {} }: { query?: string; compact?: boolean; filters?: { role?: string; state?: string; authority?: string } }) {
  return (
    <section className={`rounded-2xl border border-[#E2E8F0] bg-white ${compact ? 'p-4 sm:p-5' : 'p-5 sm:p-7'}`} aria-labelledby={compact ? 'home-specialist-search' : 'specialist-search'}>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C2410C]">Research movers</p>
      <h2 id={compact ? 'home-specialist-search' : 'specialist-search'} className={`${compact ? 'mt-1 text-xl' : 'mt-2 text-2xl sm:text-3xl'} font-semibold text-[#0A2540]`}>
        What do you want to find out?
      </h2>
      <form action="/ask" method="get" role="search" aria-label="Research moving companies" className="mt-4">
        <label htmlFor={compact ? 'home-move-research' : 'move-research'} className="sr-only">Mover research question, company, USDOT or MC number</label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input id={compact ? 'home-move-research' : 'move-research'} name="q" defaultValue={query} aria-describedby="move-query-limit" required
            placeholder="Ask a question, enter a moving company, USDOT, MC number, city, state or authority question..."
            className="min-h-12 min-w-0 flex-1 rounded-xl border border-[#CBD5E1] px-4 text-base text-[#0A2540] outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A1F]" />
          <button type="submit" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#0A2540] px-6 font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A1F] focus-visible:ring-offset-2">Research</button>
        </div>
        <p id="move-query-limit" className="mt-2 text-xs text-[#475569]">Maximum {MOVE_ASK_MAX_QUERY} characters. Longer requests are rejected without shortening the identifier.</p>
        <ul className="mt-3 flex flex-wrap gap-2" aria-label="Example mover research questions">
          {MOVE_SEARCH_EXAMPLES.map((example) => <li key={example}><Link href={`/ask?q=${encodeURIComponent(example)}`} className="inline-flex min-h-11 items-center rounded-full border border-[#E2E8F0] px-3 text-sm text-[#0A2540] hover:border-[#FF5A1F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A1F]">{example}</Link></li>)}
        </ul>
        <details className="mt-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3">
          <summary className="flex min-h-11 cursor-pointer items-center font-semibold text-[#0A2540]">Advanced filters</summary>
          <div className="grid gap-3 pt-3 sm:grid-cols-3">
            <label className="text-sm font-semibold text-[#0A2540]">Role<select name="role" defaultValue={filters.role ?? ''} className="mt-1 min-h-11 w-full rounded-lg border bg-white px-2 font-normal"><option value="">Any role</option><option value="carrier">Carrier</option><option value="broker">Broker</option><option value="carrier_broker">Carrier/Broker</option></select></label>
            <label className="text-sm font-semibold text-[#0A2540]">Recorded state<select name="state" defaultValue={filters.state ?? ''} className="mt-1 min-h-11 w-full rounded-lg border bg-white px-2 font-normal"><option value="">Any state</option><option value="FL">Florida</option><option value="NJ">New Jersey</option><option value="CA">California</option></select></label>
            <label className="text-sm font-semibold text-[#0A2540]">Authority<select name="authority" defaultValue={filters.authority ?? ''} className="mt-1 min-h-11 w-full rounded-lg border bg-white px-2 font-normal"><option value="">Any recorded state</option><option value="current">Current</option><option value="not_current">Not current</option></select></label>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-[#475569]">Recorded headquarters is not service territory. Federal authority and Florida registration remain separate.</p>
        </details>
      </form>
      <p className="mt-3 text-xs leading-relaxed text-[#475569]">Natural language helps interpret the request. Published regulatory data establishes the facts. Results are relevance-ordered, never quality-ranked.</p>
    </section>
  );
}
