$root = Split-Path $PSScriptRoot -Parent
$seed = Join-Path $root 'data\local-movers-seed.ts'
$outDir = Join-Path $PSScriptRoot 'va-batch9-output'
$catalog = Get-Content (Join-Path $outDir 'catalog-movers.txt') -Raw
$pools = Get-Content (Join-Path $outDir 'metro-pools.txt') -Raw
$content = Get-Content $seed -Raw

if ($content -match "'two-men-and-a-truck-essex-va': \{") {
  Write-Host 'VA batch 9 catalog already inserted — skipping catalog'
} else {
  $content = $content -replace "(\s+'krupp-moving-saluda-va': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$catalog`$2"
  Write-Host 'Inserted VA batch 9 catalog movers'
}

if ($content -match "'essex-metro-va': \{") {
  Write-Host 'VA batch 9 metro pools already inserted — skipping pools'
} else {
  $content = $content -replace "(\s+'middlesex-metro-va': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$pools`$2"
  Write-Host 'Inserted VA batch 9 metro pools'
}

Set-Content $seed $content -Encoding UTF8 -NoNewline
Write-Host 'VA batch 9 insert complete'