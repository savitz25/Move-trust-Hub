import Link from 'next/link';
import { ArrowLeft, Box, Package, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ArticleSchema } from '@/components/resources/article-schema';
import { GuideFooter } from '@/components/resources/guide-footer';

export const metadata = {
  title: 'Room-by-Room Packing Checklist for Long-Distance Moves',
  description:
    'Complete packing checklist for interstate moves: supplies, room-by-room tasks, fragile items, labeling system, and what to keep out of the moving truck.',
  openGraph: {
    title: 'Room-by-Room Packing Checklist for Long-Distance Moves',
    description: 'Pack smarter for a long-distance move with this room-by-room checklist and labeling guide.',
  },
  alternates: {
    canonical: 'https://www.movetrusthub.com/resources/packing-checklist',
  },
};

const supplies = [
  'Medium and large moving boxes (plus wardrobe boxes for hanging clothes)',
  'Heavy-duty packing tape and dispenser',
  'Bubble wrap, packing paper, and furniture blankets',
  'Permanent markers and color-coded labels',
  'Stretch wrap for dressers and upholstered items',
  'Box cutter and basic tool kit for reassembly',
];

const roomChecklists = [
  {
    room: 'Kitchen',
    items: [
      'Wrap plates vertically like records — never stack flat without padding',
      'Pack heavy items (pots, appliances) in small boxes',
      'Drain and dry appliances 24–48 hours before loading',
      'Label boxes “FRAGILE — THIS SIDE UP” for glassware',
    ],
  },
  {
    room: 'Bedroom',
    items: [
      'Use wardrobe boxes for suits and dresses',
      'Pack mattresses in protective bags',
      'Keep jewelry and documents in a personal essentials bag',
      'Disassemble bed frames and bag hardware with labels',
    ],
  },
  {
    room: 'Living Room',
    items: [
      'Remove legs from tables when possible',
      'Wrap TVs and monitors in original boxes if available',
      'Pack books in small boxes to avoid overweight cartons',
      'Photograph cable setups before disconnecting electronics',
    ],
  },
  {
    room: 'Home Office',
    items: [
      'Back up computers and cloud-sync important files',
      'Pack monitors with corner protectors',
      'Keep tax and legal documents with you — not on the truck',
      'Label cords by device to speed up setup',
    ],
  },
  {
    room: 'Garage & Outdoor',
    items: [
      'Drain fuel from lawn equipment (check carrier rules)',
      'Pack tools in sturdy totes with weight limits in mind',
      'Clean dirt and debris off items to avoid pest inspection issues on long hauls',
      'Separate items movers may refuse (hazmat, propane, aerosols)',
    ],
  },
];

const labelingRules = [
  'Use one color per room and write the room name on every box',
  'Number boxes (e.g., Kitchen 3 of 12) for inventory tracking',
  'Mark “OPEN FIRST” for essentials boxes at destination',
  'List fragile contents on the side of the box, not just the top',
];

const doNotPack = [
  'Cash, jewelry, and personal documents',
  'Medications and daily prescriptions',
  'Flammables, aerosols, and propane tanks',
  'Perishable food and open liquids',
  'High-value electronics you need during transit',
];

export default function PackingChecklistPage() {
  return (
    <>
      <ArticleSchema
        title="Room-by-Room Packing Checklist for Long-Distance Moves"
        description="Complete packing checklist for interstate moves with supplies, labeling, and room-by-room tasks."
        path="/resources/packing-checklist"
      />

      <div className="min-h-screen">
        <section className="border-b bg-gradient-to-b from-primary/5 via-background to-background">
          <div className="container mx-auto px-4 py-10 max-w-3xl">
            <Link
              href="/resources"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to all resources
            </Link>

            <Badge variant="secondary" className="mb-4">Checklist</Badge>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
              Room-by-Room Packing Checklist for Long-Distance Moves
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Interstate shipments travel farther and may be loaded with other households. Smart packing and labeling protects your belongings and makes delivery day smoother. Pair this guide with our{' '}
              <Link href="/moving-calculator" className="text-primary underline underline-offset-2">moving inventory calculator</Link>
              {' '}and{' '}
              <Link href="/resources/checklist" className="text-primary underline underline-offset-2">full moving timeline checklist</Link>.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-10 max-w-3xl space-y-10">
          <section>
            <h2 className="text-2xl font-semibold tracking-tight mb-3 flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" aria-hidden="true" />
              Essential Packing Supplies
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
              {supplies.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight mb-4">Room-by-Room Packing Tasks</h2>
            <div className="grid gap-4">
              {roomChecklists.map((section) => (
                <div key={section.room} className="rounded-xl border bg-card p-5 shadow-sm">
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <Box className="h-4 w-4 text-primary" aria-hidden="true" />
                    {section.room}
                  </h3>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border bg-muted/30 p-6">
            <h2 className="text-xl font-semibold tracking-tight mb-3">Labeling System That Works</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
              {labelingRules.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border border-amber-200/80 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20 p-6">
            <h2 className="text-xl font-semibold tracking-tight mb-3 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-amber-700 dark:text-amber-400" aria-hidden="true" />
              Do Not Pack on the Moving Truck
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
              {doNotPack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground mt-4">
              Review our{' '}
              <Link href="/resources/scams" className="text-primary underline underline-offset-2">scam avoidance guide</Link>
              {' '}before handing over large deposits, and verify carriers in our{' '}
              <Link href="/companies" className="text-primary underline underline-offset-2">mover directory</Link>.
            </p>
          </section>

          <GuideFooter
            relatedSlugs={['checklist', 'move-size-weight', 'how-to-choose', 'routes', 'scams']}
          />
        </div>
      </div>
    </>
  );
}