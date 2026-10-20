# Validate DESIGN.md Quality

## When to use
When the user wants to review or validate an existing DESIGN.md file for quality and completeness.

## Checklist

### Required (must pass)
- [ ] font-family fallback chain is accurate and complete (CJK font first)
- [ ] All colors are exact hex values (no named colors, no guesses)
- [ ] line-height and letter-spacing are measured values from the actual site
- [ ] Section headers are in English
- [ ] Value descriptions and Do's/Don'ts are in Japanese
- [ ] All 9 sections are present
- [ ] Typography section 3.1-3.8 subsections are filled in
- [ ] Agent Prompt Guide (section 9) has a valid quick reference block

### Recommended
- [ ] References official design system documentation if available
- [ ] Consistent values across multiple pages
- [ ] Light mode and dark mode covered (if the service supports both)
- [ ] preview.html exists and matches the DESIGN.md tokens

## How to validate
1. Read the target DESIGN.md file
2. Check each item in the checklist above
3. If possible, fetch the actual site CSS to compare values
4. Report findings with specific line numbers and suggested fixes
