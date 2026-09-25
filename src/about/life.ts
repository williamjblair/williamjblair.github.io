/*
The About page's material. Every sentence of prose here is Will's own published writing, verbatim:
the four paragraphs of "How I got here." from his previous site (williamjblair.github.io, about page),
the Vela README, that site's home tagline, and the close of "Constellations of Borrowed Light".
Everything else is catalogue fact taken from the CV data and project READMEs. Nothing is invented.
*/

export type LifeStar = {
  key: string;
  label: string;
  year?: string;
  /** Position in the chart, as percentages of its width and height. */
  x: number;
  y: number;
  /** The frontier is not yet reached; it is drawn as an open star. */
  open?: boolean;
};

export const lifeStars: ReadonlyArray<LifeStar> = [
  { key: "toronto", label: "Toronto", x: 26, y: 3 },
  { key: "sickkids", label: "SickKids", x: 12, y: 13 },
  { key: "hopkins", label: "Johns Hopkins", year: "2019", x: 34, y: 27 },
  { key: "labs", label: "The labs", x: 16, y: 36 },
  { key: "thermobeat", label: "ThermoBeat", year: "2019", x: 40, y: 41 },
  { key: "biogenesis", label: "Biogenesis", year: "2023", x: 28, y: 50 },
  { key: "aaru", label: "Aaru", year: "2024", x: 42, y: 58 },
  { key: "episteme", label: "Episteme", year: "2025", x: 26, y: 66 },
  { key: "vela", label: "Vela", year: "2025", x: 12, y: 76 },
  { key: "erdos", label: "Erdős #730", year: "2026", x: 34, y: 85 },
  { key: "frontier", label: "The frontier", x: 20, y: 96, open: true },
];

/**
 * Lineage, not chronology: what each moment came from. The long arc from SickKids to Vela is the
 * page's spine ("The knowledge existed. It was not anywhere it could be used.").
 */
export const lifeEdges: ReadonlyArray<{ from: string; to: string; arc?: boolean }> = [
  { from: "toronto", to: "sickkids" },
  { from: "sickkids", to: "hopkins" },
  { from: "hopkins", to: "labs" },
  { from: "hopkins", to: "thermobeat" },
  { from: "thermobeat", to: "biogenesis" },
  { from: "biogenesis", to: "aaru" },
  { from: "aaru", to: "episteme" },
  { from: "episteme", to: "vela" },
  { from: "sickkids", to: "vela", arc: true },
  { from: "vela", to: "erdos" },
  { from: "vela", to: "frontier" },
  { from: "erdos", to: "frontier" },
];

export type ChapterNote = { title: string; meta: string; href?: string };

export type Chapter = {
  key: string;
  kicker: string;
  stars: ReadonlyArray<string>;
  /** Will's published words, verbatim. */
  text?: string;
  notes?: ReadonlyArray<ChapterNote>;
  link?: { label: string; href: string };
};

export const chapters: ReadonlyArray<Chapter> = [
  {
    key: "origin",
    kicker: "Toronto · SickKids",
    stars: ["toronto", "sickkids"],
    text: "I grew up in Toronto. I spent part of my childhood as a patient, and what stayed with me was narrow and specific: what was wrong with me had been knowable for months before anyone put it together. The knowledge existed. It was not anywhere it could be used.",
    link: { label: "Constellations of Borrowed Light", href: "/constellations-of-borrowed-light/" },
  },
  {
    key: "hopkins",
    kicker: "Johns Hopkins · 2019–2023",
    stars: ["hopkins", "labs"],
    text: "I studied cognitive science at Johns Hopkins and spent most of those years in labs — neuromodulation for epilepsy and Parkinson’s, hyaluronic acid hydrogels for delivering neural progenitor cells after ischemic stroke, handheld fluorescence imaging during breast cancer surgery. Different diseases, different departments, the same friction each time. What the field knew lived in PDFs and in the heads of the people who had done the work.",
  },
  {
    key: "companies",
    kicker: "Four companies",
    stars: ["thermobeat", "biogenesis", "aaru", "episteme"],
    text: "Four companies since, in medical devices, clinical trials, and agent simulation, and now Atlas at Episteme. Every one of them hit the same ceiling. I could find the knowledge. I could not make it compound.",
    notes: [
      { title: "ThermoBeat", meta: "Medical devices · 2019–23", href: "https://github.com/williamjblair/ThermoBeat" },
      { title: "Biogenesis", meta: "Clinical trials · 2023–24", href: "https://www.bayespredictive.com/" },
      { title: "Aaru", meta: "Agent simulation · 2024–25", href: "https://aaru.com/simulation" },
      { title: "Atlas at Episteme", meta: "Researcher intelligence · 2025–", href: "https://episteme.com/" },
    ],
  },
  {
    key: "vela",
    kicker: "Vela · 2025–",
    stars: ["vela"],
    text: "That ceiling is the work now. Vela is a protocol that turns papers into structured, linked, correctable findings, so that a correction can actually propagate to the work depending on it. Borrowed Light is the writing around it. The name is from a friend, and it means roughly this: most of what matters in a life came from someone else, so the job is to pass it on in better shape than you got it.",
    link: { label: "vela-science/vela", href: "https://github.com/vela-science/vela" },
  },
  {
    key: "proofs",
    kicker: "Erdős #730 · 2026",
    stars: ["erdos"],
    notes: [
      {
        title: "Infinitely many consecutive central binomial coefficients have identical prime support.",
        meta: "Kernel-proved in Lean 4 · registered with Palomar, 22 August 2026",
        href: "https://github.com/williamjblair/lean-proofs",
      },
    ],
  },
  {
    key: "frontier",
    kicker: "The frontier",
    stars: ["frontier"],
  },
];

export const frontier = {
  statement: "Building the substrate that lets scientific knowledge compound.",
  lines: ["Version control for scientific state.", "Scientific results that remain checkable, correctable, and useful."],
  closing:
    "I want the life I build from here to reflect the light I have received from so many others—and, in turn, to cast some of that light back into the constellations.",
};
