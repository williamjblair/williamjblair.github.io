import nextMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  // GitHub Pages serves plain files, so everything is prerendered at build time.
  output: 'export',
  // The image optimizer needs a server; without this `next build` refuses to export.
  images: { unoptimized: true },
  trailingSlash: true,
}

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: ['remark-gfm'],
    rehypePlugins: ['@mapbox/rehype-prism'],
  },
})

export default withMDX(nextConfig)
