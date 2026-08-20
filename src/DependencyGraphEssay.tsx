import { useEffect, useMemo, useState } from "react";
import "./DependencyGraphEssay.css";

/*
THESIS: The short structural argument for Vela, set as a quiet text folio on the same paper as the rest of the site.
OWN-WORLD: Bone paper, navy ink, cartographic gold; the one figure drawn as a small chart of findings rather than a diagram with chrome.
STORY: A concrete failure of the literature, the structural diagnosis, an instrument the reader can touch, and why the moment is now.
FORM: A text-first interior page under the sail home link, sharing the Constellations measure and type.
*/

type Finding = {
  id: string;
  x: number;
  y: number;
  claim: string;
  field: string;
};

type Link = {
  from: string;
  to: string;
  kind: "supports" | "extends" | "depends" | "contradicts";
};

const findings: ReadonlyArray<Finding> = [
  { id: "f1", x: 78, y: 70, claim: "Aβ*56 oligomers impair memory in Tg2576 mice", field: "Amyloid biology" },
  { id: "f2", x: 78, y: 182, claim: "ApoE4 carriers show blood–brain barrier breakdown", field: "Neurovascular" },
  { id: "f3", x: 78, y: 294, claim: "Tau propagates trans-synaptically", field: "Tau pathology" },
  { id: "f4", x: 320, y: 48, claim: "Soluble oligomers, not plaques, drive cognitive decline", field: "Amyloid biology" },
  { id: "f5", x: 320, y: 152, claim: "Barrier breakdown precedes amyloid deposition", field: "Neurovascular" },
  { id: "f6", x: 320, y: 244, claim: "Oligomer-selective antibodies rescue memory in model", field: "Therapeutics" },
  { id: "f7", x: 320, y: 330, claim: "Tau burden predicts regional atrophy", field: "Diagnostics" },
  { id: "f8", x: 560, y: 110, claim: "Anti-oligomer immunotherapy programme", field: "Clinical" },
  { id: "f9", x: 560, y: 232, claim: "Vascular-first therapeutic hypothesis", field: "Clinical" },
];

const links: ReadonlyArray<Link> = [
  { from: "f1", to: "f4", kind: "supports" },
  { from: "f1", to: "f6", kind: "supports" },
  { from: "f4", to: "f6", kind: "extends" },
  { from: "f2", to: "f5", kind: "supports" },
  { from: "f3", to: "f7", kind: "supports" },
  { from: "f4", to: "f8", kind: "depends" },
  { from: "f6", to: "f8", kind: "depends" },
  { from: "f5", to: "f9", kind: "depends" },
  { from: "f5", to: "f4", kind: "contradicts" },
];

const findingById = Object.fromEntries(findings.map((finding) => [finding.id, finding]));

function downstreamOf(id: string): Set<string> {
  const affected = new Set<string>();
  const queue = [id];
  while (queue.length) {
    const current = queue.shift()!;
    for (const link of links) {
      if (link.from === current && link.kind !== "contradicts" && !affected.has(link.to)) {
        affected.add(link.to);
        queue.push(link.to);
      }
    }
  }
  return affected;
}

function CascadeFigure() {
  const [selected, setSelected] = useState<string | null>(null);
  const affected = useMemo(() => (selected ? downstreamOf(selected) : new Set<string>()), [selected]);

  const toggle = (id: string) => setSelected((current) => (current === id ? null : id));
  const stateOf = (id: string) =>
    id === selected ? "retracted" : affected.has(id) ? "affected" : "standing";

  const contradiction = {
    x: (findingById.f5.x + findingById.f4.x) / 2,
    y: (findingById.f5.y + findingById.f4.y) / 2,
  };

  return (
    <figure className="cascade-figure">
      <div className="cascade-figure__chart">
        <svg viewBox="0 0 640 380" aria-hidden="true" focusable="false">
          <g>
            {links.map((link) => {
              const from = findingById[link.from];
              const to = findingById[link.to];
              const isLit =
                link.kind !== "contradicts" &&
                selected !== null &&
                (link.from === selected || affected.has(link.from)) &&
                affected.has(link.to);
              return (
                <line
                  key={`${link.from}-${link.to}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  strokeDasharray={link.kind === "contradicts" ? "4 4" : undefined}
                  className={`cascade-figure__link${isLit ? " is-lit" : ""}`}
                />
              );
            })}
          </g>
          <g className="cascade-figure__contradiction-mark">
            <line x1={contradiction.x - 4} y1={contradiction.y - 4} x2={contradiction.x + 4} y2={contradiction.y + 4} />
            <line x1={contradiction.x - 4} y1={contradiction.y + 4} x2={contradiction.x + 4} y2={contradiction.y - 4} />
          </g>
          {findings.map((finding) => {
            const state = stateOf(finding.id);
            return (
              <g key={finding.id} className="cascade-figure__node" onClick={() => toggle(finding.id)}>
                <circle cx={finding.x} cy={finding.y} r="15" fill="transparent" stroke="transparent" />
                {state === "affected" ? (
                  <circle className="cascade-figure__dot is-affected" cx={finding.x} cy={finding.y} r="6" strokeDasharray="3 3" />
                ) : (
                  <circle
                    className={`cascade-figure__dot${state === "retracted" ? " is-retracted" : ""}`}
                    cx={finding.x}
                    cy={finding.y}
                    r="5.5"
                  />
                )}
                {state === "retracted" ? (
                  <g className="cascade-figure__cross">
                    <line x1={finding.x - 8} y1={finding.y - 8} x2={finding.x + 8} y2={finding.y + 8} />
                    <line x1={finding.x - 8} y1={finding.y + 8} x2={finding.x + 8} y2={finding.y - 8} />
                  </g>
                ) : null}
                <text x={finding.x} y={finding.y + 26} textAnchor="middle">
                  {finding.id}
                </text>
              </g>
            );
          })}
        </svg>
        <p className="cascade-figure__hint">Select any finding to invalidate it and trace what depends on it.</p>
        <ul className="cascade-figure__list">
          {findings.map((finding) => {
            const state = stateOf(finding.id);
            return (
              <li key={finding.id}>
                <button
                  type="button"
                  className={`cascade-figure__item is-${state}`}
                  aria-pressed={finding.id === selected}
                  onClick={() => toggle(finding.id)}
                >
                  <span className="cascade-figure__item-id">{finding.id}</span>
                  <span className="cascade-figure__item-claim">{finding.claim}</span>
                  <span className="cascade-figure__item-field">{finding.field}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <figcaption>
        A schematic corridor of nine findings with typed links. Invalidate f1 and the three findings
        that rest on it are marked at once; invalidate f2 and a different branch goes. The dashed
        link between f5 and f4 is a recorded contradiction, so nothing propagates along it. This is
        what citation graphs cannot do today — the structure exists, but nothing carries the
        correction down it.
      </figcaption>
    </figure>
  );
}

export default function DependencyGraphEssay() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Science Has No Dependency Graph — William Blair";
    document.body.classList.add("constellations-route");

    return () => {
      document.title = previousTitle;
      document.body.classList.remove("constellations-route");
    };
  }, []);

  return (
    <article className="dependency-essay">
      <header className="dependency-essay__header">
        <h1>Science has no dependency graph</h1>
        <time dateTime="2026-07-30">July 30, 2026</time>
      </header>
      <div className="dependency-essay__copy">
        <p>
          Last year I mapped the evidence landscape for Alzheimer's therapeutic targets across five
          subdisciplines: amyloid biology, tau pathology, neuroinflammation, lipid transport, and
          diagnostics. The findings were not what struck me. The gaps between them were.
        </p>
        <p>
          Blood-brain barrier breakdown in ApoE4 carriers was shown in 2019 to precede amyloid
          deposition by years. That result came out of neurovascular biology, and most amyloid
          researchers never encountered it. Nothing was hidden. The two communities read different
          journals, attend different conferences, and no infrastructure surfaces the connection
          between them.
        </p>
        <p>
          Once it was visible it changed which hypotheses looked viable. Making it visible took
          months of reading across literatures that do not cite each other. No tool automated that
          work, no database surfaced it, and nothing preserved it afterward, so the next person
          asking the same question starts from the beginning.
        </p>
        <p>
          This is not a search problem. PubMed would have returned the relevant papers if I had
          known what to type. I did not know what I did not know.
        </p>
        <h2>Citations link documents, not claims</h2>
        <p>
          The underlying problem is that scientific findings have no dependency graph. When a
          finding is published, contested, replicated, or retracted, nothing downstream knows.
          Citations connect documents, and they are untyped, so the graph cannot tell "builds on"
          from "contradicts" from "mentions in passing." There is no mechanism for a correction to
          propagate through the work that depends on it, and no way to ask the obvious question: if
          this finding were invalidated, what else would change?
        </p>
        <CascadeFigure />
        <p>
          The cost of that is measured in decades. Alzheimer's research converged on amyloid-beta
          for twenty years, through a 99.6% trial failure rate and billions in investment, while
          alternative targets sat underexplored because accumulating negative evidence could not
          move through the literature fast enough to redirect the field. When a foundational 2006{" "}
          <em>Nature</em> paper on Aβ*56 oligomers was flagged for image manipulation, the
          correction could not cascade. Every downstream lab had to discover the problem on its own.
        </p>
        <p>
          The tools we have work at the wrong level. PubMed indexes 37 million papers as documents,
          so you can find a paper but cannot ask whether its central claim has been replicated.
          Semantic Scholar maps 200 million citation links, but a paper that extends a finding and
          one that refutes it look identical in that graph. Extraction tools produce structured
          findings that are project-scoped and ephemeral, so the work never accumulates.
        </p>
        <h2>Why this is more urgent now</h2>
        <p>
          Language models are starting to reason over the scientific literature, and they inherit
          whatever substrate they are handed. To a model reading today, a flagged paper and a
          well-replicated finding look nearly the same. Context falls away in transmission until
          uncertainty hardens into fact.
        </p>
        <p>
          Meanwhile the companies building science agents are constructing private knowledge
          representations: proprietary graphs, internal ontologies, closed extraction pipelines.
          Every month those calcify a little further. If an open dependency graph does not exist
          before private representations fragment the frontier, it gets much harder to establish
          afterward. The Protein Data Bank succeeded partly because it existed before the need was
          obvious, and it started with seven structures, because seven was what a few
          crystallographers could deposit by hand.
        </p>
        <p>
          What has changed is the extraction bottleneck. Compilation that would have taken a
          Cochrane team years can now be drafted in weeks and refined through expert review. That is
          what Vela is for. The atomic unit is the individual finding, a claim carrying its
          evidence, confidence, conditions, and lineage, linked to other findings by typed
          relationships that a machine can replay and a person can argue with.
        </p>
        <p>
          Whether that actually changes what scientists do is still open. The longer argument is in{" "}
          <a href="/constellations-of-borrowed-light/">
            <em>Constellations of Borrowed Light</em>
          </a>
          ; this is the short version of why I think the problem is structural rather than a matter
          of better search.
        </p>
      </div>
    </article>
  );
}
