"""NJ-MOVE-001 official source discovery. No CAPTCHA/login bypass."""
from __future__ import annotations

import hashlib
import json
import re
import ssl
import time
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "data" / "nj-raw" / "pmw"
GEN = ROOT / "data" / "reports"
UA = "MoveTrustHub/NJ-MOVE-001 (research acquisition; +https://www.movetrusthub.com)"
CTX = ssl.create_default_context()
URLS = {
    "pmw_home": "https://www.njconsumeraffairs.gov/pmw",
    "pmw_pages": "https://www.njconsumeraffairs.gov/pmw/Pages/default.aspx",
    "pmw_faq": "https://www.njconsumeraffairs.gov/pmw/Pages/FAQ.aspx",
    "mylicense": "https://newjersey.mylicense.com/verification/",
    "bulk": "https://newjersey.mylicense.com/Verification_Bulk/",
    "rgbportal": "https://rgbportal.dca.njoag.gov/",
    "rgb_public_view": "https://rgbportal.dca.njoag.gov/public-view/",
    "mymovers": "https://mymoversnj.gov/",
    "osm_2025": "https://www.njoag.gov/division-of-consumer-affairs-undercover-enforcement-operations-result-in-notices-of-violations-against-18-unregistered-home-improvement-contractor-businesses-and-11-unlicensed-moving-companies/",
    "osm_2024": "https://www.njoag.gov/ag-platkin-division-of-consumer-affairs-cites-23-unlicensed-movers-in-covert-civil-enforcement-action/",
    "osm_2023_highlights": "https://www.njoag.gov/ag-platkin-division-of-consumer-affairs-announce-2023-consumer-protection-enforcement-highlights/",
    "osm_2015": "https://www.njoag.gov/new-jersey-division-of-consumer-affairs-cites-19-unlicensed-movers-following-undercover-sting-operation-partnership-with-ice-results-in-several-arrests-including-moving-company-worker-with/",
}


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    GEN.mkdir(parents=True, exist_ok=True)
    rows = []
    for key, url in URLS.items():
        rec = {"key": key, "url": url}
        try:
            req = Request(url, headers={"User-Agent": UA, "Accept": "*/*"})
            with urlopen(req, context=CTX, timeout=45) as resp:
                body = resp.read()
                rec.update(
                    {
                        "status": resp.status,
                        "final_url": resp.geturl(),
                        "bytes": len(body),
                        "sha256": hashlib.sha256(body).hexdigest(),
                        "content_type": resp.headers.get("Content-Type"),
                    }
                )
                (OUT / f"{key}.html").write_bytes(body)
                print(f"OK {resp.status} {key} {len(body)}")
        except HTTPError as exc:
            rec.update({"status": exc.code, "error": str(exc.reason), "bytes": 0})
            print(f"HTTP {exc.code} {key}")
        except (URLError, TimeoutError, OSError) as exc:
            rec.update({"status": None, "error": str(exc), "bytes": 0})
            print(f"ERR {key} {exc}")
        rows.append(rec)
        time.sleep(0.12)
    (GEN / "nj-move-001-discovery.json").write_text(json.dumps(rows, indent=2), encoding="utf-8")
    bulk = OUT / "bulk.html"
    if bulk.exists():
        text = bulk.read_text(encoding="latin-1", errors="replace")
        hrefs = re.findall(r'href=["\']([^"\']+)', text, flags=re.I)
        print("BULK_LINKS", hrefs[:30])
        low = text.lower()
        print("BULK_MOVER", "mover" in low, "pmw" in low, "warehouse" in low)
    print("DONE", sum(1 for r in rows if r.get("status") == 200), "/", len(rows))


if __name__ == "__main__":
    main()
