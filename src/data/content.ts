// All real content for Sumiyabazar's portfolio, framed through the forge metaphor.

export const identity = {
  name: 'Sumiyabazar',
  firstName: 'SUMIYA',
  lastName: 'BAZAR',
  role: 'Fullstack Engineer',
  location: 'Ulaanbaatar, Mongolia',
  tagline:
    'I forge entire production platforms solo — insurance ecosystems, real-money gaming, AI-driven claims.',
  email: 'bazarbazar821@gmail.com',
  gitlab: 'https://gitlab.com/bazarbazar821',
}

export const creed = [
  'I build things that',
  'last',
  'and have real',
  'substance.',
]

export const creedBody =
  'No eye-wash projects. No corner-cutting. Every platform here runs in production with real users and real money.'

export const about = {
  lines: [
    "I'm Sumiyabazar — a fullstack engineer from Ulaanbaatar, Mongolia, born in 2003.",
    'Since January 2025 I have been the sole engineer behind an InsureTech company’s entire product: backend, frontend, mobile, infrastructure and the database underneath it all.',
    'I build things that last and have real substance — no eye-wash projects, no corner-cutting. Every platform on this page runs in production with real users and real money.',
    "Right now I'm expanding into native mobile with Kotlin and Jetpack Compose, and aiming at the kind of senior engineering judgment that survives the AI era.",
  ],
  facts: [
    { k: 'BASE', v: 'Ulaanbaatar, Mongolia' },
    { k: 'ROLE', v: 'Solo fullstack engineer, InsureTech' },
    { k: 'SINCE', v: 'January 2025' },
    { k: 'NOW', v: 'Kotlin / Compose, Flutter' },
  ],
}

// Each "station" is a forge workstation = a skill domain.
export const stations = [
  { no: '01', name: 'Backend', tools: ['Go', 'Fiber', 'Node.js', 'Express', 'REST APIs'] },
  { no: '02', name: 'Frontend', tools: ['Vue / Nuxt 3', 'React / Next.js', 'Tailwind', 'NuxtUI', 'shadcn/ui'] },
  { no: '03', name: 'Data', tools: ['PostgreSQL', 'MySQL', 'Prisma', 'Drizzle', 'GORM'] },
  { no: '04', name: 'Infra', tools: ['Docker', 'Nginx', 'PM2', 'VPS ops', 'GitLab CI'] },
  { no: '05', name: 'AI & Automation', tools: ['OpenAI API', 'RAG pipelines', 'n8n', 'AI claim estimation'] },
  { no: '06', name: 'Mobile', tools: ['Kotlin', 'Jetpack Compose', 'Material 3', 'Flutter (learning)'] },
]

export const marquee = [
  'Go', 'TypeScript', 'Vue / Nuxt', 'React / Next.js', 'PostgreSQL',
  'Prisma', 'Docker', 'Kotlin', 'OpenAI API', 'n8n',
]

export type Blade = {
  id: string
  index: string
  name: string
  kicker: string
  tagline: string
  url?: string
  description: string
  stats: { value: string; label: string }[]
  features: string[]
  stack: string[]
  accent: string // hex for the blade's heat color
}

// Major case studies = the signature blades pulled from the fire.
export const blades: Blade[] = [
  {
    id: 'insure',
    index: '01',
    name: 'Insure Platform',
    kicker: 'THE OPERATING SYSTEM',
    tagline: "The operating system for Mongolia's insurance industry",
    description:
      'A multi-stakeholder ecosystem where brokers, insurers, loss adjusters and customers transact in one network — contracts, claims, damage assessment, payments and regulator sync, built and run by one engineer.',
    stats: [
      { value: '110+', label: 'database tables' },
      { value: '82', label: 'API handlers' },
      { value: '394', label: 'Vue components' },
      { value: '9+', label: 'integrations' },
    ],
    features: [
      'Multi-tenant ecosystem with RBAC across 41 route groups',
      'Regulator integration for vehicle liability policies (AJDH)',
      'Three-layer auth + AES-256 encryption (JWTs, HMAC, sessions)',
      'Real-time WebSocket event hub',
      'Payment orchestration via QPay + invoicing',
      'Insure Mobile — Kotlin / Jetpack Compose Android app',
      'AI Estimation Service as a Go microservice',
      'Document service with PDF rendering',
    ],
    stack: ['Go', 'Fiber', 'GORM', 'PostgreSQL', 'Nuxt 3', 'Tailwind', 'Kotlin / Compose'],
    accent: '#ff7a2a',
  },
  {
    id: 'dbox',
    index: '02',
    name: 'DreamBox',
    kicker: 'REAL MONEY, REAL USERS',
    tagline: 'Live loot-case platform with real money and real users',
    url: 'https://dbox.mn',
    description:
      'A CS2 loot-case platform running in production: players open cases, win skins and withdraw them through a fully automated Steam trade bot. Real payments, real inventory, real operational stakes.',
    stats: [
      { value: '5000+', label: 'registered players' },
      { value: '169', label: 'automated tests' },
      { value: '4', label: 'auth layers' },
      { value: '23+', label: 'admin routes' },
    ],
    features: [
      'Steam trade bot — TOTP, refresh tokens, dispatch queue',
      'Real-money wallet — QPay, transactional ledger, audit trail',
      'Case engine with rarity tiers and stock modeling',
      'Defense in depth — 4 independent auth layers',
      'Live updates over Server-Sent Events',
      'Production discipline — 169 tests, PM2, migration policy',
    ],
    stack: ['Next.js 16', 'React 19', 'Express', 'Prisma', 'PostgreSQL', 'Zustand', 'Framer Motion'],
    accent: '#9b7bff',
  },
]

// Smaller projects = a rack of finished blades.
export const rack = [
  {
    name: 'Hunt Digital',
    description:
      "Mongolia's hunting and fishing license platform — multi-role access, enforcement tooling, full i18n.",
    stack: ['Go', 'Next.js 15', 'PostgreSQL'],
  },
  {
    name: 'AI Insurance Claims',
    description: 'Intelligent claim processing with AI assessment automation and fraud signals.',
    stack: ['Go', 'Next.js', 'OpenAI API'],
  },
  {
    name: 'Vet Clinic Manager',
    description: 'Multi-tenant veterinary clinic suite — appointments, invoicing, inventory.',
    stack: ['React 19', 'Express', 'Drizzle'],
  },
  {
    name: 'Auction',
    description: 'Full-stack auction marketplace with real-time bidding and Dockerized CI/CD.',
    stack: ['Go', 'Next.js', 'Docker'],
  },
]

export const sections = [
  { id: 'ignition', label: 'Ignition' },
  { id: 'creed', label: 'Creed' },
  { id: 'stations', label: 'Stations' },
  { id: 'blades', label: 'Blades' },
  { id: 'rack', label: 'The Rack' },
  { id: 'smith', label: 'The Smith' },
  { id: 'temper', label: 'Temper' },
]
