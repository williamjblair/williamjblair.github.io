import { Feed } from 'feed'

import { getAllArticles } from '@/lib/articles'

// The template shipped a version of this route that read `req.url`, used the
// webpack-only `require.context`, and fetched its own pages over HTTP to scrape
// them with cheerio. None of that survives `output: 'export'`: there is no
// request, Next 16 builds with Turbopack, and nothing is listening during the
// build. This builds the feed straight from article metadata instead.
export const dynamic = 'force-static'

export async function GET() {
  let siteUrl = process.env.NEXT_PUBLIC_SITE_URL

  if (!siteUrl) {
    throw Error('Missing NEXT_PUBLIC_SITE_URL environment variable')
  }

  let author = {
    name: 'Will Blair',
    email: 'william.blair0708@gmail.com',
    link: siteUrl,
  }

  let feed = new Feed({
    title: author.name,
    description:
      'Writing on scientific infrastructure and how knowledge compounds.',
    author,
    id: siteUrl,
    link: siteUrl,
    language: 'en',
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    feedLinks: {
      rss2: `${siteUrl}/feed.xml`,
    },
  })

  for (let article of await getAllArticles()) {
    let publicUrl = `${siteUrl}/articles/${article.slug}/`

    feed.addItem({
      title: article.title,
      id: publicUrl,
      link: publicUrl,
      description: article.description,
      author: [author],
      contributor: [author],
      date: new Date(`${article.date}T00:00:00Z`),
    })
  }

  return new Response(feed.rss2(), {
    status: 200,
    headers: {
      'content-type': 'application/xml',
    },
  })
}
