# Generate Preview HTML

## When to use
When the user wants to create or regenerate a `preview.html` file for a DESIGN.md.

## Workflow

1. **Read the DESIGN.md** — Parse all design tokens from the target service's DESIGN.md file.

2. **Generate preview.html** — Create an HTML file that showcases:
   - Color palette swatches with hex labels
   - Typography scale (Display through Small, showing actual fonts)
   - Japanese text samples demonstrating line-height and letter-spacing
   - Component examples (buttons, inputs, cards)
   - Spacing scale visualization
   - Elevation/shadow examples

3. **Follow existing conventions** — Match the structure and style of existing preview files in the repo (e.g., `design-md/apple/preview.html`):
   - `lang="ja"` on the html element
   - CSS custom properties for all design tokens
   - Self-contained (no external dependencies)
   - Responsive layout

4. **Output** — Write to `design-md/<service-name>/preview.html`

## Key points
- Use actual Japanese text samples (not lorem ipsum) to demonstrate typography
- Include mixed Japanese-Latin text to show mixed typesetting (konshoku) behavior
- Show kinsoku shori behavior with punctuation examples
- Ensure the preview renders correctly in modern browsers
