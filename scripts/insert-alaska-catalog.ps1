$root = Split-Path $PSScriptRoot -Parent
$seed = Join-Path $root 'data\local-movers-seed.ts'
$outDir = Join-Path $PSScriptRoot 'alaska-output'
$catalog = Get-Content (Join-Path $outDir 'catalog-movers.txt') -Raw
$pools = Get-Content (Join-Path $outDir 'metro-pools.txt') -Raw
$content = Get-Content $seed -Raw

if ($content -match "'twomenandatruck-anchorage-ak': \{") {
  Write-Host 'Alaska catalog already inserted — skipping catalog'
} else {
  $content = $content -replace "(\s+'krupp-moving-kalaupapa-hi': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$catalog`$2"
  Write-Host 'Inserted Alaska catalog movers'
}

if ($content -match "'anchorage-metro-ak': \{") {
  Write-Host 'Alaska metro pools already inserted — skipping pools'
} else {
  $content = $content -replace "(\s+'kalawao-metro-hi': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$pools`$2"
  Write-Host 'Inserted Alaska metro pools'
}

Set-Content $seed $content -Encoding UTF8 -NoNewline
Write-Host 'Alaska insert complete'