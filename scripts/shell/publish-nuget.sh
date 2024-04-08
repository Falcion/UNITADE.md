#!/bin/bash

# MIT License
# Copyright (c) Falcion 2023-2024
# Free to share, use or change.

manifest_path="$PSScriptRoot/../../manifest.json"
manifest_content=$(<"$manifest_path")
package_name=$(echo "$manifest_content" | jq -r '.name')
package_version=$(echo "$manifest_content" | jq -r '.version')

env_file_path="$PSScriptRoot/../../.env"
api_key=$(grep -oP 'NUGET_API_KEY=\K.*' "$env_file_path")

package_file_path="$PSScriptRoot/../../source/$package_name/$package_name.$package_version.nupkg"

nuget_server="https://api.nuget.org/v3/index.json"

nuget pack "./source/$package_name/$package_name.csproj" -Version "$package_version"
nuget push "$package_file_path" -ApiKey "$api_key" -Source "$nuget_server"
