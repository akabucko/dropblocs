# Dropblocs

A motion-first library of drop-in, animated UI blocks that coding agents install, theme and adapt into CMS-driven sites. This glossary is the language used across the registry, CLI, docs and site.

## Language

### Product

**Dropbloc**:
One drop-in UI block: tested canonical code plus its Manifest. Shortened to "block" in code and prose.
_Avoid_: Component, section, widget, pattern

**Registry**:
The published collection of Dropblocs, with an index the CLI and agents read to find and fetch blocks.
_Avoid_: Library, catalogue, package

**Kit**:
A curated, purchasable bundle of Dropblocs sold as one product.
_Avoid_: Bundle, pack, theme

**Drop**:
A limited-edition Kit, often designer-collaborated, released in a fixed run.
_Avoid_: Launch, release, edition

**Token Layer**:
The shared set of design tokens (colour, type, radius, spacing, motion scale) every Dropbloc consumes. Themed once per project.
_Avoid_: Theme, design system, config

**Brandify**:
The process of retuning the Token Layer for a project from brand inputs such as colours, font and vibe words.
_Avoid_: Theming, skinning, customising

### Manifest

**Manifest**:
The machine-readable JSON description of one Dropbloc, written for agents first, the CLI second, humans third.
_Avoid_: Config, metadata, schema, spec

**Manifest Spec**:
The versioned definition of what a Manifest may contain. Every Manifest names the spec version it conforms to.
_Avoid_: Schema (that is the JSON Schema artefact of the spec), format

**Slot**:
A typed content region of a Dropbloc, such as a heading, image or list of items. The type doubles as the CMS field mapping.
_Avoid_: Prop, field, placeholder, region

**Variant**:
A named configuration of the same Dropbloc code. A Variant never changes the markup structure; that would be a different Dropbloc.
_Avoid_: Version, mode, style, option

**Motion Param**:
A named, typed animation knob on a Dropbloc with a default and guardrails. Locked Motion Params must not be changed by an agent.
_Avoid_: Setting, animation option, tween value

**Intent**:
Two short prose passages in a Manifest, one for design and one for motion, that tell an agent why the Dropbloc looks and moves the way it does.
_Avoid_: Description, notes, rationale

**Canonical Format**:
The one format every Dropbloc is authored in: HTML + Alpine.js + GSAP + Tailwind.
_Avoid_: Source, HTML version, vanilla

**Conversion**:
An agent turning a Dropbloc from the Canonical Format into a Target format at install time, following Conversion Rules.
_Avoid_: Port, translation, build

**Conversion Rules**:
The shared, per-Target instructions an agent follows when converting. Manifests carry only per-block exceptions.
_Avoid_: Mapping, adapter, transform

**Bridge File**:
The per-project stylesheet, `dropblocs.css`, that aliases every `db-` token to that project's own tokens or defaults. Written on first install, edited by Brandify.
_Avoid_: Theme file, overrides, mapping file

**Starter Profile**:
A named overlay of Conversion Rules for a specific project starter, such as the madebyshape Craft starter, layered on the plain rules for a Target.
_Avoid_: Preset, adapter, flavour

**Target**:
A template format a Dropbloc can be converted to: Twig (Craft CMS), Blade (Laravel), PHP (WordPress).
_Avoid_: Platform, framework, flavour
