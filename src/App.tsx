/*
THESIS: A personal homepage as the opening folio of a scientific essay, refusing portfolio chrome.
OWN-WORLD: Bone paper, navy ink, diluted blue-grey pigment, sparse cartographic gold, and fine celestial linework.
STORY: Meet Will, understand his research work and preoccupations, then choose an essay.
FIRST VIEWPORT: A vast left-aligned serif greeting and narrow biography occupy the quiet cream field; atmosphere gathers at the upper-right edge and returns as faint peripheral washes.
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

function Atmosphere() {
  return (
    <div className="atmosphere" aria-hidden="true">
      <span className="atmosphere__wash atmosphere__wash--middle" />
      <span className="atmosphere__wash atmosphere__wash--lower" />
      <svg
        className="atmosphere__chart"
        viewBox="0 0 820 820"
        fill="none"
        focusable="false"
      >
        <path d="M784 82C601 124 458 252 407 427C370 553 388 675 455 789" />
        <path d="M816 176C654 197 535 294 486 431C449 534 461 645 520 742" />
        <path d="M733 22C681 188 578 325 438 415C337 481 219 514 91 510" />
        <path d="M744 162L607 260L674 381L526 473L585 618" />
        <circle cx="744" cy="162" r="3.5" />
        <circle cx="607" cy="260" r="2.8" />
        <circle cx="674" cy="381" r="2.6" />
        <circle cx="526" cy="473" r="3.2" />
        <circle cx="585" cy="618" r="2.4" />
        <circle cx="355" cy="338" r="1.8" />
        <circle cx="760" cy="520" r="1.6" />
      </svg>
    </div>
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
    </div>
  );
}

export default Home;
