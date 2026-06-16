import { useEffect, useState } from 'react'
import { identity } from '../data/content'
import { Anvil, ArrowUpRight } from './icons'

export default function Nav() {
  const [lifted, setLifted] = useState(false)

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        lifted ? 'py-3' : 'py-5'
      }`}
    >
      <div
        className={`mx-auto flex max-w-[1800px] items-center justify-between px-5 transition-all duration-500 sm:px-8 ${
          lifted ? 'opacity-100' : 'opacity-95'
        }`}
      >
        <a href="#ignition" className="group flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-md border border-line bg-iron/70 text-ember backdrop-blur transition-colors group-hover:border-ember/50">
            <Anvil width={18} height={18} />
          </span>
          <span className="font-display text-sm font-semibold tracking-tight text-steel">
            {identity.firstName}
            <span className="text-ash">{identity.lastName}</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 font-mono text-[11px] uppercase tracking-[0.18em] text-ash md:flex">
          <a href="#stations" className="transition-colors hover:text-steel">Stations</a>
          <a href="#blades" className="transition-colors hover:text-steel">Blades</a>
          <a href="#smith" className="transition-colors hover:text-steel">The Smith</a>
        </nav>

        <a
          href="#temper"
          className="group inline-flex items-center gap-1.5 rounded-full border border-ember/40 bg-ember/10 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ember-bright transition-all hover:bg-ember/20 hover:ring-1 hover:ring-ember/50"
        >
          Commission work
          <ArrowUpRight width={14} height={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </header>
  )
}
