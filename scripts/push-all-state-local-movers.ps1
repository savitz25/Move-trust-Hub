# Generate and push local mover data one state at a time
param(
  [string[]]$States = @(),
  [switch]$All
)

$ErrorActionPreference = "Stop"
Set-Location (Split-Path $PSScriptRoot -Parent)

$order = @(
  "georgia", "south-carolina", "alabama", "north-carolina", "tennessee",
  "alaska", "arizona", "arkansas", "california", "colorado", "connecticut",
  "delaware", "hawaii", "idaho", "illinois", "indiana", "iowa", "kansas",
  "kentucky", "louisiana", "maine", "maryland", "massachusetts", "michigan",
  "minnesota", "mississippi", "missouri", "montana", "nebraska", "nevada",
  "new-hampshire", "new-jersey", "new-mexico", "new-york", "north-dakota",
  "ohio", "oklahoma", "oregon", "pennsylvania", "rhode-island", "south-dakota",
  "texas", "utah", "vermont", "virginia", "washington", "west-virginia",
  "wisconsin", "wyoming"
)

if ($All) {
  $States = $order
}

if ($States.Count -eq 0) {
  Write-Host "Usage: ./scripts/push-all-state-local-movers.ps1 -States georgia,south-carolina"
  Write-Host "   or: ./scripts/push-all-state-local-movers.ps1 -All"
  exit 1
}

foreach ($state in $States) {
  Write-Host "`n=== Processing $state ===" -ForegroundColor Cyan
  npx tsx scripts/generate-state-local-movers.ts $state
  if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

  git add data/generated "data/us-counties-fips.json" lib/local-movers scripts/generate-state-local-movers.ts scripts/push-all-state-local-movers.ps1 lib/local-movers/build-county-assignments.ts lib/local-movers/catalog.ts 2>$null
  git add -A data/generated/

  $name = (Get-Culture).TextInfo.ToTitleCase($state.Replace('-', ' '))
  git commit -m "Add local movers for all $name counties (3-5 per county)"
  if ($LASTEXITCODE -ne 0) {
    Write-Host "Nothing to commit for $state, skipping push" -ForegroundColor Yellow
    continue
  }

  git push origin main
  if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
  Write-Host "Pushed $state" -ForegroundColor Green
}