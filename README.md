# Darkstar085 — Developer Portfolio

A modern, responsive developer portfolio for **Darkstar085**, built with plain HTML, CSS, and JavaScript.

## Features

- Light and dark theme switching with saved preference
- Responsive navigation and mobile menu
- Cursor glow and subtle reveal animations
- Android, AOSP, Linux, open-source, automation, and web-focused work sections
- Locally stored SVG icons — no icon CDN required
- Daily GitHub project sync that keeps the five featured repositories current
- Accessible labels and semantic HTML where practical
- GitHub Pages friendly; no build step required

## Project structure

```text
darkstar085-portfolio/
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── icons/
│   │   └── *.svg
│   └── js/
│       └── script.js
├── data/
│   └── featured-projects.json
├── tools/
│   └── sync_projects.py
├── .github/workflows/
│   └── sync-projects.yml
├── index.html
├── LICENSE
└── README.md
```

## Local assets

The UI icons are bundled under `assets/icons/`. The page does not depend on an external icon service, so a third-party icon host going offline will not break the interface.

## Featured projects sync

The workflow in `.github/workflows/sync-projects.yml` runs the Python script in `tools/sync_projects.py` and updates `data/featured-projects.json` with the five featured repositories.

For local testing:

```bash
python tools/sync_projects.py
```

The script expects a GitHub token in `GITHUB_TOKEN` when API rate limits require authentication.

## Running locally

No build system is required. Serve the folder with any static web server. For example:

```bash
python -m http.server 5500
```

Then open `http://127.0.0.1:5500/`.

## Deployment

The project can be deployed directly to GitHub Pages or any static hosting provider.

## License

This project is released under the MIT License. See [`LICENSE`](LICENSE).


## Favicon
The site uses a bundled Darkstar mark in `assets/favicon.svg`, `assets/favicon.png`, and `assets/favicon.ico`. No external icon host is required.
