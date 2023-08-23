import os
import zipfile

index_js_path = 'out/index.js'
manifest_path = 'source/manifest.json'
output_zip_path = 'out/plugins-output.zip'

# Check if the required files exist
if not os.path.exists(index_js_path):
    print(f"Error: {index_js_path} does not exist.")
    exit(1)

if not os.path.exists(manifest_path):
    print(f"Error: {manifest_path} does not exist.")
    exit(1)

os.makedirs(os.path.dirname(output_zip_path), exist_ok=True)

# Create a new ZIP archive
with zipfile.ZipFile(output_zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
    zipf.write(index_js_path, arcname='index.js')
    zipf.write(manifest_path, arcname='manifest.json')

print(f"ZIP archive created at {output_zip_path}")
