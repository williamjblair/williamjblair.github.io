// Runs after `vite build`. The site is one client-rendered bundle, so every route shares index.html;
// this writes a copy per route with that route's own title, description, canonical URL and share card,
// plus the 404 page, the /cv redirect and the sitemap. Vercel and GitHub Pages then serve the same files.

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const SITE = (process.env.SITE_URL ?? "https://williamjblair.github.io").replace(/\/+$/, "");
const DIST = new URL("../dist/", import.meta.url).pathname;

const HOME_DESCRIPTION =
  "William Blair works on Vela, an open protocol that turns scientific papers into structured, correctable findings, and writes about science, poetry, and life.";
const HOME_IMAGE = { src: "/og.jpg", alt: "A night sky above watercolour clouds, with the name William Blair." };

const routes = [
  {
    path: "/",
    title: "William Blair",
    description: HOME_DESCRIPTION,
    image: HOME_IMAGE,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "William Blair",
      url: `${SITE}/`,
      description: HOME_DESCRIPTION,
      alumniOf: { "@type": "CollegeOrUniversity", name: "Johns Hopkins University" },
      sameAs: ["https://github.com/williamjblair", "https://www.linkedin.com/in/willblair1"],
    },
  },
  {
    path: "/about/",
    title: "How I got here — William Blair",
    // The page's own first sentences, verbatim.
    description:
      "I grew up in Toronto. I spent part of my childhood as a patient, and what stayed with me was narrow and specific: what was wrong with me had been knowable for months before anyone put it together.",
    image: HOME_IMAGE,
  },
  {
    path: "/constellations-of-borrowed-light/",
    title: "Constellations of Borrowed Light — William Blair",
    // The essay's opening line, verbatim.
    description: "When I was six years old, I was such a happy kid.",
    image: {
      src: "/og-constellations.jpg",
      alt: "Watercolour of a child sailing beneath a constellation over a mountain lake.",
    },
    type: "article",
    published: "2022-10-02",
  },
];

const escape = (value) =>
  value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

/** Replace one tag's attribute value, failing loudly if the tag has drifted out of index.html. */
function set(html, pattern, attribute, value) {
  const tag = html.match(pattern);
  if (!tag) throw new Error(`postbuild: no tag matching ${pattern}`);
  const next = tag[0].replace(new RegExp(`${attribute}="[^"]*"`), `${attribute}="${escape(value)}"`);
  return html.replace(tag[0], next);
}

const meta = (key) => new RegExp(`<meta (?:name|property)="${key.replace(/[:]/g, "\\$&")}"[^>]*>`);

function page(template, route) {
  const url = `${SITE}${route.path}`;
  const image = `${SITE}${route.image.src}`;
  let html = template.replace(/<title>[^<]*<\/title>/, `<title>${escape(route.title)}</title>`);
  html = set(html, meta("description"), "content", route.description);
  html = set(html, /<link rel="canonical"[^>]*>/, "href", url);
  html = set(html, meta("og:type"), "content", route.type ?? "website");
  html = set(html, meta("og:title"), "content", route.title);
  html = set(html, meta("og:description"), "content", route.description);
  html = set(html, meta("og:url"), "content", url);
  html = set(html, meta("og:image"), "content", image);
  html = set(html, meta("og:image:alt"), "content", route.image.alt);
  html = set(html, meta("twitter:title"), "content", route.title);
  html = set(html, meta("twitter:description"), "content", route.description);
  html = set(html, meta("twitter:image"), "content", image);
  html = set(html, meta("twitter:image:alt"), "content", route.image.alt);

  const extra = [];
  if (route.published) {
    extra.push(`<meta property="article:published_time" content="${route.published}" />`);
    extra.push(`<meta property="article:author" content="William Blair" />`);
  }
  if (route.jsonLd) {
    extra.push(`<script type="application/ld+json">${JSON.stringify(route.jsonLd)}</script>`);
  }
  return extra.length ? html.replace("</head>", `    ${extra.join("\n    ")}\n  </head>`) : html;
}

async function write(path, contents) {
  const file = join(DIST, path);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, contents);
}

const template = await readFile(join(DIST, "index.html"), "utf8");

for (const route of routes) {
  await write(route.path === "/" ? "index.html" : `${route.path}index.html`, page(template, route));
}

// GitHub Pages serves 404.html for unknown paths; the app renders its not-found page there.
let notFound = page(template, { ...routes[0], title: "Not found — William Blair" });
notFound = notFound.replace(/\s*<link rel="canonical"[^>]*>/, "");
notFound = notFound.replace("</head>", '    <meta name="robots" content="noindex" />\n  </head>');
await write("404.html", notFound);

// The CV became the About page.
await write(
  "cv/index.html",
  `<!doctype html><html lang="en"><meta charset="utf-8"><title>William Blair</title><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0; url=/about/"><link rel="canonical" href="${SITE}/about/"><script>location.replace("/about/")</script><p><a href="/about/">How I got here</a></p></html>\n`,
);

await write(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
    .map((route) => `  <url><loc>${SITE}${route.path}</loc></url>`)
    .join("\n")}\n</urlset>\n`,
);

console.log(`postbuild: wrote ${routes.length} pages, 404, /cv redirect and sitemap for ${SITE}`);
