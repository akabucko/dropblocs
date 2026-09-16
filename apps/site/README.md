# @dropblocs/site

Vite + Tailwind v4 + Alpine + GSAP. The first consumer of the registry.

- `index.html`: the marketing site (placeholder).
- `blocks/<name>/index.html`: one preview page per block at `/blocks/<name>/`. Write `<!-- @block name -->` where the block should render; the Vite plugin in `vite.config.js` inlines the block's `block.html` and its `block.js`.
- `src/main.js`: registers ScrollTrigger and the Dropblocs motion easings, and exposes the globals blocks rely on.

```
npm run dev
```
