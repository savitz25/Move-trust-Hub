$root = Split-Path $PSScriptRoot -Parent
$seed = Join-Path $root 'data\local-movers-seed.ts'
$outDir = Join-Path $PSScriptRoot 'connecticut-output'
$catalog = Get-Content (Join-Path $outDir 'catalog-movers.txt') -Raw
$pools = Get-Content (Join-Path $outDir 'metro-pools.txt') -Raw
$content = Get-Content $seed -Raw

if ($content -match "'twomenandatruck-capitol-ct': \{") {
  Write-Host 'Connecticut catalog already inserted — skipping catalog'
} else {
  $content = $content -replace "(\s+'krupp-moving-tunkhannock-pa': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$catalog`$2"
  Write-Host 'Inserted Connecticut catalog movers'
}

if ($content -match "'capitol-metro-ct': \{") {
  Write-Host 'Connecticut metro pools already inserted — skipping pools'
} else {
  $content = $content -replace "(\s+'wyoming-metro-pa': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$pools`$2"
  Write-Host 'Inserted Connecticut metro pools'
}

Set-Content $seed $content -Encoding UTF8 -NoNewline
Write-Host 'Connecticut insert complete — state curation finished'