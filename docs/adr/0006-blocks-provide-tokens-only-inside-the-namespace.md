---
status: accepted
---

# Blocks may provide tokens, but only declared `db-` tokens that join the Token Layer

A block may declare `tokens.provides[]` for values the shared Token Layer lacks, such as a showpiece's one-off glow colour. Every provided token must be `db-` prefixed, declared with a default, and is written into the project's bridge file on install so Brandify can retune it. Undeclared or un-prefixed CSS variables in block code fail lint. We considered forbidding provided tokens entirely to protect "theme once, all blocks follow", but people will want cssVars-style extension for showpieces, and forcing it into the namespace keeps one source of truth without blocking it.
