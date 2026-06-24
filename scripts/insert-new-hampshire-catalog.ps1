$root = Split-Path $PSScriptRoot -Parent
$seed = Join-Path $root 'data\local-movers-seed.ts'
$outDir = Join-Path $PSScriptRoot 'new-hampshire-output'
$catalog = Get-Content (Join-Path $outDir 'catalog-movers.txt') -Raw
$pools = Get-Content (Join-Path $outDir 'metro-pools.txt') -Raw
$content = Get-Content $seed -Raw

if ($content -match "'twomenandatruck-hillsborough-nh': \{") {
  Write-Host 'New Hampshire catalog already inserted — skipping catalog'
} else {
  $content = $content -replace "(\s+'krupp-moving-guildhall-vt': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$catalog`$2"
  Write-Host 'Inserted New Hampshire catalog movers'
}

if ($content -match "'hillsborough-metro-nh': \{") {
  Write-Host 'New Hampshire metro pools already inserted — skipping pools'
} else {
  $content = $content -replace "(\s+'essex-metro-vt': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$pools`$2"
  Write-Host 'Inserted New Hampshire metro pools'
}

Set-Content $seed $content -Encoding UTF8 -NoNewline
Write-Host 'New Hampshire insert complete'