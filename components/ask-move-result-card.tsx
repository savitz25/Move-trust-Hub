"use client";

import React, { type MouseEvent } from "react";
import Link from "next/link";
import { AssociationDisclosure } from "@/components/company/association-disclosure";
import {
  CARD_SURFACE_ATTR,
  CARD_SURFACE_PROFILE,
  handleCardSurfaceClick,
} from "@/lib/move-ask/card-surface";
import type { AskCard } from "@/lib/move-ask/execute";

export function AskMoveResultCard({
  row,
  officialAsOf,
}: {
  row: AskCard;
  officialAsOf: string;
}) {
  const profile = row.href;
  const surface = profile
    ? {
        [CARD_SURFACE_ATTR]: CARD_SURFACE_PROFILE,
        onClick: (event: MouseEvent<HTMLElement>) => {
          handleCardSurfaceClick(event.nativeEvent, event.currentTarget);
        },
      }
    : {};
  return (
    <article
      className={`min-w-0 rounded-2xl border border-[#E2E8F0] bg-white p-5 ${profile ? "cursor-pointer" : ""}`}
      data-testid="ask-result-card"
      {...surface}
    >
      <div className="flex min-w-0 flex-wrap items-start justify-between gap-2">
        {profile ? (
          <Link
            href={profile}
            data-search-action="profile"
            data-testid="ask-profile-link"
            className="group min-w-0 flex-1 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <span className="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
              <h3 className="min-w-0 break-words text-xl font-semibold leading-snug text-[#C2410C] underline decoration-[#C2410C]/40 underline-offset-2">
                {row.displayName}
              </h3>
              <span className="inline-flex min-h-11 shrink-0 items-center text-sm font-semibold text-[#C2410C]">
                View profile →
              </span>
            </span>
          </Link>
        ) : (
          <h3 className="min-w-0 flex-1 break-words text-xl font-semibold leading-snug text-[#0A2540]">
            {row.displayName}
          </h3>
        )}
        <span className="rounded-full border border-[#E2E8F0] px-2 py-0.5 text-[11px] font-semibold">
          {row.role}
        </span>
      </div>
      {row.legalName ? <p className="mt-2 break-words text-sm">Stored legal name: {row.legalName}</p> : null}
      {row.dba ? <p className="mt-2 break-words text-sm">Stored FMCSA DBA: {row.dba}</p> : null}
      {row.selectionHref ? (
        <Link
          href={row.selectionHref}
          className="mt-3 inline-flex min-h-11 items-center rounded-xl border px-3 font-semibold focus-visible:outline focus-visible:outline-2"
        >
          Select this company and continue
        </Link>
      ) : null}
      <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
        {row.usdot ? (
          <div>
            <dt className="text-xs uppercase">USDOT</dt>
            <dd className="font-semibold">{row.usdot}</dd>
          </div>
        ) : null}
        {row.mc ? (
          <div>
            <dt className="text-xs uppercase">MC</dt>
            <dd className="font-semibold">{row.mc}</dd>
          </div>
        ) : null}
        {row.fmcsaStatus ? (
          <div>
            <dt className="text-xs uppercase">Authority status (stored)</dt>
            <dd>{row.fmcsaStatus}</dd>
          </div>
        ) : null}
        {row.operatingAuthority ? (
          <div className="sm:col-span-2">
            <dt className="text-xs uppercase">Operating authority</dt>
            <dd className="break-words">{row.operatingAuthority}</dd>
          </div>
        ) : null}
        {row.headquarters ? (
          <div>
            <dt className="text-xs uppercase">Recorded location</dt>
            <dd className="break-words">{row.headquarters}</dd>
          </div>
        ) : null}
        {row.floridaIm ? (
          <div>
            <dt className="text-xs uppercase">Florida IM registration</dt>
            <dd className="break-words">{row.floridaIm}</dd>
          </div>
        ) : null}
      </dl>
      <AssociationDisclosure integrity={row.identifierIntegrity} />
      {row.submittedIdentifierUrl ? (
        <a className="my-2 inline-flex min-h-11 items-center underline" href={row.submittedIdentifierUrl} target="_blank" rel="noopener noreferrer">
          Inspect the submitted MC separately; company association unconfirmed
        </a>
      ) : null}
      {row.sourceLastChecked !== undefined ? (
        <p className="mt-3 text-sm">
          Stored source checked-at: {row.sourceLastChecked ?? "Not available"}. Official effective time:{" "}
          {row.officialAsOf ?? "Not supplied by this extract"}. These records were not checked live today.
        </p>
      ) : null}
      {row.nameMatchEvidence && !row.officialVerificationUrl ? (
        <p className="mt-3 text-sm">
          No stored USDOT/MC identifier is available for federal verification. Refine the company identity or supply a
          labeled number; this name match does not establish federal or state authorization.
        </p>
      ) : null}
      {row.officialVerificationUrl ? (
        <a
          href={row.officialVerificationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex min-h-11 items-center font-semibold text-[#C2410C] underline"
        >
          {row.identifierIntegrity ? "Verify the corroborated USDOT with FMCSA" : "Verify this identifier with FMCSA"}
        </a>
      ) : null}
      {row.complaintsNote ? <p className="mt-2 text-xs text-[#475569]">{row.complaintsNote}</p> : null}
      {row.publicationNote ? <p className="mt-2 break-words text-xs text-[#475569]">{row.publicationNote}</p> : null}
      <div className="mt-3 border-t border-[#E2E8F0] pt-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#475569]">Evidence available</p>
        <p className="mt-1 text-sm text-[#1E293B]">
          Published identity and stored role evidence
          {row.floridaIm ? "; verified Florida FDACS registration linkage" : ""}
          {row.complaintsNote ? "; partial complaint observations" : ""}.
        </p>
      </div>
      <details className="mt-3 rounded-xl bg-[#F8FAFC] p-3">
        <summary className="scroll-mt-24 flex min-h-11 cursor-pointer items-center font-semibold text-[#0A2540]">
          Trace this result
        </summary>
        <dl className="grid gap-2 pt-2 text-sm sm:grid-cols-2">
          {row.nameMatchEvidence ? (
            <div className="sm:col-span-2">
              <dt className="text-xs uppercase">Name match evidence</dt>
              <dd className="break-words">
                {row.nameMatchEvidence.field}: {row.nameMatchEvidence.returned}.{" "}
                {row.nameMatchEvidence.matchType.replaceAll("_", " ")}. {row.nameMatchEvidence.normalization.join("; ")}
              </dd>
            </div>
          ) : null}
          {row.matchEvidence ? (
            <div className="sm:col-span-2">
              <dt className="text-xs uppercase">Match method</dt>
              <dd className="break-words">
                {row.matchEvidence.method.replaceAll("_", " ")}.{" "}
                {row.matchEvidence.fields.map((field) => `${field.field}: ${field.returned}`).join("; ")}.{" "}
                {row.matchEvidence.normalization.join("; ")}
              </dd>
            </div>
          ) : null}
          {row.identifierIntegrity ? (
            <div>
              <dt className="text-xs uppercase">Association integrity</dt>
              <dd>
                {row.identifierIntegrity.issueId}: {row.identifierIntegrity.status.replaceAll("_", " ")}. Stored MC{" "}
                {row.identifierIntegrity.observedMc ?? "unavailable"} is excluded from trusted fields.
              </dd>
            </div>
          ) : null}
          <div>
            <dt className="text-xs uppercase text-[#475569]">Why this matched</dt>
            <dd className="break-words">{row.whyMatched}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase text-[#475569]">Identifiers</dt>
            <dd className="break-words">
              {[row.usdot && `USDOT ${row.usdot}`, row.mc && `MC ${row.mc}`].filter(Boolean).join(" · ") ||
                (row.floridaIm ? "State registration row" : "No stored USDOT/MC identifier")}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase text-[#475569]">Geography rule</dt>
            <dd>Recorded headquarters is not service territory.</dd>
          </div>
          <div>
            <dt className="text-xs uppercase text-[#475569]">Sources</dt>
            <dd>
              {row.floridaIm
                ? "Florida FDACS; FMCSA only when verified-linked"
                : "Published directory record; verify federal evidence with FMCSA"}
            </dd>
          </div>
        </dl>
        <p className="mt-2 text-xs text-[#475569]">
          Source timing: {officialAsOf}. Current authority is not a recommendation; missing evidence is not zero.
        </p>
      </details>
    </article>
  );
}
