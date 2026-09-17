# Conversion Rules: Canonical to Twig (Craft CMS 5)

These are the plain rules an agent follows to convert a Dropbloc from the Canonical Format (HTML + Alpine.js + GSAP + Tailwind) into a Twig partial for Craft CMS 5. They assume the layout of the public madebyshape/craft-cms starter. A Starter Profile may overlay or override any rule. A block's manifest may add exceptions under `conversion.twig`; those win over this document.

Blade and PHP targets are reserved in the spec and have no rules yet.

## 0. One-time project init

Do this once per project, before the first block. `dropblocs init` will automate it.

1. Install GSAP: `npm i gsap`. The starter ships Alpine only.
2. Copy the Token Layer bridge file to `src/css/dropblocs.css` and import it from `src/css/index.css` immediately after `@import "tailwindcss";` and before the project's own `@theme`.
3. Copy `dropblocs.motion.js` to `src/js/dropblocs.motion.js`.
4. In `src/js/index.js`, before `Alpine.start()`:

```js
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import { registerMotion } from './dropblocs.motion.js';

gsap.registerPlugin(ScrollTrigger);
registerMotion(gsap, CustomEase);
window.gsap = gsap;
window.ScrollTrigger = ScrollTrigger;
```

`window.Alpine = Alpine` is already there in the starter. Blocks rely on these globals and never import them (ADR 0005).

5. Create `src/js/blocks/` for block scripts.

## 1. Output

| Canonical | Twig |
| --- | --- |
| `blocks/hero-parallax/block.html` | `templates/_blocks/heroParallax.twig` |
| `blocks/hero-parallax/block.js` | `src/js/blocks/heroParallax.js`, imported once from `src/js/index.js` |
| `preview.*` | not installed |

- Handle = manifest `name` in camelCase. It is the partial filename and the Matrix entry type handle.
- Inside the partial the current block is `block`, because the starter's page template loops `entry.pageBlocksContent.all()` and includes `_blocks/{handle}` with that loop variable.
- One partial per block. Never merge blocks or split one across partials.

## 2. Fields

The agent produces a fields checklist from `slots` using this table. In the risk test a human creates the fields in the control panel; in V1 the Craft MCP or a Dropblocs console command creates them.

| Slot type | Craft field | Notes |
| --- | --- | --- |
| `text` | Plain Text, single line | |
| `richtext` | CKEditor | |
| `image` | Assets, limit 1, images only | |
| `video` | Assets, limit 1 | |
| `link` | Link (Craft 5 native) | expose label and target |
| `list` | Matrix, one entry type | child slots become that entry type's fields; `min`/`max` become min/max entries |

- Field handle = slot name, exactly. Slot names are already valid handles.
- The block's entry type gets every field in the manifest's `slots`, marked required where `required: true`.
- Do not add fields the manifest does not declare. If the block needs something else, that is a manifest bug.

## 3. Markup

Work through `block.html` top to bottom.

1. **Classes stay verbatim.** Tailwind scans `templates/**/*.twig`, so every class in the canonical markup keeps working. Do not rename, remove or "tidy" classes.
2. **Attributes stay verbatim**: `x-data`, `x-init`, `x-ref`, `data-variant`, `data-motion-*` and any `aria-*`. The motion script depends on them.
3. **Each `data-slot="name"` element** becomes the field output for that slot. Keep the `data-slot` attribute.
4. **Required slots** render unconditionally.
5. **Optional slots** wrap in `{% if block.name|length %} ... {% endif %}` around the slot element, not around the whole block.
6. **Demo content is stripped.** Placeholder copy, images and links in the canonical block are replaced by field output, not kept as comments.

Per slot type:

```twig
{# text #}
<h1 data-slot="heading">{{ block.heading }}</h1>

{# richtext #}
<div data-slot="body">{{ block.body }}</div>

{# image #}
{% set image = block.image.one() %}
<img data-slot="image" src="{{ image.url }}" alt="{{ image.alt ?? image.title }}" width="{{ image.width }}" height="{{ image.height }}" loading="lazy">

{# video #}
{% set video = block.video.one() %}
<video data-slot="video" src="{{ video.url }}" muted autoplay loop playsinline></video>

{# link #}
<a data-slot="cta" href="{{ block.cta.url }}" target="{{ block.cta.target }}">{{ block.cta.label }}</a>

{# list #}
<ul data-slot="items">
  {% for item in block.items.all() %}
    <li>
      <span data-slot="label">{{ item.label }}</span>
      <span data-slot="value">{{ item.value }}</span>
    </li>
  {% endfor %}
</ul>
```

- Keep the canonical element and its classes; only the content changes.
- If `buttons-links` is installed, render `link` slots through its converted `_components/button.twig` or `_components/link.twig` (see that manifest's `conversion.twig` notes) instead of the plain anchor above.
- `loading="lazy"` on images unless the manifest's `usage` says the block is above the fold.
- Where the canonical block sets an image as a CSS background, use an inline `style` with `url({{ image.url }})` and keep the element.

## 4. JavaScript

- `block.js` is copied unchanged. It registers `Alpine.data('<handle>', ...)` on `alpine:init` and uses only `window.gsap`, `window.ScrollTrigger` and `window.Alpine`.
- Add `import './blocks/<handle>.js';` to `src/js/index.js` above `Alpine.start()`.
- Inline `x-data` in the markup stays inline.
- Never turn a block's globals into imports and never bundle GSAP per block.

## 5. Tokens

- The block's `tokens.consumes` must all exist in `src/css/dropblocs.css`. They do after init.
- For each entry in `tokens.provides`, append it to the bridge file's `@theme` with its default.
- Where the starter has an obvious equivalent token, rewrite the bridge entry to reference it, for example `--color-db-accent: var(--color-primary);`. Only do this for clear one-to-one matches. Leave everything else at its default.

## 6. Must not

- Change Tailwind classes, spacing or breakpoints.
- Change any Motion Param with `locked: true`, or any unlocked param outside its `min` and `max`.
- Add fields, slots or markup the manifest does not declare.
- Replace named easings with raw values.
- Remove `data-slot`, `data-variant` or `data-motion-*` attributes.
- Touch `_layouts/`, `_pages/` or the starter's own components, beyond the init step.

## 7. Verify

1. `npm run build` passes.
2. Every field handle in the partial appears in the fields checklist.
3. Add the entry type to the `pageBlocksContent` Matrix field and create one block with all required slots filled.
4. The page renders with no Twig error, the block animates, and `prefers-reduced-motion` produces the behaviour named in `motion.reducedMotion`.
5. Run the checks in `usage.a11y` by hand.

## Starter Profiles

A profile overlays these rules for one starter. It may rename the block variable, change output paths, and map slot types to house components (for example, `image` to an include of `_components/picture`). Profiles live in `docs/profiles/<name>.md` and are selected by `starter` in `dropblocs.json`. None exist yet.
