# Carl / Personal workshop

A compact, dark personal website about building useful software, editing video, and following interesting rabbit holes. Custom application previews are built with HTML, CSS, and SVG. The Lab terminal, keyboard command palette, project dialogs, system information, and Easter eggs run locally in the browser.

## Stack

Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Lucide, and self-hosted Geist variable fonts. Styling and motion use CSS; no animation or chart library. Only interactive components use client JavaScript. Exact dependency versions are pinned in `package.json` and `package-lock.json`.

The production build is a static export in `out/`. There is no database, authentication, CMS, API, or separate production server.

## Develop and verify

Node.js 22.13+ is recommended (developed with Node.js 24). Install and run:

```sh
npm ci
npm run dev
```

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

`npm start` previews the production export at `http://127.0.0.1:3000`. It requires a successful build. Set `PORT` to change the preview port. On Windows with PowerShell script restrictions, use `npm.cmd` instead of `npm`.

## Browser checks

```sh
npx playwright install chromium
npm run build
npm run test:e2e
```

Playwright starts the local static preview automatically. Tests cover every terminal command, command history, Ctrl/Cmd+K, palette navigation and filtering, project dialogs, focus trapping/restoration, system info, mobile navigation, empty contact links, responsive overflow, reduced motion, and automated WCAG checks with axe.

For the workspace-local browser installed during development, PowerShell can use:

```powershell
$env:PLAYWRIGHT_BROWSERS_PATH = "$PWD\.cache\playwright"
npm.cmd run test:e2e
```

Test browsers, generated reports, and screenshots are ignored by Git and are not site assets.

## Content and configuration

```text
src/
  app/                  Page composition, metadata, favicon, OG image, global styles
  components/
    layout/             Sticky navigation and footer
    sections/           Hero, Now, Builds, Lab, Creative, Process, Toolbox, About, Contact
    projects/           Decorative previews, cards, and detail dialogs
    terminal/           Local terminal and command history
    command-palette/    Keyboard navigation and search
    ui/                 Shared accessible dialog and Easter eggs
  config/site.ts        Name, metadata text, real contact URLs
  data/projects.ts      Typed project content and status
  data/experiments.ts   Typed Lab experiments
scripts/serve.mjs       Local static production preview
tests/site.spec.ts      Browser and accessibility checks
```

Edit `src/config/site.ts` to set `email`, `github`, and `socials`. These are intentionally empty: missing values hide their buttons. Set `url` to your actual deployed origin for absolute Open Graph metadata. No fake contact destinations are included.

Project copy, status, features, technology, inspiration, goals, and future plans live in `src/data/projects.ts`. Add a `Project` entry to the exported array to create another card and detail dialog. The first entry is featured. To give a project a custom preview, export a decorative component from `src/components/projects/Previews.tsx` and map its project ID in `src/components/sections/Projects.tsx`; otherwise it receives a generic app preview. Mockup numbers and game titles are illustrative, not usage or download claims.

Add experiments in `src/data/experiments.ts`; optionally map their icons in `Lab.tsx`. Colors, spacing, responsive layouts, and reduced-motion rules live in `src/app/globals.css`.

## Keyboard features

- `Ctrl+K` / `Cmd+K`: open the command palette; arrow keys select, Enter runs, Escape closes.
- Terminal: `help`, `whoami`, `projects`, `now`, `stack`, `clear`; ↑/↓ browse local history.
- Dialogs: Escape closes, Tab remains inside, and focus returns to the opener.
- The footer’s `system info` opens a small operating-system panel. The Konami sequence reveals a temporary message, with no audio.

## Deploy to Vercel

Push this folder to your Git repository and import it into Vercel. Use the Next.js framework preset, `npm run build`, and output directory `out` (already configured in `vercel.json`). No environment variables or paid services are needed. Add your real contact details and deployed `url` in the site config before your final production release.

The application uses the [Next.js static export workflow](https://nextjs.org/docs/app/guides/static-exports). Vercel can host the generated files directly; the local preview script is not a production backend. A static PNG Open Graph image and SVG monogram favicon are generated during the build. Social image URLs use your configured `url`, Vercel's deployment hostname, or localhost for local previews.

External source repository access and a Vercel account are needed to publish; this workspace does not provision or deploy an account automatically.
