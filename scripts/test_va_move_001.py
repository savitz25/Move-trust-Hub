"""VA-MOVE-001A parser, fingerprint, and grain tests."""
from __future__ import annotations

import copy
import hashlib
import json
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SNAP = json.loads((ROOT / "lib/virginia-intelligence/accepted-snapshot.json").read_text(encoding="utf-8"))
ACQ = json.loads((ROOT / "data/virginia/va-move-001/acquire-report.json").read_text(encoding="utf-8"))
HHG_RECORDS = json.loads((ROOT / "data/virginia/va-move-001/hhg-records.json").read_text(encoding="utf-8"))
PROP_RECORDS = json.loads((ROOT / "data/virginia/va-move-001/property-records.json").read_text(encoding="utf-8"))
OLD_FINGERPRINT = "6cfd8c7bf05b7c7f8dc3dcfca6d03437fc68a57b8751dfc30dee71895f19fb22"
FINGERPRINT = "dfe6091caa29d71d5f045734346861af8c69ae3c2eed06ca37c7cf717425eca9"
sys.path.insert(0, str(ROOT / "scripts" / "virginia"))
from acquire_va_move_001 import authority_id_stats  # noqa: E402


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
        from acquire_va_move_001 import parse_rows
        rows = parse_rows(html, "Household goods carrier")
        self.assertEqual(rows[0]["source_displayed_authority_number"], "628")
        self.assertEqual(rows[0]["source_carrier_type"], "Household goods carrier")
        with self.assertRaises(SystemExit):
            parse_rows(html, "Property carrier")


class IdentityCountTests(unittest.TestCase):
    def test_blank_identifier_is_excluded_from_distinct_count(self):
        stats = authority_id_stats(
            [
                {"name": "A", "source_displayed_authority_number": "1"},
                {"name": "BLANK", "source_displayed_authority_number": ""},
                {"name": "SPACE", "source_displayed_authority_number": "   "},
            ]
        )
        self.assertEqual(stats["null_identifiers"], 2)
        self.assertEqual(stats["non_null_authority_rows"], 1)
        self.assertEqual(stats["distinct_non_null_authority_numbers"], 1)
        self.assertEqual(stats["distinct_authority_numbers"], 1)
        self.assertNotIn("", stats["duplicate_non_null_authority_numbers"])

    def test_duplicate_1276_counts_once_and_is_ambiguous(self):
        stats = authority_id_stats(
            [
                {"name": "MARK L & KATHY A ROSE", "source_displayed_authority_number": "1276"},
                {"name": "TROY G LEWIS", "source_displayed_authority_number": "1276"},
                {"name": "OTHER", "source_displayed_authority_number": "3603"},
            ]
        )
        self.assertEqual(stats["non_null_authority_rows"], 3)
        self.assertEqual(stats["distinct_non_null_authority_numbers"], 2)
        self.assertEqual(stats["duplicate_non_null_authority_numbers"], ["1276"])
        conflict = stats["source_identifier_conflicts"][0]
        self.assertEqual(conflict["source_displayed_authority_number"], "1276")
        self.assertEqual(conflict["listing_rows"], 2)
        self.assertEqual(conflict["status"], "SOURCE_IDENTIFIER_CONFLICT")
        self.assertFalse(conflict["unique_carrier"])
        self.assertTrue(conflict["canonical_organization_forbidden"])

    def test_accepted_records_recompute_property_and_hhg_grains(self):
        hhg_stats = authority_id_stats(HHG_RECORDS)
        prop_stats = authority_id_stats(PROP_RECORDS)
        self.assertEqual(len(HHG_RECORDS), 192)
        self.assertEqual(hhg_stats["null_identifiers"], 0)
        self.assertEqual(hhg_stats["non_null_authority_rows"], 192)
        self.assertEqual(hhg_stats["distinct_non_null_authority_numbers"], 192)
        self.assertEqual(len(PROP_RECORDS), 4916)
        self.assertEqual(prop_stats["null_identifiers"], 1)
        self.assertEqual(prop_stats["non_null_authority_rows"], 4915)
        self.assertEqual(prop_stats["distinct_non_null_authority_numbers"], 4914)
        self.assertEqual(prop_stats["duplicate_non_null_authority_numbers"], ["1276"])
        blank = [r for r in PROP_RECORDS if not (r.get("source_displayed_authority_number") or "").strip()]
        self.assertEqual(len(blank), 1)
        self.assertEqual(blank[0]["name"], "JD'S TRUCKING LLC")
        dups = [r for r in PROP_RECORDS if (r.get("source_displayed_authority_number") or "").strip() == "1276"]
        self.assertEqual(len(dups), 2)
        self.assertEqual({r["name"] for r in dups}, {"MARK L & KATHY A ROSE", "TROY G LEWIS"})
        hhg_labels = {(r.get("name") or "").strip() for r in HHG_RECORDS if (r.get("name") or "").strip()}
        self.assertEqual(len(hhg_labels), 192)

    def test_blank_row_cannot_produce_va_dmv_prop_identity(self):
        from acquire_va_move_001 import virginia_move_identity  # type: ignore
        self.assertIsNone(virginia_move_identity("PROP", ""))
        self.assertIsNone(virginia_move_identity("PROP", "   "))
        self.assertEqual(virginia_move_identity("PROP", "3603"), "VA-DMV-PROP:3603")
        self.assertEqual(virginia_move_identity("PROP", "1276"), "VA-DMV-PROP:1276")


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
        self.assertEqual(SNAP["hhg_roster"]["distinct_non_null_authority_numbers"], 192)
        self.assertEqual(SNAP["hhg_roster"]["null_identifiers"], 0)
        self.assertEqual(SNAP["hhg_roster"]["distinct_labels"], 192)
        self.assertEqual(SNAP["property_roster"]["grain"], "authorized_listing_row")
        self.assertEqual(SNAP["property_roster"]["identity_grain"], "distinct_non_null_authority_number")
        self.assertNotEqual(SNAP["property_roster"]["grain"], SNAP["property_roster"]["identity_grain"])
        self.assertEqual(SNAP["property_roster"]["rows"], 4916)
        self.assertEqual(SNAP["property_roster"]["non_null_authority_rows"], 4915)
        self.assertEqual(SNAP["property_roster"]["distinct_non_null_authority_numbers"], 4914)
        self.assertEqual(SNAP["property_roster"]["null_identifiers"], 1)
        self.assertEqual(SNAP["expansion_ledger"]["NEW_VA_HHG_AUTHORITY_IDENTITIES"], 192)
        self.assertEqual(SNAP["expansion_ledger"]["NEW_VA_PROPERTY_AUTHORITY_IDENTITIES"], 4914)
        self.assertEqual(SNAP["expansion_ledger"]["NEW_VA_STATE_IDENTITIES"], 5106)
        self.assertEqual(SNAP["expansion_ledger"]["NEW_STATE_CREDENTIAL_ROWS"], 5108)
        self.assertEqual(SNAP["expansion_ledger"]["identity_grain"], "distinct_non_null_authority_number")
        self.assertEqual(SNAP["expansion_ledger"]["credential_row_grain"], "authorized_listing_row")
        self.assertNotEqual(
            SNAP["expansion_ledger"]["identity_grain"],
            SNAP["expansion_ledger"]["credential_row_grain"],
        )
        self.assertTrue(SNAP["expansion_ledger"]["credential_rows_are_not_authority_identities"])
        self.assertEqual(
            SNAP["expansion_ledger"]["NEW_VA_STATE_IDENTITIES"],
            SNAP["hhg_roster"]["distinct_non_null_authority_numbers"]
            + SNAP["property_roster"]["distinct_non_null_authority_numbers"],
        )
        self.assertEqual(
            SNAP["expansion_ledger"]["NEW_STATE_CREDENTIAL_ROWS"],
            SNAP["hhg_roster"]["rows"] + SNAP["property_roster"]["rows"],
        )
        self.assertEqual(SNAP["identity"]["property_1276_status"], "SOURCE_IDENTIFIER_CONFLICT")
        self.assertTrue(SNAP["identity"]["property_1276_does_not_resolve_unique_carrier"])
        self.assertTrue(SNAP["identity"]["blank_authority_is_not_state_identity"])
        self.assertEqual(SNAP["expansion_ledger"]["NET_NEW_CANONICAL_ORGANIZATIONS"], 0)
        self.assertEqual(SNAP["expansion_ledger"]["NET_NEW_PUBLIC_MOVE_PROFILES"], 0)
        self.assertEqual(SNAP["expansion_ledger"]["EXISTING_ORGANIZATIONS_ENRICHED"], 0)
        self.assertEqual(SNAP["expansion_ledger"]["EXACT_STATE_TO_FEDERAL_CROSSWALKS"], 0)
        self.assertEqual(SNAP["expansion_ledger"]["EXACT_PROFILE_ATTACHMENTS"], 0)
        self.assertEqual(SNAP["federal"]["exact_federal_crosswalk"], "NOT_AVAILABLE_FROM_STATE_LISTING")

    def test_fingerprint(self):
        self.assertNotEqual(FINGERPRINT, OLD_FINGERPRINT)
        self.assertNotEqual(SNAP["fingerprint"], OLD_FINGERPRINT)
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
        mutated8 = copy.deepcopy(SNAP)
        mutated8["expansion_ledger"]["NEW_VA_PROPERTY_AUTHORITY_IDENTITIES"] = 4915
        self.assertNotEqual(fingerprint(mutated8), FINGERPRINT)


if __name__ == "__main__":
    unittest.main()
