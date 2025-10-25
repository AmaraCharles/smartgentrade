import os

def rename_files(folder_path, old_name, new_name):
    """
    Search for files containing 'old_name' in their filename
    and replace it with 'new_name'.
    """
    if not os.path.exists(folder_path):
        print(f"❌ Folder not found: {folder_path}")
        return

    count = 0
    for filename in os.listdir(folder_path):
        old_path = os.path.join(folder_path, filename)

        # Skip directories
        if os.path.isdir(old_path):
            continue

        if old_name.lower() in filename.lower():
            new_filename = filename.replace(old_name, new_name)
            new_path = os.path.join(folder_path, new_filename)

            os.rename(old_path, new_path)
            print(f"✅ {filename} → {new_filename}")
            count += 1

    if count == 0:
        print(f"No files found with '{old_name}' in their name.")
    else:
        print(f"\n🎉 Renamed {count} file(s) successfully!")


# ==== Example usage ====
if __name__ == "__main__":
    folder = input("Enter folder path: ").strip()
    rename_files(folder, "Smartgentrade", "smartgentrade")
