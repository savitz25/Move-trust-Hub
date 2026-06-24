$root = Split-Path $PSScriptRoot -Parent
$seed = Join-Path $root 'data\local-movers-seed.ts'
$outDir = Join-Path $PSScriptRoot 'arizona-output'
$catalog = Get-Content (Join-Path $outDir 'catalog-movers.txt') -Raw
$pools = Get-Content (Join-Path $outDir 'metro-pools.txt') -Raw
$content = Get-Content $seed -Raw

if ($content -match "'twomenandatruck-maricopa-az': \{") {
  Write-Host 'Arizona catalog already inserted — skipping catalog'
} else {
  $content = $content -replace "(\s+'krupp-moving-goldfield-nv': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$catalog`$2"
  Write-Host 'Inserted Arizona catalog movers'
}

if ($content -match "'maricopa-metro-az': \{") {
  Write-Host 'Arizona metro pools already inserted — skipping pools'
} else {
  $content = $content -replace "(\s+'esmeralda-metro-nv': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$pools`$2"
  Write-Host 'Inserted Arizona metro pools'
}

Set-Content $seed $content -Encoding UTF8 -NoNewline
Write-Host 'Arizona insert complete'