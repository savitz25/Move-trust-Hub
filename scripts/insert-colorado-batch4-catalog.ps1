$root = Split-Path $PSScriptRoot -Parent
$seed = Join-Path $root 'data\local-movers-seed.ts'
$outDir = Join-Path $PSScriptRoot 'colorado-batch4-output'
$catalog = Get-Content (Join-Path $outDir 'catalog-movers.txt') -Raw
$pools = Get-Content (Join-Path $outDir 'metro-pools.txt') -Raw
$content = Get-Content $seed -Raw

if ($content -match "'regional-saguache-co-movers': \{") {
  Write-Host 'Colorado batch 4 catalog already inserted — skipping catalog'
} else {
  $content = $content -replace "(\s+'krupp-moving-walsenburg-co': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$catalog`$2"
  Write-Host 'Inserted Colorado batch 4 catalog movers'
}

if ($content -match "'saguache-metro-co': \{") {
  Write-Host 'Colorado batch 4 metro pools already inserted — skipping pools'
} else {
  $content = $content -replace "(\s+'huerfano-metro-co': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$pools`$2"
  Write-Host 'Inserted Colorado batch 4 metro pools'
}

Set-Content $seed $content -Encoding UTF8 -NoNewline
Write-Host 'Colorado batch 4 insert complete'