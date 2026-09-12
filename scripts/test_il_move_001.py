"""IL-MOVE-001 fingerprint, clock, and frozen-grain tests."""
from __future__ import annotations

import copy
import hashlib
import json
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SNAP = json.loads((ROOT / "lib/illinois-intelligence/accepted-snapshot.json").read_text(encoding="utf-8"))
PUB = (ROOT / "lib/illinois-intelligence/publication.ts").read_text(encoding="utf-8")
VOLATILE = {"fingerprint", "generated_at"}


def dump(obj: object) -> str:
    return json.dumps(obj, sort_keys=True, separators=(",", ":"), ensure_ascii=True)


def fingerprint(body: dict) -> str:
    out = {}
    for key, value in body.items():
        if key in VOLATILE:
            continue
        if key == "clocks" and isinstance(value, dict):
            out[key] = {ck: cv for ck, cv in value.items() if ck != "generatedAt"}
        else:
            out[key] = value
    return hashlib.sha256(dump(out).encode("utf-8")).hexdigest()


class IlMoveFingerprintTests(unittest.TestCase):
    def test_frozen_counts(self):
        self.assertIsNone(SNAP["current_hhg_roster"]["rows"])
        self.assertIsNone(SNAP["current_hhg_roster"]["distinctAuthorityIds"])
        self.assertIsNone(SNAP["complaints"]["IL_STATE_COMPLAINT_OBSERVATIONS"])
        self.assertIsNone(SNAP["enforcement"]["IL_STATE_ENFORCEMENT_OBSERVATIONS"])
        self.assertEqual(SNAP["expansion_ledger"]["NET_NEW_CANONICAL_ORGANIZATIONS"], 0)
        self.assertEqual(SNAP["expansion_ledger"]["NET_NEW_PUBLIC_MOVE_PROFILES"], 0)
        self.assertEqual(SNAP["expansion_ledger"]["EXISTING_ORGANIZATIONS_ENRICHED"], 0)
        self.assertEqual(SNAP["expansion_ledger"]["EXACT_PROFILE_ATTACHMENTS"], 0)
        self.assertEqual(SNAP["expansion_ledger"]["GRAPH_WRITES"], 0)
        self.assertEqual(SNAP["federal"]["exact_state_to_usdot_crosswalks"], 0)
        self.assertEqual(SNAP["federal"]["exact_state_to_mc_crosswalks"], 0)
        self.assertIsNone(SNAP["identity"]["namespace"])
        self.assertTrue(SNAP["no_chicago_page"])
        self.assertTrue(SNAP["searchOnlyIsNotZero"])

    def test_clocks_are_not_invented_source_dates(self):
        self.assertIsNone(SNAP["as_of"])
        self.assertIsNone(SNAP["clocks"]["hhg_roster"]["sourceAsOf"])
        self.assertEqual(SNAP["retrievedAt"], "2026-09-12")
        self.assertNotEqual(SNAP["generated_at"], "2026-09-12T00:00:00Z")

    def test_fingerprint_twice(self):
        first = fingerprint(SNAP)
        second = fingerprint(copy.deepcopy(SNAP))
        self.assertEqual(first, second)
        self.assertEqual(first, SNAP["fingerprint"])
        self.assertIn(SNAP["fingerprint"], PUB)

    def test_generated_at_is_volatile(self):
        mutated = copy.deepcopy(SNAP)
        mutated["generated_at"] = "2099-01-01T00:00:00Z"
        mutated["clocks"]["generatedAt"] = "2099-01-01T00:00:00Z"
        self.assertEqual(fingerprint(mutated), SNAP["fingerprint"])

    def test_semantic_mutation_changes_fingerprint(self):
        mutated = copy.deepcopy(SNAP)
        mutated["current_hhg_roster"]["coverage"] = "ACQUIRED"
        self.assertNotEqual(fingerprint(mutated), SNAP["fingerprint"])


if __name__ == "__main__":
    unittest.main()
