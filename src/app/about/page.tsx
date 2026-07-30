import { type Metadata } from 'next'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import { GitHubIcon, LinkedInIcon } from '@/components/SocialIcons'

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

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

export const metadata: Metadata = {
  title: 'About',
  description:
    'Will Blair builds open infrastructure for scientific knowledge — Atlas at Episteme, and the Vela protocol.',
}

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="max-w-2xl">
        <div>
          <h1 className="text-4xl text-zinc-900 sm:text-5xl dark:text-zinc-100">
            How I got here.
          </h1>
          <div className="mt-8 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              I grew up in Toronto. I spent part of my childhood as a patient,
              and what stayed with me was narrow and specific: what was wrong
              with me had been knowable for months before anyone put it
              together. The knowledge existed. It was not anywhere it could be
              used.
            </p>
            <p>
              I studied cognitive science at Johns Hopkins and spent most of
              those years in labs — neuromodulation for epilepsy and
              Parkinson’s, hyaluronic acid hydrogels for delivering neural
              progenitor cells after ischemic stroke, handheld fluorescence
              imaging during breast cancer surgery. Different diseases,
              different departments, the same friction each time. What the field
              knew lived in PDFs and in the heads of the people who had done the
              work.
            </p>
            <p>
              Four companies since, in medical devices, clinical trials, and
              agent simulation, and now Atlas at Episteme. Every one of them hit
              the same ceiling. I could find the knowledge. I could not make it
              compound.
            </p>
            <p>
              That ceiling is the work now. Vela is a protocol that turns papers
              into structured, linked, correctable findings, so that a
              correction can actually propagate to the work depending on it.
              Borrowed Light is the writing around it. The name is from a
              friend, and it means roughly this: most of what matters in a life
              came from someone else, so the job is to pass it on in better
              shape than you got it.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-20 max-w-2xl sm:mt-24">
        <h2 className="font-sans text-xs font-medium tracking-[0.14em] text-zinc-500 uppercase dark:text-zinc-400">
          Elsewhere
        </h2>
        <div className="rule-gold mt-3" />
        <div className="mt-8">
          <ul role="list">
            <SocialLink href="https://github.com/williamjblair" icon={GitHubIcon}>
              Follow on GitHub
            </SocialLink>
            <SocialLink
              href="https://www.linkedin.com/in/willblair1"
              icon={LinkedInIcon}
              className="mt-4"
            >
              Follow on LinkedIn
            </SocialLink>
            <SocialLink
              href="mailto:william.blair0708@gmail.com"
              icon={MailIcon}
              className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
            >
              william.blair0708@gmail.com
            </SocialLink>
          </ul>
          <Link
            href="/cv"
            className="mt-8 inline-flex font-sans text-sm font-medium text-zinc-500 transition hover:text-teal-500 dark:text-zinc-400 dark:hover:text-teal-400"
          >
            Full CV →
          </Link>
        </div>
      </div>
    </Container>
  )
}
