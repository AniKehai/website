<div align="center">
  <img src="./public/favicon.svg" width="64" height="auto" alt="AniKehai Logo">
  <h1 align="center">AniKehai Website</h1>
  <p align="center">The official minimalist landing page, installation guide, and feature showcase for the AniKehai browser extension.</p>

  <p align="center">
    <img src="https://img.shields.io/github/stars/minkxx/AniKehai?style=flat" alt="GitHub Stars">
    <img src="https://img.shields.io/badge/version-2.6.5-blue?style=flat&labelColor=808080" alt="Version">
    <img src="https://img.shields.io/badge/license-MIT-green?style=flat" alt="License">
  </p>
</div>

## About

This repository contains the source code for the official **AniKehai** website. Built to match the sleek, dark, minimalist aesthetic of the extension itself, it acts as a central hub for users to:
* Learn about features (Live Rich Presence, zero overhead, mobile support, cover art).
* Access step-by-step installation guides tailored to their detected browser (Firefox, Chrome, Android / Kiwi Browser).
* Explore supported anime streaming platforms with direct links and favicons.
* Inspect a live interactive Discord profile card simulation demonstrating real-time playback and pause states.

## Tech Stack

* **Framework:** React 19 + Vite 8
* **Language:** TypeScript
* **Styling:** Tailwind CSS v4
* **Routing:** React Router v7 (client-side navigation, pre-rendered at build)
* **Icons:** Lucide React
* **Linting & Formatting:** Biome.js

## Getting Started Locally

### Prerequisites
Make sure you have [Bun](https://bun.sh/) installed on your machine.

### Installation & Development

1. Clone the repository and install dependencies:
   ```bash
   bun install
   ```

2. Run the development server:
   ```bash
   bun dev
   ```

3. Open your browser and navigate to `http://localhost:5173`.

## Scripts & Validation

* **`bun dev`** — Start the Vite development server with hot-reloading.
* **`bun run build`** — Typecheck, build the client and server bundles, then pre-render every route to static HTML.
* **`bun run preview`** — Locally preview the production build.
* **`bun run typecheck`** — Type-check every TypeScript project (`tsc -b`).
* **`bun run seo:check`** — After a build, verify titles, one `<h1>`, canonicals, JSON-LD, internal links and the sitemap.
* **`bun run indexnow`** — Ping Bing & other IndexNow engines with every sitemap URL (see the script header).
* **`bun run lint`** — Run Biome code check.
* **`bun run lint:fix`** — Automatically format and fix Biome linter errors.

## License

Distributed under the [MIT License](https://github.com/minkxx/AniKehai/blob/main/LICENSE).

<p align="center">Made with ❤️ by Minkxx</p>
