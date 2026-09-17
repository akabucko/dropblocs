// buttons-links — registers the Alpine component. Uses globals only (ADR 0005).
// Press feedback is delegated from the root so a nav or footer wraps its controls once.
document.addEventListener('alpine:init', () => {
  Alpine.data('buttonsLinks', () => ({
    init() {
      const root = this.$el;
      const d = root.dataset;
      if (d.motionPress === 'false') return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const scale = Number(d.motionPressScale ?? 0.97);
      const pressDuration = seconds(d.motionPressDuration, '--duration-db-instant');
      const releaseDuration = seconds(d.motionReleaseDuration, '--duration-db-fast');

      // One pair of paused tweens per control, created on first press and reused.
      const tweens = new WeakMap();
      const pair = (el) => {
        let t = tweens.get(el);
        if (!t) {
          t = {
            down: gsap.to(el, { scale, duration: pressDuration, ease: 'db-move', paused: true }),
            up: gsap.to(el, { scale: 1, duration: releaseDuration, ease: 'db-emphasis', paused: true, clearProps: 'transform' }),
          };
          tweens.set(el, t);
        }
        return t;
      };

      const control = (event) => {
        const el = event.target.closest('[data-press]');
        if (!el || !root.contains(el)) return null;
        if (el.disabled || el.getAttribute('aria-disabled') === 'true') return null;
        return el;
      };

      let active = null;
      const press = (el) => {
        active = el;
        const t = pair(el);
        t.up.pause();
        t.down.invalidate().restart();
      };
      const release = () => {
        if (!active) return;
        const t = pair(active);
        t.down.pause();
        t.up.invalidate().restart();
        active = null;
      };

      root.addEventListener('pointerdown', (e) => {
        if (e.button !== 0) return;
        const el = control(e);
        if (el) press(el);
      });
      root.addEventListener('keydown', (e) => {
        if (e.repeat || (e.key !== 'Enter' && e.key !== ' ')) return;
        const el = control(e);
        if (el) press(el);
      });
      root.addEventListener('keyup', (e) => {
        if (e.key === 'Enter' || e.key === ' ') release();
      });
      window.addEventListener('pointerup', release);
      window.addEventListener('pointercancel', release);
    },
  }));
});

function seconds(override, tokenName) {
  if (override) return Number(override) / 1000;
  const raw = getComputedStyle(document.documentElement).getPropertyValue(tokenName).trim();
  const n = parseFloat(raw);
  if (Number.isNaN(n)) return 0.2;
  return raw.endsWith('ms') ? n / 1000 : n;
}
