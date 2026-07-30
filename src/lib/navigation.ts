// One source of truth for the nav. The Spotlight template hardcoded this list in
// three places (mobile nav, desktop nav, footer) and they had already drifted —
// the footer was missing Articles.
export const navigation = [
  { href: '/about', label: 'About' },
  { href: '/articles', label: 'Articles' },
  { href: '/projects', label: 'Projects' },
]

// The CV page exists and is linked from About and the footer, but stays out of
// the header nav.
export const footerNavigation = [...navigation, { href: '/cv', label: 'CV' }]
