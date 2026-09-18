// page-transition — registers the Alpine component. Uses globals only (ADR 0005).
// The transition is CSS. This component only warms the next page so it is ready when
// the transition starts: same-origin links are prefetched on hover, focus or touch.
document.addEventListener('alpine:init', () => {
  Alpine.data('pageTransition', () => ({
    init() {
      if (this.$el.dataset.motionPrefetch === 'false') return;
      if (navigator.connection?.saveData) return;

      const seen = new Set([location.href]);
      const prefetch = (event) => {
        const a = event.target.closest?.('a[href]');
        if (!a || a.target || a.hasAttribute('download')) return;
        const url = new URL(a.href, location.href);
        if (url.origin !== location.origin) return;
        url.hash = '';
        if (seen.has(url.href)) return;
        seen.add(url.href);
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url.href;
        link.as = 'document';
        document.head.append(link);
      };

      document.addEventListener('pointerover', prefetch, { passive: true });
      document.addEventListener('focusin', prefetch, { passive: true });
      document.addEventListener('touchstart', prefetch, { passive: true });
    },
  }));
});
