import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const registry = resolve(__dirname, '../../packages/registry/blocks');

/**
 * Registry blocks plugin.
 * `<!-- @block name -->` in any page is replaced with that block's block.html,
 * and its block.js (if any) is inlined so the Alpine component registers.
 * Blocks listed under `dependencies.blocks` in a used block's manifest get their
 * block.js inlined too, mirroring the CLI's recursive install.
 */
function withDependencies(names) {
  const all = new Set();
  const visit = (name) => {
    if (all.has(name)) return;
    all.add(name);
    const manifest = resolve(registry, name, 'manifest.json');
    if (!existsSync(manifest)) return;
    for (const dep of JSON.parse(readFileSync(manifest, 'utf8')).dependencies?.blocks ?? []) {
      visit(dep.split('@')[0]);
    }
  };
  names.forEach(visit);
  return [...all];
}
function registryBlocks() {
  return {
    name: 'dropblocs-registry-blocks',
    transformIndexHtml(html) {
      const used = new Set();
      html = html.replace(/<!--\s*@block\s+([a-z0-9-]+)\s*-->/g, (_, name) => {
        const file = resolve(registry, name, 'block.html');
        if (!existsSync(file)) return `<!-- block "${name}" not found -->`;
        used.add(name);
        return readFileSync(file, 'utf8');
      });
      const tags = withDependencies([...used])
        .filter((name) => existsSync(resolve(registry, name, 'block.js')))
        .map((name) => ({
          tag: 'script',
          attrs: { type: 'module' },
          children: readFileSync(resolve(registry, name, 'block.js'), 'utf8'),
          // Before the site entry so the alpine:init listener exists when Alpine.start() runs.
          injectTo: 'head-prepend',
        }));
      return { html, tags };
    },
  };
}

// One page per block at /blocks/<name>/ for previews and testing.
const blockPages = Object.fromEntries(
  readdirSync(registry, { withFileTypes: true })
    .filter((d) => d.isDirectory() && existsSync(resolve(__dirname, 'blocks', d.name, 'index.html')))
    .map((d) => [`blocks/${d.name}`, resolve(__dirname, 'blocks', d.name, 'index.html')]),
);

export default defineConfig({
  plugins: [tailwindcss(), registryBlocks()],
  server: { fs: { allow: [resolve(__dirname, '../..')] } },
  build: {
    rollupOptions: {
      input: { main: resolve(__dirname, 'index.html'), ...blockPages },
    },
  },
});
