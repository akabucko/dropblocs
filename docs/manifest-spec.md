# Dropblocs Manifest Spec v1.0

Every Dropbloc ships a `manifest.json`. This document defines what it contains. The JSON Schema at `packages/registry/schema/manifest.schema.json` is the machine-checked version of this document. Where they disagree, the schema is wrong and this document wins until the schema is fixed.

Vocabulary is defined in `CONTEXT.md`. Decisions and their reasons are in `docs/adr/`.

## Principles

1. **Agent first, CLI second, human third.** The CLI reads a strict subset (`spec`, `name`, `version`, `files`, `dependencies`, `license`). Everything else exists so an agent can install, convert, theme and place the block well.
2. **Every section is a tool response.** Each top-level section must make sense on its own, without the block's HTML beside it, so MCP and WebMCP tools can return it verbatim. (ADR pending until the MCP server is built.)
3. **One source of truth.** Motion locks live on params, not in usage rules. Tokens live in the Token Layer, not in blocks. Conversion rules live in `docs/conversion-rules.md`, not in manifests.
4. **Lists over prose**, except for `intent`. Agents check list items one by one; they skim paragraphs.

## Top-level shape

```json
{
  "$schema": "https://dropblocs.com/schema/manifest.schema.json",
  "spec": "1.0",
  "name": "hero-parallax",
  "version": "1.0.0",
  "title": "Parallax Hero",
  "summary": "Full-bleed hero with a slow parallax image and a staggered heading reveal.",
  "category": "hero",
  "tags": ["parallax", "scroll-driven"],
  "author": { "name": "Joe Buckley", "url": "https://dropblocs.com" },
  "license": "MIT",
  "intent": { "design": "...", "motion": "..." },
  "files": [],
  "preview": { "image": "preview.webp" },
  "dependencies": { "npm": [], "blocks": [], "tokens": "^0.1.0" },
  "runtime": { "globals": [] },
  "slots": {},
  "tokens": { "consumes": [], "provides": [] },
  "motion": { "triggers": [], "reducedMotion": "fade", "params": {} },
  "usage": {},
  "variants": [],
  "conversion": {}
}
```

## Identity

| Field | Required | Rules |
| --- | --- | --- |
| `spec` | yes | Manifest Spec version, `MAJOR.MINOR`. The CLI refuses a major it does not understand. |
| `name` | yes | kebab-case, unique in the Registry. Also the block's folder name. |
| `version` | yes | Semver. Blocks version independently of the spec and of each other. |
| `title` | yes | Human display name. |
| `summary` | yes | One line, 140 characters or fewer. Written to work as a search hit or tool result. |
| `category` | yes | One of: `foundation`, `navigation`, `hero`, `features`, `testimonials`, `pricing`, `cta`, `stats`, `logos`, `faq`, `gallery`, `team`, `contact`, `blog`, `showcase`. The enum is provisional and will be finalised as blocks land. |
| `tags` | no | Free strings for flavour: `parallax`, `dark`, `scroll-driven`. |
| `author` | yes | `{ name, url }`. |
| `license` | yes | An SPDX identifier (free blocks ship `MIT`) or the string `dropblocs-pro` for Kit and Pro blocks, which the CLI licence-checks. |

Changelogs live in git, not in the manifest.

## Intent

```json
"intent": {
  "design": "One short paragraph. Why the block looks the way it does, what it is for, what it must not become.",
  "motion": "One short paragraph. What the motion communicates, where the taste lives, what would ruin it."
}
```

Both required. Both prose. These are the only prose fields; an agent converting to Twig reads `design`, an agent tuning motion reads `motion`.

## Files

```json
"files": [
  { "path": "block.html", "type": "html", "target": "{blocksDir}/hero-parallax/block.html" },
  { "path": "block.js", "type": "js", "target": "{blocksDir}/hero-parallax/block.js" },
  { "path": "preview.webp", "type": "asset" }
]
```

- `path`: relative to the block folder in the Registry.
- `type`: `html`, `js`, `css` or `asset`.
- `target`: where the CLI writes the file in the project. `{blocksDir}` resolves from `dropblocs.json`. Files without a `target` (assets) are not installed unless the project asks.

Block folder layout on disk:

```
blocks/<name>/
  manifest.json
  block.html        markup with inline x-data
  block.js          optional, motion setup once it outgrows inline
  preview.webp      required
  preview.mp4       optional
```

## Preview

```json
"preview": { "image": "preview.webp", "video": "preview.mp4" }
```

`image` required, `video` optional. Both must appear in `files` as type `asset`. The site and agents use these; they are never installed by default.

## Dependencies

```json
"dependencies": {
  "npm": ["gsap@^3.14", "alpinejs@^3.17"],
  "blocks": ["section-wrapper"],
  "tokens": "^0.1.0"
}
```

- `npm`: `name@range` strings an agent can paste into an install command.
- `blocks`: other Dropblocs by name, optionally `name@version`. Installed recursively. Already-present blocks are skipped; the CLI never overwrites an installed block without `--force`.
- `tokens`: semver range of the Token Layer this block needs.

No implicit dependencies. If the block uses ScrollTrigger, GSAP is listed here and `ScrollTrigger` is listed in `runtime.globals`.

## Runtime

```json
"runtime": { "globals": ["gsap", "ScrollTrigger", "Alpine"] }
```

Canonical blocks reference these as `window.*` and never import them (ADR 0005). The list tells a host project what it must expose.

## Slots

A Slot is a typed content region. Its type doubles as the CMS field mapping during Conversion.

```json
"slots": {
  "eyebrow":  { "type": "text",     "required": false, "description": "Short label above the heading" },
  "heading":  { "type": "text",     "required": true,  "description": "Main heading, one line ideal" },
  "body":     { "type": "richtext", "required": false },
  "image":    { "type": "image",    "required": true,  "description": "Landscape, at least 2000px wide" },
  "cta":      { "type": "link",     "required": false },
  "items": {
    "type": "list", "required": false, "min": 2, "max": 6,
    "slots": {
      "label": { "type": "text", "required": true },
      "value": { "type": "text", "required": true }
    }
  }
}
```

- Slot names are camelCase and valid as CMS field handles. The agent uses them verbatim in Twig (`entry.heading`).
- Types: `text`, `richtext`, `image`, `video`, `link`, `list`. A `list` declares its child `slots` and optional `min` and `max`.
- No `boolean` or `enum` slot types. Those are Variants or Motion Params, not content.
- In `block.html` each slot is marked with `data-slot="name"` on the element that renders it, so conversion can find it without guessing.

## Tokens

```json
"tokens": {
  "consumes": ["color-db-bg", "color-db-fg", "font-db-sans", "duration-db-base", "ease-db-enter"],
  "provides": [
    { "name": "color-db-hero-glow", "default": "#ff6a00", "description": "Radial glow behind the heading" }
  ]
}
```

- Token names are the Tailwind v4 theme variable name without the leading `--`. `color-db-bg` is `--color-db-bg` and the utility `bg-db-bg`.
- `consumes` is the full contract. The token lint scans block code and fails on any `db-` token used but not listed, or listed but not used.
- `provides` is for values the Token Layer lacks (ADR 0006). Every entry must be `db-` prefixed and carry a default. On install they are written into the project's bridge file.
- Block code must not define CSS variables outside `provides`.

## Motion

```json
"motion": {
  "triggers": ["scroll"],
  "reducedMotion": "fade",
  "params": {
    "revealDuration": { "type": "duration", "default": "db-base", "min": 200, "max": 1200, "locked": false, "description": "Heading reveal length" },
    "revealEase":     { "type": "easing",   "default": "db-enter", "locked": true },
    "stagger":        { "type": "number",   "default": 0.08, "min": 0.02, "max": 0.2, "locked": false, "description": "Seconds between heading words" },
    "parallaxAmount": { "type": "number",   "default": 0.15, "min": 0, "max": 0.4, "locked": true },
    "loop":           { "type": "boolean",  "default": false },
    "direction":      { "type": "enum",     "default": "up", "values": ["up", "down"] }
  }
}
```

- `triggers`: one or more of `load`, `scroll`, `scrub`, `hover`, `click`, `inview`. Structural, never tunable. `scrub` is called out separately because scrub animations interact badly with smooth-scroll libraries and an agent must be able to see that without reading code.
- `reducedMotion`: required. `static` (final state, no animation), `fade` (crossfade only) or `custom` (the block ships its own reduced variant).
- `params`: named knobs. Types:
  - `duration`: milliseconds. `default` is a Token Layer duration name (`db-instant`, `db-fast`, `db-snappy`, `db-base`, `db-slow`, `db-glacial`) or a number. `min` and `max` in ms bound any override.
  - `easing`: `default` is a Token Layer easing name. Raw cubic-beziers are never accepted; this keeps the motion language coherent.
  - `number`: generic, with `min` and `max`.
  - `boolean`.
  - `enum`: with `values`.
- `locked: true` means the agent must not change the value. This is the mechanism behind "what not to change". Unlocked params may be tuned within their bounds.
- Param names are exposed to the block's code as `data-motion-<kebab-name>` attributes on the block root, or read from the Alpine component; the block author chooses, the manifest only names them.

## Usage

```json
"usage": {
  "placement": ["First block on a page", "Never more than one per page"],
  "pairsWith": ["logo-wall", "features-grid"],
  "avoidWith": ["hero-video"],
  "a11y": ["Heading slot renders an h1", "Parallax pauses under prefers-reduced-motion"],
  "doNotChange": ["The heading reveal order", "Image aspect ratio below 16:9"]
}
```

All five lists required, empty allowed. Short strings. `pairsWith` and `avoidWith` are block names. Motion locks do not go here.

## Variants

```json
"variants": [
  {
    "name": "video",
    "description": "Looping background video instead of an image",
    "motion": { "parallaxAmount": 0 },
    "slots": { "video": { "required": true }, "image": { "required": false } }
  }
]
```

- In code the block root carries `data-variant="<name>"` and CSS and motion branch on it. A Variant never changes markup structure; that is a different block.
- `motion` overrides param defaults (still within bounds). `slots` overrides `required` only.
- The absence of `data-variant` is the default variant and needs no entry.

## Conversion

```json
"conversion": {
  "twig": {
    "notes": ["Items are duplicated in JS for the loop; render each item once in Twig"],
    "slots": { "cta": "Use the project's button component if one exists, otherwise a plain anchor" }
  }
}
```

- Keys are Target names: `twig`, `blade`, `php`. Only `twig` has rules in V1; the others are reserved.
- Generic rules live in `docs/conversion-rules.md` and, when a Starter Profile is selected, its overlay. The manifest carries only exceptions. Most blocks leave this empty.

## Project-side artefacts (owned by the CLI, summarised here for context)

- `dropblocs.json` at the project root, written by `dropblocs init`: `target` (`html`, `twig`, `blade`), `blocksDir`, `tokensFile`, optional `starter` (a Starter Profile name such as `madebyshape-craft`), and `rulesFormat` (`markdown` or `claude-skill`).
- The bridge file at `tokensFile` (default `dropblocs.css`): every `db-` token with an inline default value. The agent rewrites entries to `var(--project-token)` where a project token matches. Brandify edits the same file.
- A generated `dropblocs.md` or Claude Code skill assembled from the conversion rules, the Starter Profile, and the `intent` and `usage` of each installed block. Never hand-authored.

## Validation ("tested code" in V1)

A block is publishable when:

1. `manifest.json` validates against the JSON Schema.
2. The token lint passes (`tokens.consumes` matches the code; no undeclared CSS variables).
3. Its page on the site passes an axe accessibility scan.

Visual and motion regression tests are deferred.

## Versioning of this spec

`spec` is `MAJOR.MINOR`. Minor versions add optional fields. Major versions may rename or remove fields and the CLI refuses manifests from a major it does not know.
