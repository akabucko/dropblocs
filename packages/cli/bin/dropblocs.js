#!/usr/bin/env node
// dropblocs CLI — stub. `dropblocs add <block>` to be implemented (see docs/HANDOFF.md).
const [command, ...args] = process.argv.slice(2);

if (command === 'add') {
  console.log(`dropblocs add ${args.join(' ')} — not implemented yet`);
  process.exit(0);
}

console.log('Usage: dropblocs add <block-name>');
process.exit(command ? 1 : 0);
