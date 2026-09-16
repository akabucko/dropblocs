/*
 * Dropblocs motion tokens for JavaScript.
 * Mirrors the --duration-db-* and --ease-db-* values in tokens.css.
 * Call registerMotion(gsap, CustomEase) once after GSAP loads and before any
 * block runs, then blocks can write `ease: 'db-enter'` and `duration: durations.base`.
 */

/** Durations in seconds, as GSAP expects. */
export const durations = {
  instant: 0.1,
  fast: 0.2,
  snappy: 0.3,
  base: 0.4,
  slow: 0.7,
  glacial: 1.2,
};

/** Easings as cubic-bezier control points, identical to tokens.css. */
export const easings = {
  'db-enter': [0.16, 1, 0.3, 1],
  'db-exit': [0.7, 0, 0.84, 0],
  'db-move': [0.65, 0, 0.35, 1],
  'db-emphasis': [0.34, 1.56, 0.64, 1],
};

/**
 * Register the named easings with GSAP.
 * @param {typeof import('gsap').gsap} gsap
 * @param {typeof import('gsap/CustomEase').CustomEase} CustomEase
 */
export function registerMotion(gsap, CustomEase) {
  gsap.registerPlugin(CustomEase);
  for (const [name, [x1, y1, x2, y2]] of Object.entries(easings)) {
    CustomEase.create(name, `M0,0 C${x1},${y1} ${x2},${y2} 1,1`);
  }
}
