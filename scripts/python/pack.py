import os
import shutil
import zipfile

# Set the path to the root of the repository
repo_root = "./../../"

# Set the path to the directory containing the script
script_dir = os.path.join(repo_root, "scripts", "python")

# Set the name of the zip file
zip_filename = "repo_backup.zip"

# Create a zip file object
zip_file = zipfile.ZipFile(os.path.join(script_dir, zip_filename), "w", zipfile.ZIP_DEFLATED)

# Walk through all files and directories in the repository
for root, dirs, files in os.walk(repo_root):
    # Exclude the .git folder
    if ".git" in dirs:
        dirs.remove(".git")
    # Add each file to the zip file object
    for file in files:
        file_path = os.path.join(root, file)
        zip_file.write(file_path, os.path.relpath(file_path, repo_root))

# Close the zip file object
zip_file.close()

print("Repository compressed into", zip_filename)
