# 🌟 darkstar085.github.io

**Personal portfolio of Sipun Ku Mahanta**

A lightweight, responsive personal portfolio focused on Android, custom ROMs, open source, Linux, and web experiments.

## 🚀 Live Demo

Visit the site:

https://darkstar085.github.io/

## ✨ Features

- Dark, neon-purple developer portfolio design
- Linear page flow: Hero → About → Work → Projects → GitHub → Contact
- Full-width responsive navigation with hover underline
- Personal hero section with terminal-style status card
- No external links or social buttons in the hero
- About section with optimized profile photo and personal details
- Four-column skills/work cards with category-specific hover colors
- ROM project cards with branded logos and ROM-specific hover colors
- GitHub profile statistics loaded from the public GitHub API
- Contact cards for Telegram, Instagram, Facebook and X
- Custom SVG + PNG favicon matching the site branding
- Smooth reveal animations and reduced-motion support
- Responsive desktop, tablet and mobile layouts
- No framework or build system required

## 📁 Project Structure

| File / Folder | Description |
| :------------ | :---------- |
| `index.html` | Main portfolio page |
| `css/style.css` | Responsive site styles and animations |
| `js/main.js` | Navigation, typing effect, reveal animations and GitHub data |
| `img/profile.jpg` | Optimized profile photo |
| `img/favicon.svg` | Primary scalable favicon |
| `img/favicon.png` | Apple-touch/fallback favicon |

## 🛠️ Local Development

Clone the repository:

```bash
git clone https://github.com/Darkstar085/darkstar085.github.io.git
cd darkstar085.github.io
python3 -m http.server
```

Then open:

http://localhost:8000/

A local HTTP server is recommended for the most accurate browser environment.

## 🔗 Socials

- Telegram: https://t.me/Darkstar085
- Instagram: https://instagram.com/Darkstar085
- Facebook: https://fb.com/sipunku.mahanta
- X: https://twitter.com/Darkstar085
- GitHub: https://github.com/Darkstar085

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Sipun Ku Mahanta**

GitHub: https://github.com/Darkstar085


## Deployment cleanup
A weekly GitHub Actions workflow in `.github/workflows/cleanup-old-deployments.yml` deletes GitHub Pages deployments older than 7 days while always preserving the latest 3. It also supports manual runs via `workflow_dispatch`.
