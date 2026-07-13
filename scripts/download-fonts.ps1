$ErrorActionPreference = 'Stop'
$fontsDir = Join-Path $PSScriptRoot '..\assets\fonts'
if (-not (Test-Path $fontsDir)) { New-Item -ItemType Directory -Path $fontsDir | Out-Null }

$cssUrls = @(
  'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap',
  'https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap',
  'https://fonts.googleapis.com/css2?family=Caveat:wght@400&display=swap'
)

$allCss = ''
foreach ($cssUrl in $cssUrls) {
  Write-Host "Fetching CSS from $cssUrl"
  try {
    $resp = Invoke-WebRequest -Uri $cssUrl -UseBasicParsing -Headers @{ 
      'User-Agent' = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36';
      'Accept' = 'text/css,*/*;q=0.1'
    }
    $allCss += "`n" + $resp.Content
  } catch {
    Write-Warning "Failed to fetch $cssUrl : $_"
  }
}

[string]$pattern = "(?s)font-family:\s*'([^']+)'.*?src:\s*url\(([^)]+)\).*?font-weight:\s*(\d+)"
[regex]$re = $pattern
$matches = $re.Matches($allCss)
if ($matches.Count -eq 0) { Write-Host "No font URLs found in fetched CSS."; exit 0 }

foreach ($m in $matches) {
  $family = $m.Groups[1].Value -replace "\s+",""
  $url = $m.Groups[2].Value
  $weight = $m.Groups[3].Value
  $cleanUrl = $url.Split('?')[0]
  $ext = [IO.Path]::GetExtension($cleanUrl)
  if (-not $ext) { $ext = '.woff2' }
  $fileName = "${family}-${weight}${ext}"
  $filePath = Join-Path $fontsDir $fileName
  if (Test-Path $filePath) { Write-Host "$fileName already exists, skipping"; continue }
  Write-Host "Downloading $cleanUrl -> $fileName"
  try {
    Invoke-WebRequest -Uri $cleanUrl -OutFile $filePath -UseBasicParsing -Headers @{ 'User-Agent' = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
  } catch {
    Write-Warning "Failed to download $cleanUrl : $_"
  }
}

Write-Host "Done. Files saved to $fontsDir"
