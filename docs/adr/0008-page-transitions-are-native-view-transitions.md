---
status: accepted
---

# Page transitions are cross-document View Transitions, not a JavaScript router

The `page-transition` block opts the site into the browser's cross-document View Transitions with `@view-transition { navigation: auto }` and times the old and new page snapshots with the Token Layer's durations and easings in CSS. It does not intercept link clicks, fetch pages or swap the DOM. A GSAP-driven router was rejected because it must hide the arriving page before first paint to avoid a flash, which needs render-blocking script or CSS and breaks with JavaScript off, and because it re-implements scroll restoration, focus and history that the browser already gets right. The native path degrades to an instant navigation where unsupported, works on any server-rendered target with one include, and lets the nav hold still across pages by giving it a `view-transition-name`. The cost is that motion params cannot reach CSS pseudo-elements, so this block's timings are retuned through tokens rather than `data-motion-*` attributes, and this is the first block to ship a `block.css`.
