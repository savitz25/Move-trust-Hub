$root = Split-Path $PSScriptRoot -Parent
$seed = Join-Path $root 'data\local-movers-seed.ts'
$outDir = Join-Path $PSScriptRoot 'idaho-batch1-output'
$catalog = Get-Content (Join-Path $outDir 'catalog-movers.txt') -Raw
$pools = Get-Content (Join-Path $outDir 'metro-pools.txt') -Raw
$content = Get-Content $seed -Raw

if ($content -match "'twomenandatruck-ada-id': \{") {
  Write-Host 'Idaho batch 1 catalog already inserted — skipping catalog'
} else {
  $content = $content -replace "(\s+'krupp-moving-lake-city-co': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$catalog`$2"
  Write-Host 'Inserted Idaho batch 1 catalog movers'
}

if ($content -match "'ada-metro-id': \{") {
  Write-Host 'Idaho batch 1 metro pools already inserted — skipping pools'
} else {
  $content = $content -replace "(\s+'hinsdale-metro-co': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$pools`$2"
  Write-Host 'Inserted Idaho batch 1 metro pools'
}

Set-Content $seed $content -Encoding UTF8 -NoNewline
Write-Host 'Idaho batch 1 insert complete'