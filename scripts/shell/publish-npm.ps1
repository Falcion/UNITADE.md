# MIT License
# Copyright (c) Falcion 2023-2024
# Free to share, use or change.

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $scriptDir

$packageJson = Get-Content -Raw "../../package.json" | ConvertFrom-Json
$packageName = $packageJson.name
$packageVersion = $packageJson.version

npm login
npm publish
npm logout

Write-Output "Published $packageName@$packageVersion to NPM."

Set-Location $scriptDir
