import hashlib
import json
from pathlib import Path

p = json.loads(
    (Path(__file__).resolve().parents[2] / "lib/washington-intelligence/accepted-snapshot.json").read_text(
        encoding="utf-8"
    )
)
fp = p["fingerprint"]
body = {k: v for k, v in p.items() if k != "fingerprint"}
h = hashlib.sha256(
    json.dumps(body, sort_keys=True, separators=(",", ":"), ensure_ascii=True).encode("utf-8")
).hexdigest()
print("fp", fp)
print("hash", h)
print("match", fp == h)
if fp != h:
    raise SystemExit(1)
