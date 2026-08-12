---
name: William Blair
description: A quiet scientific folio for a personal introduction and essays.
colors:
  paper: "#f5f2e9"
  paper-deep: "#ece7da"
  ink: "#111b30"
  ink-soft: "#3f5068"
  wash: "#8699ad"
  wash-deep: "#243a55"
  cartographic-gold: "#9a7a3e"
  cartographic-gold-deep: "#6f592e"
typography:
  display:
    fontFamily: "Iowan Old Style, Baskerville, Times New Roman, serif"
    fontSize: "clamp(4rem, 9vw, 8rem)"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "-0.035em"
  section-heading:
    fontFamily: "Iowan Old Style, Baskerville, Times New Roman, serif"
    fontSize: "clamp(2rem, 3.4vw, 3.25rem)"
    fontWeight: 400
    lineHeight: 1
  essay-title:
    fontFamily: "Iowan Old Style, Baskerville, Times New Roman, serif"
    fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)"
    fontWeight: 400
    lineHeight: 1.24
  body:
    fontFamily: "Iowan Old Style, Baskerville, Times New Roman, serif"
    fontSize: "clamp(1.125rem, 1.45vw, 1.375rem)"
    fontWeight: 400
    lineHeight: 1.7
spacing:
  gutter: "clamp(1.5rem, 6vw, 6rem)"
  intro-gap: "clamp(1.75rem, 3vw, 2.5rem)"
  section-gap: "clamp(6rem, 11vw, 10rem)"
components:
  essay-link:
    textColor: "{colors.ink}"
    typography: "{typography.essay-title}"
    padding: "0.2em 0"
---

# Design System: William Blair

## Overview

**Creative North Star: “The Constellation Folio”**

The page behaves like the opening leaf of an archival scientific essay: the writing occupies a clear cream field while irregular, diluted blue-grey pigment and sparse cartographic marks collect at the edges. The interface is not a portfolio shell; it is a composed reading surface whose authority comes from typography, restraint, and real negative space.

**Key Characteristics:**

- High-contrast old-style serif typography at regular weight
- Warm paper field with peripheral watercolor atmosphere
- Deep navy ink and rare, muted cartographic gold
- Asymmetric left-aligned composition with no application chrome
- Flat, unboxed content and restrained link states

## Colors

The palette resembles aged drawing paper, navy drafting ink, diluted blue-grey pigment, and a single quiet metallic annotation.

**The Quiet Center Rule.** Watercolor and diagram marks stay away from the main reading measure; the cream field behind copy remains calm.

## Typography

**Display Font:** Iowan Old Style, with Baskerville and Times New Roman fallbacks
**Body Font:** Iowan Old Style, with Baskerville and Times New Roman fallbacks

The single-family system feels authored and literary without turning into a branding exercise. Scale, measure, and line-height create hierarchy; bold weight does not. Section headings are deliberately larger than essay titles so the list reads as content nested beneath “Essays,” not as a row of competing headings.

**The Regular Weight Rule.** Display and essay titles stay at weight 400. Emphasis comes from scale and placement, never heavy bold.

## Layout

One decisively left-anchored reading column sits inside a fluid page gutter; it does not recenter on very wide screens. The headline may extend wider than the biography; the biography remains near 65 characters. The essay section begins after a substantial but responsive vertical pause. Mobile preserves the hierarchy with a minimum 24px gutter, quieter decoration, and naturally wrapping titles.

## Elevation & Depth

There are no shadows or raised surfaces. Depth comes only from translucent atmospheric layers behind a flat paper plane.

## Shapes

Content has no containers, radii, cards, or pills. Geometry appears only as fine celestial arcs, paths, and dots in the decorative field.

## Components

### Essay constellation

The essay titles form one indented cluster beneath the larger “Essays” heading. Each title begins with a small muted-gold star, while sub-pixel curved gold paths wander through the bullet gutter to suggest a hand-drawn constellation without creating a rigid timeline. The marks are decorative and hidden from assistive technology. Essay links remain semantic text links set in the display serif; a fine gold underline grows into view over 200ms on hover and focus, and focus-visible also receives a clear offset outline. The unpublished essay uses the same typography without anchor behavior.

## Do's and Don'ts

### Do:

- **Do** let typography and whitespace establish the entire hierarchy.
- **Do** keep decoration peripheral, translucent, and hidden from assistive technology.
- **Do** preserve semantic headings, links, list structure, and visible focus.

### Don't:

- **Don't** add navigation, cards, badges, thumbnails, buttons, or portfolio chrome.
- **Don't** place watercolor directly behind the biography or essay titles.
- **Don't** use pure black, bright gold, or saturated blue.
