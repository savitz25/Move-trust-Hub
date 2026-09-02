import type {
  PublicBusinessProfile,
  PublicBusinessReplies,
} from "@/lib/customer-integration/public";
import { safeBusinessWebsite } from "@/lib/customer-integration/security";
export function ProfileCustomerLayer({
  id,
  enabled,
  profile,
  replies,
}: {
  id: string;
  enabled: boolean;
  profile: PublicBusinessProfile | null;
  replies: PublicBusinessReplies | null;
}) {
  const businessWebsite = safeBusinessWebsite(profile?.fields.website);
  return (
    <div className="mb-6 space-y-4">
      {profile ? (
        <section className="rounded-xl border bg-card p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Managed profile
          </p>
          <h2 className="mt-1 text-lg font-semibold">
            Business-supplied information
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Control verified, not endorsement. Official records and TrustHub
            research remain independently sourced.
          </p>
          {profile.fields.description ? (
            <p className="mt-4 whitespace-pre-wrap text-sm">
              {profile.fields.description}
            </p>
          ) : null}
          <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
            {businessWebsite ? (
              <div>
                <dt className="text-muted-foreground">Business website</dt>
                <dd>
                  <a
                    className="underline"
                    href={businessWebsite}
                    rel="nofollow noopener noreferrer"
                    target="_blank"
                  >
                    Visit website
                  </a>
                </dd>
              </div>
            ) : null}
            {profile.fields.public_phone ? (
              <div>
                <dt className="text-muted-foreground">
                  Business-supplied phone
                </dt>
                <dd>{profile.fields.public_phone}</dd>
              </div>
            ) : null}
            {profile.fields.public_email ? (
              <div>
                <dt className="text-muted-foreground">
                  Business-supplied email
                </dt>
                <dd>{profile.fields.public_email}</dd>
              </div>
            ) : null}
            {profile.fields.contact_context ? (
              <div>
                <dt className="text-muted-foreground">Contact context</dt>
                <dd>{profile.fields.contact_context}</dd>
              </div>
            ) : null}
          </dl>
        </section>
      ) : null}
      {replies?.replies.length ? (
        <section className="rounded-xl border bg-card p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Provided by the business
          </p>
          <h2 className="mt-1 text-lg font-semibold">
            Response from the business
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            The official evidence above remains unchanged.
          </p>
          {replies.replies.map((r) => (
            <article className="mt-4 rounded-lg border p-4" key={r.id}>
              <p className="whitespace-pre-wrap text-sm">{r.body}</p>
            </article>
          ))}
        </section>
      ) : null}
      <aside className="rounded-xl border bg-card p-5">
        <p className="font-semibold">
          {profile ? "Managed by the business" : "Is this your business?"}
        </p>
        {enabled ? (
          <a
            className="mt-3 inline-flex min-h-11 items-center rounded-lg border px-4 font-semibold"
            href={
              profile
                ? "https://www.asktrusthub.com/manage"
                : `/api/claim/handoff/${encodeURIComponent(id)}`
            }
          >
            {profile ? "Manage on AskTrustHub" : "Claim this profile"}
          </a>
        ) : null}
        <p className="mt-2 text-sm text-muted-foreground">
          {enabled
            ? "Manage business-supplied information through AskTrustHub."
            : "Profile management is not currently available. You can continue researching this company or search by USDOT."}
        </p>
        <div className="mt-3 flex flex-wrap gap-3 text-sm">
          <a className="underline" href="/companies">
            Find another company
          </a>
          <a className="underline" href="https://www.asktrusthub.com/contact">
            Contact support
          </a>
        </div>
      </aside>
    </div>
  );
}
