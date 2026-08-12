---
name: William Blair
description: A quiet scientific folio for a personal introduction, essays, projects, and an editorial CV.
colors:
  paper: "#f6eedf"
  homepage-paper: "#fbeed7"
  paper-deep: "#ece7da"
  ink: "#111b30"
  ink-soft: "#3f5068"
  wash: "#8699ad"
  wash-deep: "#243a55"
  cartographic-gold: "#9a7a3e"
  cartographic-gold-deep: "#6f592e"
  starlight: "#f8eed2"
  starlight-gold: "#b7924b"
  starlight-soft: "#f4e8c6"
  starlight-muted: "#d9c996"
  cartographic-gold-shadow: "#725824"
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
  code:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
    fontSize: "0.88em"
    fontWeight: 400
    lineHeight: 1.48
spacing:
  gutter: "clamp(1.5rem, 6vw, 6rem)"
  intro-gap: "clamp(1.75rem, 3vw, 2.5rem)"
  section-gap: "clamp(6rem, 11vw, 10rem)"
components:
  essay-link:
    textColor: "{colors.ink}"
    typography: "{typography.essay-title}"
    padding: "0.2em 0"
  project-disclosure:
    textColor: "{colors.cartographic-gold}"
    typography: "{typography.essay-title}"
    motion: "67.5deg rotation with a 240ms ease-out"
  sail-home:
    asset: "/artwork/william-blair-sail.png"
    treatment: "transparent 48px target with a 35px publisher's mark"
  document-action:
    textColor: "{colors.ink}"
    accentColor: "{colors.cartographic-gold}"
    treatment: "inline text link with fine underline interaction"
---

# Design System: William Blair

## Overview

**Creative North Star: “The Night-Sailing Folio”**

The page behaves like the opening leaf of an archival scientific essay set beneath a painted night sky. Deep navy watercolor gathers along the top edge, dissolves irregularly into a clear cream reading field, and returns as a pale ocean wash at the bottom. A small sailboat sits right-of-center on the waterline. The interface is not a portfolio shell; it is a composed reading surface whose authority comes from typography, restraint, and real negative space.

**Key Characteristics:**

- High-contrast old-style serif typography at regular weight
- Deep midnight watercolor sky fading through blue-grey blooms into warm paper
- A pale ocean wash at the bottom with a small right-of-center sailboat
- Sparse live starlight concentrated above the reading field and diminishing before the essays
- Deep navy ink and rare, muted cartographic gold
- Asymmetric left-aligned composition with no application chrome
- Flat, unboxed content and restrained link states
- A large, calm, interactive Vela constellation held outside the reading measure

## Colors

The palette resembles aged drawing paper, navy drafting ink, diluted blue-grey pigment, and a single quiet metallic annotation.

**The Quiet Center Rule.** The watercolor opens into a broad, low-contrast cream field behind the copy. The sky is darkest above, the stars diminish before the essays, and the ocean remains at the bottom rather than competing with the reading measure.

## Typography

**Display Font:** Iowan Old Style, with Baskerville and Times New Roman fallbacks
**Body Font:** Iowan Old Style, with Baskerville and Times New Roman fallbacks

The single-family system feels authored and literary without turning into a branding exercise. The role scale is deliberately compact so the complete introduction and essay index can sit within an ordinary desktop viewport with breathing room below. Scale, measure, and line-height create hierarchy; bold weight does not. “Hi, I’m Will.” remains the one large display exception, while section headings stay deliberately larger than essay titles so the list reads as content nested beneath “Essays,” not as a row of competing headings.

**The Regular Weight Rule.** Display and essay titles stay at weight 400. Emphasis comes from scale and placement, never heavy bold.

## Layout

One decisively left-anchored reading column sits inside a fluid page gutter; it does not recenter on very wide screens. The headline may extend wider than the biography; the biography remains near 65 characters. The essay section begins after a substantial but responsive vertical pause. Mobile preserves the hierarchy with a minimum 24px gutter, quieter decoration, and naturally wrapping titles.

The homepage is structured as a layered top composition followed by an independent ocean close. A full-bleed sky PNG is absolutely positioned behind the introduction and Vela overlay, while the introduction, Essays, Projects, disclosures, and signature row remain together in normal document flow on the paper surface. The 1916×821 sky and ocean paintings render at their native width relationship; expanding content lengthens the paper field and pushes the independently positioned ocean close downward without stretching either painting.

The reading canvas is a physical surface rather than a flat fill: a seamless, low-contrast cotton-paper grain overlays the cream substrate across the homepage body, interior pages, and essay reading field. The homepage uses `homepage-sky-final.png` and `homepage-ocean-final.png` as separate purpose-built paintings; their shared edge cream establishes the homepage paper token, and their native aspect ratios remain independent as the textured middle grows.

## Elevation & Depth

There are no raised surfaces. Depth comes from the watercolor’s passage from night sky to paper to ocean, plus the quiet difference between static painted stars and a few live points of light.

## Shapes

Content has no containers, radii, cards, or pills. Geometry appears only as fine celestial paths and stellar nodes. Watercolor blooms use irregular overlapping silhouettes; the boat remains painterly and small enough to read as atmosphere rather than illustration content.

## Components

### Essay constellation

The essay titles form one indented cluster beneath the larger “Essays” heading. Each title begins with a small muted-gold star centered against its first line, while continuous sub-pixel curved gold segments run directly from star to star through the bullet gutter. The marks suggest a hand-drawn constellation without creating a rigid timeline; they are decorative and hidden from assistive technology. Essay links remain semantic text links set in the display serif; a fine gold underline grows into view over 200ms on hover and focus, and focus-visible also receives a clear offset outline. “Constellations of Borrowed Light” opens into a full-width watercolor folio before settling into a centered long-form reading measure on the same paper surface.

### Interactive Vela constellation

A large gold Vela diagram replaces the former decorative line chart at the right edge of wide screens and moves below the reading content on narrow screens. Every stellar node is a real button with a 44px target, visible keyboard focus, and no navigation behavior. Nodes carry slow, staggered, low-opacity light pulses; selecting one updates a compact catalogue, common-name, and magnitude readout beneath the chart while subtly brightening its adjoining paths. The identity copy sits in a softly feathered ivory luminance bloom over the dark sky, while the fixed-size readout sits in an equally diffuse navy pigment wash over the pale watercolor; neither field may acquire a visible edge or read as a panel. Reduced-motion users receive steady light instead of looping flicker.

### Project index

Projects follow Essays as one flat, unnumbered list with the same heading and title scale. Linked titles inherit the essay link's fine gold underline and focus treatment; unlinked titles remain plain text. A small custom gold star beside every title is a semantic disclosure button. Opening a project rotates its star and reveals a restrained description directly below the row, without introducing cards, borders, or background panels. Several projects may remain open at once, and reduced-motion preferences collapse the transition to an effectively instant state change.

### Editorial CV

The CV is a long-form reading document in the same cream, navy, and muted-gold palette. Its compact header keeps PDF and DOCX downloads nearby as plain inline actions. Each section uses a fine gold rule, a quiet left label, and an unboxed entry column; dates stay small and gold while supporting copy uses the soft ink tone. The original William Blair sail mark serves as the persistent home link on this and every interior surface, sitting inside a generous transparent target rather than an app-icon container.

### Quiet signature row

GitHub, LinkedIn, Email, and the text link “CV” form one left-aligned row after the homepage projects and immediately before the ocean artwork. All four share the same muted tone and focus treatment without a heading, container, or button surface.

## Do's and Don'ts

### Do:

- **Do** let typography and whitespace establish the entire hierarchy.
- **Do** keep non-interactive decoration peripheral, translucent, and hidden from assistive technology.
- **Do** preserve semantic headings, links, list structure, and visible focus.
- **Do** keep constellation-node interaction optional, quiet, and fully keyboard accessible.
- **Do** concentrate flickering stars in the navy sky and let them thin out before the essay region.

### Don't:

- **Don't** add navigation, cards, badges, thumbnails, conventional buttons, or portfolio chrome; the stellar nodes are the sole exception because their control form is visually intrinsic to the constellation.
- **Don't** place watercolor directly behind the biography or essay titles.
- **Don't** distribute washes evenly; keep them irregular and peripheral, with occasional overlapping blooms and a loose field of pinprick splatter.
- **Don't** place live stars over the ocean or crowd the cream essay field.
- **Don't** use pure black, bright gold, or saturated blue.
