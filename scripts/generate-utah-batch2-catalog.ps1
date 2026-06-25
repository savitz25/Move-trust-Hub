$outDir = Join-Path $PSScriptRoot 'utah-batch2-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function Quote-Ts([string]$s) {
  if ($s -match "'") { return '"' + $s + '"' }
  return "'" + $s + "'"
}

$counties = @(
  @{ slug='washington'; city='St. George'; citySlug='st-george'; label='St. George Metro'; poolId='washington-metro-ut'; regional1='st-george-corridor'; regional2='color-country'; topId='regional-washington-ut-movers'; topName='Regional St. George / Washington Providers'; topDesc='Reliable movers serving Washington County residential needs across St. George and southwestern Utah color country communities.'; countyMovingName='Washington County Moving'; regional1Name='St. George Corridor Moving'; regional2Name='Color Country Moving'; countyLabel='Washington County, UT' },
  @{ slug='cache'; city='Logan'; citySlug='logan'; label='Logan Metro'; poolId='cache-metro-ut'; regional1='logan-corridor'; regional2='cache-valley'; topId='regional-cache-ut-movers'; topName='Regional Logan / Cache Providers'; topDesc='Reliable movers serving Cache County residential needs across Logan and northern Utah cache valley communities.'; countyMovingName='Cache County Moving'; regional1Name='Logan Corridor Moving'; regional2Name='Cache Valley Moving'; countyLabel='Cache County' },
  @{ slug='tooele'; city='Tooele'; citySlug='tooele'; label='Tooele Metro'; poolId='tooele-metro-ut'; regional1='tooele-corridor'; regional2='great-salt-lake-west'; topId='regional-tooele-ut-movers'; topName='Regional Tooele / Tooele County Providers'; topDesc='Reliable movers serving Tooele County residential needs across Tooele and Great Salt Lake west communities.'; countyMovingName='Tooele County Moving'; regional1Name='Tooele Corridor Moving'; regional2Name='Great Salt Lake West Moving'; countyLabel='Tooele County' },
  @{ slug='iron'; city='Cedar City'; citySlug='cedar-city'; label='Cedar City Metro'; poolId='iron-metro-ut'; regional1='cedar-city-corridor'; regional2='iron-county-south'; topId='regional-iron-ut-movers'; topName='Regional Cedar City / Iron Providers'; topDesc='Reliable movers serving Iron County residential needs across Cedar City and southern Utah communities.'; countyMovingName='Iron County Moving'; regional1Name='Cedar City Corridor Moving'; regional2Name='Iron County South Moving'; countyLabel='Iron County' },
  @{ slug='box-elder'; city='Brigham City'; citySlug='brigham-city'; label='Brigham City Metro'; poolId='box-elder-metro-ut'; regional1='brigham-corridor'; regional2='bear-river'; topId='regional-boxelder-ut-movers'; topName='Regional Brigham City / Box Elder Providers'; topDesc='Reliable movers serving Box Elder County residential needs across Brigham City and northern Utah bear river communities.'; countyMovingName='Box Elder County Moving'; regional1Name='Brigham Corridor Moving'; regional2Name='Bear River Moving'; countyLabel='Box Elder County' },
  @{ slug='summit'; city='Park City'; citySlug='park-city'; label='Park City Metro'; poolId='summit-metro-ut'; regional1='park-city-corridor'; regional2='wasatch-back'; topId='regional-summit-ut-movers'; topName='Regional Park City / Summit Providers'; topDesc='Reliable movers serving Summit County residential needs across Park City and Wasatch Back resort communities.'; countyMovingName='Summit County Moving'; regional1Name='Park City Corridor Moving'; regional2Name='Wasatch Back Moving'; countyLabel='Summit County' },
  @{ slug='wasatch'; city='Heber City'; citySlug='heber-city'; label='Heber City Metro'; poolId='wasatch-metro-ut'; regional1='heber-corridor'; regional2='provo-canyon'; topId='regional-wasatch-ut-movers'; topName='Regional Heber City / Wasatch Providers'; topDesc='Reliable movers serving Wasatch County residential needs across Heber City and Provo Canyon communities.'; countyMovingName='Wasatch County Moving'; regional1Name='Heber Corridor Moving'; regional2Name='Provo Canyon Moving'; countyLabel='Wasatch County' },
  @{ slug='uintah'; city='Vernal'; citySlug='vernal'; label='Vernal Metro'; poolId='uintah-metro-ut'; regional1='vernal-corridor'; regional2='uinta-basin'; topId='regional-uintah-ut-movers'; topName='Regional Vernal / Uintah Providers'; topDesc='Reliable movers serving Uintah County residential needs across Vernal and eastern Utah Uinta Basin communities.'; countyMovingName='Uintah County Moving'; regional1Name='Vernal Corridor Moving'; regional2Name='Uinta Basin Moving'; countyLabel='Uintah County' },
  @{ slug='sanpete'; city='Manti'; citySlug='manti'; label='Manti Metro'; poolId='sanpete-metro-ut'; regional1='manti-corridor'; regional2='sanpete-valley'; topId='regional-sanpete-ut-movers'; topName='Regional Manti / Sanpete Providers'; topDesc='Reliable movers serving Sanpete County residential needs across Manti and central Utah valley communities.'; countyMovingName='Sanpete County Moving'; regional1Name='Manti Corridor Moving'; regional2Name='Sanpete Valley Moving'; countyLabel='Sanpete County' },
  @{ slug='sevier'; city='Richfield'; citySlug='richfield'; label='Richfield Metro'; poolId='sevier-metro-ut'; regional1='richfield-corridor'; regional2='sevier-valley'; topId='regional-sevier-ut-movers'; topName='Regional Richfield / Sevier Providers'; topDesc='Reliable movers serving Sevier County residential needs across Richfield and central Utah Sevier Valley communities.'; countyMovingName='Sevier County Moving'; regional1Name='Richfield Corridor Moving'; regional2Name='Sevier Valley Moving'; countyLabel='Sevier County' },
  @{ slug='duchesne'; city='Duchesne'; citySlug='duchesne'; label='Duchesne Metro'; poolId='duchesne-metro-ut'; regional1='duchesne-corridor'; regional2='uinta-mountains'; topId='regional-duchesne-ut-movers'; topName='Regional Duchesne / Duchesne County Providers'; topDesc='Reliable movers serving Duchesne County residential needs across Duchesne and Uinta Mountains communities.'; countyMovingName='Duchesne County Moving'; regional1Name='Duchesne Corridor Moving'; regional2Name='Uinta Mountains Moving'; countyLabel='Duchesne County' },
  @{ slug='carbon'; city='Price'; citySlug='price'; label='Price Metro'; poolId='carbon-metro-ut'; regional1='price-corridor'; regional2='carbon-county-east'; topId='regional-carbon-ut-movers'; topName='Regional Price / Carbon Providers'; topDesc='Reliable movers serving Carbon County residential needs across Price and eastern Utah coal country communities.'; countyMovingName='Carbon County Moving'; regional1Name='Price Corridor Moving'; regional2Name='Carbon County East Moving'; countyLabel='Carbon County' },
  @{ slug='san-juan'; city='Monticello'; citySlug='monticello'; label='Monticello Metro'; poolId='san-juan-metro-ut'; regional1='monticello-corridor'; regional2='four-corners'; topId='regional-sanjuan-ut-movers'; topName='Regional Monticello / San Juan Providers'; topDesc='Reliable movers serving San Juan County residential needs across Monticello and southeastern Utah four corners communities.'; countyMovingName='San Juan County Moving'; regional1Name='Monticello Corridor Moving'; regional2Name='Four Corners Moving'; countyLabel='San Juan County, UT' },
  @{ slug='millard'; city='Fillmore'; citySlug='fillmore'; label='Fillmore Metro'; poolId='millard-metro-ut'; regional1='fillmore-corridor'; regional2='millard-county-central'; topId='regional-millard-ut-movers'; topName='Regional Fillmore / Millard Providers'; topDesc='Reliable movers serving Millard County residential needs across Fillmore and central Utah communities.'; countyMovingName='Millard County Moving'; regional1Name='Fillmore Corridor Moving'; regional2Name='Millard County Central Moving'; countyLabel='Millard County' },
  @{ slug='juab'; city='Nephi'; citySlug='nephi'; label='Nephi Metro'; poolId='juab-metro-ut'; regional1='nephi-corridor'; regional2='juab-valley'; topId='regional-juab-ut-movers'; topName='Regional Nephi / Juab Providers'; topDesc='Reliable movers serving Juab County residential needs across Nephi and central Utah valley communities.'; countyMovingName='Juab County Moving'; regional1Name='Nephi Corridor Moving'; regional2Name='Juab Valley Moving'; countyLabel='Juab County' },
  @{ slug='morgan'; city='Morgan'; citySlug='morgan'; label='Morgan Metro'; poolId='morgan-metro-ut'; regional1='morgan-corridor'; regional2='morgan-valley'; topId='regional-morgan-ut-movers'; topName='Regional Morgan / Morgan County Providers'; topDesc='Reliable movers serving Morgan County residential needs across Morgan and northern Utah valley communities.'; countyMovingName='Morgan County Moving'; regional1Name='Morgan Corridor Moving'; regional2Name='Morgan Valley Moving'; countyLabel='Morgan County' },
  @{ slug='emery'; city='Castle Dale'; citySlug='castle-dale'; label='Castle Dale Metro'; poolId='emery-metro-ut'; regional1='castle-dale-corridor'; regional2='emery-county-central'; topId='regional-emery-ut-movers'; topName='Regional Castle Dale / Emery Providers'; topDesc='Reliable movers serving Emery County residential needs across Castle Dale and central Utah communities.'; countyMovingName='Emery County Moving'; regional1Name='Castle Dale Corridor Moving'; regional2Name='Emery County Central Moving'; countyLabel='Emery County' },
  @{ slug='grand'; city='Moab'; citySlug='moab'; label='Moab Metro'; poolId='grand-metro-ut'; regional1='moab-corridor'; regional2='canyon-country'; topId='regional-grand-ut-movers'; topName='Regional Moab / Grand Providers'; topDesc='Reliable movers serving Grand County residential needs across Moab and southeastern Utah canyon country communities.'; countyMovingName='Grand County Moving'; regional1Name='Moab Corridor Moving'; regional2Name='Canyon Country Moving'; countyLabel='Grand County' },
  @{ slug='kane'; city='Kanab'; citySlug='kanab'; label='Kanab Metro'; poolId='kane-metro-ut'; regional1='kanab-corridor'; regional2='grand-staircase'; topId='regional-kane-ut-movers'; topName='Regional Kanab / Kane Providers'; topDesc='Reliable movers serving Kane County residential needs across Kanab and southern Utah Grand Staircase communities.'; countyMovingName='Kane County Moving'; regional1Name='Kanab Corridor Moving'; regional2Name='Grand Staircase Moving'; countyLabel='Kane County' },
  @{ slug='beaver'; city='Beaver'; citySlug='beaver'; label='Beaver Metro'; poolId='beaver-metro-ut'; regional1='beaver-corridor'; regional2='beaver-valley'; topId='regional-beaver-ut-movers'; topName='Regional Beaver / Beaver County Providers'; topDesc='Reliable movers serving Beaver County residential needs across Beaver and southwestern Utah valley communities.'; countyMovingName='Beaver County Moving'; regional1Name='Beaver Corridor Moving'; regional2Name='Beaver Valley Moving'; countyLabel='Beaver County' },
  @{ slug='garfield'; city='Panguitch'; citySlug='panguitch'; label='Panguitch Metro'; poolId='garfield-metro-ut'; regional1='panguitch-corridor'; regional2='bryce-canyon-area'; topId='regional-garfield-ut-movers'; topName='Regional Panguitch / Garfield Providers'; topDesc='Reliable movers serving Garfield County residential needs across Panguitch and Bryce Canyon area communities.'; countyMovingName='Garfield County Moving'; regional1Name='Panguitch Corridor Moving'; regional2Name='Bryce Canyon Area Moving'; countyLabel='Garfield County' },
  @{ slug='rich'; city='Randolph'; citySlug='randolph'; label='Randolph Metro'; poolId='rich-metro-ut'; regional1='randolph-corridor'; regional2='bear-lake-north'; topId='regional-rich-ut-movers'; topName='Regional Randolph / Rich Providers'; topDesc='Reliable movers serving Rich County residential needs across Randolph and northern Utah Bear Lake communities.'; countyMovingName='Rich County Moving'; regional1Name='Randolph Corridor Moving'; regional2Name='Bear Lake North Moving'; countyLabel='Rich County' },
  @{ slug='wayne'; city='Loa'; citySlug='loa'; label='Loa Metro'; poolId='wayne-metro-ut'; regional1='loa-corridor'; regional2='capitol-reef-area'; topId='regional-wayne-ut-movers'; topName='Regional Loa / Wayne Providers'; topDesc='Reliable movers serving Wayne County residential needs across Loa and Capitol Reef area communities.'; countyMovingName='Wayne County Moving'; regional1Name='Loa Corridor Moving'; regional2Name='Capitol Reef Area Moving'; countyLabel='Wayne County' },
  @{ slug='piute'; city='Junction'; citySlug='junction'; label='Junction Metro'; poolId='piute-metro-ut'; regional1='junction-corridor'; regional2='piute-valley'; topId='regional-piute-ut-movers'; topName='Regional Junction / Piute Providers'; topDesc='Reliable movers serving Piute County residential needs across Junction and central Utah valley communities.'; countyMovingName='Piute County Moving'; regional1Name='Junction Corridor Moving'; regional2Name='Piute Valley Moving'; countyLabel='Piute County' },
  @{ slug='daggett'; city='Manila'; citySlug='manila'; label='Manila Metro'; poolId='daggett-metro-ut'; regional1='manila-corridor'; regional2='flaming-gorge'; topId='regional-daggett-ut-movers'; topName='Regional Manila / Daggett Providers'; topDesc='Reliable movers serving Daggett County residential needs across Manila and Flaming Gorge reservoir communities.'; countyMovingName='Daggett County Moving'; regional1Name='Manila Corridor Moving'; regional2Name='Flaming Gorge Moving'; countyLabel='Daggett County' }
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
$assignmentLines = @()

foreach ($c in $counties) {
  $slug = $c.slug
  $citySlug = $c.citySlug
  $ids = @(
    $c.topId,
    "all-my-sons-$citySlug-ut",
    "$citySlug-moving-$slug-ut",
    "$slug-county-moving-$slug-ut",
    "college-hunks-moving-$citySlug-ut",
    "budd-van-lines-$citySlug-ut",
    "$($c.regional1)-moving-$slug-ut",
    "$($c.regional2)-moving-$slug-ut",
    "hercules-movers-$citySlug-ut",
    "krupp-moving-$citySlug-ut"
  )

  $movers = @(
    @{ id=$ids[0]; name=$c.topName; rating=4.7; reviews=340; desc=$c.topDesc; services="['Local Moving', 'Packing']"; specialties="['Residential']"; bbb='A'; city=$c.city }
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

  $key = if ($slug -match '-') { "'$slug'" } else { $slug }
  $idLines = ($ids | ForEach-Object { "    '$_'," }) -join "`n"
  $assignmentLines += "  $key`: [`n$idLines`n  ],"
}

Set-Content (Join-Path $outDir 'catalog-movers.txt') ($allCatalog -join "`n") -Encoding UTF8
Set-Content (Join-Path $outDir 'metro-pools.txt') ($allPools -join "`n") -Encoding UTF8
Set-Content (Join-Path $outDir 'assignments-snippet.txt') ($assignmentLines -join "`n`n") -Encoding UTF8
Write-Host 'Generated 250 catalog entries, 25 metro pools for Utah batch 2'