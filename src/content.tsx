import type { ReactNode } from "react";
import cvData from "./cv-data.json";

export const essays = [
  {
    title: "How a correction travels",
    href: "/how-a-correction-travels/",
    meta: "Sketch · 2026",
  },
] as const;

export type Entry = {
  title: string;
  /** One line of plain fact in the catalogue face: role and years, venue and year, or medium. */
  meta: string;
  href?: string;
  description?: ReactNode;
  links?: ReadonlyArray<{ label: string; href: string }>;
};

export type EntryGroup = { key: string; label: string; entries: ReadonlyArray<Entry> };

type CvSection = { title: string; entries: Array<{ title: string; date?: string; subtitle?: string }> };

// Papers come straight from the CV so the two never disagree.
const papers: Entry[] = ((cvData.sections as CvSection[]).find((section) => section.title === "Publications")?.entries ?? []).map(
  (paper) => ({
    title: paper.title,
    meta: [paper.date, paper.subtitle?.split(" · ").pop()].filter(Boolean).join(" · "),
  }),
);

export const groups: ReadonlyArray<EntryGroup> = [
  {
    key: "now",
    label: "Now",
    entries: [
      {
        title: "Vela",
        meta: "Open protocol · 2025–",
        description:
          "Vela is a protocol that turns scientific papers into structured, linked, correctable findings. A finding carries its evidence, confidence, conditions, and lineage. The state of a frontier is the deterministic replay of its event log.",
        links: [
          { label: "GitHub", href: "https://github.com/vela-science/vela" },
          { label: "Publication web", href: "https://www.vela.space/" },
        ],
      },
      {
        title: "Atlas",
        meta: "Episteme · 2025–",
        href: "https://episteme.com/",
        description:
          "The researcher intelligence platform at Episteme — how the lab maps talent, evidence, and direction across neuroscience, advanced materials, energy, and compute. Data model, ingest, LLM-driven extraction over open scientific corpora, and the product surface scientists use daily. Internal to the lab.",
      },
    ],
  },
  { key: "papers", label: "Papers", entries: papers },
  {
    key: "tools",
    label: "Proofs & tools",
    entries: [
      {
        title: "Prospect",
        meta: "Claude for Life Sciences",
        href: "https://github.com/williamjblair/prospect",
        description:
          "Checks which of an AI’s biological claims the underlying data actually supports, before you pass them on. Built with Claude for Life Sciences.",
      },
      {
        title: "lean-proofs",
        meta: "Lean 4",
        href: "https://github.com/williamjblair/lean-proofs",
        description: (
          <>
            A self-checking index of formal Lean 4 proofs, CI-gated on <code>#print</code>{" "}
            axioms so nothing sneaks in on trust. Targets drawn from the Formal Conjectures project.
          </>
        ),
      },
      {
        title: "verified-combinatorics",
        meta: "Sidon & B₃ sets · OEIS",
        href: "https://github.com/williamjblair/verified-combinatorics",
        description:
          "Independently verifiable extremal combinatorial sets — binary Sidon and B₃ — shipped with a standalone checker. Backs contributions to the OEIS.",
      },
      {
        title: "Omneer",
        meta: "MRI",
        href: "https://github.com/williamjblair/Omneer",
        description: "Brain tumor detection and analysis from MRI.",
      },
    ],
  },
  {
    key: "earlier",
    label: "Earlier",
    entries: [
      {
        title: "Aaru",
        meta: "Founding engineer · 2024–25",
        href: "https://aaru.com/simulation",
        description:
          "Large-scale AI-agent simulation for consulting, politics, and government. Built the core platform with the CTO as founding engineer: the simulation runtime, synthetic audience generation, benchmarking and observability, and the customer-facing app. The synthetic-audience pipeline shipped into every customer engagement.",
      },
      {
        title: "Biogenesis",
        meta: "Co-founder, COO · 2023–24",
        href: "https://www.bayespredictive.com/",
        description:
          "End-to-end clinical trials platform, co-founded as COO out of Kleiner Perkins, where I was Engineer in Residence. Built the platform from scratch, hired a team of seven, raised $2.5M led by Jack Altman, and stood up partnerships across 250+ clinics.",
      },
      {
        title: "ThermoBeat",
        meta: "Founder · 2019–23",
        href: "https://github.com/williamjblair/ThermoBeat",
        description:
          "Thermoelectrics for implantable medical devices. A thermoelectric generator and boost-converter system that runs under a 2 °C gradient and produces 3.3 V, enough to power a pacemaker from body heat. Raised $300K+ non-dilutive across NSF I-Corps, NIBIB DEBUT, JHU Spark, and the JHU FUEL Grand Prize.",
      },
      {
        title: "Charm City Science League",
        meta: "President · 2022–23",
        href: "https://github.com/williamjblair/scienceolympiad",
        description:
          "Science Olympiad mentoring for Baltimore students, run as president: 100+ mentors across 20 schools, a $30K annual budget, and a 14-person executive board.",
      },
      {
        title: "Seedling Hydroponics",
        meta: "Baltimore",
        href: "https://www.seedlinginc.org/",
        description: "Hydroponic growing systems for Baltimore neighbourhoods with no nearby grocer.",
      },
    ],
  },
];

/*
Distances come from SIMBAD parallaxes (van Leeuwen 2007, A&A 474, 653; Gaia EDR3 for μ, φ and q),
converted at 3261.56 ly per arcsecond. `precision` is the rounding in years for the departure date,
chosen from each parallax's uncertainty so the readout never claims more than the measurement does.
*/
export const velaStars = [
  { symbol: "γ", name: "Regor", catalogue: "γ Velorum", magnitude: 1.75, distanceLy: 1117, precision: 100, x: 12, y: 42, delay: "-2.7s", duration: "11.1s" },
  { symbol: "δ", name: "Alsephina", catalogue: "δ Velorum", magnitude: 1.96, distanceLy: 81, precision: 1, x: 29, y: 76, delay: "-6.9s", duration: "12.3s" },
  { symbol: "κ", name: "Markeb", catalogue: "κ Velorum", magnitude: 2.47, distanceLy: 572, precision: 25, x: 47, y: 78, delay: "-4.4s", duration: "10.2s" },
  { symbol: "φ", name: "Phi Velorum", catalogue: "φ Velorum", magnitude: 3.54, distanceLy: 1714, precision: 100, x: 64, y: 75, delay: "-7.8s", duration: "11.7s" },
  { symbol: "μ", name: "Mu Velorum", catalogue: "μ Velorum", magnitude: 2.69, distanceLy: 112, precision: 1, x: 88, y: 52, delay: "-1.4s", duration: "12.9s" },
  { symbol: "q", name: "q Velorum", catalogue: "q Velorum", magnitude: 3.85, distanceLy: 103, precision: 1, x: 73, y: 19, delay: "-5.6s", duration: "10.7s" },
  { symbol: "ψ", name: "Psi Velorum", catalogue: "ψ Velorum", magnitude: 3.6, distanceLy: 61, precision: 1, x: 51, y: 12, delay: "-9.2s", duration: "13.4s" },
  { symbol: "λ", name: "Suhail", catalogue: "λ Velorum", magnitude: 2.21, distanceLy: 545, precision: 10, x: 40, y: 25, delay: "-3.5s", duration: "11.4s" },
] as const;

export type VelaStar = (typeof velaStars)[number];

export const velaConnections = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [6, 7],
  [7, 0],
] as const;

/** "This light left it in 1945." / "around 1480" / "around 900 CE". */
export function lightDeparture(star: VelaStar, now = new Date()): string {
  const raw = now.getFullYear() - star.distanceLy;
  const year = Math.round(raw / star.precision) * star.precision;
  const label = year <= 0 ? `${Math.abs(year - 1)} BCE` : year < 1000 ? `${year} CE` : `${year}`;
  return star.precision === 1 ? `This light left it in ${label}.` : `This light left it around ${label}.`;
}
