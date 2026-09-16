---
status: accepted
---

# One canonical block format, converted by the agent at install time

Blocks are authored once in HTML + Alpine.js + GSAP + Tailwind. Twig, Blade and PHP versions are not maintained by hand; the installing agent converts the canonical block using shared conversion rules, with the manifest carrying only per-block exceptions. We chose this over maintaining a variant per target because hand-maintained variants triple the authoring cost of every block and drift, while the agent-conversion bet is exactly what Dropblocs exists to prove.

## Consequences

- Agent conversion reliability is the headline risk and is tested in week one by converting a real block into the madebyshape Craft starter.
- If conversion proves flaky for a target, hand-maintained variants are added for that target incrementally, starting with flagship blocks. Nothing in the manifest spec prevents this.
- Canonical blocks must avoid constructs that convert badly (see conversion rules once written).
