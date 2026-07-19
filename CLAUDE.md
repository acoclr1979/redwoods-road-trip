# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Single-page trip site for a father-son road trip: San Francisco to the Redwoods, July 29 – August 2, 2026 (Adam & Aidan). No build step, no framework, no dependencies — plain HTML/CSS/JS. Deployed via GitHub Pages at https://acoclr1979.github.io/redwoods-road-trip/.

Modeled on the sibling trip site `~/Projects/perdido-key-countdown` (same author, same GitHub account), but earlier in its lifecycle. Two-phase plan:
1. **Planning tool** (current phase) — itinerary, route, checklist, just for Adam & Aidan.
2. **Daily digest** (during the trip) — will grow the same way Perdido Key did: daily photo/update ritual, then a "trip is over" recap sent to friends/family.

## Git workflow

Never commit or push to GitHub without asking first and waiting for explicit confirmation, even for small changes. Each push should get its own separate confirmation — do not batch multiple changes into one push without asking each time.

## Development

Serve the folder with `python3 -m http.server` and open `http://localhost:8000`.

To deploy: `git add . && git commit -m "..." && git push` — GitHub Pages goes live within ~1 minute.

## Trip facts (source of truth until superseded by conversation)

- **Dates:** Wed Jul 29 – Sun Aug 2, 2026
- **Home base:** Moonstone Beach (rental with an ocean-view deck)
- **Route:** San Francisco → Wine Country (Healdsburg/Windsor) → Avenue of the Giants → Fern Canyon (maybe) → Prairie Creek → Tall Trees Grove
- **Permits:** Tall Trees Grove secured. Fern Canyon NOT secured — it's a stretch-goal/maybe, contingent on a walk-up permit.
- **Fly:** STL ↔ SFO

## Pages

- `index.html` — homepage: hero, home base, day-by-day itinerary, route stops, planning checklist.

No Firebase/Firestore yet (unlike Perdido Key) — this site doesn't need interactivity until it transitions to the daily-digest phase. Add it then, following the same pattern as `perdido-key-countdown/firebase-init.js` if/when needed.
