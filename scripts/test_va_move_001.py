"""VA-MOVE-001A parser, fingerprint, and grain tests."""
from __future__ import annotations

import copy
import hashlib
import json
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SNAP = json.loads((ROOT / "lib/virginia-intelligence/accepted-snapshot.json").read_text(encoding="utf-8"))
ACQ = json.loads((ROOT / "data/virginia/va-move-001/acquire-report.json").read_text(encoding="utf-8"))
FINGERPRINT = "6cfd8c7bf05b7c7f8dc3dcfca6d03437fc68a57b8751dfc30dee71895f19fb22"


def dump(obj: object) -> str:
    return json.dumps(obj, sort_keys=True, separators=(",", ":"), ensure_ascii=True)


def fingerprint(body: dict) -> str:
    skip = {"fingerprint", "generated_at"}
    return hashlib.sha256(dump({k: v for k, v in body.items() if k not in skip}).encode("utf-8")).hexdigest()


class AcquisitionTests(unittest.TestCase):
    def test_completeness_and_filters(self):
        self.assertEqual(ACQ["household_goods_carrier"]["pages_traversed"], 8)
        self.assertEqual(ACQ["household_goods_carrier"]["rows"], 192)
        self.assertEqual(ACQ["household_goods_carrier"]["page_log"][0]["rows"], 25)
        self.assertLess(ACQ["household_goods_carrier"]["page_log"][-1]["rows"], 25)
        self.assertEqual(ACQ["property_carrier"]["pages_traversed"], 197)
        self.assertEqual(ACQ["property_carrier"]["rows"], 4916)
        self.assertEqual(ACQ["no_authority_bruteforce"], True)
        self.assertIsNone(ACQ["sourceAsOf"])
        self.assertTrue(ACQ["applications"]["not_added_to_authorized_roster"])

    def test_parser_fixture_extracts_type_and_number(self):
        html = """
        <td class="views-field views-field-field-contact-information">1-800-PACK-RAT, LLC<br /><br />WAKE FOREST, NC 27587<br />(919) 488-3636</td>
        <td class="views-field views-field-field-locality">WAKE FOREST</td>
        <td class="views-field views-field-field-ct-permit-number">Household goods carrier<br />628</td>
        """
        import sys
        sys.path.insert(0, str(ROOT / "scripts" / "virginia"))
        from acquire_va_move_001 import parse_rows
        rows = parse_rows(html, "Household goods carrier")
        self.assertEqual(rows[0]["source_displayed_authority_number"], "628")
        self.assertEqual(rows[0]["source_carrier_type"], "Household goods carrier")
        with self.assertRaises(SystemExit):
            parse_rows(html, "Property carrier")


class SemanticTests(unittest.TestCase):
    def test_grains(self):
        self.assertEqual(SNAP["authority_classes"]["HOUSEHOLD_GOODS_CERTIFICATE"]["grain"], "household_goods_carrier_certificate")
        self.assertEqual(SNAP["authority_classes"]["PROPERTY_CARRIER_PERMIT"]["grain"], "property_carrier_permit")
        self.assertNotEqual(SNAP["authority_classes"]["HOUSEHOLD_GOODS_CERTIFICATE"]["grain"], SNAP["authority_classes"]["PROPERTY_CARRIER_PERMIT"]["grain"])
        self.assertTrue(SNAP["property_roster"]["not_called_movers"])
        self.assertTrue(SNAP["distance_rule"]["do_not_collapse_30_and_less_than_31_into_one_invented_rule"])
        self.assertEqual(SNAP["federal"]["name_only"], "UNSAFE")
        self.assertTrue(SNAP["applications"]["applicant_ne_authorized_carrier"])
        self.assertEqual(SNAP["hhg_roster"]["rows"], 192)
        self.assertEqual(SNAP["property_roster"]["rows"], 4916)

    def test_fingerprint(self):
        self.assertEqual(SNAP["fingerprint"], FINGERPRINT)
        self.assertEqual(fingerprint(SNAP), FINGERPRINT)
        self.assertEqual(fingerprint(copy.deepcopy(SNAP)), FINGERPRINT)
        mutated = copy.deepcopy(SNAP)
        mutated["hhg_roster"]["rows"] += 1
        self.assertNotEqual(fingerprint(mutated), FINGERPRINT)
        mutated2 = copy.deepcopy(SNAP)
        mutated2["property_roster"]["rows"] += 1
        self.assertNotEqual(fingerprint(mutated2), FINGERPRINT)
        mutated3 = copy.deepcopy(SNAP)
        mutated3["distance_rule"]["over_30_miles_relevant"] = "PROPERTY"
        self.assertNotEqual(fingerprint(mutated3), FINGERPRINT)
        mutated4 = copy.deepcopy(SNAP)
        mutated4["hhg_roster"]["status"] = "SOURCE_NOT_ACQUIRED"
        self.assertNotEqual(fingerprint(mutated4), FINGERPRINT)
        mutated5 = copy.deepcopy(SNAP)
        mutated5["identity"]["hhg_namespace"] = "NAME"
        self.assertNotEqual(fingerprint(mutated5), FINGERPRINT)
        mutated6 = copy.deepcopy(SNAP)
        mutated6["federal"]["name_only"] = "EXACT"
        self.assertNotEqual(fingerprint(mutated6), FINGERPRINT)
        mutated7 = copy.deepcopy(SNAP)
        mutated7["authority_classes"]["HOUSEHOLD_GOODS_CERTIFICATE"]["legal_authority_document"] = "Permit"
        self.assertNotEqual(fingerprint(mutated7), FINGERPRINT)


if __name__ == "__main__":
    unittest.main()
