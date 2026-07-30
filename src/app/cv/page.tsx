import { type Metadata } from 'next'
import Link from 'next/link'

import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

function Entry({
  title,
  meta,
  period,
  href,
  children,
}: {
  title: string
  meta?: string
  period?: string
  href?: string
  children?: React.ReactNode
}) {
  return (
    <li className="flex flex-col gap-y-1">
      <div className="flex flex-wrap items-baseline gap-x-3">
        <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
          {href ? (
            <Link
              href={href}
              className="transition hover:text-teal-500 dark:hover:text-teal-400"
            >
              {title}
            </Link>
          ) : (
            title
          )}
        </h3>
        {period && (
          <span className="text-xs text-zinc-400 dark:text-zinc-500">
            {period}
          </span>
        )}
      </div>
      {meta && (
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{meta}</p>
      )}
      {children && (
        <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          {children}
        </div>
      )}
    </li>
  )
}

function List({ children }: { children: React.ReactNode }) {
  return <ul role="list" className="space-y-10">{children}</ul>
}

export const metadata: Metadata = {
  title: 'CV',
  description:
    'Will Blair — work, research, publications, and awards. Cognitive science at Johns Hopkins; ThermoBeat, Biogenesis, Aaru, Episteme.',
}

export default function CV() {
  return (
    <SimpleLayout
      title="CV"
      intro="Work, research, publications, and awards. If something you need isn’t here, email me."
    >
      <div className="space-y-20">
        <Section title="Work">
          <List>
            <Entry
              title="Episteme"
              meta="Episteme Fellow · San Francisco"
              period="2025 — Present"
            >
              <p>
                A privately funded Bell Labs–style research organization, around
                fifteen scientists working across neuroscience, advanced
                materials, energy, and compute. I design and build Atlas, the
                in-house researcher intelligence platform the lab uses to map
                talent, evidence, and direction across those pillars. I own it
                end to end: data model, ingest, LLM-driven extraction over open
                scientific corpora, and the product surface scientists use day
                to day.
              </p>
            </Entry>
            <Entry
              title="Aaru"
              meta="Founding Engineer · New York"
              period="2024 — 2025"
              href="https://www.aaru.com"
            >
              <p>
                Large-scale AI-agent simulation for consulting, politics, and
                government. Built the core platform with the CTO: the agent
                simulation runtime, synthetic audience generation, benchmarking
                and observability tooling, and the customer-facing web app. The
                synthetic-audience pipeline I shipped was used in every customer
                engagement.
              </p>
            </Entry>
            <Entry
              title="Biogenesis"
              meta="Co-Founder & COO · Palo Alto"
              period="2023 — 2024"
              href="https://www.mybiogenesis.com"
            >
              <p>
                End-to-end clinical trials platform, incubated as Engineer in
                Residence at Kleiner Perkins. Built the platform from scratch
                and hired a team of seven. Raised $2.5M led by Jack Altman, with
                Kleiner Perkins and Fairchild. Stood up partnerships with small
                and mid-sized biotech across 250+ clinics.
              </p>
            </Entry>
            <Entry
              title="ThermoBeat"
              meta="Founder & CEO · Baltimore"
              period="2019 — 2023"
            >
              <p>
                Thermoelectrics for implantable medical devices. Developed a
                thermoelectric generator and boost-converter system that runs
                under a 2 °C gradient and produces 3.3 V, enough to power a
                pacemaker from body heat. Raised $300K+ in non-dilutive funding
                across NSF I-Corps, NIBIB DEBUT, JHU Spark, and the JHU FUEL
                Grand Prize. Supervised by Dr. Andreas Andreou.
              </p>
            </Entry>
          </List>
        </Section>

        <Section title="Independent">
          <List>
            <Entry
              title="Borrowed Light"
              meta="Open infrastructure for scientific knowledge"
              period="2025 — Present"
              href="https://borrowedlight.org"
            >
              <p>
                Built independently of any employer. Encompasses{' '}
                <Link
                  href="https://github.com/vela-science/vela"
                  className="font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-400"
                >
                  Vela
                </Link>
                , a git-native protocol that turns scientific papers into
                structured, linked, correctable findings, with a working Rust
                reference implementation and an MCP server for agent reasoning
                over compiled state; the lead essay{' '}
                <em>Constellations of Borrowed Light</em>; and an open-source
                Obsidian theme carrying the same visual identity. Open spec,
                Apache-2.0 implementation.
              </p>
            </Entry>
          </List>
        </Section>

        <Section title="Education">
          <List>
            <Entry
              title="Johns Hopkins University"
              meta="B.S. Honors, Cognitive Science; minor in Entrepreneurship · GPA 3.8"
              period="2019 — 2023"
            />
            <Entry
              title="Upper Canada College"
              meta="International Baccalaureate Diploma · Lang Scholar, one of ten across the school"
              period="2015 — 2019"
            />
          </List>
        </Section>

        <Section title="Publications">
          <List>
            <Entry
              title="Emerging targets of α-synuclein spreading in α-synucleinopathies"
              meta="Kuo G, Kumbhar R, Blair W, Dawson V, Dawson T, Mao X · Molecular Neurodegeneration"
              period="2025"
            >
              <p>A review of mechanistic pathways and interventions.</p>
            </Entry>
            <Entry
              title="Optimizing a hyaluronic acid–based hydrogel for delivery of neural progenitor cells for ischemic stroke treatment"
              meta="Blair W, Letko-Khait N, Shoichet M · Nature Technologies for Neuroengineering"
              period="2022"
            />
            <Entry
              title="Evaluation of 5-aminolevulinic acid–induced fluorescence during breast cancer surgery with a handheld prototype imaging device"
              meta="Gibson C, Ottolino-Perry K, et al., incl. Blair W · World Molecular Imaging Congress"
              period="2019"
            />
          </List>
        </Section>

        <Section title="Research">
          <List>
            <Entry
              title="Johns Hopkins University, Biomedical Engineering"
              meta="Advisors: Xiaobo Mao, Ph.D. and Ram Kumbhar, Ph.D."
              period="2022 — 2023"
            >
              <p>
                Methods to inhibit PARP-1 activation in Parkinson’s disease.
              </p>
            </Entry>
            <Entry
              title="University of Toronto, Chemical Engineering"
              meta="Advisors: Molly Shoichet, Ph.D. and Nitzan Letko-Khait, Ph.D."
              period="2022"
            >
              <p>
                Hyaluronic acid hydrogels for delivery of neural progenitor
                cells in ischemic stroke.
              </p>
            </Entry>
            <Entry
              title="Johns Hopkins University, Division of Neurosurgery"
              meta="Advisor: Youssef Salimpour, Ph.D."
              period="2021 — 2022"
            >
              <p>
                Novel neuromodulation techniques for epilepsy and Parkinson’s.
              </p>
            </Entry>
            <Entry
              title="University of Toronto, Medical Biophysics"
              meta="Advisor: Ralph DaCosta, Ph.D."
              period="2019"
            >
              <p>
                Handheld fluorescence imaging device for breast cancer
                visualization.
              </p>
            </Entry>
            <Entry
              title="McMaster Children’s Hospital, Infectious Disease"
              meta="Advisor: Jeffrey Pernica, M.D. FRCPC"
              period="2018"
            >
              <p>
                BALANCE-Kids: duration of antimicrobial therapy for bacteremia
                in pediatric patients.
              </p>
            </Entry>
          </List>
        </Section>

        <Section title="Fellowships & awards">
          <List>
            <Entry title="Z Fellows" period="2024" />
            <Entry title="Kleiner Perkins Fellowship" period="2023" />
            <Entry
              title="JHU FUEL Grand Prize"
              meta="$25,000 · Founder, ThermoBeat"
              period="2023"
            />
            <Entry
              title="NSERC USRA & PROMOTE Grant"
              meta="$10,000 · PI, University of Toronto"
              period="2022"
            />
            <Entry title="NSERC CREATE Fellowship" period="2022" />
            <Entry title="Sigma Squared Fellowship" period="2022" />
            <Entry
              title="NIBIB DEBUT Grant"
              meta="$5,000 · PI, ThermoBeat"
              period="2021"
            />
            <Entry
              title="NSF Regional I-Corps Grant"
              meta="$5,000 · PI, ThermoBeat"
              period="2021"
            />
            <Entry
              title="Hamilton Health Sciences Research Bursary"
              meta="$10,000 · Infectious disease research"
              period="2018"
            />
          </List>
        </Section>

        <Section title="Service & teaching">
          <List>
            <Entry
              title="Charm City Science League"
              meta="President · Baltimore"
              period="2022 — 2023"
            >
              <p>
                Science Olympiad mentoring for Baltimore students, 100+ mentors
                across 20 schools. Managed a $30K annual budget and led a
                14-person executive board.
              </p>
            </Entry>
            <Entry
              title="JHU Student Advisory Board"
              meta="President"
              period="2022 — 2023"
            >
              <p>
                Biweekly meetings with university leadership on first-year
                orientation, housing, and student mental health.
              </p>
            </Entry>
            <Entry
              title="JHU News-Letter, Sci-Tech"
              meta="Editor"
              period="2021 — 2022"
            >
              <p>
                Led 20+ writers at roughly seven articles a week. Authored 25+
                pieces on science and technology.
              </p>
            </Entry>
            <Entry
              title="Johns Hopkins University, Krieger School"
              meta="Teaching Assistant, Leading Change (Entrepreneurship & Management)"
              period="2021 — 2023"
            />
          </List>
        </Section>

        <Section title="Contact">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            <Link
              href="mailto:william.blair0708@gmail.com"
              className="font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-400"
            >
              william.blair0708@gmail.com
            </Link>
          </p>
        </Section>
      </div>
    </SimpleLayout>
  )
}
