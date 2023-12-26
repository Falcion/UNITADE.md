import shutil
import os

def confirm_copy():
    while True:
        response = input("Do you want to copy the files? (y/n): ").strip().lower()
        if response in ("y", "n"):
            return response == "y"
        else:
            print("Invalid input. Please enter 'y' or 'n'.")

# Define the source and destination paths
source_dir = "./../../"  # Root directory
destination_dir = "source"  # Destination folder

# List of files to copy
files_to_copy = ["main.ts", "manifest.json"]

# Ensure the destination directory exists
if not os.path.exists(destination_dir):
    os.makedirs(destination_dir)

if confirm_copy():
    # Copy each file to the destination directory
    for file_name in files_to_copy:
        source_path = os.path.join(source_dir, file_name)
        destination_path = os.path.join(destination_dir, file_name)
        
        try:
            shutil.copy(source_path, destination_path)
            print(f"Copied {file_name} to {destination_dir}")
        except FileNotFoundError:
            print(f"File {file_name} not found in the root directory.")

    print("Copy process completed.")
else:
    print("Copy process aborted.")
