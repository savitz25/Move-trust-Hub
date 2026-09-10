"""Recompute identity grains from accepted listing records. No new crawl."""
from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "scripts" / "virginia"))
from acquire_va_move_001 import authority_id_stats  # noqa: E402

STAGE = ROOT / "data" / "virginia" / "va-move-001"


def main() -> None:
    report = json.loads((STAGE / "acquire-report.json").read_text(encoding="utf-8"))
    hhg = json.loads((STAGE / "hhg-records.json").read_text(encoding="utf-8"))
    prop = json.loads((STAGE / "property-records.json").read_text(encoding="utf-8"))
    hhg_stats = authority_id_stats(hhg)
    prop_stats = authority_id_stats(prop)
    hhg_names = {(r.get("name") or "").strip() for r in hhg if (r.get("name") or "").strip()}
    prop_names = {(r.get("name") or "").strip() for r in prop if (r.get("name") or "").strip()}
    report["household_goods_carrier"].update(hhg_stats)
    report["household_goods_carrier"]["distinct_labels"] = len(hhg_names)
    report["property_carrier"].update(prop_stats)
    report["property_carrier"]["distinct_labels"] = len(prop_names)
    hhg_ids = {
        (r.get("source_displayed_authority_number") or "").strip()
        for r in hhg
        if (r.get("source_displayed_authority_number") or "").strip()
    }
    prop_ids = {
        (r.get("source_displayed_authority_number") or "").strip()
        for r in prop
        if (r.get("source_displayed_authority_number") or "").strip()
    }
    report["cross_authority"]["exact_authority_number_overlap"] = sorted(hhg_ids & prop_ids)
    (STAGE / "acquire-report.json").write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    print(
        json.dumps(
            {
                "hhg": {k: hhg_stats[k] for k in hhg_stats if k != "source_identifier_conflicts"},
                "hhg_labels": len(hhg_names),
                "prop": {k: prop_stats[k] for k in prop_stats if k != "source_identifier_conflicts"},
                "prop_conflicts": prop_stats["source_identifier_conflicts"],
            },
            indent=2,
        )
    )


if __name__ == "__main__":
    main()
