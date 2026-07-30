'use client'

import { useState } from 'react'
import clsx from 'clsx'

/* Vela — the Sails, cut from Argo Navis by Lacaille in the 1750s.
   These are the real bright stars, not a decorative star field. Positions are
   projected from catalogue RA/Dec (x from right ascension, y from declination)
   and disc radius is scaled from apparent magnitude, so γ Velorum reads as the
   brightest because it is. Distances are rounded; the joins follow the standard
   IAU figure. */
interface Star {
  id: string
  x: number
  y: number
  r: number
  name: string
  proper?: string
  mag: number
  distance: string
  note: string
}

const STARS: Array<Star> = [
  {
    id: 'gamma',
    x: 36,
    y: 106,
    r: 3.4,
    name: 'γ Velorum',
    proper: 'Regor',
    mag: 1.75,
    distance: '~1,100 ly',
    note: 'The only Wolf–Rayet star visible to the naked eye.',
  },
  {
    id: 'delta',
    x: 91,
    y: 182,
    r: 3.3,
    name: 'δ Velorum',
    proper: 'Alsephina',
    mag: 1.96,
    distance: '~80 ly',
    note: 'An eclipsing triple, and the nearest of the bright Sails.',
  },
  {
    id: 'kappa',
    x: 150,
    y: 185,
    r: 3.0,
    name: 'κ Velorum',
    proper: 'Markeb',
    mag: 2.47,
    distance: '~570 ly',
    note: 'With δ it forms half of the False Cross, mistaken for Crux.',
  },
  {
    id: 'phi',
    x: 205,
    y: 180,
    r: 2.3,
    name: 'φ Velorum',
    mag: 3.54,
    distance: '~1,900 ly',
    note: 'A blue supergiant, far behind the rest of the figure.',
  },
  {
    id: 'mu',
    x: 283,
    y: 127,
    r: 2.8,
    name: 'μ Velorum',
    mag: 2.69,
    distance: '~116 ly',
    note: 'A giant binary, once caught in a large X-ray flare.',
  },
  {
    id: 'q',
    x: 233,
    y: 52,
    r: 2.1,
    name: 'q Velorum',
    mag: 3.85,
    distance: '~275 ly',
    note: 'A white subgiant on the northern edge of the sail.',
  },
  {
    id: 'psi',
    x: 164,
    y: 35,
    r: 2.3,
    name: 'ψ Velorum',
    mag: 3.6,
    distance: '~61 ly',
    note: 'A close binary; the two stars orbit in about 34 years.',
  },
  {
    id: 'lambda',
    x: 128,
    y: 65,
    r: 3.1,
    name: 'λ Velorum',
    proper: 'Suhail',
    mag: 2.21,
    distance: '~545 ly',
    note: 'A red supergiant, variable and slowly dying.',
  },
]

const BY_ID = Object.fromEntries(STARS.map((s) => [s.id, s]))

const FIGURE: Array<[string, string]> = [
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
  let [active, setActive] = useState<Star | null>(null)

  return (
    <figure className={className}>
      {/* Decorative here: each star is reachable as a real button below, which
          is what carries the keyboard and screen-reader path. */}
      <svg
        viewBox="0 0 320 220"
        fill="none"
        aria-hidden="true"
        className="h-auto w-full text-zinc-400 dark:text-zinc-500"
      >
        <g stroke="currentColor" strokeWidth="0.75" strokeLinecap="round">
          {FIGURE.map(([from, to]) => {
            let lit = active?.id === from || active?.id === to
            return (
              <line
                key={`${from}-${to}`}
                x1={BY_ID[from].x}
                y1={BY_ID[from].y}
                x2={BY_ID[to].x}
                y2={BY_ID[to].y}
                className={clsx(
                  'transition-colors duration-[240ms]',
                  lit && 'stroke-teal-500',
                )}
              />
            )
          })}
        </g>

        {STARS.map((star) => (
          <g
            key={star.id}
            onMouseEnter={() => setActive(star)}
            onMouseLeave={() => setActive(null)}
            className="cursor-default"
          >
            <circle cx={star.x} cy={star.y} r="13" fill="transparent" />
            <circle
              cx={star.x}
              cy={star.y}
              r={active?.id === star.id ? star.r + 1.2 : star.r}
              className={clsx(
                'transition-all duration-[240ms]',
                active?.id === star.id ? 'fill-teal-500' : 'fill-current',
              )}
            />
          </g>
        ))}

        {/* γ Velorum, the brightest star in the constellation. Gold marks it once. */}
        <circle
          cx={BY_ID.gamma.x}
          cy={BY_ID.gamma.y}
          r="7.5"
          fill="none"
          stroke="var(--color-teal-500)"
          strokeWidth="0.75"
        />
      </svg>

      <ul role="list" className="mt-4 flex flex-wrap gap-x-3 gap-y-1">
        {STARS.map((star) => (
          <li key={star.id}>
            <button
              type="button"
              onMouseEnter={() => setActive(star)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(star)}
              onBlur={() => setActive(null)}
              aria-describedby={`star-${star.id}`}
              className={clsx(
                'font-mono text-[11px] transition',
                active?.id === star.id
                  ? 'text-teal-500 dark:text-teal-400'
                  : 'text-zinc-400 hover:text-teal-500 dark:text-zinc-500 dark:hover:text-teal-400',
              )}
            >
              {star.name.split(' ')[0]}
            </button>
            <span id={`star-${star.id}`} className="sr-only">
              {star.name}
              {star.proper ? `, ${star.proper}` : ''}, magnitude {star.mag},{' '}
              {star.distance}. {star.note}
            </span>
          </li>
        ))}
      </ul>

      <figcaption className="mt-4 min-h-[6.5rem] font-sans text-xs text-zinc-400 dark:text-zinc-500">
        {active ? (
          <>
            <span className="tracking-wide text-zinc-700 uppercase dark:text-zinc-300">
              {active.proper ?? active.name}
            </span>
            <span className="mt-1 block font-mono text-[11px]">
              mag {active.mag.toFixed(2)} · {active.distance}
            </span>
            <span className="mt-2 block">{active.note}</span>
          </>
        ) : (
          <>
            <span className="tracking-[0.14em] uppercase">Vela · the Sails</span>
            <span className="mt-2 block">
              Projected from catalogue positions; disc size is apparent
              magnitude. Hover a star.
            </span>
          </>
        )}
      </figcaption>
    </figure>
  )
}
