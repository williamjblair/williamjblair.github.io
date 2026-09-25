---
name: William Blair
description: A night-sailing folio for a personal introduction, essays, projects, and the story of how Will got here.
colors:
  night-zenith: "#04050a"
  night: "#0a0b10"
  starlight: "#f3ecdc"
  starlight-soft: "rgb(228 224 214 / 80%)"
  paper: "#f2eee6"
  paper-deep: "#e9e4da"
  essay-canvas: "#eeeae2"
  ink: "#0e1629"
  ink-soft: "#4a5569"
  wash: "#8699ad"
  wash-deep: "#243a55"
  brass: "#a3813f"
  brass-deep: "#6e5829"
  vela-gold: "#b7924b"
  vela-gold-lit: "#d9b86c"
typography:
  display:
    fontFamily: "Iowan Old Style, Source Serif 4, Baskerville, serif"
    fontSize: "clamp(3.25rem, 6vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "-0.035em"
  section-heading:
    fontFamily: "Iowan Old Style, Source Serif 4, Baskerville, serif"
    fontSize: "clamp(1.4rem, 1rem + 0.85vw, 1.85rem)"
    fontWeight: 400
    lineHeight: 1
  list-title:
    fontFamily: "Iowan Old Style, Source Serif 4, Baskerville, serif"
    fontSize: "clamp(1.0625rem, 0.8rem + 0.35vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.3
  body:
    fontFamily: "Iowan Old Style, Source Serif 4, Baskerville, serif"
    fontSize: "clamp(1.0625rem, 0.72rem + 0.55vw, 1.3rem)"
    fontWeight: 400
    lineHeight: 1.55
  catalogue:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.72rem"
    fontWeight: 400
    letterSpacing: "0.04em to 0.18em, uppercase for labels"
motion:
  ease-ink: "cubic-bezier(0.22, 1, 0.36, 1)"
  durations: "240ms quick, 600ms settle, 1400ms bloom"
spacing:
  gutter: "clamp(1.5rem, 6vw, 6rem)"
  reading-inset: "clamp(3rem, 10vw, 10rem)"
components:
  brush-link:
    treatment: "tapered gold brush stroke that draws left to right over 380ms on hover and focus"
  star-list:
    treatment: "gold star per row in a shared gutter, joined by a hairline gold seam"
  sail-home:
    asset: "/artwork/william-blair-sail-120.{avif,webp}"
    treatment: "transparent 60px target with a 46px mark; shared view-transition name"
---

# Design System: William Blair

## Overview

**Creative North Star: "The Night-Sailing Folio"**

The homepage opens at night. The first screen is open sky in near-black indigo, with live stars and the Vela constellation, and the greeting set in starlight. Scrolling is a descent: the painted watercolor sky rises out of the dark, its clouds dissolve into clean paper where the essays and projects are read, and the page ends at sea, where a small boat has drifted into place. The interior pages stay on paper. Authority comes from typography, restraint, and real negative space, not from interface chrome.

Two references hold it together: Kawase Hasui's luminous, graded blues, and Cajal's fine ink line on white. The night is Kawase; the paper, the gold hairlines and the constellation diagrams are Cajal.

**Key characteristics**

- An immersive night first view that gives way to paper, never a dark theme applied to everything
- High-contrast old-style serif at regular weight, with a mono reserved for catalogue data
- Washi-white paper, near-black indigo ink, and one accent: a muted brass gold
- Motion that is slow, optional and physical: pigment spreading, stars adjusting, a boat on water
- Asymmetric, left-anchored composition with no navigation, cards or badges

## Colors

Night runs from `night-zenith` at the top of the page to `night` where the painting begins; faint indigo nebulae breathe over it on a 26-second cycle. Starlight (`#f3ecdc`) carries the greeting; the biography uses a softened starlight so the name leads.

Paper is `#f2eee6`, warm but not yellowed. The ocean painting was painted on yellower paper and is scaled onto the site paper at build time (`repaper()` in `scripts/build-art.py`) so no seam shows. Ink is `#0e1629`. Brass gold is the only accent on paper; Vela and the traces in the sky use a lighter gold that reads against night.

**The one accent rule.** Gold marks connection: constellation lines, the seams between list stars, link strokes, the reading-progress figure. It never fills an area.

## Typography

**Serif:** Iowan Old Style where installed (Apple devices), otherwise the self-hosted Source Serif 4, pinned to weight 400 with its optical-size axis. At opsz 20 its width and x-height are within one percent of Iowan, so line breaks hold across platforms.

**Mono:** Geist Mono, used only for catalogue data: star designations and magnitudes, dates, chapter kickers, chart labels, and small links. Small, tracked, often uppercase. It is the modern counterweight to the serif and should never set prose.

**The regular weight rule.** Nothing is bold. Hierarchy comes from scale, placement and colour.

## Layout

The homepage is two movements, about two screens in all.

**The first screen** is exactly one viewport of night (`--hero-height`, at least 46rem). A mono running head carries the full name; the greeting, biography and links sit on the left, and Vela on the right, sized by the night's height as well as its width. The 3:2 painting is placed so it turns to paper (`--sky-clear`, 72% of its height) just below the fold, and the open night lies over its upper half, so only the cloud crests show at the bottom of the screen. On mobile, Vela becomes a band across the top (words left, stars right) and the painting is cropped wider (215vw).

**The folio index** begins where the painting turns to paper. Writing leads, set large. Below it, a catalogue grid of four groups (Now, Papers, Proofs & tools, Earlier) in four columns on wide screens, two on tablets, one on phones. Papers are drawn from the CV data so the two never disagree. Every entry carries one line of plain fact in the mono: role and years, venue and year, or medium. Nothing in that line is invented.

The whole sky drifts 6vh slower than the page over the first screen, which is what makes scrolling read as a descent. The page then closes at sea.

## Motion

Every effect has a still equivalent under `prefers-reduced-motion`: no arrival, steady stars, no drift, a still boat, instant disclosures, and no page transitions.

- **Arrival** (once per session): the watercolor develops downward out of the dark through a noise-displaced mask, the stars come out one at a time over about three seconds, the greeting rises 6px, and then Vela draws itself star to star.
- **Starfield** (`src/sky/StarField.tsx`): Canvas 2D. Stars live in the open night and wherever the painting is dark navy, sampled from a precomputed density mask. They twinkle slowly (6 to 14 seconds) and run at 30fps unless something is moving. The loop pauses offscreen and in background tabs. There is one shooting star per visit at most.
- **Connect the dots:** with a mouse, passing from star to star leaves hairline gold segments that fade over about three seconds. At most three links per star, and resting breaks the trace.
- **Sailing scroll:** the boat is a separate layer cut from the ocean master. It drifts across the water with page scroll and arrives where it was painted at the bottom. It bobs on a 7-second cycle, and its reflection ripples through an SVG displacement filter.
- **Essay figures** bloom open from the centre as they enter view, tied to scroll position. The Deep Field image drifts in scale, and the closing painting's gold nodes glint.
- **Page transitions:** cross-document View Transitions. The sail mark keeps its place between interior pages.

## Components

### Vela

A gold Vela diagram in the night, with every star a real button (44px target, visible focus). Hover, focus or selection shows the star's name, its catalogue designation and magnitude in mono, and when its light left it: "This light left it around 1480." Distances come from SIMBAD parallaxes and are rounded to what each measurement supports; the sources are cited in `src/content.tsx`. When a star is active, its two segments brighten and the rest of the sky dims slightly.

### Star lists

Each index group is its own small constellation: a gutter of gold stars joined by a hairline seam. Filled glyphs mark entries with nothing to open (essays, papers). Outline stars are disclosure buttons: opening one rotates it 67.5° and draws a short gold branch off the seam into the description, like a kintsugi repair. Several may stay open at once. Group labels are mono capitals over a brass hairline.

### Links

Text links carry no underline at rest. On hover and focus a tapered brass brush stroke draws beneath them, heavier where the brush lands; focus also gets a clear outline.

### Reading constellation

"Constellations of Borrowed Light" is personal, so it is unlisted: reachable by its address for people Will sends it to, but not linked from the site, left out of the sitemap, and marked noindex. On wide screens it has a small constellation in the left margin, one star for each turning point in the text (`data-chapter`). Stars light as their passage reaches the reader, the line to the next star draws as they read toward it, and the end of the page completes the figure. It is decorative and never a control.

### How a correction travels

The piece in the Writing slot: a short page on paper around one interactive figure, drawn like an ink plate. Nine placeholder findings (and the page says they are placeholders). The reader corrects one and compares two views. **As citations**, the corrected paper turns gold and nothing downstream changes; background citations are dotted, because a citation cannot say whether it was foundation or background. **As findings**, the correction travels in kintsugi gold, one hop at a time, to everything that depends on it, and each finding it reaches takes a gold ring. The two paragraphs around it restate Vela in the wording of its README and Will's About page.

### How I got here (/about)

The CV's replacement. It stays at night the whole way down, and it is the only page that tells Will's life, so it uses only his own published words: the four paragraphs of "How I got here." from his previous site, the Vela README, his old home tagline, and the close of "Constellations of Borrowed Light" (sources noted in `src/about/life.ts`). Everything else on it is catalogue fact.

- **The life chart.** A sticky constellation beside the text on wide screens, and a star rail on phones. Eleven stars, from Toronto to the frontier, joined by lineage rather than chronology. One gold arc, the spine, runs from SickKids to Vela, because that is the page's argument: the knowledge existed but could not reach him, and that ceiling became the work.
- **Reading lights the sky.** Each chapter lights its stars as it reaches the reader, lines draw once both of their ends are lit, and chapters not yet reached rest at lower opacity. Stars are real buttons that jump to their chapter.
- **Toward dawn.** A fixed sky sits behind the page. As the reader nears the future, a dawn rises from the horizon and the stars fade, and the open frontier star becomes the morning star.
- **At the foot:** Email, GitHub, LinkedIn and the CV as a PDF. `/cv` redirects here, as a real redirect on Vercel, a static page on GitHub Pages, and an early script elsewhere.

### Links in the night

GitHub, LinkedIn, Email and About sit directly under the biography as mono capitals. A gold hairline draws beneath them on hover and focus.

## Assets

Masters live in `art-source/` and are never served. `python3 scripts/build-art.py` produces AVIF and WebP at each width, the boat and reflection layers, the density masks, the share cards (`public/og.jpg`, `public/og-constellations.jpg`), and the icons: the sail in starlight on a night tile for `favicon.ico`, the Apple touch icon and the manifest icons. `public/favicon.svg` is drawn by hand and switches between ink and starlight with the browser's colour scheme.

`npm run build` ends with `scripts/postbuild.mjs`, which writes each route's HTML with its own title, description, canonical URL and share card, plus the 404 page, the `/cv` redirect and the sitemap. `SITE_URL` sets the absolute origin (default `https://williamjblair.github.io`).

## Do's and Don'ts

### Do

- Let the night hold only the greeting, its links and Vela; give the reading to paper.
- Keep the homepage near two screens. New work joins an index group rather than lengthening the page.
- Keep decoration hidden from assistive technology and optional to notice.
- Keep gold for lines and points.
- Test every new motion with reduced motion on, and make sure the still version is complete.

### Don't

- Add navigation, cards, badges, thumbnails, pills or conventional buttons. Vela's stars and the project stars are the only controls that look like anything other than text.
- Put body copy over watercolor texture or clouds.
- Use bold, pure black on paper, bright gold, or saturated blue.
- Run animation loops offscreen or in background tabs.
