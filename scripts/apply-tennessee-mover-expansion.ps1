# PowerShell fallback when tsx is unavailable locally.
# Mirrors apply-tennessee-mover-expansion.ts using metro pool mover lists from seed data.
$ErrorActionPreference = 'Stop'
Set-Location (Join-Path $PSScriptRoot '..')

$assignmentsPath = 'data/tennessee-county-assignments.ts'
$content = Get-Content $assignmentsPath -Raw

$MAJOR = [System.Collections.Generic.HashSet[string]]::new(
  [string[]]@(
    'shelby','davidson','knox','hamilton','rutherford','williamson',
    'montgomery','sumner','wilson','sullivan','blount','washington',
    'maury','bradley','sevier','madison','putnam','anderson','robertson','greene'
  )
)

$POOLS = @{
  'memphis-metro-tn' = @(
    'two-men-and-a-truck-memphis','college-hunks-moving-memphis','all-my-sons-memphis',
    'spyder-moving-memphis','big-league-movers-memphis','red-carpet-moving-memphis',
    'cord-moving-memphis','a-1-freeman-memphis','my-town-movers-memphis','wrightway-moving-memphis'
  )
  'nashville-metro-tn' = @(
    'two-men-and-a-truck-nashville','two-men-and-a-truck-murfreesboro','two-men-and-a-truck-franklin',
    'two-men-and-a-truck-hendersonville','two-men-and-a-truck-lebanon','two-men-and-a-truck-columbia',
    'two-men-and-a-truck-springfield','two-men-and-a-truck-shelbyville','two-men-and-a-truck-lawrenceburg',
    'college-hunks-moving-nashville','all-my-sons-nashville','bellhop-nashville','fox-moving-nashville',
    'music-city-movers-nashville','master-movers-nashville','black-tie-moving-nashville',
    'armstrong-relocation-nashville','alexanders-mobility-nashville','spyder-moving-nashville'
  )
  'clarksville-metro-tn' = @(
    'two-men-and-a-truck-clarksville','all-my-sons-clarksville','fox-moving-clarksville',
    'spyder-moving-clarksville','maxwell-moving-clarksville','turner-moving-clarksville',
    'clarksville-moving-storage-clarksville','hilldrup-moving-clarksville',
    'two-men-and-a-truck-nashville','college-hunks-moving-nashville'
  )
  'knoxville-metro-tn' = @(
    'two-men-and-a-truck-knoxville','two-men-and-a-truck-oak-ridge','two-men-and-a-truck-maryville',
    'college-hunks-moving-knoxville','all-my-sons-knoxville','gouffon-moving-knoxville',
    'knoxville-moving-company-knoxville','mighty-moving-knoxville','brooks-transfer-knoxville',
    'hilldrup-moving-knoxville','bellhop-knoxville','spyder-moving-knoxville'
  )
  'chattanooga-metro-tn' = @(
    'two-men-and-a-truck-chattanooga','college-hunks-moving-chattanooga','all-my-sons-chattanooga',
    'good-guys-moving-chattanooga','elizabeth-moving-chattanooga','bellhop-chattanooga',
    'river-city-moving-chattanooga','armstrong-relocation-chattanooga','fox-moving-chattanooga','spyder-moving-chattanooga'
  )
  'kingsport-bristol-metro-tn' = @(
    'two-men-and-a-truck-johnson-city','two-men-and-a-truck-greeneville','two-men-and-a-truck-morristown',
    'two-men-and-a-truck-kingsport','barnett-moving-kingsport','forward-moving-kingsport',
    'ferguson-moving-kingsport','affordable-moving-tri-cities','hilldrup-moving-kingsport',
    'all-my-sons-kingsport','fox-moving-kingsport'
  )
  'jackson-metro-tn' = @(
    'two-men-and-a-truck-jackson','two-men-and-a-truck-dyersburg','two-men-and-a-truck-paris',
    'two-men-and-a-truck-union-city','all-my-sons-jackson','fox-moving-jackson','spyder-moving-jackson',
    'hilldrup-moving-jackson','jackson-moving-company-jackson','volunteer-moving-jackson','two-men-and-a-truck-cookeville'
  )
  'cookeville-metro-tn' = @(
    'two-men-and-a-truck-cookeville','all-my-sons-cookeville','fox-moving-cookeville','spyder-moving-cookeville',
    'cookeville-moving-company-cookeville','hilldrup-moving-cookeville','upper-cumberland-moving-cookeville',
    'two-men-and-a-truck-crossville','college-hunks-moving-nashville'
  )
  'crossville-metro-tn' = @(
    'two-men-and-a-truck-crossville','two-men-and-a-truck-cookeville','upper-cumberland-moving-cookeville',
    'cookeville-moving-company-cookeville','all-my-sons-cookeville','spyder-moving-cookeville'
  )
  'cleveland-metro-tn' = @(
    'two-men-and-a-truck-cleveland','two-men-and-a-truck-chattanooga','college-hunks-moving-chattanooga',
    'good-guys-moving-chattanooga','all-my-sons-chattanooga','river-city-moving-chattanooga',
    'spyder-moving-chattanooga','fox-moving-chattanooga'
  )
  'sevierville-metro-tn' = @(
    'two-men-and-a-truck-sevierville','smokies-moving-sevierville','two-men-and-a-truck-knoxville',
    'two-men-and-a-truck-maryville','college-hunks-moving-knoxville','gouffon-moving-knoxville',
    'spyder-moving-knoxville','all-my-sons-knoxville'
  )
}

$COUNTY_METRO = @{
  clay='cookeville-metro-tn'; hancock='kingsport-bristol-metro-tn'; houston='clarksville-metro-tn'
  lake='jackson-metro-tn'; moore='nashville-metro-tn'; perry='nashville-metro-tn'
  pickett='cookeville-metro-tn'; trousdale='nashville-metro-tn'; 'van-buren'='cookeville-metro-tn'
  crockett='jackson-metro-tn'; decatur='jackson-metro-tn'; fentress='cookeville-metro-tn'
  grundy='chattanooga-metro-tn'; jackson='cookeville-metro-tn'; lewis='nashville-metro-tn'; meigs='chattanooga-metro-tn'
  montgomery='clarksville-metro-tn'; sumner='nashville-metro-tn'; wilson='nashville-metro-tn'
  sullivan='kingsport-bristol-metro-tn'; blount='knoxville-metro-tn'; washington='kingsport-bristol-metro-tn'
  maury='nashville-metro-tn'; bradley='cleveland-metro-tn'; sevier='sevierville-metro-tn'
  madison='jackson-metro-tn'; putnam='cookeville-metro-tn'; anderson='knoxville-metro-tn'
  robertson='nashville-metro-tn'; greene='kingsport-bristol-metro-tn'
}

$FALLBACK = @(
  'nashville-metro-tn','memphis-metro-tn','knoxville-metro-tn','chattanooga-metro-tn',
  'clarksville-metro-tn','kingsport-bristol-metro-tn','jackson-metro-tn','cookeville-metro-tn','crossville-metro-tn'
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
Write-Host "Updated $($assignmentMap.Count) Tennessee county assignments."