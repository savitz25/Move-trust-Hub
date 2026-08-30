import Link from 'next/link';
import { AskMoveResultView } from '@/components/ask-move-result';
import { executeMoveAsk } from '@/lib/move-ask/execute';

export const dynamic = 'force-dynamic';

const EXAMPLES = [
  'Show current interstate household-goods carriers headquartered in Florida.',
  'Show household-goods brokers headquartered in Florida.',
  'Find USDOT 3244649.',
  'What is the difference between a carrier and a broker?',
  'Show Florida intrastate movers registered with FDACS.',
];

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const title = q?.trim() ? `Ask: ${q.trim().slice(0, 80)}` : 'Ask MoveTrustHub';
  return {
    title,
    description:
      'Structured moving-company regulatory research. Carriers, brokers, and Florida IM registrations stay separate. Not a ranking or quote engine.',
    robots: { index: false, follow: true },
  };
}

export default async function AskPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const params = await searchParams;
  const q = (params.q ?? '').trim();
  const page = Number(params.page ?? '1') || 1;
  const result = q ? await executeMoveAsk(q, page) : null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#FF5A1F]">Ask MoveTrustHub</p>
      <h1 className="mt-3 text-3xl font-semibold text-[#0A2540] sm:text-4xl">
        Structured mover research, not a recommendation engine.
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-[#1E293B]">
        Ask interprets the question. Current FMCSA and FDACS extracts answer it. A carrier is not a broker.
        Florida IM registration is not interstate authority. Headquarters is not service territory.
      </p>
      <form action="/ask" method="get" className="mt-8" role="search" aria-label="Ask MoveTrustHub">
        <label htmlFor="ask-q" className="sr-only">
          Research question
        </label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            id="ask-q"
            name="q"
            defaultValue={q}
            placeholder="Show current interstate household-goods carriers headquartered in Florida."
            className="min-h-12 flex-1 rounded-xl border border-[#E2E8F0] px-4 text-[#0A2540]"
          />
          <button type="submit" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#0A2540] px-5 font-semibold text-white">
            Ask
          </button>
        </div>
      </form>
      {result ? (
        <div className="mt-10">
          <AskMoveResultView result={result} />
        </div>
      ) : (
        <ul className="mt-8 flex flex-wrap gap-2">
          {EXAMPLES.map((ex) => (
            <li key={ex}>
              <Link
                href={`/ask?q=${encodeURIComponent(ex)}`}
                className="inline-flex min-h-11 items-center rounded-full border border-[#E2E8F0] px-3 text-sm text-[#0A2540]"
              >
                {ex}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
