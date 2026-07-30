import clsx from 'clsx'

/* Vela — the Sails, cut from Argo Navis in the 18th century.
   These are the real bright stars, not a decorative star field. Positions are
   projected from catalogue RA/Dec (x from right ascension, y from declination),
   and disc radius is scaled from apparent magnitude, so γ Velorum reads as the
   brightest because it is. The joins follow the standard IAU figure. */
const STARS = {
  gamma: { x: 36, y: 106, r: 3.4, name: 'γ Velorum' },
  delta: { x: 91, y: 182, r: 3.3, name: 'δ Velorum' },
  kappa: { x: 150, y: 185, r: 3.0, name: 'κ Velorum' },
  phi: { x: 205, y: 180, r: 2.3, name: 'φ Velorum' },
  mu: { x: 283, y: 127, r: 2.8, name: 'μ Velorum' },
  q: { x: 233, y: 52, r: 2.1, name: 'q Velorum' },
  psi: { x: 164, y: 35, r: 2.3, name: 'ψ Velorum' },
  lambda: { x: 128, y: 65, r: 3.1, name: 'λ Velorum' },
} as const

const FIGURE: Array<[keyof typeof STARS, keyof typeof STARS]> = [
  ['gamma', 'delta'],
  ['delta', 'kappa'],
  ['kappa', 'phi'],
  ['phi', 'mu'],
  ['mu', 'q'],
  ['q', 'psi'],
  ['psi', 'lambda'],
  ['lambda', 'gamma'],
]

export function Asterism({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 220"
      fill="none"
      role="img"
      aria-label="The constellation Vela, the Sails"
      className={clsx('h-auto w-full', className)}
    >
      <g stroke="currentColor" strokeWidth="0.75" strokeLinecap="round">
        {FIGURE.map(([from, to]) => (
          <line
            key={`${from}-${to}`}
            x1={STARS[from].x}
            y1={STARS[from].y}
            x2={STARS[to].x}
            y2={STARS[to].y}
          />
        ))}
      </g>
      <g fill="currentColor">
        {Object.entries(STARS).map(([key, star]) => (
          <circle key={key} cx={star.x} cy={star.y} r={star.r}>
            <title>{star.name}</title>
          </circle>
        ))}
      </g>
      {/* γ Velorum, the brightest star in the constellation and the only
          naked-eye Wolf–Rayet system. Gold marks direction, once. */}
      <circle
        cx={STARS.gamma.x}
        cy={STARS.gamma.y}
        r="7.5"
        fill="none"
        stroke="var(--color-teal-500)"
        strokeWidth="0.75"
      />
    </svg>
  )
}
