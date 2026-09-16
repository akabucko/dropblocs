---
status: accepted
---

# Easings are named by role, not by curve shape

The Token Layer exposes four easings, `db-enter`, `db-exit`, `db-move` and `db-emphasis`, and manifests may only reference these names. Shape names such as `out` and `in-out` were rejected because they tell an agent what a curve does but not when to use it, and in practice invite `in-out` everywhere. Role names carry the motion language: arriving elements ease out, leaving elements ease in, layout changes move firmly, attention gets a small overshoot. The same four names are registered with GSAP's CustomEase from `motion.js`, so CSS and GSAP cannot drift. Renaming later would touch every manifest, which is why this is recorded.
