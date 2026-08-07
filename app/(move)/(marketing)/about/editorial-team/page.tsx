import Link from 'next/link';
import { BookOpen, User } from 'lucide-react';
import { JsonLd } from '@/lib/seo/json-ld';
import { buildResourceMetadata } from '@/lib/seo/resource-metadata';
import {
  ACCOUNTABLE_OPERATOR,
  EDITORIAL_TEAM_PAGE_PATH,
  MOVE_RESEARCH_DESK,
  buildResearchAccountabilitySchema,
} from '@/lib/trust/editorial-team';
import { METHODOLOGY_PAGE_PATH } from '@/lib/trust/methodology-paths';
import { MethodologyBackNav } from '@/components/trust/methodology-back-nav';

export const metadata = buildResourceMetadata(
  EDITORIAL_TEAM_PAGE_PATH,
  'Research Accountability — Move Trust Hub',
  'How Move Trust Hub attributes moving research: founder-operated research desk, public-source checks, AI-assisted drafting limits, and corrections. Not multi-vertical.'
);

export default function EditorialTeamPage() {
  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={buildResearchAccountabilitySchema()} />

      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-12 max-w-3xl">
          <div className="mb-6">
            <MethodologyBackNav fallbackHref="/about" fallbackLabel="About Move Trust Hub" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Research accountability
          </h1>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Move Trust Hub is a <strong className="text-foreground font-semibold">moving research
            site</strong> in the Ask Trust Hub network. We do not present unverifiable personal
            bylines. Content is attributed to {MOVE_RESEARCH_DESK.name}, with a named founder as
            the accountable operator. Full scoring and review policy lives in the{' '}
            <Link
              href={METHODOLOGY_PAGE_PATH}
              className="text-primary font-medium underline underline-offset-2"
            >
              Trust Center
            </Link>
            .
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-3xl space-y-8">
        <article className="rounded-2xl border bg-card p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <BookOpen className="h-5 w-5 text-primary" aria-hidden />
            </div>
            <div>
              <h2 className="text-xl font-semibold tracking-tight">{MOVE_RESEARCH_DESK.name}</h2>
              <p className="text-sm text-primary font-medium mt-0.5">{MOVE_RESEARCH_DESK.role}</p>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {MOVE_RESEARCH_DESK.bio}
              </p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {MOVE_RESEARCH_DESK.expertise.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border bg-muted/30 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>

        <article id="operator" className="scroll-mt-24 rounded-2xl border bg-card p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <User className="h-5 w-5 text-primary" aria-hidden />
            </div>
            <div>
              <h2 className="text-xl font-semibold tracking-tight">{ACCOUNTABLE_OPERATOR.name}</h2>
              <p className="text-sm text-primary font-medium mt-0.5">{ACCOUNTABLE_OPERATOR.role}</p>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {ACCOUNTABLE_OPERATOR.bio}
              </p>
            </div>
          </div>
        </article>

        <section className="rounded-2xl border bg-muted/20 p-6 space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">How research is produced</h2>
          <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed list-disc pl-5">
            <li>
              Scope is moving only: interstate and local mover research, FMCSA-oriented public data,
              destination and corridor education, and related tools (e.g. Verify DOT, calculators).
            </li>
            <li>
              Primary sources first (FMCSA SAFER and related public systems). Marketing claims are
              not treated as proof of licensing or performance.
            </li>
            <li>
              AI tools may assist with drafting, structuring, or organizing public data. They do not
              invent licenses, reviews, or rankings. Material claims are reviewed before publication.
            </li>
            <li>
              Ranking position and verification badges are not sold. Part of the Ask Trust Hub
              network under common ownership with separated research and listing order.
            </li>
          </ul>
        </section>

        <p className="text-sm text-muted-foreground leading-relaxed">
          Corrections or data updates:{' '}
          <Link href="/contact" className="text-primary underline underline-offset-2">
            contact Move Trust Hub
          </Link>
          . Independence and review policy:{' '}
          <Link
            href={`${METHODOLOGY_PAGE_PATH}#independence`}
            className="text-primary underline underline-offset-2"
          >
            Trust Center
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
