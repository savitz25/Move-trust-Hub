import Link from 'next/link';

export const metadata = {
  title: 'Why Knowing the Size and Weight of Your Move Is the Most Important First Step',
  description:
    'Learn why accurate cubic footage and weight estimates protect you from lowball quotes, inflated prices, and moving day surprises. Use our free calculator first.',
  openGraph: {
    title: 'Why Knowing the Size and Weight of Your Move Is the Most Important First Step',
    description:
      'Stop guessing your move size. Understand why inventory and weight matter before you request quotes from interstate movers.',
  },
};

export default function MoveSizeWeightGuide() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl prose prose-neutral dark:prose-invert">
      <Link href="/resources" className="text-sm hover:underline">
        ← Back to all resources
      </Link>

      <h1 className="mt-4">Why Knowing the Size and Weight of Your Move Is the Most Important First Step</h1>

      <p>
        Getting moving quotes can be confusing and stressful. One company quotes you $6,000 while another quotes $18,000 for the same move. Why the huge difference?
      </p>

      <p>
        The answer is almost always the same: <strong>they don&apos;t know the actual size and weight of your belongings</strong>.
      </p>

      <h2>The Problem with &quot;Guessing&quot; Your Move Size</h2>

      <p>
        Most moving companies ask for a quick verbal or email description of your move. Without accurate measurements, they are forced to estimate. This leads to two common problems:
      </p>

      <ul>
        <li>
          <strong>Underbidding companies</strong> — They deliberately lowball the cubic footage to win the job, then hit you with surprise charges later.
        </li>
        <li>
          <strong>Padding companies</strong> — They inflate the size and weight to justify a much higher price, scaring you into thinking cheaper quotes are scams.
        </li>
      </ul>

      <p>
        Either way, the customer loses. You end up either overpaying or dealing with hidden fees and stress on moving day.
      </p>

      <h2>Knowledge Is Power</h2>

      <p>
        The best way to protect yourself is simple: <strong>know your move before you talk to any mover</strong>.
      </p>

      <p>Using a detailed moving inventory calculator allows you to:</p>
      <ul>
        <li>Get an accurate estimate of total cubic feet and weight</li>
        <li>Understand exactly what you&apos;re moving (and what you can leave behind or sell)</li>
        <li>Receive realistic quotes from reputable companies</li>
        <li>Avoid being taken advantage of by dishonest estimators</li>
      </ul>

      <h2>How to Get an Accurate Move Size</h2>

      <p>
        Our free Moving Calculator on Move Trust Hub makes this easy. Simply go through room by room and list your items. The tool will calculate:
      </p>
      <ul>
        <li>Total cubic footage</li>
        <li>Estimated weight</li>
        <li>Recommended truck size</li>
      </ul>

      <p>
        Armed with this information, you can confidently speak with multiple companies and compare apples to apples.
      </p>

      <h2>Take Control of Your Move Today</h2>

      <p>
        Don&apos;t let movers control the conversation with vague estimates. Spend 15–20 minutes creating your inventory first.
      </p>

      <div className="not-prose my-6">
        <Link
          href="/moving-calculator"
          className="text-primary font-semibold hover:underline"
        >
          Click here to use our free Moving Calculator →
        </Link>
      </div>

      <p>Knowledge is power. A well-prepared customer almost always gets better service and better pricing.</p>

      <p className="text-sm text-muted-foreground not-prose">
        <em>Move Trust Hub — Trusted Directory &amp; Reviews for Interstate Movers</em>
      </p>
    </div>
  );
}