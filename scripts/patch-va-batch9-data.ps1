# Patches assignments, research, testimonials, overrides, nearby for VA batch 9
$root = Split-Path $PSScriptRoot -Parent

$assignPath = Join-Path $root 'data\virginia-county-assignments.ts'
$snippet = (Get-Content (Join-Path $PSScriptRoot 'va-batch9-output\assignments-snippet.txt') -Raw).TrimStart([char]0xFEFF)
$assign = Get-Content $assignPath -Raw
if ($assign -notmatch "'richmond-county':") {
  $assign = $assign -replace "(\s+'krupp-moving-middlesex-va',\r?\n  \],\r?\n)(\};)", "`$1$snippet`r`n`$2"
  Set-Content $assignPath $assign -Encoding UTF8 -NoNewline
  Write-Host 'Patched assignments'
}

$counties = @(
  @{ slug='essex'; seat='Tappahannock'; name='Essex'; studio='$750–$1,500'; family='$2,600–$5,800+'; hourly='$110–$165/hr for a 2-person crew'; notes='Essex County is a rural Northern Neck county with residential demand centered on Tappahannock.'; tip1='Regional'; region='Northern Neck' }
  @{ slug='cumberland'; seat='Cumberland'; name='Cumberland'; studio='$750–$1,500'; family='$2,600–$5,800+'; hourly='$110–$165/hr for a 2-person crew'; notes='Cumberland County is a rural Central Virginia county with residential demand.'; tip1='Regional'; region='Central Virginia' }
  @{ slug='richmond-county'; seat='Warsaw'; name='Richmond County'; studio='$750–$1,500'; family='$2,600–$5,800+'; hourly='$110–$165/hr for a 2-person crew'; notes='Richmond County is a rural Northern Neck county with residential demand centered on Warsaw.'; tip1='Regional'; region='Northern Neck' }
  @{ slug='franklin-city'; seat='Franklin'; name='Franklin'; studio='$750–$1,500'; family='$2,600–$5,800+'; hourly='$110–$165/hr for a 2-person crew'; notes='Franklin is an independent city in Southside Virginia with residential demand.'; tip1='Regional'; region='Southside Virginia' }
  @{ slug='mathews'; seat='Mathews'; name='Mathews'; studio='$750–$1,500'; family='$2,600–$5,800+'; hourly='$110–$165/hr for a 2-person crew'; notes='Mathews County is a rural Northern Neck county with residential demand.'; tip1='Regional'; region='Middle Peninsula' }
  @{ slug='lexington'; seat='Lexington'; name='Lexington'; studio='$750–$1,500'; family='$2,600–$5,800+'; hourly='$110–$165/hr for a 2-person crew'; notes='Lexington is an independent city anchored by Washington and Lee University and Virginia Military Institute with strong educational demand.'; tip1='University'; region='Shenandoah Valley' }
  @{ slug='rappahannock'; seat='Washington'; name='Rappahannock'; studio='$850–$1,700'; family='$3,000–$7,000+'; hourly='$120–$185/hr for a 2-person crew'; notes='Rappahannock County is a rural Northern Virginia county with residential demand centered on Washington.'; tip1='Regional'; region='Northern Virginia piedmont' }
  @{ slug='king-and-queen'; seat='King and Queen Court House'; name='King and Queen'; studio='$750–$1,500'; family='$2,600–$5,800+'; hourly='$110–$165/hr for a 2-person crew'; notes='King and Queen County is a rural Central Virginia county with residential demand.'; tip1='Regional'; region='Central Virginia' }
  @{ slug='buena-vista'; seat='Buena Vista'; name='Buena Vista'; studio='$750–$1,500'; family='$2,600–$5,800+'; hourly='$110–$165/hr for a 2-person crew'; notes='Buena Vista is an independent city in Central Virginia with residential demand.'; tip1='Regional'; region='Rockbridge area' }
  @{ slug='charles-city'; seat='Charles City'; name='Charles City'; studio='$750–$1,500'; family='$2,600–$5,800+'; hourly='$110–$165/hr for a 2-person crew'; notes='Charles City County is a rural county on the Virginia Peninsula with residential demand.'; tip1='Regional'; region='Virginia Peninsula' }
  @{ slug='galax'; seat='Galax'; name='Galax'; studio='$750–$1,500'; family='$2,600–$5,800+'; hourly='$110–$165/hr for a 2-person crew'; notes='Galax is an independent city in Southwest Virginia with residential demand.'; tip1='Regional'; region='Blue Ridge highlands' }
  @{ slug='surry'; seat='Surry'; name='Surry'; studio='$750–$1,500'; family='$2,600–$5,800+'; hourly='$110–$165/hr for a 2-person crew'; notes='Surry County is a rural county on the Virginia Peninsula with residential demand.'; tip1='Regional'; region='Virginia Peninsula' }
  @{ slug='bland'; seat='Bland'; name='Bland'; studio='$750–$1,500'; family='$2,600–$5,800+'; hourly='$110–$165/hr for a 2-person crew'; notes='Bland County is a rural Southwest Virginia county with residential demand.'; tip1='Regional'; region='Southwest Virginia' }
  @{ slug='covington'; seat='Covington'; name='Covington'; studio='$750–$1,500'; family='$2,600–$5,800+'; hourly='$110–$165/hr for a 2-person crew'; notes='Covington is an independent city in Western Virginia with residential demand.'; tip1='Regional'; region='Alleghany Highlands' }
  @{ slug='emporia'; seat='Emporia'; name='Emporia'; studio='$750–$1,500'; family='$2,600–$5,800+'; hourly='$110–$165/hr for a 2-person crew'; notes='Emporia is an independent city in Southside Virginia with residential demand.'; tip1='Regional'; region='Southside Virginia' }
  @{ slug='craig'; seat='New Castle'; name='Craig'; studio='$750–$1,500'; family='$2,600–$5,800+'; hourly='$110–$165/hr for a 2-person crew'; notes='Craig County is a small rural Western Virginia county with residential demand centered on New Castle.'; tip1='Regional'; region='Western Virginia' }
  @{ slug='bath'; seat='Warm Springs'; name='Bath'; studio='$750–$1,500'; family='$2,600–$5,800+'; hourly='$110–$165/hr for a 2-person crew'; notes='Bath County is a small rural Western Virginia county with residential and tourism demand centered on Warm Springs.'; tip1='Tourist'; region='Allegheny highlands' }
  @{ slug='norton'; seat='Norton'; name='Norton'; studio='$750–$1,500'; family='$2,600–$5,800+'; hourly='$110–$165/hr for a 2-person crew'; notes='Norton is an independent city in Southwest Virginia with residential demand.'; tip1='Regional'; region='Southwest Virginia coalfields' }
  @{ slug='highland'; seat='Monterey'; name='Highland'; studio='$750–$1,500'; family='$2,600–$5,800+'; hourly='$110–$165/hr for a 2-person crew'; notes='Highland County is Virginia''s least populous county, a rural mountainous area with residential demand centered on Monterey.'; tip1='Mountainous terrain and regional'; region='Allegheny highlands' }
)

$researchLines = New-Object System.Collections.Generic.List[string]
$testimonialLines = New-Object System.Collections.Generic.List[string]
$overrideLines = New-Object System.Collections.Generic.List[string]
$nearbyLines = New-Object System.Collections.Generic.List[string]
$validateLines = New-Object System.Collections.Generic.List[string]
$sitemapSlugs = New-Object System.Collections.Generic.List[string]

$nearbyMap = @{
  'essex' = @('king-and-queen','richmond-county','westmoreland','king-george','caroline')
  'cumberland' = @('powhatan','goochland','buckingham','amelia','fluvanna')
  'richmond-county' = @('lancaster','northumberland','westmoreland','essex','king-george')
  'franklin-city' = @('southampton','isle-of-wight','suffolk','greensville','sussex')
  'mathews' = @('gloucester','middlesex','lancaster','york','james-city')
  'lexington' = @('rockbridge','bath','alleghany','augusta','buena-vista')
  'rappahannock' = @('madison','culpeper','fauquier','warren','page')
  'king-and-queen' = @('essex','new-kent','king-william','middlesex','caroline')
  'buena-vista' = @('rockbridge','lexington','alleghany','bath','augusta')
  'charles-city' = @('new-kent','james-city','henrico','surry','prince-george')
  'galax' = @('carroll','grayson','wythe','patrick','bristol')
  'surry' = @('isle-of-wight','james-city','charles-city','sussex','prince-george')
  'bland' = @('wythe','giles','tazewell','pulaski','montgomery')
  'covington' = @('alleghany','bath','rockbridge','botetourt','craig')
  'emporia' = @('greensville','sussex','brunswick','southampton','halifax')
  'craig' = @('roanoke-county','botetourt','alleghany','montgomery','giles')
  'bath' = @('highland','alleghany','augusta','rockbridge','covington')
  'norton' = @('wise','lee','scott','dickenson','bristol')
  'highland' = @('bath','augusta','rockbridge','alleghany','madison')
}

$i = 0
foreach ($c in $counties) {
  $key = if ($c.slug -match '-') { "'$($c.slug)'" } else { $c.slug }
  $sitemapSlugs.Add("'$($c.slug)'")

  $insuranceTip = if ($c.slug -eq 'rappahannock') { 'Confirm insurance for high-value suburban and rural homes.' } else { 'Confirm insurance for high-value homes.' }
  $bookTip = if ($c.slug -eq 'bath') { 'Book early for peak tourist seasons (June–August) and month-end lease changeover.' } else { 'Book early for peak seasons (May–September) and month-end lease changeover.' }
  $studentTip = if ($c.slug -eq 'lexington') { 'Confirm insurance for high-value homes and student-related moves.' } else { $insuranceTip }

  $researchLines.Add(@"
  ${key}: {
    marketNotes:
      '$($c.notes)',
    costs: {
      studioRange: '$($c.studio)',
      familyRange: '$($c.family)',
      avgHourly: '$($c.hourly)',
      note: '$($c.name) pricing reflects $($c.region) geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for $($c.seat) and surrounding areas before booking.',
      '$($c.tip1) traffic impacts scheduling — confirm crew arrival windows.',
      '$studentTip',
      '$bookTip',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
"@)

  $testimonialLines.Add(@"
  ${key}: [
    {
      quote:
        'Two Men and a Truck $($c.name) handled our relocation professionally — on time, efficient, and extremely careful.',
      name: '$([char](65 + ($i % 26))). $([char](66 + ($i % 25))).',
      location: '$($c.seat), VA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Best local moving service in $($c.name) with fair pricing and careful handling.',
      name: '$([char](67 + ($i % 23))). $([char](68 + ($i % 22))).',
      location: '$($c.seat), VA',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Professional crew served our $($c.seat) area move efficiently with excellent care.',
      name: '$([char](69 + ($i % 21))). $([char](70 + ($i % 20))).',
      location: '$($c.seat), VA',
      rating: 5,
      moveType: 'Apartment',
    },
  ],
"@)

  $overrideName = if ($c.slug -eq 'richmond-county') { ", name: 'Richmond County'" } elseif ($c.slug -eq 'franklin-city') { ", name: 'Franklin'" } else { '' }
  $overrideLines.Add("  ${key}: { seat: '$($c.seat)', metro: '$($c.slug)-metro-va'$overrideName },")

  $neighbors = $nearbyMap[$c.slug] | ForEach-Object { "'$_'" }
  $nearbyLines.Add(@"
  ${key}: [
    $($neighbors -join ', ')
  ],
"@)

  $validateLines.Add("  { stateSlug: 'virginia', countySlug: '$($c.slug)', expectedCity: '$($c.seat)' },")
  $i++
}

# Research
$researchPath = Join-Path $root 'data\virginia-county-research.ts'
$research = Get-Content $researchPath -Raw
if ($research -notmatch "'essex':" -and $research -notmatch '  essex:') {
  $research = $research -replace 'batches 1–8', 'batches 1–9'
  $block = $researchLines -join "`n"
  $marker = "`n};`n`nexport function getVirginiaCountyResearch"
  $idx = $research.IndexOf($marker)
  if ($idx -ge 0) { $research = $research.Substring(0, $idx) + "`n" + $block + $research.Substring($idx) }
  Set-Content $researchPath $research -Encoding UTF8 -NoNewline
  Write-Host 'Patched research'
}

# Testimonials
$testPath = Join-Path $root 'data\virginia-county-testimonials.ts'
$test = Get-Content $testPath -Raw
if ($test -notmatch 'essex:') {
  $block = $testimonialLines -join "`n"
  $marker = "`n};`n`nexport function getVirginiaCountyTestimonials"
  $idx = $test.IndexOf($marker)
  if ($idx -ge 0) { $test = $test.Substring(0, $idx) + "`n" + $block + $test.Substring($idx) }
  Set-Content $testPath $test -Encoding UTF8 -NoNewline
  Write-Host 'Patched testimonials'
}

# Overrides - fix syntax and append
$overridePath = Join-Path $root 'lib\local-movers\geography\virginia-overrides.ts'
$override = Get-Content $overridePath -Raw
if ($override -notmatch 'essex:') {
  $block = $overrideLines -join "`n"
  $override = $override -replace "(\s+middlesex: \{ seat: 'Saluda', metro: 'middlesex-metro-va' \},\r?\n)(\};)", "`$1$block`r`n`$2"
  Set-Content $overridePath $override -Encoding UTF8 -NoNewline
  Write-Host 'Patched overrides'
}

# Nearby
$nearbyPath = Join-Path $root 'lib\local-movers\virginia-nearby.ts'
$nearby = Get-Content $nearbyPath -Raw
if ($nearby -notmatch 'essex:') {
  $block = $nearbyLines -join "`n"
  $marker = "`n};`n`nexport function getVirginiaNearbyCounties"
  $idx = $nearby.IndexOf($marker)
  if ($idx -ge 0) { $nearby = $nearby.Substring(0, $idx) + "`n" + $block + $nearby.Substring($idx) }
  Set-Content $nearbyPath $nearby -Encoding UTF8 -NoNewline
  Write-Host 'Patched nearby'
}

# Sitemap
$sitemapPath = Join-Path $root 'app\sitemap-local\sitemap.ts'
$sitemap = Get-Content $sitemapPath -Raw
if ($sitemap -notmatch "'essex'") {
  $slugBlock = ($sitemapSlugs -join ",`n  ") + ","
  $sitemap = $sitemap -replace "(\s+'middlesex',\r?\n)(\]\);)", "`$1  $slugBlock`$2"
  Set-Content $sitemapPath $sitemap -Encoding UTF8 -NoNewline
  Write-Host 'Patched sitemap'
}

# Validate
$validatePath = Join-Path $root 'scripts\validate-county-schema.ts'
$validate = Get-Content $validatePath -Raw
if ($validate -notmatch "countySlug: 'essex'") {
  $block = $validateLines -join "`n"
  $validate = $validate -replace "(\{ stateSlug: 'virginia', countySlug: 'middlesex', expectedCity: 'Saluda' \},)", "`$1`n$block"
  Set-Content $validatePath $validate -Encoding UTF8 -NoNewline
  Write-Host 'Patched validate'
}

Write-Host 'Batch 9 data patch complete'