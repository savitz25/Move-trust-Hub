$root = Split-Path $PSScriptRoot -Parent
$seed = Join-Path $root 'data\local-movers-seed.ts'
$outDir = Join-Path $PSScriptRoot 'minnesota-batch4-output'
$catalog = Get-Content (Join-Path $outDir 'catalog-movers.txt') -Raw
$pools = Get-Content (Join-Path $outDir 'metro-pools.txt') -Raw
$content = Get-Content $seed -Raw

if ($content -match "'regional-cottonwood-mn-movers': \{") {
  Write-Host 'Minnesota batch 4 catalog already inserted — skipping catalog'
} else {
  $content = $content -replace "(\s+'krupp-moving-st-james-mn': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$catalog`$2"
  Write-Host 'Inserted Minnesota batch 4 catalog movers'
}

if ($content -match "'cottonwood-metro-mn': \{") {
  Write-Host 'Minnesota batch 4 metro pools already inserted — skipping pools'
} else {
  $content = $content -replace "(\s+'watonwan-metro-mn': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$pools`$2"
  Write-Host 'Inserted Minnesota batch 4 metro pools'
}

Set-Content $seed $content -Encoding UTF8 -NoNewline
Write-Host 'Minnesota batch 4 insert complete (87/87 counties)'