$root = Split-Path $PSScriptRoot -Parent
$seed = Join-Path $root 'data\local-movers-seed.ts'
$outDir = Join-Path $PSScriptRoot 'wyoming-catalog-output'
$catalog = Get-Content (Join-Path $outDir 'catalog-movers.txt') -Raw
$pools = Get-Content (Join-Path $outDir 'metro-pools.txt') -Raw
$content = Get-Content $seed -Raw

if ($content -match "'twomenandatruck-laramie-wy': \{") {
  Write-Host 'Wyoming catalog already inserted — skipping catalog'
} else {
  $content = $content -replace "(\s+'krupp-moving-winnett-mt': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$catalog`$2"
  Write-Host 'Inserted Wyoming catalog movers'
}

if ($content -match "'laramie-metro-wy': \{") {
  Write-Host 'Wyoming metro pools already inserted — skipping pools'
} else {
  $content = $content -replace "(\s+'petroleum-metro-mt': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$pools`$2"
  Write-Host 'Inserted Wyoming metro pools'
}

Set-Content $seed $content -Encoding UTF8 -NoNewline
Write-Host 'Wyoming insert complete'