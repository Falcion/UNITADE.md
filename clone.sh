#!/bin/bash

source_file=""
target_file=""

cp "$source_file" "$target_file"

if [ $? -eq 0 ]; then
    echo "File copied successfully."
else
    echo "Error: File copy failed."
    exit 1
fi
