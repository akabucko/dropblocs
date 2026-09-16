#!/usr/bin/env node
// Validate every manifest.json under blocks/ and examples/ against the manifest schema.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const schema = JSON.parse(readFileSync(join(root, 'schema/manifest.schema.json'), 'utf8'));
const ajv = new Ajv2020({ allErrors: true, strict: false });
addFormats(ajv);
const validate = ajv.compile(schema);

const manifests = [];
for (const dir of ['blocks', 'examples']) {
  const base = join(root, dir);
  if (!existsSync(base)) continue;
  for (const name of readdirSync(base)) {
    const file = join(base, name, 'manifest.json');
    if (statSync(join(base, name)).isDirectory() && existsSync(file)) manifests.push(file);
  }
}

let failed = 0;
for (const file of manifests) {
  const data = JSON.parse(readFileSync(file, 'utf8'));
  const rel = file.slice(root.length + 1);
  const ok = validate(data);
  const folder = file.split('/').at(-2);
  const problems = ok ? [] : validate.errors.map((e) => `${e.instancePath || '/'} ${e.message}`);
  if (data.name !== folder) problems.push(`name "${data.name}" does not match folder "${folder}"`);
  for (const p of ['image', 'video']) {
    const v = data.preview?.[p];
    if (v && !data.files?.some((f) => f.path === v && f.type === 'asset')) problems.push(`preview.${p} "${v}" is not listed in files as an asset`);
  }
  if (problems.length) {
    failed++;
    console.error(`✗ ${rel}`);
    for (const p of problems) console.error(`    ${p}`);
  } else {
    console.log(`✓ ${rel}`);
  }
}
if (!manifests.length) console.log('No manifests found.');
process.exit(failed ? 1 : 0);
