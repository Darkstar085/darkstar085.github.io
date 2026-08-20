#!/usr/bin/env python3
import json
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

OWNER = "Darkstar085"
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "data" / "featured-projects.json"

def fetch_repos():
    url = f"https://api.github.com/users/{OWNER}/repos?per_page=100&sort=updated"
    req = urllib.request.Request(url, headers={
        "Accept": "application/vnd.github+json",
        "User-Agent": "Darkstar085-Portfolio-Sync"
    })
    with urllib.request.urlopen(req, timeout=30) as response:
        return json.load(response)

def main():
    repos = fetch_repos()
    repos = [r for r in repos if not r.get("fork") and not r.get("archived")]
    # "Top 5" means highest-starred repositories; updated time breaks ties.
    repos.sort(key=lambda r: (r.get("stargazers_count", 0), r.get("updated_at", "")), reverse=True)
    top = repos[:5]
    result = []
    for r in top:
        updated = r.get("updated_at", "")
        label = ""
        if updated:
            try:
                dt = datetime.fromisoformat(updated.replace("Z","+00:00"))
                label = dt.astimezone(timezone.utc).strftime("%b %Y")
            except ValueError:
                label = updated[:10]
        result.append({
            "name": r.get("name", ""),
            "html_url": r.get("html_url", ""),
            "description": r.get("description") or "Open-source project by Darkstar085.",
            "language": r.get("language") or "",
            "stargazers_count": r.get("stargazers_count", 0),
            "category": "GITHUB PROJECT",
            "updated_label": label
        })
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(result, indent=2), encoding="utf-8")

if __name__ == "__main__":
    main()
