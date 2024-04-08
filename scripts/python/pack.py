#!/usr/bin/env python3

# MIT License
# Copyright (c) Falcion 2023-2024
# Free to share, use or change.

import os
import zipfile

ROOT = "./../../"
PATH = os.path.join(ROOT, "scripts", "python")

ZIP = zipfile.ZipFile(os.path.join(PATH, "BACKUP.zip"), "w", zipfile.ZIP_DEFLATED)

for root, dirs, files in os.walk(ROOT):
    if ".git" in dirs:
        dirs.remove(".git")
    for file in files:
        filepath = os.path.join(root, file)
        ZIP.write(filepath, os.path.relpath(filepath, ROOT))

ZIP.close()

print("Repository compressed into \"BACKUP.zip\" successfully.")
