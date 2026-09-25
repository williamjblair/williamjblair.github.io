import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import cvData from "../cv-data.json";
import { groups } from "../content";
import { useReducedMotion } from "../motion/hooks";
import { SailHomeLink } from "../shell/Shell";
import StarField from "../sky/StarField";
import LifeChart from "./LifeChart";
import { chapters, frontier, type Chapter } from "./life";
import "./about.css";

/*
THESIS: How Will got here, and where it goes, told as a lineage: the same shape Vela gives a finding.
OWN-WORLD: The homepage's night, a sticky chart of a life in gold, and a sky that turns toward dawn as
the reader reaches the future.
STORY: A patient in Toronto; the labs at Hopkins; four companies and one ceiling; Vela; a proof; the frontier.
FORM: Two columns on wide screens, the chart held beside the words; one column with a rail on phones.
*/

const papers = groups.find((group) => group.key === "papers")?.entries ?? [];

function ChapterBody({ chapter }: { chapter: Chapter }) {
  const external = chapter.link && !chapter.link.href.startsWith("/");
  return (
    <>
      <p className="chapter__kicker">{chapter.kicker}</p>
      {chapter.text ? <p className="chapter__text">{chapter.text}</p> : null}
      {chapter.key === "hopkins" && papers.length ? (
        <ul className="chapter__notes">
          {papers.map((paper) => (
            <li key={paper.title}>
              <span className="chapter__note-title">{paper.title}</span>
              <span className="chapter__note-meta">{paper.meta}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {chapter.notes?.length ? (
        <ul className={`chapter__notes${chapter.key === "proofs" ? " chapter__notes--proof" : ""}`}>
          {chapter.notes.map((note) => (
            <li key={note.title}>
              {note.href ? (
                <a className="chapter__note-title night-link" href={note.href} target="_blank" rel="noopener noreferrer">
                  {note.title}
                </a>
              ) : (
                <span className="chapter__note-title">{note.title}</span>
              )}
              <span className="chapter__note-meta">{note.meta}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {chapter.link ? (
        <a
          className="chapter__link night-link"
          href={chapter.link.href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {chapter.link.label}
          <span aria-hidden="true">{external ? " ↗" : " →"}</span>
        </a>
      ) : null}
    </>
  );
}

function Frontier() {
  return (
    <div className="frontier">
      <p className="frontier__statement">{frontier.statement}</p>
      <ul className="frontier__lines">
        {frontier.lines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
      <p className="frontier__closing">{frontier.closing}</p>
    </div>
  );
}

export default function AboutPage() {
  const nightRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);
  const [active, setActive] = useState(-1);
  const [hovered, setHovered] = useState<number | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.58;
      let index = -1;
      sectionRefs.current.forEach((node, i) => {
        if (node && node.getBoundingClientRect().top < line) index = i;
      });
      const atEnd = window.scrollY >= document.documentElement.scrollHeight - window.innerHeight - 4;
      setActive(atEnd ? chapters.length - 1 : index);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const lit = useMemo(() => new Set(chapters.slice(0, active + 1).flatMap((chapter) => chapter.stars)), [active]);
  const current = useMemo(() => new Set(active >= 0 ? chapters[active].stars : []), [active]);
  const highlighted = useMemo(() => new Set(hovered !== null ? chapters[hovered].stars : []), [hovered]);

  const onSelect = useCallback(
    (starKey: string) => {
      const index = chapters.findIndex((chapter) => chapter.stars.includes(starKey));
      sectionRefs.current[index]?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    },
    [reduced],
  );

  return (
    <div className="about">
      <div className="about-sky" aria-hidden="true">
        <div className="about-sky__night" ref={nightRef} />
        <StarField
          className="about-sky__stars"
          maskSrc="/artwork/homepage-sky-density.png"
          nightRef={nightRef}
          stageRef={nightRef}
          band={0}
          count={{ wide: 190, compact: 90 }}
          nightShare={1}
          trace
          meteor
          emerge
        />
        <div className="about-sky__dawn" />
      </div>

      <SailHomeLink />

      <header className="about-hero">
        <p className="about-hero__masthead">William Blair</p>
        <h1>How I got here.</h1>
      </header>

      <div className="about-body">
        <aside className="about-chart">
          <LifeChart lit={lit} current={current} highlighted={highlighted} onSelect={onSelect} />
        </aside>

        <main className="about-chapters">
          {chapters.map((chapter, index) => (
            <section
              className={`chapter chapter--${chapter.key}${index <= active ? " is-reached" : ""}`}
              key={chapter.key}
              ref={(node) => {
                sectionRefs.current[index] = node;
              }}
              onPointerEnter={() => setHovered(index)}
              onPointerLeave={() => setHovered((value) => (value === index ? null : value))}
            >
              <ChapterBody chapter={chapter} />
              {chapter.key === "frontier" ? <Frontier /> : null}
            </section>
          ))}

          <footer className="about-footer">
            <a className="night-link" href={`mailto:${cvData.email}`}>Email</a>
            <a className="night-link" href="https://github.com/williamjblair" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className="night-link" href="https://www.linkedin.com/in/willblair1" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a className="night-link" href="/downloads/William-Blair-CV.pdf" download>CV (PDF)</a>
          </footer>
        </main>
      </div>
    </div>
  );
}
