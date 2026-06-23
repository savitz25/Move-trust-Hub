# PowerShell fallback when tsx is unavailable locally.
# Mirrors apply-louisiana-mover-expansion.ts using metro pool mover lists from seed data.
$ErrorActionPreference = 'Stop'
Set-Location (Join-Path $PSScriptRoot '..')

$assignmentsPath = 'data/louisiana-county-assignments.ts'
$content = Get-Content $assignmentsPath -Raw

$MAJOR = [System.Collections.Generic.HashSet[string]]::new(
  [string[]]@(
    'orleans','jefferson','east-baton-rouge','st-tammany','lafayette','caddo',
    'calcasieu','bossier','livingston','tangipahoa','ascension','terrebonne',
    'rapides','ouachita','st-landry'
  )
)

$POOLS = @{
  'baton-rouge-metro-la' = @(
    'two-men-and-a-truck-baton-rouge-la','atmosphere-movers-baton-rouge-la','all-my-sons-baton-rouge-la',
    'lee-moving-storage-baton-rouge-la','coleman-worldwide-baton-rouge-la','north-american-van-lines-baton-rouge-la',
    'ds-moving-services-baton-rouge-la','quality-group-baton-rouge-la','college-hunks-baton-rouge-la','fisk-moving-baton-rouge-la'
  )
  'new-orleans-metro-la' = @(
    'two-men-and-a-truck-jefferson-la','two-men-and-a-truck-orleans-la','all-my-sons-new-orleans-la',
    'louisiana-express-movers','louisiana-local-lines','coleman-worldwide-new-orleans-la',
    'north-american-van-lines-new-orleans-la','college-hunks-new-orleans-la','smooth-moves-nola-la','louisiana-regional-moving'
  )
  'north-shore-metro-la' = @(
    'two-men-and-a-truck-st-tammany-la','two-men-and-a-truck-jefferson-la','all-my-sons-new-orleans-la',
    'louisiana-express-movers','louisiana-local-lines','coleman-worldwide-new-orleans-la',
    'college-hunks-new-orleans-la','north-american-van-lines-new-orleans-la','smooth-moves-nola-la','louisiana-regional-moving'
  )
  'lafayette-metro-la' = @(
    'two-men-and-a-truck-lafayette-la','all-my-sons-lafayette-la','acadiana-moving-lafayette-la',
    'coleman-worldwide-lafayette-la','college-hunks-lafayette-la','regional-st-landry-la-movers',
    'regional-iberia-la-movers','regional-vermilion-la-movers','regional-acadia-la-movers','regional-st-martin-la-movers'
  )
  'shreveport-bossier-metro-la' = @(
    'two-men-and-a-truck-caddo-la','two-men-and-a-truck-bossier-la','louisiana-premier-moving',
    'louisiana-pro-movers','all-my-sons-shreveport-la','coleman-worldwide-shreveport-la',
    'shreveport-la-area-moving','north-american-van-lines-baton-rouge-la','college-hunks-baton-rouge-la','louisiana-express-movers'
  )
  'lake-charles-metro-la' = @(
    'two-men-and-a-truck-calcasieu-la','all-my-sons-lake-charles-la','coleman-worldwide-baton-rouge-la',
    'two-men-and-a-truck-lafayette-la','all-my-sons-lafayette-la','louisiana-express-movers',
    'college-hunks-baton-rouge-la','atmosphere-movers-baton-rouge-la','louisiana-family-movers','acadiana-moving-lafayette-la'
  )
  'monroe-metro-la' = @(
    'two-men-and-a-truck-ouachita-la','all-my-sons-monroe-la','louisiana-premier-moving',
    'louisiana-pro-movers','shreveport-la-area-moving','two-men-and-a-truck-caddo-la',
    'coleman-worldwide-shreveport-la','all-my-sons-shreveport-la','college-hunks-baton-rouge-la','louisiana-express-movers'
  )
  'hammond-metro-la' = @(
    'two-men-and-a-truck-tangipahoa-la','two-men-and-a-truck-st-tammany-la','two-men-and-a-truck-livingston-la',
    'all-my-sons-new-orleans-la','two-men-and-a-truck-baton-rouge-la','all-my-sons-baton-rouge-la',
    'coleman-worldwide-new-orleans-la','college-hunks-new-orleans-la','smooth-moves-nola-la','atmosphere-movers-baton-rouge-la'
  )
  'alexandria-metro-la' = @(
    'two-men-and-a-truck-rapides-la','louisiana-premier-moving','louisiana-pro-movers',
    'all-my-sons-shreveport-la','two-men-and-a-truck-caddo-la','coleman-worldwide-shreveport-la',
    'shreveport-la-area-moving','two-men-and-a-truck-ouachita-la','all-my-sons-monroe-la','louisiana-express-movers'
  )
  'houma-bayou-metro-la' = @(
    'two-men-and-a-truck-terrebonne-la','two-men-and-a-truck-lafourche-la','regional-st-mary-la-movers',
    'two-men-and-a-truck-baton-rouge-la','all-my-sons-baton-rouge-la','atmosphere-movers-baton-rouge-la',
    'coleman-worldwide-baton-rouge-la','two-men-and-a-truck-ascension-la','louisiana-family-movers','college-hunks-baton-rouge-la'
  )
  'ruston-metro-la' = @(
    'regional-lincoln-la-movers','two-men-and-a-truck-ouachita-la','all-my-sons-monroe-la',
    'louisiana-premier-moving','louisiana-pro-movers','two-men-and-a-truck-caddo-la',
    'shreveport-la-area-moving','all-my-sons-shreveport-la','coleman-worldwide-shreveport-la','louisiana-express-movers'
  )
  'natchitoches-metro-la' = @(
    'regional-natchitoches-la-movers','two-men-and-a-truck-caddo-la','louisiana-premier-moving',
    'louisiana-pro-movers','two-men-and-a-truck-rapides-la','all-my-sons-shreveport-la',
    'regional-de-soto-la-movers','shreveport-la-area-moving'
  )
  'leesville-metro-la' = @(
    'regional-vernon-la-movers','two-men-and-a-truck-rapides-la','regional-beauregard-la-movers',
    'louisiana-premier-moving','two-men-and-a-truck-caddo-la','all-my-sons-shreveport-la',
    'coleman-worldwide-shreveport-la','louisiana-express-movers'
  )
}

$COUNTY_METRO = @{
  'east-baton-rouge'='baton-rouge-metro-la'; jefferson='new-orleans-metro-la'; orleans='new-orleans-metro-la'
  'st-tammany'='north-shore-metro-la'; lafayette='lafayette-metro-la'; caddo='shreveport-bossier-metro-la'
  calcasieu='lake-charles-metro-la'; ouachita='monroe-metro-la'; livingston='baton-rouge-metro-la'
  tangipahoa='hammond-metro-la'; ascension='baton-rouge-metro-la'; bossier='shreveport-bossier-metro-la'
  rapides='alexandria-metro-la'; terrebonne='houma-bayou-metro-la'; lafourche='houma-bayou-metro-la'
  'st-landry'='lafayette-metro-la'; 'west-feliciana'='baton-rouge-metro-la'; claiborne='shreveport-bossier-metro-la'
  bienville='shreveport-bossier-metro-la'; 'st-helena'='hammond-metro-la'; caldwell='monroe-metro-la'
  'west-carroll'='monroe-metro-la'; madison='monroe-metro-la'; catahoula='alexandria-metro-la'
  'red-river'='shreveport-bossier-metro-la'; 'east-carroll'='monroe-metro-la'; cameron='lake-charles-metro-la'
  tensas='monroe-metro-la'
}

$FALLBACK = @(
  'baton-rouge-metro-la','new-orleans-metro-la','north-shore-metro-la','lafayette-metro-la',
  'shreveport-bossier-metro-la','lake-charles-metro-la','monroe-metro-la','hammond-metro-la',
  'alexandria-metro-la','houma-bayou-metro-la','ruston-metro-la','natchitoches-metro-la','leesville-metro-la'
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
Write-Host "Updated $($assignmentMap.Count) Louisiana parish assignments."