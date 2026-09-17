// nav — registers the Alpine component. Uses globals only (ADR 0005).
document.addEventListener('alpine:init', () => {
  Alpine.data('nav', () => ({
    open: false,
    scrolled: false,
    desktop: true,
    menu: null,

    init() {
      const root = this.$el;
      const d = root.dataset;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const menuDuration = seconds(d.motionMenuDuration, '--duration-db-base');
      const hideDuration = seconds(d.motionHideDuration, '--duration-db-snappy');
      const stagger = reduced ? 0 : Number(d.motionMenuStagger ?? 0.05);

      // Load reveal: header row settles in from just above, once.
      if (d.motionRevealOnLoad !== 'false') {
        const group = root.querySelector('[data-reveal-group]');
        const targets = group ? Array.from(group.children) : [];
        gsap.timeline().fromTo(
          targets,
          { opacity: 0, y: reduced ? 0 : -8 },
          { opacity: 1, y: 0, duration: menuDuration, ease: 'db-enter', stagger: reduced ? 0 : 0.06, clearProps: 'transform' },
        );
      }

      // Hide on scroll down, return on scroll up. Paused tween, never recreated.
      const hide = gsap.to(root, { yPercent: -100, duration: hideDuration, ease: 'db-move', paused: true });
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          const y = self.scroll();
          this.scrolled = y > 8;
          if (d.motionHideOnScroll === 'false' || this.open) return;
          if (self.direction === 1 && y > root.offsetHeight) hide.play();
          else hide.reverse();
        },
      });

      // Below lg the nav element is a panel; the timeline exists only there and is
      // reverted (with any state) when the viewport crosses the breakpoint.
      // Not $refs: the panel carries its own x-data (buttonsLinks), which scopes refs.
      const panel = root.querySelector('[data-menu]');
      const mm = gsap.matchMedia();
      mm.add('(max-width: 63.99rem)', () => {
        this.desktop = false;
        const groups = Array.from(panel.querySelectorAll('[data-menu-group]'));
        const items = groups.flatMap((g) => Array.from(g.children));
        gsap.set(panel, { autoAlpha: 0 });
        this.menu = gsap
          .timeline({ paused: true, onReverseComplete: () => gsap.set(panel, { autoAlpha: 0 }) })
          .fromTo(panel, { autoAlpha: 0 }, { autoAlpha: 1, duration: seconds(null, '--duration-db-fast'), ease: 'db-move' })
          .fromTo(
            items,
            { opacity: 0, y: reduced ? 0 : 16 },
            { opacity: 1, y: 0, duration: menuDuration, ease: 'db-enter', stagger },
            '<',
          );
        return () => {
          this.desktop = true;
          this.menu = null;
          this.close();
        };
      });
      mm.add('(min-width: 64rem)', () => {
        this.desktop = true;
      });
    },

    toggle() {
      this.open ? this.close() : this.openMenu();
    },
    openMenu() {
      this.open = true;
      document.body.style.overflow = 'hidden';
      this.menu?.timeScale(1).play();
    },
    close() {
      if (!this.open) {
        document.body.style.overflow = '';
        return;
      }
      this.open = false;
      document.body.style.overflow = '';
      // Leaving is quicker than arriving.
      this.menu?.timeScale(1.6).reverse();
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
