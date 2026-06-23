# PowerShell fallback when tsx is unavailable locally.
# Mirrors apply-alabama-mover-expansion.ts using metro pool mover lists from seed data.
$ErrorActionPreference = 'Stop'
Set-Location (Join-Path $PSScriptRoot '..')

$assignmentsPath = 'data/alabama-county-assignments.ts'
$content = Get-Content $assignmentsPath -Raw

$MAJOR = [System.Collections.Generic.HashSet[string]]::new(
  [string[]]@(
    'jefferson','madison','mobile','baldwin','tuscaloosa','shelby',
    'montgomery','lee','morgan','calhoun','limestone','etowah','houston'
  )
)

$POOLS = @{
  'birmingham-metro-al' = @(
    'two-men-and-a-truck-birmingham','college-hunks-moving-birmingham','new-latitude-movers-birmingham',
    'secure-moving-birmingham','all-my-sons-birmingham','armstrong-relocation-birmingham',
    'lambert-transfer-birmingham','motivated-movers-birmingham','movedaddy-birmingham','fortson-moving-birmingham'
  )
  'huntsville-metro-al' = @(
    'two-men-and-a-truck-huntsville','black-tie-moving-huntsville','motivated-movers-huntsville',
    'armstrong-relocation-huntsville','this-side-up-moving-huntsville','applewhite-movers-huntsville',
    'muscled-up-movers-huntsville','lambert-relocation-huntsville','christophers-moving-huntsville','fortson-moving-birmingham'
  )
  'mobile-metro-al' = @(
    'coleman-worldwide-moving-mobile','handy-guys-moving-mobile','griner-moving-services-mobile',
    'all-my-sons-mobile','j-w-moving-storage-mobile','rs-moving-warehousing-mobile',
    'two-men-and-a-truck-baldwin','motivated-movers-baldwin','college-hunks-moving-baldwin','chosen-one-movers-baldwin'
  )
  'baldwin-coastal-al' = @(
    'two-men-and-a-truck-baldwin','motivated-movers-baldwin','college-hunks-moving-baldwin',
    'chosen-one-movers-baldwin','coleman-worldwide-moving-mobile','handy-guys-moving-mobile',
    'griner-moving-services-mobile','all-my-sons-mobile','j-w-moving-storage-mobile','rs-moving-warehousing-mobile'
  )
  'tuscaloosa-metro-al' = @(
    'two-men-and-a-truck-tuscaloosa','motivated-movers-tuscaloosa','awesome-moving-tuscaloosa',
    'new-latitude-movers-birmingham','secure-moving-birmingham','all-my-sons-birmingham',
    'armstrong-relocation-birmingham','movedaddy-birmingham','lambert-transfer-birmingham','fortson-moving-birmingham'
  )
  'montgomery-metro-al' = @(
    'two-men-and-a-truck-montgomery','admiral-movers-montgomery','mccorquodale-transfer-montgomery',
    'coleman-worldwide-moving-montgomery','motivated-movers-montgomery','c-r-movers-montgomery',
    'all-my-sons-montgomery','jubilee-city-movers-montgomery','secure-moving-birmingham','new-latitude-movers-birmingham'
  )
  'dothan-metro-al' = @(
    'true-america-moving-dothan','the-moving-truck-dothan','asap-moving-dothan',
    'two-men-and-a-truck-dothan','motivated-movers-dothan','emerald-moving-dothan',
    'hhg-movers-dothan','admiral-movers-montgomery'
  )
  'gadsden-metro-al' = @(
    'fortson-moving-birmingham','two-men-and-a-truck-huntsville','black-tie-moving-huntsville',
    'motivated-movers-huntsville','changing-spaces-moving-birmingham','armstrong-relocation-huntsville',
    'this-side-up-moving-huntsville','new-latitude-movers-birmingham','applewhite-movers-huntsville','christophers-moving-huntsville'
  )
}

$COUNTY_METRO = @{
  jefferson='birmingham-metro-al'; madison='huntsville-metro-al'; mobile='mobile-metro-al'
  baldwin='baldwin-coastal-al'; tuscaloosa='tuscaloosa-metro-al'; shelby='birmingham-metro-al'
  montgomery='montgomery-metro-al'; lee='auburn-opelika-metro-al'; limestone='huntsville-metro-al'
  morgan='decatur-metro-al'; calhoun='anniston-metro-al'; houston='dothan-metro-al'; etowah='gadsden-metro-al'
  cleburne='heflin-metro-al'; washington='chatom-metro-al'; clay='ashland-metro-al'
  lamar='vernon-metro-al'; crenshaw='luverne-metro-al'; choctaw='choctaw-metro-al'
  sumter='livingston-metro-al'; conecuh='evergreen-metro-al'; coosa='rockford-metro-al'
  bullock='union-springs-metro-al'; wilcox='camden-metro-al'; lowndes='hayneville-metro-al'
  perry='perry-metro-al'; greene='eutaw-metro-al'
}

$FALLBACK = @(
  'birmingham-metro-al','huntsville-metro-al','mobile-metro-al','baldwin-coastal-al',
  'tuscaloosa-metro-al','montgomery-metro-al','dothan-metro-al','gadsden-metro-al'
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
Write-Host "Updated $($assignmentMap.Count) Alabama county assignments."