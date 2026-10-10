"""GB3: reject accidental environment captures without printing file contents.

Run before committing: python scripts/guard-private-artifacts.py
This filename guard complements secret scanning; it does not inspect image pixels.
"""

import pathlib
import re
import subprocess
import sys


def unsafe_artifact(path):
    if re.match(r"^\.tmp/lighthouse\.[^/]+/", path, re.IGNORECASE):
        return True
    name = pathlib.PurePosixPath(path).name.lower()
    if name.startswith(".env"):
        return name != ".env.example"
    if re.fullmatch(r"env[-_]?filter\.(sh|ps1|bash)", name):
        return True
    if pathlib.PurePosixPath(name).suffix in {".png", ".jpg", ".jpeg", ".webp", ".gif", ".bmp"}:
        return bool(re.search(
            r"(?:env(?:ironment|iroment)?[ _-]*(?:variables?|secrets?|dump|export))"
            r"|(?:(?:api[ _-]*keys?|credentials?|secrets?)[ _-]*(?:screenshot|capture))",
            name,
        ))
    return False


def main():
    root = pathlib.Path(__file__).resolve().parents[1]
    paths = subprocess.check_output(["git", "ls-files", "-z"], cwd=root).decode().split("\0")
    blocked = [path for path in paths if path and unsafe_artifact(path)]
    if blocked:
        # Counts only: artifact names and contents may themselves contain secrets.
        print(f"GB3 private artifact guard: FAIL ({len(blocked)} prohibited tracked artifacts).")
        print("Remove environment captures, env-filter scripts, and temporary browser profiles from Git.")
        print("Keep the value-free .env.example template.")
        return 1
    print("GB3 private artifact guard: PASS")
    return 0


if __name__ == "__main__":
    sys.exit(main())
