type Step = { step: string; title: string; desc: string };

export function HubHowItWorks({
  heading = 'How It Works',
  subheading,
  steps,
}: {
  heading?: string;
  subheading?: string;
  steps: Step[];
}) {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="mb-12 text-center">
        {subheading ? (
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
            {subheading}
          </p>
        ) : null}
        <h2 className="text-3xl font-semibold tracking-tight">{heading}</h2>
      </div>
      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
        {steps.map((item) => (
          <div
            key={item.step}
            className="rounded-2xl border bg-card p-6 shadow-sm"
          >
            <div className="mb-3 text-3xl font-bold text-primary/25">{item.step}</div>
            <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}