import type { SVGProps } from 'react'

const base = (p: SVGProps<SVGSVGElement>) => ({
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  ...p,
})

export const Anvil = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M3 8h12a4 4 0 0 1-4 4H9l-1 3h6l1 3H6l1-3" />
    <path d="M15 8l4-1v3" />
    <path d="M8 18h6" />
  </svg>
)

export const Spark = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l4 4M15 15l4 4M19 5l-4 4M9 15l-4 4" />
  </svg>
)

export const Hammer = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M14 4l6 6-3 3-6-6z" />
    <path d="M11 7L4 14a2 2 0 0 0 0 3l1 1a2 2 0 0 0 3 0l7-7" />
  </svg>
)

export const ArrowDown = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M12 4v16M6 14l6 6 6-6" />
  </svg>
)

export const ArrowUpRight = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M7 17L17 7M8 7h9v9" />
  </svg>
)

export const Mail = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
)

export const GitLab = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)} fill="currentColor" stroke="none">
    <path d="M12 21.5l3.2-9.8H8.8L12 21.5zM3.2 11.7L2 15.5a.8.8 0 0 0 .3.9l9.7 5.1-8.8-9.8zm17.6 0l-8.8 9.8 9.7-5.1a.8.8 0 0 0 .3-.9l-1.2-3.8zM12 21.5l3.2-9.8h4.4L17.4 4.6a.4.4 0 0 0-.8 0l-1.4 7.1H8.8L7.4 4.6a.4.4 0 0 0-.8 0L4.4 11.7h4.4L12 21.5z" />
  </svg>
)
