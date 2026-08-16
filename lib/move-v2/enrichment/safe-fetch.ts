import { lookup } from "node:dns/promises";
import { isBlockedHost, validateCrawlUrl } from "./website";

const MAX_BYTES = 2_000_000,
  MAX_REDIRECTS = 3,
  TIMEOUT_MS = 8_000;
const robotsChecked = new Set<string>(),
  robotsDenied = new Set<string>();

async function assertPublic(host: string) {
  const addresses = await lookup(host, { all: true, verbatim: true });
  if (
    !addresses.length ||
    addresses.some((entry) => isBlockedHost(entry.address))
  )
    throw new Error("SSRF_BLOCKED_ADDRESS");
}

export async function safeFetchHtml(
  raw: string,
  expectedDomain?: string,
  allowedTypes = ["text/html"],
): Promise<{ url: string; html: string }> {
  let current = raw;
  for (let redirects = 0; redirects <= MAX_REDIRECTS; redirects++) {
    const checked = validateCrawlUrl(current);
    if (!checked.ok) throw new Error(checked.reason);
    const url = checked.url;
    if (
      expectedDomain &&
      url.hostname.replace(/^www\./, "") !==
        expectedDomain.replace(/^www\./, "")
    )
      throw new Error("CROSS_DOMAIN_REDIRECT");
    await assertPublic(url.hostname);
    if (url.pathname !== "/robots.txt" && !robotsChecked.has(url.origin)) {
      robotsChecked.add(url.origin);
      try {
        const robots = await safeFetchHtml(
          `${url.origin}/robots.txt`,
          url.hostname,
          ["text/plain", "text/html"],
        );
        if (
          /User-agent:\s*\*[\s\S]{0,500}?Disallow:\s*\/\s*(?:\r?\n|$)/i.test(
            robots.html,
          )
        )
          robotsDenied.add(url.origin);
      } catch {
        /* Missing/unreadable robots does not expand the page budget. */
      }
    }
    if (robotsDenied.has(url.origin)) throw new Error("ROBOTS_DISALLOW_ALL");
    const response = await fetch(url, {
      redirect: "manual",
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: {
        "User-Agent":
          "MoveTrustHubEvidenceBot/1.0 (+https://movetrusthub.com/about)",
      },
    });
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");
      if (!location) throw new Error("REDIRECT_WITHOUT_LOCATION");
      current = new URL(location, url).toString();
      continue;
    }
    if (!response.ok) throw new Error(`HTTP_${response.status}`);
    const type = response.headers.get("content-type") ?? "";
    if (!allowedTypes.some((allowed) => type.includes(allowed)))
      throw new Error("CONTENT_TYPE_REJECTED");
    const declared = Number(response.headers.get("content-length") || 0);
    if (declared > MAX_BYTES) throw new Error("PAYLOAD_TOO_LARGE");
    const reader = response.body?.getReader();
    if (!reader) throw new Error("EMPTY_BODY");
    const chunks: Uint8Array[] = [];
    let total = 0;
    while (true) {
      const part = await reader.read();
      if (part.done) break;
      total += part.value.length;
      if (total > MAX_BYTES) {
        await reader.cancel();
        throw new Error("PAYLOAD_TOO_LARGE");
      }
      chunks.push(part.value);
    }
    return {
      url: url.toString(),
      html: new TextDecoder().decode(Buffer.concat(chunks)),
    };
  }
  throw new Error("REDIRECT_LIMIT");
}
