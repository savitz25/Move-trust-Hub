# PowerShell fallback when tsx is unavailable locally.
# Mirrors apply-mississippi-mover-expansion.ts using metro pool mover lists from seed data.
$ErrorActionPreference = 'Stop'
Set-Location (Join-Path $PSScriptRoot '..')

$assignmentsPath = 'data/mississippi-county-assignments.ts'
$content = Get-Content $assignmentsPath -Raw

$MAJOR = [System.Collections.Generic.HashSet[string]]::new(
  [string[]]@(
    'hinds','harrison','desoto','rankin','madison','lee','forrest','lauderdale',
    'jones','lamar','oktibbeha','lowndes','pearl-river','hancock','monroe'
  )
)

$POOLS = @{
  'gulfport-biloxi-metro-ms' = @(
    'two-men-and-a-truck-gulfport-ms','mighty-men-movers-gulfport-ms','good-movers-gulfport-ms',
    'allsouth-moving-mobile','let-us-move-it-mobile','coleman-worldwide-moving-mobile',
    'handy-guys-moving-mobile','all-my-sons-mobile','two-men-and-a-truck-baldwin','motivated-movers-baldwin'
  )
  'jackson-ms-metro-ms' = @(
    'two-men-and-a-truck-jackson-ms','armstrong-relocation-jackson-ms','all-my-sons-jackson-ms',
    'helping-hands-moving-jackson-ms','professional-family-relocation-jackson-ms',
    'central-mississippi-movers-jackson-ms','movemint-brandon-ms','my-two-movers-brandon-ms',
    'strong-brothers-moving-jackson-ms','coleman-worldwide-moving-montgomery'
  )
  'desoto-metro-ms' = @(
    'two-men-and-a-truck-memphis','college-hunks-moving-memphis','all-my-sons-memphis',
    'spyder-moving-memphis','big-league-movers-memphis','my-town-movers-memphis',
    'memphis-mighty-movers-ms','over-and-beyond-movers-desoto-ms','red-carpet-moving-memphis','wrightway-moving-memphis'
  )
  'pascagoula-metro-ms' = @(
    'two-men-and-a-truck-gulfport-ms','ready-movers-moss-point-ms','allsouth-moving-mobile',
    'coleman-worldwide-moving-mobile','handy-guys-moving-mobile','griner-moving-services-mobile',
    'all-my-sons-mobile','mighty-men-movers-gulfport-ms','let-us-move-it-mobile','rs-moving-warehousing-mobile'
  )
  'tupelo-metro-ms' = @(
    'two-men-and-a-truck-tupelo-ms','house-to-house-tupelo-ms','all-star-movers-northeast-ms',
    'two-men-and-a-truck-memphis','spyder-moving-memphis','memphis-mighty-movers-ms',
    'moving-u-ent-meridian-ms','two-men-and-a-truck-jackson-ms','armstrong-relocation-jackson-ms','helping-hands-moving-jackson-ms'
  )
  'hattiesburg-metro-ms' = @(
    'two-men-and-a-truck-hattiesburg-ms','allsouth-moving-mobile','moving-u-ent-meridian-ms',
    'helping-hands-moving-jackson-ms','professional-family-relocation-jackson-ms',
    'central-mississippi-movers-jackson-ms','my-two-movers-brandon-ms','strong-brothers-moving-jackson-ms',
    'armstrong-relocation-jackson-ms','coleman-worldwide-moving-mobile'
  )
  'meridian-metro-ms' = @(
    'moving-u-ent-meridian-ms','tmakit-moving-meridian-ms','on-the-go-meridian-ms',
    'my-two-movers-brandon-ms','helping-hands-moving-jackson-ms','two-men-and-a-truck-jackson-ms',
    'armstrong-relocation-jackson-ms','two-men-and-a-truck-tupelo-ms','all-star-movers-northeast-ms','house-to-house-tupelo-ms'
  )
  'laurel-metro-ms' = @(
    'allsouth-moving-mobile','moving-u-ent-meridian-ms','two-men-and-a-truck-hattiesburg-ms',
    'helping-hands-moving-jackson-ms','professional-family-relocation-jackson-ms',
    'my-two-movers-brandon-ms','on-the-go-meridian-ms','armstrong-relocation-jackson-ms'
  )
  'picayune-metro-ms' = @(
    'mighty-men-movers-gulfport-ms','allsouth-moving-mobile','two-men-and-a-truck-gulfport-ms',
    'good-movers-gulfport-ms','let-us-move-it-mobile','coleman-worldwide-moving-mobile',
    'handy-guys-moving-mobile','ready-movers-moss-point-ms'
  )
  'oxford-metro-ms' = @(
    'two-men-and-a-truck-oxford-ms','all-star-movers-northeast-ms','house-to-house-tupelo-ms',
    'two-men-and-a-truck-tupelo-ms','two-men-and-a-truck-memphis','spyder-moving-memphis',
    'memphis-mighty-movers-ms','moving-u-ent-meridian-ms'
  )
  'columbus-ms-metro-ms' = @(
    'moving-u-ent-meridian-ms','affordable-help-hamilton-al','tmakit-moving-meridian-ms',
    'on-the-go-meridian-ms','jermaines-handy-service-jackson-ms','my-two-movers-brandon-ms',
    'helping-hands-moving-jackson-ms','two-men-and-a-truck-tupelo-ms'
  )
  'starkville-metro-ms' = @(
    'moving-u-ent-meridian-ms','affordable-help-hamilton-al','tmakit-moving-meridian-ms',
    'on-the-go-meridian-ms','jermaines-handy-service-jackson-ms','my-two-movers-brandon-ms',
    'helping-hands-moving-jackson-ms','two-men-and-a-truck-tupelo-ms'
  )
  'hancock-coastal-ms' = @(
    'mighty-men-movers-gulfport-ms','two-men-and-a-truck-gulfport-ms','good-movers-gulfport-ms',
    'allsouth-moving-mobile','let-us-move-it-mobile','coleman-worldwide-moving-mobile',
    'handy-guys-moving-mobile','ready-movers-moss-point-ms'
  )
}

$COUNTY_METRO = @{
  harrison='gulfport-biloxi-metro-ms'; hinds='jackson-ms-metro-ms'; desoto='desoto-metro-ms'
  rankin='jackson-ms-metro-ms'; jackson='pascagoula-metro-ms'; madison='jackson-ms-metro-ms'
  lee='tupelo-metro-ms'; forrest='hattiesburg-metro-ms'; lauderdale='meridian-metro-ms'
  lamar='hattiesburg-metro-ms'; jones='laurel-metro-ms'; 'pearl-river'='picayune-metro-ms'
  lafayette='oxford-metro-ms'; lowndes='columbus-ms-metro-ms'; oktibbeha='starkville-metro-ms'
  hancock='hancock-coastal-ms'
  walthall='tylertown-metro-ms'; smith='raleigh-ms-metro-ms'; greene='leakesville-metro-ms'
  calhoun='calhoun-city-metro-ms'; amite='liberty-ms-metro-ms'; yalobusha='water-valley-metro-ms'
  lawrence='monticello-ms-metro-ms'; perry='new-augusta-metro-ms'; 'jefferson-davis'='jefferson-davis-metro-ms'
  tallahatchie='charleston-metro-ms'; webster='webster-ms-metro-ms'; noxubee='macon-metro-ms'
  montgomery='winona-metro-ms'; carroll='carrollton-metro-ms'; kemper='de-kalb-metro-ms'
  tunica='tunica-metro-ms'; claiborne='port-gibson-metro-ms'; choctaw='ackerman-metro-ms'
  franklin='meadville-metro-ms'; humphreys='belzoni-metro-ms'; benton='ashland-metro-ms'
  wilkinson='woodville-metro-ms'; jefferson='fayette-ms-metro-ms'; quitman='marks-metro-ms'
  sharkey='rolling-fork-metro-ms'; issaquena='mayersville-metro-ms'; monroe='aberdeen-metro-ms'
}

$FALLBACK = @(
  'jackson-ms-metro-ms','gulfport-biloxi-metro-ms','desoto-metro-ms','tupelo-metro-ms',
  'hattiesburg-metro-ms','meridian-metro-ms','oxford-metro-ms','pascagoula-metro-ms',
  'columbus-ms-metro-ms','starkville-metro-ms','hancock-coastal-ms','picayune-metro-ms','laurel-metro-ms'
)

$blockRegex = [regex]'  (''?[\w-]+''?): \[([\s\S]*?)\],'
$matches = $blockRegex.Matches($content)
$assignmentMap = @{}

foreach ($m in $matches) {
  $slug = $m.Groups[1].Value.Trim("'")
  $ids = [regex]::Matches($m.Groups[2].Value, "'([^']+)'") | ForEach-Object { $_.Groups[1].Value }
  $assignmentMap[$slug] = [System.Collections.Generic.List[string]]::new()
  foreach ($id in $ids) { [void]$assignmentMap[$slug].Add($id) }
}

foreach ($slug in $assignmentMap.Keys) {
  $target = if ($MAJOR.Contains($slug)) { 10 } else { 5 }
  $ids = $assignmentMap[$slug]
  $existing = [System.Collections.Generic.HashSet[string]]::new([string[]]$ids)
  $metro = $COUNTY_METRO[$slug]
  $poolOrder = @()
  if ($metro) { $poolOrder += $metro }
  $poolOrder += $FALLBACK | Where-Object { $_ -ne $metro }

  foreach ($poolId in $poolOrder) {
    if (-not $POOLS.ContainsKey($poolId)) { continue }
    foreach ($id in $POOLS[$poolId]) {
      if ($ids.Count -ge $target) { break }
      if (-not $existing.Contains($id)) {
        $ids.Add($id)
        [void]$existing.Add($id)
      }
    }
    if ($ids.Count -ge $target) { break }
  }

  while ($ids.Count -gt 10) { $ids.RemoveAt($ids.Count - 1) }
}

foreach ($slug in $assignmentMap.Keys) {
  $quoted = if ($slug -match '-') { "'$slug'" } else { $slug }
  $block = "  $quoted`: [`n" + (($assignmentMap[$slug] | ForEach-Object { "    '$_'," }) -join "`n") + "`n  ]"
  $pattern = "  $([regex]::Escape($quoted)): \[[\s\S]*?\],"
  $content = [regex]::Replace($content, $pattern, "$block,", 1)
}

Set-Content -Path $assignmentsPath -Value $content -NoNewline
Write-Host "Updated $($assignmentMap.Count) Mississippi county assignments."