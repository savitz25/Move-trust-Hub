# PowerShell fallback when tsx is unavailable locally.
# Mirrors apply-missouri-mover-expansion.ts using metro pool mover lists from seed data.
$ErrorActionPreference = 'Stop'
Set-Location (Join-Path $PSScriptRoot '..')

$assignmentsPath = 'data/missouri-county-assignments.ts'
$content = Get-Content $assignmentsPath -Raw

$MAJOR = [System.Collections.Generic.HashSet[string]]::new(
  [string[]]@(
    'st-louis','st-louis-city','jackson','st-charles','greene','clay','jefferson',
    'boone','platte','cass','franklin','jasper','buchanan'
  )
)

$POOLS = @{
  'st-louis-metro-mo' = @(
    'two-men-and-a-truck-st-louis-mo','all-my-sons-st-louis-mo','missouri-premier-moving',
    'missouri-pro-movers','missouri-family-movers','college-hunks-st-louis-mo',
    'coleman-worldwide-st-louis-mo','north-american-van-lines-st-louis-mo',
    'missouri-county-moving-co','missouri-express-movers'
  )
  'kansas-city-metro-mo' = @(
    'two-men-and-a-truck-jackson-mo','all-my-sons-kansas-city-mo','missouri-local-lines',
    'missouri-premier-moving','missouri-pro-movers','missouri-family-movers',
    'college-hunks-kansas-city-mo','coleman-worldwide-kansas-city-mo',
    'north-american-van-lines-kansas-city-mo','missouri-express-movers'
  )
  'springfield-metro-mo' = @(
    'two-men-and-a-truck-greene-mo','all-my-sons-springfield-mo','missouri-premier-moving',
    'missouri-pro-movers','missouri-family-movers','college-hunks-springfield-mo',
    'coleman-worldwide-springfield-mo','north-american-van-lines-springfield-mo',
    'missouri-regional-moving','missouri-express-movers'
  )
  'st-louis-metro-west-mo' = @(
    'regional-warren-mo-movers','two-men-and-a-truck-st-charles-mo','two-men-and-a-truck-st-louis-mo',
    'all-my-sons-st-louis-mo','missouri-premier-moving','missouri-pro-movers',
    'missouri-family-movers','college-hunks-st-louis-mo','coleman-worldwide-st-louis-mo',
    'north-american-van-lines-st-louis-mo','missouri-express-movers'
  )
  'kansas-city-metro-north-mo' = @(
    'regional-clinton-mo-movers','two-men-and-a-truck-clay-mo','two-men-and-a-truck-jackson-mo',
    'all-my-sons-kansas-city-mo','missouri-local-lines','missouri-premier-moving',
    'missouri-pro-movers','college-hunks-kansas-city-mo','coleman-worldwide-kansas-city-mo',
    'north-american-van-lines-kansas-city-mo','missouri-family-movers'
  )
  'st-louis-metro-south-mo' = @(
    'two-men-and-a-truck-jefferson-mo','two-men-and-a-truck-st-louis-mo','all-my-sons-st-louis-mo',
    'missouri-premier-moving','missouri-pro-movers','missouri-family-movers',
    'college-hunks-st-louis-mo','coleman-worldwide-st-louis-mo','north-american-van-lines-st-louis-mo',
    'missouri-express-movers'
  )
  'columbia-metro-mo' = @(
    'two-men-and-a-truck-boone-mo','all-my-sons-columbia-mo','missouri-capital-movers',
    'missouri-premier-moving','missouri-pro-movers','missouri-family-movers',
    'college-hunks-columbia-mo','coleman-worldwide-columbia-mo','north-american-van-lines-columbia-mo',
    'missouri-regional-moving'
  )
  'joplin-metro-mo' = @(
    'two-men-and-a-truck-jasper-mo','all-my-sons-joplin-mo','missouri-premier-moving',
    'missouri-pro-movers','missouri-family-movers','college-hunks-joplin-mo',
    'coleman-worldwide-joplin-mo','north-american-van-lines-joplin-mo','missouri-regional-moving',
    'missouri-express-movers'
  )
  'kansas-city-metro-south-mo' = @(
    'two-men-and-a-truck-cass-mo','two-men-and-a-truck-jackson-mo','all-my-sons-kansas-city-mo',
    'missouri-local-lines','missouri-premier-moving','missouri-pro-movers',
    'college-hunks-kansas-city-mo','coleman-worldwide-kansas-city-mo',
    'north-american-van-lines-kansas-city-mo','missouri-family-movers'
  )
  'kansas-city-metro-northwest-mo' = @(
    'two-men-and-a-truck-platte-mo','two-men-and-a-truck-clay-mo','all-my-sons-kansas-city-mo',
    'missouri-local-lines','missouri-premier-moving','missouri-pro-movers',
    'college-hunks-kansas-city-mo','coleman-worldwide-kansas-city-mo',
    'north-american-van-lines-kansas-city-mo','missouri-family-movers'
  )
  'st-joseph-metro-mo' = @(
    'two-men-and-a-truck-buchanan-mo','all-my-sons-st-joseph-mo','missouri-premier-moving',
    'missouri-pro-movers','missouri-family-movers','college-hunks-st-joseph-mo',
    'coleman-worldwide-st-joseph-mo','north-american-van-lines-st-joseph-mo',
    'missouri-regional-moving','missouri-express-movers'
  )
  'jefferson-city-metro-mo' = @(
    'two-men-and-a-truck-cole-mo','all-my-sons-jefferson-city-mo','missouri-capital-movers',
    'missouri-premier-moving','missouri-pro-movers','missouri-family-movers',
    'college-hunks-jefferson-city-mo','coleman-worldwide-jefferson-city-mo',
    'north-american-van-lines-jefferson-city-mo','missouri-regional-moving'
  )
}

$overrides = Get-Content 'lib/local-movers/geography/missouri-overrides.ts' -Raw
$COUNTY_METRO = @{}
foreach ($m in [regex]::Matches($overrides, "  '?([\w-]+)'?: \{ seat: '[^']+', metro: '([^']+)' \}")) {
  $COUNTY_METRO[$m.Groups[1].Value] = $m.Groups[2].Value
}

$FALLBACK = @(
  'st-louis-metro-mo','kansas-city-metro-mo','springfield-metro-mo','st-louis-metro-west-mo',
  'kansas-city-metro-north-mo','st-louis-metro-south-mo','columbia-metro-mo','joplin-metro-mo',
  'kansas-city-metro-south-mo','kansas-city-metro-northwest-mo','st-joseph-metro-mo','jefferson-city-metro-mo'
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

$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText((Join-Path (Get-Location) $assignmentsPath), $content, $utf8NoBom)
Write-Host "Updated $($assignmentMap.Count) Missouri county assignments."