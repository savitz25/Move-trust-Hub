$root = Split-Path $PSScriptRoot -Parent
$seed = Join-Path $root 'data\local-movers-seed.ts'
$outDir = Join-Path $PSScriptRoot 'pennsylvania-batch3-output'
$catalog = Get-Content (Join-Path $outDir 'catalog-movers.txt') -Raw
$pools = Get-Content (Join-Path $outDir 'metro-pools.txt') -Raw
$content = Get-Content $seed -Raw

if ($content -match "'twomenandatruck-luzerne-pa': \{") {
  Write-Host 'Pennsylvania batch 3 catalog already inserted — skipping catalog'
} else {
  $content = $content -replace "(\s+'krupp-moving-greensburg-pa': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$catalog`$2"
  Write-Host 'Inserted Pennsylvania batch 3 catalog movers'
}

if ($content -match "'luzerne-metro-pa': \{") {
  Write-Host 'Pennsylvania batch 3 metro pools already inserted — skipping pools'
} else {
  $content = $content -replace "(\s+'westmoreland-metro-pa': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$pools`$2"
  Write-Host 'Inserted Pennsylvania batch 3 metro pools'
}

Set-Content $seed $content -Encoding UTF8 -NoNewline
Write-Host 'Pennsylvania batch 3 insert complete'