# Portfolio Upgrade Plan

_Target audience: hiring managers and senior engineers at remote-first tech companies. Positioning: Frontend Software Engineer, 5+ years, React/TypeScript, IBM Data & AI, open to remote frontend/full-stack._

---

## Phase 0 — Quick wins (1–2 hours, zero risk)

These are pure content/copy edits with outsized recruiter impact.

1. **Fix the Navbar typo and positioning**
   - `src/components/Navbar.jsx` line 49: `Front-end Developper` → `Frontend Software Engineer`.
   - Consider showing `Broulaye — Frontend Engineer @ IBM` on desktop.

2. **Rewrite the hero copy for recruiter-first scanning**
   - Current: "I develop mobile applications, user interfaces and web applications."
   - New (example):
     > **Frontend Software Engineer** building performant, accessible React/TypeScript interfaces.
     > 5+ years shipping production UI — currently at **IBM Data & AI**. Open to remote roles.
   - Add two CTAs under the subtext: `View projects` and `Download resume`.
   - Keep the 3D computer, but lazy-mount it below the fold on mobile.

3. **Rewrite the About blurb**
   - Lead with IBM + scale + stack. Drop "quick learner" (filler). Example:
     > Frontend engineer with 5+ years of production React/TypeScript experience. At **IBM Data & AI** I build interfaces used by enterprise customers across watsonx. Outside of IBM, I ship real products for West Africa — fleet management, clinic operations, and local-services marketplaces. I care about performance, accessibility, and clean component APIs.

4. **Update resume PDF** in `public/pdf/Resume.pdf` to match the new positioning (if stale).

5. **Add real social links** to Contact/footer — GitHub, LinkedIn, personal email. Consider adding a footer component (none exists today).

---

## Phase 1 — Content & impact framing (half a day)

Make every section demonstrate *impact*, not just *existence*.

### 1.1 Sanity CMS content updates (source of truth for Works + Experience)

`src/components/Works.jsx` and `Experience.jsx` already fetch from Sanity — so do the edits there, not in `src/constants/index.tsx`. (The `projects` array in `constants/index.tsx` is template leftover and unused at runtime. Consider deleting it to reduce confusion.)

**For each IBM experience entry, rewrite bullets in STAR-ish form with metrics:**
- _"Led migration of [component/feature] from [X] to [React/TS], reducing [bundle/load time/bug count] by N%."_
- _"Shipped [feature] used by N+ enterprise customers on watsonx."_
- _"Mentored N engineers; owned code review for the [team]."_
- Prefer numbers, even rough ones. "Cut page TTI by ~30%" beats "improved performance."

**For each featured project, add to Sanity:**
- `guinea-fleet-manager` — one-liner, stack (React/TS/Node?), live URL, GitHub URL, 2–3 impact bullets (how many vehicles tracked? which operators use it?).
- `Medora` — same treatment. Emphasize the healthcare UX angle.
- `HandyAfrica` — same. Emphasize marketplace + mobile-first.
- Screenshots should be 1600×1000 WebP, <150 KB each.

### 1.2 Add a "Currently building" section

New component `src/components/CurrentlyBuilding.jsx` (or a Sanity schema `currentWork`) rendered between `Works` and `Contact`. Purpose: show momentum.

- Short intro: _"Side projects I'm actively shipping for West Africa markets."_
- 2–3 cards, each with: name, one-liner problem statement, current status (e.g., "Beta with 40 users in Conakry"), tech, links.
- Visually distinguish from `Works` (completed projects) — maybe a "🟢 live" / "🛠 building" status pill.

### 1.3 Tech section honesty pass

`src/constants/index.tsx` technologies array currently lists: HTML, CSS, JS, TS, React, Redux, React Native, RTL, Python, Node, MongoDB, git, docker.

- **Drop** what isn't your daily-driver strength (e.g., MongoDB, Python) unless you want full-stack framing.
- **Add** what senior frontend hiring reads as signal: **Next.js**, **Vite**, **Jest/Vitest**, **Playwright or Cypress**, **Storybook**, **Tailwind**, **GraphQL**, **Node/Express**, **CI (GH Actions)**. If you use **IBM Carbon Design System** at work — that's an impressive signal to include.

### 1.4 Add an Engineering principles / "How I work" section (optional but high-ROI)

2–3 sentences. Example: _"I optimize for readability over cleverness, write tests for the interesting edge cases, and measure before I optimize. I prefer small PRs and honest commit messages."_ This differentiates you from template portfolios.

---

## Phase 2 — Design & UX (1 day)

### 2.1 Hero redesign for scan-ability

- Left column: name, title, one-line value prop, two CTAs (`See projects` primary, `Resume` secondary).
- Right column: keep the computer canvas on desktop, but replace with a static SVG/PNG on mobile (see Phase 3).
- Add a small "Open to remote roles · based in [location] · available [timeline]" status chip. Recruiters love this.

### 2.2 Mobile responsiveness pass

Specific files to touch:
- `src/components/Hero.jsx` — switch to `flex-col lg:flex-row`; reduce the purple sidebar height on small screens; ensure heading doesn't overflow at 320px.
- `src/components/Navbar.jsx` — close mobile menu on hash-link click; add `aria-expanded`, `aria-controls` to the toggle button; replace the `<img>` toggle with a `<button>` wrapping it (keyboard + a11y).
- `src/components/Experience.jsx` — `react-vertical-timeline-component` needs a CSS override so content padding doesn't get cramped <640px.
- `src/components/Works.jsx` — card width is `sm:w-[360px] w-full` — confirm it doesn't cause horizontal scroll at 320px; test tag wrapping.
- Global: add `@media (prefers-reduced-motion: reduce)` handling — disable framer-motion variants and r3f auto-rotate.

### 2.3 Visual polish

- Consider a subtle **glassmorphism** or **bento grid** layout for Works — differentiates from the every-dev-has-this template look.
- Typography: pair Inter (UI) with a mono for code-like accents (JetBrains Mono). Load via `next/font` equivalent or self-host.
- Dark mode is the default — add a light mode toggle? (Optional; dark is fine for this audience.)
- Replace emoji-free section headers with small uppercase kicker labels (you already do this with `sectionSubText` — just make them cleaner).

### 2.4 Accessibility

- Run **axe** or **Lighthouse a11y** — target 95+.
- Fix: `alt='web-development'` in `About.jsx` → use the actual service title.
- `Works.jsx` GitHub icon is a clickable `<div>` — swap for a `<button>` or `<a>` with proper aria-label.
- Add visible focus rings (Tailwind: `focus-visible:ring-2 focus-visible:ring-[#915EFF]`).
- Audit color contrast on `text-secondary` against `bg-tertiary` and `bg-black-100`.

---

## Phase 3 — Performance (half a day)

### 3.1 Image optimization
- `src/assets/herobg.png` (930 KB), `tripguide.png` (3.3 MB), `carrent.png` (759 KB), `jobit.png` (755 KB) — all large. Convert to WebP, target <200 KB each.
- Move static assets out of `src/assets/` (which gets bundled) to `public/images/` so they're served directly.

### 3.2 3D canvas strategy
The site mounts **17 WebGL contexts on first load** (1 Computers + 1 Earth + 1 Stars + 13 Tech balls + any in Sanity). That's brutal on mobile/mid-range devices.
- Lazy-load canvases with `React.lazy` + `Suspense`, only when section is in viewport (use `IntersectionObserver`).
- On mobile (`matchMedia('(max-width: 640px)')`) render static PNG/SVG fallbacks.
- Consider replacing the 13 tech "balls" with a static grid of logos — the ball canvas adds little signal and lots of cost.
- Add `dpr={[1, 1.5]}` to all `<Canvas>` components to cap pixel ratio.

### 3.3 Bundle trimming
- Audit with `npx source-map-explorer build/static/js/*.js`.
- **Remove unused**: `@reduxjs/toolkit`, `react-redux` (no store found); `react-simple-typewriter` (not used anywhere visible); `react-social-icons` (if you move to lucide/heroicons).
- Replace `react-icons` imports with named imports from specific icon packs to enable tree-shaking.

### 3.4 Loading
- Preload the hero font and the hero background.
- Add a skeleton or shimmer for the Sanity-loaded `Works` and `Experience` sections (currently they pop in empty → populated).

---

## Phase 4 — Tech debt & modernization (1–2 days, bigger lift)

### 4.1 Migrate off Create React App
CRA is officially deprecated. Two good paths:
- **Vite** — faster dev, same SPA model, minimal migration. Recommended if you want to stay SPA.
- **Next.js (App Router)** — gives you SSR/SSG for SEO, better image optimization, Vercel deploy sweet spot. Recommended if you want SEO + full-stack framing.

### 4.2 TypeScript pass
- Convert `.jsx` components to `.tsx`. You're selling yourself as a TypeScript engineer — the portfolio code itself should reflect that.
- Upgrade TypeScript `^4.9.5` → `^5.x`.
- Type the Sanity responses properly (use `@sanity/types` or codegen).

### 4.3 Tooling
- Add **ESLint + Prettier** config (beyond CRA defaults).
- Add a **GitHub Actions** CI: typecheck + lint + build on every PR. Put the status badge in README.
- Add **Husky + lint-staged** for pre-commit.
- Add **Playwright** smoke test: hero renders, nav links scroll, contact form validates. Public green-check impresses engineers.

### 4.4 SEO & metadata
`public/index.html` needs:
- `<title>Broulaye — Frontend Software Engineer</title>`
- `<meta name="description" content="...">`
- OG tags (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`).
- Twitter card tags.
- JSON-LD `Person` schema with `jobTitle`, `worksFor`, `sameAs` (socials).
- Favicon set (already have logo.svg — generate full favicon pack).
- Update `public/manifest.json` with real name + theme color.

### 4.5 Contact form UX
- Replace `alert()` with inline field errors + toast for success/failure.
- Add `react-hook-form` (already a dep) + zod for validation.
- Honeypot field (`name="company"` hidden) to deter bots.
- Optionally: add Cloudflare Turnstile free captcha.

### 4.6 Analytics
- Add **Plausible** or **Umami** (privacy-respecting) to see which sections recruiters hit. One script tag.

---

## Phase 5 — Stretch / differentiator ideas

Pick 1–2. These are what turn a good portfolio into a memorable one.

- **Case study deep-dive pages** — one longform page per flagship project (guinea-fleet-manager, Medora) with problem → architecture decisions → screenshots → outcomes. Linked from the project card "Read case study" button. This is what senior engineering leadership actually wants to see.
- **Blog / notes** — even 3 posts on frontend topics (e.g., "How I reduced TTI in a watsonx console by 40%", "Offline-first React Native for low-connectivity West Africa") establishes taste. Use MDX.
- **Live code playground** — embed a Sandpack demo of one of your reusable components.
- **"Speaker/writer" slot** — if you have any talks, podcasts, or OSS contributions, surface them.
- **Keyboard shortcuts** — `G` then `P` to jump to projects, `?` to show help. Engineers notice.
- **RSS for the blog** and a `/uses` page (what tools/setup you use — very popular in the dev community).

---

## Suggested execution order

| Sprint | Scope | Outcome |
|---|---|---|
| Day 1 AM | Phase 0 (copy fixes) | Recruiter-ready hero + navbar |
| Day 1 PM | Phase 1.1–1.3 (Sanity content + Tech + Currently building) | Content reflects real experience |
| Day 2 | Phase 2 (design + a11y + mobile) | Modern, scannable, accessible |
| Day 3 AM | Phase 3 (perf) | Lighthouse 90+ across the board |
| Day 3 PM | Phase 4.4, 4.5 (SEO + contact UX) | Shareable + professional |
| Week 2 | Phase 4.1–4.3 (Vite/Next + TS + CI) | Codebase reflects your seniority |
| Ongoing | Phase 5 (case studies, blog) | Differentiation |

---

## Files most likely to change

- `src/components/Hero.jsx`, `Navbar.jsx`, `About.jsx`, `Contact.jsx` (copy + a11y)
- `src/constants/index.tsx` (tech list; delete unused `projects` stub)
- `src/components/Works.jsx`, `Experience.jsx` (skeleton states, a11y on clickable cards)
- `src/components/canvas/*` (lazy-load + mobile fallback)
- New: `src/components/CurrentlyBuilding.jsx`, `src/components/Footer.jsx`
- New Sanity schemas: `currentWork` (or repurpose `project` with `status` field)
- `public/index.html` (SEO meta)
- `package.json` (drop unused deps; migrate off react-scripts)
- `.github/workflows/ci.yml` (new)
