import { isIP } from "node:net";
import { URL } from "node:url";
import { normalizeNameForMatch } from "@/lib/verification/google-places-name-queries";
import type { RegulatoryIdentity, WebsiteStatus } from "./types";
const blockedDomains = [
  "facebook.com",
  "instagram.com",
  "linkedin.com",
  "yelp.com",
  "bbb.org",
  "angi.com",
  "homeadvisor.com",
  "thumbtack.com",
  "yellowpages.com",
  "google.com",
  "mapquest.com",
];
export function isBlockedHost(host: string) {
  const h = host.toLowerCase().replace(/^www\./, "");
  if (h === "localhost" || h.endsWith(".local") || h.endsWith(".internal"))
    return true;
  if (blockedDomains.some((x) => h === x || h.endsWith("." + x))) return true;
  if (isIP(h)) {
    const p = h.split(".").map(Number);
    return (
      h === "::1" ||
      h.startsWith("fe80:") ||
      h.startsWith("fc") ||
      h.startsWith("fd") ||
      p[0] === 10 ||
      p[0] === 127 ||
      p[0] === 0 ||
      (p[0] === 169 && p[1] === 254) ||
      (p[0] === 172 && p[1] >= 16 && p[1] <= 31) ||
      (p[0] === 192 && p[1] === 168) ||
      p[0] >= 224
    );
  }
  return false;
}
export function validateCrawlUrl(raw: string) {
  let u: URL;
  try {
    u = new URL(raw);
  } catch {
    return { ok: false, reason: "INVALID_URL" } as const;
  }
  if (u.protocol !== "https:")
    return { ok: false, reason: "HTTPS_REQUIRED" } as const;
  if (u.username || u.password)
    return { ok: false, reason: "CREDENTIALS_FORBIDDEN" } as const;
  if (isBlockedHost(u.hostname))
    return { ok: false, reason: "BLOCKED_HOST" } as const;
  return { ok: true, url: u } as const;
}
export function decideWebsite(
  identity: RegulatoryIdentity,
  url: string,
  signals: {
    pageName?: string;
    phone?: string;
    usdot?: string;
    address?: string;
  },
): { status: WebsiteStatus; score: number; reasons: string[] } {
  const checked = validateCrawlUrl(url);
  if (!checked.ok)
    return { status: "WEBSITE_REJECTED", score: 0, reasons: [checked.reason] };
  let score = 0;
  const reasons: string[] = [];
  const target = normalizeNameForMatch(identity.dbaName || identity.legalName),
    page = normalizeNameForMatch(signals.pageName ?? "");
  if (target && page && (page.includes(target) || target.includes(page))) {
    score += 45;
    reasons.push("NAME_CONSISTENT");
  }
  if (
    digits(identity.phone) &&
    digits(identity.phone) === digits(signals.phone)
  ) {
    score += 35;
    reasons.push("PHONE_EXACT");
  }
  if (
    identity.usdot &&
    signals.usdot &&
    signals.usdot.replace(/\D/g, "") === identity.usdot.replace(/\D/g, "")
  ) {
    score += 20;
    reasons.push("USDOT_EXACT");
  }
  if (
    identity.city &&
    signals.address?.toLowerCase().includes(identity.city.toLowerCase())
  ) {
    score += 15;
    reasons.push("CITY_CONSISTENT");
  }
  return {
    status:
      score >= 65
        ? "WEBSITE_HIGH_CONFIDENCE"
        : score >= 35
          ? "WEBSITE_REVIEW"
          : "WEBSITE_REJECTED",
    score: Math.min(100, score),
    reasons,
  };
}
const digits = (v?: string | null) => (v ?? "").replace(/\D/g, "").slice(-10);
export type PublishedExtraction = {
  emails: string[];
  phones: string[];
  services: string[];
  serviceAreas: string[];
  branches: string[];
};
export function extractPublished(html: string): PublishedExtraction {
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&");
  const emails = [
    ...new Set(
      [...html.matchAll(/mailto:([^"'?>\s]+)/gi)].map((m) =>
        decodeURIComponent(m[1]).toLowerCase(),
      ),
    ),
  ];
  const phones = [
    ...new Set(
      [...html.matchAll(/tel:([^"'?>\s]+)/gi)].map((m) =>
        m[1].replace(/%20/g, " "),
      ),
    ),
  ];
  const serviceMap: Record<string, RegExp> = {
    LOCAL_MOVING: /\blocal mov(?:ing|ers?)\b/i,
    INTERSTATE_MOVING: /\b(interstate|long[- ]distance|nationwide) mov/i,
    PACKING: /\bpacking\b/i,
    STORAGE: /\bstorage\b/i,
    COMMERCIAL_MOVING: /\b(commercial|office) mov/i,
    OPEN_TRANSPORT: /\bopen (?:auto |car )?transport\b/i,
    ENCLOSED_TRANSPORT: /\benclosed (?:auto |car )?transport\b/i,
    MOTORCYCLE_TRANSPORT: /\bmotorcycle (?:shipping|transport)\b/i,
    INOPERABLE_VEHICLE_TRANSPORT: /\binoperable vehicle/i,
  };
  const services = Object.entries(serviceMap)
    .filter(([, re]) => re.test(text))
    .map(([k]) => k);
  const areas = [
    ...new Set(
      [
        ...text.matchAll(
          /(?:serv(?:e|ing|ice areas?(?: include)?|areas we serve)[:\s]+)([^.!<]{3,180})/gi,
        ),
      ].map((m) => m[1].trim()),
    ),
  ];
  return { emails, phones, services, serviceAreas: areas, branches: [] };
}
