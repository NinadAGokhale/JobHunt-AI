# JobHunt-AI

AI-powered job search assistant — scan, match, apply. Local-first, no cloud dependency.

## Quick Start

```bash
npm run setup    # Install backend + frontend deps
npx playwright install chromium
npm run dev      # Starts both backend (3001) and frontend (5173)
```

Open http://localhost:5173

## How It Works

```
Scan ──► Discover ──► Match ──► Apply
         Jobs          Score        Generate CV + Portal
```

- **Scan** — Playwright scrapes LinkedIn, Naukri, and company career pages
- **Match** — AI scores each job against your cv.md across 5 dimensions
- **Apply** — One-click: generates tailored CV + opens company portal

## Project Structure

```
├── frontend/          React + Vite + Tailwind UI
├── backend/           Express API + SQLite + Playwright scanner
│   └── src/
│       ├── index.js        API server (port 3001)
│       ├── db.js           SQLite setup
│       ├── scanner/        Job portal scrapers
│       └── routes/         API routes (jobs, scan, apply)
├── requirements.md    Full requirements spec
├── arch-of-ui.md      UI architecture and component tree
└── package.json       Root scripts (dev, setup)
```

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start both frontend + backend |
| `npm run setup` | Install all dependencies |
| `npm run doctor` | Verify system prerequisites |
| `npm run dev:backend` | Backend only |
| `npm run dev:frontend` | Frontend only |

## Branch Strategy

- `main` — working code
- `dev` — planning docs and active development

## Tech

React · Vite · Tailwind · Express · SQLite · Playwright
