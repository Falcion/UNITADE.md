#!/usr/bin/env python3

# MIT License
# Copyright (c) Falcion 2023-2024
# Free to share, use or change.

import shutil
import os

ROOT, TARGET = "./../../", "source"


def confirm_copy():
    while True:
        response = input("Do you want to copy the files? (Y/N): ").strip().upper()

        if response in ("Y", "N"):
            return response == "Y"
        else:
            print("Invalid input, please, enter 'Y' or 'N' as an answer.")


COPIED_FILES = ["main.ts", "manifest.json"]

if confirm_copy():
    if not os.path.exists(TARGET):
        os.makedirs(TARGET)

    for file in COPIED_FILES:
        filepath = os.path.join(ROOT, file)
        copypath = os.path.join(TARGET, file)

        try:
            shutil.copy(filepath, copypath)

            print(
                f"Entity \"{file}\" was copied to \"{TARGET}\" successfully.")
        except Exception:
            print(
                f"Entity {file} not found in the root directory, thrown error.")

    print("Copy process completed.")
else:
    print("Copy process aborted.")
