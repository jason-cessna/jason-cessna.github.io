---
title: Band's Aid — Tech Spec
author: Jason
status: draft
---

# Band's Aid — Tech Spec

## Stack
- HTML5 + CSS3 + vanilla JS (ES modules)
- Alpine.js 3.x (CDN) — modal/drawer toggle, filter state, recommendations logic
- Inter (Google Fonts CDN) — body text
- JetBrains Mono (Google Fonts CDN) — headings, tags, monospace accents
- No build step, no framework, no backend.

## File layout

```text
websites/bands-aid/
  index.html          # Home / Discovery
  profile.html        # Profile View (modal/drawer target)
  create.html         # Create a Profile
  assets/
    styles.css        # All shared styles, CSS custom properties, modal/drawer
    script.js         # Nav highlighting, shared utilities
    data.js           # Mock profiles array (musicians + bands)
```

## Navigation component
- Each page loads `assets/script.js` which reads `document.body.dataset.page`
  and adds `.is-active` to the matching `<nav>` link.
- Nav: `<header>` with site name (monospace) left, `<nav>` links right.
  On mobile, links collapse into a hamburger (Alpine.js toggle).

## Modal / Drawer pattern
- A single `<div id="overlay">` lives at the bottom of each page's `<body>`.
- On desktop (≥768px): overlay is a centered modal with backdrop blur.
- On mobile (<768px): overlay slides up from the bottom as a drawer.
- CSS handles the visual difference via a media query on `.overlay-panel`.
- Alpine.js (`x-data`, `x-show`, `x-on:click`) handles open/close state.
- Profile cards and the "Create a Profile" CTA both trigger the same overlay.
- Closing: click backdrop, press Escape, or tap the close handle.

## Mock data structure (`assets/data.js`)
```js
// Each profile object shape:
{
  id: "m-001",
  type: "musician",        // "musician" | "band"
  name: "...",
  role: "...",             // e.g. "Drummer", "Bassist", "Vocalist"
  location: "Austin, TX",
  distanceMiles: 4,        // pre-computed from a fictional origin point
  genres: ["post-punk", "noise rock"],
  preference: "originals", // "covers" | "originals" | "mix"
  inspirations: ["Fugazi", "Unwound", "Drive Like Jehu"],
  bio: "...",
  photo: "https://...",    // free-license image URL (unavatar / picsum)
  mediaPlaceholders: 3,    // number of media slots to render
  available: true,
  postedDaysAgo: 2
}
```
Seed at least 12 profiles: mix of musicians and bands, 4–5 genres
(post-punk, indie rock, folk, hip-hop, metal), spread across 3 cities.

## Palette (CSS custom properties)
```css
--color-bg:           #121212;
--color-surface:      #1E1E1E;
--color-border:       #2E2E2E;
--color-accent:       #8F16B5;
--color-accent-hover: #B84DE0;
--color-accent-dark:  #6A0F88;
--color-tag-bg:       #2A0F38;
--color-text:         #F0F0F0;
--color-text-muted:   #888888;
```

## Typography
- **Headings:** JetBrains Mono, 600 weight, tight letter-spacing (-0.02em)
- **Body:** Inter, 400/500, 1rem / 1.6 line-height
- **Tags / labels:** JetBrains Mono, 500, 0.75rem, uppercase

## Page outlines

### index.html — Home / Discovery
- `<header>` — site name + nav
- Hero bar — tagline + "Create a Profile" CTA (opens create overlay)
- Filter bar — role toggle (All / Musicians / Bands), genre multi-select,
  location input, preference select (Any / Covers / Originals / Mix).
  All filters are Alpine.js reactive, no page reload.
- Recommendations rail — "New matches for you" horizontal scroll of 3–4
  cards that are ≤7 days old and match the active filter state.
- Results grid — all profiles matching current filters, 3-col desktop /
  1-col mobile. Each card: photo, name, role, location + distance,
  genre tags, preference badge, "View Profile" button.

### profile.html — Profile View (rendered inside overlay)
- Close handle (drawer) / X button (modal)
- Hero: photo (large), name, role, location + distance, available badge
- Genre tags row
- Preference badge + inspirations list
- Bio section
- Media grid — placeholder tiles (video icon, audio icon, photo icon)
  with count from `mediaPlaceholders`
- "Connect" button (accent, full-width on mobile) — no action in POC,
  visually present

### create.html — Create a Profile (rendered inside overlay)
- Close handle / X button
- Form sections (each a `<fieldset>`):
  1. Are you a musician or a band? (radio toggle)
  2. Name / Band name
  3. Role / Instrument (text input, shown for musician only)
  4. Location (city, state)
  5. Genres (checkbox group — same list as filter)
  6. Preference (radio: Covers / Originals / Mix)
  7. Inspirations (free text, comma-separated)
  8. Bio (textarea, 300 char max with live counter)
  9. Media upload slots — 3 placeholder inputs (disabled in POC,
     labelled "Photo / Video / Audio — coming soon")
- Submit button — accent, logs to console in POC, shows a
  success toast ("Profile submitted! We'll be in touch.")

## A11y / quality bar
- Semantic landmarks: `<header>`, `<main>`, `<footer>`, `<nav>`.
- One `<h1>` per page.
- Every `<img>` has a meaningful `alt`.
- Focus trap inside modal/drawer when open.
- Keyboard-navigable: Escape closes overlay, Tab cycles within it.
- Color contrast: `#F0F0F0` on `#121212` = 16.1:1 ✓, accent `#8F16B5`
  on `#121212` checked for interactive elements.
- Responsive at 360px, 768px, 1280px.
- `<meta name="viewport">`, `<meta charset="UTF-8">`, unique `<title>`
  and `<meta name="description">` per page.
