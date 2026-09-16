# @dropblocs/tokens

The Token Layer: the only names a block may consume. See `docs/manifest-spec.md` and ADR 0004.

- `tokens.css`: a Tailwind v4 `@theme` block. Colour (`color-db-*`), font family (`font-db-sans`, `font-db-display`), radius (`radius-db-*`), section spacing (`spacing-db-section`), durations (`duration-db-*`) and role-named easings (`ease-db-enter|exit|move|emphasis`).
- `motion.js`: the same durations and easings for JavaScript, plus `registerMotion(gsap, CustomEase)` which registers the easing names with GSAP so blocks write `ease: 'db-enter'`.

```css
@import "tailwindcss";
@import "@dropblocs/tokens/tokens.css";
```

```js
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { registerMotion } from '@dropblocs/tokens/motion';
registerMotion(gsap, CustomEase);
```

Values here are the product defaults. A project never edits this file; it retunes tokens in its bridge file, `dropblocs.css`.
