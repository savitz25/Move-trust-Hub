import collections
import hashlib
import json
import pathlib
import re


ROOT = pathlib.Path(__file__).resolve().parents[1]
snapshot_path = ROOT / "lib" / "kansas-intelligence" / "accepted-snapshot.json"
raw = snapshot_path.read_bytes()
snapshot = json.loads(raw)
rows = snapshot["rows"]
identifiers = [str(row.get("mcid_dot_identifier") or "").strip() for row in rows]
nonblank = [identifier for identifier in identifiers if identifier]
duplicates = {key: count for key, count in collections.Counter(nonblank).items() if count > 1}

assert snapshot["row_count"] == len(rows) == 89
assert len(set(nonblank)) == 86
assert sum(not identifier for identifier in identifiers) == 1
assert sum(bool(row.get("tariff_exception_document")) for row in rows) == 9
assert duplicates == {"2460847": 2, "1066399": 2}
assert hashlib.sha256(raw).hexdigest() == "8d29f86956d61ecfdcdcf9bc6a412cb834c4c1bb531fd66d00e9bded95a51d78"
assert snapshot["raw_sha256"] == "4fe2d2cf8dcbfd797136d663273483b1fade8b3ce2ad81426247267a0cf1f0c1"

page = (ROOT / "app" / "(move)" / "kansas" / "page.tsx").read_text(encoding="utf-8")
page_flat = re.sub(r"\s+", " ", page)
sitemap = (ROOT / "app" / "sitemap.ts").read_text(encoding="utf-8")
assert "'/kansas'" in sitemap
assert "NOT_ACQUIRED" in page_flat and "UNKNOWN" in page_flat
assert "insurance-compliance census" in page_flat
assert "FMCSA interstate household-goods authority" in page_flat
assert not re.search(r"AggregateRating|Trust Score", page_flat, re.IGNORECASE)
assert not (ROOT / "app" / "(move)" / "kansas" / "[city]").exists()

print("KS-MOVE-001 integrity assertions passed")
