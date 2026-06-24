$root = Split-Path $PSScriptRoot -Parent
$seed = Join-Path $root 'data\local-movers-seed.ts'
$outDir = Join-Path $PSScriptRoot 'oregon-output'
$catalog = Get-Content (Join-Path $outDir 'catalog-movers.txt') -Raw
$pools = Get-Content (Join-Path $outDir 'metro-pools.txt') -Raw
$content = Get-Content $seed -Raw

if ($content -match "'twomenandatruck-multnomah-or': \{") {
  Write-Host 'Oregon catalog already inserted — skipping catalog'
} else {
  $content = $content -replace "(\s+'krupp-moving-pomeroy-wa': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$catalog`$2"
  Write-Host 'Inserted Oregon catalog movers'
}

if ($content -match "'multnomah-metro-or': \{") {
  Write-Host 'Oregon metro pools already inserted — skipping pools'
} else {
  $content = $content -replace "(\s+'garfield-metro-wa': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$pools`$2"
  Write-Host 'Inserted Oregon metro pools'
}

Set-Content $seed $content -Encoding UTF8 -NoNewline
Write-Host 'Oregon insert complete'