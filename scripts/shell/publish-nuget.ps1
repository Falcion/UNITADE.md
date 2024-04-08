# MIT License
# Copyright (c) Falcion 2023-2024
# Free to share, use or change.

$manifestPath = Join-Path $PSScriptRoot "../../manifest.json"
$manifestContent = Get-Content -Raw $manifestPath | ConvertFrom-Json
$packageName = $manifestContent.name
$packageVersion = $manifestContent.version

$envFilePath = Join-Path $PSScriptRoot "../../.env"
$apiKey = Select-String -Path $envFilePath -Pattern 'NUGET_API_KEY=' | ForEach-Object { $_ -replace 'NUGET_API_KEY=', '' }

$packageFilePath = Join-Path $PSScriptRoot "../../source/$packageName/$packageName.$packageVersion.nupkg"

$nugetServer = "https://api.nuget.org/v3/index.json"

nuget pack "./source/$packageName/$packageName.csproj" -Version $packageVersion
nuget push $packageFilePath -ApiKey $apiKey -Source $nugetServer
