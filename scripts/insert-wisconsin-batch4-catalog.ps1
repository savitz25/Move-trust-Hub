$root = Split-Path $PSScriptRoot -Parent
$seed = Join-Path $root 'data\local-movers-seed.ts'
$outDir = Join-Path $PSScriptRoot 'wisconsin-batch4-output'
$catalog = Get-Content (Join-Path $outDir 'catalog-movers.txt') -Raw
$pools = Get-Content (Join-Path $outDir 'metro-pools.txt') -Raw
$content = Get-Content $seed -Raw

if ($content -match "'regional-taylor-wi-movers': \{") {
  Write-Host 'Wisconsin batch 4 catalog already inserted — skipping catalog'
} else {
  $content = $content -replace "(\s+'krupp-moving-kewaunee-wi': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$catalog`$2"
  Write-Host 'Inserted Wisconsin batch 4 catalog movers'
}

if ($content -match "'taylor-metro-wi': \{") {
  Write-Host 'Wisconsin batch 4 metro pools already inserted — skipping pools'
} else {
  $content = $content -replace "(\s+'kewaunee-metro-wi': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$pools`$2"
  Write-Host 'Inserted Wisconsin batch 4 metro pools'
}

Set-Content $seed $content -Encoding UTF8 -NoNewline
Write-Host 'Wisconsin batch 4 insert complete'