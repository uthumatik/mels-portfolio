#!/usr/bin/env python3
"""Download Canva portfolio images from _assets/media into images/ directory."""

from pathlib import Path
import re
import urllib.request

PAGE_URL = "https://portfoliomelaniesilva.my.canva.site"
BASE_URL = "https://portfoliomelaniesilva.my.canva.site"
USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0 Safari/537.36"
IMAGE_EXTS = (".png", ".jpg", ".jpeg", ".webp")


def fetch_html(url: str) -> str:
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(request) as response:
        return response.read().decode("utf-8", "ignore")


def main() -> None:
    html = fetch_html(PAGE_URL)
    media_pattern = r"(?:https://portfoliomelaniesilva\.my\.canva\.site)?/?_assets/media/[^\"\s)]+"
    matches = set(re.findall(media_pattern, html))

    urls = set()
    for match in matches:
        cleaned = match.replace("\\/", "/")
        if cleaned.startswith("http"):
            urls.add(cleaned)
        else:
            path = cleaned.lstrip("/")
            urls.add(f"{BASE_URL}/{path}")

    image_urls = sorted([u for u in urls if u.lower().endswith(IMAGE_EXTS)])

    images_dir = Path("/Users/ukwattageuthum/Documents/Autres/Portfolio/images")
    images_dir.mkdir(parents=True, exist_ok=True)

    print(f"Found {len(image_urls)} image URLs.")

    for url in image_urls:
        filename = url.split("/")[-1]
        dest = images_dir / filename
        if dest.exists():
            continue
        try:
            request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
            with urllib.request.urlopen(request) as response:
                dest.write_bytes(response.read())
        except Exception as exc:  # pragma: no cover - best effort download
            print(f"Failed: {url} -> {exc}")

    print("Download complete.")


if __name__ == "__main__":
    main()
