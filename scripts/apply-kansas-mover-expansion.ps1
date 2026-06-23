# PowerShell fallback when tsx is unavailable locally.
# Mirrors apply-kansas-mover-expansion.ts using metro pool mover lists from seed data.
$ErrorActionPreference = 'Stop'
Set-Location (Join-Path $PSScriptRoot '..')

$assignmentsPath = 'data/kansas-county-assignments.ts'
$content = Get-Content $assignmentsPath -Raw

$MAJOR = [System.Collections.Generic.HashSet[string]]::new(
  [string[]]@(
    'johnson','sedgwick','shawnee','wyandotte','douglas','butler','riley','reno',
    'saline','crawford','ellis','ford','finney'
  )
)

$POOLS = @{
  'kansas-city-metro-ks' = @(
    'two-men-and-a-truck-johnson-ks','two-men-and-a-truck-wyandotte-ks','two-men-and-a-truck-leavenworth-ks',
    'all-my-sons-kansas-city-ks','kansas-premier-moving','kansas-pro-movers','kansas-family-movers',
    'college-hunks-kansas-city-ks','coleman-worldwide-kansas-city-ks','north-american-van-lines-kansas-city-ks',
    'kansas-county-moving-co','kansas-express-movers'
  )
  'wichita-metro-ks' = @(
    'two-men-and-a-truck-sedgwick-ks','all-my-sons-wichita-ks','kansas-local-lines','kansas-express-movers',
    'kansas-regional-moving','college-hunks-wichita-ks','coleman-worldwide-wichita-ks',
    'north-american-van-lines-wichita-ks','kansas-pro-movers','kansas-family-movers'
  )
  'topeka-metro-ks' = @(
    'two-men-and-a-truck-shawnee-ks','all-my-sons-topeka-ks','kansas-capital-movers','kansas-family-movers',
    'kansas-county-moving-co','college-hunks-topeka-ks','coleman-worldwide-topeka-ks',
    'north-american-van-lines-topeka-ks','kansas-express-movers','kansas-regional-moving'
  )
  'lawrence-metro-ks' = @(
    'two-men-and-a-truck-douglas-ks','all-my-sons-lawrence-ks','college-hunks-lawrence-ks','kansas-local-lines',
    'kansas-express-movers','kansas-regional-moving','coleman-worldwide-kansas-city-ks',
    'north-american-van-lines-kansas-city-ks','kansas-capital-movers','kansas-family-movers'
  )
  'manhattan-metro-ks' = @(
    'two-men-and-a-truck-riley-ks','all-my-sons-manhattan-ks','college-hunks-manhattan-ks','kansas-capital-movers',
    'kansas-family-movers','kansas-county-moving-co','coleman-worldwide-topeka-ks',
    'north-american-van-lines-topeka-ks','kansas-express-movers','kansas-regional-moving'
  )
  'wichita-metro-east-ks' = @(
    'regional-butler-ks-movers','two-men-and-a-truck-sedgwick-ks','all-my-sons-wichita-ks','kansas-local-lines',
    'kansas-express-movers','kansas-regional-moving','college-hunks-wichita-ks','coleman-worldwide-wichita-ks',
    'north-american-van-lines-wichita-ks','kansas-pro-movers'
  )
  'hutchinson-metro-ks' = @(
    'regional-reno-ks-movers','two-men-and-a-truck-sedgwick-ks','all-my-sons-wichita-ks','kansas-local-lines',
    'kansas-express-movers','kansas-regional-moving','college-hunks-wichita-ks','north-american-van-lines-wichita-ks',
    'kansas-pro-movers','kansas-family-movers'
  )
  'salina-metro-ks' = @(
    'regional-saline-ks-movers','two-men-and-a-truck-sedgwick-ks','all-my-sons-wichita-ks','kansas-local-lines',
    'kansas-express-movers','kansas-regional-moving','college-hunks-wichita-ks','kansas-capital-movers',
    'kansas-pro-movers','kansas-family-movers'
  )
  'pittsburg-metro-ks' = @(
    'regional-crawford-ks-movers','two-men-and-a-truck-sedgwick-ks','all-my-sons-wichita-ks','kansas-local-lines',
    'kansas-express-movers','kansas-regional-moving','kansas-pro-movers','kansas-family-movers',
    'college-hunks-wichita-ks','coleman-worldwide-wichita-ks'
  )
  'garden-city-metro-ks' = @(
    'regional-finney-ks-movers','two-men-and-a-truck-sedgwick-ks','all-my-sons-wichita-ks','kansas-local-lines',
    'kansas-express-movers','kansas-regional-moving','kansas-pro-movers','kansas-county-moving-co',
    'kansas-family-movers','college-hunks-wichita-ks'
  )
  'dodge-city-metro-ks' = @(
    'regional-ford-ks-movers','two-men-and-a-truck-sedgwick-ks','all-my-sons-wichita-ks','kansas-local-lines',
    'kansas-express-movers','kansas-regional-moving','kansas-pro-movers','kansas-family-movers',
    'college-hunks-wichita-ks','coleman-worldwide-wichita-ks'
  )
  'hays-metro-ks' = @(
    'regional-ellis-ks-movers','two-men-and-a-truck-sedgwick-ks','all-my-sons-wichita-ks','kansas-local-lines',
    'kansas-express-movers','kansas-regional-moving','kansas-pro-movers','kansas-family-movers',
    'college-hunks-wichita-ks','kansas-capital-movers'
  )
  'kansas-city-metro-south-ks' = @(
    'regional-miami-ks-movers','two-men-and-a-truck-johnson-ks','all-my-sons-kansas-city-ks','kansas-premier-moving',
    'kansas-pro-movers','college-hunks-kansas-city-ks','coleman-worldwide-kansas-city-ks',
    'north-american-van-lines-kansas-city-ks','kansas-family-movers','kansas-express-movers'
  )
}

# Parse county -> metro from kansas-overrides.ts
$overrides = Get-Content 'lib/local-movers/geography/kansas-overrides.ts' -Raw
$COUNTY_METRO = @{}
foreach ($m in [regex]::Matches($overrides, "  '?([\w-]+)'?: \{ seat: '[^']+', metro: '([^']+)' \}")) {
  $COUNTY_METRO[$m.Groups[1].Value] = $m.Groups[2].Value
}

$FALLBACK = @(
  'wichita-metro-ks','kansas-city-metro-ks','topeka-metro-ks','lawrence-metro-ks','manhattan-metro-ks',
  'wichita-metro-east-ks','hutchinson-metro-ks','salina-metro-ks','pittsburg-metro-ks','garden-city-metro-ks',
  'dodge-city-metro-ks','hays-metro-ks','kansas-city-metro-south-ks'
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
Write-Host "Updated $($assignmentMap.Count) Kansas county assignments."