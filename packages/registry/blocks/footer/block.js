// footer — registers the Alpine component. Uses globals only (ADR 0005).
document.addEventListener('alpine:init', () => {
  Alpine.data('footer', () => ({
    init() {
      const root = this.$el;
      const d = root.dataset;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const duration = seconds(d.motionRevealDuration, '--duration-db-base');
      const stagger = reduced ? 0 : Number(d.motionRevealStagger ?? 0.06);

      const group = root.querySelector('[data-reveal-group]');
      const targets = d.motionReveal === 'false' || !group ? [] : Array.from(group.children);
      const wordmark = d.motionWordmark === 'false' ? null : root.querySelector('[data-wordmark]');
      if (!targets.length && !wordmark) return;

      // Paused timeline, played once on first entry: nothing is created inside the trigger callback.
      const reveal = gsap.timeline({ paused: true });
      if (targets.length) {
        gsap.set(targets, { opacity: 0, y: reduced ? 0 : 24 });
        reveal.to(targets, { opacity: 1, y: 0, duration, ease: 'db-enter', stagger, clearProps: 'transform' });
      }
      if (wordmark) {
        gsap.set(wordmark, { opacity: reduced ? 0 : 1, yPercent: reduced ? 0 : 100 });
        reveal.to(
          wordmark,
          { opacity: 1, yPercent: 0, duration: seconds(d.motionWordmarkDuration, '--duration-db-slow'), ease: 'db-enter', clearProps: 'transform' },
          targets.length ? '<0.15' : 0,
        );
      }

      ScrollTrigger.create({
        trigger: root,
        start: 'top 85%',
        once: true,
        onEnter: () => reveal.play(),
      });
    },

    toTop() {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    },
  }));
});

function seconds(override, tokenName) {
  if (override) return Number(override) / 1000;
  const raw = getComputedStyle(document.documentElement).getPropertyValue(tokenName).trim();
  const n = parseFloat(raw);
  if (Number.isNaN(n)) return 0.4;
  return raw.endsWith('ms') ? n / 1000 : n;
}
