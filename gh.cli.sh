#!/bin/bash

# Check if repository URL file exists
if [ ! -f "repository.url.txt" ]; then
    echo "Repository URL file not found. Creating file..."
    echo "Add your repository URL to repository.url.txt and rerun this script."
    echo "Example: https://github.com/username/repository"
    echo "" > repository.url.txt
    exit 1
fi

# Read repository URL from file
REPO_URL=$(cat repository.url.txt)

# Clone repository
gh repo clone $REPO_URL

# Navigate to cloned repository directory
cd $(basename $REPO_URL)

# Show open issues
gh issue list

# Show open pull requests
gh pr list

# Show current repository status and info
gh repo view

# Open repository in browser
xdg-open $REPO_URL
