# AEONLABS — Project Context

## Overview
AEONLABS is an AI-powered marketing agency website targeting Melbourne, Australia businesses. It's a **static multi-page site** (HTML/CSS/JS) deployed via **GitHub Pages**.

- **Live URL:** https://phatnguyen091006-gif.github.io/AEONLABS/
- **Repo:** https://github.com/phatnguyen091006-gif/AEONLABS
- **Branch:** `main`
- **Owner:** Phat Nguyen (phatnguyen091006@gmail.com)

## Tech Stack
- **Pure HTML/CSS/JS** — no frameworks, no build tools
- **Google Fonts:** Inter (weights 300–800)
- **Design:** Light mode with orange accent (#E8672A) color scheme
- **3D:** Spline 3D model integration (hero section globe)
- **Automation:** Make.com (formerly Integromat) webhooks for form/chatbot lead capture

## File Structure
```
├── index.html          # Homepage — hero, capabilities grid, services, case studies, CTA
├── services.html       # Services page — detailed service listings
├── case-studies.html   # Case studies page — client results
├── about.html          # About page — team/company info with stats
├── contact.html        # Contact page — form + info cards
├── style.css           # Global design system — ALL styles live here
├── script.js           # Core JS — navbar, scroll animations, contact form webhook
├── chatbot.js          # Self-contained AI chat widget (IIFE, injects own HTML/CSS)
├── spline-loader.js    # Spline 3D model loader for hero section
├── globe.js            # 3D globe animation logic
├── serve.ps1           # Local dev server script (PowerShell)
├── images/             # Static image assets
└── contact_2.html      # Legacy/unused — can be deleted
```

## Architecture & Conventions

### CSS (style.css)
- **Single shared stylesheet** for all pages
- CSS custom properties (variables) defined in `:root`
- Key design tokens:
  - `--bg: #f5f5f7` (light background)
  - `--bg-dark: #0a0a0a` (dark sections)
  - `--orange: #e8672a` (primary accent)
  - `--orange-light: #f4a63a` (secondary accent)
  - `--radius: 24px` / `--radius-lg: 40px`
  - `--ease: cubic-bezier(0.16, 1, 0.3, 1)` (smooth easing)
- Mobile-first responsive breakpoints at 768px and 1024px
- Page-specific sections are prefixed (e.g., `.cap-` for capabilities, `.cs-` for case studies)
- Scroll animations via `[data-animate]` attribute + `.visible` class

### JavaScript (script.js)
- Initializes on `DOMContentLoaded`: navbar, scroll animations, contact form
- **Make.com Webhook** for contact form: `https://hook.eu1.make.com/wohza8zeumeslwma74esp8wqybpzurjv`
- Contact form sends JSON payload with fields: `name`, `email`, `phone`, `service`, `message`, `submittedAt`, `source`, `page`
- The `sendToWebhook()` function is the shared utility for POST requests

### Chatbot (chatbot.js)
- **Self-contained IIFE** — injects its own HTML, CSS, and JS
- Floating action button (FAB) in bottom-right corner with orange gradient
- Dark-themed chat window with glassmorphism effect
- Intent-based response matching (keyword matching, no external API)
- Has its own booking form that currently sends to an **old n8n webhook** (needs updating to Make.com)
- Business knowledge base defined in `BIZ` object at top of file

### Navigation
- Fixed navbar with scroll-triggered background blur
- Mobile hamburger menu (`.nav-toggle`) at 768px breakpoint
- Active page indicated by `.active` class on nav link
- Contact link styled as CTA button (`.nav-cta-link`)

### Page Template
Every page follows this structure:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title — AEONLABS</title>
    <meta name="description" content="...">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <nav class="nav" id="navbar">...</nav>
    <!-- Page content -->
    <footer class="footer">...</footer>
    <script src="script.js"></script>
    <script src="spline-loader.js"></script>
    <script src="chatbot.js"></script>
</body>
</html>
```

## Integrations

### Make.com (Contact Form)
- **Webhook URL:** `https://hook.eu1.make.com/wohza8zeumeslwma74esp8wqybpzurjv`
- **Trigger:** Contact form submission on `contact.html`
- **Payload:**
```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "service": "string (one of the AEON Stack modules)",
  "message": "string",
  "submittedAt": "ISO 8601 timestamp",
  "source": "AEONLABS Website — Contact Form",
  "page": "current URL"
}
```

### Chatbot Booking (⚠️ Uses OLD n8n webhook — needs migration to Make.com)
- **Current webhook (outdated):** `https://ndrwngvn.app.n8n.cloud/webhook-test/184c3378-27d5-4062-9d4d-dcf4001340c4`
- Located in `chatbot.js` line ~303
- Sends: `name`, `email`, `company`, `service`, `message`, `source`, `page`

### Spline 3D
- Loaded via `spline-loader.js`
- Hero section has a `.spline-container` div for the 3D globe
- Falls back to a gradient background if Spline fails to load

## Services / Modules (The AEON Stack)
1. **Neural Audience Engine** — AI audience targeting
2. **Autonomous Content Pipeline** — AI content generation
3. **Conversational Conversion** — AI chatbots for lead nurturing
4. **Predictive Market Radar** — Market trend detection
5. **Autonomous Ad Orchestration** — Self-optimizing ad campaigns
6. **Attribution Oracle** — Multi-touch attribution
7. **Full AEON Stack** — All modules combined

## Key Design Decisions
- **Light mode** with orange accents (previously was dark mode, redesigned in May 2026)
- Capabilities section uses **dark background** for contrast
- Cards use subtle borders + hover lift effects
- Form inputs use orange focus borders
- All animations use the custom `--ease` cubic-bezier curve
- No external CSS frameworks (no Tailwind, no Bootstrap)

## Deployment
- Push to `main` branch → GitHub Pages auto-deploys
- Git is available via GitHub Desktop at: `C:\Users\phatn\AppData\Local\GitHubDesktop\app-3.5.8\resources\app\git\cmd\git.exe`
- To push changes:
```powershell
$env:PATH = "C:\Users\phatn\AppData\Local\GitHubDesktop\app-3.5.8\resources\app\git\cmd;" + $env:PATH
git add -A
git commit -m "description of changes"
git push origin main
```

## Known Issues / TODO
- [ ] Chatbot booking form still uses old n8n webhook — should be updated to Make.com
- [ ] `contact_2.html` is unused/legacy — can be cleaned up
- [ ] Social links (LinkedIn, Twitter, Instagram) are placeholder `#` hrefs
- [ ] Spline 3D model URL may need updating if Spline project changes
