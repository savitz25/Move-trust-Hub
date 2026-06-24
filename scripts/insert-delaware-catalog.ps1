$root = Split-Path $PSScriptRoot -Parent
$seed = Join-Path $root 'data\local-movers-seed.ts'
$outDir = Join-Path $PSScriptRoot 'delaware-output'
$catalog = Get-Content (Join-Path $outDir 'catalog-movers.txt') -Raw
$pools = Get-Content (Join-Path $outDir 'metro-pools.txt') -Raw
$content = Get-Content $seed -Raw

if ($content -match "'twomenandatruck-newcastle-de': \{") {
  Write-Host 'Delaware catalog already inserted — skipping catalog'
} else {
  $content = $content -replace "(\s+'metro-dc-relocation-district-of-columbia-dc': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$catalog`$2"
  Write-Host 'Inserted Delaware catalog movers'
}

if ($content -match "'new-castle-metro-de': \{") {
  Write-Host 'Delaware metro pools already inserted — skipping pools'
} else {
  $content = $content -replace "(\s+'washington-dc-metro-dc': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$pools`$2"
  Write-Host 'Inserted Delaware metro pools'
}

Set-Content $seed $content -Encoding UTF8 -NoNewline
Write-Host 'Delaware insert complete'