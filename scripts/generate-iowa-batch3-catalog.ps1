$outDir = Join-Path $PSScriptRoot 'iowa-batch3-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function Quote-Ts([string]$s) {
  if ($s -match "'") { return '"' + $s + '"' }
  return "'" + $s + "'"
}

$counties = @(
  @{ slug='floyd'; city='Charles City'; citySlug='charles-city'; label='Charles City Metro'; poolId='floyd-metro-ia'; regional1='charles-city-corridor'; regional2='cedar-river-floyd'; topId='regional-floyd-ia-movers'; topName='Regional Charles City / Floyd Providers'; topDesc='Reliable movers serving Floyd County residential needs across Charles City and Cedar River north-central Iowa corridor communities.'; countyMovingName='Floyd County Moving'; regional1Name='Charles City Corridor Moving'; regional2Name='Cedar River Floyd Moving'; countyLabel='Floyd County, IA'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='page'; city='Clarinda'; citySlug='clarinda'; label='Clarinda Metro'; poolId='page-metro-ia'; regional1='clarinda-corridor'; regional2='nishnabotna-valley'; topId='regional-page-ia-movers'; topName='Regional Clarinda / Page Providers'; topDesc='Reliable movers serving Page County residential needs across Clarinda and Nishnabotna River southwest Iowa corridor communities.'; countyMovingName='Page County Moving'; regional1Name='Clarinda Corridor Moving'; regional2Name='Nishnabotna Valley Moving'; countyLabel='Page County, IA'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='harrison'; city='Logan'; citySlug='logan'; label='Logan Metro'; poolId='harrison-metro-ia'; regional1='logan-corridor'; regional2='missouri-river-harrison'; topId='regional-harrison-ia-movers'; topName='Regional Logan / Harrison Providers'; topDesc='Reliable movers serving Harrison County residential needs across Logan and Missouri River western Iowa corridor communities.'; countyMovingName='Harrison County Moving'; regional1Name='Logan Corridor Moving'; regional2Name='Missouri River Harrison Moving'; countyLabel='Harrison County, IA'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='allamakee'; city='Waukon'; citySlug='waukon'; label='Waukon Metro'; poolId='allamakee-metro-ia'; regional1='waukon-corridor'; regional2='upper-iowa-north'; topId='regional-allamakee-ia-movers'; topName='Regional Waukon / Allamakee Providers'; topDesc='Reliable movers serving Allamakee County residential needs across Waukon and Upper Iowa River northeast Iowa corridor communities.'; countyMovingName='Allamakee County Moving'; regional1Name='Waukon Corridor Moving'; regional2Name='Upper Iowa North Moving'; countyLabel='Allamakee County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='obrien'; city='Primghar'; citySlug='primghar'; label='Primghar Metro'; poolId='obrien-metro-ia'; regional1='primghar-corridor'; regional2='little-sioux-obrien'; topId='regional-obrien-ia-movers'; topName="Regional Primghar / O'Brien Providers"; topDesc="Reliable movers serving O'Brien County residential needs across Primghar and Little Sioux River northwest Iowa corridor communities."; countyMovingName="O'Brien County Moving"; regional1Name='Primghar Corridor Moving'; regional2Name="Little Sioux O'Brien Moving"; countyLabel="O'Brien County, IA"; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='kossuth'; city='Algona'; citySlug='algona'; label='Algona Metro'; poolId='kossuth-metro-ia'; regional1='algona-corridor'; regional2='east-fork-des-moines'; topId='regional-kossuth-ia-movers'; topName='Regional Algona / Kossuth Providers'; topDesc='Reliable movers serving Kossuth County residential needs across Algona and East Fork Des Moines River northern Iowa corridor communities.'; countyMovingName='Kossuth County Moving'; regional1Name='Algona Corridor Moving'; regional2Name='East Fork Des Moines Moving'; countyLabel='Kossuth County, IA'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='butler'; city='Allison'; citySlug='allison'; label='Allison Metro'; poolId='butler-metro-ia'; regional1='allison-corridor'; regional2='shell-rock-valley'; topId='regional-butler-ia-movers'; topName='Regional Allison / Butler Providers'; topDesc='Reliable movers serving Butler County residential needs across Allison and Shell Rock River valley north-central Iowa communities.'; countyMovingName='Butler County Moving'; regional1Name='Allison Corridor Moving'; regional2Name='Shell Rock Valley Moving'; countyLabel='Butler County, IA'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='cass'; city='Atlantic'; citySlug='atlantic'; label='Atlantic Metro'; poolId='cass-metro-ia'; regional1='atlantic-corridor'; regional2='nishnabotna-cass'; topId='regional-cass-ia-movers'; topName='Regional Atlantic / Cass Providers'; topDesc='Reliable movers serving Cass County residential needs across Atlantic and Nishnabotna River southwest Iowa corridor communities.'; countyMovingName='Cass County Moving'; regional1Name='Atlantic Corridor Moving'; regional2Name='Nishnabotna Cass Moving'; countyLabel='Cass County, IA'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='wright'; city='Clarion'; citySlug='clarion'; label='Clarion Metro'; poolId='wright-metro-ia'; regional1='clarion-corridor'; regional2='boone-river-north'; topId='regional-wright-ia-movers'; topName='Regional Clarion / Wright Providers'; topDesc='Reliable movers serving Wright County residential needs across Clarion and Boone River north-central Iowa corridor communities.'; countyMovingName='Wright County Moving'; regional1Name='Clarion Corridor Moving'; regional2Name='Boone River North Moving'; countyLabel='Wright County, IA'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='grundy'; city='Grundy Center'; citySlug='grundy-center'; label='Grundy Center Metro'; poolId='grundy-metro-ia'; regional1='grundy-center-corridor'; regional2='black-hawk-river'; topId='regional-grundy-ia-movers'; topName='Regional Grundy Center / Grundy Providers'; topDesc='Reliable movers serving Grundy County residential needs across Grundy Center and Black Hawk River central Iowa corridor communities.'; countyMovingName='Grundy County Moving'; regional1Name='Grundy Center Corridor Moving'; regional2Name='Black Hawk River Moving'; countyLabel='Grundy County, IA'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='lyon'; city='Rock Rapids'; citySlug='rock-rapids'; label='Rock Rapids Metro'; poolId='lyon-metro-ia'; regional1='rock-rapids-corridor'; regional2='rock-river-valley'; topId='regional-lyon-ia-movers'; topName='Regional Rock Rapids / Lyon Providers'; topDesc='Reliable movers serving Lyon County residential needs across Rock Rapids and Rock River northwest Iowa corridor communities.'; countyMovingName='Lyon County Moving'; regional1Name='Rock Rapids Corridor Moving'; regional2Name='Rock River Valley Moving'; countyLabel='Lyon County, IA'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='appanoose'; city='Centerville'; citySlug='centerville'; label='Centerville Metro'; poolId='appanoose-metro-ia'; regional1='centerville-corridor'; regional2='chariton-river-valley'; topId='regional-appanoose-ia-movers'; topName='Regional Centerville / Appanoose Providers'; topDesc='Reliable movers serving Appanoose County residential needs across Centerville and Chariton River southern Iowa corridor communities.'; countyMovingName='Appanoose County Moving'; regional1Name='Centerville Corridor Moving'; regional2Name='Chariton River Valley Moving'; countyLabel='Appanoose County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='union'; city='Creston'; citySlug='creston'; label='Creston Metro'; poolId='union-metro-ia'; regional1='creston-corridor'; regional2='grand-river-valley'; topId='regional-union-ia-movers'; topName='Regional Creston / Union Providers'; topDesc='Reliable movers serving Union County residential needs across Creston and Grand River south-central Iowa corridor communities.'; countyMovingName='Union County Moving'; regional1Name='Creston Corridor Moving'; regional2Name='Grand River Valley Moving'; countyLabel='Union County, IA'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='chickasaw'; city='New Hampton'; citySlug='new-hampton'; label='New Hampton Metro'; poolId='chickasaw-metro-ia'; regional1='new-hampton-corridor'; regional2='turkey-river-chickasaw'; topId='regional-chickasaw-ia-movers'; topName='Regional New Hampton / Chickasaw Providers'; topDesc='Reliable movers serving Chickasaw County residential needs across New Hampton and Turkey River northeast Iowa corridor communities.'; countyMovingName='Chickasaw County Moving'; regional1Name='New Hampton Corridor Moving'; regional2Name='Turkey River Chickasaw Moving'; countyLabel='Chickasaw County, IA'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='shelby'; city='Harlan'; citySlug='harlan'; label='Harlan Metro'; poolId='shelby-metro-ia'; regional1='harlan-corridor'; regional2='west-nishnabotna'; topId='regional-shelby-ia-movers'; topName='Regional Harlan / Shelby Providers'; topDesc='Reliable movers serving Shelby County residential needs across Harlan and West Nishnabotna River western Iowa corridor communities.'; countyMovingName='Shelby County Moving'; regional1Name='Harlan Corridor Moving'; regional2Name='West Nishnabotna Moving'; countyLabel='Shelby County, IA'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='cherokee'; city='Cherokee'; citySlug='cherokee'; label='Cherokee Metro'; poolId='cherokee-metro-ia'; regional1='cherokee-corridor'; regional2='little-sioux-cherokee'; topId='regional-cherokee-ia-movers'; topName='Regional Cherokee / Cherokee County Providers'; topDesc='Reliable movers serving Cherokee County residential needs across Cherokee and Little Sioux River northwest Iowa corridor communities.'; countyMovingName='Cherokee County Moving'; regional1Name='Cherokee Corridor Moving'; regional2Name='Little Sioux Cherokee Moving'; countyLabel='Cherokee County, IA'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='guthrie'; city='Guthrie Center'; citySlug='guthrie-center'; label='Guthrie Center Metro'; poolId='guthrie-metro-ia'; regional1='guthrie-center-corridor'; regional2='middle-raccoon-guthrie'; topId='regional-guthrie-ia-movers'; topName='Regional Guthrie Center / Guthrie Providers'; topDesc='Reliable movers serving Guthrie County residential needs across Guthrie Center and Middle Raccoon River central Iowa corridor communities.'; countyMovingName='Guthrie County Moving'; regional1Name='Guthrie Center Corridor Moving'; regional2Name='Middle Raccoon Guthrie Moving'; countyLabel='Guthrie County, IA'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='mitchell'; city='Osage'; citySlug='osage'; label='Osage Metro'; poolId='mitchell-metro-ia'; regional1='osage-corridor'; regional2='cedar-river-mitchell'; topId='regional-mitchell-ia-movers'; topName='Regional Osage / Mitchell Providers'; topDesc='Reliable movers serving Mitchell County residential needs across Osage and Cedar River northern Iowa corridor communities.'; countyMovingName='Mitchell County Moving'; regional1Name='Osage Corridor Moving'; regional2Name='Cedar River Mitchell Moving'; countyLabel='Mitchell County, IA'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='hancock'; city='Garner'; citySlug='garner'; label='Garner Metro'; poolId='hancock-metro-ia'; regional1='garner-corridor'; regional2='west-fork-cedar'; topId='regional-hancock-ia-movers'; topName='Regional Garner / Hancock Providers'; topDesc='Reliable movers serving Hancock County residential needs across Garner and West Fork Cedar River north-central Iowa corridor communities.'; countyMovingName='Hancock County Moving'; regional1Name='Garner Corridor Moving'; regional2Name='West Fork Cedar Moving'; countyLabel='Hancock County, IA'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='louisa'; city='Wapello'; citySlug='wapello'; label='Wapello Metro'; poolId='louisa-metro-ia'; regional1='wapello-corridor'; regional2='iowa-river-louisa'; topId='regional-louisa-ia-movers'; topName='Regional Wapello / Louisa Providers'; topDesc='Reliable movers serving Louisa County residential needs across Wapello town and Iowa River southeast Iowa corridor communities.'; countyMovingName='Louisa County Moving'; regional1Name='Wapello Corridor Moving'; regional2Name='Iowa River Louisa Moving'; countyLabel='Louisa County, IA'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='winnebago'; city='Forest City'; citySlug='forest-city'; label='Forest City Metro'; poolId='winnebago-metro-ia'; regional1='forest-city-corridor'; regional2='winnebago-river-north'; topId='regional-winnebago-ia-movers'; topName='Regional Forest City / Winnebago Providers'; topDesc='Reliable movers serving Winnebago County residential needs across Forest City and Winnebago River northern Iowa corridor communities.'; countyMovingName='Winnebago County Moving'; regional1Name='Forest City Corridor Moving'; regional2Name='Winnebago River North Moving'; countyLabel='Winnebago County, IA'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='montgomery'; city='Red Oak'; citySlug='red-oak'; label='Red Oak Metro'; poolId='montgomery-metro-ia'; regional1='red-oak-corridor'; regional2='east-nishnabotna'; topId='regional-montgomery-ia-movers'; topName='Regional Red Oak / Montgomery Providers'; topDesc='Reliable movers serving Montgomery County residential needs across Red Oak and East Nishnabotna River southwest Iowa corridor communities.'; countyMovingName='Montgomery County Moving'; regional1Name='Red Oak Corridor Moving'; regional2Name='East Nishnabotna Moving'; countyLabel='Montgomery County, IA'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='keokuk'; city='Sigourney'; citySlug='sigourney'; label='Sigourney Metro'; poolId='keokuk-metro-ia'; regional1='sigourney-corridor'; regional2='english-river-valley'; topId='regional-keokuk-ia-movers'; topName='Regional Sigourney / Keokuk County Providers'; topDesc='Reliable movers serving Keokuk County residential needs across Sigourney and English River southeast Iowa corridor communities.'; countyMovingName='Keokuk County Moving'; regional1Name='Sigourney Corridor Moving'; regional2Name='English River Valley Moving'; countyLabel='Keokuk County, IA'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='franklin'; city='Hampton'; citySlug='hampton'; label='Hampton Metro'; poolId='franklin-metro-ia'; regional1='hampton-corridor'; regional2='iowa-river-franklin'; topId='regional-franklin-ia-movers'; topName='Regional Hampton / Franklin Providers'; topDesc='Reliable movers serving Franklin County residential needs across Hampton and Iowa River north-central Iowa corridor communities.'; countyMovingName='Franklin County Moving'; regional1Name='Hampton Corridor Moving'; regional2Name='Iowa River Franklin Moving'; countyLabel='Franklin County, IA'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='clarke'; city='Osceola'; citySlug='osceola'; label='Osceola Metro'; poolId='clarke-metro-ia'; regional1='osceola-corridor'; regional2='des-moines-river-clarke'; topId='regional-clarke-ia-movers'; topName='Regional Osceola / Clarke Providers'; topDesc='Reliable movers serving Clarke County residential needs across Osceola and Des Moines River south-central Iowa corridor communities.'; countyMovingName='Clarke County Moving'; regional1Name='Osceola Corridor Moving'; regional2Name='Des Moines River Clarke Moving'; countyLabel='Clarke County, IA'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='calhoun'; city='Rockwell City'; citySlug='rockwell-city'; label='Rockwell City Metro'; poolId='calhoun-metro-ia'; regional1='rockwell-city-corridor'; regional2='north-raccoon-valley'; topId='regional-calhoun-ia-movers'; topName='Regional Rockwell City / Calhoun Providers'; topDesc='Reliable movers serving Calhoun County residential needs across Rockwell City and North Raccoon River central Iowa corridor communities.'; countyMovingName='Calhoun County Moving'; regional1Name='Rockwell City Corridor Moving'; regional2Name='North Raccoon Valley Moving'; countyLabel='Calhoun County, IA'; franchise=$false; topSpecialties="['Residential']" }
)

function Format-MoverBlock($m) {
  $nameQ = Quote-Ts $m.name
  $descQ = Quote-Ts $m.desc
  $cityQ = Quote-Ts $m.city
  $bbb = if ($m.bbb) { "bbbRating: '$($m.bbb)'," } else { '' }
@"
  '$($m.id)': {
    id: '$($m.id)',
    name: $nameQ,
    rating: $($m.rating),
    reviewCount: $($m.reviews),
    shortDescription:
      $descQ,
    services: $($m.services),
    specialties: $($m.specialties),
    fmcsaSafetyRating: 'Not Rated',
    $bbb
    city: $cityQ,
  },
"@
}

$allCatalog = @()
$allPools = @()

foreach ($c in $counties) {
  $slug = $c.slug
  $citySlug = $c.citySlug
  $ids = @(
    $c.topId,
    "all-my-sons-$citySlug-ia",
    "$citySlug-moving-$slug-ia",
    "$slug-county-moving-$slug-ia",
    "college-hunks-moving-$citySlug-ia",
    "budd-van-lines-$citySlug-ia",
    "$($c.regional1)-moving-$slug-ia",
    "$($c.regional2)-moving-$slug-ia",
    "hercules-movers-$citySlug-ia",
    "krupp-moving-$citySlug-ia"
  )

  $topServices = "['Local Moving', 'Packing']"
  $movers = @(
    @{ id=$ids[0]; name=$c.topName; rating=4.7; reviews=340; desc=$c.topDesc; services=$topServices; specialties=$c.topSpecialties; bbb='A'; city=$c.city }
    @{ id=$ids[1]; name="All My Sons Moving & Storage $($c.city)"; rating=4.6; reviews=1580; desc="Established mover known for reliable local and long-distance services in $($c.city) and $($c.countyLabel)."; services="['Local Moving', 'Long Distance', 'Packing']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[2]; name="$($c.city) Moving"; rating=4.7; reviews=1120; desc="Full-service local mover serving $($c.city) and $($c.countyLabel) with careful residential relocations."; services="['Local Moving', 'Packing']"; specialties="['Residential']"; bbb='A+'; city=$c.city }
    @{ id=$ids[3]; name=$c.countyMovingName; rating=4.6; reviews=840; desc="County-focused mover with experience across $($c.city) and surrounding $($c.countyLabel) neighborhoods."; services="['Local Moving', 'Packing', 'Storage']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[4]; name="College Hunks Moving $($c.city)"; rating=4.6; reviews=1420; desc="National franchise with strong local presence for residential and light commercial moves in $($c.city)."; services="['Local Moving', 'Packing', 'Junk Removal']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[5]; name="Budd Van Lines $($c.city)"; rating=4.5; reviews=620; desc="Established van line agent serving $($c.city) with careful handling for local and regional relocations."; services="['Local Moving', 'Long Distance', 'Packing']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[6]; name=$c.regional1Name; rating=4.7; reviews=510; desc="Regional mover serving $($c.city) and $($c.countyLabel) communities with steady scheduling and careful handling."; services="['Local Moving', 'Packing']"; specialties="['Residential']"; bbb='A+'; city=$c.city }
    @{ id=$ids[7]; name=$c.regional2Name; rating=4.6; reviews=440; desc="Local specialist for $($c.countyLabel) residential moves with punctual arrival and professional crew coordination."; services="['Local Moving', 'Packing']"; specialties="['Residential']"; bbb='A'; city=$c.city }
    @{ id=$ids[8]; name="Hercules Movers $($c.city)"; rating=4.5; reviews=380; desc="Local $($c.city) mover with careful residential relocations and packing services."; services="['Local Moving', 'Packing', 'Storage']"; specialties="['Residential', 'Commercial']"; bbb='A+'; city=$c.city }
    @{ id=$ids[9]; name="Krupp Moving $($c.city)"; rating=4.5; reviews=340; desc="Full-service local mover serving $($c.city) and $($c.countyLabel)."; services="['Local Moving', 'Packing', 'Storage']"; specialties="['Residential', 'Commercial']"; bbb='A+'; city=$c.city }
  )

  $allCatalog += ($movers | ForEach-Object { Format-MoverBlock $_ })
  $poolIds = ($ids | ForEach-Object { "      '$_'," }) -join "`n"
  $labelQ = Quote-Ts $c.label
  $allPools += @"
  '$($c.poolId)': {
    id: '$($c.poolId)',
    label: $labelQ,
    moverIds: [
$poolIds
    ],
  },
"@
}

Set-Content (Join-Path $outDir 'catalog-movers.txt') ($allCatalog -join "`n") -Encoding UTF8
Set-Content (Join-Path $outDir 'metro-pools.txt') ($allPools -join "`n") -Encoding UTF8
Write-Host 'Generated 260 catalog entries, 26 metro pools for Iowa batch 3'