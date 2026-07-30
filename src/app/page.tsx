import Link from 'next/link'

import { Asterism } from '@/components/Asterism'
import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import { GitHubIcon, LinkedInIcon } from '@/components/SocialIcons'
import { type ArticleWithSlug, getAllArticles } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'

function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

function Article({ article }: { article: ArticleWithSlug }) {
  return (
    <Card as="article">
      <Card.Title href={`/articles/${article.slug}`}>
        {article.title}
      </Card.Title>
      <Card.Eyebrow as="time" dateTime={article.date} decorate>
        {formatDate(article.date)}
      </Card.Eyebrow>
      <Card.Description>{article.description}</Card.Description>
    </Card>
  )
}

function SocialLink({
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-teal-500 dark:fill-zinc-400 dark:group-hover:fill-teal-400" />
    </Link>
  )
}

export default async function Home() {
  let articles = (await getAllArticles()).slice(0, 3)

  return (
    <Container className="mt-9">
      <div className="grid grid-cols-1 items-start gap-x-12 gap-y-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="max-w-2xl">
          <h1 className="text-4xl tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-100">
            Building the substrate that lets scientific knowledge compound.
          </h1>
          <p className="mt-7 text-base text-zinc-600 dark:text-zinc-400">
            I’m Will, a fellow at Episteme, a Bell Labs–style research
            organization in San Francisco, where I build Atlas. Alongside it I
            work on Vela, an open protocol that turns scientific papers into
            structured, correctable findings, and write about that work at
            Borrowed Light.
          </p>
          <div className="mt-7 flex gap-6">
            <SocialLink
              href="https://github.com/williamjblair"
              aria-label="Follow on GitHub"
              icon={GitHubIcon}
            />
            <SocialLink
              href="https://www.linkedin.com/in/willblair1"
              aria-label="Follow on LinkedIn"
              icon={LinkedInIcon}
            />
            <SocialLink
              href="mailto:william.blair0708@gmail.com"
              aria-label="Email Will"
              icon={MailIcon}
            />
          </div>
        </div>

        <Asterism className="max-lg:hidden" />
      </div>

      <div className="mt-20 max-w-2xl sm:mt-24">
        <h2 className="font-sans text-xs font-medium tracking-[0.14em] text-zinc-500 uppercase dark:text-zinc-400">
          Writing
        </h2>
        <div className="rule-gold mt-3" />
        <div className="mt-10 flex flex-col gap-14">
          {articles.map((article) => (
            <Article key={article.slug} article={article} />
          ))}
        </div>
        <Link
          href="/articles"
          className="mt-12 inline-flex font-sans text-sm font-medium text-zinc-500 transition hover:text-teal-500 dark:text-zinc-400 dark:hover:text-teal-400"
        >
          All writing →
        </Link>
      </div>
    </Container>
  )
}
