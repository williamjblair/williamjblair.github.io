import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import cvData from "../cv-data.json";
import { essays, groups, type Entry, type EntryGroup } from "../content";
import Picture from "../Picture";
import StarField from "../sky/StarField";
import { shouldPlayArrival } from "../motion/hooks";
import VelaConstellation from "./Vela";

/*
THESIS: A personal homepage as the opening folio of a scientific essay, refusing portfolio chrome.
OWN-WORLD: Indigo night, washi paper, navy ink, one brass accent, and fine celestial linework.
STORY: Meet Will under the night sky, then read the index of his writing, work, papers and tools.
FIRST VIEWPORT: Exactly one screen of night: the greeting and links on the left, Vela on the right, and the
watercolour clouds cresting at the fold, where the sky turns to paper.
FORM: A folio index in a catalogue grid, then the sea, where a small boat has drifted into place.
*/

const order = (n: number) => ({ "--arrive-order": n }) as CSSProperties;

function Hero({ onVelaFocus }: { onVelaFocus: (focused: boolean) => void }) {
  return (
    <header className="home-hero">
      <p className="home-hero__masthead arrive" style={order(0)}>William Blair</p>
      <div className="home-hero__main">
        <div className="intro">
          <h1 className="arrive" style={order(0)}>
            Hi, I’m <em>Will.</em>
          </h1>
          <p className="intro__bio arrive" style={order(1)}>
            I grew up in Toronto and spent part of my childhood as a patient, where
            I learned that what science knows does not always reach the people who
            need it. I work on Vela, an open protocol that turns scientific papers
            into structured, correctable findings, so that knowledge can compound.
            I also write about science, poetry, and life.
          </p>
          <nav className="intro__links arrive" style={order(2)} aria-label="Elsewhere">
            <a href="https://github.com/williamjblair" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/willblair1" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={`mailto:${cvData.email}`}>Email</a>
            <a href="/about/">About</a>
          </nav>
        </div>
        <VelaConstellation onFocusChange={onVelaFocus} />
      </div>
    </header>
  );
}

function Seam() {
  return (
    <svg className="seam" viewBox="0 0 20 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path d="M10 0C1 28 19 68 10 100" />
    </svg>
  );
}

function GlyphStar() {
  return (
    <span className="star-list__star" aria-hidden="true">
      <span className="star-list__glyph">✦</span>
    </span>
  );
}

function Writing() {
  return (
    <section className="index-writing" aria-labelledby="writing-heading">
      <h2 className="index-label" id="writing-heading">Writing</h2>
      <ul className="star-list writing-list">
        {essays.map((essay, index) => {
          const local = essay.href.startsWith("/");
          return (
            <li key={essay.title}>
              {index < essays.length - 1 ? <Seam /> : null}
              <GlyphStar />
              <a
                className="brush-link writing-list__title"
                href={essay.href}
                {...(local ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                style={"transitionName" in essay ? { viewTransitionName: essay.transitionName } : undefined}
              >
                {essay.title}
              </a>
              <span className="entry-meta">
                {essay.meta}
                {local ? null : <span aria-hidden="true"> ↗</span>}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function EntryItem({ entry, id, isLast }: { entry: Entry; id: string; isLast: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const detailId = `entry-detail-${id}`;
  const hasDetail = Boolean(entry.description);

  return (
    <li className={`entry${isOpen ? " is-open" : ""}`}>
      {isLast ? null : <Seam />}
      {hasDetail ? (
        <>
          <button
            className="project-disclosure star-list__star"
            type="button"
            aria-expanded={isOpen}
            aria-controls={detailId}
            aria-label={`${isOpen ? "Hide" : "Show"} details for ${entry.title}`}
            onClick={() => setIsOpen((open) => !open)}
          >
            <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
              <path d="M10 1.75C10.55 6.45 11.12 8.58 18.25 10C11.12 11.42 10.55 13.55 10 18.25C9.45 13.55 8.88 11.42 1.75 10C8.88 8.58 9.45 6.45 10 1.75Z" />
              <circle cx="10" cy="10" r="1.15" />
            </svg>
          </button>
          <svg className="entry__branch" viewBox="0 0 24 40" aria-hidden="true" focusable="false">
            <path d="M4 2C4.5 14 7 25 18 33" pathLength={1} />
            <circle cx="18.6" cy="33.4" r="1.25" />
          </svg>
        </>
      ) : (
        <GlyphStar />
      )}
      {entry.href ? (
        <a className="entry__title brush-link" href={entry.href} target="_blank" rel="noopener noreferrer">{entry.title}</a>
      ) : (
        <span className="entry__title">{entry.title}</span>
      )}
      <span className="entry-meta">{entry.meta}</span>
      {hasDetail ? (
        <div className="entry__disclosure" id={detailId} aria-hidden={!isOpen} inert={!isOpen}>
          <div className="entry__disclosure-inner">
            <p className="entry__description">{entry.description}</p>
            {entry.links?.length ? (
              <div className="entry__links">
                {entry.links.map((link) => (
                  <a className="brush-link" href={link.href} target="_blank" rel="noopener noreferrer" key={link.href}>{link.label}</a>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </li>
  );
}

function Group({ group }: { group: EntryGroup }) {
  return (
    <section className={`index-group index-group--${group.key}`} aria-labelledby={`group-${group.key}`}>
      <h2 className="index-label" id={`group-${group.key}`}>{group.label}</h2>
      <ul className="star-list">
        {group.entries.map((entry, index) => (
          <EntryItem entry={entry} id={`${group.key}-${index}`} isLast={index === group.entries.length - 1} key={entry.title} />
        ))}
      </ul>
    </section>
  );
}

function FolioIndex() {
  return (
    <main className="folio-index">
      <Writing />
      <div className="index-grid">
        {groups.map((group) => (
          <Group group={group} key={group.key} />
        ))}
      </div>
    </main>
  );
}

function HomeSky({ dimmed, arriving }: { dimmed: boolean; arriving: boolean }) {
  const nightRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  return (
    <div className={`home-sky${dimmed ? " is-dimmed" : ""}`} aria-hidden="true">
      <div className="home-sky__night" ref={nightRef} />
      <div className="home-sky__stage" ref={stageRef}>
        <Picture
          className="home-sky__art"
          stem="/artwork/homepage-sky"
          widths={[768, 1536]}
          sizes="(max-width: 48rem) 215vw, max(100vw, 96rem)"
          width="1536"
          height="1024"
          fetchPriority="high"
        />
      </div>
      <StarField
        maskSrc="/artwork/homepage-sky-density.png"
        nightRef={nightRef}
        stageRef={stageRef}
        band={0.62}
        count={{ wide: 300, compact: 130 }}
        nightShare={0.5}
        trace
        meteor
        emerge={arriving}
        dimmed={dimmed}
      />
    </div>
  );
}

function HomeOcean() {
  const boatRef = useRef<HTMLDivElement>(null);

  // Browsers without scroll-driven animations get the same drift from a scroll listener.
  useEffect(() => {
    const boat = boatRef.current;
    if (!boat || CSS.supports("animation-timeline: scroll()")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 1;
      boat.style.setProperty("--boat-progress", progress.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <footer className="home-ocean" aria-hidden="true">
      <div className="home-ocean__stage">
        <Picture
          className="home-ocean__art"
          stem="/artwork/homepage-ocean"
          widths={[1086, 2172]}
          sizes="max(100vw, 96rem)"
          width="2172"
          height="424"
          loading="lazy"
          decoding="async"
        />
        <div className="boat" ref={boatRef}>
          <div className="boat__bob">
            <Picture className="boat__hull" stem="/artwork/homepage-boat" widths={[112]} sizes="7rem" width="112" height="168" loading="lazy" />
          </div>
          <div className="boat__reflection">
            <Picture stem="/artwork/homepage-boat-reflection" widths={[112]} sizes="7rem" width="112" height="94" loading="lazy" />
          </div>
        </div>
      </div>
      <svg className="boat__filters" width="0" height="0" focusable="false">
        <filter id="reflection-ripple" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.18" numOctaves="2" seed="4">
            <animate attributeName="baseFrequency" dur="9s" values="0.012 0.18;0.016 0.22;0.012 0.18" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" scale="4" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
    </footer>
  );
}

// Decided once per page load, before the first paint, so StrictMode's double render agrees with itself.
let arrival: boolean | undefined;

export default function Home() {
  arrival ??= shouldPlayArrival();
  const [skyDimmed, setSkyDimmed] = useState(false);
  const onVelaFocus = useCallback((focused: boolean) => setSkyDimmed(focused), []);

  return (
    <div className={`page-shell${arrival ? " is-arriving" : ""}`}>
      <div className="home-top">
        <HomeSky dimmed={skyDimmed} arriving={arrival} />
        <div className="home-content">
          <Hero onVelaFocus={onVelaFocus} />
          <FolioIndex />
        </div>
      </div>
      <HomeOcean />
    </div>
  );
}
