"use client";
import { useMemo, useState } from "react";
import type { ReviewFixture } from "@/lib/move-v2/evidence-operations/fixtures";
type Decision = { id: string; caseId: string; action: string; at: string };
export function ReviewConsole({ fixtures }: { fixtures: ReviewFixture[] }) {
  const [query, setQuery] = useState("");
  const [state, setState] = useState("ALL");
  const [type, setType] = useState("ALL");
  const [selected, setSelected] = useState(
    fixtures[0]?.case.reviewCaseId ?? "",
  );
  const [decisions, setDecisions] = useState<Decision[]>(
    fixtures.flatMap((fixture) => fixture.decisions ?? []),
  );
  const rows = useMemo(
    () =>
      fixtures.filter(
        (x) =>
          (state === "ALL" || x.state === state) &&
          (type === "ALL" || x.case.reviewType === type) &&
          (x.providerName.toLowerCase().includes(query.toLowerCase()) ||
            x.case.reasonCode.toLowerCase().includes(query.toLowerCase())),
      ),
    [fixtures, query, state, type],
  );
  const active =
    fixtures.find((x) => x.case.reviewCaseId === selected) ?? rows[0];
  function decide(action: string) {
    if (!active) return;
    setDecisions((d) => [
      ...d,
      {
        id: `decision-${d.length + 1}`,
        caseId: active.case.reviewCaseId,
        action,
        at: "2026-08-17 14:00 UTC",
      },
    ]);
  }
  return (
    <main
      className="min-h-screen bg-slate-950 text-slate-100 p-6"
      data-testid="review-console"
    >
      <header className="mb-6">
        <p className="text-xs uppercase tracking-[.2em] text-cyan-300">
          Internal Preview · server-read operational records
        </p>
        <h1 className="text-3xl font-semibold">Evidence operations</h1>
        <p className="text-slate-400">
          Ambiguity stays visible. Source facts remain immutable.
        </p>
      </header>
      <section
        className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6"
        aria-label="Freshness dashboard"
      >
        {[
          ["Open cases", fixtures.length],
          [
            "High priority",
            fixtures.filter((x) => x.case.priority === "HIGH").length,
          ],
          ["Authority due", 8],
          ["Failed jobs", 0],
          ["Release age", "< 1 day"],
        ].map(([a, b]) => (
          <div
            className="rounded-xl border border-slate-700 bg-slate-900 p-3"
            key={a}
          >
            <div className="text-xs text-slate-400">{a}</div>
            <strong className="text-xl">{b}</strong>
          </div>
        ))}
      </section>
      <div className="grid lg:grid-cols-[380px_1fr] gap-5">
        <aside className="rounded-xl border border-slate-700 bg-slate-900 p-4">
          <div className="grid gap-2 mb-4">
            <label>
              Search provider or reason
              <input
                aria-label="Search provider or reason"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="mt-1 w-full rounded bg-slate-800 p-2"
              />
            </label>
            <div className="grid grid-cols-2 gap-2">
              <label>
                State
                <select
                  aria-label="State filter"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="block w-full rounded bg-slate-800 p-2"
                >
                  <option>ALL</option>
                  <option>FL</option>
                  <option>WA</option>
                </select>
              </label>
              <label>
                Type
                <select
                  aria-label="Review type filter"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="block w-full rounded bg-slate-800 p-2"
                >
                  <option>ALL</option>
                  <option>LOCATION_CONFLICT</option>
                  <option>WEBSITE_IDENTITY</option>
                  <option>SERVICE_GEOGRAPHY</option>
                </select>
              </label>
            </div>
          </div>
          <div
            className="space-y-2 max-h-[600px] overflow-auto"
            data-testid="review-queue"
          >
            {rows.map((x) => (
              <button
                key={x.case.reviewCaseId}
                onClick={() => setSelected(x.case.reviewCaseId)}
                className="w-full rounded-lg border border-slate-700 p-3 text-left hover:border-cyan-400"
              >
                <span className="text-xs text-cyan-300">
                  {x.state} · {x.case.priority}
                </span>
                <strong className="block">{x.providerName}</strong>
                <span className="text-xs text-slate-400">
                  {x.case.reasonCode}
                </span>
              </button>
            ))}
          </div>
        </aside>
        {active && (
          <article
            className="rounded-xl border border-slate-700 bg-slate-900 p-5"
            data-testid="case-detail"
          >
            <div className="flex justify-between gap-4">
              <div>
                <p className="text-xs text-cyan-300">
                  {active.case.reviewType}
                </p>
                <h2 className="text-2xl font-semibold">
                  {active.providerName}
                </h2>
              </div>
              <span className="rounded-full bg-amber-950 px-3 py-1 h-fit text-amber-200">
                {active.case.status}
              </span>
            </div>
            <p className="my-4 text-slate-300">{active.case.summary}</p>
            <h3 className="font-semibold mb-2">Current consumer value</h3>
            <p className="rounded bg-slate-800 p-3 mb-5">
              {active.currentValue}
            </p>
            <h3 className="font-semibold mb-2">Side-by-side source evidence</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {active.observations.map((o) => (
                <section
                  className="rounded-lg border border-slate-700 p-4"
                  key={o.id}
                >
                  <strong>{o.source}</strong>
                  <p>{o.value}</p>
                  <dl className="text-xs text-slate-400 mt-2">
                    <dt>Observed</dt>
                    <dd>{o.observedAt}</dd>
                    <dt>Source / identity confidence</dt>
                    <dd>
                      {o.sourceConfidence} / {o.identityConfidence}
                    </dd>
                  </dl>
                </section>
              ))}
            </div>
            <fieldset className="mt-5">
              <legend className="font-semibold">Review action</legend>
              <p className="text-xs text-slate-400 mb-2">
                Actions append a synthetic test decision and never alter source
                observations.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "SELECT CURRENT LOCATION",
                  "MARK AS BRANCH",
                  "MARK OLD/HISTORICAL LOCATION",
                  "KEEP IN REVIEW",
                  "MARK INSUFFICIENT EVIDENCE",
                ].map((a) => (
                  <button
                    key={a}
                    onClick={() => decide(a)}
                    className="rounded border border-cyan-700 px-3 py-2 text-sm hover:bg-cyan-950"
                  >
                    {a}
                  </button>
                ))}
              </div>
            </fieldset>
            <section className="mt-6" data-testid="decision-history">
              <h3 className="font-semibold">Decision history</h3>
              {decisions.filter((d) => d.caseId === active.case.reviewCaseId)
                .length === 0 ? (
                <p className="text-slate-400">No decisions recorded.</p>
              ) : (
                decisions
                  .filter((d) => d.caseId === active.case.reviewCaseId)
                  .map((d) => (
                    <p
                      key={d.id}
                      className="border-l-2 border-cyan-500 pl-3 mt-2"
                    >
                      {d.action} · {d.at}
                    </p>
                  ))
              )}
            </section>
          </article>
        )}
      </div>
    </main>
  );
}
