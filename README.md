# williamjblair.github.io

Personal site for Will Blair. Next.js 16 + Tailwind v4, statically exported and
served from GitHub Pages.

## Running it

```bash
npm ci
npm run dev
```

`.env.local` needs one variable, which is also set in the deploy workflow:

```
NEXT_PUBLIC_SITE_URL=https://williamjblair.github.io
```

## Deploying

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds and uploads
`out/` to GitHub Pages. Pages must be configured with **Build and deployment →
Source → GitHub Actions**, not the legacy branch source.

The build is `output: 'export'`, so a few things are load-bearing:

- `public/.nojekyll` stops Pages from running Jekyll, which would strip `_next/`
  and serve the site with no CSS or JS.
- `images: { unoptimized: true }` in `next.config.mjs`. The image optimizer needs
  a server, and `next build` refuses to export without this.
- `src/app/feed.xml/route.ts` is `force-static` and builds from article metadata.
  Do not reintroduce the template's version, which scraped its own pages over
  HTTP at build time.

## Content

- Site copy lives in the page files under `src/app/`.
- The nav is one array in `src/lib/navigation.ts`, consumed by both header navs
  and the footer.
- Articles are MDX at `src/app/articles/<slug>/page.mdx`, with an
  `export const article = { author, date, title, description }`. There is no YAML
  frontmatter; the slug is the directory name.
- Essays hosted elsewhere are listed in `externalArticles` in
  `src/app/articles/page.tsx` and link out.
- `src/app/cv/page.tsx` is hand-maintained. The source of record is
  `~/personal/cv/cv.yml`; update both when something changes.

## Provenance

Built on the Spotlight template from [Tailwind Plus](https://tailwindcss.com/plus),
used under the [Tailwind Plus license](https://tailwindcss.com/plus/license).
