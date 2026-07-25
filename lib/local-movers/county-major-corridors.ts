/**
 * Factual major roads/routes for County Moving Snapshot "Major corridors".
 * Roads only — never operational commentary (HOA density, tourism calendars, curb staging).
 * Covers all shipped Tier-1 intelligence packs (CA, FL, TX, GA, NY, AZ, NJ, SC).
 */

const CORRIDORS: Record<string, string> = {
  // ——— California ———
  'california/los-angeles':
    'I-405 · I-10 · I-5 · US-101 · I-110 · CA-1 (PCH)',
  'california/orange': 'I-5 · I-405 · CA-55 · CA-91 · CA-22 · Pacific Coast Hwy',
  'california/san-diego': 'I-5 · I-15 · I-8 · I-805 · CA-52 · CA-163',
  'california/santa-clara': 'US-101 · I-280 · CA-85 · CA-17 · CA-237 · I-680',
  'california/alameda': 'I-880 · I-580 · I-80 · I-680 · SR-24 · SR-13',
  'california/riverside': 'I-15 · I-215 · CA-91 · CA-60 · I-10',
  'california/san-bernardino': 'I-10 · I-15 · I-215 · CA-210 · CA-60',
  'california/sacramento': 'I-5 · I-80 · US-50 · CA-99 · Business 80',
  'california/contra-costa': 'I-680 · CA-4 · CA-24 · I-80 · CA-242',
  'california/san-francisco':
    'US-101 · I-280 · I-80 · Bay Bridge approaches · 19th Avenue / Park Presidio',
  'california/san-mateo': 'US-101 · I-280 · CA-92 · CA-1 · CA-84',
  'california/ventura': 'US-101 · CA-1 · CA-118 · CA-23 · CA-126',
  'california/fresno': 'CA-99 · CA-41 · CA-180 · CA-168 · I-5 (west approach)',
  'california/kern': 'CA-99 · CA-58 · I-5 · CA-178 · CA-119',
  'california/san-joaquin': 'I-5 · CA-99 · I-205 · CA-4 · CA-120',
  'california/sonoma': 'US-101 · CA-12 · CA-116 · CA-121 · CA-1',
  'california/placer': 'I-80 · CA-65 · CA-49 · I-80 Donner approaches',
  'california/santa-barbara': 'US-101 · CA-154 · CA-1 · CA-246',
  'california/monterey': 'CA-1 · CA-68 · US-101 · CA-156 · CA-183',
  // CA Tier 2 Wave 2
  'california/tulare': 'CA-99 · CA-198 · CA-63 · CA-65 · CA-190',
  'california/santa-cruz': 'CA-1 · CA-17 · CA-9 · CA-129 · CA-152 approaches',
  'california/marin': 'US-101 · CA-1 · Sir Francis Drake · CA-37 · Golden Gate approaches',
  'california/yolo': 'I-80 · I-5 · US-50 approaches · CA-113 · CA-16',
  'california/el-dorado': 'US-50 · CA-49 · I-80 approaches · CA-193',
  'california/butte': 'CA-99 · CA-32 · CA-70 · CA-162',
  'california/napa': 'CA-29 · CA-12 · CA-121 · CA-128 · Silverado Trail',
  'california/merced': 'CA-99 · CA-140 · CA-59 · CA-152 · CA-165',
  'california/shasta': 'I-5 · CA-44 · CA-299 · CA-273 · CA-89 approaches',
  'california/imperial': 'I-8 · CA-86 · CA-111 · CA-98 · CA-78',
  'california/humboldt': 'US-101 · CA-299 · CA-36 · CA-255 · local coastal arterials',
  'california/madera': 'CA-99 · CA-145 · CA-41 · CA-152 · CA-233',

  // ——— Florida ———
  'florida/miami-dade': 'I-95 · I-75 · Florida Turnpike · US-1 · Dolphin Expressway (FL-836)',
  'florida/broward': 'I-95 · Florida Turnpike · I-595 · US-1 · Sawgrass Expressway (FL-869)',
  'florida/palm-beach': 'I-95 · Florida Turnpike · US-1 · PGA Boulevard · Glades Road',
  'florida/hillsborough': 'I-275 · I-4 · I-75 · US-41 · Selmon Expressway',
  'florida/orange': 'I-4 · FL-408 · FL-417 · US-17/92 · International Drive',
  'florida/pinellas': 'I-275 · US-19 · Courtney Campbell Causeway · Gandy Bridge · FL-60',
  'florida/duval': 'I-95 · I-10 · I-295 · US-1 · FL-9A (JTB)',
  'florida/lee': 'I-75 · US-41 · Summerlin Road · Colonial Boulevard · Sanibel Causeway approaches',
  'florida/polk': 'I-4 · US-27 · US-98 · Florida Turnpike · FL-570 (Polk Pkwy)',
  'florida/brevard': 'I-95 · US-1 · FL-528 · A1A · FL-520',
  'florida/pasco': 'I-75 · US-19 · FL-54 · FL-52 · Suncoast Parkway (FL-589)',
  'florida/volusia': 'I-4 · I-95 · US-1 · FL-40 · A1A',
  // Florida Tier 2 Wave 1 additions
  'florida/manatee': 'I-75 · US-41 · US-301 · FL-64 · Anna Maria approaches',
  'florida/collier': 'I-75 · US-41 · CR-951 · Immokalee Rd · Marco Island approaches',
  'florida/seminole': 'I-4 · US-17/92 · FL-417 · FL-436 · FL-46',
  'florida/osceola': 'I-4 · FL-417 · US-192 · Florida Turnpike · neoCity corridors',
  'florida/lake': 'US-27 · Florida Turnpike · FL-50 · FL-19 · FL-44',
  'florida/st-lucie': 'I-95 · Florida Turnpike · US-1 · FL-70 · A1A approaches',
  'florida/marion': 'I-75 · US-27 · US-301 · US-441 · FL-40',
  'florida/escambia': 'I-10 · I-110 · US-98 · US-29 · Pensacola Beach approaches',
  // Florida Tier 2 Wave 2
  'florida/charlotte': 'I-75 · US-41 · FL-776 · Peace River / harbor approaches · local arterial grid',
  'florida/hernando': 'US-19 · Suncoast Parkway (FL-589) · FL-50 · I-75 (east approach) · local Spring Hill grid',
  'florida/citrus': 'US-19 · US-41 · FL-44 · FL-486 · local Nature Coast grid',
  'florida/indian-river': 'I-95 · US-1 · FL-60 · A1A · local Vero Beach grid',
  'florida/martin': 'I-95 · Florida Turnpike · US-1 · A1A · local Stuart grid',
  'florida/st-johns': 'I-95 · US-1 · FL-16 · A1A · Nocatee Parkway approaches',
  'florida/clay': 'US-17 · Blanding Blvd · FL-21 · I-295 approaches · local Orange Park grid',
  'florida/nassau': 'I-95 · A1A · US-17 · FL-200 · Amelia Island approaches',
  'florida/alachua': 'I-75 · US-441 · FL-24 · FL-26 · local Gainesville grid',
  'florida/leon': 'I-10 · US-27 · US-90 · Capital Circle · local Tallahassee grid',
  'florida/bay': 'US-98 · US-231 · FL-79 · FL-77 · Panama City Beach approaches',
  'florida/okaloosa': 'US-98 · FL-85 · FL-293 · I-10 (north approach) · Destin approaches',
  'florida/santa-rosa': 'I-10 · US-90 · FL-87 · FL-281 · Gulf Breeze approaches',
  'florida/flagler': 'I-95 · US-1 · FL-100 · A1A · local Palm Coast grid',
  'florida/sumter': 'I-75 · Florida Turnpike · US-301 · FL-44 · The Villages arterial grid',

  // ——— Texas ———
  'texas/harris': 'I-10 · I-45 · I-69/US-59 · Beltway 8 · Sam Houston Tollway · Hardy Toll Road',
  'texas/dallas': 'I-35E · I-30 · I-635 · Dallas North Tollway · PGBT',
  'texas/tarrant': 'I-30 · I-35W · I-820 · SH-183 · SH-121 · Chisholm Trail Pkwy',
  'texas/bexar': 'I-10 · I-35 · I-37 · Loop 1604 · US-281 · Loop 410',
  'texas/travis': 'I-35 · US-183 · SH-45 · SH-130 · MoPac (Loop 1) · US-290',
  'texas/collin': 'US-75 · PGBT · Dallas North Tollway · SH-121 · US-380',
  'texas/denton': 'I-35E · I-35W · US-380 · Loop 288 · Sam Rayburn Tollway',
  'texas/fort-bend': 'US-59/I-69 · Grand Parkway (SH-99) · Westpark Tollway · US-90A · SH-6',
  'texas/montgomery': 'I-45 · SH-99 · FM-1488 · SH-242 · US-59 (south approach)',
  'texas/williamson': 'I-35 · SH-130 · US-183 · SH-45 · RM-620',
  'texas/el-paso': 'I-10 · US-54 · Loop 375 · I-110 · Mesa Street corridor',
  'texas/hidalgo': 'US-83 · I-2 · I-69C · US-281 · SH-107',
  // Texas Tier 2 Wave 1 additions
  'texas/galveston': 'I-45 · SH-87 · SH-146 · Broadway / Seawall approaches · local island grid',
  'texas/brazoria': 'SH-288 · SH-35 · SH-6 · FM-518 · local Pearland grid',
  'texas/hays': 'I-35 · SH-21 · SH-80 · FM-1626 · local San Marcos grid',
  'texas/nueces': 'I-37 · SH-358 · US-181 · SH-44 · Padre Island approaches',
  'texas/bell': 'I-35 · I-14 · US-190 · SH-36 · local Killeen–Temple grid',
  // TX Tier 2 Wave 2
  'texas/comal': 'I-35 · SH-46 · FM-306 · Loop 337 · local New Braunfels grid',
  'texas/guadalupe': 'I-10 · SH-130 · US-90 · SH-123 · local Schertz–Cibolo grid',
  'texas/parker': 'I-20 · US-180 · SH-171 · FM-5 · local Weatherford grid',
  'texas/johnson': 'I-35W · US-67 · SH-174 · SH-171 · local Cleburne–Burleson grid',
  'texas/ellis': 'I-35E · US-287 · US-77 · SH-34 · local Waxahachie grid',
  'texas/kaufman': 'I-20 · US-175 · US-80 · SH-34 · local Forney–Terrell grid',
  'texas/brazos': 'SH-6 · US-190 · FM-2818 · SH-21 · local Bryan–College Station grid',
  'texas/lubbock': 'I-27 · US-82 · US-84 · Loop 289 · local Lubbock grid',
  'texas/mclennan': 'I-35 · US-84 · SH-6 · Loop 340 · local Waco grid',
  'texas/jefferson': 'I-10 · US-69 · US-96 · SH-73 · local Beaumont–Port Arthur grid',
  'texas/smith': 'I-20 · US-69 · Loop 323 · SH-31 · local Tyler grid',
  'texas/cameron': 'I-69E · US-77 · US-83 · SH-48 · local Brownsville–Harlingen grid',
  'texas/webb': 'I-35 · US-59 · Loop 20 · SH-359 · local Laredo grid',
  'texas/midland': 'I-20 · SH-349 · Loop 250 · SH-158 · local Midland grid',
  'texas/ector': 'I-20 · US-385 · Loop 338 · SH-191 · local Odessa grid',

  // ——— Georgia ———
  'georgia/fulton': 'I-75/85 Connector · I-285 · GA-400 · I-20',
  'georgia/gwinnett': 'I-85 · I-985 · GA-316 · US-78 · Sugarloaf Pkwy',
  'georgia/cobb': 'I-75 · I-285 · US-41 · GA-120 · East-West Connector',
  'georgia/dekalb': 'I-285 · I-20 · US-78 · Clairmont Road · Buford Highway',
  'georgia/chatham': 'I-16 · I-95 · US-17 · US-80 · Truman Pkwy',
  'georgia/cherokee': 'I-575 · GA-20 · GA-92 · GA-140 · I-75 (south approach)',
  'georgia/clayton': 'I-75 · I-285 · US-19/41 · GA-138 · Tara Boulevard',
  'georgia/forsyth': 'GA-400 · GA-20 · GA-141 · US-19 · McFarland Pkwy',
  'georgia/henry': 'I-75 · I-675 · US-23 · GA-20 · GA-155',
  'georgia/hall': 'I-985 · US-129 · GA-365 · GA-53 · Spout Springs Road',
  'georgia/richmond': 'I-20 · I-520 · US-1 · Gordon Highway · Washington Road',
  'georgia/muscogee': 'I-185 · US-27 · US-280 · Victory Drive · Manchester Expressway',

  // Georgia Tier 2 Wave 1
  'georgia/fayette': 'GA-54 · GA-74 · GA-85 · I-85 (west approaches) · US-29 approaches',
  'georgia/douglas': 'I-20 · GA-5 · GA-92 · US-78 · Chapel Hill Road corridors',
  'georgia/coweta': 'I-85 · US-29 · GA-34 · GA-16 · GA-154 approaches',
  'georgia/paulding': 'US-278 · GA-61 · GA-92 · GA-120 approaches · I-20 (south approaches)',
  'georgia/columbia': 'I-20 · Washington Road · Belair Road · Furys Ferry Road · Columbia Road corridors',
  'georgia/houston': 'I-75 · GA-247 · GA-96 · US-41 · Russell Parkway corridors',
  'georgia/bibb': 'I-75 · I-16 · US-80 · US-41 · Eisenhower Parkway · Vineville corridors',
  'georgia/clarke': 'US-78 · US-29 · GA-10 Loop · GA-15 · Atlanta Highway corridors',

  // ——— New York ———
  'new-york/kings':
    'I-278 (BQE) · Belt Parkway · Gowanus Expressway · Prospect Expressway · Ocean Pkwy',
  'new-york/queens':
    'I-495 (LIE) · Grand Central Pkwy · Van Wyck Expressway · Cross Island Pkwy · I-678',
  'new-york/new-york':
    'FDR Drive · West Side Highway · Harlem River Drive · I-95 approaches · Midtown Tunnel approaches',
  'new-york/bronx':
    'I-87 (Major Deegan) · I-95 · Cross Bronx Expressway · Bruckner Expressway · Grand Concourse',
  'new-york/richmond':
    'I-278 · Korean War Veterans Pkwy · West Shore Expressway · Richmond Pkwy · Outerbridge approaches',
  'new-york/nassau': 'I-495 (LIE) · Northern State Pkwy · Southern State Pkwy · Meadowbrook Pkwy · Wantagh Pkwy',
  'new-york/suffolk': 'I-495 (LIE) · Sunrise Highway (NY-27) · Northern State Pkwy · NY-25 · Sagtikos Pkwy',
  'new-york/westchester': 'I-87 · I-95 · I-287 · Hutchinson River Pkwy · Sprain Brook Pkwy · Saw Mill River Pkwy',
  'new-york/erie': 'I-90 · I-190 · NY-33 (Kensington) · NY-5 · I-290',
  'new-york/monroe': 'I-490 · I-390 · I-590 · NY-104 · Inner Loop approaches',
  'new-york/onondaga': 'I-81 · I-90 · I-690 · NY-481 · NY-5',
  'new-york/albany': 'I-87 · I-90 · US-9 · NY-7 · I-787',
  // New York Tier 2 Wave 1
  'new-york/rockland':
    'I-87 · Palisades Interstate Parkway · NY-59 · NY-304 · NY-9W · Tappan Zee / Governor Mario M. Cuomo Bridge approaches',
  'new-york/orange': 'I-87 · I-84 · NY-17 · NY-211 · NY-32 · NY-208',
  'new-york/dutchess': 'I-84 · US-9 · NY-9D · NY-55 · NY-44 · Metro-North Hudson Line',
  'new-york/putnam': 'I-84 · Taconic State Parkway · US-6 · NY-22 · NY-301',
  'new-york/saratoga': 'I-87 · NY-50 · NY-9 · NY-29 · NY-67 · NY-146',
  'new-york/schenectady': 'I-890 · I-90 · NY-5 · NY-7 · NY-50 · NY-146',
  'new-york/rensselaer': 'I-90 · I-787 · US-4 · US-9 · NY-7 · NY-43',
  'new-york/niagara': 'I-190 · I-290 · NY-104 · NY-31 · NY-265 · NY-62',
  'new-york/oneida': 'I-90 · NY-5 · NY-8 · NY-12 · NY-49 · NY-69',
  'new-york/broome': 'I-81 · NY-17 · US-11 · NY-26 · NY-434 · NY-201',
  'new-york/ulster': 'I-87 · NY-28 · NY-32 · NY-9W · NY-299 · NY-212',
  'new-york/ontario': 'I-90 · I-490 · NY-332 · NY-5 · NY-21 · NY-14 · NY-96',

  // New York Tier 2 Wave 2
  'new-york/tompkins': 'NY-13 · NY-79 · NY-96 · NY-34 · NY-89 · I-81 (regional approaches)',
  'new-york/chemung': 'I-86 · NY-17 · NY-14 · NY-13 · NY-352 · US-220 approaches',
  'new-york/jefferson': 'I-81 · NY-3 · NY-12 · NY-11 · NY-342 · NY-37 approaches',
  'new-york/chautauqua': 'I-86 · I-90 (north edge) · NY-60 · NY-5 · NY-394 · NY-430',
  'new-york/clinton': 'I-87 · NY-3 · NY-9 · NY-22 · NY-374 · NY-190',
  'new-york/st-lawrence': 'US-11 · NY-37 · NY-68 · NY-56 · NY-812 · NY-3 approaches',
  'new-york/oswego': 'NY-481 · NY-104 · NY-48 · NY-3 · I-81 (east approaches) · NY-69 approaches',
  'new-york/cayuga': 'I-90 · NY-5 · NY-20 · NY-34 · NY-38 · NY-90',
  'new-york/steuben': 'I-86 · NY-15 · NY-17 · NY-21 · NY-36 · NY-415',
  'new-york/sullivan': 'NY-17 · NY-42 · NY-52 · NY-55 · NY-97 · NY-17B',
  'new-york/warren': 'I-87 · NY-9 · NY-9N · NY-149 · NY-8 · NY-28 approaches',
  'new-york/columbia': 'I-90 · Taconic State Parkway · NY-9H · NY-9 · NY-23 · NY-66',

  // ——— Arizona ———
  'arizona/maricopa': 'I-10 · I-17 · Loop 101 · Loop 202 · US-60 · Loop 303',
  'arizona/pima': 'I-10 · I-19 · AZ-77 · AZ-86 · Grant / Broadway corridors',
  'arizona/pinal': 'I-10 · AZ-347 · AZ-79 · US-60 · AZ-287',
  'arizona/yavapai': 'I-17 · AZ-69 · AZ-89 · AZ-89A · AZ-69/169 corridors',
  'arizona/mohave': 'I-40 · US-93 · AZ-95 · I-15 (northwest edge) · AZ-68',
  'arizona/yuma': 'I-8 · US-95 · AZ-195 · Business 8 · 4th Avenue corridor',
  'arizona/coconino': 'I-40 · I-17 · US-89 · US-180 · AZ-89A',

  // ——— South Carolina Core 12 ———
  'south-carolina/greenville': 'I-85 · I-385 · US-25 · SC-14 · local arterial grid',
  'south-carolina/charleston': 'I-26 · I-526 · US-17 · SC-7 · local peninsula/island approaches',
  'south-carolina/richland': 'I-20 · I-26 · I-77 · US-1 · local Columbia grid',
  'south-carolina/horry': 'US-17 · SC-31 (Carolina Bays) · SC-22 · US-501',
  'south-carolina/spartanburg': 'I-85 · I-26 · US-221 · SC-9 · local arterial grid',
  'south-carolina/york': 'I-77 · US-21 · SC-161 · SC-5 · SC-160',
  'south-carolina/lexington': 'I-20 · I-26 · US-1 · US-378 · local arterial grid',
  'south-carolina/berkeley': 'I-26 · US-52 · US-17A · Clements Ferry corridors',
  'south-carolina/beaufort': 'US-278 · US-21 · SC-170 · island-causeway approaches',
  'south-carolina/dorchester': 'I-26 · US-78 · SC-165 · Summerville arterials',
  'south-carolina/anderson': 'I-85 · US-76 · SC-28 · SC-81',
  'south-carolina/florence': 'I-95 · I-20 · US-52 · US-76',

  // ——— Illinois Core 12 ———
  'illinois/cook': 'I-90/94 · I-55 · I-290 · I-294 · Lake Shore Drive · local arterial grid',
  'illinois/dupage': 'I-88 · I-355 · I-294 links · IL-59 · Roosevelt Road corridors',
  'illinois/lake': 'I-94 · I-294 links · US-41 · IL-60 · IL-120',
  'illinois/will': 'I-55 · I-80 · I-355 · US-30 · IL-53 links',
  'illinois/kane': 'I-88 · I-90 · IL-47 · Randall Road corridors',
  'illinois/mchenry': 'US-14 · IL-31 · IL-47 · I-90 links',
  'illinois/winnebago': 'I-39 · I-90 · US-20 · IL-251',
  'illinois/madison': 'I-55 · I-70 · I-255 · IL-3 · US-40',
  'illinois/st-clair': 'I-64 · I-255 · I-55/70 links · IL-15',
  'illinois/sangamon': 'I-55 · I-72 · IL-4 · Clear Lake Ave corridors',
  'illinois/champaign': 'I-57 · I-74 · US-45 · University corridors',
  'illinois/peoria': 'I-74 · I-474 · IL-29 · US-24',

  // ——— Colorado Core 10 ———
  'colorado/denver': 'I-25 · I-70 · I-225 · US-6 · Colfax · local arterial grid',
  'colorado/el-paso': 'I-25 · US-24 · Powers Blvd · Academy Blvd',
  'colorado/arapahoe': 'I-25 · I-225 · E-470 · Parker Road · Smoky Hill corridors',
  'colorado/jefferson': 'I-70 · US-6 · C-470 · Wadsworth · Colfax west',
  'colorado/adams': 'I-25 · I-76 · E-470 · I-270 · Tower Road corridors',
  'colorado/douglas': 'I-25 · C-470 · E-470 · US-85 · Founders/Lincoln corridors',
  'colorado/larimer': 'I-25 · US-34 · US-287 · Harmony Road corridors',
  'colorado/boulder': 'US-36 · CO-119 · CO-93 · Foothills Pkwy · Canyon corridors',
  'colorado/weld': 'I-25 · US-34 · US-85 · CO-257 corridors',
  'colorado/pueblo': 'I-25 · US-50 · CO-47 · Pueblo Blvd corridors',

  // ——— Washington Core 10 ———
  'washington/king': 'I-5 · I-90 · I-405 · SR-520 · SR-99',
  'washington/pierce': 'I-5 · SR-16 · SR-512 · I-705 · Pacific Ave corridors',
  'washington/snohomish': 'I-5 · SR-9 · SR-2 · I-405 links · US-2',
  'washington/spokane': 'I-90 · US-2 · US-395 · SR-290',
  'washington/clark': 'I-5 · I-205 · SR-14 · SR-500',
  'washington/thurston': 'I-5 · US-101 · SR-510 · Capitol corridors',
  'washington/kitsap': 'SR-3 · SR-16 · SR-303 · ferry approaches',
  'washington/whatcom': 'I-5 · SR-539 · SR-542 · US-11 links',
  'washington/benton': 'I-82 · US-395 · SR-240 · SR-224',
  'washington/yakima': 'I-82 · US-12 · SR-24 · SR-821',

  // ——— Massachusetts Core 10 ———
  'massachusetts/suffolk': 'I-90 · I-93 · US-1 · Storrow Drive · local arterial grid',
  'massachusetts/middlesex': 'I-95 · I-93 · Route 2 · Route 3 · Route 128/I-95 belt',
  'massachusetts/norfolk': 'I-93 · I-95 · Route 3 · Route 28 · Route 1A',
  'massachusetts/essex': 'I-95 · Route 1 · Route 128 · Route 114',
  'massachusetts/worcester': 'I-290 · I-90 · I-190 · Route 9 · Route 20',
  'massachusetts/bristol': 'I-195 · Route 24 · Route 6 · Route 140',
  'massachusetts/plymouth': 'Route 3 · Route 24 · Route 44 · Route 18',
  'massachusetts/hampden': 'I-91 · I-90 · Route 5 · Route 20',
  'massachusetts/barnstable': 'Route 6 · Route 28 · Route 132 · Cape bridges',
  'massachusetts/hampshire': 'I-91 · Route 9 · Route 116 · Route 47',

  // ——— Minnesota Core 8 ———
  'minnesota/hennepin': 'I-94 · I-35W · I-394 · I-494 · MN-100 · local arterial grid',
  'minnesota/ramsey': 'I-35E · I-94 · I-694 · US-61 · Snelling corridors',
  'minnesota/dakota': 'I-35 · I-494 · MN-77 · MN-13 · Cedar corridors',
  'minnesota/anoka': 'I-35W · US-10 · MN-65 · MN-47 · 610 corridors',
  'minnesota/washington': 'I-94 · I-494/694 links · MN-36 · MN-5 · St. Croix approaches',
  'minnesota/olmsted': 'US-52 · US-14 · US-63 · 2nd Street / local grid',
  'minnesota/st-louis': 'I-35 · US-53 · MN-61 (North Shore) · local Duluth grid',
  'minnesota/stearns': 'I-94 · MN-15 · MN-23 · US-10',

  // ——— Wisconsin Core 8 ———
  'wisconsin/milwaukee': 'I-94 · I-43 · I-894 · US-41/45 · local arterial grid',
  'wisconsin/dane': 'I-39/90/94 · US-12 · US-18/151 · Beltline corridors',
  'wisconsin/waukesha': 'I-94 · US-18 · WI-59 · WI-164 · local arterial grid',
  'wisconsin/brown': 'I-41 · I-43 · US-41 · WI-29 · local Green Bay grid',
  'wisconsin/racine': 'I-94 · WI-20 · WI-31 · WI-32 · local arterial grid',
  'wisconsin/kenosha': 'I-94 · WI-50 · WI-158 · WI-31 · IL border approaches',
  'wisconsin/outagamie': 'I-41 · US-10 · WI-441 · WI-47 · local Fox Cities grid',
  'wisconsin/winnebago': 'I-41 · US-45 · WI-21 · WI-44 · local Oshkosh grid',

  
  // ——— Missouri Core 6 ———
  'missouri/st-louis': 'I-70 · I-64 · I-44 · I-270 · I-55 · local arterial grid',
  'missouri/jackson': 'I-70 · I-35 · I-29 · I-435 · US-71 · local KC grid',
  'missouri/st-charles': 'I-70 · I-64 · MO-370 · MO-94',
  'missouri/greene': 'I-44 · US-60 · US-65 · local Springfield grid',
  'missouri/clay': 'I-35 · I-29 · I-435 · MO-291',
  'missouri/jefferson': 'I-55 · US-61/67 · MO-21 · MO-30',
  // ——— Kentucky Core 6 ———
  'kentucky/jefferson': 'I-64 · I-65 · I-71 · I-264 · I-265 · local arterial grid',
  'kentucky/fayette': 'I-64 · I-75 · US-60 · US-27 · New Circle corridors',
  'kentucky/kenton': 'I-71/75 · I-275 · KY-16 · KY-17 · local NKY grid',
  'kentucky/boone': 'I-71/75 · I-275 · KY-18 · KY-237 · CVG approaches',
  'kentucky/warren': 'I-65 · US-31W · US-68 · local Bowling Green grid',
  'kentucky/hardin': 'I-65 · US-31W · KY-313 · local Elizabethtown grid',

  // ——— Nevada Core 5 ———
  'nevada/clark': 'I-15 · I-215 · US-95 · US-93 · local Las Vegas arterial grid',
  'nevada/washoe': 'I-80 · US-395 · I-580 · local Reno/Sparks grid',
  'nevada/carson-city': 'US-50 · US-395 · I-580 links · local grid',
  'nevada/douglas': 'US-395 · US-50 · NV-207/Tahoe approaches',
  'nevada/nye': 'NV-160 · US-95 · local Pahrump grid',
  // ——— Oklahoma Core 6 ———
  'oklahoma/oklahoma': 'I-35 · I-40 · I-44 · I-235 · Kilpatrick Turnpike · local arterial grid',
  'oklahoma/tulsa': 'I-44 · I-244 · US-75 · US-169 · Creek Turnpike · local arterial grid',
  'oklahoma/cleveland': 'I-35 · US-77 · OK-9 · local Norman grid',
  'oklahoma/canadian': 'I-40 · Kilpatrick links · OK-4 · local west-metro grid',
  'oklahoma/comanche': 'I-44 · US-62 · US-281 · local Lawton grid',
  'oklahoma/rogers': 'I-44 · OK-66 · OK-20 · local northeast metro grid',

  // ——— Iowa Core 6 ———
  'iowa/polk': 'I-35 · I-80 · I-235 · US-6 · local Des Moines grid',
  'iowa/linn': 'I-380 · US-30 · US-151 · local Cedar Rapids grid',
  'iowa/scott': 'I-74 · I-80 · US-61 · US-67 · local Quad Cities grid',
  'iowa/johnson': 'I-80 · US-218 · US-6 · local Iowa City grid',
  'iowa/black-hawk': 'I-380 · US-20 · US-218 · local Waterloo/Cedar Falls grid',
  'iowa/woodbury': 'I-29 · US-20 · US-75 · local Sioux City grid',
  // ——— Kansas Core 6 ———
  'kansas/johnson': 'I-35 · I-435 · US-69 · K-10 · local JOCO arterial grid',
  'kansas/sedgwick': 'I-135 · I-235 · US-54 · K-96 · local Wichita grid',
  'kansas/shawnee': 'I-70 · US-75 · US-24 · local Topeka grid',
  'kansas/wyandotte': 'I-70 · I-635 · US-69 · local KCK grid',
  'kansas/douglas': 'I-70 · US-40 · US-59 · K-10 · local Lawrence grid',
  'kansas/leavenworth': 'US-73 · K-7 · K-92 · I-70 links · local arterial grid',

  // ——— Mississippi Core 6 ———
  'mississippi/hinds': 'I-55 · I-20 · US-49 · US-51 · local Jackson grid',
  'mississippi/harrison': 'I-10 · US-90 · US-49 · local Gulf Coast grid',
  'mississippi/desoto': 'I-55 · I-69 · US-51 · US-78 · local Southaven grid',
  'mississippi/rankin': 'I-20 · US-80 · MS-25 · local east-metro grid',
  'mississippi/madison': 'I-55 · MS-22 · US-51 · local north-metro grid',
  'mississippi/jackson': 'I-10 · US-90 · MS-63 · local Pascagoula/OS grid',

  // ——— New Hampshire Core 5 ———
  'new-hampshire/hillsborough': 'I-93 · I-293 · NH-101 · US-3 · local arterial grid',
  'new-hampshire/rockingham': 'I-95 · NH-101 · NH-16 · US-1 · local seacoast grid',
  'new-hampshire/merrimack': 'I-93 · I-89 · US-4 · US-202 · local Concord grid',
  'new-hampshire/strafford': 'NH-16 (Spaulding) · US-4 · local Dover/Rochester grid',
  'new-hampshire/grafton': 'I-89 · I-91 links · US-4 · local Upper Valley grid',

  // ——— Maine Core 5 ———
  'maine/cumberland': 'I-295 · I-95 · US-1 · ME-25 · local Portland grid',
  'maine/york': 'I-95 · US-1 · ME-109 · ME-111 · local southern ME grid',
  'maine/penobscot': 'I-95 · US-2 · ME-15 · local Bangor grid',
  'maine/kennebec': 'I-95 · US-201 · US-202 · local Augusta grid',
  'maine/androscoggin': 'I-95 · ME-4 · ME-11 · US-202 · local L-A grid',

  // ——— West Virginia Core 5 ———
  'west-virginia/kanawha': 'I-64 · I-77 · US-60 · US-119 · local Charleston grid',
  'west-virginia/berkeley': 'I-81 · WV-9 · US-11 · local Martinsburg grid',
  'west-virginia/monongalia': 'I-79 · I-68 · US-119 · local Morgantown grid',
  'west-virginia/cabell': 'I-64 · US-60 · WV-2 · local Huntington grid',
  'west-virginia/wood': 'I-77 · US-50 · WV-2 · local Parkersburg grid',

  // ——— Rhode Island Core 5 ———
  'rhode-island/providence': 'I-95 · I-195 · US-6 · RI-10 · local arterial grid',
  'rhode-island/kent': 'I-95 · RI-4 · US-1 · local Warwick grid',
  'rhode-island/washington': 'US-1 · RI-4 · RI-138 · local South County grid',
  'rhode-island/newport': 'RI-138 · RI-114 · local peninsula grid',
  'rhode-island/bristol': 'RI-114 · RI-136 · local East Bay grid',

  // ——— Alaska Core 4 ———
  'alaska/anchorage': 'Glenn Highway · Seward Highway · Minnesota Dr · local arterial grid',
  'alaska/fairbanks-north-star': 'Parks Highway · Richardson Highway · Steese Highway · local grid',
  'alaska/matanuska-susitna': 'Parks Highway · Glenn Highway links · local Wasilla/Palmer grid',
  'alaska/juneau': 'Egan Drive · Glacier Highway · local capital grid',

  // ——— Hawaii Core 4 ———
  'hawaii/honolulu': 'H-1 · H-2 · H-3 · Kamehameha Hwy · local Oʻahu grid',
  'hawaii/hawaii': 'Queen Kaʻahumanu Hwy · Hawaiʻi Belt Road · local Hilo/Kona grids',
  'hawaii/maui': 'Honoapiʻilani Hwy · Haleakalā Hwy · local Kahului grid',
  'hawaii/kauai': 'Kaumualiʻi Hwy · Kuhio Hwy · local Līhuʻe grid',

  // ——— Montana Core 5 ———
  'montana/yellowstone': 'I-90 · I-94 · US-87 · US-212 · local Billings grid',
  'montana/missoula': 'I-90 · US-93 · US-12 · local Missoula grid',
  'montana/gallatin': 'I-90 · US-191 · MT-84 · local Bozeman grid',
  'montana/cascade': 'I-15 · US-87 · US-89 · local Great Falls grid',
  'montana/lewis-and-clark': 'I-15 · US-12 · US-287 · local Helena grid',

// ——— Michigan Core 10 ———
  'michigan/wayne': 'I-75 · I-94 · I-96 · I-275 · M-10 · arterial grid',
  'michigan/oakland': 'I-75 · I-696 · M-59 · Telegraph · Woodward corridors',
  'michigan/macomb': 'I-94 · M-53 · M-59 · I-696 links · Gratiot corridors',
  'michigan/kent': 'I-96 · I-196 · US-131 · M-6 · 28th Street corridors',
  'michigan/washtenaw': 'I-94 · US-23 · M-14 · State Street corridors',
  'michigan/genesee': 'I-75 · I-69 · M-21 · Dort Highway corridors',
  'michigan/ottawa': 'I-96 · US-31 · M-6 links · lakeshore corridors',
  'michigan/ingham': 'I-96 · I-69 · US-127 · Saginaw Hwy corridors',
  'michigan/kalamazoo': 'I-94 · US-131 · M-43 · Stadium Drive corridors',
  'michigan/saginaw': 'I-75 · I-675 · M-46 · M-13 corridors',

  // ——— Oregon Core 8 ———
  'oregon/multnomah': 'I-5 · I-84 · I-205 · US-26 · local arterial grid',
  'oregon/washington': 'I-5 · US-26 · OR-217 · OR-8 · TV Highway corridors',
  'oregon/clackamas': 'I-205 · OR-99E · OR-212/224 · OR-43',
  'oregon/lane': 'I-5 · OR-126 · OR-99 · Belt Line corridors',
  'oregon/marion': 'I-5 · OR-22 · OR-99E · Capitol corridors',
  'oregon/deschutes': 'US-97 · US-20 · OR-372 · parkway corridors',
  'oregon/jackson': 'I-5 · OR-62 · OR-99 · OR-238',
  'oregon/linn': 'I-5 · US-20 · OR-34 · OR-99E',

  // ——— Maryland Core 8 ———
  'maryland/montgomery': 'I-495 · I-270 · MD-355 · MD-97 · River Road corridors',
  'maryland/prince-georges': 'I-495 · I-95 · US-50 · MD-4 · MD-214',
  'maryland/baltimore': 'I-695 · I-83 · I-95 · MD-45 · York Road corridors',
  'maryland/baltimore-city': 'I-95 · I-83 · I-895 · local arterial grid',
  'maryland/anne-arundel': 'US-50 · I-97 · MD-2 · MD-100',
  'maryland/howard': 'I-95 · US-29 · MD-32 · MD-100 · MD-175',
  'maryland/frederick': 'I-70 · I-270 · US-15 · US-40',
  'maryland/harford': 'I-95 · MD-24 · US-1 · MD-22',

  // ——— Indiana Core 8 ———
  'indiana/marion': 'I-65 · I-70 · I-465 · I-74 · US-31 · local arterial grid',
  'indiana/hamilton': 'I-69 · US-31 · US-37 · 146th Street corridors',
  'indiana/lake': 'I-80/94 · I-65 · US-30 · US-41 · local arterial grid',
  'indiana/allen': 'I-69 · I-469 · US-30 · US-27',
  'indiana/st-joseph': 'I-80/90 · US-31 · US-20 · SR-23',
  'indiana/elkhart': 'I-80/90 · US-20 · US-33 · SR-19',
  'indiana/tippecanoe': 'I-65 · US-52 · US-231 · SR-26',
  'indiana/vanderburgh': 'I-69 · US-41 · SR-62 · SR-66',

  // ——— Connecticut Core 6 ———
  'connecticut/fairfield': 'I-95 · Merritt Parkway (CT-15) · I-84 · US-1 · US-7',
  'connecticut/hartford': 'I-84 · I-91 · CT-2 · CT-9 · local arterial grid',
  'connecticut/new-haven': 'I-95 · I-91 · CT-15 · US-1',
  'connecticut/new-london': 'I-95 · CT-2 · CT-32 · US-1',
  'connecticut/litchfield': 'US-7 · US-202 · CT-8 · CT-4',
  'connecticut/middlesex': 'CT-9 · CT-66 · I-91 links · US-1 approaches',

  // ——— Utah Core 6 ———
  'utah/salt-lake': 'I-15 · I-80 · I-215 · US-89 · local arterial grid',
  'utah/utah': 'I-15 · US-89 · US-189 · local arterial grid',
  'utah/davis': 'I-15 · US-89 · Legacy Parkway · local arterial grid',
  'utah/weber': 'I-15 · I-84 · US-89 · local Ogden grid',
  'utah/washington': 'I-15 · UT-9 · UT-18 · local St. George grid',
  'utah/cache': 'US-89/91 · US-30 · local Logan grid',

  // ——— Alabama Core 6 ———
  'alabama/jefferson': 'I-20 · I-65 · I-59 · US-280 · US-31 · local arterial grid',
  'alabama/mobile': 'I-10 · I-65 · US-90 · US-98 · local arterial grid',
  'alabama/madison': 'I-565 · I-65 · US-72 · US-231 · local Huntsville grid',
  'alabama/montgomery': 'I-65 · I-85 · US-80 · US-231 · local capital grid',
  'alabama/shelby': 'I-65 · US-280 · US-31 · AL-119 · local arterial grid',
  'alabama/baldwin': 'I-10 · US-98 · US-90 · AL-59 · coastal approaches',

  // ——— Louisiana Core 6 (parishes) ———
  'louisiana/orleans': 'I-10 · I-610 · US-90 · LA-39 · local arterial grid',
  'louisiana/east-baton-rouge': 'I-10 · I-12 · I-110 · US-61 · local BR grid',
  'louisiana/jefferson': 'I-10 · I-310 · US-90 · LA-45 · local Metairie/Kenner grid',
  'louisiana/st-tammany': 'I-12 · I-10 · US-190 · LA-21 · Northshore arterials',
  'louisiana/caddo': 'I-20 · I-49 · US-71 · local Shreveport grid',
  'louisiana/lafayette': 'I-10 · I-49 · US-90 · local Lafayette grid',

  // ——— Arkansas Core 6 ———
  'arkansas/pulaski': 'I-30 · I-40 · I-430 · I-630 · US-67/167 · local arterial grid',
  'arkansas/benton': 'I-49 · US-71 · AR-12 · local NWA arterial grid',
  'arkansas/washington': 'I-49 · US-71 · AR-16 · local Fayetteville grid',
  'arkansas/sebastian': 'I-40 · I-49 · US-71 · local Fort Smith grid',
  'arkansas/faulkner': 'I-40 · US-65 · AR-25 · local Conway grid',
  'arkansas/saline': 'I-30 · US-67 · AR-5 · local south-metro grid',

  // ——— New Mexico Core 5 ———
  'new-mexico/bernalillo': 'I-25 · I-40 · NM-500 · local Albuquerque arterial grid',
  'new-mexico/santa-fe': 'I-25 · US-84/285 · NM-599 · local Santa Fe grid',
  'new-mexico/doa-ana': 'I-10 · I-25 · US-70 · local Las Cruces grid',
  'new-mexico/sandoval': 'I-25 · US-550 · NM-528 · local Rio Rancho grid',
  'new-mexico/san-juan': 'US-64 · US-550 · NM-516 · local Farmington grid',

  // ——— Nebraska Core 6 ———
  'nebraska/douglas': 'I-80 · I-480 · I-680 · US-75 · US-6 · local Omaha grid',
  'nebraska/lancaster': 'I-80 · US-77 · US-34 · local Lincoln grid',
  'nebraska/sarpy': 'I-80 · US-75 · NE-370 · local south-metro grid',
  'nebraska/hall': 'I-80 · US-34 · US-281 · local Grand Island grid',
  'nebraska/buffalo': 'I-80 · US-30 · NE-10 · local Kearney grid',
  'nebraska/dodge': 'US-30 · US-77 · US-275 · local Fremont grid',

  // ——— Idaho Core 5 ———
  'idaho/ada': 'I-84 · US-20/26 · ID-55 · local Boise arterial grid',
  'idaho/canyon': 'I-84 · US-20/26 · ID-45 · local Nampa/Caldwell grid',
  'idaho/kootenai': 'I-90 · US-95 · ID-41 · local CdA grid',
  'idaho/bonneville': 'I-15 · US-20 · US-26 · local Idaho Falls grid',
  'idaho/twin-falls': 'I-84 · US-93 · US-30 · local Twin Falls grid',

  // ——— Vermont Core 5 ———
  'vermont/chittenden': 'I-89 · US-7 · US-2 · local Burlington grid',
  'vermont/washington': 'I-89 · US-2 · VT-12 · local Montpelier/Barre grid',
  'vermont/rutland': 'US-4 · US-7 · VT-103 · local Rutland grid',
  'vermont/windsor': 'I-91 · US-5 · US-4 · local Upper Valley grid',
  'vermont/franklin': 'I-89 · US-7 · VT-78 · local St. Albans grid',

  // ——— Delaware Core 3 (full state) ———
  'delaware/new-castle': 'I-95 · I-495 · I-295 · US-13 · DE-1 · local Wilmington grid',
  'delaware/kent': 'DE-1 · US-13 · DE-8 · local Dover grid',
  'delaware/sussex': 'DE-1 · US-9 · US-13 · local beach/corridor grid',

  // ——— North Dakota Core 4 ———
  'north-dakota/cass': 'I-94 · I-29 · US-10 · local Fargo grid',
  'north-dakota/burleigh': 'I-94 · US-83 · ND-1804 · local Bismarck grid',
  'north-dakota/grand-forks': 'I-29 · US-2 · local Grand Forks grid',
  'north-dakota/ward': 'US-2 · US-83 · local Minot grid',

  // ——— South Dakota Core 4 ———
  'south-dakota/minnehaha': 'I-29 · I-90 · US-14 · local Sioux Falls grid',
  'south-dakota/pennington': 'I-90 · US-16 · SD-44 · local Rapid City grid',
  'south-dakota/lincoln': 'I-29 · SD-11 · local south-metro grid',
  'south-dakota/brown': 'US-12 · US-281 · local Aberdeen grid',

  // ——— Wyoming Core 4 ———
  'wyoming/laramie': 'I-25 · I-80 · US-30 · US-85 · local Cheyenne grid',
  'wyoming/natrona': 'I-25 · US-20 · US-26 · local Casper grid',
  'wyoming/campbell': 'I-90 · US-14 · WY-59 · local Gillette grid',
  'wyoming/sweetwater': 'I-80 · US-191 · local Rock Springs/Green River grid',

  // ——— Virginia Core 12 ———
  'virginia/fairfax': 'I-66 · I-495 · VA-28 · Dulles Toll Road · VA-236 · I-95 links',
  'virginia/prince-william': 'I-95 · I-66 · VA-234 · US-1 · Prince William Pkwy',
  'virginia/loudoun': 'VA-7 · VA-28 · Dulles Toll Road · US-15 · Loudoun County Pkwy',
  'virginia/chesterfield': 'Chippenham Pkwy · VA-288 · US-60 · US-360 · I-95 links',
  'virginia/henrico': 'I-64 · I-295 · US-33 · US-250 · Parham Road corridors',
  'virginia/virginia-beach': 'I-264 · I-64 · VA-44 links · Shore Drive · Virginia Beach Blvd',
  'virginia/arlington': 'I-395 · I-66 · GW Parkway · VA-50 · local arterial grid',
  'virginia/richmond': 'I-95 · I-64 · I-195 · Downtown Expressway · Broad Street corridor',
  'virginia/chesapeake': 'I-64 · I-464 · VA-168 · Dominion Blvd · Greenbrier Pkwy',
  'virginia/norfolk': 'I-64 · I-264 · I-564 · Downtown Tunnel approaches · Naval Base access corridors',
  'virginia/stafford': 'I-95 · US-1 · VA-610 (Garrisonville) · VA-17',
  'virginia/spotsylvania': 'I-95 · VA-3 · US-1 · VA-208',

  // ——— Ohio Core 12 ———
  'ohio/franklin': 'I-70 · I-71 · I-270 · I-670 · US-23 · US-33',
  'ohio/cuyahoga': 'I-90 · I-71 · I-77 · I-480 · SR-2 · Shoreway links',
  'ohio/hamilton': 'I-71 · I-75 · I-74 · I-275 · US-50 · Columbia Pkwy',
  'ohio/summit': 'I-76 · I-77 · I-271 · SR-8 · SR-18 · Cleveland-Massillon Rd',
  'ohio/montgomery': 'I-70 · I-75 · US-35 · SR-4 · SR-48 · Needmore Rd corridors',
  'ohio/lucas': 'I-75 · I-280 · I-475 · US-23 · SR-2 · Anthony Wayne Trail',
  'ohio/butler': 'I-75 · I-275 · SR-4 · US-127 · SR-129 · Cincinnati-Dayton Rd',
  'ohio/stark': 'I-77 · US-30 · US-62 · I-76 links · SR-43 · Tuscarawas St',
  'ohio/lorain': 'I-90 · SR-2 · SR-57 · US-20 · SR-58 · Midway Mall corridors',
  'ohio/mahoning': 'I-80 · I-680 · US-62 · SR-11 · Market St · Belmont Ave',
  'ohio/warren': 'I-71 · I-75 links · SR-48 · US-22/3 · SR-123 · Mason-Montgomery Rd',
  'ohio/lake': 'I-90 · SR-2 · US-20 · SR-44 · SR-91 · Vine Street corridors',

  // ——— Pennsylvania Core 12 ———
  'pennsylvania/philadelphia': 'I-95 · I-76 · I-676 · US-1 · Roosevelt Blvd · Broad Street',
  'pennsylvania/allegheny': 'I-376 · I-279 · I-79 · Parkway East/West/North · PA-28',
  'pennsylvania/montgomery': 'I-76 · I-476 · US-202 · PA-309 · PA-611',
  'pennsylvania/bucks': 'I-95 · US-1 · PA-611 · US-202 links · PA-132',
  'pennsylvania/delaware': 'I-95 · I-476 · US-1 · PA-3 · PA-352',
  'pennsylvania/chester': 'US-30 · US-202 · PA-100 · I-76 links · PA-3',
  'pennsylvania/lancaster': 'US-30 · US-222 · PA-283 · I-76 links · PA-23',
  'pennsylvania/york': 'I-83 · US-30 · PA-74 · PA-462 · I-76 links',
  'pennsylvania/berks': 'US-222 · I-78 links · US-422 · PA-61 · PA-12 · PA-183',
  'pennsylvania/lehigh': 'I-78 · PA-22 · PA-309 · US-22 · PA-100',
  'pennsylvania/northampton': 'I-78 · PA-33 · US-22 · PA-611 · PA-248',
  'pennsylvania/westmoreland': 'I-76 · US-30 · PA-66 · I-70 links · PA-119',
  // Pennsylvania Tier 2 Wave 1
  'pennsylvania/cumberland': 'I-81 · I-76 Turnpike · US-11 · PA-581 · PA-114 · PA-34',
  'pennsylvania/washington': 'I-70 · I-79 · US-19 · PA-18 · PA-136 · PA-50',
  'pennsylvania/butler': 'I-79 · I-76 Turnpike · US-422 · PA-8 · PA-228 · PA-68',
  'pennsylvania/beaver': 'I-376 · PA-65 · PA-51 · PA-18 · Ohio River approaches · PA-68',
  'pennsylvania/lackawanna': 'I-81 · I-84 · I-380 · US-6 · PA-307 · PA-347',
  'pennsylvania/luzerne': 'I-81 · PA-309 · PA-115 · US-11 · PA-29 · I-80 links',
  'pennsylvania/centre': 'I-80 · US-322 · PA-26 · PA-45 · PA-144 · PA-550',
  'pennsylvania/monroe': 'I-80 · I-84 · PA-33 · PA-611 · PA-940 · PA-209',
  'pennsylvania/franklin': 'I-81 · US-30 · PA-16 · PA-997 · PA-75 · MD border approaches',
  'pennsylvania/schuylkill': 'I-81 · PA-61 · US-209 · PA-183 · PA-901 · PA-54',

  // ——— Tennessee Core 12 ———
  'tennessee/shelby': 'I-40 · I-55 · I-240 · I-69 links · US-51 · US-61',
  'tennessee/davidson': 'I-40 · I-24 · I-65 · Briley Pkwy · Ellington Pkwy · US-41',
  'tennessee/knox': 'I-40 · I-75 · I-640 · US-129 · Alcoa Hwy · Kingston Pike',
  'tennessee/hamilton': 'I-24 · I-75 · US-27 · TN-153 · Broad Street corridor',
  'tennessee/rutherford': 'I-24 · US-41/70S · TN-840 links · Medical Center Pkwy · Old Fort Pkwy',
  'tennessee/williamson': 'I-65 · TN-840 · US-31 · Cool Springs Blvd · Hillsboro Rd corridors',
  'tennessee/montgomery': 'I-24 · US-41A · TN-374 · 101st Airborne Pkwy · Fort Campbell Blvd',
  'tennessee/sumner': 'I-65 · Vietnam Veterans Blvd · US-31E · TN-386 · Gallatin Pike',
  'tennessee/wilson': 'I-40 · US-70 · TN-109 · Mt. Juliet Road · Lebanon Pike corridors',
  'tennessee/blount': 'US-129 · US-321 · I-140 links · Alcoa Hwy · scenic foothill approaches',
  'tennessee/sevier': 'US-441 · US-321 · US-411 · Forks of the River Pkwy · tourism spur corridors',
  'tennessee/sullivan': 'I-81 · I-26 · US-11W · US-23 · State of Franklin Rd corridors',

  // ——— North Carolina Core 12 ———
  'north-carolina/mecklenburg': 'I-77 · I-85 · I-485 · US-74 · NC-16 · Billy Graham Pkwy',
  'north-carolina/wake': 'I-40 · I-440 · I-540 · US-1 · US-70 · NC-54',
  'north-carolina/guilford': 'I-40 · I-85 · US-29 · US-220 · Bryan Boulevard · Wendover Avenue',
  'north-carolina/forsyth': 'I-40 · US-52 · US-421 · I-285 · Business 40 · Silas Creek Pkwy',
  'north-carolina/durham': 'I-40 · I-85 · NC-147 (Durham Freeway) · US-15-501 · NC-55',
  'north-carolina/cumberland':
    'I-95 · All American Freeway · NC-24 · NC-87 · Bragg Boulevard · Raeford Road',
  'north-carolina/buncombe': 'I-40 · I-26 · US-19/23 · US-70 · Smoky Park Hwy · tunnel approaches',
  'north-carolina/new-hanover': 'I-40 terminus · US-17 · US-74/76 · Oleander Drive · College Road',
  'north-carolina/union': 'US-74 · I-485 links · NC-16 · NC-84 · Providence Road corridor',
  'north-carolina/cabarrus': 'I-85 · US-29 · Concord Mills Blvd · NC-49 · NC-73',
  'north-carolina/gaston': 'I-85 · US-321 · US-74 · NC-279 · Wilkinson Blvd',
  'north-carolina/onslow': 'US-17 · NC-24 · Western Boulevard · Lejeune Boulevard · base-access roads',

  // ——— New Jersey (shared Tier-1 template) ———
  'new-jersey/bergen': 'I-95 / NJ Turnpike · I-80 · Route 17 · Route 4 · GWB approaches',
  'new-jersey/essex': 'I-280 · Garden State Pkwy · I-78 · Route 21 · Route 24',
  'new-jersey/middlesex': 'NJ Turnpike · Garden State Pkwy · Route 1 · Route 18 · I-287',
  'new-jersey/monmouth': 'Garden State Pkwy · Route 18 · Route 35 · Route 36 · I-195',
  'new-jersey/morris': 'I-80 · I-287 · Route 24 · Route 10 · Route 46',
  'new-jersey/ocean': 'Garden State Pkwy · Route 9 · Route 37 · Route 70 · Route 72',
  'new-jersey/warren': 'I-80 · Route 46 · Route 31 · Route 57 · Delaware River approaches',
  'new-jersey/mercer': 'I-95 / NJ Turnpike · I-295 · Route 1 · Route 29 · Route 206',
  'new-jersey/somerset': 'I-287 · Route 22 · Route 202/206 · Route 28 · I-78',
  'new-jersey/atlantic': 'ACE · Garden State Pkwy · US-30 · US-40/322 · Route 9',
  'new-jersey/gloucester': 'NJ Turnpike · I-295 · Route 42 · Route 55 · US-322',
  'new-jersey/hunterdon': 'I-78 · Route 31 · Route 202 · Route 12 · Route 29',
  'new-jersey/sussex': 'I-80 · Route 15 · Route 23 · Route 206 · Route 94',
};

/** True when string looks like roads, not operational essay. */
export function isFactualCorridorList(value: string): boolean {
  const v = value.trim();
  if (v.length < 6) return false;
  if (
    /tourism calendars|operational inputs|hoa density|parking\/curb|curb staging|portal-to-portal/i.test(
      v
    )
  ) {
    return false;
  }
  // At least one road-like token (I-10, US-101, Loop 101, Route 17, etc.)
  return /\b(I[-\s]?\d{1,3}(\/\d{1,3})?[A-Z]?|H[-\s]?[1-3]|US[-\s]?\d{1,3}(\/\d{1,3})?|FL[-\s]?\d{1,3}|CA[-\s]?\d{1,3}|GA[-\s]?\d{1,3}|NY[-\s]?\d{1,3}|AZ[-\s]?\d{1,3}|SC[-\s]?\d{1,3}|NC[-\s]?\d{1,3}|VA[-\s]?\d{1,3}|TN[-\s]?\d{1,3}|IL[-\s]?\d{1,3}|PA[-\s]?\d{1,3}|OH[-\s]?\d{1,3}|CO[-\s]?\d{1,3}|WA[-\s]?\d{1,3}|MI[-\s]?\d{1,3}|OR[-\s]?\d{1,3}|MD[-\s]?\d{1,3}|CT[-\s]?\d{1,3}|UT[-\s]?\d{1,3}|AL[-\s]?\d{1,3}|LA[-\s]?\d{1,3}|AR[-\s]?\d{1,3}|NM[-\s]?\d{1,3}|NE[-\s]?\d{1,3}|ID[-\s]?\d{1,3}|RI[-\s]?\d{1,3}|WV[-\s]?\d{1,3}|NH[-\s]?\d{1,3}|ME[-\s]?\d{1,3}|VT[-\s]?\d{1,3}|DE[-\s]?\d{1,3}|ND[-\s]?\d{1,4}|SD[-\s]?\d{1,3}|WY[-\s]?\d{1,3}|KS[-\s]?\d{1,3}|MS[-\s]?\d{1,3}|KY[-\s]?\d{1,3}|NV[-\s]?\d{1,3}|OK[-\s]?\d{1,3}|IA[-\s]?\d{1,3}|MA[-\s]?\d{1,3}|MT[-\s]?\d{1,3}|M[-\s]?\d{1,3}|[CE]-\d{2,3}|SR[-\s]?\d{1,3}|SH[-\s]?\d{1,3}|K[-\s]?\d{1,3}|Route\s+\d{1,3}|Loop\s+\d{1,3}|Turnpike|Parkway|Expressway|Pkwy|Tollway|PGBT|Connector|Highway|Hwy|Road|Blvd|Boulevard|Drive|ACE|GWB|FDR|MoPac|Merritt|Legacy)\b/i.test(
    v
  );
}

/** Curated major corridors for a county, if defined. */
export function getCountyMajorCorridors(
  stateSlug: string,
  countySlug: string
): string | undefined {
  return CORRIDORS[`${stateSlug}/${countySlug}`];
}

/** All curated corridor keys (for QA completeness). */
export function listCuratedMajorCorridorKeys(): string[] {
  return Object.keys(CORRIDORS);
}
