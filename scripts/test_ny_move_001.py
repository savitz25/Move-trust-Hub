"""NY-MOVE-001A2 fingerprint, clock, and frozen-grain tests."""
from __future__ import annotations

import copy
import hashlib
import json
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SNAP = json.loads((ROOT / "lib/new-york-intelligence/accepted-snapshot.json").read_text(encoding="utf-8"))
CENSUS = json.loads((ROOT / "data/new-york/ny-move-001/ny-move-census.json").read_text(encoding="utf-8"))
PUB = (ROOT / "lib/new-york-intelligence/publication.ts").read_text(encoding="utf-8")
OLD_FINGERPRINT = "41ea8c6ce56b578e21efad51046248012cc7482f23ed2af8865fad753fefa4f6"
INVENTED_RETRIEVAL_INSTANT = "2026-09-11T18:00:00Z"
VOLATILE = {"fingerprint", "generated_at"}


def dump(obj: object) -> str:
    return json.dumps(obj, sort_keys=True, separators=(",", ":"), ensure_ascii=True)


def fingerprint(body: dict) -> str:
    return hashlib.sha256(dump({k: v for k, v in body.items() if k not in VOLATILE}).encode("utf-8")).hexdigest()


class NyMoveFingerprintTests(unittest.TestCase):
    def test_frozen_counts(self):
        self.assertEqual(SNAP["bulletin_2026"]["issues"], 36)
        self.assertEqual(SNAP["bulletin_2026"]["hhgApplicationObservations"], 108)
        self.assertEqual(SNAP["bulletin_2026"]["distinctCaseNumbers"], 103)
        self.assertEqual(SNAP["bulletin_2026"]["applicationTypes"]["New Service"], 101)
        self.assertEqual(SNAP["bulletin_2026"]["applicationTypes"]["Transfer"], 3)
        self.assertEqual(SNAP["bulletin_2026"]["applicationTypes"]["Extension"], 1)
        self.assertEqual(SNAP["bulletin_2026"]["applicationTypes"]["Partial Transfer of Authority"], 1)
        self.assertEqual(SNAP["bulletin_2026"]["applicationTypes"]["Name Change"], 1)
        self.assertEqual(SNAP["bulletin_2026"]["applicationTypes"]["UNKNOWN"], 1)
        self.assertIsNone(SNAP["current_hhg_roster"]["rows"])
        self.assertIsNone(SNAP["current_hhg_roster"]["distinctAuthorityIds"])
        self.assertIsNone(SNAP["complaints"]["NY_HHG_COMPLAINT_ROWS"])
        self.assertEqual(SNAP["expansion_ledger"]["NET_NEW_CANONICAL_ORGANIZATIONS"], 0)
        self.assertEqual(SNAP["expansion_ledger"]["NET_NEW_PUBLIC_MOVE_PROFILES"], 0)
        self.assertEqual(SNAP["expansion_ledger"]["EXISTING_ORGANIZATIONS_ENRICHED"], 0)
        self.assertEqual(SNAP["expansion_ledger"]["EXACT_PROFILE_ATTACHMENTS"], 0)
        self.assertEqual(SNAP["expansion_ledger"]["GRAPH_WRITES"], 0)
        self.assertEqual(SNAP["federal"]["exact_state_to_federal_crosswalks"], 0)
        self.assertEqual(CENSUS["issuesAcquired"], 36)
        self.assertEqual(CENSUS["hhgObservationCount"], 108)
        self.assertEqual(CENSUS["distinctCaseNumbers"], 103)

    def test_clocks_are_not_invented_instants(self):
        self.assertNotEqual(SNAP["retrievedAt"], INVENTED_RETRIEVAL_INSTANT)
        self.assertNotEqual(SNAP["generated_at"], INVENTED_RETRIEVAL_INSTANT)
        self.assertNotEqual(SNAP["bulletin_2026"]["retrievedAt"], INVENTED_RETRIEVAL_INSTANT)
        self.assertEqual(SNAP["retrievedAt"], CENSUS["retrievedAt"])
        self.assertEqual(SNAP["bulletin_2026"]["retrievedAt"], CENSUS["retrievedAt"])
        self.assertEqual(CENSUS["retrievedAt"], "2026-09-11")
        self.assertEqual(CENSUS["retrievedAtPrecision"], "date")
        self.assertIs(CENSUS["retrievedAtExactUnknown"], True)
        self.assertIsNone(SNAP["as_of"])
        self.assertEqual(SNAP["bulletin_2026"]["windowStart"], "2026-01-07")
        self.assertEqual(SNAP["bulletin_2026"]["windowEnd"], "2026-09-09")
        self.assertEqual(SNAP["bulletin_2026"]["sourceAsOf"], "2026-09-09")

    def test_fingerprint_twice(self):
        first = fingerprint(SNAP)
        second = fingerprint(copy.deepcopy(SNAP))
        self.assertEqual(first, second)
        self.assertEqual(first, SNAP["fingerprint"])
        self.assertNotEqual(first, OLD_FINGERPRINT)
        self.assertIn(SNAP["fingerprint"], PUB)

    def test_generated_at_is_volatile(self):
        mutated = copy.deepcopy(SNAP)
        mutated["generated_at"] = "2099-01-01T00:00:00+00:00"
        self.assertEqual(fingerprint(mutated), SNAP["fingerprint"])

    def test_nested_count_mutation_changes_fingerprint(self):
        mutated = copy.deepcopy(SNAP)
        mutated["bulletin_2026"]["hhgApplicationObservations"] = 109
        self.assertNotEqual(fingerprint(mutated), SNAP["fingerprint"])


if __name__ == "__main__":
    unittest.main()
