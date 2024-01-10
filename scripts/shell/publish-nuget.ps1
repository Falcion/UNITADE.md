# Define the path to the manifest file (manifest.json or package.json)
$manifestPath = Join-Path -Path $PSScriptRoot -ChildPath ".\..\..\manifest.json"

# Load the manifest file (or package.json if using JavaScript/Node.js)
$manifestContent = Get-Content -Path $manifestPath | ConvertFrom-Json

# Extract package name and version from the manifest
$packageName = $manifestContent.name
$packageVersion = $manifestContent.version

# Define the path to the .env file in the root directory
$envFilePath = Join-Path -Path $PSScriptRoot -ChildPath ".\..\..\.env"

# Load the .env file and extract the NuGet API key
$envContent = Get-Content -Path $envFilePath | ForEach-Object {
    if ($_ -match "NUGET_API_KEY=(.+)") {
        $Matches[1]
    }
}

$apiKey = $envContent | ForEach-Object { $_.Trim() }

# Set the path to the .nupkg file
$packageFilePath = Join-Path -Path $PSScriptRoot -ChildPath ".\..\..\source\$packageName\$packageName.$packageVersion.nupkg"

# Set the NuGet server URL (change to your specific server if not using NuGet.org)
$nugetServer = "https://api.nuget.org/v3/index.json"

# Build your project (if needed)
# You can use your own build system or commands here

# Pack your project into a NuGet package
nuget pack .\source\$packageName\$packageName.csproj -Version $packageVersion

# Push the package to NuGet
nuget push $packageFilePath -ApiKey $apiKey -Source $nugetServer
