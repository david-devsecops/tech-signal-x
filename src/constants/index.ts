// Application constants

export const APP_CONFIG = {
  defaultLanguage: 'ko' as const,
  supportedLanguages: ['ko', 'en'] as const,
  newsletter: {
    monthlyFrequency: true,
    privacyPolicy: true,
  },
  performance: {
    memoization: true,
    lazyLoading: true,
  },
} as const

export const NAVIGATION_ITEMS = [
  { href: '#about', key: 'nav.about' },
  { href: '#projects', key: 'nav.projects' },
  { href: '#blog', key: 'nav.blog' },
  { href: '#newsletter', key: 'nav.newsletter' },
] as const

export const ARIA_LABELS = {
  mobileMenuToggle: {
    open: 'Open mobile menu',
    close: 'Close mobile menu',
  },
  navigation: {
    main: 'Main navigation',
    mobile: 'Mobile navigation',
  },
  form: {
    newsletter: 'Newsletter subscription form',
    subscribe: 'Subscribe to newsletter',
  },
  sections: {
    about: 'Go to About section',
    projects: 'Go to Projects section',
    blog: 'Go to Blog section',
    newsletter: 'Go to Newsletter section',
  },
} as const