import type { MoveAskResult } from "@/lib/move-ask/execute";
import { journeyConsent, journeyHref } from "@/lib/move-ask/journey";
import { directoryStateName } from "@/lib/directory/parse-directory-research-query";

export function MoveJourneyResearch({ result }: { result: MoveAskResult }) {
  const q = result.parsed.query,
    j = q.journey;
  if (!j) return null;
  const states = Array.from({ length: 676 }, (_, i) =>
    String.fromCharCode(65 + Math.floor(i / 26), 65 + (i % 26)),
  ).filter((s) => directoryStateName(s));
  const fields = { ...q.overrides, ...q.journeyChoices };
  const hidden = (except?: string) => (
    <>
      <input type="hidden" name="q" value={result.queryText} />
      {Object.entries(fields)
        .filter(
          ([key, value]) =>
            value && key !== except && !["consent", "research"].includes(key),
        )
        .map(([key, value]) => (
          <input key={key} type="hidden" name={key} value={value} />
        ))}
    </>
  );
  const control =
    "min-h-11 min-w-0 rounded-xl border border-slate-300 px-3 py-2";
  return (
    <section
      className="space-y-5 rounded-2xl border p-5"
      aria-labelledby="journey-heading"
    >
      <h2 id="journey-heading" className="text-2xl font-semibold">
        {j.booking
          ? "Research before contacting a mover"
          : "Research your move"}
      </h2>
      <p>{j.summary}</p>
      <ol className="list-decimal space-y-2 pl-5">
        {j.checklist.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>
      {(["origin", "destination"] as const).map((key) =>
        j[key] && !j[key]!.state ? (
          <form
            key={key}
            action="/ask"
            className="flex flex-col gap-2 sm:flex-row"
          >
            {hidden(`${key}State`)}
            <label className="flex flex-1 flex-col gap-1">
              State for {key}: {j[key]!.raw}
              <select
                name={`${key}State`}
                required
                className={control}
                defaultValue=""
              >
                <option value="" disabled>
                  Choose this endpoint’s state
                </option>
                {states.map((s) => (
                  <option key={s} value={s}>
                    {directoryStateName(s)}
                  </option>
                ))}
              </select>
            </label>
            <button className={control}>Apply {key} state</button>
          </form>
        ) : null,
      )}
      {!j.origin && !j.destination && !j.locality?.state ? (
        <form action="/ask" className="flex flex-col gap-2 sm:flex-row">
          {hidden("location")}
          <label className="flex flex-1 flex-col gap-1">
            Requested city and state
            <input
              name="location"
              required
              maxLength={80}
              className={control}
              placeholder="City, state"
              defaultValue={q.journeyChoices?.location ?? ""}
            />
          </label>
          <button className={control}>Apply location</button>
        </form>
      ) : null}
      {j.task === "UNSUPPORTED_LOCALITY" &&
      j.locality?.state &&
      !j.executionGeography ? (
        <a
          className={`${control} inline-flex items-center font-semibold`}
          href={journeyHref(result.queryText, {
            ...fields,
            research: "recorded_state",
            consent: journeyConsent(result.queryText),
          })}
        >
          Research {directoryStateName(j.locality.state)} recorded identities
          instead
        </a>
      ) : null}
      {j.capabilities.map((c) => (
        <div key={c.state} className="rounded-xl bg-slate-50 p-3">
          <h3 className="font-semibold">
            {directoryStateName(c.state)} intrastate research
          </h3>
          <p>
            {c.authority.length
              ? c.authority
                  .map((a) => `${a.id}: ${a.status.replaceAll("_", " ")}`)
                  .join("; ")
              : "No acquired state intrastate authority capability is established by this registry."}
          </p>
          <p className="text-sm">
            Separate from FMCSA interstate records. Source availability does not
            establish a mover’s permission or route availability.
          </p>
          {c.route ? (
            <a
              className="inline-flex min-h-11 items-center font-semibold underline"
              href={c.route}
            >
              Open {directoryStateName(c.state)} state research
            </a>
          ) : null}
        </div>
      ))}
      {!q.identifier && !q.nameQuery ? (
        <form action="/ask" className="flex flex-col gap-2 sm:flex-row">
          {hidden("mover")}
          <label className="flex flex-1 flex-col gap-1">
            Research a specific company for this move
            <input
              name="mover"
              required
              maxLength={80}
              className={control}
              placeholder="Company name"
            />
          </label>
          <button className={control}>Research company</button>
        </form>
      ) : null}
      <details className="rounded-xl bg-slate-50 p-3">
        <summary className="min-h-11 cursor-pointer font-semibold">
          Trace this journey
        </summary>
        <dl className="space-y-2 text-sm">
          <div>
            <dt>Requested endpoints / locality</dt>
            <dd>
              {[
                j.origin && `Origin: ${j.origin.raw}`,
                j.destination && `Destination: ${j.destination.raw}`,
                j.locality && `Locality: ${j.locality.raw}`,
              ]
                .filter(Boolean)
                .join(" → ") || "Not yet supplied"}
            </dd>
          </div>
          <div>
            <dt>Execution</dt>
            <dd>
              {j.outcome};{" "}
              {j.executionGeography
                ? `${j.executionGeography.state} recorded headquarters, explicitly selected by the user`
                : q.identifier || q.nameQuery
                  ? "Specific identity research; route availability remains unresolved"
                  : "Research guidance and capability selection; no mover list executed"}
            </dd>
          </div>
          <div>
            <dt>Authority grain</dt>
            <dd>
              {j.authorityGrain}; {j.moveType}; {j.role ?? "role not specified"}
            </dd>
          </div>
          <div>
            <dt>Source</dt>
            <dd>
              Accepted Move state-capability export:
              data/home/move-network-metrics-v1.json. State research links
              retain their own source clocks. This response is not a live
              regulator check.
            </dd>
          </div>
        </dl>
      </details>
    </section>
  );
}
