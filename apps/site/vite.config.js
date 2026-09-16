import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const registry = resolve(__dirname, '../../packages/registry/blocks');

/**
 * Registry blocks plugin.
 * `<!-- @block name -->` in any page is replaced with that block's block.html,
 * and its block.js (if any) is imported so the Alpine component registers.
 */
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
      const tags = [...used]
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
