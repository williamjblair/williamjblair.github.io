import { useState, type CSSProperties, type ReactNode } from "react";
import ConstellationsEssay from "./ConstellationsEssay";
import cvData from "./cv-data.json";

type CvEntry = {
  title: string;
  date?: string;
  subtitle?: string;
  description?: string;
  href?: string;
};

type CvSection = {
  title: string;
  entries: CvEntry[];
};

/*
THESIS: A personal homepage as the opening folio of a scientific essay, refusing portfolio chrome.
OWN-WORLD: Bone paper, navy ink, diluted blue-grey pigment, sparse cartographic gold, and fine celestial linework.
STORY: Meet Will, understand his research work and preoccupations, then choose an essay.
FIRST VIEWPORT: A vast left-aligned serif greeting and narrow biography occupy the quiet cream field; an interactive Vela constellation rests beyond the reading measure while blue-grey pigment drifts around the page edges.
FORM: A single asymmetric editorial scroll, pinned by the supplied brief; no concept seed required.
*/

const essays = [
  {
    title: "Science Has No Dependency Graph",
    href: "https://williamjblair.github.io/articles/science-has-no-dependency-graph/",
  },
  {
    title: "Endless Frontiers",
    href: "https://www.vela.space/constellations",
  },
  {
    title: "Constellations of Borrowed Light",
    href: "/constellations-of-borrowed-light/",
  },
] as const;

type Project = {
  title: string;
  href?: string;
  description: ReactNode;
  links?: ReadonlyArray<{ label: string; href: string }>;
};

const projects: ReadonlyArray<Project> = [
  {
    title: "Vela",
    description:
      "Vela is a protocol that turns scientific papers into structured, linked, correctable findings. A finding carries its evidence, confidence, conditions, and lineage. The state of a frontier is the deterministic replay of its event log.",
    links: [
      { label: "GitHub", href: "https://github.com/vela-science/vela" },
      { label: "Publication web", href: "https://www.vela.space/" },
    ],
  },
  {
    title: "Atlas",
    href: "https://episteme.com/",
    description:
      "The researcher intelligence platform at Episteme — how the lab maps talent, evidence, and direction across neuroscience, advanced materials, energy, and compute. Data model, ingest, LLM-driven extraction over open scientific corpora, and the product surface scientists use daily. Internal to the lab.",
  },
  {
    title: "Founding Engineer, Aaru",
    href: "https://aaru.com/simulation",
    description:
      "Large-scale AI-agent simulation for consulting, politics, and government. Built the core platform with the CTO as founding engineer: the simulation runtime, synthetic audience generation, benchmarking and observability, and the customer-facing app. The synthetic-audience pipeline shipped into every customer engagement.",
  },
  {
    title: "Co-founder, Biogenesis",
    href: "https://www.bayespredictive.com/",
    description:
      "End-to-end clinical trials platform, co-founded as COO out of Kleiner Perkins, where I was Engineer in Residence. Built the platform from scratch, hired a team of seven, raised $2.5M led by Jack Altman, and stood up partnerships across 250+ clinics.",
  },
  {
    title: "Founder, ThermoBeat",
    href: "https://github.com/williamjblair/ThermoBeat",
    description:
      "Thermoelectrics for implantable medical devices. A thermoelectric generator and boost-converter system that runs under a 2 °C gradient and produces 3.3 V, enough to power a pacemaker from body heat. Raised $300K+ non-dilutive across NSF I-Corps, NIBIB DEBUT, JHU Spark, and the JHU FUEL Grand Prize.",
  },
  {
    title: "Prospect",
    href: "https://github.com/williamjblair/prospect",
    description:
      "Checks which of an AI’s biological claims the underlying data actually supports, before you pass them on. Built with Claude for Life Sciences.",
  },
  {
    title: "lean-proofs",
    href: "https://github.com/williamjblair/lean-proofs",
    description: (
      <>
        A self-checking index of formal Lean 4 proofs, CI-gated on <code>#print</code>{" "}
        axioms so nothing sneaks in on trust. Targets drawn from the Formal Conjectures project.
      </>
    ),
  },
  {
    title: "verified-combinatorics",
    href: "https://github.com/williamjblair/verified-combinatorics",
    description:
      "Independently verifiable extremal combinatorial sets — binary Sidon and B₃ — shipped with a standalone checker. Backs contributions to the OEIS.",
  },
  {
    title: "Omneer",
    href: "https://github.com/williamjblair/Omneer",
    description: "Brain tumor detection and analysis from MRI.",
  },
  {
    title: "Charm City Science League",
    href: "https://github.com/williamjblair/scienceolympiad",
    description:
      "Science Olympiad mentoring for Baltimore students, run as president: 100+ mentors across 20 schools, a $30K annual budget, and a 14-person executive board.",
  },
  {
    title: "Seedling Hydroponics",
    href: "https://www.seedlinginc.org/",
    description: "Hydroponic growing systems for Baltimore neighbourhoods with no nearby grocer.",
  },
];

const velaStars = [
  { symbol: "γ", name: "Regor", catalogue: "γ Velorum", magnitude: 1.75, x: 12, y: 42, delay: "-2.7s", duration: "11.1s" },
  { symbol: "δ", name: "Alsephina", catalogue: "δ Velorum", magnitude: 1.96, x: 29, y: 76, delay: "-6.9s", duration: "12.3s" },
  { symbol: "κ", name: "Markeb", catalogue: "κ Velorum", magnitude: 2.47, x: 47, y: 78, delay: "-4.4s", duration: "10.2s" },
  { symbol: "φ", name: "Phi Velorum", catalogue: "φ Velorum", magnitude: 3.54, x: 64, y: 75, delay: "-7.8s", duration: "11.7s" },
  { symbol: "μ", name: "Mu Velorum", catalogue: "μ Velorum", magnitude: 2.69, x: 88, y: 52, delay: "-1.4s", duration: "12.9s" },
  { symbol: "q", name: "q Velorum", catalogue: "q Velorum", magnitude: 3.85, x: 73, y: 19, delay: "-5.6s", duration: "10.7s" },
  { symbol: "ψ", name: "Psi Velorum", catalogue: "ψ Velorum", magnitude: 3.6, x: 51, y: 12, delay: "-9.2s", duration: "13.4s" },
  { symbol: "λ", name: "Suhail", catalogue: "λ Velorum", magnitude: 2.21, x: 40, y: 25, delay: "-3.5s", duration: "11.4s" },
] as const;

const velaConnections = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [6, 7],
  [7, 0],
] as const;

function VelaConstellation() {
  const [selectedStar, setSelectedStar] = useState<number | null>(null);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [focusedStar, setFocusedStar] = useState<number | null>(null);
  const displayedStarIndex = hoveredStar ?? focusedStar ?? selectedStar ?? 0;
  const displayedStar = velaStars[displayedStarIndex];

  return (
    <section className="vela" aria-label="Interactive Vela constellation">
      <svg
        className="vela__chart"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        {velaConnections.map(([from, to]) => (
          <line
            className={selectedStar !== null && (from === selectedStar || to === selectedStar) ? "is-active" : undefined}
            key={`${from}-${to}`}
            x1={velaStars[from].x}
            y1={velaStars[from].y}
            x2={velaStars[to].x}
            y2={velaStars[to].y}
          />
        ))}
      </svg>
      {velaStars.map((star, index) => {
        const isSelected = selectedStar === index;
        const coreSize = 0.22 + (4.1 - star.magnitude) * 0.055;

        return (
          <button
            className={`vela__star${isSelected ? " is-selected" : ""}`}
            type="button"
            key={star.name}
            aria-label={`${star.name}, magnitude ${star.magnitude}`}
            aria-pressed={isSelected}
            onClick={() => setSelectedStar(index)}
            onPointerEnter={() => setHoveredStar(index)}
            onPointerLeave={() => setHoveredStar((current) => current === index ? null : current)}
            onFocus={() => setFocusedStar(index)}
            onBlur={() => setFocusedStar((current) => current === index ? null : current)}
            style={
              {
                left: `${star.x}%`,
                top: `${star.y}%`,
                "--star-delay": star.delay,
                "--star-duration": star.duration,
                "--star-core-size": `${coreSize.toFixed(3)}rem`,
              } as CSSProperties
            }
          >
            <span className="vela__star-core" aria-hidden="true" />
          </button>
        );
      })}
      <div className="vela__identity">
        <p className="vela__title">Vela · The Sails</p>
        <p className="vela__instruction">Hover, focus, or select a star.</p>
      </div>
      <div className="vela__legend">
        <div className="vela__readout" aria-live="polite" key={displayedStar.name}>
          <p className="vela__star-name">{displayedStar.name}</p>
          <p className="vela__star-detail">Magnitude {displayedStar.magnitude.toFixed(2)}</p>
        </div>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <header className="intro">
      <h1>Hi, I’m Will.</h1>
      <p className="intro__bio">
        I’m currently building Atlas at Episteme, a Bell Labs–style research
        organization in San Francisco. I also work on Vela, an open protocol
        for turning scientific papers into structured, correctable findings.
        Outside of work, I spend my time thinking and writing about science,
        poetry, and life.
      </p>
    </header>
  );
}

function EssayList() {
  return (
    <section className="essays" aria-labelledby="essays-heading">
      <h2 id="essays-heading">Essays</h2>
      <div className="essay-list__cluster">
        <ul className="essay-list">
          {essays.map((essay, index) => (
            <li key={essay.title}>
              {index < essays.length - 1 ? (
                <svg
                  className="essay-list__thread"
                  viewBox="0 0 20 100"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M10 0C1 28 19 68 10 100" />
                </svg>
              ) : null}
              <span className="essay-list__star" aria-hidden="true">
                <span className="essay-list__star-glyph">✦</span>
              </span>
              <a href={essay.href} target="_blank" rel="noopener noreferrer">{essay.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function StarDisclosure({ title, isOpen, controls, onToggle }: {
  title: string;
  isOpen: boolean;
  controls: string;
  onToggle: () => void;
}) {
  return (
    <button
      className={`project-disclosure${isOpen ? " is-open" : ""}`}
      type="button"
      aria-expanded={isOpen}
      aria-controls={controls}
      aria-label={`${isOpen ? "Hide" : "Show"} details for ${title}`}
      onClick={onToggle}
    >
      <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
        <path d="M10 1.75C10.55 6.45 11.12 8.58 18.25 10C11.12 11.42 10.55 13.55 10 18.25C9.45 13.55 8.88 11.42 1.75 10C8.88 8.58 9.45 6.45 10 1.75Z" />
        <circle cx="10" cy="10" r="1.15" />
      </svg>
    </button>
  );
}

function ProjectItem({ project, index }: { project: Project; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const detailId = `project-detail-${index}`;

  return (
    <li className={`project-item${isOpen ? " is-open" : ""}`}>
      <div className="project-item__row">
        {project.href ? (
          <a className="project-title" href={project.href} target="_blank" rel="noopener noreferrer">{project.title}</a>
        ) : (
          <span className="project-title project-title--plain">{project.title}</span>
        )}
        <StarDisclosure
          title={project.title}
          isOpen={isOpen}
          controls={detailId}
          onToggle={() => setIsOpen((open) => !open)}
        />
      </div>
      <div
        className="project-item__disclosure"
        id={detailId}
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <div className="project-item__disclosure-inner">
          <p className="project-item__description">{project.description}</p>
          {project.links?.length ? (
            <div className="project-item__links">
              {project.links.map((link) => (
                <a href={link.href} target="_blank" rel="noopener noreferrer" key={link.href}>{link.label}</a>
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
      <ul className="project-list">
        {projects.map((project, index) => (
          <ProjectItem project={project} index={index} key={project.title} />
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
      <a className="contact-row__cv" href="/cv/" target="_blank" rel="noopener noreferrer">CV</a>
    </nav>
  );
}

function SailHomeLink() {
  return (
    <a className="sail-home" href="/" aria-label="Back to home">
      <img src="/artwork/william-blair-sail.png" alt="" />
    </a>
  );
}

function InteriorShell({ children }: { children: ReactNode }) {
  return (
    <div className="interior-shell">
      <SailHomeLink />
      {children}
    </div>
  );
}

function CvPage() {
  return (
    <InteriorShell>
      <main className="cv-page">
        <header className="cv-header">
          <h1 className="cv-header__title">CV</h1>
          <p className="cv-header__subtitle">{cvData.subtitle}</p>
          <nav className="cv-downloads" aria-label="Download CV">
            <span>Download CV</span>
            <a href="/downloads/William-Blair-CV.pdf" download>PDF <span aria-hidden="true">↓</span></a>
            <a href="/downloads/William-Blair-CV.docx" download>DOCX <span aria-hidden="true">↓</span></a>
          </nav>
        </header>

        <div className="cv-sections">
          {(cvData.sections as CvSection[]).map((section) => {
            const sectionId = `cv-${section.title.toLowerCase().replace(/[^a-z]+/g, "-")}`;
            return (
              <section className="cv-section" aria-labelledby={sectionId} key={section.title}>
                <h2 id={sectionId}>{section.title}</h2>
                <ul className="cv-entry-list">
                  {section.entries.map((entry) => (
                    <li className="cv-entry" key={`${entry.title}-${entry.date ?? ""}`}>
                      <div className="cv-entry__heading">
                        <h3>
                          {entry.href ? <a href={entry.href}>{entry.title}</a> : entry.title}
                        </h3>
                        {entry.date ? <span>{entry.date}</span> : null}
                      </div>
                      {entry.subtitle ? <p className="cv-entry__subtitle">{entry.subtitle}</p> : null}
                      {entry.description ? <p className="cv-entry__description">{entry.description}</p> : null}
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </main>
    </InteriorShell>
  );
}

function HomeSky() {
  return (
    <div className="home-sky" aria-hidden="true">
      <img
        className="home-sky__art"
        src="/artwork/homepage-sky-watercolor.png"
        alt=""
        width="1536"
        height="1024"
        fetchPriority="high"
      />
    </div>
  );
}

function HomeOcean() {
  return (
    <footer className="home-ocean" aria-hidden="true">
      <img
        className="home-ocean__art"
        src="/artwork/homepage-ocean-final.jpeg"
        alt=""
        width="2172"
        height="424"
        loading="lazy"
        decoding="async"
      />
    </footer>
  );
}

function Home() {
  return (
    <div className="page-shell">
      <section className="home-top">
        <HomeSky />
        <VelaConstellation />
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

export default function App() {
  const pathname = window.location.pathname.replace(/\/+$/, "");

  if (pathname === "/cv") {
    document.title = "CV — William Blair";
    return <CvPage />;
  }
  if (pathname === "/constellations-of-borrowed-light") {
    document.title = "Constellations of Borrowed Light — William Blair";
    return (
      <InteriorShell>
        <ConstellationsEssay />
      </InteriorShell>
    );
  }

  document.title = "William Blair";
  return <Home />;
}
