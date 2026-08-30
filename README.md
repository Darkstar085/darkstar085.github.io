# Darkstar085 — Developer Portfolio

Welcome! 👋

This repository contains the source code for my personal developer portfolio website.

The website is built with **HTML, CSS, and JavaScript**, so it is simple, lightweight, and does not need a complicated build process.

## 🌐 What is this?

This is my personal portfolio where you can:

- Learn more about me and my work
- Explore my projects
- See my interests in Android, AOSP, Linux, open source, automation, and web development
- Find links to my GitHub and other profiles
- Switch between light and dark mode
- View the site comfortably on desktop or mobile

## ✨ Main features

- 📱 Works on phones, tablets, and desktops
- 🌙 Light and dark mode
- 🎨 Smooth animations and visual effects
- 🚀 No build system required
- 📦 Icons are included locally, so the site does not depend on an external icon service
- 🐙 Automatically keeps the project section updated from GitHub

## 🔄 How the project list updates

You do not need to manually update the featured projects every time a repository changes.

A GitHub Actions workflow automatically checks my repositories and selects the **6 most recently updated repositories**.

The automatic sync runs:

**Every Wednesday at 11:00 AM IST**

The workflow then updates the project's featured-repository data so the portfolio stays current.

### Want to update it manually?

You can also run the sync script yourself:

```bash
python tools/sync_projects.py
```

The script uses the GitHub API. If authentication is needed because of API rate limits, set a `GITHUB_TOKEN` environment variable before running it.

## 📁 Project structure

Here is a simple overview of the important files:

```text
darkstar085.github.io/
├── index.html                 # Main website page
├── assets/
│   ├── css/
│   │   └── style.css          # Website styling
│   ├── icons/                 # Local SVG icons
│   └── js/
│       └── script.js           # Website interactions
├── data/
│   └── featured-projects.json # Projects shown on the website
├── tools/
│   └── sync_projects.py       # Updates the project list from GitHub
├── .github/
│   └── workflows/
│       └── sync-projects.yml  # Automatic weekly sync
├── LICENSE
└── README.md
```

## 💻 Running the website on your computer

You don't need to install a special framework.

### 1. Download or clone the repository

```bash
git clone https://github.com/Darkstar085/darkstar085.github.io.git
cd darkstar085.github.io
```

### 2. Start a local web server

If Python is installed:

```bash
python -m http.server 5500
```

### 3. Open the website

Open this address in your browser:

```text
http://127.0.0.1:5500/
```

That's it. 🎉

## 🚀 Publishing the website

The website can be hosted directly using **GitHub Pages**.

Because this is a static website, there is no build command or server application required.

You can also host it on other static hosting services.

## 🤖 Automatic updates with GitHub Actions

The repository includes a GitHub Actions workflow at:

```text
.github/workflows/sync-projects.yml
```

Its job is to keep the featured projects up to date automatically.

Every Wednesday at **11:00 AM IST**, it:

1. Checks the GitHub repositories.
2. Finds the most recently updated repositories.
3. Selects the latest 6 eligible repositories.
4. Updates the portfolio's project data.
5. Commits the changes when needed.

This means the portfolio can stay up to date without manually editing the project list every week.

## 🛠️ Technologies used

- HTML
- CSS
- JavaScript
- Python
- GitHub Actions
- GitHub API
- GitHub Pages

## 📄 License

This project is released under the **MIT License**.

See [`LICENSE`](LICENSE) for the full license text.

---

Made with ❤️ by **Darkstar085**
