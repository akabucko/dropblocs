# Dropblocs brand pass v0.1

Status: draft, 2026-09-18. Scope is the minimum brand needed to build the first hero and go public. Everything else waits until the hero has taught us what it needs.

## Why now

The three foundation blocks (section wrapper, buttons and links, nav) are structural, so system fonts and a placeholder green were fine. The hero is the first block where the brand *is* the content, and it is the first thing that goes public. Type sets a hero's proportions, weight and rhythm, so the display face has to be chosen before the hero is built. Colour and the wordmark can still move afterwards because blocks only consume role names.

## Constraints already settled

- **Shape of the Token Layer is fixed** (`packages/tokens/src/tokens.css`, ADR 0004, 0006, 0007). The brand pass fills in values. It does not add roles.
  - Colour: `bg`, `fg`, `muted`, `surface`, `border`, `accent`, `on-accent`, `contrast`, `on-contrast`.
  - Type: two roles only, `font-db-sans` and `font-db-display`.
  - Radius: four steps. Motion: six durations, four role-named easings.
- **Two audiences for the same tokens.** The Dropblocs site is *one project* that consumes the registry. So there are two sets of values:
  1. **Registry defaults**: what a block looks like when installed with no Brandify. Must be free to ship (system stacks or OFL faces). Every public block preview uses these.
  2. **Dropblocs brand**: the site's own bridge file (`dropblocs.css`). Can use licensed faces.
  A licensed face like Zuume Cut can be the brand display face, but it can never be a registry default.
- **Wordmark is type-only, lowercase**, with a motion signature on `ease-db-enter` (HANDOFF 3b).
- **Vibe words** (from the glossary): drop, kit, motion-first, agent-first. Streetwear release language, not enterprise design-system language.

## Typography

### Display: Zuume Cut (proposed)

Zuume Cut is a heavy condensed display sans with notched, cut-away terminals. It reads as sport, poster and streetwear, which lines up with the "drop" vocabulary better than any neutral grotesk would. It is a good candidate for the display role.

What it is good at:
- Wordmark and hero headlines at large sizes. The cuts only read above roughly 40px.
- Tight leading and tracking. Condensed faces let a hero headline stay on two lines at mobile widths.
- A high contrast against a quiet body face, which is exactly the two-role split the Token Layer already has.

What to watch:
- **It is loud.** Restrict it to the wordmark, hero display sizes and maybe section eyebrows. Never body, UI or nav links. If it appears on every block it stops being a signature.
- **Caps only.** Zuume Cut has no lowercase (foundry: "an all caps typeface"; Adobe tags it Capitals Only). This collides with the lowercase wordmark rule in HANDOFF 3b. One of them gives; see Decisions.
- **Licence.** Designer Adam Ladd. On Adobe Fonts (8 styles: Light, Regular, Bold, Black and italics) via Adobe's embed only; self-hosting and redistribution are prohibited. The 16-style family and a variable font are sold direct by the foundry. It can never be a Registry Default.
- **Weight.** Pick one weight for the brand and stick to it. Mixing weights is the fastest way to look unedited.

Decision needed: **which weight**, and **caps or lowercase for headlines** (the wordmark is lowercase regardless).

### Type scale (starting values, retune after the hero)

| Role | Size | Leading | Notes |
|------|------|---------|-------|
| Hero display | clamp(3.5rem, 2rem + 8vw, 9rem) | 0.9 | Zuume Cut Bold, tracking -0.01em |
| Section heading | clamp(2.25rem, 1.5rem + 3vw, 4rem) | 0.95 | Zuume Cut Bold |
| Body | 1.0625rem | 1.6 | Geist Regular |
| Small and nav | 0.875rem | 1.4 | Geist Medium |

### Sans: partner for Zuume Cut (to choose)

The sans does all the work at text sizes, so it should be neutral, slightly warm to sit with the warm neutrals in the palette, and free if possible so brand and registry default coincide.

Candidates, in order of preference:

| Face | Licence | Why |
|------|---------|-----|
| Inter | OFL | Neutral, huge range, tabular figures, well tested for UI. Safe default. |
| Geist | OFL | Slightly more character than Inter, developer-tool association fits the agent-first pitch. |
| Instrument Sans | OFL | Warmer, a little more personality, pairs well with condensed display faces. |

Recommendation: **Geist** for the brand, with the registry default sans staying the system stack. If the brand sans is OFL we can revisit making it the registry default later.

Decision needed: pick one, then set the body size, leading and tracking scale.

### Registry defaults for the two roles

- `font-db-display`: system stack now. Consider a free condensed face (for example Bricolage Grotesque or Barlow Condensed) so an unbranded install still has a display voice. Decide after the hero.
- `font-db-sans`: system stack. Unchanged.

## Colour

Current palette is warm near-monochrome neutrals (hue 80 in oklch) with one green accent. That structure is right. The only real decision is the accent.

- **Keep green** if the brand wants to read as "go, shipped, working". Current value `oklch(0.72 0.19 150)` is a bright mint. It fights slightly with the warm neutrals; a warmer or deeper green would sit better.
- **Change accent** if the streetwear direction wants something hotter. An orange or acid yellow pairs naturally with a heavy condensed face and the notched terminals.

Whatever is chosen, check the `accent` / `on-accent` pair for contrast on buttons and the `contrast` / `on-contrast` pair for the inverted nav and footer. Dark mode is out of scope for this pass.

Decision needed: accent hue. Do it by setting three candidate values in the bridge file and looking at the buttons and nav previews, not by picking swatches.

## Wordmark and mark

Two things, kept apart by name:

- **Wordmark**: "DROPBLOCS" in Zuume Cut Bold, caps, tracking tightened until the letters nearly touch. The primary logo.
- **Mark**: the letterforms "D" and "B" *are* the two visible faces of a cube, meeting at its edge. There is no box; the letters imply it. Every face carries a letter, D and B alternating, all in the foreground colour. The compact logo for tight spaces such as the scrolled nav and the favicon. Rough CSS prototype in this pass, polished after the hero.

Motion, two triggers that never fire together:

- Wordmark on page load: the letters land as if dropped, "BLOCS" arriving a beat after "DROP", on `duration-db-base` and `ease-db-enter`. Total under `duration-db-slow`.
- Mark on hover: one spin, on `duration-db-snappy` and `ease-db-move`.

Both use existing tokens only so they can become block interactions later.

## Plan

Timebox: one session. Each step ends with looking at the three existing block previews on the site, once through the Bridge File and once with raw Registry Defaults.

1. **Bridge File for the site.** Add `apps/site/src/dropblocs.css`, imported after the token layer, overriding only `--font-db-display`, `--font-db-sans` and the accent pair. `packages/tokens` is untouched.
2. **Load the faces.** Adobe Fonts embed for Zuume Cut (needs the project ID from Joe) and Geist self-hosted from the npm package.
3. **Wordmark.** "DROPBLOCS", Zuume Cut Bold, in `apps/site/index.html` and the site's nav brand slot. Apply the starting type scale.
4. **Mark prototype.** CSS cube with "D" and "B", accent faces, hover spin. Placed in the nav brand slot and shown in the scrolled state instead of the wordmark.
5. **Accent test.** Green, hot pink, acid yellow as three values in the Bridge File, judged on the buttons and nav previews. Pick one, check both contrast pairs.
6. **Wordmark motion.** One timeline on `ease-db-enter`, under `duration-db-slow`.
7. **Favicon** from the mark. Update HANDOFF 3b. Then start the hero.

Ongoing rule from here: every block preview is checked twice, once through the site bridge (brand faces) and once with the raw registry defaults (system stacks). A layout that only works in the condensed brand face is a bug in the block, not in the default.

## Execution log

2026-09-18, steps 1 to 4, 6 and 7 done on the site:

- `apps/site/src/dropblocs.css` is the Bridge File: Zuume Cut (Adobe project `eva0wwh`, Regular and Bold with italics, linked in each page head), Geist Variable self-hosted from `@fontsource-variable/geist`, accent pair. It also carries the three accent candidates on `data-accent` and a `data-brand="off"` switch for the Registry Defaults check.
- Site type scale lives in `apps/site/src/style.css` as `text-display`, `text-heading`, `text-body`, `text-small`.
- The Vite plugin accepts `<!-- @slot brand -->` fills after a block comment, so the site's nav shows the wordmark and swaps to the mark when scrolled without touching the registry nav.
- Mark prototype is plain CSS in `style.css`: six lettered faces, the D and B glyphs stretched (`--db-mark-stretch`) to fill a square and flush to their edges, one spin on hover over `duration-db-slow`. Known roughness: the spin reverses on hover-out.
- Wordmark drops in on the home page: DROP then BLOCS, 0.4s on `db-enter`, 0.12s stagger.
- Favicon at `apps/site/public/favicon.png`: "DB" in Zuume Cut Bold, rendered from the live font via canvas.
- Checked at 1440 and 390 wide with brand on and off. Registry Defaults wrap the specimen headline to two lines on a phone, which is fine for a specimen and the rule the hero must honour.

Open: step 5, the accent. Screenshots of green, hot pink and acid yellow on the CTA hover and the mark were reviewed; Joe picks. Once picked, delete the two losing `data-accent` blocks and the toggle on the home page.

## Decisions

Record each one as it is made, with the value and a one-line reason.

- Scope: minimum to build the hero and go public (2026-09-18). Fuller identity later, possibly via Claude Design.
- Brand direction: streetwear leads; the sans and warm neutrals carry the restraint (2026-09-18).
- Site consumes the registry through a Bridge File, the first real test of ADR 0004 (2026-09-18).
- Sans face: Geist, OFL, brand only for now (2026-09-18).
- Registry Default display face: system stack; a free condensed face is reconsidered after the hero (2026-09-18).
- Display face: Zuume Cut via Adobe Fonts embed, site Bridge File only (2026-09-18).
- Wordmark casing: DROPBLOCS in caps. Zuume Cut is caps-only, so HANDOFF 3b's lowercase rule is superseded (2026-09-18).
- Headline casing: caps, forced by the face (2026-09-18).
- Zuume Cut surfaces: wordmark, hero headline, site section headings. Never eyebrows, body, UI or nav links (2026-09-18).
- Accent test set: current green, hot pink, and one more hot option (2026-09-18). Decided by the buttons and nav previews.
- Geist: self-hosted from the npm package, bundled by Vite (2026-09-18).
- Favicon: the letters "DB" in Zuume Cut Bold, flat (2026-09-18).
- Display weight: Bold everywhere, wordmark included (2026-09-18).
- Type scale: the proposal in Typography accepted as a starting scale, retuned after the hero (2026-09-18).
- Wordmark motion: letters drop in on page load, DROP then BLOCS a beat later, on `ease-db-enter` (2026-09-18).
- Mark: the D and B letterforms are the two faces of a cube, meeting at the edge, no box, letters on all six faces, all one colour. Spins on hover. Built now as a rough CSS prototype only. It is the compact logo, shown for example when the nav is in its scrolled state (2026-09-18, revised the same day from a boxed cube Joe rejected).
- Third accent candidate: acid yellow (2026-09-18).
- Wordmark-to-mark swap in the scrolled nav: site only, toggled on the nav block's existing scrolled state. Promoted to a block slot and Motion Param only after it has proved itself on the site (2026-09-18).
- ADR 0009 records the licensed-brand versus open-default split (2026-09-18).

## Out of scope for this pass

Dark mode, extended palette, logo mark or icon system, brand guidelines document, registry default display face, illustration or imagery style.
