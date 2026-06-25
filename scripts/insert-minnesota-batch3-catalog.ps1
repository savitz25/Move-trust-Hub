$root = Split-Path $PSScriptRoot -Parent
$seed = Join-Path $root 'data\local-movers-seed.ts'
$outDir = Join-Path $PSScriptRoot 'minnesota-batch3-output'
$catalog = Get-Content (Join-Path $outDir 'catalog-movers.txt') -Raw
$pools = Get-Content (Join-Path $outDir 'metro-pools.txt') -Raw
$content = Get-Content $seed -Raw

if ($content -match "'regional-lesueur-mn-movers': \{") {
  Write-Host 'Minnesota batch 3 catalog already inserted — skipping catalog'
} else {
  $content = $content -replace "(\s+'krupp-moving-crookston-mn': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$catalog`$2"
  Write-Host 'Inserted Minnesota batch 3 catalog movers'
}

if ($content -match "'le-sueur-metro-mn': \{") {
  Write-Host 'Minnesota batch 3 metro pools already inserted — skipping pools'
} else {
  $content = $content -replace "(\s+'polk-metro-mn': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$pools`$2"
  Write-Host 'Inserted Minnesota batch 3 metro pools'
}

Set-Content $seed $content -Encoding UTF8 -NoNewline
Write-Host 'Minnesota batch 3 insert complete'