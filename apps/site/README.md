# @dropblocs/site

Vite + Tailwind v4 + Alpine + GSAP. The first consumer of the registry.

- `index.html`: the marketing site (placeholder).
- `blocks/<name>/index.html`: one preview page per block at `/blocks/<name>/`. Write `<!-- @block name -->` where the block should render; the Vite plugin in `vite.config.js` inlines the block's `block.html` and its `block.js`, plus the `block.js` of every block under its manifest's `dependencies.blocks`, and inlines any `block.css` as a style tag. Directly after a block comment, `<!-- @slot name -->…<!-- @endslot -->` fills that slot with site content, the stand-in for editing an installed copy (the nav's brand slot on the home page uses it).
- `src/dropblocs.css`: the site's Bridge File (ADR 0004, 0009). Brand faces and the accent live here, never in `packages/tokens`. Zuume Cut loads from the Adobe Fonts link in each page head.
- `src/main.js`: registers ScrollTrigger and the Dropblocs motion easings, and exposes the globals blocks rely on.

```
npm run dev
```
