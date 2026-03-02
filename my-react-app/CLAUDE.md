# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (localhost:5173)
npm run build     # Production build
npm run lint      # ESLint
npm run preview   # Preview production build locally
```

> **Node.js requirement:** Vite 8 (beta) requires Node.js 20.19+ or 22.12+. The project currently runs on 20.13.1 — if build/dev fails, reinstall deps after upgrading Node: `rm -rf node_modules package-lock.json && npm install`.

## Architecture

Single-page personal resume site built with React 19 + Vite 8. No router — all sections are on one scrollable page with anchor links.

**Theme system:** Dark/light mode is controlled by a `data-theme="light"` attribute on `<html>`, toggled in `App.jsx` via `useTheme()`. CSS variables in `index.css` define both themes under `:root` (dark default) and `[data-theme="light"]`. All components consume only CSS variables — no theme props are passed down.

**Section components** live in `src/components/`, each with a colocated `.css` file. Scroll-triggered animations use `IntersectionObserver` locally within each component (no shared animation library).

**Content to edit:** All resume data (job history, skills, links) is defined as plain arrays/constants at the top of each component file — no external data source or CMS.

**Photo:** `public/profile.jpg` is served as `/profile.jpg`. The `<img>` in `Hero.jsx` has an `onError` handler that hides the image and shows a placeholder div if the file is missing.

**CSS custom properties used across all components:**
- `--bg`, `--bg-alt` — page and alternate section backgrounds
- `--card-bg`, `--border` — card surfaces and dividers
- `--accent` — primary color (purple), used for highlights, buttons, animations
- `--text`, `--text-muted` — primary and secondary text
