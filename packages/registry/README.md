# @dropblocs/registry

Blocks and their manifests in the canonical format (HTML + Alpine.js + GSAP + Tailwind).

Each block lives in `blocks/<block-name>/` with its code and a `manifest.json` conforming to `docs/manifest-spec.md`. The JSON Schema is in `schema/`, a reference manifest is in `examples/hero-parallax/`.

```
npm run validate -w packages/registry
```

validates every manifest under `blocks/` and `examples/`.

Build order: the five foundation pieces first (nav, footer, buttons/links motion language, section wrapper, page transitions), then the first hero.
