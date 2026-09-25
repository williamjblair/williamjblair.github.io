import { useEffect, useRef, useState, type CSSProperties } from "react";
import { lifeEdges, lifeStars } from "./life";

/*
A life drawn as a lineage graph, the same shape Vela gives a scientific finding. Stars light as the
reader reaches their passage; each line draws once both of its stars are lit. The chart is measured
in pixels so line lengths, and therefore the drawing, are exact.
*/

type LifeChartProps = {
  lit: ReadonlySet<string>;
  current: ReadonlySet<string>;
  highlighted: ReadonlySet<string>;
  onSelect: (starKey: string) => void;
};

function useSize<T extends Element>() {
  const ref = useRef<T>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return [ref, size] as const;
}

const byKey = new Map(lifeStars.map((star) => [star.key, star]));

export default function LifeChart({ lit, current, highlighted, onSelect }: LifeChartProps) {
  const [ref, { width, height }] = useSize<HTMLDivElement>();
  const point = (key: string) => {
    const star = byKey.get(key)!;
    return { x: (star.x / 100) * width, y: (star.y / 100) * height };
  };

  return (
    <nav className="life-chart" ref={ref} aria-label="Chart of this page">
      {width > 0 ? (
        <svg className="life-chart__lines" width={width} height={height} aria-hidden="true" focusable="false">
          {lifeEdges.map((edge) => {
            const a = point(edge.from);
            const b = point(edge.to);
            const drawn = lit.has(edge.from) && lit.has(edge.to);
            const toFrontier = byKey.get(edge.to)?.open;
            // The spine bows out to the left of everything between SickKids and Vela.
            const d = edge.arc
              ? `M${a.x} ${a.y} C${a.x - width * 0.16} ${a.y + (b.y - a.y) * 0.3} ${b.x - width * 0.14} ${b.y - (b.y - a.y) * 0.3} ${b.x} ${b.y}`
              : `M${a.x} ${a.y} L${b.x} ${b.y}`;
            return (
              <g key={`${edge.from}-${edge.to}`} className={edge.arc ? "is-arc" : undefined}>
                <path className="life-chart__guide" d={d} />
                <path
                  className={`life-chart__edge${drawn ? " is-drawn" : ""}${toFrontier ? " is-open" : ""}`}
                  d={d}
                  pathLength={1}
                />
              </g>
            );
          })}
        </svg>
      ) : null}
      {lifeStars.map((star, index) => {
        const classes = [
          "life-chart__star",
          lit.has(star.key) ? "is-lit" : "",
          current.has(star.key) ? "is-current" : "",
          highlighted.has(star.key) ? "is-highlighted" : "",
          star.open ? "is-open" : "",
        ]
          .filter(Boolean)
          .join(" ");
        return (
          <button
            type="button"
            className={classes}
            key={star.key}
            style={{ left: `${star.x}%`, top: `${star.y}%`, "--star-order": index } as CSSProperties}
            onClick={() => onSelect(star.key)}
            aria-label={`${star.label}${star.year ? `, ${star.year}` : ""}`}
          >
            <span className="life-chart__core" aria-hidden="true" />
            <span className="life-chart__label" aria-hidden="true">
              {star.label}
              {star.year ? <span className="life-chart__year">{star.year}</span> : null}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
