# Generates West Virginia batch 3 catalog movers + metro pools
$counties = @(
  @{ slug='upshur'; city='Buckhannon'; citySlug='buckhannon'; regional1='north-central-west-virginia'; regional2='buckhannon-university'; label='Buckhannon Metro' },
  @{ slug='nicholas'; city='Summersville'; citySlug='summersville'; regional1='gauley-river'; regional2='central-west-virginia'; label='Summersville Metro' },
  @{ slug='mingo'; city='Williamson'; citySlug='williamson'; regional1='coalfields-mingo'; regional2='tug-fork'; label='Williamson Metro' },
  @{ slug='brooke'; city='Wellsburg'; citySlug='wellsburg'; regional1='northern-panhandle'; regional2='ohio-river-brooke'; label='Wellsburg Metro' },
  @{ slug='boone'; city='Madison'; citySlug='madison'; regional1='coalfields-boone'; regional2='southern-west-virginia'; label='Madison Metro' },
  @{ slug='wyoming'; city='Pineville'; citySlug='pineville'; regional1='coalfields-wyoming'; regional2='pineville-plateau'; label='Pineville Metro' },
  @{ slug='lincoln'; city='Hamlin'; citySlug='hamlin'; regional1='huntington-collar'; regional2='lincoln-county-local'; label='Hamlin Metro' },
  @{ slug='morgan'; city='Berkeley Springs'; citySlug='berkeley-springs'; regional1='eastern-panhandle'; regional2='potomac-springs'; label='Berkeley Springs Metro' },
  @{ slug='mcdowell'; city='Welch'; citySlug='welch'; regional1='coalfields-mcdowell'; regional2='southern-coalfields'; label='Welch Metro' },
  @{ slug='lewis'; city='Weston'; citySlug='weston'; regional1='north-central-west-virginia'; regional2='lewis-county-weston'; label='Weston Metro' },
  @{ slug='taylor'; city='Grafton'; citySlug='grafton'; regional1='north-central-west-virginia'; regional2='grafton-railroad'; label='Grafton Metro' },
  @{ slug='barbour'; city='Philippi'; citySlug='philippi'; regional1='north-central-west-virginia'; regional2='philippi-covered-bridge'; label='Philippi Metro' },
  @{ slug='hardy'; city='Moorefield'; citySlug='moorefield'; regional1='south-branch'; regional2='hardy-county-local'; label='Moorefield Metro' },
  @{ slug='wetzel'; city='New Martinsville'; citySlug='new-martinsville'; regional1='ohio-river-wetzel'; regional2='northern-panhandle-wetzel'; label='New Martinsville Metro' },
  @{ slug='roane'; city='Spencer'; citySlug='spencer'; regional1='central-west-virginia'; regional2='roane-county-spencer'; label='Spencer Metro' }
)

$countyNames = @{
  'upshur' = 'Upshur'
  'nicholas' = 'Nicholas'
  'mingo' = 'Mingo'
  'brooke' = 'Brooke'
  'boone' = 'Boone'
  'wyoming' = 'Wyoming'
  'lincoln' = 'Lincoln'
  'morgan' = 'Morgan'
  'mcdowell' = 'McDowell'
  'lewis' = 'Lewis'
  'taylor' = 'Taylor'
  'barbour' = 'Barbour'
  'hardy' = 'Hardy'
  'wetzel' = 'Wetzel'
  'roane' = 'Roane'
}

$regionalNames = @{
  'north-central-west-virginia' = 'North Central West Virginia Moving'
  'buckhannon-university' = 'Buckhannon University Moving'
  'gauley-river' = 'Gauley River Moving'
  'central-west-virginia' = 'Central West Virginia Moving'
  'coalfields-mingo' = 'Coalfields Mingo Moving'
  'tug-fork' = 'Tug Fork Moving'
  'northern-panhandle' = 'Northern Panhandle Moving'
  'ohio-river-brooke' = 'Ohio River Brooke Moving'
  'coalfields-boone' = 'Coalfields Boone Moving'
  'southern-west-virginia' = 'Southern West Virginia Moving'
  'coalfields-wyoming' = 'Coalfields Wyoming Moving'
  'pineville-plateau' = 'Pineville Plateau Moving'
  'huntington-collar' = 'Huntington Collar Moving'
  'lincoln-county-local' = 'Lincoln County Local Moving'
  'eastern-panhandle' = 'Eastern Panhandle Moving'
  'potomac-springs' = 'Potomac Springs Moving'
  'coalfields-mcdowell' = 'Coalfields McDowell Moving'
  'southern-coalfields' = 'Southern Coalfields Moving'
  'lewis-county-weston' = 'Lewis County Weston Moving'
  'grafton-railroad' = 'Grafton Railroad Moving'
  'philippi-covered-bridge' = 'Philippi Covered Bridge Moving'
  'south-branch' = 'South Branch Moving'
  'hardy-county-local' = 'Hardy County Local Moving'
  'ohio-river-wetzel' = 'Ohio River Wetzel Moving'
  'northern-panhandle-wetzel' = 'Northern Panhandle Wetzel Moving'
  'roane-county-spencer' = 'Roane County Spencer Moving'
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
  $reviews = @(1180, 412, 276, 248, 798, 1055, 218, 172, 302, 198)

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

$outDir = Join-Path $PSScriptRoot 'wv-batch3-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null
$moverLines -join "`n" | Set-Content (Join-Path $outDir 'catalog-movers.txt') -Encoding UTF8
$poolLines -join "`n" | Set-Content (Join-Path $outDir 'metro-pools.txt') -Encoding UTF8
Write-Host "Wrote batch 3 catalog and metro pool snippets to $outDir"