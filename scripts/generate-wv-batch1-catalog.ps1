# Generates West Virginia batch 1 catalog movers + metro pools for local-movers-seed.ts
$counties = @(
  @{ slug='kanawha'; city='Charleston'; citySlug='charleston'; regional1='kanawha-valley'; regional2='capital-city'; label='Charleston Metro' },
  @{ slug='berkeley'; city='Martinsburg'; citySlug='martinsburg'; regional1='eastern-panhandle'; regional2='panhandle-berkeley'; label='Martinsburg Metro' },
  @{ slug='monongalia'; city='Morgantown'; citySlug='morgantown'; regional1='mountaineer'; regional2='wvu-area'; label='Morgantown Metro' },
  @{ slug='cabell'; city='Huntington'; citySlug='huntington'; regional1='ohio-river'; regional2='tri-state'; label='Huntington Metro' },
  @{ slug='wood'; city='Parkersburg'; citySlug='parkersburg'; regional1='mid-ohio-valley'; regional2='parkersburg-valley'; label='Parkersburg Metro' },
  @{ slug='raleigh'; city='Beckley'; citySlug='beckley'; regional1='southern-west-virginia'; regional2='beckley-mountain'; label='Beckley Metro' },
  @{ slug='jefferson'; city='Charles Town'; citySlug='charles-town'; regional1='eastern-panhandle'; regional2='shenandoah-valley'; label='Charles Town Metro' },
  @{ slug='harrison'; city='Clarksburg'; citySlug='clarksburg'; regional1='north-central-west-virginia'; regional2='clarksburg-unity'; label='Clarksburg Metro' },
  @{ slug='mercer'; city='Princeton'; citySlug='princeton'; regional1='coal-fields'; regional2='princeton-plateau'; label='Princeton Metro' }
)

$countyNames = @{
  'kanawha' = 'Kanawha'
  'berkeley' = 'Berkeley'
  'monongalia' = 'Monongalia'
  'cabell' = 'Cabell'
  'wood' = 'Wood'
  'raleigh' = 'Raleigh'
  'jefferson' = 'Jefferson'
  'harrison' = 'Harrison'
  'mercer' = 'Mercer'
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

  $names = @(
    "Two Men and a Truck $city",
    "$city Moving & Storage",
    "$countyName County Moving",
    "Budd Van Lines $city",
    "All My Sons Moving $city",
    "College Hunks Moving $city",
    "$(($c.regional1 -replace '-', ' ' | ForEach-Object { $_ }) -join ' ' | ForEach-Object { (Get-Culture).TextInfo.ToTitleCase($_) }) Moving",
    "$(($c.regional2 -replace '-', ' ' | ForEach-Object { $_ }) -join ' ' | ForEach-Object { (Get-Culture).TextInfo.ToTitleCase($_) }) Moving",
    "Hercules Movers $city",
    "Krupp Moving $city"
  )

  # Fix regional names manually
  $regionalNames = @{
    'kanawha-valley' = 'Kanawha Valley Moving'
    'capital-city' = 'Capital City Moving'
    'eastern-panhandle' = 'Eastern Panhandle Moving'
    'panhandle-berkeley' = 'Panhandle Berkeley Moving'
    'mountaineer' = 'Mountaineer Moving'
    'wvu-area' = 'WVU Area Moving'
    'ohio-river' = 'Ohio River Moving'
    'tri-state' = 'Tri-State Moving'
    'mid-ohio-valley' = 'Mid-Ohio Valley Moving'
    'parkersburg-valley' = 'Parkersburg Valley Moving'
    'southern-west-virginia' = 'Southern West Virginia Moving'
    'beckley-mountain' = 'Beckley Mountain Moving'
    'shenandoah-valley' = 'Shenandoah Valley Moving'
    'north-central-west-virginia' = 'North Central West Virginia Moving'
    'clarksburg-unity' = 'Clarksburg Unity Moving'
    'coal-fields' = 'Coal Fields Moving'
    'princeton-plateau' = 'Princeton Plateau Moving'
  }

  $regional1Name = $regionalNames[$c.regional1]
  $regional2Name = $regionalNames[$c.regional2]
  $displayNames = @(
    "Two Men and a Truck $city",
    "$city Moving & Storage",
    "$countyName County Moving",
    "Budd Van Lines $city",
    "All My Sons Moving $city",
    "College Hunks Moving $city",
    $regional1Name,
    $regional2Name,
    "Hercules Movers $city",
    "Krupp Moving $city"
  )

  $ratings = @(4.7, 4.6, 4.5, 4.6, 4.5, 4.7, 4.5, 4.4, 4.6, 4.5)
  $reviews = @(1420, 485, 312, 278, 892, 1185, 245, 198, 356, 224)
  $descs = @(
    "Trusted $city franchise with excellent reputation for residential and commercial moves across $countyName County.",
    "Established $city mover serving $countyName County with full-service residential and corporate relocations.",
    "Local $countyName County mover with careful residential relocations and packing services across $city neighborhoods.",
    "Full-service $city agent with strong corporate and residential relocation experience across $countyName County.",
    "National franchise serving $city with full-service residential moves and packing across $countyName County.",
    "Popular $city franchise known for efficient local moves, junk removal, and packing across $countyName County.",
    "Regional $city mover serving $countyName County with full-service residential and light commercial relocations.",
    "Established $countyName County agent with careful handling and transparent pricing across the $city area.",
    "Full-service $city agent serving $countyName County residential and commercial relocations.",
    "Local $city mover serving $countyName County with full-service residential relocations and storage options."
  )

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
      '$($descs[$i])',
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

$outDir = Join-Path $PSScriptRoot 'wv-batch1-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null
$moverLines -join "`n" | Set-Content (Join-Path $outDir 'catalog-movers.txt') -Encoding UTF8
$poolLines -join "`n" | Set-Content (Join-Path $outDir 'metro-pools.txt') -Encoding UTF8
Write-Host "Wrote catalog and metro pool snippets to $outDir"