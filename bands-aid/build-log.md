## Code review — 2026-05-04

### Wins
- Semantic landmarks are solid: `<header>`, `<main>`, `<footer>`, `<nav>` used correctly on all three pages
- Single `<h1>` per page, logical heading hierarchy (h1 → h2 → h3 → h4)
- All `<img>` tags have non-empty, descriptive `alt` attributes (both static and Alpine-bound)
- CSS custom properties used throughout; no stray hex values outside `:root` except where intentional (semi-transparent rgba variants of accent color in `.type-badge--*` and `.seeking-badge` — acceptable)
- `defer` on Alpine CDN script; `data.js` and `script.js` load before Alpine so globals are available
- No `var` in JS; no inline event handlers (all Alpine `@click` directives)
- `x-cloak` + `[x-cloak] { display: none }` prevents FOUC on overlay and recommendation rail
- Responsive at 360px, 768px, 1024px — modal-to-drawer transition is clean
- `meta charset`, `meta viewport`, per-page `<title>` and `<meta name="description">` present on all three pages
- Focus management: `tabindex="0"` + `@keydown.enter` on recs rail cards; `aria-expanded` on nav toggle and dropdowns; `role="dialog"` + `aria-modal` on overlay; `aria-label` on all icon-only buttons
- Content is intentional — real bios, real band/artist inspirations, no lorem ipsum

### Suggestions
- `styles.css:101-103` — `.tag--pref` uses bare hex values (`#1a1a2e`, `#3a3a6e`, `#9090e8`) that aren't in `:root`. Worth adding `--color-tag-pref-bg`, `--color-tag-pref-border`, `--color-tag-pref-text` if the palette ever needs updating in one place.
- `styles.css:130-136` — `#5de09a` (available/online green) appears twice. A `--color-success-green` custom property would keep it DRY.
- `profile.html:32` — page uses `bandsAidApp()` for the overlay but the `openCreate()` path is unreachable from Browse. Low impact for a POC, but the dead code could be trimmed if this were production.
- `script.js:20` — nav CTA text is set in `DOMContentLoaded` (vanilla JS) while the rest of the UI is Alpine-driven. Works fine; just worth noting the split if the nav ever needs to become reactive.

### Must fix before shipping
- None — all three pages load correctly, filters work, profile persistence works, overlay/drawer transitions are smooth, a11y baseline is met.

<!-- homework-status: complete -->
completed_at: 2026-05-04T14:33:00Z
