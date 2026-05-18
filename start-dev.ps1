$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root

function Start-CatJamProcess {
  param(
    [Parameter(Mandatory = $true)]
    [string] $Name,
    [Parameter(Mandatory = $true)]
    [string] $Arguments
  )

  $logDir = Join-Path $root ".logs"
  if (!(Test-Path $logDir)) {
    New-Item -ItemType Directory -Path $logDir | Out-Null
  }

  $outLog = Join-Path $logDir "$Name.out.log"
  $errLog = Join-Path $logDir "$Name.err.log"

  Start-Process `
    -FilePath "node" `
    -ArgumentList $Arguments `
    -WorkingDirectory $root `
    -RedirectStandardOutput $outLog `
    -RedirectStandardError $errLog `
    -WindowStyle Hidden | Out-Null

  Write-Host "started $Name"
}

Start-CatJamProcess -Name "frontend-3000" -Arguments "dev-server.mjs 3000"
Start-CatJamProcess -Name "auth-proxy-3001" -Arguments "server/auth-proxy.mjs"

Write-Host ""
Write-Host "42 Project Monsters local stack:"
Write-Host "  frontend: http://localhost:3000/"
Write-Host "  proxy:    http://localhost:3001/"
Write-Host ""
Write-Host "Open http://localhost:3000/ and use Connect 42."
Write-Host "Logs are in .logs/"
