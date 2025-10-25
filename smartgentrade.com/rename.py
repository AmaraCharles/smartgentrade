import os
import re

# 🔹 Folder where your files are stored
folder = r"C:\webby\flux\fluxoption.com\images"

# 🔹 Define replacements (case-sensitive)
replacements = {
    "Wealthhnest": "Smartgentrade",
}

# Walk through files in the folder
for filename in os.listdir(folder):
    old_path = os.path.join(folder, filename)
    if not os.path.isfile(old_path):
        continue  # skip subfolders

    new_filename = filename
    for old, new in replacements.items():
        # ✅ Case-sensitive replacement (no IGNORECASE)
        new_filename = re.sub(old, new, new_filename)

    new_path = os.path.join(folder, new_filename)

    # ✅ Safely rename (skip if target exists)
    if old_path != new_path:
        if not os.path.exists(new_path):
            print(f"Renaming: {filename}  ->  {new_filename}")
            os.rename(old_path, new_path)
        else:
            print(f"⚠️ Skipping {filename}, target already exists")

print("✅ Done!")
