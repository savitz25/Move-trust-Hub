# Official website enrichment security

Task 001 defines an interface and policy; it performs no crawl.

## Identity gate

Only a high-confidence candidate official domain may enter enrichment. Validate DBA/legal name, public phone, address/location, published USDOT/MC/state identifier, and Google business linkage. Record domain, status, confidence, source, and verification time. Ambiguous sites enter `IDENTITY_REVIEW`.

## Fetch policy

- HTTPS only; no URL credentials or custom ports.
- Resolve DNS before every fetch and redirect. Block loopback, link-local, private, reserved, metadata-service, and internal destinations for IPv4 and IPv6. Revalidate after DNS resolution to prevent rebinding.
- Same verified domain only. A redirect gets at most three hops and must pass the full validation again.
- Respect robots.txt; no login, cookies, credentialed pages, form submission, or authentication bypass.
- Ten pages by default (hard ceiling 15), 2 MB per response, 8-second request timeout, bounded total job time.
- Prefer homepage, contact, about, location, service, footer, `mailto:`, `tel:`, and structured-data observations.
- No recursive unrestricted discovery and no arbitrary JavaScript execution.
- Accept only expected HTML/text content types; do not execute returned HTML or scripts.
- Log source URLs and non-secret outcomes; never store credentials or page form data.

`validateOfficialWebsiteUrl` provides an initial syntactic guard. The production fetch adapter must additionally perform DNS/IP checks at connection time; syntax checks alone are not SSRF protection.

## Data semantics

Extracted phone/email/site values preserve originals and normalized forms. Never manufacture an email. Service areas and services are provider-published claims. A website’s interstate claim cannot create authority or move eligibility. Private/personal employee details are excluded even if publicly reachable.
