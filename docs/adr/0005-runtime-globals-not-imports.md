---
status: accepted
---

# Canonical blocks use runtime globals, never ES imports

Block code references `window.gsap`, `window.ScrollTrigger` and `window.Alpine` and declares them under `runtime.globals` in the manifest. It never imports them. CMS projects load these libraries once and expose them globally, so a block converted to Twig drops in with no JavaScript rewrite and no bundler requirement. The site exposes the same globals from its entry file so canonical and converted blocks run identical code. The cost is that blocks cannot tree-shake or version-pin their own GSAP; the dependency list and minimum versions carry that instead.
