import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import cvData from "../cv-data.json";
import { essays, projects, type Project } from "../content";
import Picture from "../Picture";
import StarField from "../sky/StarField";
import { shouldPlayArrival } from "../motion/hooks";
import VelaConstellation from "./Vela";

/*
THESIS: A personal homepage as the opening folio of a scientific essay, refusing portfolio chrome.
OWN-WORLD: Bone paper, navy ink, diluted blue-grey pigment, sparse cartographic gold, and fine celestial linework.
STORY: Meet Will, understand his research work and preoccupations, then choose an essay.
FIRST VIEWPORT: A vast left-aligned serif greeting and biography on the quiet cream field; the painted sky bleeds in
above it, live stars answer the pointer, and Vela says how long its light has been travelling.
FORM: A single asymmetric editorial scroll that ends at sea, where a small boat has drifted into place.
*/

function Intro() {
  return (
    <header className="intro home-hero">
      <h1 className="arrive" style={{ "--arrive-order": 0 } as CSSProperties}>Hi, I’m Will.</h1>
      <p className="intro__bio arrive" style={{ "--arrive-order": 1 } as CSSProperties}>
        I’m currently building Atlas at Episteme, a Bell Labs–style research
        organization in San Francisco. I also work on Vela, an open protocol
        for turning scientific papers into structured, correctable findings.
        Outside of work, I spend my time thinking and writing about science,
        poetry, and life.
      </p>
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

function EssayList() {
  return (
    <section className="essays arrive" style={{ "--arrive-order": 2 } as CSSProperties} aria-labelledby="essays-heading">
      <h2 id="essays-heading">Essays</h2>
      <ul className="essay-list star-list">
        {essays.map((essay, index) => (
          <li key={essay.title}>
            {index < essays.length - 1 ? <Seam /> : null}
            <span className="star-list__star" aria-hidden="true">
              <span className="essay-list__star-glyph">✦</span>
            </span>
            {essay.href.startsWith("/") ? (
              <a
                className="brush-link"
                href={essay.href}
                style={"transitionName" in essay ? { viewTransitionName: essay.transitionName } : undefined}
              >
                {essay.title}
              </a>
            ) : (
              <a className="brush-link" href={essay.href} target="_blank" rel="noopener noreferrer">{essay.title}</a>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

function ProjectItem({ project, index, isLast }: { project: Project; index: number; isLast: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const detailId = `project-detail-${index}`;

  return (
    <li className={`project-item${isOpen ? " is-open" : ""}`}>
      {isLast ? null : <Seam />}
      <button
        className="project-disclosure star-list__star"
        type="button"
        aria-expanded={isOpen}
        aria-controls={detailId}
        aria-label={`${isOpen ? "Hide" : "Show"} details for ${project.title}`}
        onClick={() => setIsOpen((open) => !open)}
      >
        <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
          <path d="M10 1.75C10.55 6.45 11.12 8.58 18.25 10C11.12 11.42 10.55 13.55 10 18.25C9.45 13.55 8.88 11.42 1.75 10C8.88 8.58 9.45 6.45 10 1.75Z" />
          <circle cx="10" cy="10" r="1.15" />
        </svg>
      </button>
      <svg className="project-item__branch" viewBox="0 0 24 40" aria-hidden="true" focusable="false">
        <path d="M4 2C4.5 14 7 25 18 33" pathLength={1} />
        <circle cx="18.6" cy="33.4" r="1.25" />
      </svg>
      {project.href ? (
        <a className="project-title brush-link" href={project.href} target="_blank" rel="noopener noreferrer">{project.title}</a>
      ) : (
        <span className="project-title">{project.title}</span>
      )}
      <div className="project-item__disclosure" id={detailId} aria-hidden={!isOpen} inert={!isOpen}>
        <div className="project-item__disclosure-inner">
          <p className="project-item__description">{project.description}</p>
          {project.links?.length ? (
            <div className="project-item__links">
              {project.links.map((link) => (
                <a className="brush-link" href={link.href} target="_blank" rel="noopener noreferrer" key={link.href}>{link.label}</a>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </li>
  );
}

function ProjectList() {
  return (
    <section className="projects" aria-labelledby="projects-heading">
      <h2 id="projects-heading">Projects</h2>
      <ul className="project-list star-list">
        {projects.map((project, index) => (
          <ProjectItem project={project} index={index} isLast={index === projects.length - 1} key={project.title} />
        ))}
      </ul>
    </section>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M12 .7a11.5 11.5 0 0 0-3.64 22.4c.58.1.79-.25.79-.56v-2.24c-3.23.7-3.91-1.37-3.91-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.72 1.27 3.38.97.1-.75.41-1.27.74-1.56-2.58-.29-5.29-1.29-5.29-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.48.11-3.05 0 0 .97-.31 3.16 1.18a10.9 10.9 0 0 1 5.76 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.57.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.72 5.39-5.31 5.68.42.36.79 1.07.79 2.16v3.21c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M5.35 7.82H1V22h4.35V7.82ZM3.18 1A2.53 2.53 0 1 0 3.2 6.05 2.53 2.53 0 0 0 3.18 1ZM22.99 13.87c0-4.27-2.28-6.25-5.32-6.25a4.6 4.6 0 0 0-4.17 2.29h-.06V7.82H9.26V22h4.35v-7.02c0-1.85.35-3.65 2.65-3.65 2.27 0 2.3 2.12 2.3 3.77V22H23l-.01-8.13Z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M3 5.5h18v13H3zM3.7 6.2 12 13l8.3-6.8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.55" />
    </svg>
  );
}

function ContactRow() {
  return (
    <nav className="contact-row" aria-label="Contact and CV">
      <a href="https://github.com/williamjblair" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GitHubIcon /></a>
      <a href="https://www.linkedin.com/in/willblair1" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedInIcon /></a>
      <a href={`mailto:${cvData.email}`} target="_blank" rel="noopener noreferrer" aria-label="Email"><EmailIcon /></a>
      <a className="contact-row__cv" href="/cv/">CV</a>
    </nav>
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
      <section className="home-top">
        <HomeSky dimmed={skyDimmed} arriving={arrival} />
        <VelaConstellation onFocusChange={onVelaFocus} />
        <main className="home-content">
          <Intro />
          <EssayList />
          <ProjectList />
          <ContactRow />
        </main>
      </section>
      <HomeOcean />
    </div>
  );
}
