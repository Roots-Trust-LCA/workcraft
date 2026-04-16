#!/usr/bin/env python3
"""Transform co-op.us source files for standalone Workshop."""
import re
import sys
import os
import glob

SRC_DIR = "/root/.openclaw/workspace/workshop-standalone/src"

# Files to transform (everything except lib/, types/, styles/)
files = []
for ext in ("*.tsx", "*.ts"):
    files.extend(glob.glob(os.path.join(SRC_DIR, "pages", "**", ext), recursive=True))
    files.extend(glob.glob(os.path.join(SRC_DIR, "components", ext)))

transforms = 0

for fpath in files:
    with open(fpath, "r") as f:
        content = original = f.read()

    # Ensure @ts-nocheck at top
    if "// @ts-nocheck" not in content:
        content = "// @ts-nocheck\n" + content

    # Remove supabase imports
    content = re.sub(
        r"import\s*\{[^}]*supabase[^}]*\}\s*from\s*['\"][^'\"]*lib/supabase['\"].*\n",
        "",
        content,
    )

    # Remove crafts imports
    content = re.sub(
        r"import\s*\{[^}]*\}\s*from\s*['\"][^'\"]*lib/crafts['\"].*\n",
        "",
        content,
    )

    # Remove app-config imports
    content = re.sub(
        r"import\s*\{[^}]*\}\s*from\s*['\"][^'\"]*lib/app-config['\"].*\n",
        "",
        content,
    )

    # Remove theme-engine imports
    content = re.sub(
        r"import\s*\{[^}]*\}\s*from\s*['\"][^'\"]*lib/theme-engine['\"].*\n",
        "",
        content,
    )

    # Remove responsive imports
    content = re.sub(
        r"import\s*\{[^}]*\}\s*from\s*['\"][^'\"]*lib/responsive['\"].*\n",
        "",
        content,
    )

    # Remove convergence imports
    content = re.sub(
        r"import\s*\{[^}]*\}\s*from\s*['\"][^'\"]*lib/convergence['\"].*\n",
        "",
        content,
    )

    # Remove rest-api imports
    content = re.sub(
        r"import\s*\{[^}]*\}\s*from\s*['\"][^'\"]*lib/rest-api['\"].*\n",
        "",
        content,
    )

    # Remove database.types imports
    content = re.sub(
        r"import\s*(?:type\s*)?\{[^}]*\}\s*from\s*['\"][^'\"]*lib/database\.types['\"].*\n",
        "",
        content,
    )

    # Remove usePageTitle imports and calls
    content = re.sub(
        r"import\s*\{[^}]*usePageTitle[^}]*\}\s*from\s*['\"][^'\"]*hooks/usePageTitle['\"].*\n",
        "",
        content,
    )
    content = re.sub(r"\s*usePageTitle\([^)]*\)\s*\n?", "\n", content)

    # Remove Avatar import from co-op.us path — we'll create a stub
    content = re.sub(
        r"import\s+Avatar\s+from\s*['\"][^'\"]*components/Avatar['\"].*\n",
        "import Avatar from '../../components/Avatar'\n",
        content,
    )

    # Fix logger import paths (various depths)
    content = re.sub(
        r"from\s*['\"](\.\./)*lib/logger['\"]",
        lambda m: "from '" + ("../" * max(1, m.group(0).count("../"))) + "lib/logger'",
        content,
    )

    # Fix sanitize import paths
    content = re.sub(
        r"from\s*['\"](\.\./)*lib/sanitize['\"]",
        lambda m: "from '" + ("../" * max(1, m.group(0).count("../"))) + "lib/sanitize'",
        content,
    )

    # Fix format import paths  
    content = re.sub(
        r"from\s*['\"](\.\./)*lib/format['\"]",
        lambda m: "from '" + ("../" * max(1, m.group(0).count("../"))) + "lib/format'",
        content,
    )

    # Fix tokens import paths
    content = re.sub(
        r"from\s*['\"](\.\./)*styles/tokens['\"]",
        lambda m: "from '" + ("../" * max(1, m.group(0).count("../"))) + "styles/tokens'",
        content,
    )

    if content != original:
        with open(fpath, "w") as f:
            f.write(content)
        transforms += 1
        print(f"  Transformed: {os.path.relpath(fpath, SRC_DIR)}")

print(f"\nTransformed {transforms} files total")
