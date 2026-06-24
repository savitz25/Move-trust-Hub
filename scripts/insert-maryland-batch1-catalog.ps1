$root = Split-Path $PSScriptRoot -Parent
$seed = Join-Path $root 'data\local-movers-seed.ts'
$outDir = Join-Path $PSScriptRoot 'maryland-output'
$catalog = Get-Content (Join-Path $outDir 'catalog-movers.txt') -Raw
$pools = Get-Content (Join-Path $outDir 'metro-pools.txt') -Raw
$content = Get-Content $seed -Raw

if ($content -match "'twomenandatruck-montgomery-md': \{") {
  Write-Host 'Maryland catalog already inserted — skipping catalog'
} else {
  $content = $content -replace "(\s+'krupp-moving-dover-de': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$catalog`$2"
  Write-Host 'Inserted Maryland catalog movers'
}

if ($content -match "'montgomery-metro-md': \{") {
  Write-Host 'Maryland metro pools already inserted — skipping pools'
} else {
  $content = $content -replace "(\s+'kent-metro-de': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$pools`$2"
  Write-Host 'Inserted Maryland metro pools'
}

Set-Content $seed $content -Encoding UTF8 -NoNewline
Write-Host 'Maryland insert complete'