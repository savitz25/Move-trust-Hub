# Patches assignments, research, testimonials, overrides, nearby for VA batch 8
$root = Split-Path $PSScriptRoot -Parent

# --- Assignments ---
$assignPath = Join-Path $root 'data\virginia-county-assignments.ts'
$snippet = (Get-Content (Join-Path $PSScriptRoot 'va-batch8-output\assignments-snippet.txt') -Raw).TrimStart([char]0xFEFF)
$assign = Get-Content $assignPath -Raw
if ($assign -notmatch 'colonial-heights:') {
  $assign = $assign -replace "(\s+'krupp-moving-new-kent-va',\r?\n  \],\r?\n)(\};)", "`$1$snippet`r`n`$2"
  Set-Content $assignPath $assign -Encoding UTF8 -NoNewline
  Write-Host 'Patched assignments'
}

$counties = @(
  @{ slug='colonial-heights'; seat='Colonial Heights'; name='Colonial Heights'; studio='$800–$1,600'; family='$2,900–$6,500+'; hourly='$115–$175/hr for a 2-person crew'; notes='Colonial Heights is an independent city in the Richmond area with strong residential demand.'; tip1='Richmond-area'; region='Richmond-metro' }
  @{ slug='buchanan'; seat='Grundy'; name='Buchanan'; studio='$750–$1,500'; family='$2,600–$5,800+'; hourly='$110–$165/hr for a 2-person crew'; notes='Buchanan County is a rural Southwest Virginia county with residential demand centered on Grundy.'; tip1='Regional'; region='Southwest Virginia' }
  @{ slug='southampton'; seat='Courtland'; name='Southampton'; studio='$750–$1,500'; family='$2,600–$5,800+'; hourly='$110–$165/hr for a 2-person crew'; notes='Southampton County is a rural Southside Virginia county with residential demand centered on Courtland.'; tip1='Regional'; region='Southside Virginia' }
  @{ slug='patrick'; seat='Stuart'; name='Patrick'; studio='$750–$1,500'; family='$2,600–$5,800+'; hourly='$110–$165/hr for a 2-person crew'; notes='Patrick County is a rural Southside Virginia county with residential demand centered on Stuart.'; tip1='Regional'; region='Southside Virginia' }
  @{ slug='appomattox'; seat='Appomattox'; name='Appomattox'; studio='$750–$1,500'; family='$2,600–$5,800+'; hourly='$110–$165/hr for a 2-person crew'; notes='Appomattox County is a rural Central Virginia county with residential demand.'; tip1='Regional'; region='Central Virginia' }
  @{ slug='radford'; seat='Radford'; name='Radford'; studio='$750–$1,500'; family='$2,600–$5,800+'; hourly='$110–$165/hr for a 2-person crew'; notes='Radford is an independent city anchored by Radford University with strong educational and residential demand.'; tip1='University'; region='New River Valley' }
  @{ slug='buckingham'; seat='Buckingham'; name='Buckingham'; studio='$750–$1,500'; family='$2,600–$5,800+'; hourly='$110–$165/hr for a 2-person crew'; notes='Buckingham County is a rural Central Virginia county with residential demand.'; tip1='Regional'; region='Central Virginia' }
  @{ slug='manassas-park'; seat='Manassas Park'; name='Manassas Park'; studio='$900–$1,900'; family='$3,500–$8,500+'; hourly='$130–$200/hr for a 2-person crew'; notes='Manassas Park is an independent city in Northern Virginia with strong suburban residential demand.'; tip1='Heavy Northern Virginia'; region='Northern Virginia' }
  @{ slug='giles'; seat='Pearisburg'; name='Giles'; studio='$750–$1,500'; family='$2,600–$5,800+'; hourly='$110–$165/hr for a 2-person crew'; notes='Giles County is a rural Southwest Virginia county with residential demand centered on Pearisburg.'; tip1='Regional'; region='Southwest Virginia' }
  @{ slug='bristol'; seat='Bristol'; name='Bristol'; studio='$750–$1,500'; family='$2,600–$5,800+'; hourly='$110–$165/hr for a 2-person crew'; notes='Bristol is an independent city on the Tennessee border with residential demand.'; tip1='Regional'; region='Appalachian border' }
  @{ slug='nottoway'; seat='Nottoway'; name='Nottoway'; studio='$750–$1,500'; family='$2,600–$5,800+'; hourly='$110–$165/hr for a 2-person crew'; notes='Nottoway County is a rural South Central Virginia county with residential demand.'; tip1='Regional'; region='South Central Virginia' }
  @{ slug='floyd'; seat='Floyd'; name='Floyd'; studio='$750–$1,500'; family='$2,600–$5,800+'; hourly='$110–$165/hr for a 2-person crew'; notes='Floyd County is a rural Southwest Virginia county with residential demand.'; tip1='Regional'; region='Blue Ridge highlands' }
  @{ slug='williamsburg'; seat='Williamsburg'; name='Williamsburg'; studio='$850–$1,700'; family='$3,000–$7,000+'; hourly='$120–$185/hr for a 2-person crew'; notes='Williamsburg is an independent city with strong historical, tourism, and educational demand.'; tip1='Tourist'; region='Historic Triangle' }
  @{ slug='brunswick'; seat='Lawrenceville'; name='Brunswick'; studio='$750–$1,500'; family='$2,600–$5,800+'; hourly='$110–$165/hr for a 2-person crew'; notes='Brunswick County is a rural Southside Virginia county with residential demand centered on Lawrenceville.'; tip1='Regional'; region='Southside Virginia' }
  @{ slug='clarke'; seat='Berryville'; name='Clarke'; studio='$850–$1,700'; family='$3,000–$7,000+'; hourly='$120–$185/hr for a 2-person crew'; notes='Clarke County is a rural Northern Virginia county in the Shenandoah Valley with residential demand.'; tip1='Regional'; region='Shenandoah Valley' }
  @{ slug='falls-church'; seat='Falls Church'; name='Falls Church'; studio='$950–$2,000'; family='$3,800–$9,000+'; hourly='$135–$210/hr for a 2-person crew'; notes='Falls Church is an independent city in Northern Virginia with dense urban and residential demand.'; tip1='Heavy DC metro'; region='Northern Virginia' }
  @{ slug='grayson'; seat='Independence'; name='Grayson'; studio='$750–$1,500'; family='$2,600–$5,800+'; hourly='$110–$165/hr for a 2-person crew'; notes='Grayson County is a rural Southwest Virginia county with residential demand centered on Independence.'; tip1='Regional'; region='Southwest Virginia' }
  @{ slug='nelson'; seat='Lovingston'; name='Nelson'; studio='$750–$1,500'; family='$2,600–$5,800+'; hourly='$110–$165/hr for a 2-person crew'; notes='Nelson County is a rural Central Virginia county with residential demand centered on Lovingston.'; tip1='Regional'; region='Central Virginia' }
  @{ slug='alleghany'; seat='Covington'; name='Alleghany'; studio='$750–$1,500'; family='$2,600–$5,800+'; hourly='$110–$165/hr for a 2-person crew'; notes='Alleghany County is a rural Western Virginia county with residential demand centered on Covington.'; tip1='Regional'; region='Western Virginia' }
  @{ slug='madison'; seat='Madison'; name='Madison'; studio='$750–$1,500'; family='$2,600–$5,800+'; hourly='$110–$165/hr for a 2-person crew'; notes='Madison County is a rural Central Virginia county with residential demand.'; tip1='Regional'; region='Central Virginia piedmont' }
  @{ slug='martinsville'; seat='Martinsville'; name='Martinsville'; studio='$750–$1,500'; family='$2,600–$5,800+'; hourly='$110–$165/hr for a 2-person crew'; notes='Martinsville is an independent city in South Central Virginia with residential demand.'; tip1='Regional'; region='Southside Virginia' }
  @{ slug='poquoson'; seat='Poquoson'; name='Poquoson'; studio='$850–$1,700'; family='$3,000–$7,500+'; hourly='$120–$185/hr for a 2-person crew'; notes='Poquoson is an independent city on the Virginia Peninsula with residential demand.'; tip1='Hampton Roads'; region='Hampton Roads' }
  @{ slug='amelia'; seat='Amelia Court House'; name='Amelia'; studio='$750–$1,500'; family='$2,600–$5,800+'; hourly='$110–$165/hr for a 2-person crew'; notes='Amelia County is a rural Central Virginia county with residential demand centered on Amelia Court House.'; tip1='Regional'; region='Central Virginia' }
  @{ slug='dickenson'; seat='Clintwood'; name='Dickenson'; studio='$750–$1,500'; family='$2,600–$5,800+'; hourly='$110–$165/hr for a 2-person crew'; notes='Dickenson County is a rural Southwest Virginia county with residential demand centered on Clintwood.'; tip1='Regional'; region='Southwest Virginia coalfields' }
  @{ slug='northumberland'; seat='Heathsville'; name='Northumberland'; studio='$750–$1,500'; family='$2,600–$5,800+'; hourly='$110–$165/hr for a 2-person crew'; notes='Northumberland County is a rural Northern Neck county with residential demand centered on Heathsville.'; tip1='Regional'; region='Northern Neck' }
  @{ slug='lunenburg'; seat='Lunenburg'; name='Lunenburg'; studio='$750–$1,500'; family='$2,600–$5,800+'; hourly='$110–$165/hr for a 2-person crew'; notes='Lunenburg County is a rural Southside Virginia county with residential demand.'; tip1='Regional'; region='Southside Virginia' }
  @{ slug='northampton'; seat='Eastville'; name='Northampton'; studio='$750–$1,500'; family='$2,600–$5,800+'; hourly='$110–$165/hr for a 2-person crew'; notes='Northampton County is a rural Eastern Shore county with residential and tourism demand.'; tip1='Regional'; region='Eastern Shore' }
  @{ slug='charlotte'; seat='Charlotte Court House'; name='Charlotte'; studio='$750–$1,500'; family='$2,600–$5,800+'; hourly='$110–$165/hr for a 2-person crew'; notes='Charlotte County is a rural South Central Virginia county with residential demand centered on Charlotte Court House.'; tip1='Regional'; region='South Central Virginia' }
  @{ slug='greensville'; seat='Emporia'; name='Greensville'; studio='$750–$1,500'; family='$2,600–$5,800+'; hourly='$110–$165/hr for a 2-person crew'; notes='Greensville County is a rural Southside Virginia county with residential demand centered on Emporia.'; tip1='Regional'; region='Southside Virginia' }
  @{ slug='lancaster'; seat='Lancaster'; name='Lancaster'; studio='$750–$1,500'; family='$2,600–$5,800+'; hourly='$110–$165/hr for a 2-person crew'; notes='Lancaster County is a rural Northern Neck county with residential demand.'; tip1='Regional'; region='Northern Neck' }
  @{ slug='sussex'; seat='Sussex'; name='Sussex'; studio='$750–$1,500'; family='$2,600–$5,800+'; hourly='$110–$165/hr for a 2-person crew'; notes='Sussex County is a rural Southside Virginia county with residential demand.'; tip1='Regional'; region='Southside Virginia' }
  @{ slug='middlesex'; seat='Saluda'; name='Middlesex'; studio='$750–$1,500'; family='$2,600–$5,800+'; hourly='$110–$165/hr for a 2-person crew'; notes='Middlesex County is a rural Northern Neck county with residential demand centered on Saluda.'; tip1='Regional'; region='Middle Peninsula' }
)

$researchLines = New-Object System.Collections.Generic.List[string]
$testimonialLines = New-Object System.Collections.Generic.List[string]
$overrideLines = New-Object System.Collections.Generic.List[string]
$nearbyLines = New-Object System.Collections.Generic.List[string]
$validateLines = New-Object System.Collections.Generic.List[string]
$sitemapSlugs = New-Object System.Collections.Generic.List[string]

$nearbyMap = @{
  'colonial-heights' = @('petersburg','hopewell','chesterfield','prince-george','dinwiddie')
  'buchanan' = @('dickenson','wise','tazewell','russell','mcdowell')
  'southampton' = @('isle-of-wight','suffolk','franklin-city','greensville','sussex')
  'patrick' = @('carroll','henry','floyd','stuart','martinsville')
  'appomattox' = @('lynchburg','campbell','amherst','bedford','buckingham')
  'radford' = @('montgomery','pulaski','giles','christiansburg','wythe')
  'buckingham' = @('appomattox','nelson','fluvanna','cumberland','amherst')
  'manassas-park' = @('manassas','prince-william','fairfax','loudoun','stafford')
  'giles' = @('pulaski','montgomery','bland','mercer','tazewell')
  'bristol' = @('washington','scott','sullivan','wise','abingdon')
  'nottoway' = @('amelia','lunenburg','prince-edward','dinwiddie','chesterfield')
  'floyd' = @('carroll','patrick','montgomery','pulaski','roanoke')
  'williamsburg' = @('james-city','york','newport-news','charles-city','gloucester')
  'brunswick' = @('greensville','lunenburg','mecklenburg','halifax','nottoway')
  'clarke' = @('frederick','warren','loudoun','fauquier','shenandoah')
  'falls-church' = @('arlington','fairfax','alexandria','fairfax-city','prince-william')
  'grayson' = @('carroll','wythe','surry','ashe','galax')
  'nelson' = @('amherst','augusta','albemarle','buckingham','appomattox')
  'alleghany' = @('botetourt','rockbridge','bath','craig','covington')
  'madison' = @('orange','culpeper','greene','page','rappahannock')
  'martinsville' = @('henry','patrick','rockingham','pittsylvania','franklin')
  'poquoson' = @('york','hampton','newport-news','james-city','gloucester')
  'amelia' = @('powhatan','chesterfield','nottoway','cumberland','prince-edward')
  'dickenson' = @('wise','buchanan','russell','scott','pike')
  'northumberland' = @('lancaster','richmond-county','westmoreland','essex','king-george')
  'lunenburg' = @('nottoway','brunswick','mecklenburg','charlotte','greensville')
  'northampton' = @('accomack','virginia-beach','norfolk','mathews','gloucester')
  'charlotte' = @('lunenburg','campbell','pittsylvania','halifax','mecklenburg')
  'greensville' = @('emporia','sussex','southampton','brunswick','dinwiddie')
  'lancaster' = @('northumberland','richmond-county','middlesex','king-george','westmoreland')
  'sussex' = @('dinwiddie','greensville','southampton','prince-george','surry')
  'middlesex' = @('lancaster','gloucester','mathews','king-and-queen','richmond-county')
}

$i = 0
foreach ($c in $counties) {
  $key = if ($c.slug -match '-') { "'$($c.slug)'" } else { $c.slug }
  $sitemapSlugs.Add("'$($c.slug)'")

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
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
"@)

  $tmName = [char](65 + ($i % 26)) + '. ' + [char](65 + (($i+1) % 26)) + '.'
  $testimonialLines.Add(@"
  ${key}: [
    {
      quote:
        'Two Men and a Truck $($c.name) handled our relocation professionally — on time, efficient, and extremely careful.',
      name: '$tmName',
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

  $overrideLines.Add("  $($key): { seat: '$($c.seat)', metro: '$($c.slug)-metro-va' },")

  $neighbors = $nearbyMap[$c.slug] | ForEach-Object { "'$_'" }
  $neighborList = ($neighbors -join ', ')
  $nearbyLines.Add(@"
  ${key}: [
    $neighborList
  ],
"@)

  $validateLines.Add("  { stateSlug: 'virginia', countySlug: '$($c.slug)', expectedCity: '$($c.seat)' },")
  $i++
}

# Research
$researchPath = Join-Path $root 'data\virginia-county-research.ts'
$research = Get-Content $researchPath -Raw
if ($research -notmatch 'colonial-heights:') {
  $research = $research -replace 'batches 1–7', 'batches 1–8'
  $block = $researchLines -join "`n"
  $research = $research -replace "(\s+'new-kent': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$block`$2"
  Set-Content $researchPath $research -Encoding UTF8 -NoNewline
  Write-Host 'Patched research'
}

# Testimonials
$testPath = Join-Path $root 'data\virginia-county-testimonials.ts'
$test = Get-Content $testPath -Raw
if ($test -notmatch 'colonial-heights:') {
  $block = $testimonialLines -join "`n"
  $test = $test -replace "(\s+'new-kent': \[[\s\S]*?\n  \],\r?\n)(\};)", "`$1$block`$2"
  Set-Content $testPath $test -Encoding UTF8 -NoNewline
  Write-Host 'Patched testimonials'
}

# Overrides
$overridePath = Join-Path $root 'lib\local-movers\geography\virginia-overrides.ts'
$override = Get-Content $overridePath -Raw
if ($override -notmatch 'colonial-heights:') {
  $block = $overrideLines -join "`n"
  $override = $override -replace '(\s+''new-kent'': \{ seat: ''New Kent'', metro: ''new-kent-metro-va'' \},\r?\n)(\};)', "`$1$block`$2"
  Set-Content $overridePath $override -Encoding UTF8 -NoNewline
  Write-Host 'Patched overrides'
}

# Nearby
$nearbyPath = Join-Path $root 'lib\local-movers\virginia-nearby.ts'
$nearby = Get-Content $nearbyPath -Raw
if ($nearby -notmatch 'colonial-heights:') {
  $block = $nearbyLines -join "`n"
  $nearby = $nearby -replace "(\s+'new-kent': \[[\s\S]*?\n  \],\r?\n)(\};)", "`$1$block`$2"
  Set-Content $nearbyPath $nearby -Encoding UTF8 -NoNewline
  Write-Host 'Patched nearby'
}

# Sitemap
$sitemapPath = Join-Path $root 'app\sitemap-local\sitemap.ts'
$sitemap = Get-Content $sitemapPath -Raw
if ($sitemap -notmatch "'colonial-heights'") {
  $slugBlock = ($sitemapSlugs -join ",`n  ") + ","
  $sitemap = $sitemap -replace "(\s+'new-kent',\r?\n)(\]\);)", "`$1  $slugBlock`$2"
  Set-Content $sitemapPath $sitemap -Encoding UTF8 -NoNewline
  Write-Host 'Patched sitemap'
}

# Validate
$validatePath = Join-Path $root 'scripts\validate-county-schema.ts'
$validate = Get-Content $validatePath -Raw
if ($validate -notmatch "countySlug: 'colonial-heights'") {
  $block = $validateLines -join "`n"
  $validate = $validate -replace "(\{ stateSlug: 'virginia', countySlug: 'new-kent', expectedCity: 'New Kent' \},)", "`$1`n$block"
  Set-Content $validatePath $validate -Encoding UTF8 -NoNewline
  Write-Host 'Patched validate'
}

Write-Host 'Batch 8 data patch complete'