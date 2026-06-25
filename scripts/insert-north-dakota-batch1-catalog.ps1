$root = Split-Path $PSScriptRoot -Parent
$seed = Join-Path $root 'data\local-movers-seed.ts'
$outDir = Join-Path $PSScriptRoot 'north-dakota-batch1-output'
$catalog = Get-Content (Join-Path $outDir 'catalog-movers.txt') -Raw
$pools = Get-Content (Join-Path $outDir 'metro-pools.txt') -Raw
$content = Get-Content $seed -Raw

if ($content -match "'twomenandatruck-cass-nd': \{") {
  Write-Host 'North Dakota batch 1 catalog already inserted — skipping catalog'
} else {
  $content = $content -replace "(\s+'krupp-moving-lusk-wy': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$catalog`$2"
  Write-Host 'Inserted North Dakota batch 1 catalog movers'
}

if ($content -match "'cass-metro-nd': \{") {
  Write-Host 'North Dakota batch 1 metro pools already inserted — skipping pools'
} else {
  $content = $content -replace "(\s+'niobrara-metro-wy': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$pools`$2"
  Write-Host 'Inserted North Dakota batch 1 metro pools'
}

Set-Content $seed $content -Encoding UTF8 -NoNewline
Write-Host 'North Dakota batch 1 insert complete'