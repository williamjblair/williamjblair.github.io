import { useEffect, useState, type CSSProperties } from "react";
import { lightDeparture, velaConnections, velaStars } from "../content";

export default function VelaConstellation({ onFocusChange }: { onFocusChange?: (focused: boolean) => void }) {
  const [selectedStar, setSelectedStar] = useState<number | null>(null);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [focusedStar, setFocusedStar] = useState<number | null>(null);
  const activeStar = hoveredStar ?? focusedStar ?? selectedStar;
  const displayedStar = velaStars[activeStar ?? 0];

  useEffect(() => {
    onFocusChange?.(activeStar !== null);
  }, [activeStar, onFocusChange]);

  return (
    <section className="vela" aria-label="Interactive Vela constellation">
      <div className="vela__field">
        <svg className="vela__chart" aria-hidden="true" focusable="false">
          {velaConnections.map(([from, to], index) => (
            <line
              className={activeStar !== null && (from === activeStar || to === activeStar) ? "is-active" : undefined}
              key={`${from}-${to}`}
              x1={`${velaStars[from].x}%`}
              y1={`${velaStars[from].y}%`}
              x2={`${velaStars[to].x}%`}
              y2={`${velaStars[to].y}%`}
              pathLength={1}
              style={{ "--segment": index } as CSSProperties}
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
              aria-label={`${star.name}, ${star.catalogue}, magnitude ${star.magnitude}`}
              aria-pressed={isSelected}
              onClick={() => setSelectedStar(index)}
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") setHoveredStar(index);
              }}
              onPointerLeave={() => setHoveredStar((current) => (current === index ? null : current))}
              onFocus={() => setFocusedStar(index)}
              onBlur={() => setFocusedStar((current) => (current === index ? null : current))}
              style={
                {
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  "--star-delay": star.delay,
                  "--star-duration": star.duration,
                  "--star-core-size": `${coreSize.toFixed(3)}rem`,
                  "--star-order": index,
                } as CSSProperties
              }
            >
              <span className="vela__star-core" aria-hidden="true" />
            </button>
          );
        })}
      </div>
      <div className="vela__identity">
        <p className="vela__title">Vela · The Sails</p>
        <p className="vela__instruction">Choose a star.</p>
      </div>
      <div className="vela__legend">
        <div className="vela__readout" aria-live="polite" key={displayedStar.name}>
          <p className="vela__star-name">{displayedStar.name}</p>
          <p className="vela__star-detail">
            {displayedStar.catalogue} · mag. {displayedStar.magnitude.toFixed(2)}
          </p>
          <p className="vela__star-light">{lightDeparture(displayedStar)}</p>
        </div>
      </div>
    </section>
  );
}
