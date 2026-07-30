import { type Metadata } from 'next'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { getAllArticles } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'

// Some of the writing lives on borrowedlight.org, where it has its own figures
// and typography. Rather than fork it, the index lists it alongside the posts
// that live here and links out.
const externalArticles = [
  {
    title: 'Constellations of Borrowed Light',
    date: '2026-01-08',
    description:
      'The case for a shared scientific substrate: why the bottleneck in science has moved from producing knowledge to inheriting it, and what a frontier you can actually build on would have to look like.',
    href: 'https://borrowedlight.org/constellations',
    source: 'borrowedlight.org',
  },
]

interface Entry {
  key: string
  title: string
  date: string
  description: string
  href: string
  source?: string
}

function Article({ entry }: { entry: Entry }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={entry.href}>{entry.title}</Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={entry.date}
          className="md:hidden"
          decorate
        >
          {formatDate(entry.date)}
        </Card.Eyebrow>
        <Card.Description>{entry.description}</Card.Description>
        <Card.Cta>
          {entry.source ? `Read on ${entry.source}` : 'Read article'}
        </Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={entry.date}
        className="mt-1 max-md:hidden"
      >
        {formatDate(entry.date)}
      </Card.Eyebrow>
    </article>
  )
}

export const metadata: Metadata = {
  title: 'Articles',
  description:
    'Writing on scientific infrastructure, and on why what a field knows so rarely reaches the person who needs it.',
}

export default async function ArticlesIndex() {
  let local: Array<Entry> = (await getAllArticles()).map((article) => ({
    key: article.slug,
    title: article.title,
    date: article.date,
    description: article.description,
    href: `/articles/${article.slug}`,
  }))

  let external: Array<Entry> = externalArticles.map((article) => ({
    key: article.href,
    ...article,
  }))

  let entries = [...local, ...external].sort(
    (a, z) => +new Date(z.date) - +new Date(a.date),
  )

  return (
    <SimpleLayout
      title="Writing"
      intro="Mostly on one question: why what a field already knows so rarely reaches the person who needs it. The longer essays live at borrowedlight.org and are linked here."
    >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {entries.map((entry) => (
            <Article key={entry.key} entry={entry} />
          ))}
        </div>
      </div>
    </SimpleLayout>
  )
}
