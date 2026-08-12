import { useState, type CSSProperties, type ReactNode } from "react";

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
  { symbol: "γ", name: "Regor", catalogue: "γ Velorum", magnitude: 1.75, x: 12, y: 42, delay: "-1.8s", duration: "7.4s" },
  { symbol: "δ", name: "Alsephina", catalogue: "δ Velorum", magnitude: 1.96, x: 29, y: 76, delay: "-4.6s", duration: "8.2s" },
  { symbol: "κ", name: "Markeb", catalogue: "κ Velorum", magnitude: 2.47, x: 47, y: 78, delay: "-2.9s", duration: "6.8s" },
  { symbol: "φ", name: "Phi Velorum", catalogue: "φ Velorum", magnitude: 3.54, x: 64, y: 75, delay: "-5.2s", duration: "7.8s" },
  { symbol: "μ", name: "Mu Velorum", catalogue: "μ Velorum", magnitude: 2.69, x: 88, y: 52, delay: "-0.9s", duration: "8.6s" },
  { symbol: "q", name: "q Velorum", catalogue: "q Velorum", magnitude: 3.85, x: 73, y: 19, delay: "-3.7s", duration: "7.1s" },
  { symbol: "ψ", name: "Psi Velorum", catalogue: "ψ Velorum", magnitude: 3.6, x: 51, y: 12, delay: "-6.1s", duration: "8.9s" },
  { symbol: "λ", name: "Suhail", catalogue: "λ Velorum", magnitude: 2.21, x: 40, y: 25, delay: "-2.3s", duration: "7.6s" },
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

const skyStars = [
  [3, 8, 0.12, -1.2, 7.8, 0.82],
  [8, 18, 0.08, -4.4, 9.2, 0.58],
  [13, 6, 0.1, -2.8, 8.4, 0.72],
  [18, 29, 0.07, -6.1, 10.2, 0.46],
  [22, 13, 0.13, -3.5, 7.4, 0.8],
  [28, 22, 0.09, -7.2, 9.6, 0.62],
  [33, 5, 0.07, -1.8, 8.8, 0.52],
  [38, 31, 0.11, -5.3, 7.9, 0.68],
  [43, 16, 0.08, -3.9, 9.4, 0.56],
  [48, 7, 0.14, -6.7, 8.1, 0.84],
  [53, 25, 0.07, -2.1, 10.4, 0.48],
  [58, 12, 0.1, -4.9, 8.7, 0.7],
  [63, 34, 0.08, -7.6, 9.8, 0.52],
  [68, 5, 0.09, -2.6, 7.6, 0.7],
  [73, 21, 0.12, -5.8, 8.9, 0.78],
  [78, 11, 0.07, -3.1, 10.1, 0.48],
  [83, 29, 0.09, -6.4, 9.1, 0.58],
  [88, 7, 0.13, -1.5, 7.7, 0.82],
  [93, 18, 0.08, -4.2, 9.7, 0.55],
  [97, 33, 0.07, -7.1, 10.5, 0.42],
  [6, 45, 0.08, -5.1, 10.8, 0.42],
  [17, 53, 0.06, -2.4, 11.2, 0.3],
  [31, 42, 0.07, -6.8, 9.9, 0.4],
  [46, 58, 0.06, -3.4, 11.6, 0.26],
  [61, 48, 0.07, -7.3, 10.7, 0.36],
  [76, 56, 0.06, -1.9, 11.4, 0.25],
  [91, 44, 0.07, -5.7, 10.3, 0.34],
  [24, 72, 0.05, -4.6, 12.1, 0.18],
  [57, 78, 0.05, -2.7, 12.6, 0.16],
  [84, 69, 0.05, -6.2, 11.9, 0.18],
] as const;

function Atmosphere() {
  return (
    <div className="atmosphere" aria-hidden="true">
      <div className="night-stars">
        {skyStars.map(([x, y, size, delay, duration, opacity], index) => (
          <span
            className="night-stars__star"
            key={`${x}-${y}-${index}`}
            style={
              {
                left: `${x}%`,
                top: `${y}%`,
                "--sky-star-size": `${size}rem`,
                "--sky-star-delay": `${delay}s`,
                "--sky-star-duration": `${duration}s`,
                "--sky-star-opacity": opacity,
                "--sky-star-dim": Number((opacity * 0.55).toFixed(2)),
              } as CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}

function VelaConstellation() {
  const [selectedStar, setSelectedStar] = useState(0);

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
            aria-label={`${star.catalogue}, ${star.name}, magnitude ${star.magnitude}`}
            aria-pressed={isSelected}
            onClick={() => setSelectedStar(index)}
            onMouseEnter={() => setSelectedStar(index)}
            onFocus={() => setSelectedStar(index)}
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
      <div className="vela__legend">
        <div className="vela__symbols" aria-hidden="true">
          {velaStars.map((star, index) => (
            <span className={selectedStar === index ? "is-selected" : ""} key={star.symbol}>
              {star.symbol}
            </span>
          ))}
        </div>
        <p className="vela__title">Vela · The Sails</p>
        <p className="vela__instruction">Hover, focus, or select a star.</p>
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
              <a href={essay.href}>{essay.title}</a>
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
          <a className="project-title" href={project.href}>{project.title}</a>
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
                <a href={link.href} key={link.href}>{link.label}</a>
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

function Home() {
  return (
    <div className="page-shell">
      <Atmosphere />
      <main>
        <Intro />
        <EssayList />
        <ProjectList />
      </main>
      <VelaConstellation />
    </div>
  );
}

function ConstellationsOfBorrowedLight() {
  return <main className="essay-blank-slate" aria-label="Constellations of Borrowed Light" />;
}

export default function App() {
  if (window.location.pathname === "/constellations-of-borrowed-light/") {
    return <ConstellationsOfBorrowedLight />;
  }

  return <Home />;
}
