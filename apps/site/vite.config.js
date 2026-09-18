import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const registry = resolve(__dirname, '../../packages/registry/blocks');

/**
 * Registry blocks plugin.
 * `<!-- @block name -->` in any page is replaced with that block's block.html,
 * and its block.js (if any) is inlined so the Alpine component registers.
 * `<!-- @slot name -->…<!-- @endslot -->` directly after it fills that slot (site content only).
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
      // A block comment may be followed by slot fills, the site's stand-in for editing an
      // installed copy: `<!-- @slot brand -->...<!-- @endslot -->` replaces that slot's content.
      const fillPattern = /\s*<!--\s*@slot\s+([a-z0-9-]+)\s*-->([\s\S]*?)<!--\s*@endslot\s*-->/g;
      html = html.replace(
        /<!--\s*@block\s+([a-z0-9-]+)\s*-->((?:\s*<!--\s*@slot\s+[a-z0-9-]+\s*-->[\s\S]*?<!--\s*@endslot\s*-->)*)/g,
        (_, name, fills) => {
          const file = resolve(registry, name, 'block.html');
          if (!existsSync(file)) return `<!-- block "${name}" not found -->`;
          used.add(name);
          let block = readFileSync(file, 'utf8');
          for (const [, slot, content] of fills.matchAll(fillPattern)) {
            block = block.replace(
              new RegExp(`(<(\\w+)[^>]*data-slot="${slot}"[^>]*>)[\\s\\S]*?(</\\2>)`),
              (m, open, tag, close) => `${open}${content.trim()}${close}`,
            );
          }
          return block;
        },
      );
      const names = withDependencies([...used]);
      const scripts = names
        .filter((name) => existsSync(resolve(registry, name, 'block.js')))
        .map((name) => ({
          tag: 'script',
          attrs: { type: 'module' },
          children: readFileSync(resolve(registry, name, 'block.js'), 'utf8'),
          // Before the site entry so the alpine:init listener exists when Alpine.start() runs.
          injectTo: 'head-prepend',
        }));
      // A block.css is plain CSS over the token variables, so it is inlined untouched by Tailwind.
      const styles = names
        .filter((name) => existsSync(resolve(registry, name, 'block.css')))
        .map((name) => ({
          tag: 'style',
          children: readFileSync(resolve(registry, name, 'block.css'), 'utf8'),
          injectTo: 'head',
        }));
      return { html, tags: [...scripts, ...styles] };
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
