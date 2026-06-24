$root = Split-Path $PSScriptRoot -Parent
$seed = Join-Path $root 'data\local-movers-seed.ts'
$outDir = Join-Path $PSScriptRoot 'wv-batch2-output'
$catalog = Get-Content (Join-Path $outDir 'catalog-movers.txt') -Raw
$pools = Get-Content (Join-Path $outDir 'metro-pools.txt') -Raw
$content = Get-Content $seed -Raw

if ($content -match 'two-men-and-a-truck-putnam-wv') {
  Write-Host 'WV batch 2 catalog already inserted — skipping'
  exit 0
}

$content = $content -replace "(\s+'krupp-moving-princeton-wv': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$catalog`$2"
$content = $content -replace "(\s+'princeton-metro-wv': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$pools`$2"

Set-Content $seed $content -Encoding UTF8 -NoNewline
Write-Host 'Inserted WV batch 2 catalog movers and metro pools'