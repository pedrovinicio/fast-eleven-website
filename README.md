# Fast Eleven — Website

The marketing and support website for [Fast Eleven](https://apps.apple.com/br/app/fast-eleven/id6760587437), a minimalist football management game for quick sessions.

Live at:

- Firebase Hosting**[fast-eleven.web.app](https://fast-eleven.web.app)**
- Oficial Website**[fast-eleven.com](https://fast-eleven.com)**

## Pages

| Page           | Description                                |
| -------------- | ------------------------------------------ |
| `index.html`   | Landing page with app store download links |
| `privacy.html` | Privacy policy                             |
| `support.html` | Support contact info                       |

## Features

- **Bilingual (EN / PT-BR)** — language is auto-detected from the browser and can be toggled manually; preference is persisted in `localStorage`
- **Platform-aware store buttons** — on iOS only the App Store button is shown; on Android only the Google Play button is shown
- **No build step** — plain HTML, CSS, and vanilla JS

## Project Structure

```
├── index.html          # Landing page
├── privacy.html        # Privacy policy
├── support.html        # Support page
├── styles.css          # Global styles
├── i18n.js             # Translations and language switching logic
├── screenshot.png      # App screenshot used in the phone mockup
├── google-play-badge.png
├── firebase.json       # Firebase Hosting configuration
└── .github/workflows/  # CI/CD — auto-deploy on push to main
```

## Deployment

The site is hosted on **Firebase Hosting** and deployed automatically via GitHub Actions:

- **Push to `main`** → deploys to the live channel
- **Pull request** → deploys to a preview channel

### Manual deploy

```bash
npm install -g firebase-tools
firebase login
firebase deploy
```

## Support

- Email: [pedrovinicio@gmail.com](mailto:pedrovinicio@gmail.com)
- Issues: [github.com/pedrovinicio/fast-eleven/issues](https://github.com/pedrovinicio/fast-eleven/issues)
