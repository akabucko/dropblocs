---
status: accepted
---

# Manifests are JSON, written for agents first

Every block ships a `manifest.json` validated by a published JSON Schema. Readers in priority order: agent, CLI, human. The CLI consumes only a strict subset (identity, files, dependencies); the rest is agent-facing and can be richer. JSON was chosen over YAML and JS modules so PHP-side consumers (Craft and WordPress plugins, an MCP server) can read it without a JS runtime, and so agents parse it without ambiguity.
