import { useState, type CSSProperties } from "react";

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
    href: null,
  },
] as const;

const velaStars = [
  { name: "Phi Velorum", x: 18, y: 28, delay: "-1.8s", duration: "7.4s" },
  { name: "Mu Velorum", x: 35, y: 17, delay: "-4.6s", duration: "8.2s" },
  { name: "Suhail", x: 36, y: 50, delay: "-2.9s", duration: "6.8s" },
  { name: "Regor", x: 58, y: 35, delay: "-5.2s", duration: "7.8s" },
  { name: "Alsephina", x: 73, y: 52, delay: "-0.9s", duration: "8.6s" },
  { name: "Markeb", x: 84, y: 78, delay: "-3.7s", duration: "7.1s", labelSide: "left" },
  { name: "Psi Velorum", x: 51, y: 74, delay: "-6.1s", duration: "8.9s" },
] as const;

const velaConnections = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 3],
  [2, 6],
  [3, 4],
  [4, 5],
  [4, 6],
  [5, 6],
] as const;

function Atmosphere() {
  return (
    <div className="atmosphere" aria-hidden="true">
      <span className="atmosphere__wash atmosphere__wash--upper-left" />
      <span className="atmosphere__wash atmosphere__wash--middle" />
      <span className="atmosphere__wash atmosphere__wash--lower" />
      <span className="atmosphere__splatters" />
    </div>
  );
}

function VelaConstellation() {
  const [selectedStar, setSelectedStar] = useState<string | null>(null);

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
      {velaStars.map((star) => {
        const isSelected = selectedStar === star.name;

        return (
          <button
            className={`vela__star${isSelected ? " is-selected" : ""}`}
            type="button"
            key={star.name}
            aria-label={`${isSelected ? "Hide" : "Reveal"} ${star.name}`}
            aria-pressed={isSelected}
            data-label-side={"labelSide" in star ? star.labelSide : "right"}
            onClick={() => setSelectedStar(isSelected ? null : star.name)}
            style={
              {
                left: `${star.x}%`,
                top: `${star.y}%`,
                "--star-delay": star.delay,
                "--star-duration": star.duration,
              } as CSSProperties
            }
          >
            <span className="vela__star-core" aria-hidden="true" />
            {isSelected ? (
              <span className="vela__star-label">{star.name}</span>
            ) : null}
          </button>
        );
      })}
      <span className="vela__caption" aria-hidden="true">
        Vela
      </span>
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
              {essay.href ? (
                <a href={essay.href}>{essay.title}</a>
              ) : (
                <span className="essay-list__title">{essay.title}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
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
      </main>
      <VelaConstellation />
    </div>
  );
}

export default Home;
