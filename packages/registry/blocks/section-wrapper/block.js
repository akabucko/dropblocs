// section-wrapper — registers the Alpine component. Uses globals only (ADR 0005).
document.addEventListener('alpine:init', () => {
  Alpine.data('sectionWrapper', () => ({
    init() {
      const root = this.$el;
      const d = root.dataset;
      if (d.motionReveal === 'false') return;

      const group = root.querySelector('[data-reveal-group]');
      const targets = group ? Array.from(group.children) : [];
      if (!targets.length) return;

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const duration = d.motionRevealDuration
        ? Number(d.motionRevealDuration) / 1000
        : cssMs('--duration-db-base');
      const distance = reduced ? 0 : Number(d.motionRevealDistance ?? 24);
      const stagger = reduced ? 0 : Number(d.motionRevealStagger ?? 0.06);

      gsap.set(targets, { opacity: 0, y: distance });

      // Paused timeline, played once: no tweens created inside the trigger callback.
      const reveal = gsap.timeline({ paused: true }).to(targets, {
        opacity: 1,
        y: 0,
        duration,
        ease: 'db-enter',
        stagger,
        clearProps: 'transform',
      });

      ScrollTrigger.create({
        trigger: root,
        start: 'top 85%',
        once: true,
        onEnter: () => reveal.play(),
      });
    },
  }));
});

function cssMs(name) {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const n = parseFloat(raw);
  if (Number.isNaN(n)) return 0.4;
  return raw.endsWith('ms') ? n / 1000 : n;
}
