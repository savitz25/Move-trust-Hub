import Link from 'next/link';
import {
  AlertTriangle,
  ArrowLeft,
  Camera,
  CheckCircle2,
  ClipboardList,
  Clock,
  FileText,
  FolderOpen,
  Home,
  ListChecks,
  Package,
  PackageX,
  Scale,
  Search,
  Shield,
  ShieldAlert,
  XCircle,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ArticleSchema } from '@/components/resources/article-schema';
import { GuideFooter } from '@/components/resources/guide-footer';
import { JsonLd } from '@/lib/seo/json-ld';
import { buildResourceMetadata } from '@/lib/seo/resource-metadata';

const PATH = '/resources/interstate-moving-damage-claims';
const TITLE =
  'How to File and Resolve Damage or Loss Claims on an Interstate Move: A 2026 Guide';
const DESCRIPTION =
  'Step-by-step guide to interstate moving damage and loss claims: document evidence, review your Bill of Lading and valuation, file on time, respond to denials, and know your FMCSA options.';

const problemTypes = [
  {
    title: 'Damage',
    icon: Package,
    detail:
      'Belongings arrived but were harmed during packing, loading, transport, unloading, or delivery—scratches, cracks, dents, water damage, crushed boxes, and more.',
  },
  {
    title: 'Loss',
    icon: PackageX,
    detail:
      'The mover took possession of property that was never delivered: missing boxes, furniture, electronics, or items left behind or unlocatable after delivery.',
  },
  {
    title: 'Partial loss',
    icon: FolderOpen,
    detail:
      'Part of an item or shipment is missing—for example, a dining table arrives but several chairs do not.',
  },
  {
    title: 'Concealed damage',
    icon: Search,
    detail:
      'Damage was not obvious at delivery—internal breaks or issues that appear when you unpack or assemble. Inspect carefully after the move.',
  },
  {
    title: 'Delivery or service problems',
    icon: ShieldAlert,
    detail:
      'Delays, unexpected charges, hostage-load situations, home damage, or missing paperwork may need a different dispute path than a property claim.',
  },
];

const photoChecklist = [
  'The entire item',
  'The specific damaged area',
  'The surrounding area',
  'The packaging and any impact marks',
  'Condition of the box or container',
  'Labels or identifying information',
  'Where the damage was discovered',
];

const documentsToLocate = [
  'Bill of Lading',
  'Household goods descriptive inventory',
  'Packing inventory',
  'Delivery paperwork',
  'Order for Service',
  'Estimate and moving contract',
  'Valuation coverage documents',
  'Receipts and pre-move photos',
];

const claimShouldInclude = [
  'Your name and contact information',
  'Shipment date, pickup, and delivery locations',
  'Bill of Lading number and mover legal name',
  'Description of each damaged or missing item',
  'Date you discovered the problem',
  'Amount sought, if known',
  'Photos, receipts, inventory, repair/replacement estimates',
];

const claimSections = [
  {
    title: '1. Shipment information',
    items: [
      'Your name and moving company',
      'Bill of Lading number',
      'Pickup and delivery dates and addresses',
    ],
  },
  {
    title: '2. Item information',
    items: [
      'Description and approximate age',
      'Original purchase price and replacement value',
      'Condition before and after the move',
    ],
  },
  {
    title: '3. Damage or loss description',
    items: [
      'Specific, factual details—not vague summaries',
      'When and how the problem was discovered',
      'Reference to attached photos and documents',
    ],
  },
  {
    title: '4. Supporting evidence',
    items: [
      'Photographs and videos',
      'Receipts, inventory, repair/replacement estimates',
      'Manufacturer info or appraisals when relevant',
    ],
  },
  {
    title: '5. Requested resolution',
    items: [
      'Professional repair, replacement, or reimbursement',
      'Payment consistent with applicable valuation coverage',
    ],
  },
];

const moverArguments = [
  'The item was already damaged',
  'The item was improperly packed (or packed by you)',
  'The item was inherently fragile',
  'Damage occurred after delivery',
  'Liability is limited under the selected valuation option',
];

const denialReasons = [
  'Insufficient evidence or late filing',
  'Pre-existing damage or improper packing',
  'Excluded items or valuation limitations',
  'Lack of documentation',
  'The mover disputes responsibility',
];

const mistakes = [
  {
    title: 'Waiting too long',
    detail: 'Document damage as soon as you find it—evidence and memory both fade.',
  },
  {
    title: 'Throwing away damaged items',
    detail: 'Preserve property and packaging until the claim is resolved (unless unsafe).',
  },
  {
    title: 'Filing a vague claim',
    detail: '“Several items damaged” is not enough—describe each item specifically.',
  },
  {
    title: 'Losing moving documents',
    detail: 'Your Bill of Lading and valuation terms can be critical to recovery.',
  },
  {
    title: 'Assuming full replacement cost',
    detail: 'Recovery often depends on the valuation option you selected before the move.',
  },
  {
    title: 'Accepting the first offer blindly',
    detail: 'Ask how the amount was calculated before you accept a settlement.',
  },
  {
    title: 'Relying only on phone calls',
    detail: 'Keep a written record of claims, acknowledgments, and offers.',
  },
  {
    title: 'Skipping pre-move photos of the home',
    detail: 'Before-and-after evidence helps when walls, floors, or doors are damaged.',
  },
];

const checklistGroups = [
  {
    title: 'Immediately after delivery',
    items: [
      'Photograph shipment, damaged boxes, and damaged items',
      'Record missing items; keep damaged goods and packaging',
      'Review inventory; locate your Bill of Lading',
    ],
  },
  {
    title: 'Before filing',
    items: [
      'Review valuation coverage',
      'Gather receipts, pre-move photos, and estimates',
      'Create a clear list of damaged or missing items',
    ],
  },
  {
    title: 'When filing',
    items: [
      'Submit the claim in writing with proof of receipt',
      'Describe every item; attach photos and documents',
      'State the resolution you are requesting',
    ],
  },
  {
    title: 'During the process',
    items: [
      'Record all communications and track deadlines',
      'Respond promptly to document requests',
      'Review settlement offers carefully; request explanations',
    ],
  },
  {
    title: 'If the claim is denied',
    items: [
      'Identify the specific reason and respond in writing',
      'Provide evidence that addresses that reason',
      'Review dispute resolution, FMCSA options, and legal advice if needed',
    ],
  },
];

const protectBefore = [
  {
    title: 'Research the mover',
    detail:
      'Confirm interstate authority, review safety and complaint patterns, and check reputation beyond a single review.',
  },
  {
    title: 'Understand valuation',
    detail:
      'Ask questions before you sign—do not wait until something is damaged to learn what your coverage means.',
  },
  {
    title: 'Photograph valuables',
    detail:
      'Furniture, electronics, appliances, artwork, antiques, and high-value personal property—store photos securely.',
  },
  {
    title: 'Keep receipts & inventory',
    detail:
      'Receipts help establish ownership and value; inventory should accurately reflect what is transported.',
  },
  {
    title: 'Read the contract',
    detail:
      'Know responsibilities, valuation, claim procedures, delivery terms, and dispute resolution before load day.',
  },
];

const faqs = [
  {
    question: 'How long do I have to file a damage claim after an interstate move?',
    answer:
      'For interstate household goods shipments, federal rules generally require a claim for loss or damage to be filed with the carrier within nine months after delivery. If your shipment was not delivered, different rules may apply.',
  },
  {
    question: 'Can I file a claim for missing items?',
    answer:
      'Yes. If property that the mover accepted for transportation was not delivered, document the missing items, review your inventory and moving documents, and follow the carrier’s claims procedure promptly.',
  },
  {
    question: 'What if I discover damage after the movers leave?',
    answer:
      'Document the damage as soon as you discover it and begin the claims process promptly. Concealed damage can still be reported, but strong documentation is important.',
  },
  {
    question: 'Should I throw away damaged furniture?',
    answer:
      'Generally, preserve damaged property and packaging until the claim has been investigated and resolved, unless keeping the item creates a safety hazard.',
  },
  {
    question: 'Does moving insurance cover everything?',
    answer:
      'Not necessarily. Your protection may depend on the valuation option you selected, the terms of your agreement, applicable limitations, and the circumstances surrounding the damage or loss. Valuation is not the same as traditional insurance.',
  },
  {
    question: 'What if the mover denies my claim?',
    answer:
      'Review the denial carefully and determine why it was rejected. You may be able to provide additional documentation, challenge the decision, or use the dispute resolution process described in your moving documents.',
  },
  {
    question: 'Can I file a complaint against a moving company?',
    answer:
      'Consumers can report certain interstate moving complaints to the Federal Motor Carrier Safety Administration. A regulatory complaint is not necessarily the same as a claim for financial compensation.',
  },
  {
    question: 'Should I accept the mover’s first settlement offer?',
    answer:
      'Before accepting, review how the amount was calculated and compare it with your applicable valuation coverage and supporting documentation. If the offer seems inadequate, ask for an explanation and respond with additional evidence in writing.',
  },
];

const claimCluster = [
  {
    href: '/resources/interstate-moving-insurance',
    title: 'Valuation protection explained',
    detail: 'Released Value vs Full Value Protection and what recovery can look like.',
  },
  {
    href: '/resources/bill-of-lading-shipper-rights',
    title: 'Bill of Lading & shipper rights',
    detail: 'The contract that governs your interstate household goods shipment.',
  },
  {
    href: '/resources/fmcsa',
    title: 'FMCSA ratings & complaints',
    detail: 'How safety data and complaint patterns fit into mover research.',
  },
  {
    href: '/resources/scams',
    title: 'Scam red flags',
    detail: 'Hostage loads, bait-and-switch, and other consumer-risk patterns.',
  },
];

const sampleInventory = [
  { item: 'Dining table', status: 'Damaged', value: '$1,500', evidence: 'Photos' },
  { item: '55-inch TV', status: 'Damaged', value: '$900', evidence: 'Photos + receipt' },
  { item: 'Box #24', status: 'Missing', value: '$300', evidence: 'Inventory' },
  { item: 'Bedroom dresser', status: 'Damaged', value: '$750', evidence: 'Photos' },
  { item: 'Antique mirror', status: 'Missing', value: '$1,200', evidence: 'Inventory + photos' },
];

const sampleTimeline = [
  { date: 'June 1', event: 'Shipment delivered' },
  { date: 'June 2', event: 'Damage discovered' },
  { date: 'June 3', event: 'Photos taken' },
  { date: 'June 5', event: 'Claim submitted in writing' },
  { date: 'June 10', event: 'Claim acknowledged' },
  { date: 'June 20', event: 'Additional documentation requested' },
  { date: 'June 25', event: 'Documentation provided' },
];

export const metadata = buildResourceMetadata(PATH, TITLE, DESCRIPTION);

export default function InterstateMovingDamageClaimsPage() {
  return (
    <>
      <ArticleSchema
        title={TITLE}
        description={DESCRIPTION}
        path={PATH}
        datePublished="2026-07-26"
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
          })),
        }}
      />

      <div className="min-h-screen">
        {/* Hero */}
        <section className="border-b bg-gradient-to-b from-primary/5 via-background to-background">
          <div className="container mx-auto max-w-3xl px-4 py-10">
            <Link
              href="/resources"
              className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              Back to all resources
            </Link>

            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="text-[11px] font-medium tracking-wide">
                Regulation
              </Badge>
              <Badge variant="outline" className="text-[11px] font-medium tracking-wide">
                Consumer rights
              </Badge>
              <span className="text-xs text-muted-foreground">22 min read · Evergreen guide</span>
            </div>

            <h1 className="text-balance text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl">
              How to File and Resolve Damage or Loss Claims on an Interstate Move
            </h1>
            <p className="mt-2 text-lg font-medium text-muted-foreground">A practical 2026 consumer guide</p>

            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Moving to a new state is supposed to be the beginning of something exciting. After the
              truck arrives, you may discover damaged furniture, a broken television, missing boxes,
              or belongings that never arrived at all.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              If you used an interstate moving company, you have rights and a process for pursuing
              compensation for eligible loss or damage—but a successful claim is not always as simple
              as asking for a check. Documentation, deadlines, valuation coverage, and written
              communication all matter.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              This guide covers what to do immediately after delivery, how to document damage, how to
              file a claim, what valuation means, how long the process can take, and what to do if
              your claim is denied or you disagree with the settlement.
            </p>

            <div className="mt-6 rounded-xl border border-amber-500/25 bg-amber-500/5 p-4 sm:p-5">
              <div className="flex gap-3">
                <AlertTriangle
                  className="mt-0.5 h-5 w-5 shrink-0 text-amber-700 dark:text-amber-400"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-semibold text-foreground">Not legal advice</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    This article provides general consumer information. Your specific rights may
                    depend on the facts of your move, your contract, your valuation coverage, and
                    applicable federal or state law.
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              <Link href="/" className="text-primary underline underline-offset-2">
                MoveTrustHub.com
              </Link>{' '}
              is an independent directory—no paid placements. Use it to research licensed movers
              before your next move, and use this guide if something goes wrong after delivery.
            </p>
          </div>
        </section>

        <div className="container mx-auto max-w-3xl space-y-14 px-4 py-10">
          {/* Problem types */}
          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Search className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                First: understand what kind of problem you have
              </h2>
            </div>
            <p className="mb-5 leading-relaxed text-muted-foreground">
              Not every post-move problem is handled the same way. Before you act, identify whether
              you are dealing with damage, loss, partial loss, concealed damage, or a service
              dispute.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {problemTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <div key={type.title} className="rounded-xl border bg-card p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                      <h3 className="font-semibold">{type.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">{type.detail}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Steps 1–3 */}
          <section>
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Camera className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Steps 1–3: preserve, photograph, and inventory
              </h2>
            </div>

            <div className="space-y-6">
              <div className="rounded-xl border bg-card p-5 sm:p-6">
                <div className="mb-3 flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    1
                  </span>
                  <h3 className="text-lg font-semibold">Do not throw anything away</h3>
                </div>
                <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                  Keep damaged items, broken parts, packaging, boxes, and original containers until
                  the claim is resolved. A cracked TV, a broken table leg, or a crushed box can all
                  become important evidence.
                </p>
                <p className="rounded-lg bg-muted/50 px-3 py-2 text-sm font-medium">
                  Preserve the evidence until the claim is resolved.
                </p>
              </div>

              <div className="rounded-xl border bg-card p-5 sm:p-6">
                <div className="mb-3 flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    2
                  </span>
                  <h3 className="text-lg font-semibold">Photograph and video everything</h3>
                </div>
                <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                  Take more photos than you think you need—before rearranging damaged items. Keep
                  original files in a dedicated claim folder; do not rely only on compressed text or
                  social media images. A continuous walkthrough video of the shipment can help when
                  multiple items may be affected.
                </p>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {photoChecklist.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border bg-card p-5 sm:p-6">
                <div className="mb-3 flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    3
                  </span>
                  <h3 className="text-lg font-semibold">Compare your shipment with your inventory</h3>
                </div>
                <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                  Go item by item: what was picked up, what was delivered, what is missing or
                  damaged, and what condition was documented before the move. A simple spreadsheet
                  keeps the claim clear later.
                </p>
                <p className="mb-3 text-sm font-medium text-foreground">Documents to locate</p>
                <ul className="mb-5 grid gap-2 sm:grid-cols-2">
                  {documentsToLocate.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <FileText
                        className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="overflow-x-auto rounded-lg border">
                  <table className="w-full min-w-[32rem] text-left text-sm">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="px-3 py-2 font-semibold">Item</th>
                        <th className="px-3 py-2 font-semibold">Status</th>
                        <th className="px-3 py-2 font-semibold">Est. value</th>
                        <th className="px-3 py-2 font-semibold">Evidence</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sampleInventory.map((row) => (
                        <tr key={row.item} className="border-t">
                          <td className="px-3 py-2">{row.item}</td>
                          <td className="px-3 py-2 text-muted-foreground">{row.status}</td>
                          <td className="px-3 py-2 tabular-nums text-muted-foreground">{row.value}</td>
                          <td className="px-3 py-2 text-muted-foreground">{row.evidence}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">Example claim inventory layout</p>
              </div>
            </div>
          </section>

          {/* Steps 4–5 BOL + valuation */}
          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Scale className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Steps 4–5: Bill of Lading and valuation vs insurance
              </h2>
            </div>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              The{' '}
              <Link
                href="/resources/bill-of-lading-shipper-rights"
                className="text-primary underline underline-offset-2"
              >
                Bill of Lading
              </Link>{' '}
              is essentially the contract for transporting your shipment. Review the carrier’s legal
              name, shipment details, dates, charges, valuation coverage, delivery notes, inventory
              references, and any condition notations.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border bg-card p-4">
                <h3 className="font-semibold">Full-Value Protection</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Broader carrier responsibility under the terms you selected—often repair, comparable
                  replacement, or payment toward repair/replacement, subject to agreement terms.
                </p>
              </div>
              <div className="rounded-xl border bg-card p-4">
                <h3 className="font-semibold">Released-rate liability</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Lower liability, often a limited amount per pound per article—which can be far below
                  the retail value of lightweight but expensive items like electronics.
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Valuation coverage and traditional insurance are not necessarily the same. Understand
              what you selected{' '}
              <em>before</em> a claim—not only after. Full deep dive:{' '}
              <Link
                href="/resources/interstate-moving-insurance"
                className="text-primary underline underline-offset-2"
              >
                Interstate moving insurance &amp; valuation options
              </Link>
              .
            </p>
          </section>

          {/* Step 6 file claim */}
          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <ClipboardList className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Step 6: file your claim with the moving company
              </h2>
            </div>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              Request the carrier’s claim filing procedure. Do not rely solely on a phone call—submit
              in writing and retain proof the claim was received. A clear, organized claim is easier
              to evaluate than a trail of disconnected emails.
            </p>
            <ul className="space-y-2">
              {claimShouldInclude.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Deadlines */}
          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Clock className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">Deadlines and response timelines</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
                <p className="text-xs font-medium uppercase tracking-wide text-primary">
                  Filing window
                </p>
                <p className="mt-2 text-2xl font-semibold tracking-tight">9 months</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  For interstate household goods moves, federal rules generally require loss or
                  damage claims to be filed with the carrier within nine months after delivery. If the
                  shipment was not delivered, the timeline can differ. Start early—do not wait for the
                  deadline.
                </p>
              </div>
              <div className="rounded-xl border bg-card p-5">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Carrier acknowledgment
                </p>
                <p className="mt-2 text-2xl font-semibold tracking-tight">30 days</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Carriers generally must acknowledge receipt of a claim within 30 days and provide a
                  written disposition within a specified period, with possible written status updates
                  if investigation takes longer.
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Why act fast? Packaging gets discarded, estimates get harder, memories fade, and
              communication gets more complicated. Begin documenting as soon as you discover the
              problem.
            </p>
          </section>

          {/* Strong claim structure */}
          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FileText className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                What a strong claim should include
              </h2>
            </div>
            <p className="mb-5 leading-relaxed text-muted-foreground">
              Organize your claim into five sections so the carrier can follow a complete story.
            </p>
            <div className="space-y-3">
              {claimSections.map((section) => (
                <div key={section.title} className="rounded-xl border bg-card p-4">
                  <h3 className="font-semibold">{section.title}</h3>
                  <ul className="mt-2 space-y-1.5">
                    {section.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <CheckCircle2
                          className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-xl border bg-muted/30 p-4 sm:p-5">
              <p className="text-sm font-medium text-foreground">Be specific, not vague</p>
              <p className="mt-2 text-sm text-muted-foreground line-through opacity-70">
                “Furniture damaged.”
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Better: “The solid wood dining table arrived with a 14-inch crack extending from the
                edge of the tabletop toward the center. The table was in good condition before
                pickup. The damage was documented immediately after delivery. Photographs of the
                table, packaging, and damage are attached.”
              </p>
            </div>
          </section>

          {/* Timeline tracking */}
          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <ListChecks className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">Keep a claim timeline</h2>
            </div>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              Track when you submitted, when the mover acknowledged, who you spoke with, documents
              requested and provided, settlement offers, and reasons for denial. A simple timeline
              becomes invaluable if the claim is disputed.
            </p>
            <ol className="relative space-y-0 border-l border-primary/25 pl-6">
              {sampleTimeline.map((entry) => (
                <li key={entry.date + entry.event} className="relative pb-5 last:pb-0">
                  <span
                    className="absolute -left-[1.55rem] top-1.5 h-2.5 w-2.5 rounded-full bg-primary"
                    aria-hidden="true"
                  />
                  <p className="text-xs font-medium uppercase tracking-wide text-primary">
                    {entry.date}
                  </p>
                  <p className="text-sm text-muted-foreground">{entry.event}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* Disputes: fault, packing, lowball, denial */}
          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <ShieldAlert className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                When the mover disputes responsibility or value
              </h2>
            </div>

            <h3 className="mb-2 text-lg font-semibold">“The damage was not our fault”</h3>
            <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
              Carriers may argue pre-existing damage, packing issues, inherent fragility, post-delivery
              damage, or valuation limits. Pre-move photos and packaging photos strengthen your
              timeline. The more clearly you establish condition before and after transport, the
              stronger your documentation.
            </p>
            <ul className="mb-6 space-y-2">
              {moverArguments.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/70" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mb-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border bg-card p-4">
                <h3 className="font-semibold">Packed by the mover</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Document that fact—paperwork may show who packed. Packing circumstances can be
                  relevant when a mover-packed fragile item arrives damaged.
                </p>
              </div>
              <div className="rounded-xl border bg-card p-4">
                <h3 className="font-semibold">Packed by you</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Self-packed boxes can invite packing-related arguments, but that does not
                  automatically deny every claim. Note crushed boxes, impact consistency, labeling,
                  and whether protection was adequate.
                </p>
              </div>
            </div>

            <h3 className="mb-2 text-lg font-semibold">Low settlement offers</h3>
            <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
              You may believe an item is worth $2,000 while the mover offers $500. Before accepting,
              review valuation terms and how the offer was calculated: depreciation, repair vs
              replacement, weight-based valuation, and supporting documentation. Disagree in writing
              with evidence—do not assume the first offer is final.
            </p>

            <h3 className="mb-2 text-lg font-semibold">Claim denied</h3>
            <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
              A denial is not necessarily the end. Read the reason carefully and respond to that
              reason—pre-move photos for “already damaged,” receipts for value disputes, missing
              documents if that was the issue—rather than only repeating the original claim.
            </p>
            <ul className="space-y-2">
              {denialReasons.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <AlertTriangle
                    className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Escalation */}
          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Shield className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                If you cannot reach agreement with the mover
              </h2>
            </div>
            <div className="space-y-3">
              <div className="rounded-xl border bg-card p-4">
                <h3 className="font-semibold">FMCSA complaint</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  The Federal Motor Carrier Safety Administration oversees interstate household goods
                  movers. A complaint may fit if you believe federal requirements were violated—but a
                  regulatory complaint is not the same as payment for damaged property. Still, formal
                  documentation of a serious dispute can matter. Learn more in our{' '}
                  <Link href="/resources/fmcsa" className="text-primary underline underline-offset-2">
                    FMCSA safety ratings guide
                  </Link>
                  .
                </p>
              </div>
              <div className="rounded-xl border bg-card p-4">
                <h3 className="font-semibold">Dispute resolution program</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Interstate movers are generally required to participate in a dispute settlement
                  program for certain claims. Your moving documents should describe mediation,
                  arbitration, or other procedures that may apply.
                </p>
              </div>
              <div className="rounded-xl border bg-card p-4">
                <h3 className="font-semibold">Legal advice</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  For significant property loss, high-value items, or complex disputes, consider an
                  attorney who handles transportation, consumer protection, or contract matters. The
                  right approach depends on your facts.
                </p>
              </div>
            </div>
          </section>

          {/* Missing items / left behind / home damage */}
          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Home className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Missing items, left-behind goods, and home damage
              </h2>
            </div>
            <div className="space-y-4">
              <div className="rounded-xl border bg-card p-4">
                <h3 className="font-semibold">Missing property</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Check every box and room, review inventory, contact the mover in writing, request a
                  search, and file a formal claim if items cannot be located. Items are sometimes
                  misplaced, packed unexpectedly, left at origin, or unloaded in the wrong place—do not
                  assume theft immediately, but document loss formally if they cannot be found.
                </p>
              </div>
              <div className="rounded-xl border bg-card p-4">
                <h3 className="font-semibold">Items left behind at pickup</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Failure to pick up property included in your agreement can differ from a classic
                  transit-loss claim. Photograph what was left, review inventory and contract terms,
                  and contact the mover immediately.
                </p>
              </div>
              <div className="rounded-xl border bg-card p-4">
                <h3 className="font-semibold">Damage to your home</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Walls, floors, doors, railings, driveways, landscaping, and staircases may need a
                  separate track from household-goods claims. Photograph immediately, get repair
                  estimates, and keep written records—residence damage can involve different
                  considerations than shipment loss.
                </p>
              </div>
            </div>
          </section>

          {/* Common mistakes */}
          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <AlertTriangle className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                The most common consumer mistakes
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {mistakes.map((m, i) => (
                <div key={m.title} className="rounded-xl border bg-card p-4">
                  <p className="text-xs font-medium text-primary">Mistake #{i + 1}</p>
                  <h3 className="mt-1 font-semibold">{m.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{m.detail}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Checklist */}
          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <ListChecks className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Interstate moving claims checklist
              </h2>
            </div>
            <div className="space-y-4">
              {checklistGroups.map((group) => (
                <div key={group.title} className="rounded-xl border bg-card p-4 sm:p-5">
                  <h3 className="mb-3 font-semibold">{group.title}</h3>
                  <ul className="space-y-2">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span
                          className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border border-primary/40"
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Protect before next move */}
          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Shield className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Protect yourself before the next move
              </h2>
            </div>
            <p className="mb-5 leading-relaxed text-muted-foreground">
              The best time to think about a claim is before the movers arrive—not to expect a
              problem, but to be prepared if one occurs.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {protectBefore.map((item) => (
                <div key={item.title} className="rounded-xl border bg-card p-4">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Related:{' '}
              <Link
                href="/resources/how-to-choose"
                className="text-primary underline underline-offset-2"
              >
                How to choose an interstate mover
              </Link>{' '}
              ·{' '}
              <Link href="/resources/scams" className="text-primary underline underline-offset-2">
                Scam red flags
              </Link>{' '}
              ·{' '}
              <Link href="/verify-dot" className="text-primary underline underline-offset-2">
                Verify a USDOT number
              </Link>
            </p>
          </section>

          {/* Bottom line */}
          <section className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/8 via-primary/5 to-transparent p-6 sm:p-8">
            <h2 className="text-2xl font-semibold tracking-tight">The bottom line</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Damage and loss claims are one of the most stressful parts of moving. Stay organized:
              document everything, preserve evidence, review your documents and valuation, file
              properly and promptly, keep communication in writing, and know your options if the
              mover disputes the claim.
            </p>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Choosing a mover is only part of protecting yourself.{' '}
              <strong className="font-semibold text-foreground">
                Knowing your rights and understanding the process after the move is just as
                important.
              </strong>
            </p>
          </section>

          {/* Claims cluster */}
          <section>
            <h2 className="mb-2 text-2xl font-semibold tracking-tight">
              Moving claims &amp; consumer rights hub
            </h2>
            <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
              This guide is a cornerstone page. Use these related resources as your claims and
              rights cluster while you research or resolve a dispute.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {claimCluster.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group rounded-xl border bg-card p-4 transition-colors hover:border-primary/50"
                >
                  <h3 className="font-semibold group-hover:text-primary">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="mb-6 text-2xl font-semibold tracking-tight">
              Frequently asked questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="rounded-xl border bg-card p-4 sm:p-5">
                  <h3 className="font-semibold leading-snug">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Final takeaway */}
          <section className="rounded-xl border bg-muted/30 p-5 sm:p-6">
            <h2 className="text-lg font-semibold">Final consumer takeaway</h2>
            <p className="mt-3 text-base font-medium leading-relaxed">
              If something goes wrong during an interstate move, don’t panic—and don’t wait.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Document it. Preserve it. Report it. Understand your coverage. Keep everything in
              writing. The stronger your documentation, the easier it becomes to establish what
              happened and pursue an appropriate resolution.
            </p>
          </section>

          <GuideFooter
            relatedSlugs={[
              'interstate-moving-insurance',
              'bill-of-lading-shipper-rights',
              'fmcsa',
              'scams',
              'how-to-choose',
              'checklist',
            ]}
          />
        </div>
      </div>
    </>
  );
}
