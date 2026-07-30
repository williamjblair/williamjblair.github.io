'use client'

import { useMemo, useState } from 'react'
import clsx from 'clsx'

/* A schematic corridor, not a real compiled frontier. The findings are drawn
   from the Alzheimer's subdisciplines the essay describes and are labelled
   illustratively; only the Aβ*56 entry refers to a specific published paper.
   The point of the figure is the mechanic, not the corpus.

   Mark vocabulary follows the Vela figure language: filled disc is a state
   reached, dashed ring is a state left open, a cross is conflict, gold marks
   the route carrying standing forward, and a dashed stroke is a relationship
   not yet realised. */

type EdgeKind = 'supports' | 'extends' | 'depends' | 'contradicts'

interface Finding {
  id: string
  x: number
  y: number
  claim: string
  field: string
}

const FINDINGS: Array<Finding> = [
  { id: 'f1', x: 78, y: 70, claim: 'Aβ*56 oligomers impair memory in Tg2576 mice', field: 'Amyloid biology' },
  { id: 'f2', x: 78, y: 182, claim: 'ApoE4 carriers show blood–brain barrier breakdown', field: 'Neurovascular' },
  { id: 'f3', x: 78, y: 294, claim: 'Tau propagates trans-synaptically', field: 'Tau pathology' },
  { id: 'f4', x: 320, y: 48, claim: 'Soluble oligomers, not plaques, drive cognitive decline', field: 'Amyloid biology' },
  { id: 'f5', x: 320, y: 152, claim: 'Barrier breakdown precedes amyloid deposition', field: 'Neurovascular' },
  { id: 'f6', x: 320, y: 244, claim: 'Oligomer-selective antibodies rescue memory in model', field: 'Therapeutics' },
  { id: 'f7', x: 320, y: 330, claim: 'Tau burden predicts regional atrophy', field: 'Diagnostics' },
  { id: 'f8', x: 560, y: 110, claim: 'Anti-oligomer immunotherapy programme', field: 'Clinical' },
  { id: 'f9', x: 560, y: 232, claim: 'Vascular-first therapeutic hypothesis', field: 'Clinical' },
]

const EDGES: Array<{ from: string; to: string; kind: EdgeKind }> = [
  { from: 'f1', to: 'f4', kind: 'supports' },
  { from: 'f1', to: 'f6', kind: 'supports' },
  { from: 'f4', to: 'f6', kind: 'extends' },
  { from: 'f2', to: 'f5', kind: 'supports' },
  { from: 'f3', to: 'f7', kind: 'supports' },
  { from: 'f4', to: 'f8', kind: 'depends' },
  { from: 'f6', to: 'f8', kind: 'depends' },
  { from: 'f5', to: 'f9', kind: 'depends' },
  { from: 'f5', to: 'f4', kind: 'contradicts' },
]

const BY_ID = Object.fromEntries(FINDINGS.map((f) => [f.id, f]))

/* Standing flows along supports / extends / depends. A contradiction is a
   recorded disagreement, not a load-bearing dependency, so invalidation does
   not travel down it. */
function downstreamOf(rootId: string) {
  let affected = new Set<string>()
  let queue = [rootId]

  while (queue.length) {
    let current = queue.shift()!
    for (let edge of EDGES) {
      if (edge.from !== current || edge.kind === 'contradicts') continue
      if (affected.has(edge.to)) continue
      affected.add(edge.to)
      queue.push(edge.to)
    }
  }

  return affected
}

export function CascadeFigure() {
  let [retracted, setRetracted] = useState<string | null>(null)

  let affected = useMemo(
    () => (retracted ? downstreamOf(retracted) : new Set<string>()),
    [retracted],
  )

  let toggle = (id: string) => setRetracted((prev) => (prev === id ? null : id))

  let statusOf = (id: string) =>
    id === retracted ? 'retracted' : affected.has(id) ? 'affected' : 'standing'

  return (
    <figure className="not-prose my-12">
      <div className="overflow-x-auto rounded-[5px] border border-zinc-100 bg-white p-5 dark:border-zinc-700/40 dark:bg-zinc-900/40">
        {/* Decorative here: the ledger below is the accessible control surface
            and the full text equivalent of every mark in the graph. */}
        <svg
          viewBox="0 0 640 380"
          className="h-auto w-full min-w-[520px]"
          aria-hidden="true"
        >
          <g>
            {EDGES.map((edge) => {
              let a = BY_ID[edge.from]
              let b = BY_ID[edge.to]
              let live =
                edge.kind !== 'contradicts' &&
                retracted !== null &&
                (edge.from === retracted || affected.has(edge.from)) &&
                affected.has(edge.to)

              return (
                <line
                  key={`${edge.from}-${edge.to}`}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  strokeWidth={live ? 1.6 : 1}
                  strokeDasharray={edge.kind === 'contradicts' ? '4 4' : undefined}
                  className={clsx(
                    'transition-[stroke,stroke-width] duration-[420ms]',
                    live
                      ? 'stroke-teal-500'
                      : 'stroke-zinc-300 dark:stroke-zinc-700',
                  )}
                />
              )
            })}
          </g>

          {/* The seam marking the one recorded contradiction. */}
          {(() => {
            let a = BY_ID.f5
            let b = BY_ID.f4
            let mx = (a.x + b.x) / 2
            let my = (a.y + b.y) / 2
            return (
              <g className="stroke-zinc-400 dark:stroke-zinc-500" strokeWidth="1.2">
                <line x1={mx - 4} y1={my - 4} x2={mx + 4} y2={my + 4} />
                <line x1={mx - 4} y1={my + 4} x2={mx + 4} y2={my - 4} />
              </g>
            )
          })()}

          {FINDINGS.map((finding) => {
            let status = statusOf(finding.id)
            return (
              <g
                key={finding.id}
                onClick={() => toggle(finding.id)}
                className="cursor-pointer"
              >
                <circle
                  cx={finding.x}
                  cy={finding.y}
                  r="15"
                  fill="transparent"
                  stroke="transparent"
                  strokeWidth="2"
                />
                {status === 'affected' ? (
                  <circle
                    cx={finding.x}
                    cy={finding.y}
                    r="6"
                    fill="none"
                    strokeWidth="1.4"
                    strokeDasharray="3 3"
                    className="stroke-teal-500 transition-all duration-[420ms]"
                  />
                ) : (
                  <circle
                    cx={finding.x}
                    cy={finding.y}
                    r="5.5"
                    className={clsx(
                      'transition-all duration-[420ms]',
                      status === 'retracted'
                        ? 'fill-zinc-300 dark:fill-zinc-600'
                        : 'fill-zinc-800 dark:fill-zinc-200',
                    )}
                  />
                )}
                {status === 'retracted' && (
                  <g
                    className="stroke-zinc-800 dark:stroke-zinc-200"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  >
                    <line
                      x1={finding.x - 8}
                      y1={finding.y - 8}
                      x2={finding.x + 8}
                      y2={finding.y + 8}
                    />
                    <line
                      x1={finding.x - 8}
                      y1={finding.y + 8}
                      x2={finding.x + 8}
                      y2={finding.y - 8}
                    />
                  </g>
                )}
                <text
                  x={finding.x}
                  y={finding.y + 26}
                  textAnchor="middle"
                  className="fill-zinc-400 font-mono text-[10px] dark:fill-zinc-500"
                >
                  {finding.id}
                </text>
              </g>
            )
          })}
        </svg>

        <p className="mt-4 font-sans text-xs text-zinc-500 dark:text-zinc-400">
          {retracted ? (
            <>
              <span className="text-zinc-800 dark:text-zinc-200">
                {retracted}
              </span>{' '}
              invalidated · {affected.size} finding
              {affected.size === 1 ? '' : 's'} structurally affected ·{' '}
              <button
                type="button"
                onClick={() => setRetracted(null)}
                className="underline underline-offset-4 transition hover:text-teal-500 dark:hover:text-teal-400"
              >
                reset
              </button>
            </>
          ) : (
            <>Select any finding to invalidate it and trace what depends on it.</>
          )}
        </p>

        {/* The ledger equivalent. Every mark in the figure decodes here, and
            the whole interaction is reachable without touching the graph. */}
        <ul role="list" className="mt-5 space-y-1.5">
          {FINDINGS.map((finding) => {
            let status = statusOf(finding.id)
            return (
              <li key={finding.id}>
                <button
                  type="button"
                  onClick={() => toggle(finding.id)}
                  aria-pressed={finding.id === retracted}
                  className="group flex w-full items-baseline gap-3 text-left"
                >
                  <span className="w-5 flex-none font-mono text-[11px] text-zinc-400 dark:text-zinc-500">
                    {finding.id}
                  </span>
                  <span
                    className={clsx(
                      'flex-auto font-sans text-xs transition group-hover:text-teal-500 dark:group-hover:text-teal-400',
                      status === 'standing'
                        ? 'text-zinc-600 dark:text-zinc-400'
                        : 'text-zinc-400 line-through dark:text-zinc-500',
                    )}
                  >
                    {finding.claim}
                  </span>
                  <span className="flex-none font-sans text-[11px] tracking-wide text-zinc-400 uppercase dark:text-zinc-500">
                    {status === 'standing' ? finding.field : status}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      <figcaption className="mt-4 font-sans text-xs text-zinc-500 dark:text-zinc-400">
        A schematic corridor of nine findings with typed links. Invalidate f1 and
        the three findings that rest on it are marked at once; invalidate f2 and
        a different branch goes. The dashed link between f5 and f4 is a recorded
        contradiction, so nothing propagates along it. This is what citation
        graphs cannot do today — the structure exists, but nothing carries the
        correction down it.
      </figcaption>
    </figure>
  )
}
