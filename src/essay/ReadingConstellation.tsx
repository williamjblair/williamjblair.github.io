import { useEffect, useRef, useState } from "react";

/*
Reading progress as a constellation in the margin. Each star is a turning point in the essay
(marked with data-chapter); it lights when that passage reaches the reader, and the line to the
next star draws as they read toward it. Decoration only: hidden from assistive technology and
from narrow screens, and never a control.
*/

// Hand-set x offsets (in a 40-unit-wide column) so the stars read as a figure, not a ladder.
const SWAY = [22, 12, 26, 17, 30, 20, 9, 24, 14, 28, 19];

export default function ReadingConstellation() {
  const [count, setCount] = useState(0);
  const [progress, setProgress] = useState({ lit: -1, partial: 0, shown: false });
  const frame = useRef(0);

  useEffect(() => {
    const anchors = () => Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"));

    const update = () => {
      frame.current = 0;
      const line = window.innerHeight * 0.62;
      const tops = anchors().map((node) => node.getBoundingClientRect().top);
      setCount(tops.length);
      let lit = -1;
      tops.forEach((top, index) => {
        if (top < line) lit = index;
      });
      // The last lines can never climb that high; the end of the page completes the figure.
      const atEnd = window.scrollY >= document.documentElement.scrollHeight - window.innerHeight - 4;
      if (atEnd) lit = tops.length - 1;
      let partial = 0;
      if (lit >= 0 && lit < tops.length - 1) {
        const span = tops[lit + 1] - tops[lit];
        partial = span > 0 ? Math.min(1, Math.max(0, (line - tops[lit]) / span)) : 0;
      }
      setProgress({ lit, partial, shown: window.scrollY > window.innerHeight * 0.55 });
    };
    const schedule = () => {
      if (!frame.current) frame.current = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame.current);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  if (count === 0) return null;
  const step = 100 / (count - 1);
  const points = Array.from({ length: count }, (_, index) => ({ x: SWAY[index % SWAY.length], y: index * step }));

  return (
    <div className={`reading-constellation${progress.shown ? " is-shown" : ""}`} aria-hidden="true">
      <svg>
        {points.slice(0, -1).map((point, index) => {
          const next = points[index + 1];
          const drawn = index < progress.lit ? 1 : index === progress.lit ? progress.partial : 0;
          const x = (value: number) => `${((value + 4) / 48) * 100}%`;
          const y = (value: number) => `${((value + 4) / 108) * 100}%`;
          return (
            <g key={index}>
              <line className="reading-constellation__guide" x1={x(point.x)} y1={y(point.y)} x2={x(next.x)} y2={y(next.y)} />
              {drawn > 0 ? (
                <line
                  className="reading-constellation__path"
                  x1={x(point.x)}
                  y1={y(point.y)}
                  x2={x(point.x + (next.x - point.x) * drawn)}
                  y2={y(point.y + (next.y - point.y) * drawn)}
                />
              ) : null}
            </g>
          );
        })}
      </svg>
      {points.map((point, index) => (
        <span
          className={`reading-constellation__star${index <= progress.lit ? " is-lit" : ""}`}
          key={index}
          style={{ left: `${((point.x + 4) / 48) * 100}%`, top: `${((point.y + 4) / 108) * 100}%` }}
        />
      ))}
    </div>
  );
}
