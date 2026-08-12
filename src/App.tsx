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
