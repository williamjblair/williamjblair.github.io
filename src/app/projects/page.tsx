import { type Metadata } from 'next'
import Link from 'next/link'

import { SimpleLayout } from '@/components/SimpleLayout'

interface Project {
  name: string
  period: string
  description: string
  href?: string
  hrefLabel?: string
}

const groups: Array<{ title: string; projects: Array<Project> }> =
  [
    {
      title: 'Now',
      projects: [
        {
          name: 'Vela',
          period: '2025 — present',
          description:
            'A git-native protocol that turns scientific papers into structured, linked, correctable findings. A finding carries its evidence, confidence, conditions, and lineage; the state of a frontier is the deterministic replay of its event log. Rust reference implementation with a CLI, REST API, and an MCP server so agents can reason over compiled state. Open spec, Apache-2.0.',
          href: 'https://github.com/vela-science/vela',
          hrefLabel: 'github.com/vela-science/vela',
        },
        {
          name: 'Borrowed Light',
          period: '2025 — present',
          description:
            'The publication around the protocol, and the argument for it. Home of the thesis Constellations of Borrowed Light, on why a shared scientific substrate is worth building. An open-source Obsidian theme carries the same visual identity.',
          href: 'https://borrowedlight.org',
          hrefLabel: 'borrowedlight.org',
        },
        {
          name: 'Atlas',
          period: '2025 — present',
          description:
            'The researcher intelligence platform at Episteme — how the lab maps talent, evidence, and direction across neuroscience, advanced materials, energy, and compute. Data model, ingest, LLM-driven extraction over open scientific corpora, and the product surface scientists use daily. Internal to the lab.',
        },
      ],
    },
    {
      title: 'Companies',
      projects: [
        {
          name: 'Aaru',
          period: '2024 — 2025',
          description:
            'Large-scale AI-agent simulation for consulting, politics, and government. Built the core platform with the CTO as founding engineer: the simulation runtime, synthetic audience generation, benchmarking and observability, and the customer-facing app. The synthetic-audience pipeline shipped into every customer engagement.',
          href: 'https://www.aaru.com',
          hrefLabel: 'aaru.com',
        },
        {
          name: 'Biogenesis',
          period: '2023 — 2024',
          description:
            'End-to-end clinical trials platform, co-founded as COO out of Kleiner Perkins, where I was Engineer in Residence. Built the platform from scratch, hired a team of seven, raised $2.5M led by Jack Altman, and stood up partnerships across 250+ clinics.',
          href: 'https://www.mybiogenesis.com',
          hrefLabel: 'mybiogenesis.com',
        },
        {
          name: 'ThermoBeat',
          period: '2019 — 2023',
          description:
            'Thermoelectrics for implantable medical devices. A thermoelectric generator and boost-converter system that runs under a 2 °C gradient and produces 3.3 V, enough to power a pacemaker from body heat. Raised $300K+ non-dilutive across NSF I-Corps, NIBIB DEBUT, JHU Spark, and the JHU FUEL Grand Prize.',
          href: 'https://github.com/williamjblair/ThermoBeat',
          hrefLabel: 'github.com/williamjblair/ThermoBeat',
        },
      ],
    },
    {
      title: 'Open source',
      projects: [
        {
          name: 'Prospect',
          period: '2026',
          description:
            'Checks which of an AI’s biological claims the underlying data actually supports, before you pass them on. Built with Claude for Life Sciences.',
          href: 'https://github.com/williamjblair/prospect',
          hrefLabel: 'github.com/williamjblair/prospect',
        },
        {
          name: 'lean-proofs',
          period: '2026',
          description:
            'A self-checking index of formal Lean 4 proofs, CI-gated on #print axioms so nothing sneaks in on trust. Targets drawn from the Formal Conjectures project.',
          href: 'https://github.com/williamjblair/lean-proofs',
          hrefLabel: 'github.com/williamjblair/lean-proofs',
        },
        {
          name: 'verified-combinatorics',
          period: '2026',
          description:
            'Independently verifiable extremal combinatorial sets — binary Sidon and B₃ — shipped with a standalone checker. Backs contributions to the OEIS.',
          href: 'https://github.com/williamjblair/verified-combinatorics',
          hrefLabel: 'github.com/williamjblair/verified-combinatorics',
        },
        {
          name: 'fc-review-board',
          period: '2026',
          description:
            'A review-queue dashboard for open Formal Conjectures pull requests, with a fidelity audit column. In the spirit of mathlib’s queueboard.',
          href: 'https://github.com/williamjblair/fc-review-board',
          hrefLabel: 'github.com/williamjblair/fc-review-board',
        },
        {
          name: 'genome-explorer',
          period: '2024',
          description:
            'An interactive, AI-assisted platform for genomics education.',
          href: 'https://github.com/williamjblair/genome-explorer',
          hrefLabel: 'github.com/williamjblair/genome-explorer',
        },
      ],
    },
    {
      title: 'Earlier',
      projects: [
        {
          name: 'Omneer',
          period: '2023',
          description:
            'Brain tumor detection and analysis from MRI.',
          href: 'https://github.com/williamjblair/Omneer',
          hrefLabel: 'github.com/williamjblair/Omneer',
        },
        {
          name: 'Charm City Science League',
          period: '2022 — 2023',
          description:
            'Science Olympiad mentoring for Baltimore students, run as president: 100+ mentors across 20 schools, a $30K annual budget, and a 14-person executive board.',
          href: 'https://github.com/williamjblair/scienceolympiad',
          hrefLabel: 'github.com/williamjblair/scienceolympiad',
        },
        {
          name: 'Seedling Hydroponics',
          period: '2021 — 2022',
          description:
            'Hydroponic growing systems for Baltimore neighbourhoods with no nearby grocer.',
        },
      ],
    },
  ]

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Vela, Borrowed Light, Atlas, and the ventures and open-source work that came before them.',
}

export default function Projects() {
  return (
    <SimpleLayout
      title="Projects"
      intro="What I’ve built, from the protocol work I’m on now back through four companies and a pile of smaller tools. Most of it is public; the code is linked where it exists."
    >
      <div className="space-y-20">
        {groups.map((group) => (
          <section key={group.title}>
            <h2 className="font-sans text-xs font-medium tracking-[0.14em] text-zinc-500 uppercase dark:text-zinc-400">
              {group.title}
            </h2>
            <div className="rule-gold mt-3" />
            <ul role="list" className="mt-10 space-y-12">
              {group.projects.map((project) => (
                <li key={project.name} className="max-w-2xl">
                  <div className="flex flex-wrap items-baseline gap-x-4">
                    <h3 className="text-lg text-zinc-900 dark:text-zinc-100">
                      {project.href ? (
                        <Link
                          href={project.href}
                          className="transition hover:text-teal-500 dark:hover:text-teal-400"
                        >
                          {project.name}
                        </Link>
                      ) : (
                        project.name
                      )}
                    </h3>
                    <span className="font-sans text-xs tracking-wide text-zinc-400 dark:text-zinc-500">
                      {project.period}
                    </span>
                  </div>
                  <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400">
                    {project.description}
                  </p>
                  {project.href && (
                    <Link
                      href={project.href}
                      className="mt-3 inline-flex font-mono text-xs text-zinc-400 transition hover:text-teal-500 dark:text-zinc-500 dark:hover:text-teal-400"
                    >
                      {project.hrefLabel}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </SimpleLayout>
  )
}
