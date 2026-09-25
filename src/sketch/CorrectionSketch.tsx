import { useMemo, useState, type CSSProperties } from "react";
import "./sketch.css";

/*
THESIS: A correction should reach the work that depends on it. Citations cannot carry it; findings can.
OWN-WORLD: The essay's paper and ink, drawn like a Cajal plate, with the correction travelling in kintsugi gold.
FORM: A short reading page around one interactive figure. The findings are placeholders, and the page says so.
*/

type View = "citations" | "findings";

const nodes = [
  { id: "A", x: 90, y: 110 },
  { id: "B", x: 90, y: 250 },
  { id: "C", x: 300, y: 80 },
  { id: "D", x: 300, y: 250 },
  { id: "E", x: 510, y: 60 },
  { id: "F", x: 510, y: 180 },
  { id: "G", x: 510, y: 300 },
  { id: "H", x: 710, y: 120 },
  { id: "I", x: 710, y: 280 },
] as const;

type NodeId = (typeof nodes)[number]["id"];

/** What each finding depends on, as edges from the earlier finding to the one built on it. */
const dependencies: ReadonlyArray<[NodeId, NodeId]> = [
  ["A", "C"],
  ["A", "D"],
  ["B", "D"],
  ["C", "E"],
  ["C", "F"],
  ["D", "F"],
  ["D", "G"],
  ["E", "H"],
  ["F", "H"],
  ["G", "I"],
];

/** Citations include every dependency, plus the references that were background, not foundation. */
const citations: ReadonlyArray<[NodeId, NodeId]> = [...dependencies, ["B", "C"], ["A", "E"], ["B", "G"], ["E", "I"]];

const WIDTH = 800;
const HEIGHT = 360;
const HOP = 520;
const byId = new Map(nodes.map((node) => [node.id, node]));
const words = ["no", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen"];
const count = (n: number) => words[n] ?? String(n);

function curve(from: NodeId, to: NodeId) {
  const a = byId.get(from)!;
  const b = byId.get(to)!;
  const bend = (b.x - a.x) * 0.45;
  return `M${a.x} ${a.y} C${a.x + bend} ${a.y} ${b.x - bend} ${b.y} ${b.x} ${b.y}`;
}

/** Hop distance from the corrected finding to everything that depends on it, directly or not. */
function reach(start: NodeId) {
  const depth = new Map<NodeId, number>([[start, 0]]);
  const queue: NodeId[] = [start];
  while (queue.length) {
    const current = queue.shift()!;
    for (const [from, to] of dependencies) {
      if (from === current && !depth.has(to)) {
        depth.set(to, depth.get(current)! + 1);
        queue.push(to);
      }
    }
  }
  return depth;
}

function Figure() {
  const [view, setView] = useState<View>("findings");
  const [corrected, setCorrected] = useState<NodeId | null>(null);

  const depth = useMemo(() => (corrected ? reach(corrected) : new Map<NodeId, number>()), [corrected]);
  const edges = view === "findings" ? dependencies : citations;
  const reached = view === "findings" && corrected ? depth.size - 1 : 0;
  const citers = corrected ? citations.filter(([from]) => from === corrected).length : 0;

  let status: string;
  if (!corrected) {
    status =
      view === "findings"
        ? `Nine findings, joined by ${count(dependencies.length)} dependencies. Choose one to correct.`
        : `Nine papers, joined by ${count(citations.length)} citations. Choose one to correct.`;
  } else if (view === "findings") {
    status =
      reached === 0
        ? `${corrected} is corrected. Nothing depends on it yet.`
        : `${corrected} is corrected. The correction reaches the ${count(reached)} ${reached === 1 ? "finding" : "findings"} that depend on it.`;
  } else {
    status =
      citers === 0
        ? `${corrected} is corrected. No paper cites it yet.`
        : `${corrected} is corrected. The ${count(citers)} ${citers === 1 ? "paper" : "papers"} citing it cannot tell, so nothing downstream changes.`;
  }

  return (
    <figure className="correction-figure">
      <div className="correction-figure__controls">
        <div className="correction-figure__views" role="group" aria-label="View">
          {(["citations", "findings"] as const).map((option) => (
            <button
              type="button"
              key={option}
              className={view === option ? "is-active" : undefined}
              aria-pressed={view === option}
              onClick={() => setView(option)}
            >
              {option === "citations" ? "As citations" : "As findings"}
            </button>
          ))}
        </div>
        <button type="button" className="correction-figure__reset" onClick={() => setCorrected(null)} disabled={!corrected}>
          Reset
        </button>
      </div>

      <div className={`correction-graph correction-graph--${view}`} key={`${view}-${corrected ?? "none"}`}>
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} aria-hidden="true" focusable="false">
          {edges.map(([from, to]) => {
            const d = curve(from, to);
            const carries = view === "findings" && depth.has(from) && depth.has(to) && depth.get(to)! === depth.get(from)! + 1;
            const background = view === "citations" && !dependencies.some(([f, t]) => f === from && t === to);
            return (
              <g key={`${from}-${to}`}>
                <path className={`correction-edge${background ? " is-background" : ""}`} d={d} />
                {carries ? (
                  <path
                    className="correction-edge__gold"
                    d={d}
                    pathLength={1}
                    style={{ "--hop": depth.get(from) } as CSSProperties}
                  />
                ) : null}
              </g>
            );
          })}
        </svg>
        {nodes.map((node) => {
          const hop = depth.get(node.id);
          const isCorrected = corrected === node.id;
          const isReached = view === "findings" && hop !== undefined && hop > 0;
          const classes = ["correction-node", isCorrected ? "is-corrected" : "", isReached ? "is-reached" : ""]
            .filter(Boolean)
            .join(" ");
          return (
            <button
              type="button"
              key={node.id}
              className={classes}
              style={
                {
                  left: `${(node.x / WIDTH) * 100}%`,
                  top: `${(node.y / HEIGHT) * 100}%`,
                  "--hop": hop ?? 0,
                } as CSSProperties
              }
              aria-label={`Correct ${view === "findings" ? "finding" : "paper"} ${node.id}`}
              aria-pressed={isCorrected}
              onClick={() => setCorrected(node.id)}
            >
              {node.id}
            </button>
          );
        })}
      </div>

      <figcaption className="correction-figure__status" aria-live="polite">
        {status}
      </figcaption>

      <div className="correction-figure__legend" aria-hidden="true">
        {view === "findings" ? (
          <span>
            <i className="legend-line" /> depends on
          </span>
        ) : (
          <>
            <span>
              <i className="legend-line" /> cites
            </span>
            <span>
              <i className="legend-line is-background" /> cites, as background
            </span>
          </>
        )}
        <span>
          <i className="legend-dot is-corrected" /> corrected
        </span>
        {view === "findings" ? (
          <span>
            <i className="legend-dot is-reached" /> reached
          </span>
        ) : null}
      </div>
    </figure>
  );
}

export default function CorrectionSketch() {
  return (
    <article className="sketch">
      <header className="sketch__header">
        <p className="sketch__kicker">A sketch · Vela</p>
        <h1>How a correction travels</h1>
      </header>

      <div className="sketch__body">
        <p>
          When a scientific result is corrected, the correction usually stays where it was made. Papers cite
          papers, but a citation does not say which claim it relies on, or how. Work built on the corrected
          result has no way to find out.
        </p>

        <p className="sketch__instruction">Choose a finding to correct, then compare the two views.</p>

        <Figure />

        <p>
          Vela records findings rather than documents. Each finding carries its evidence, confidence,
          conditions, and lineage, so a correction can travel to the work that depends on it.
        </p>

        <p className="sketch__note">
          The findings in the figure are placeholders.{" "}
          <a href="https://github.com/vela-science/vela" target="_blank" rel="noopener noreferrer">
            Vela on GitHub<span aria-hidden="true"> ↗</span>
          </a>
        </p>
      </div>
    </article>
  );
}
