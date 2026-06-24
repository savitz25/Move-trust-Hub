$root = Split-Path $PSScriptRoot -Parent
$seed = Join-Path $root 'data\local-movers-seed.ts'
$outDir = Join-Path $PSScriptRoot 'hawaii-output'
$catalog = Get-Content (Join-Path $outDir 'catalog-movers.txt') -Raw
$pools = Get-Content (Join-Path $outDir 'metro-pools.txt') -Raw
$content = Get-Content $seed -Raw

if ($content -match "'twomenandatruck-honolulu-hi': \{") {
  Write-Host 'Hawaii catalog already inserted — skipping catalog'
} else {
  $content = $content -replace "(\s+'krupp-moving-dover-foxcroft-me': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$catalog`$2"
  Write-Host 'Inserted Hawaii catalog movers'
}

if ($content -match "'honolulu-metro-hi': \{") {
  Write-Host 'Hawaii metro pools already inserted — skipping pools'
} else {
  $content = $content -replace "(\s+'piscataquis-metro-me': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$pools`$2"
  Write-Host 'Inserted Hawaii metro pools'
}

Set-Content $seed $content -Encoding UTF8 -NoNewline
Write-Host 'Hawaii insert complete'