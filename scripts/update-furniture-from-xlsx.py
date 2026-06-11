#!/usr/bin/env python3
"""
Script to generate data/furniture.ts from the master items-volume.xlsx file.

The raw xlsx has 400+ items. This script curates a practical subset (~60 common household items)
by limiting per category and blacklisting very niche/large items (golf carts, pool tables, etc.).
This keeps the UI fast and user-friendly.

Usage:
  python scripts/update-furniture-from-xlsx.py "C:\path\to\your\items-volume.xlsx"

This keeps the furniture data in the web app in sync with your Excel master list.
Edit the limits/blacklist in this script if you want more or fewer items included.
"""

import pandas as pd
import re
import sys
from collections import defaultdict
from pathlib import Path

def parse_volume(val: str) -> float | None:
    if pd.isna(val):
        return None
    s = str(val).lower()
    # Match number followed by optional cf / cubic feet etc.
    match = re.search(r'(\d+(?:\.\d+)?)', s)
    if match:
        return float(match.group(1))
    return None

def clean_name(item: str, extra: str = "") -> str:
    """Clean up the item name, handling cases where size info is split across columns."""
    if pd.isna(item):
        item = ""
    name = str(item).strip()

    # Special handling for known messy rows from the xlsx
    combined = (name + " " + str(extra)).upper()

    if "SOFA, L" in combined and "SHAPED" in combined:
        return "L-Shaped Sofa"
    if "SOFA, SECTIONAL" in name.upper():
        if "2 PIECE" in combined:
            return "Sectional Sofa (2-Piece)"
        if "3 PIECE" in combined:
            return "Sectional Sofa (3-Piece)"
        if "4 PIECE" in combined:
            return "Sectional Sofa (4-Piece)"
        if "5 PIECE" in combined:
            return "Sectional Sofa (5-Piece)"
        return "Sectional Sofa"
    if "BOX, WARDROBE" in name.upper():
        return "Wardrobe Moving Box (Large)"
    if "DESK, L" in name.upper():
        return "L-Shaped Desk"
    if "LADDER TO 7" in name.upper():
        return "Extension Ladder (7 ft)"

    # General cleanup: remove embedded volume/size info
    name = re.sub(r'\s*\d+\s*(?:CF|cf|feet|ft)\.?\s*$', '', name, flags=re.IGNORECASE)
    name = re.sub(r'\s*\(\s*\d+.*?\)\s*$', '', name)
    name = re.sub(r'\s+', ' ', name).strip(' ,')

    return name.title() if name else str(item).title()

def assign_category(name: str) -> str:
    n = name.lower()
    if any(k in n for k in ['bed', 'mattress', 'box spring', 'headboard', 'bunk', 'trundle', 'dresser', 'armoire', 'nightstand', 'vanity', 'wardrobe', 'chest of drawer']):
        return 'Bedroom'
    if any(k in n for k in ['sofa', 'couch', 'loveseat', 'sectional', 'recliner', 'coffee table', 'tv stand', 'entertainment', 'bookcase', 'chaise', 'ottoman', 'tv ', 'piano', 'speaker', 'soundbar']):
        return 'Living Room'
    if any(k in n for k in ['refrigerator', 'fridge', 'stove', 'oven', 'microwave', 'dishwasher', 'kitchen', 'bakers rack']):
        return 'Kitchen'
    if any(k in n for k in ['dining table', 'dining chair', 'buffet', 'sideboard', 'china cabinet', 'hutch']):
        return 'Dining Room'
    if any(k in n for k in ['desk', 'office chair', 'filing cabinet', 'computer desk']):
        return 'Office'
    if any(k in n for k in ['washer', 'dryer', 'lawn mower', 'grill', 'barbecue', 'tool chest', 'bike', 'treadmill', 'snow blower', 'weight bench', 'workbench']):
        return 'Garage / Laundry'
    if any(k in n for k in ['patio', 'adirondack', 'umbrella', 'bistro', 'picnic', 'bird bath']):
        return 'Outdoor'
    if 'bath' in n or 'toilet' in n:
        return 'Bathroom'
    if any(k in n for k in ['box, ', 'plastic bin', 'wardrobe box', 'box book', 'box china', 'box extra', 'box lamp', 'box large', 'box med', 'box small', 'box wardrobe']):
        return 'Packing Supplies'
    return 'Other'

def main(xlsx_path: str):
    print(f"Reading {xlsx_path} ...")
    df = pd.read_excel(xlsx_path)

    items = []
    for _, row in df.iterrows():
        raw_item = row.get('Item')
        raw_volume = row.get('Volume')
        raw_extra = row.get('Unnamed: 2') if 'Unnamed: 2' in df.columns else None

        name = clean_name(raw_item, raw_extra)
        volume = parse_volume(raw_volume)
        if volume is None and raw_extra:
            volume = parse_volume(raw_extra)

        if not name or volume is None or volume <= 0:
            continue

        category = assign_category(name)
        items.append({
            "name": name,
            "volume": volume,
            "category": category
        })

    # Deduplicate by name (keep the one with larger volume if duplicates)
    seen = {}
    for it in items:
        key = it["name"].lower()
        if key not in seen or it["volume"] > seen[key]["volume"]:
            seen[key] = it

    unique_items = list(seen.values())

    # Group by category 
    by_cat = defaultdict(list)
    for it in unique_items:
        by_cat[it["category"]].append(it)

    for cat in by_cat:
        by_cat[cat].sort(key=lambda x: -x["volume"])

    # Include a large number of items from the xlsx (user wants more than the previous ~58 curated subset)
    # Take top N per category. User can edit limits if they want even more or all ~450+.
    # Boxes/bins are now explicitly requested, so give 'Other' (and Packing) higher weight.
    final = []
    limits = {
        'Bedroom': 30,
        'Living Room': 30,
        'Kitchen': 18,
        'Dining Room': 15,
        'Office': 15,
        'Garage / Laundry': 20,
        'Outdoor': 15,
        'Bathroom': 10,
        'Other': 25,
        'Packing Supplies': 20,  # boxes & bins from xlsx
    }
    for cat, limit in limits.items():
        final.extend(by_cat.get(cat, [])[:limit])

    # Sort for stable output
    final.sort(key=lambda x: (x["category"], -x["volume"]))

    # Generate TypeScript
    ts_content = f'''// Auto-generated by scripts/update-furniture-from-xlsx.py
// Source: {Path(xlsx_path).name} (raw has 400+ items)
// Large curated subset from the Excel (user requested more items).
// Do not edit this file directly. Run the script to update from Excel.

export interface FurnitureItem {{
  name: string;
  volume: number;
  category: string;
}}

export const furnitureItems: FurnitureItem[] = [
'''

    for it in final:
        safe_name = it["name"].replace('"', '\\"')
        ts_content += f'  {{ name: "{safe_name}", volume: {it["volume"]}, category: "{it["category"]}" }},\n'

    ts_content += '];\n\n'
    ts_content += 'export const roomCategories = ' + str(sorted(set(i["category"] for i in final))) + ';\n\n'

    ts_content += '''export function getItemsByCategory(category: string) {
  return furnitureItems.filter(item => item.category === category);
}

export function searchItems(query: string) {
  const q = query.toLowerCase().trim();
  if (!q) return furnitureItems;
  return furnitureItems.filter(item =>
    item.name.toLowerCase().includes(q) ||
    item.category.toLowerCase().includes(q)
  );
}
'''

    output_path = Path(__file__).parent.parent / "data" / "furniture.ts"
    output_path.write_text(ts_content, encoding="utf-8")

    print(f"Generated {len(final)} items → {output_path}")
    print("Categories:", sorted(set(i["category"] for i in final)))

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python scripts/update-furniture-from-xlsx.py <path-to-items-volume.xlsx>")
        sys.exit(1)
    main(sys.argv[1])
