$ErrorActionPreference = 'Stop'
$root = Split-Path $PSScriptRoot -Parent
$src = Join-Path $PSScriptRoot 'generate-nebraska-county-data.ts'
$out = $src
$text = Get-Content $src -Raw -Encoding UTF8

# Header + EXPECTED_COUNT
$text = $text -replace 'Generates Nebraska county curation files \(batch 1 — 21 counties\)\.', 'Generates Nebraska county curation files (all 93 counties).'
$text = $text -replace 'const EXPECTED_COUNT = 21;', 'const EXPECTED_COUNT = 93;'

# DISPLAY_LABELS
$oldLabels = @'
const DISPLAY_LABELS: Partial<Record<string, string>> = {
  buffalo: 'Buffalo County, NE',
  madison: 'Madison County, NE',
  platte: 'Platte County, NE',
  lincoln: 'Lincoln County, NE',
  adams: 'Adams County, NE',
  cass: 'Cass County, NE',
  dakota: 'Dakota County, NE',
  washington: 'Washington County, NE',
  seward: 'Seward County, NE',
  saline: 'Saline County, NE',
  york: 'York County, NE',
};
'@
$newLabels = @'
const DISPLAY_LABELS: Partial<Record<string, string>> = {
  buffalo: 'Buffalo County, NE',
  madison: 'Madison County, NE',
  platte: 'Platte County, NE',
  lincoln: 'Lincoln County, NE',
  adams: 'Adams County, NE',
  cass: 'Cass County, NE',
  dakota: 'Dakota County, NE',
  washington: 'Washington County, NE',
  seward: 'Seward County, NE',
  saline: 'Saline County, NE',
  york: 'York County, NE',
  custer: 'Custer County, NE',
  clay: 'Clay County, NE',
  cheyenne: 'Cheyenne County, NE',
  'box-butte': 'Box Butte County, NE',
  'red-willow': 'Red Willow County, NE',
  kearney: 'Kearney County, NE',
  wayne: 'Wayne County, NE',
  hamilton: 'Hamilton County, NE',
  butler: 'Butler County, NE',
  brown: 'Brown County, NE',
  pierce: 'Pierce County, NE',
  stanton: 'Stanton County, NE',
  polk: 'Polk County, NE',
  nemaha: 'Nemaha County, NE',
  boone: 'Boone County, NE',
  jefferson: 'Jefferson County, NE',
  johnson: 'Johnson County, NE',
  grant: 'Grant County, NE',
  perkins: 'Perkins County, NE',
  sheridan: 'Sheridan County, NE',
  sioux: 'Sioux County, NE',
  logan: 'Logan County, NE',
  franklin: 'Franklin County, NE',
  garfield: 'Garfield County, NE',
  greeley: 'Greeley County, NE',
  harlan: 'Harlan County, NE',
  kimball: 'Kimball County, NE',
  nuckolls: 'Nuckolls County, NE',
  pawnee: 'Pawnee County, NE',
  webster: 'Webster County, NE',
  wheeler: 'Wheeler County, NE',
  deuel: 'Deuel County, NE',
};
'@
$text = $text.Replace($oldLabels, $newLabels)

# NE_NEIGHBORS from geo
$json = Get-Content (Join-Path $root 'public/geo/counties/nebraska.json') -Raw | ConvertFrom-Json
function Parse-PathPoints([string]$path) {
  $points = New-Object System.Collections.Generic.List[object]
  $cx = 0.0; $cy = 0.0; $sx = 0.0; $sy = 0.0
  $matches = [regex]::Matches($path, '([MLHVCSQTAZ])([^MLHVCSQTAZ]*)', 'IgnoreCase')
  foreach ($m in $matches) {
    $cmd = $m.Groups[1].Value.ToUpper()
    $nums = @(); foreach ($n in ($m.Groups[2].Value -split '[\s,]+' | Where-Object { $_ -ne '' })) { $nums += [double]$n }
    switch ($cmd) {
      'M' { for ($i = 0; $i -lt $nums.Count; $i += 2) { $cx = $nums[$i]; $cy = $nums[$i+1]; if ($i -eq 0) { $sx = $cx; $sy = $cy }; [void]$points.Add(@($cx, $cy)) } }
      'L' { for ($i = 0; $i -lt $nums.Count; $i += 2) { $cx = $nums[$i]; $cy = $nums[$i+1]; [void]$points.Add(@($cx, $cy)) } }
      'H' { foreach ($x in $nums) { $cx = $x; [void]$points.Add(@($cx, $cy)) } }
      'V' { foreach ($y in $nums) { $cy = $y; [void]$points.Add(@($cx, $cy)) } }
      'Z' { [void]$points.Add(@($sx, $sy)) }
    }
  }
  return $points
}
function Get-BBox($points) {
  $minX = [double]::MaxValue; $minY = [double]::MaxValue; $maxX = [double]::MinValue; $maxY = [double]::MinValue
  foreach ($p in $points) {
    if ($p[0] -lt $minX) { $minX = $p[0] }; if ($p[1] -lt $minY) { $minY = $p[1] }
    if ($p[0] -gt $maxX) { $maxX = $p[0] }; if ($p[1] -gt $maxY) { $maxY = $p[1] }
  }
  return @{ minX = $minX; minY = $minY; maxX = $maxX; maxY = $maxY }
}
function BBoxOverlap($a, $b, $tol = 0.5) {
  return -not ($a.maxX -lt ($b.minX - $tol) -or $b.maxX -lt ($a.minX - $tol) -or $a.maxY -lt ($b.minY - $tol) -or $b.maxY -lt ($a.minY - $tol))
}
function Dist($p1, $p2) { $dx = $p1[0] - $p2[0]; $dy = $p1[1] - $p2[1]; [math]::Sqrt($dx * $dx + $dy * $dy) }
function Get-Segments($points) {
  $segs = @(); for ($i = 0; $i -lt $points.Count - 1; $i++) { $segs += , @($points[$i], $points[$i + 1]) }; return $segs
}
function SegDist($s1, $s2) {
  $min = [double]::MaxValue
  foreach ($p in $s1) { foreach ($q in $s2) { $d = Dist $p $q; if ($d -lt $min) { $min = $d } } }
  return $min
}
function Format-SlugKey([string]$slug) {
  if ($slug -match '[^a-z]') { return "'$slug'" }
  return $slug
}
function Format-SlugVal([string]$slug) {
  if ($slug -match "'") { return '"' + $slug + '"' }
  return "'$slug'"
}

$counties = @()
foreach ($c in $json.counties) {
  $pts = Parse-PathPoints $c.path
  $counties += [pscustomobject]@{ slug = $c.slug; bbox = (Get-BBox $pts); segs = (Get-Segments $pts) }
}
$neighbors = @{}
foreach ($c in $counties) { $neighbors[$c.slug] = New-Object System.Collections.Generic.HashSet[string] }
for ($i = 0; $i -lt $counties.Count; $i++) {
  for ($j = $i + 1; $j -lt $counties.Count; $j++) {
    $a = $counties[$i]; $b = $counties[$j]
    if (-not (BBoxOverlap $a.bbox $b.bbox)) { continue }
    $shared = $false
    foreach ($sa in $a.segs) {
      foreach ($sb in $b.segs) { if ((SegDist $sa $sb) -lt 0.15) { $shared = $true; break } }
      if ($shared) { break }
    }
    if ($shared) {
      [void]$neighbors[$a.slug].Add($b.slug)
      [void]$neighbors[$b.slug].Add($a.slug)
    }
  }
}

$neighborLines = New-Object System.Collections.Generic.List[string]
[void]$neighborLines.Add('const NE_NEIGHBORS: Record<string, string[]> = {')
foreach ($s in ($neighbors.Keys | Sort-Object)) {
  $arr = @($neighbors[$s] | Sort-Object)
  $vals = ($arr | ForEach-Object { Format-SlugVal $_ }) -join ', '
  [void]$neighborLines.Add("  $(Format-SlugKey $s): [$vals],")
}
[void]$neighborLines.Add('};')
$newNeighbors = $neighborLines -join "`n"
$text = [regex]::Replace($text, 'const NE_NEIGHBORS: Record<string, string\[\]> = \{[\s\S]*?\};', $newNeighbors)

# CROSS_BORDER
$oldCross = @'
const CROSS_BORDER: Partial<Record<string, CrossBorder[]>> = {
  douglas: [
    {
      slug: 'pottawattamie',
      stateSlug: 'iowa',
      name: 'Pottawattamie',
      seat: 'Council Bluffs',
      displayLabel: 'Pottawattamie County, IA',
    },
  ],
  sarpy: [
    {
      slug: 'pottawattamie',
      stateSlug: 'iowa',
      name: 'Pottawattamie',
      seat: 'Council Bluffs',
      displayLabel: 'Pottawattamie County, IA',
    },
    {
      slug: 'mills',
      stateSlug: 'iowa',
      name: 'Mills',
      seat: 'Glenwood',
      displayLabel: 'Mills County, IA',
    },
  ],
  cass: [
    {
      slug: 'mills',
      stateSlug: 'iowa',
      name: 'Mills',
      seat: 'Glenwood',
      displayLabel: 'Mills County, IA',
    },
    {
      slug: 'pottawattamie',
      stateSlug: 'iowa',
      name: 'Pottawattamie',
      seat: 'Council Bluffs',
      displayLabel: 'Pottawattamie County, IA',
    },
  ],
  dakota: [
    {
      slug: 'woodbury',
      stateSlug: 'iowa',
      name: 'Woodbury',
      seat: 'Sioux City',
      displayLabel: 'Woodbury County, IA',
    },
  ],
};
'@
$newCross = @'
const CROSS_BORDER: Partial<Record<string, CrossBorder[]>> = {
  douglas: [
    {
      slug: 'pottawattamie',
      stateSlug: 'iowa',
      name: 'Pottawattamie',
      seat: 'Council Bluffs',
      displayLabel: 'Pottawattamie County, IA',
    },
  ],
  sarpy: [
    {
      slug: 'pottawattamie',
      stateSlug: 'iowa',
      name: 'Pottawattamie',
      seat: 'Council Bluffs',
      displayLabel: 'Pottawattamie County, IA',
    },
    {
      slug: 'mills',
      stateSlug: 'iowa',
      name: 'Mills',
      seat: 'Glenwood',
      displayLabel: 'Mills County, IA',
    },
  ],
  cass: [
    {
      slug: 'mills',
      stateSlug: 'iowa',
      name: 'Mills',
      seat: 'Glenwood',
      displayLabel: 'Mills County, IA',
    },
    {
      slug: 'pottawattamie',
      stateSlug: 'iowa',
      name: 'Pottawattamie',
      seat: 'Council Bluffs',
      displayLabel: 'Pottawattamie County, IA',
    },
  ],
  dakota: [
    {
      slug: 'woodbury',
      stateSlug: 'iowa',
      name: 'Woodbury',
      seat: 'Sioux City',
      displayLabel: 'Woodbury County, IA',
    },
  ],
  washington: [
    {
      slug: 'burt',
      stateSlug: 'iowa',
      name: 'Burt',
      seat: 'Tekamah',
      displayLabel: 'Burt County, IA',
    },
  ],
  burt: [
    {
      slug: 'burt',
      stateSlug: 'iowa',
      name: 'Burt',
      seat: 'Tekamah',
      displayLabel: 'Burt County, IA',
    },
  ],
  thurston: [
    {
      slug: 'woodbury',
      stateSlug: 'iowa',
      name: 'Woodbury',
      seat: 'Sioux City',
      displayLabel: 'Woodbury County, IA',
    },
  ],
  dixon: [
    {
      slug: 'union',
      stateSlug: 'south-dakota',
      name: 'Union',
      seat: 'Elk Point',
      displayLabel: 'Union County, SD',
    },
  ],
  cedar: [
    {
      slug: 'union',
      stateSlug: 'south-dakota',
      name: 'Union',
      seat: 'Elk Point',
      displayLabel: 'Union County, SD',
    },
  ],
  richardson: [
    {
      slug: 'doniphan',
      stateSlug: 'kansas',
      name: 'Doniphan',
      seat: 'Troy',
      displayLabel: 'Doniphan County, KS',
    },
  ],
  nemaha: [
    {
      slug: 'brown',
      stateSlug: 'kansas',
      name: 'Brown',
      seat: 'Hiawatha',
      displayLabel: 'Brown County, KS',
    },
  ],
  pawnee: [
    {
      slug: 'marshall',
      stateSlug: 'kansas',
      name: 'Marshall',
      seat: 'Marysville',
      displayLabel: 'Marshall County, KS',
    },
  ],
  gage: [
    {
      slug: 'marshall',
      stateSlug: 'kansas',
      name: 'Marshall',
      seat: 'Marysville',
      displayLabel: 'Marshall County, KS',
    },
  ],
  jefferson: [
    {
      slug: 'washington',
      stateSlug: 'kansas',
      name: 'Washington',
      seat: 'Washington',
      displayLabel: 'Washington County, KS',
    },
  ],
  thayer: [
    {
      slug: 'jefferson',
      stateSlug: 'kansas',
      name: 'Jefferson',
      seat: 'Oskaloosa',
      displayLabel: 'Jefferson County, KS',
    },
  ],
  nuckolls: [
    {
      slug: 'jewell',
      stateSlug: 'kansas',
      name: 'Jewell',
      seat: 'Mankato',
      displayLabel: 'Jewell County, KS',
    },
  ],
  webster: [
    {
      slug: 'smith',
      stateSlug: 'kansas',
      name: 'Smith',
      seat: 'Smith Center',
      displayLabel: 'Smith County, KS',
    },
  ],
  franklin: [
    {
      slug: 'phillips',
      stateSlug: 'kansas',
      name: 'Phillips',
      seat: 'Phillipsburg',
      displayLabel: 'Phillips County, KS',
    },
  ],
  harlan: [
    {
      slug: 'norton',
      stateSlug: 'kansas',
      name: 'Norton',
      seat: 'Norton',
      displayLabel: 'Norton County, KS',
    },
  ],
  furnas: [
    {
      slug: 'norton',
      stateSlug: 'kansas',
      name: 'Norton',
      seat: 'Norton',
      displayLabel: 'Norton County, KS',
    },
  ],
  'red-willow': [
    {
      slug: 'rawlins',
      stateSlug: 'kansas',
      name: 'Rawlins',
      seat: 'Atwood',
      displayLabel: 'Rawlins County, KS',
    },
  ],
  hitchcock: [
    {
      slug: 'rawlins',
      stateSlug: 'kansas',
      name: 'Rawlins',
      seat: 'Atwood',
      displayLabel: 'Rawlins County, KS',
    },
  ],
  dundy: [
    {
      slug: 'cheyenne',
      stateSlug: 'kansas',
      name: 'Cheyenne',
      seat: 'St. Francis',
      displayLabel: 'Cheyenne County, KS',
    },
  ],
  chase: [
    {
      slug: 'yuma',
      stateSlug: 'colorado',
      name: 'Yuma',
      seat: 'Wray',
      displayLabel: 'Yuma County, CO',
    },
  ],
  cheyenne: [
    {
      slug: 'logan',
      stateSlug: 'colorado',
      name: 'Logan',
      seat: 'Sterling',
      displayLabel: 'Logan County, CO',
    },
  ],
  deuel: [
    {
      slug: 'logan',
      stateSlug: 'colorado',
      name: 'Logan',
      seat: 'Sterling',
      displayLabel: 'Logan County, CO',
    },
  ],
  perkins: [
    {
      slug: 'sedgwick',
      stateSlug: 'colorado',
      name: 'Sedgwick',
      seat: 'Julesburg',
      displayLabel: 'Sedgwick County, CO',
    },
  ],
  sioux: [
    {
      slug: 'fall-river',
      stateSlug: 'south-dakota',
      name: 'Fall River',
      seat: 'Hot Springs',
      displayLabel: 'Fall River County, SD',
    },
  ],
  dawes: [
    {
      slug: 'fall-river',
      stateSlug: 'south-dakota',
      name: 'Fall River',
      seat: 'Hot Springs',
      displayLabel: 'Fall River County, SD',
    },
  ],
  'box-butte': [
    {
      slug: 'fall-river',
      stateSlug: 'south-dakota',
      name: 'Fall River',
      seat: 'Hot Springs',
      displayLabel: 'Fall River County, SD',
    },
  ],
  banner: [
    {
      slug: 'goshen',
      stateSlug: 'wyoming',
      name: 'Goshen',
      seat: 'Torrington',
      displayLabel: 'Goshen County, WY',
    },
  ],
  'scotts-bluff': [
    {
      slug: 'goshen',
      stateSlug: 'wyoming',
      name: 'Goshen',
      seat: 'Torrington',
      displayLabel: 'Goshen County, WY',
    },
  ],
  kimball: [
    {
      slug: 'cheyenne',
      stateSlug: 'colorado',
      name: 'Cheyenne',
      seat: 'Cheyenne Wells',
      displayLabel: 'Cheyenne County, CO',
    },
    {
      slug: 'laramie',
      stateSlug: 'wyoming',
      name: 'Laramie',
      seat: 'Cheyenne',
      displayLabel: 'Laramie County, WY',
    },
  ],
};
'@
$text = $text.Replace($oldCross, $newCross)

# Insert batch 2 counties before COUNTIES array close
$batch2 = Get-Content (Join-Path $PSScriptRoot 'ne-batch2-counties-snippet.txt') -Raw
$batch2 = $batch2.Trim()
$batch2 = $batch2 -replace "seat: 'O'Neill'", 'seat: "O''Neill"'
$batch2 = $batch2 -replace "city: 'O'Neill'", 'city: "O''Neill"'
$batch2 = $batch2 -replace "topName: 'Regional O'Neill / Holt Providers'", 'topName: "Regional O''Neill / Holt Providers"'
$batch2 = $batch2 -replace "regional1Name: 'O'Neill Corridor Moving'", 'regional1Name: "O''Neill Corridor Moving"'
$insertMarker = @'
    tipVariant: 'rural',
  },
];

const SEAT_BY_SLUG
'@
$insertReplacement = @"
    tipVariant: 'rural',
  },
$batch2
];

const SEAT_BY_SLUG
"@
if (-not $text.Contains($insertMarker)) { throw 'Could not find batch1 end marker' }
$text = $text.Replace($insertMarker, $insertReplacement)

# NON_CURATED_NAMES empty
$oldNon = [regex]::Match($text, 'const NON_CURATED_NAMES: Record<string, \{ name: string; seat: string \}> = \{[\s\S]*?\};').Value
$text = $text.Replace($oldNon, 'const NON_CURATED_NAMES: Record<string, { name: string; seat: string }> = {};')

# Update batch comments
$text = $text -replace 'batch 1 \(21 counties\)', 'all 93 counties'
$text = $text -replace 'batch 1 — 21 counties', 'all 93 counties'

$utf8 = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText($out, $text, $utf8)
Write-Host "Wrote $out"
Write-Host "COUNTIES blocks: $(([regex]::Matches($text, 'slug:')).Count)"