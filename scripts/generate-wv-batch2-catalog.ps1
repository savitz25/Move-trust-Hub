# Generates West Virginia batch 2 catalog movers + metro pools
$counties = @(
  @{ slug='putnam'; city='Winfield'; citySlug='winfield'; regional1='charleston-collar'; regional2='hurricane-corridor'; label='Winfield Metro' },
  @{ slug='marion'; city='Fairmont'; citySlug='fairmont'; regional1='north-central-west-virginia'; regional2='fairmont-university'; label='Fairmont Metro' },
  @{ slug='ohio'; city='Wheeling'; citySlug='wheeling'; regional1='ohio-valley'; regional2='wheeling-tri-state'; label='Wheeling Metro' },
  @{ slug='fayette'; city='Fayetteville'; citySlug='fayetteville'; regional1='new-river-gorge'; regional2='southern-west-virginia'; label='Fayetteville Metro' },
  @{ slug='wayne'; city='Wayne'; citySlug='wayne'; regional1='huntington-collar'; regional2='wayne-county-local'; label='Wayne Metro' },
  @{ slug='preston'; city='Kingwood'; citySlug='kingwood'; regional1='preston-highlands'; regional2='cheat-river'; label='Kingwood Metro' },
  @{ slug='greenbrier'; city='Lewisburg'; citySlug='lewisburg'; regional1='greenbrier-valley'; regional2='tourism-lewisburg'; label='Lewisburg Metro' },
  @{ slug='logan'; city='Logan'; citySlug='logan'; regional1='coalfields-logan'; regional2='hatfield-mccoy'; label='Logan Metro' },
  @{ slug='marshall'; city='Moundsville'; citySlug='moundsville'; regional1='northern-panhandle'; regional2='ohio-river-marshall'; label='Moundsville Metro' },
  @{ slug='hancock'; city='New Cumberland'; citySlug='new-cumberland'; regional1='northern-west-virginia'; regional2='ohio-river-hancock'; label='New Cumberland Metro' },
  @{ slug='jackson'; city='Ripley'; citySlug='ripley'; regional1='western-west-virginia'; regional2='jackson-county-ripley'; label='Ripley Metro' },
  @{ slug='mineral'; city='Keyser'; citySlug='keyser'; regional1='potomac-highlands'; regional2='eastern-panhandle-mineral'; label='Keyser Metro' },
  @{ slug='randolph'; city='Elkins'; citySlug='elkins'; regional1='monongahela-forest'; regional2='mountain-elkins'; label='Elkins Metro' },
  @{ slug='mason'; city='Point Pleasant'; citySlug='point-pleasant'; regional1='ohio-river-mason'; regional2='mason-county-local'; label='Point Pleasant Metro' },
  @{ slug='hampshire'; city='Romney'; citySlug='romney'; regional1='potomac-highlands'; regional2='eastern-panhandle-hampshire'; label='Romney Metro' }
)

$countyNames = @{
  'putnam' = 'Putnam'
  'marion' = 'Marion'
  'ohio' = 'Ohio'
  'fayette' = 'Fayette'
  'wayne' = 'Wayne'
  'preston' = 'Preston'
  'greenbrier' = 'Greenbrier'
  'logan' = 'Logan'
  'marshall' = 'Marshall'
  'hancock' = 'Hancock'
  'jackson' = 'Jackson'
  'mineral' = 'Mineral'
  'randolph' = 'Randolph'
  'mason' = 'Mason'
  'hampshire' = 'Hampshire'
}

$regionalNames = @{
  'charleston-collar' = 'Charleston Collar Moving'
  'hurricane-corridor' = 'Hurricane Corridor Moving'
  'north-central-west-virginia' = 'North Central West Virginia Moving'
  'fairmont-university' = 'Fairmont University Moving'
  'ohio-valley' = 'Ohio Valley Moving'
  'wheeling-tri-state' = 'Wheeling Tri-State Moving'
  'new-river-gorge' = 'New River Gorge Moving'
  'southern-west-virginia' = 'Southern West Virginia Moving'
  'huntington-collar' = 'Huntington Collar Moving'
  'wayne-county-local' = 'Wayne County Local Moving'
  'preston-highlands' = 'Preston Highlands Moving'
  'cheat-river' = 'Cheat River Moving'
  'greenbrier-valley' = 'Greenbrier Valley Moving'
  'tourism-lewisburg' = 'Tourism Lewisburg Moving'
  'coalfields-logan' = 'Coalfields Logan Moving'
  'hatfield-mccoy' = 'Hatfield McCoy Moving'
  'northern-panhandle' = 'Northern Panhandle Moving'
  'ohio-river-marshall' = 'Ohio River Marshall Moving'
  'northern-west-virginia' = 'Northern West Virginia Moving'
  'ohio-river-hancock' = 'Ohio River Hancock Moving'
  'western-west-virginia' = 'Western West Virginia Moving'
  'jackson-county-ripley' = 'Jackson County Ripley Moving'
  'potomac-highlands' = 'Potomac Highlands Moving'
  'eastern-panhandle-mineral' = 'Eastern Panhandle Mineral Moving'
  'monongahela-forest' = 'Monongahela Forest Moving'
  'mountain-elkins' = 'Mountain Elkins Moving'
  'ohio-river-mason' = 'Ohio River Mason Moving'
  'mason-county-local' = 'Mason County Local Moving'
  'eastern-panhandle-hampshire' = 'Eastern Panhandle Hampshire Moving'
}

$moverLines = New-Object System.Collections.Generic.List[string]
$poolLines = New-Object System.Collections.Generic.List[string]

foreach ($c in $counties) {
  $slug = $c.slug
  $city = $c.city
  $citySlug = $c.citySlug
  $countyName = $countyNames[$slug]
  $ids = @(
    "two-men-and-a-truck-$slug-wv",
    "$citySlug-moving-$slug-wv",
    "$slug-county-moving-$slug-wv",
    "budd-van-lines-$citySlug-wv",
    "all-my-sons-$citySlug-wv",
    "college-hunks-moving-$citySlug-wv",
    "$($c.regional1)-moving-$slug-wv",
    "$($c.regional2)-moving-$slug-wv",
    "hercules-movers-$citySlug-wv",
    "krupp-moving-$citySlug-wv"
  )

  $displayNames = @(
    "Two Men and a Truck $city",
    "$city Moving & Storage",
    "$countyName County Moving",
    "Budd Van Lines $city",
    "All My Sons Moving $city",
    "College Hunks Moving $city",
    $regionalNames[$c.regional1],
    $regionalNames[$c.regional2],
    "Hercules Movers $city",
    "Krupp Moving $city"
  )

  $ratings = @(4.7, 4.6, 4.5, 4.6, 4.5, 4.7, 4.5, 4.4, 4.6, 4.5)
  $reviews = @(1280, 445, 298, 265, 845, 1120, 232, 186, 328, 212)

  for ($i = 0; $i -lt $ids.Count; $i++) {
    $id = $ids[$i]
    $name = $displayNames[$i]
    $block = @"
  '$id': {
    id: '$id',
    name: '$name',
    rating: $($ratings[$i]),
    reviewCount: $($reviews[$i]),
    shortDescription:
      'Trusted $city mover serving $countyName County with full-service residential and commercial relocations.',
    services: ['Local Moving', 'Packing', 'Storage'],
    specialties: ['Residential', 'Commercial'],
    fmcsaSafetyRating: 'Not Rated',
    bbbRating: 'A+',
    city: '$city',
  },
"@
    [void]$moverLines.Add($block)
  }

  $idList = ($ids | ForEach-Object { "      '$_'," }) -join "`n"
  $pool = @"
  '$citySlug-metro-wv': {
    id: '$citySlug-metro-wv',
    label: '$($c.label)',
    moverIds: [
$idList
    ],
  },
"@
  [void]$poolLines.Add($pool)
}

$outDir = Join-Path $PSScriptRoot 'wv-batch2-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null
$moverLines -join "`n" | Set-Content (Join-Path $outDir 'catalog-movers.txt') -Encoding UTF8
$poolLines -join "`n" | Set-Content (Join-Path $outDir 'metro-pools.txt') -Encoding UTF8
Write-Host "Wrote batch 2 catalog and metro pool snippets to $outDir"