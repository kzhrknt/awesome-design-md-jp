# Add DESIGN.md for a Japanese Web Service

## When to use
When the user wants to add a new Japanese web service's DESIGN.md to this collection.

## Workflow

1. **Identify the target service** — Get the service name and URL from the user.

2. **Check for duplicates** — Verify the service doesn't already exist under `design-md/`.

3. **Analyze the site's CSS** — Use the site URL to extract:
   - Color palette (hex values from computed styles)
   - Font-family declarations (especially CJK font stacks)
   - Typography tokens (size, weight, line-height, letter-spacing)
   - Component styles (buttons, inputs, cards)
   - Layout values (max-width, spacing, grid)
   - Responsive breakpoints

4. **Create the DESIGN.md** — Copy `template/DESIGN.md` to `design-md/<service-name>/DESIGN.md` and fill in all 9 sections:
   1. Visual Theme & Atmosphere
   2. Color Palette & Roles
   3. Typography Rules (sections 3.1-3.8 — the core of Japanese typography)
   4. Component Stylings
   5. Layout Principles
   6. Depth & Elevation
   7. Do's and Don'ts
   8. Responsive Behavior
   9. Agent Prompt Guide

5. **Create preview.html** — Generate a `design-md/<service-name>/preview.html` that visualizes the extracted design tokens. Follow the same structure as existing preview files (e.g., `design-md/apple/preview.html`).

6. **Update README.md** — Add the new service to the "Included Sites" table in README.md, in the appropriate position.

## Important rules
- Service directory name: lowercase romaji, no hyphens (e.g., `smarthr` not `smart-hr`)
- Section headers: English (for AI agent readability)
- Value descriptions and Do's/Don'ts: Japanese
- All color values must be exact hex from computed styles, not guesses
- font-family must include the full fallback chain
- line-height, letter-spacing must be measured values
- Commit message format: `add: <service-name> DESIGN.md`
