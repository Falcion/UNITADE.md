# Get the root directory of the project where publish-npm.ps1 is located
$scriptDir = Split-Path -Parent -Path $MyInvocation.MyCommand.Definition

# Change to the root directory of the project
Set-Location -Path $scriptDir

# Load the package.json file
$packageJson = Get-Content -Path ".\..\..\package.json" | ConvertFrom-Json

# Extract the package name and version from package.json
$packageName = $packageJson.name
$packageVersion = $packageJson.version

# Log in to NPM (you may need to install the `npm-cli` package globally)
npm login

# Publish the package to NPM
npm publish

# Logout from NPM (optional)
npm logout

Write-Host "Published $packageName@$packageVersion to NPM."

# Return to the original directory (optional)
Set-Location -Path $scriptDir
