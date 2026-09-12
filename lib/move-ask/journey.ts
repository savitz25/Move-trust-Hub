import { createHash } from "node:crypto";
import metrics from "../../data/home/move-network-metrics-v1.json";
import { directoryStateName } from "../directory/parse-directory-research-query";
import type { MoveRegulatoryRole } from "./contract";

export type MovePlace = {
  raw: string;
  city?: string;
  county?: string;
  state?: string;
  resolution: "EXACT" | "NEEDS_CLARIFICATION";
};
export type Journey = {
  task:
    | "MOVE_JOURNEY"
    | "AUTO_TRANSPORT"
    | "TRANSACTION_OR_BOOKING"
    | "UNSUPPORTED_LOCALITY";
  origin?: MovePlace;
  destination?: MovePlace;
  locality?: MovePlace;
  moveType: "household_goods" | "auto_transport";
  moveScope: "interstate" | "intrastate" | "unresolved";
  role?: MoveRegulatoryRole;
  companyName?: string;
  outcome:
    | "APPLIED"
    | "NEEDS_CLARIFICATION"
    | "UNSUPPORTED"
    | "USER_APPROVED_RELAXATION";
  executionGeography?: {
    state: string;
    meaning: "recorded_headquarters_state";
  };
  authorityGrain:
    | "federal_interstate_research"
    | "state_intrastate_research"
    | "unresolved";
  availability: "NOT_ESTABLISHED";
  booking: boolean;
  summary: string;
  checklist: string[];
  capabilities: Array<{
    state: string;
    route: string | null;
    authority: Array<{ id: string; status: string; metricKeys: string[] }>;
    source: string;
  }>;
};
const states = Array.from({ length: 676 }, (_, n) =>
  String.fromCharCode(65 + Math.floor(n / 26), 65 + (n % 26)),
).filter((s) => directoryStateName(s));
const tidy = (s: string) =>
  s
    .trim()
    .replace(/^[,\s]+|[,.?!\s]+$/g, "")
    .replace(/\s+/g, " ");
export function resolveMovePlace(raw: string): MovePlace {
  const value = tidy(raw);
  if (/^(?:me|near me|here)$/i.test(value))
    return { raw: value, resolution: "NEEDS_CLARIFICATION" };
  // NYC is an explicit jurisdictional name, not inference from a provider corpus.
  if (/^(?:new york city|nyc)$/i.test(value))
    return {
      raw: value,
      city: "New York City",
      state: "NY",
      resolution: "EXACT",
    };
  for (const state of states) {
    const name = directoryStateName(state)!;
    if ([state, name].some((v) => value.toLowerCase() === v.toLowerCase()))
      return { raw: value, state, resolution: "EXACT" };
    for (const suffix of [name, state]) {
      if (!value.toLowerCase().endsWith(" " + suffix.toLowerCase())) continue;
      const local = tidy(value.slice(0, -(suffix.length + 1)));
      // Conjunctions/additional conditions must not become a false city match.
      if (
        !local ||
        /\b(?:and|or|from|to|with|near|within|miles|tomorrow)\b/i.test(local)
      )
        break;
      if (
        states.some(
          (s) =>
            local.toLowerCase() === directoryStateName(s)?.toLowerCase() ||
            local === s,
        )
      )
        break;
      return {
        raw: value,
        ...(/ county$/i.test(local)
          ? { county: local.replace(/ county$/i, "") }
          : { city: local }),
        state,
        resolution: "EXACT",
      };
    }
  }
  return {
    raw: value,
    ...(/ county$/i.test(value)
      ? { county: value.replace(/ county$/i, "") }
      : value && !/near me/i.test(value)
        ? { city: value }
        : {}),
    resolution: "NEEDS_CLARIFICATION",
  };
}
export function journeyConsent(q: string) {
  return createHash("sha256").update(q.trim()).digest("hex").slice(0, 24);
}
export function journeyHref(
  q: string,
  fields: Record<string, string | undefined> = {},
) {
  const p = new URLSearchParams({ q });
  for (const [k, v] of Object.entries(fields)) if (v) p.set(k, v);
  return `/ask?${p}`;
}

/** Structural consumer tasks precede the ordinary name fallback, never labelled IDs. */
export function parseJourney(raw: string): Journey | null {
  const text = tidy(raw);
  // Route words inside an explicitly quoted source name are identity content.
  // A real route or booking outside that name still uses the journey boundary.
  const outsideNames = text.replace(/"[^"]+"|\u201c[^\u201d]+\u201d/g, "");
  if (outsideNames !== text && !/\bfrom\b.+\bto\b|\b(?:book|hire|schedule|dispatch)\b/i.test(outsideNames)) return null;
  // A source-name signal such as "Movers in Motion LLC" is not local discovery.
  // Explicit journey/booking structure can still carry a company with a legal suffix.
  if (/\b(?:llc|inc\.?|ltd\.?|corporation)\s*(?:licensed|registered|authorized)?$/i.test(text) && !/\bfrom\b.+\bto\b|\b(?:book|hire|schedule)\b/i.test(text)) return null;
  const route =
    text.match(
      /\bfrom\s+(.+?)\s+to\s+(.+?)(?=\s*[—;]|\s+-\s+|\s+what should i check|$)/i,
    ) ??
    text.match(
      /\b(?:movers?|moving|move|auto transport)\s+(.+?)\s+to\s+(.+)$/i,
    );
  const booking =
    /\b(?:book|hire|schedule|dispatch)\b.*\b(?:move|movers?|moving)|\b(?:move|movers?)\b.*\b(?:tomorrow|this weekend|today)\b/i.test(
      text,
    );
  const generic =
    /^(?:(?:find|show|research|book|hire|schedule|i need|a|an|the|local|intrastate|interstate|current|active|household[- ]goods)\s+)*(?:movers?|moving companies|carriers?|brokers?|auto transport)\s+(?:in|near|within|serving|that serve)\s+(.+)$/i.exec(
      text,
    );
  const personal =
    /^(?:i(?:'m| am)\s+)?moving (?:my|our|a|the)\b|^schedule a move/i.test(
      text,
    );
  const named =
    route &&
    !/^(?:auto transport|vehicle shipping|car shipping)\b/i.test(text) &&
    (text.match(
      /^can\s+(.+?)\s+(?:handle|perform|do)\s+(?:my|our|a|the)\s+move\b/i,
    )?.[1] ??
      text.match(
        /^(.+?\b(?:Moving(?: Services)?|Van Lines|Transport|LLC|Inc))\s+from\b/i,
      )?.[1]);
  const explicitStateLocal = /\b(?:local|intrastate)\s+(?:move|mover)\b/i.test(
    text,
  );
  const localSpan = generic?.[1] ?? (booking ? text.match(/\b(?:in|near|within)\s+(.+)$/i)?.[1] : undefined);
  const locality = localSpan ? resolveMovePlace(localSpan.replace(/\s+(?:for\s+)?(?:tomorrow|today|this weekend)$/i, "")) : undefined;
  if (!route && !booking && !personal && !generic) return null;
  if (
    generic &&
    !booking &&
    !explicitStateLocal &&
    locality?.state &&
    !locality?.city &&
    !locality?.county &&
    !/serving|serve|near|within/i.test(text)
  )
    return null;
  const moveType =
    /\b(?:auto transport|vehicle shipping|car shipping|ship my car)\b/i.test(
      text,
    )
      ? "auto_transport"
      : "household_goods";
  const roleText = named
    ? text.slice(text.indexOf(named) + named.length)
    : text;
  const broker = /\bbrokers?\b/i.test(roleText),
    carrier = /\bcarriers?\b/i.test(roleText);
  const origin = route ? resolveMovePlace(route[1]!) : undefined;
  const destination = route
    ? resolveMovePlace(
        route[2]!.replace(/\s+(?:for\s+)?(?:tomorrow|today|this weekend)$/i, ""),
      )
    : undefined;
  return {
    task: booking
      ? "TRANSACTION_OR_BOOKING"
      : moveType === "auto_transport"
        ? "AUTO_TRANSPORT"
        : route || personal || explicitStateLocal
          ? "MOVE_JOURNEY"
          : "UNSUPPORTED_LOCALITY",
    origin,
    destination,
    locality,
    moveType,
    moveScope: explicitStateLocal ? "intrastate" : "unresolved",
    role:
      broker && carrier
        ? "carrier_broker"
        : broker
          ? "broker"
          : carrier
            ? "carrier"
            : undefined,
    companyName: named ? named.replace(/^["\u201c](.*)["\u201d]$/, "$1") : undefined,
    outcome: "NEEDS_CLARIFICATION",
    availability: "NOT_ESTABLISHED",
    authorityGrain: "unresolved",
    booking,
    summary: "",
    checklist: [],
    capabilities: [],
  };
}

export function completeJourney(j: Journey): Journey {
  if (j.origin?.state && j.destination?.state)
    j.moveScope =
      j.origin.state === j.destination.state ? "intrastate" : "interstate";
  j.authorityGrain =
    j.moveScope === "interstate"
      ? "federal_interstate_research"
      : j.moveScope === "intrastate"
        ? "state_intrastate_research"
        : "unresolved";
  const places = [j.origin, j.destination, j.locality].filter(
    (p): p is MovePlace => Boolean(p),
  );
  j.capabilities = [
    ...new Set(
      places.map((p) => p.state).filter((s): s is string => Boolean(s)),
    ),
  ].map((state) => {
    const c = metrics.stateCapabilities.find((c) => c.state === state);
    return {
      state,
      route: c?.route ?? null,
      authority: (c?.capabilities ?? [])
        .filter((c) => j.moveType === "household_goods" && /hhg-(?:roster|registration|authority)/.test(c.id))
        .map(({ id, status, metricKeys }) => ({ id, status, metricKeys })),
      source: "data/home/move-network-metrics-v1.json",
    };
  });
  const unresolved =
    !places.length || places.some((p) => p.resolution !== "EXACT");
  j.outcome = unresolved
    ? "NEEDS_CLARIFICATION"
    : j.task === "UNSUPPORTED_LOCALITY"
      ? "UNSUPPORTED"
      : "APPLIED";
  j.summary =
    j.task === "UNSUPPORTED_LOCALITY"
      ? "The requested locality is retained. This search cannot establish local service or availability. You may explicitly choose recorded-state identity research instead."
      : unresolved
        ? "Keep the move details and clarify the missing endpoint or state below. No mover cohort has been selected."
        : j.moveScope === "unresolved"
          ? "Supply both origin and destination to determine the relevant authority research. No route or authority eligibility has been established."
          : j.moveScope === "intrastate"
            ? "Research the applicable state intrastate authority. Federal FMCSA presence is not a substitute for state authority."
            : "Research federal interstate identity and authority for the requested move. These records do not establish exact-route service or availability.";
  if (j.booking)
    j.summary =
      "MoveTrustHub does not book, dispatch, or confirm mover availability. We can help you research identities and authority before you contact providers. " +
      j.summary;
  j.checklist = [
    "Obtain the exact company name and labeled USDOT/MC identifiers; distinguish the transporting carrier from a broker.",
    j.moveScope === "intrastate"
      ? "Use the relevant state authority research below. Search-only or request-only coverage is not zero movers; FMCSA is not state intrastate permission."
      : j.moveType === "auto_transport"
        ? "Research vehicle-transport identity and source-native carrier/broker authority; household-goods status is not vehicle-shipping evidence."
        : "For interstate household goods, review source-native federal carrier/broker authority separately from the USDOT identity.",
    "Confirm pickup, delivery, route service and availability directly. Headquarters or recorded address does not establish service territory.",
    "Review evidence dates and limitations. Missing complaint or enforcement observations are not a clean-history finding; no mover ranking or endorsement is made.",
  ];
  return j;
}
