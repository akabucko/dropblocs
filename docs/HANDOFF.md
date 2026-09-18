# Dropblocs — Handoff

This document compacts a full grilling session (design-tree interview) into the agreed plan. Treat every decision below as settled unless the user reopens it. The next session's focus: **scaffold the monorepo, then run `grill-with-docs` on the manifest spec** — the highest-leverage artifact in the plan.

## What Dropblocs is

**Positioning (working one-liner):** "Drop-in animated UI blocks your AI agent can actually use."

A motion-first library of drop-in, animated UI blocks for freelancers/agencies building CMS-driven sites (Craft CMS, Laravel; WordPress later). Agent-first: blocks ship as tested code + machine-readable manifests so coding agents (Claude Code, Cursor) can install, theme, and adapt them instead of generating mediocre UI from scratch.

## Settled decisions

### Moat
1. Motion taste + curation — agents generate technically-working but soulless animation; Dropblocs provides proven, art-directed motion.
2. A coherent design-token system agents can compose from reliably.
3. Long-game fallback: when agents get good at motion, Dropblocs becomes the trusted *reference layer* agents pay to consult (agents-with-billing-cards world, e.g. Cloudflare's model).

### Consumer & stack
- Customer = human dev driving an agent. Possible later pivot to agents-as-customers.
- Stack: TALL / Craft / Laravel ecosystem. **Not React** (deliberately avoiding the shadcn-ecosystem knife fight). WordPress expansion post-V1.
- Canonical block format: **HTML + Alpine.js + GSAP + Tailwind**. Conversion to Twig (Craft), Blade (Laravel), PHP (WordPress) is done **by the agent at install time** using conversion rules in the manifest. Hand-maintained variants only for flagship showcase blocks. If agent conversion proves flaky, fall back to maintained variants incrementally.

### What a Dropbloc is
Tested code + a manifest containing: identity (name/category/version), dependencies, slots, theme tokens consumed, named motion params (durations/easings/stagger/triggers), usage rules (placement, pairings, a11y, what NOT to change), variants, conversion rules, and a **prose "intent" field** — one paragraph of design/motion intent written for the agent.

### Distribution
- Foundation: shadcn-style **registry + CLI** (`dropblocs add hero-parallax`). Blocks become owned code in the project — never a locked dependency.
- **MCP server** layered on at V1.1 (search, fetch block, read manifest) — the "agent-first" proof and the hype/content moment.
- A skill/rules file ships free with every block.

### Theming
- All blocks consume a small shared token layer (color, type, radius, spacing, motion scale). Theme once, all blocks follow.
- **Brandify** (V2): agent takes brand inputs (colors, font, vibe words) and retunes the token layer per project. This is the "you need this" feature.

### Money (V2, nothing paid in V1)
- Free while building in public. Individual blocks stay free forever (they're the marketing).
- Revenue: **one-off Kits** + **Pro subscription** (unlimited MCP access, brandify, early/private blocks). Pro is the surface that later becomes the agent-metered billing layer (V3).
- **Designer-collab Kits + limited-edition drops**: kits designed by guest designers, some limited-quantity (sneaker-drop model — plays on "Drop" in Dropblocs). Rule: evergreen Kits are the reliable revenue; drops are additional special editions, never the only way to buy.
- Licensing: per-seat (Individual + Team ~5 seats), **unlimited client projects always**, honor-system + license key in CLI/MCP auth. No DRM.
- Payments: **Stripe Managed Payments** (Stripe's MoR — handles global VAT/tax). Fallback: Polar (Stripe-based). Paddle rejected. Verify UK eligibility when V2 approaches — not a V1 concern.

### Content strategy
- "Build a block a day" publicly; batch-produced in reality. Each episode = block + manifest + **agent demo** (watch Claude install/convert/theme it into a real Craft site). The agent demo is the differentiator — many people post Tailwind components; almost nobody posts agent-assembly of motion-first systems.
- Optional longer-form day-in-the-life dev content with Dropblocs as the ongoing project.

### First 25 blocks
- **5 foundation pieces** (built FIRST, privately — nav, footer, buttons/links motion language, section wrapper, page transitions). Token layer + motion system must exist before block 1 ships publicly.
- **15 marketing-site blocks** (heroes ×3, features ×2, testimonials, pricing, CTA, stats, logo wall, FAQ, gallery, team, contact, blog index).
- **5 showpieces** (scroll-driven storytelling, parallax gallery, animated case-study header, marquee, monthly "wow" block).
- First public block is a **hero**, not a button.

### Site
- The marketing site is the **first consumer of the system**: built from Dropblocs blocks as they're created, themed with the product's own default tokens. Site = test harness + proof simultaneously.
- V1 stack: static **Vite + Tailwind + Alpine** (canonical format, no conversion, no backend). Laravel backend only when accounts/licensing arrive (V2).
- Preceded by a minimal brand pass (1–2 days): wordmark, default token values, named easings + duration scale.

## Roadmap

- **V1 — "the system exists"** (free, public): tokens + motion system → manifest spec v1 → registry + CLI → preview site → first ~10 blocks. NOT in V1: brandify, WP, payments, community platform, MCP.
- **V1.1 — "the hype moment"**: MCP server ships; killer demo content. Plan for **WebMCP** alongside it (the site registers `search_blocks` / `get_block` tools via `navigator.modelContext` over the same registry JSON). The manifest spec already requires a one-line `summary` and tool-shaped sections for this.
- **V2 — "the product"**: full 25+ blocks, brandify, paid layer flips on (Kits + Pro), designer drops, WordPress via conversion rules, community.
- **V3 — "the infrastructure"**: format-agnostic core matures; agents as metered customers via MCP.
- Failure mode at any stage: fold the system into day-job tooling (Craft starter, agency workflows) as private R&D.

## Repo

Fresh monorepo (this repo). The user's earlier AI-block-testing repo is archived as a private lab — port learnings, not code.

```
dropblocs/
├── packages/
│   ├── registry/     # blocks + manifests (canonical HTML/Alpine/GSAP)
│   ├── tokens/       # design tokens + motion system (the brand)
│   ├── cli/          # dropblocs add ...
│   └── mcp/          # V1.1
├── apps/
│   └── site/         # Vite + Tailwind + Alpine, dogfooding the registry
└── docs/             # manifest spec, conversion rules, ADRs, glossary
```

## Immediate next actions (in order)

1. ~~Scaffold the monorepo structure above.~~ Done 2026-09-16.
2. ~~**Manifest spec v1**~~ Done 2026-09-16: `docs/manifest-spec.md`, `packages/registry/schema/manifest.schema.json`, `CONTEXT.md` glossary, ADRs 0001–0006. Validate with `npm run validate -w packages/registry`.
3. ~~Token Layer v0.1~~ Done 2026-09-16: `packages/tokens/src/tokens.css` + `motion.js` (ADR 0007). Colour roles, system font stacks, 4 radii, `spacing-db-section`, 6 durations, 4 role-named easings. Green accent for now.
3b. Brand pass planned 2026-09-18 in `docs/design.md` (grilled, decisions recorded, ADR 0009). Wordmark is DROPBLOCS in Zuume Cut Bold (caps-only face supersedes the lowercase idea), Geist for the sans, a 3D mark prototype, accent chosen by test. Site brands via its own Bridge File; Registry Defaults stay system stacks. Executed 2026-09-18 on the site (Bridge File, Geist, wordmark, mark prototype, favicon, slot fills in the Vite plugin). Accent still to be picked from the three candidates on the home page toggle.
3a. ~~Write `docs/conversion-rules.md` (plain Twig)~~ Done 2026-09-16. Target is the **public** madebyshape/craft-cms starter only (never the internal Shape starter). Fields: human-created for the risk test; V1 uses the Craft MCP (or a Dropblocs console command) to create fields from `slots`. No Starter Profile yet.
4. Build the 5 foundation pieces privately into the site playground. `section-wrapper` done 2026-09-16 (`packages/registry/blocks/section-wrapper/`, preview at `/blocks/section-wrapper/` on the site). `buttons-links` done 2026-09-17 (`packages/registry/blocks/buttons-links/`, preview at `/blocks/buttons-links/`): hover, focus and underline motion as Tailwind classes, press/release spring via a delegated Alpine component. `nav` done 2026-09-17 (`packages/registry/blocks/nav/`, preview at `/blocks/nav/`): sticky bar that hides on scroll down and returns on scroll up, scrolled surface, full-height mobile panel; the site's Vite plugin now inlines `dependencies.blocks` scripts. `footer` done 2026-09-17 (`packages/registry/blocks/footer/`, preview at `/blocks/footer/`): link groups, legal row, back to top, and a cropped large wordmark that rises on first entry. `page-transition` done 2026-09-17 (`packages/registry/blocks/page-transition/`, preview at `/blocks/page-transition/`, ADR 0008): native cross-document View Transitions timed with the tokens, nav held still, hover prefetch; first block with a `block.css`, which the site plugin and the conversion rules now handle. All five foundation pieces are in.
5. First hero + first content batch → go public.
6. **Week-one risk test**: hand Claude a block + manifest, have it convert HTML→Twig into the madebyshape/craft-cms starter. Validates the agent-conversion bet while it's cheap to change.

## Known risks to watch

- Agent HTML→Twig conversion reliability (test in week one — see above).
- Daily content cadence vs. day job (batching is the mitigation; protect it).

## Suggested skills for the next session

- `mattpocock-skills:setup-matt-pocock-skills` — run once first to configure the repo's issue tracker, triage labels, and doc layout.
- `mattpocock-skills:grill-with-docs` — for the manifest spec (produces ADRs + glossary as you go).
- `mattpocock-skills:domain-modeling` — pin the ubiquitous language (Dropbloc, Kit, drop, manifest, token layer, brandify).
- `mattpocock-skills:to-tickets` — break V1 into tracer-bullet tickets once the spec settles.
- `mattpocock-skills:tdd` — for the CLI and conversion tooling.
