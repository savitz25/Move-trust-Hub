import Link from 'next/link';
import { User } from 'lucide-react';
import { JsonLd } from '@/lib/seo/json-ld';
import { buildResourceMetadata } from '@/lib/seo/resource-metadata';
import { SITE_URL } from '@/lib/seo/site-metadata';
import {
  EDITORIAL_EXPERTS,
  EDITORIAL_ORGANIZATION,
  EDITORIAL_TEAM_PAGE_PATH,
  buildEditorPersonSchema,
} from '@/lib/trust/editorial-team';
import { METHODOLOGY_PAGE_PATH } from '@/lib/trust/methodology-paths';
import { MethodologyBackNav } from '@/components/trust/methodology-back-nav';

export const metadata = buildResourceMetadata(
  EDITORIAL_TEAM_PAGE_PATH,
  'Editorial Team — Move Trust Hub Research',
  'Meet the Move Trust Hub editorial team that researches FMCSA data, county guides, and reputation methodology. Independent directory — no paid rankings.'
);

export default function EditorialTeamPage() {
  const pageUrl = `${SITE_URL}${EDITORIAL_TEAM_PAGE_PATH}`;

  return (
    <div className="min-h-screen bg-background">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'CollectionPage',
              '@id': pageUrl,
              name: 'Move Trust Hub Editorial Team',
              url: pageUrl,
              description:
                'Named researchers who author and review Move Trust Hub county guides, route content, and scoring methodology.',
              isPartOf: { '@type': 'WebSite', name: 'Move Trust Hub', url: SITE_URL },
              about: {
                '@type': 'Organization',
                name: EDITORIAL_ORGANIZATION.name,
                url: EDITORIAL_ORGANIZATION.url,
              },
            },
            ...EDITORIAL_EXPERTS.map((expert) => buildEditorPersonSchema(expert)),
          ],
        }}
      />

      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-12 max-w-3xl">
          <div className="mb-6">
            <MethodologyBackNav fallbackHref="/about" fallbackLabel="About Move Trust Hub" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Move Trust Hub Editorial Team
          </h1>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Our research is authored and reviewed by named editors — not anonymous AI dumps and not
            paid placements from movers. Bylines on county, route, and directory pages link here.
            Full scoring and review policy lives in the{' '}
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
        {EDITORIAL_EXPERTS.map((expert) => (
          <article
            key={expert.id}
            id={`editor-${expert.id}`}
            className="scroll-mt-24 rounded-2xl border bg-card p-6"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <User className="h-5 w-5 text-primary" aria-hidden />
              </div>
              <div>
                <h2 className="text-xl font-semibold tracking-tight">{expert.name}</h2>
                <p className="text-sm text-primary font-medium mt-0.5">{expert.role}</p>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{expert.bio}</p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {expert.expertise.map((tag) => (
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
        ))}

        <p className="text-sm text-muted-foreground leading-relaxed">
          Corrections or data updates:{' '}
          <Link href="/contact" className="text-primary underline underline-offset-2">
            contact the editorial team
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
