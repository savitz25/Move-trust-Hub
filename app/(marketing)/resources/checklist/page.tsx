import Link from 'next/link';
import { ArticleSchema } from '@/components/resources/article-schema';
import { GuideFooter } from '@/components/resources/guide-footer';

export const metadata = {
  title: 'Complete Interstate Moving Checklist',
  description: 'Detailed interstate moving timeline from 8 weeks out through delivery day and post-move tasks. Free printable-style checklist for long-distance moves.',
};

export default function Checklist() {
  return (
    <>
    <ArticleSchema
      title="Complete Interstate Moving Checklist"
      description="Interstate moving timeline from 8 weeks out through delivery day and post-move tasks."
      path="/resources/checklist"
    />
    <div className="container mx-auto px-4 py-10 max-w-3xl prose prose-neutral">
      <Link href="/resources" className="text-sm hover:underline">← Back to all resources</Link>

      <h1>Complete Interstate Moving Checklist</h1>
      
      <p className="text-lg text-muted-foreground">
        Moving across state lines requires careful planning. This timeline covers everything from research through delivery and the weeks after. Use it as your master checklist.
      </p>

      <div className="not-prose bg-muted/50 border rounded-lg p-4 my-6 text-sm">
        <p><strong>Pro tip:</strong> Start by using our <Link href="/moving-calculator" className="text-primary underline">free moving calculator</Link> to get an accurate volume estimate before you begin contacting movers.</p>
      </div>

      <h2>8 Weeks Before Your Move</h2>
      <ul>
        <li>Research and get quotes from at least 3 reputable interstate movers using our <Link href="/companies">directory</Link></li>
        <li>Use our moving calculator to estimate your total volume and weight</li>
        <li>Verify mover licensing on fmcsa.dot.gov</li>
        <li>Create a moving binder or digital folder for estimates, contracts, and inventory</li>
        <li>Start decluttering — donate, sell, or discard items you no longer need</li>
      </ul>

      <h2>6 Weeks Before Your Move</h2>
      <ul>
        <li>Choose your mover and sign the contract (get everything in writing)</li>
        <li>Confirm pickup and delivery dates in the contract</li>
        <li>Schedule a video or in-home survey if not already done</li>
        <li>Begin notifying important parties: employer, schools, banks, doctors</li>
        <li>Order packing supplies or arrange for the mover to provide them</li>
        <li>Start packing non-essential rooms (books, seasonal items, decor)</li>
      </ul>

      <h2>4 Weeks Before Your Move</h2>
      <ul>
        <li>Confirm your move dates with the moving company</li>
        <li>Notify utilities (electric, gas, water, internet, trash) of your move-out date</li>
        <li>File change of address with USPS</li>
        <li>Notify insurance companies, credit cards, and subscriptions of new address</li>
        <li>Arrange for any needed storage if there’s a gap between pickup and delivery</li>
        <li>Take photos of high-value items for insurance purposes</li>
        <li>Pack an “essentials” box with items you’ll need immediately upon arrival</li>
      </ul>

      <h2>2 Weeks Before Your Move</h2>
      <ul>
        <li>Confirm your mover’s arrival time and any special instructions</li>
        <li>Finish packing everything except daily essentials</li>
        <li>Return borrowed items and retrieve items you’ve lent out</li>
        <li>Empty and clean the refrigerator and freezer</li>
        <li>Disassemble furniture that the movers won’t handle</li>
        <li>Confirm parking arrangements for the moving truck</li>
        <li>Pack a suitcase with clothes and essentials for moving day</li>
      </ul>

      <h2>1 Week Before Your Move</h2>
      <ul>
        <li>Confirm the moving company’s arrival time one final time</li>
        <li>Finish all remaining packing</li>
        <li>Empty all trash cans</li>
        <li>Clean the house (or arrange for cleaners)</li>
        <li>Defrost the freezer if needed</li>
        <li>Pack an overnight bag for everyone in the household</li>
        <li>Have cash on hand for tips and last-minute expenses</li>
      </ul>

      <h2>Moving Day</h2>
      <ul>
        <li>Be ready at least 30 minutes before the scheduled arrival</li>
        <li>Walk through the house with the crew leader and point out anything fragile or valuable</li>
        <li>Take photos or video of the empty house before they load</li>
        <li>Keep important documents, jewelry, and medications with you</li>
        <li>Do a final walkthrough after loading to make sure nothing was left behind</li>
        <li>Sign the inventory sheet only after verifying everything</li>
        <li>Get the driver’s contact information and estimated delivery window</li>
      </ul>

      <h2>Delivery Day</h2>
      <ul>
        <li>Be at the new home at least 30 minutes before the scheduled arrival</li>
        <li>Walk through with the crew and point out where items should go</li>
        <li>Check every box and piece of furniture as it comes off the truck</li>
        <li>Note any damage on the inventory sheet before signing</li>
        <li>Photograph any damage immediately</li>
        <li>Pay the balance only after everything has been delivered and inspected</li>
        <li>Keep the moving contract and inventory sheet in a safe place</li>
      </ul>

      <h2>Post-Move Tasks (First 30 Days)</h2>
      <ul>
        <li>Unpack and inspect all items within the first week</li>
        <li>File any damage or loss claims in writing within the timeframe specified in your contract (usually 9 months, but sooner is better)</li>
        <li>Update your driver’s license and vehicle registration</li>
        <li>Register to vote in your new location</li>
        <li>Update your address with the IRS and state tax authorities</li>
        <li>Find new doctors, dentists, and other service providers</li>
        <li>Explore your new neighborhood and locate emergency services</li>
      </ul>

      <GuideFooter relatedSlugs={['packing-checklist', 'how-to-choose', 'move-size-weight', 'routes', 'scams']} />

      <p className="text-xs text-muted-foreground mt-12">
        This checklist is a general guide. Always follow the specific terms in your moving contract and consult professionals for legal or financial advice.
      </p>
    </div>
    </>
  );
}
