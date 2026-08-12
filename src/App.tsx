/*
THESIS: A personal homepage as the opening folio of a scientific essay, refusing portfolio chrome.
OWN-WORLD: Bone paper, navy ink, diluted blue-grey pigment, sparse cartographic gold, and fine celestial linework.
STORY: Meet Will, understand his research work and preoccupations, then choose an essay.
FIRST VIEWPORT: A vast left-aligned serif greeting and narrow biography occupy the quiet cream field; atmosphere gathers at the upper-right edge.
FORM: A single asymmetric editorial scroll, pinned by the supplied brief; no concept seed required.
*/

const essays = [
  {
    title: "Science Has No Dependency Graph",
    href: "https://williamjblair.github.io/articles/science-has-no-dependency-graph/",
  },
  {
    title: "Constellations of Borrowed Light",
    href: null,
  },
  {
    title: "Endless Frontiers",
    href: "https://www.vela.space/constellations",
  },
] as const;

function Atmosphere() {
  return (
    <div className="atmosphere" aria-hidden="true">
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
        <svg
          className="essay-list__threads"
          viewBox="0 0 56 176"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M18 19C48 37 4 58 21 86C36 110 49 126 19 156" />
          <path d="M20 19C3 46 44 66 21 86" />
          <path d="M21 86C3 108 42 132 19 156" />
        </svg>
        <ul className="essay-list">
          {essays.map((essay) => (
            <li key={essay.title}>
              <span className="essay-list__star" aria-hidden="true">
                ✦
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
