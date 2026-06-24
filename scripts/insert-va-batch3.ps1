$root = Split-Path $PSScriptRoot -Parent
$seed = Join-Path $root 'data\local-movers-seed.ts'
$outDir = Join-Path $PSScriptRoot 'va-batch3-output'
$catalog = Get-Content (Join-Path $outDir 'catalog-movers.txt') -Raw
$pools = Get-Content (Join-Path $outDir 'metro-pools.txt') -Raw
$content = Get-Content $seed -Raw

if ($content -match 'two-men-and-a-truck-henrico-va') {
  Write-Host 'VA batch 3 catalog already inserted — skipping'
  exit 0
}

$content = $content -replace "(\s+'krupp-moving-chesterfield-va': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$catalog`$2"
$content = $content -replace "(\s+'chesterfield-metro-va': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$pools`$2"

Set-Content $seed $content -Encoding UTF8 -NoNewline
Write-Host 'Inserted VA batch 3 catalog movers and metro pools into local-movers-seed.ts'