# Dropblocs

Drop-in animated UI blocks your AI agent can actually use.

A motion-first library of drop-in, animated UI blocks for CMS-driven sites (Craft CMS, Laravel; WordPress later). Blocks ship as tested code plus machine-readable manifests so coding agents can install, theme and adapt them.

Canonical block format: HTML + Alpine.js + GSAP + Tailwind.

## Layout

```
packages/
  registry/   blocks + manifests (canonical HTML/Alpine/GSAP)
  tokens/     design tokens + motion system (the brand)
  cli/        dropblocs add ...
  mcp/        MCP server (V1.1)
apps/
  site/       Vite + Tailwind + Alpine, dogfooding the registry
docs/         manifest spec, conversion rules, ADRs, glossary
```

## Getting started

```
npm install
npm run dev
```

See `docs/HANDOFF.md` for the plan and settled decisions.
