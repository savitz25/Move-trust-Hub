# PowerShell fallback when tsx is unavailable locally.
# Mirrors apply-arkansas-mover-expansion.ts using metro pool mover lists from seed data.
$ErrorActionPreference = 'Stop'
Set-Location (Join-Path $PSScriptRoot '..')

$assignmentsPath = 'data/arkansas-county-assignments.ts'
$content = Get-Content $assignmentsPath -Raw

$MAJOR = [System.Collections.Generic.HashSet[string]]::new(
  [string[]]@(
    'pulaski','benton','washington','faulkner','saline','sebastian','craighead',
    'garland','lonoke','pope','white','jefferson'
  )
)

$POOLS = @{
  'little-rock-metro-ar' = @(
    'two-men-and-a-truck-pulaski-ar','two-men-and-a-truck-faulkner-ar','two-men-and-a-truck-saline-ar',
    'two-men-and-a-truck-lonoke-ar','regional-grant-ar-movers','all-my-sons-little-rock-ar',
    'arkansas-capital-movers','arkansas-family-movers','college-hunks-little-rock-ar',
    'coleman-worldwide-little-rock-ar','north-american-van-lines-little-rock-ar','arkansas-county-moving-co'
  )
  'northwest-arkansas-metro-ar' = @(
    'two-men-and-a-truck-benton-ar','regional-carroll-ar-movers','regional-madison-ar-movers',
    'two-men-and-a-truck-washington-ar','arkansas-local-lines','all-my-sons-fayetteville-ar',
    'college-hunks-northwest-arkansas-ar','coleman-worldwide-fayetteville-ar',
    'north-american-van-lines-fayetteville-ar','arkansas-express-movers','arkansas-regional-moving','arkansas-pro-movers'
  )
  'fort-smith-metro-ar' = @(
    'two-men-and-a-truck-sebastian-ar','regional-crawford-ar-movers','regional-franklin-ar-movers',
    'arkansas-premier-moving','arkansas-pro-movers','all-my-sons-fort-smith-ar',
    'college-hunks-fort-smith-ar','coleman-worldwide-fort-smith-ar','north-american-van-lines-fort-smith-ar',
    'arkansas-express-movers','arkansas-regional-moving','arkansas-family-movers'
  )
  'jonesboro-metro-ar' = @(
    'two-men-and-a-truck-craighead-ar','regional-greene-ar-movers','regional-poinsett-ar-movers',
    'regional-cross-ar-movers','regional-lawrence-ar-movers','regional-randolph-ar-movers',
    'regional-jackson-ar-movers','regional-mississippi-ar-movers','all-my-sons-jonesboro-ar',
    'arkansas-regional-moving','arkansas-express-movers','arkansas-family-movers',
    'college-hunks-jonesboro-ar','coleman-worldwide-jonesboro-ar','north-american-van-lines-jonesboro-ar',
    'arkansas-pro-movers','arkansas-premier-moving'
  )
  'hot-springs-metro-ar' = @(
    'two-men-and-a-truck-garland-ar','regional-hot-spring-ar-movers','two-men-and-a-truck-saline-ar',
    'two-men-and-a-truck-pulaski-ar','all-my-sons-little-rock-ar','arkansas-capital-movers',
    'arkansas-family-movers','college-hunks-little-rock-ar','coleman-worldwide-little-rock-ar',
    'arkansas-county-moving-co','arkansas-express-movers'
  )
  'searcy-metro-ar' = @(
    'regional-white-ar-movers','two-men-and-a-truck-faulkner-ar','two-men-and-a-truck-pulaski-ar',
    'all-my-sons-little-rock-ar','arkansas-capital-movers','arkansas-family-movers',
    'college-hunks-little-rock-ar','coleman-worldwide-little-rock-ar','arkansas-county-moving-co','arkansas-express-movers'
  )
  'russellville-metro-ar' = @(
    'regional-pope-ar-movers','two-men-and-a-truck-faulkner-ar','two-men-and-a-truck-pulaski-ar',
    'all-my-sons-little-rock-ar','arkansas-capital-movers','arkansas-family-movers',
    'college-hunks-little-rock-ar','coleman-worldwide-little-rock-ar','arkansas-regional-moving','arkansas-express-movers'
  )
  'pine-bluff-metro-ar' = @(
    'regional-jefferson-ar-movers','two-men-and-a-truck-pulaski-ar','all-my-sons-little-rock-ar',
    'arkansas-capital-movers','arkansas-family-movers','college-hunks-little-rock-ar',
    'coleman-worldwide-little-rock-ar','north-american-van-lines-little-rock-ar',
    'arkansas-county-moving-co','arkansas-premier-moving'
  )
  'paragould-metro-ar' = @(
    'regional-greene-ar-movers','two-men-and-a-truck-craighead-ar','all-my-sons-jonesboro-ar',
    'arkansas-regional-moving','arkansas-express-movers','arkansas-family-movers',
    'college-hunks-jonesboro-ar','coleman-worldwide-jonesboro-ar','north-american-van-lines-jonesboro-ar','arkansas-pro-movers'
  )
  'west-memphis-metro-ar' = @(
    'regional-crittenden-ar-movers','regional-st-francis-ar-movers','two-men-and-a-truck-memphis',
    'all-my-sons-memphis','college-hunks-moving-memphis','spyder-moving-memphis',
    'two-men-and-a-truck-craighead-ar','arkansas-regional-moving','arkansas-express-movers'
  )
  'mountain-home-metro-ar' = @(
    'regional-baxter-ar-movers','two-men-and-a-truck-pulaski-ar','all-my-sons-little-rock-ar',
    'arkansas-capital-movers','arkansas-family-movers','arkansas-regional-moving',
    'arkansas-express-movers','arkansas-premier-moving'
  )
  'texarkana-metro-ar' = @(
    'regional-miller-ar-movers','regional-hempstead-ar-movers','regional-sevier-ar-movers',
    'two-men-and-a-truck-sebastian-ar','all-my-sons-fort-smith-ar','coleman-worldwide-fort-smith-ar',
    'arkansas-premier-moving','arkansas-pro-movers','arkansas-regional-moving','arkansas-express-movers'
  )
  'batesville-metro-ar' = @(
    'regional-independence-ar-movers','two-men-and-a-truck-faulkner-ar','two-men-and-a-truck-pulaski-ar',
    'all-my-sons-little-rock-ar','arkansas-capital-movers','arkansas-family-movers',
    'arkansas-regional-moving','arkansas-express-movers'
  )
  'harrison-metro-ar' = @(
    'regional-boone-ar-movers','two-men-and-a-truck-benton-ar','arkansas-local-lines',
    'all-my-sons-fayetteville-ar','college-hunks-northwest-arkansas-ar',
    'arkansas-express-movers','arkansas-regional-moving','arkansas-family-movers'
  )
  'blytheville-metro-ar' = @(
    'regional-mississippi-ar-movers','two-men-and-a-truck-craighead-ar','all-my-sons-jonesboro-ar',
    'arkansas-regional-moving','arkansas-express-movers','arkansas-family-movers',
    'college-hunks-jonesboro-ar','coleman-worldwide-jonesboro-ar'
  )
  'el-dorado-metro-ar' = @(
    'regional-union-ar-movers','regional-jefferson-ar-movers','two-men-and-a-truck-pulaski-ar',
    'all-my-sons-little-rock-ar','arkansas-capital-movers','arkansas-family-movers',
    'arkansas-regional-moving','arkansas-express-movers'
  )
  'malvern-metro-ar' = @(
    'regional-hot-spring-ar-movers','two-men-and-a-truck-garland-ar','two-men-and-a-truck-saline-ar',
    'two-men-and-a-truck-pulaski-ar','all-my-sons-little-rock-ar','arkansas-capital-movers',
    'arkansas-family-movers','arkansas-express-movers'
  )
  'berryville-metro-ar' = @(
    'regional-carroll-ar-movers','two-men-and-a-truck-benton-ar','arkansas-local-lines',
    'all-my-sons-fayetteville-ar','college-hunks-northwest-arkansas-ar',
    'arkansas-express-movers','arkansas-regional-moving','arkansas-family-movers'
  )
  'clarksville-metro-ar' = @(
    'regional-johnson-ar-movers','regional-pope-ar-movers','two-men-and-a-truck-faulkner-ar',
    'two-men-and-a-truck-pulaski-ar','all-my-sons-little-rock-ar','arkansas-regional-moving',
    'arkansas-express-movers','arkansas-family-movers'
  )
  'heber-springs-metro-ar' = @(
    'regional-cleburne-ar-movers','regional-white-ar-movers','two-men-and-a-truck-faulkner-ar',
    'two-men-and-a-truck-pulaski-ar','all-my-sons-little-rock-ar','arkansas-capital-movers',
    'arkansas-regional-moving','arkansas-express-movers'
  )
  'harrisburg-metro-ar' = @(
    'regional-poinsett-ar-movers','two-men-and-a-truck-craighead-ar','all-my-sons-jonesboro-ar',
    'arkansas-regional-moving','arkansas-express-movers','arkansas-family-movers',
    'college-hunks-jonesboro-ar','coleman-worldwide-jonesboro-ar'
  )
  'magnolia-metro-ar' = @(
    'regional-columbia-ar-movers','regional-union-ar-movers','regional-miller-ar-movers',
    'two-men-and-a-truck-sebastian-ar','arkansas-premier-moving','arkansas-regional-moving',
    'arkansas-express-movers','arkansas-pro-movers'
  )
  'paris-metro-ar' = @(
    'regional-logan-ar-movers','two-men-and-a-truck-sebastian-ar','regional-crawford-ar-movers',
    'all-my-sons-fort-smith-ar','coleman-worldwide-fort-smith-ar','arkansas-premier-moving',
    'arkansas-regional-moving','arkansas-express-movers'
  )
  'forrest-city-metro-ar' = @(
    'regional-st-francis-ar-movers','regional-cross-ar-movers','regional-crittenden-ar-movers',
    'two-men-and-a-truck-memphis','two-men-and-a-truck-craighead-ar','all-my-sons-memphis',
    'arkansas-regional-moving','arkansas-express-movers','all-my-sons-jonesboro-ar'
  )
  'camden-metro-ar' = @(
    'regional-ouachita-ar-movers','regional-union-ar-movers','regional-jefferson-ar-movers',
    'two-men-and-a-truck-pulaski-ar','arkansas-capital-movers','arkansas-regional-moving',
    'arkansas-express-movers','arkansas-family-movers'
  )
  'morrilton-metro-ar' = @(
    'regional-conway-ar-movers','two-men-and-a-truck-faulkner-ar','two-men-and-a-truck-pulaski-ar',
    'all-my-sons-little-rock-ar','arkansas-capital-movers','arkansas-family-movers',
    'arkansas-regional-moving','arkansas-express-movers'
  )
  'arkadelphia-metro-ar' = @(
    'regional-clark-ar-movers','two-men-and-a-truck-saline-ar','two-men-and-a-truck-pulaski-ar',
    'all-my-sons-little-rock-ar','arkansas-capital-movers','arkansas-family-movers',
    'arkansas-regional-moving','arkansas-express-movers'
  )
}

$COUNTY_METRO = @{
  pulaski='little-rock-metro-ar'; benton='northwest-arkansas-metro-ar'; washington='northwest-arkansas-metro-ar'
  faulkner='little-rock-metro-ar'; saline='little-rock-metro-ar'; sebastian='fort-smith-metro-ar'
  craighead='jonesboro-metro-ar'; garland='hot-springs-metro-ar'; white='searcy-metro-ar'
  lonoke='little-rock-metro-ar'; pope='russellville-metro-ar'; crawford='fort-smith-metro-ar'
  jefferson='pine-bluff-metro-ar'; greene='paragould-metro-ar'; crittenden='west-memphis-metro-ar'
  baxter='mountain-home-metro-ar'; miller='texarkana-metro-ar'; independence='batesville-metro-ar'
  boone='harrison-metro-ar'; mississippi='blytheville-metro-ar'; union='el-dorado-metro-ar'
  'hot-spring'='malvern-metro-ar'; carroll='berryville-metro-ar'; johnson='clarksville-metro-ar'
  cleburne='heber-springs-metro-ar'; poinsett='harrisburg-metro-ar'; columbia='magnolia-metro-ar'
  logan='paris-metro-ar'; 'st-francis'='forrest-city-metro-ar'; ouachita='camden-metro-ar'
  conway='morrilton-metro-ar'; clark='arkadelphia-metro-ar'; grant='little-rock-metro-ar'
  izard='melbourne-metro-ar'; fulton='salem-metro-ar'; montgomery='mount-ida-metro-ar'
  lee='marianna-metro-ar'; prairie='des-arc-metro-ar'; nevada='prescott-metro-ar'
  searcy='marshall-metro-ar'; cleveland='rison-metro-ar'; newton='jasper-metro-ar'
  woodruff='augusta-metro-ar'; calhoun='hampton-metro-ar'
}

$FALLBACK = @(
  'little-rock-metro-ar','northwest-arkansas-metro-ar','fort-smith-metro-ar','jonesboro-metro-ar',
  'hot-springs-metro-ar','searcy-metro-ar','russellville-metro-ar','pine-bluff-metro-ar',
  'paragould-metro-ar','west-memphis-metro-ar','mountain-home-metro-ar','texarkana-metro-ar',
  'batesville-metro-ar','harrison-metro-ar','blytheville-metro-ar','el-dorado-metro-ar',
  'malvern-metro-ar','berryville-metro-ar','clarksville-metro-ar','heber-springs-metro-ar',
  'harrisburg-metro-ar','magnolia-metro-ar','paris-metro-ar','forrest-city-metro-ar',
  'camden-metro-ar','morrilton-metro-ar','arkadelphia-metro-ar'
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
Write-Host "Updated $($assignmentMap.Count) Arkansas county assignments."