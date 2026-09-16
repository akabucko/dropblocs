# @dropblocs/registry

Blocks and their manifests in the canonical format (HTML + Alpine.js + GSAP + Tailwind).

Each block lives in `blocks/<block-name>/` with its code and a `manifest.json` conforming to the manifest spec in `docs/manifest-spec.md`.

Build order: the five foundation pieces first (nav, footer, buttons/links motion language, section wrapper, page transitions), then the first hero.
