$outDir = Join-Path $PSScriptRoot 'dc-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$moverIds = @(
  'twomenandatruck-washingtondc',
  'allmysons-washingtondc',
  'beltway-movers-washingtondc',
  'washington-dc-moving-district-of-columbia-dc',
  'district-of-columbia-local-moving-district-of-columbia-dc',
  'college-hunks-moving-washington-dc-dc',
  'budd-van-lines-washington-dc-dc',
  'capitol-hill-moving-district-of-columbia-dc',
  'georgetown-moving-district-of-columbia-dc',
  'potomac-corridor-moving-district-of-columbia-dc',
  'federal-district-moving-district-of-columbia-dc',
  'nova-relocation-district-of-columbia-dc',
  'hercules-movers-washington-dc-dc',
  'krupp-moving-washington-dc-dc',
  'metro-dc-relocation-district-of-columbia-dc'
)

$movers = @(
  @{
    id = 'twomenandatruck-washingtondc'
    name = 'Two Men and a Truck Washington DC'
    rating = 4.7
    reviews = 2840
    desc = 'Trusted local franchise with excellent reputation for urban residential and commercial moves in the DC area.'
    services = "['Local Moving', 'Packing', 'Storage']"
    specialties = "['Residential', 'Commercial']"
    bbb = 'A+'
  },
  @{
    id = 'allmysons-washingtondc'
    name = 'All My Sons Moving & Storage DC'
    rating = 4.6
    reviews = 1960
    desc = 'Established mover known for reliable local and long-distance services in the DC metro.'
    services = "['Local Moving', 'Long Distance', 'Packing']"
    specialties = "['Residential', 'Commercial']"
    bbb = 'A'
  },
  @{
    id = 'beltway-movers-washingtondc'
    name = 'Beltway Movers DC'
    rating = 4.8
    reviews = 1180
    desc = 'Local favorite for careful handling and punctuality in urban DC environments.'
    services = "['Local Moving', 'Packing']"
    specialties = "['Residential']"
    bbb = 'A+'
  },
  @{
    id = 'washington-dc-moving-district-of-columbia-dc'
    name = 'Washington DC Moving'
    rating = 4.7
    reviews = 920
    desc = 'Full-service local mover serving all DC quadrants with rowhouse and apartment expertise.'
    services = "['Local Moving', 'Packing', 'Storage']"
    specialties = "['Residential', 'Commercial']"
    bbb = 'A+'
  },
  @{
    id = 'district-of-columbia-local-moving-district-of-columbia-dc'
    name = 'District of Columbia Local Moving'
    rating = 4.6
    reviews = 740
    desc = 'District-focused mover with experience navigating historic buildings and federal corridor relocations.'
    services = "['Local Moving', 'Packing']"
    specialties = "['Residential']"
    bbb = 'A'
  },
  @{
    id = 'college-hunks-moving-washington-dc-dc'
    name = 'College Hunks Moving Washington DC'
    rating = 4.6
    reviews = 1580
    desc = 'National franchise with strong local presence for residential and light commercial moves across the capital.'
    services = "['Local Moving', 'Packing', 'Junk Removal']"
    specialties = "['Residential', 'Commercial']"
    bbb = 'A'
  },
  @{
    id = 'budd-van-lines-washington-dc-dc'
    name = 'Budd Van Lines Washington DC'
    rating = 4.5
    reviews = 620
    desc = 'Established van line agent serving Washington, DC with careful handling for urban and diplomatic relocations.'
    services = "['Local Moving', 'Long Distance', 'Packing']"
    specialties = "['Residential', 'Commercial']"
    bbb = 'A'
  },
  @{
    id = 'capitol-hill-moving-district-of-columbia-dc'
    name = 'Capitol Hill Moving'
    rating = 4.8
    reviews = 540
    desc = 'Neighborhood specialist for Capitol Hill, Navy Yard, and Southeast DC rowhouse and condo moves.'
    services = "['Local Moving', 'Packing']"
    specialties = "['Residential']"
    bbb = 'A+'
  },
  @{
    id = 'georgetown-moving-district-of-columbia-dc'
    name = 'Georgetown Moving'
    rating = 4.7
    reviews = 480
    desc = 'Careful local mover serving Georgetown, Palisades, and Northwest DC with narrow-street expertise.'
    services = "['Local Moving', 'Packing']"
    specialties = "['Residential']"
    bbb = 'A+'
  },
  @{
    id = 'potomac-corridor-moving-district-of-columbia-dc'
    name = 'Potomac Corridor Moving'
    rating = 4.6
    reviews = 410
    desc = 'Regional mover serving Southwest Waterfront, Capitol Riverfront, and Potomac-adjacent DC communities.'
    services = "['Local Moving', 'Packing', 'Storage']"
    specialties = "['Residential', 'Commercial']"
    bbb = 'A'
  },
  @{
    id = 'federal-district-moving-district-of-columbia-dc'
    name = 'Federal District Moving'
    rating = 4.7
    reviews = 390
    desc = 'DC-area mover experienced with government, diplomatic, and high-security building relocations.'
    services = "['Local Moving', 'Packing']"
    specialties = "['Residential', 'Commercial']"
    bbb = 'A+'
  },
  @{
    id = 'nova-relocation-district-of-columbia-dc'
    name = 'NOVA Relocation DC'
    rating = 4.6
    reviews = 360
    desc = 'Northern Virginia–DC corridor specialist for cross-jurisdiction local and short-distance moves.'
    services = "['Local Moving', 'Packing', 'Storage']"
    specialties = "['Residential', 'Commercial']"
    bbb = 'A'
  },
  @{
    id = 'hercules-movers-washington-dc-dc'
    name = 'Hercules Movers Washington DC'
    rating = 4.5
    reviews = 310
    desc = 'Local DC mover with careful residential relocations and packing services across urban neighborhoods.'
    services = "['Local Moving', 'Packing', 'Storage']"
    specialties = "['Residential', 'Commercial']"
    bbb = 'A+'
  },
  @{
    id = 'krupp-moving-washington-dc-dc'
    name = 'Krupp Moving Washington DC'
    rating = 4.5
    reviews = 285
    desc = 'Full-service local mover serving Washington, DC with apartment, condo, and townhouse expertise.'
    services = "['Local Moving', 'Packing', 'Storage']"
    specialties = "['Residential', 'Commercial']"
    bbb = 'A+'
  },
  @{
    id = 'metro-dc-relocation-district-of-columbia-dc'
    name = 'Metro DC Relocation'
    rating = 4.6
    reviews = 340
    desc = 'Metro-wide relocation specialist for DC, Northern Virginia, and Maryland short-distance moves.'
    services = "['Local Moving', 'Packing']"
    specialties = "['Residential', 'Commercial']"
    bbb = 'A'
  }
)

$catalog = ($movers | ForEach-Object {
@"
  '$($_.id)': {
    id: '$($_.id)',
    name: '$($_.name)',
    rating: $($_.rating),
    reviewCount: $($_.reviews),
    shortDescription:
      '$($_.desc)',
    services: $($_.services),
    specialties: $($_.specialties),
    fmcsaSafetyRating: 'Not Rated',
    bbbRating: '$($_.bbb)',
    city: 'Washington',
  },
"@
}) -join "`n"

$poolIds = ($moverIds | ForEach-Object { "      '$_'," }) -join "`n"

$pool = @"
  'washington-dc-metro-dc': {
    id: 'washington-dc-metro-dc',
    label: 'Washington DC Metro',
    moverIds: [
$poolIds
    ],
  },
"@

Set-Content (Join-Path $outDir 'catalog-movers.txt') $catalog -Encoding UTF8
Set-Content (Join-Path $outDir 'metro-pool.txt') $pool -Encoding UTF8
Write-Host "Generated $($movers.Count) catalog entries and metro pool in dc-output/"