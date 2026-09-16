---
status: proposed
---

# Blocks consume a `db-` prefixed token namespace, bridged to project tokens on install

Canonical blocks only ever reference Token Layer tokens with a `db-` prefix (`bg-db-bg`, `duration-db-base`). On first install the CLI writes a bridge file, `dropblocs.css`, that aliases each `db-*` token to the host project's own token or a default value. Bare semantic names were rejected because host projects already define `primary`, `foreground` and similar, and collisions on install would silently restyle either the block or the site. The bridge file is also the surface Brandify edits later. Marked proposed: the naming is agreed for now and revisited once the first blocks land in a real project.
