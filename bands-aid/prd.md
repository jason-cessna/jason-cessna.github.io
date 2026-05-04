---
title: Band's Aid — PRD
author: Jason
created: 2026-05-04
status: draft
---

# Band's Aid

## Why this exists
Finding bandmates through Craigslist and other general platforms is a frustrating,
unstructured experience — walls of text, no filtering, no sense of fit. Band's Aid
is a musician matchmaking platform built the way a musician would actually want to
use it: structured profiles, real filtering by genre/role/location/preference, and
surfaced recommendations so you don't have to go hunting. Built initially as a POC
to prove out the interface and UX before wiring up a real backend.

## Audience
Musicians (solo artists, session players, instrumentalists) looking to join a band,
and bands looking to fill a slot. Anyone who's ever posted a Craigslist musician ad
and wished there was a better way.

## The three pages
1. **Home / Discovery** (`index.html`) — recommended profile cards on load, real-time
   filter/search by genre, role (musician vs band), location, and cover/original
   preference.
2. **Profile View** (`profile.html`) — full musician or band profile: photo, bio,
   genre tags, cover/original preference, inspirations, media placeholders, Connect
   button. Opens as modal on desktop, drawer on mobile.
3. **Create a Profile** (`create.html`) — onboarding form: name, role, location, bio,
   genre, preference, inspirations. Same modal/drawer pattern.

## Must-haves
- Profile cards surface role, genre tags, location, and cover/original preference at a glance
- Discovery filter narrows results in real time (no page reload)
- Full profile page feels complete — media placeholders, bio, the works

## Won't-haves
- Real file uploads — photos, videos, audio are placeholder assets
- Messaging / contact system — Connect button exists, doesn't route anywhere
- Authentication / login — no accounts, no sessions

## Design direction
- **Theme:** Industrial / Technical — monospace type, grid-heavy, serious tool energy
- **Palette:**
  - Background: `#121212`
  - Surface: `#1E1E1E`
  - Border: `#2E2E2E`
  - Primary accent: `#8F16B5`
  - Hover / links: `#B84DE0`
  - Active / pressed: `#6A0F88`
  - Tag backgrounds: `#2A0F38`
  - Text primary: `#F0F0F0`
  - Text secondary: `#888888`
- **Type / mood:** Monospace headings (JetBrains Mono via Google Fonts), sans-serif body (Inter), tight tracking, grid-structured layouts
- **Mobile:** Modal on desktop / drawer on mobile — same component, CSS + Alpine.js handle the swap. Cards stack to single-column on mobile, grid on desktop.

## Success criteria
- [ ] All three pages load in a browser.
- [ ] Dynamic nav highlights the current page.
- [ ] Discovery filter narrows results in real time.
- [ ] Profile opens as modal (desktop) / drawer (mobile).
- [ ] Passes a simple a11y pass (semantic HTML, alt text, contrast).
- [ ] Content feels intentional — mock profiles read like real musicians.
