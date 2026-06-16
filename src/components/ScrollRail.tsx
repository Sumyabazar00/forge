import { useEffect, useRef, useState } from 'react'
import { sections } from '../data/content'
import { scrollState } from '../lib/scrollState'

export default function ScrollRail() {
  const [active, setActive] = useState(0)
  const fillRef = useRef<HTMLDivElement>(null)
  const topBarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = sections.findIndex((s) => s.id === e.target.id)
            if (idx >= 0) setActive(idx)
          }
        })
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    let raf = 0
    const loop = () => {
      const p = scrollState.progress
      if (fillRef.current) fillRef.current.style.transform = `scaleY(${p})`
      if (topBarRef.current) topBarRef.current.style.transform = `scaleX(${p})`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <>
      {/* mobile top progress bar */}
      <div className="fixed inset-x-0 top-0 z-40 h-[2px] bg-line/40 lg:hidden">
        <div
          ref={topBarRef}
          className="h-full origin-left bg-gradient-to-r from-forge-deep via-ember to-whitehot"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>

      {/* desktop vertical heat gauge */}
      <aside className="fixed right-7 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
        <div className="relative flex flex-col items-center gap-4">
          <div className="relative h-44 w-[2px] overflow-hidden rounded-full bg-line/60">
            <div
              ref={fillRef}
              className="absolute inset-x-0 bottom-0 top-0 origin-top bg-gradient-to-b from-whitehot via-ember to-forge-deep"
              style={{ transform: 'scaleY(0)' }}
            />
          </div>
          <ul className="flex flex-col items-end gap-3">
            {sections.map((s, i) => (
              <li key={s.id} className="flex items-center gap-2.5">
                <span
                  className={`font-mono text-[9px] uppercase tracking-[0.18em] transition-all duration-300 ${
                    i === active ? 'text-ember-bright opacity-100' : 'text-ash opacity-0'
                  }`}
                >
                  {s.label}
                </span>
                <a
                  href={`#${s.id}`}
                  aria-label={s.label}
                  className={`block size-1.5 rounded-full transition-all duration-300 ${
                    i === active ? 'scale-150 bg-ember shadow-[0_0_10px_2px_rgba(255,106,26,0.7)]' : 'bg-line'
                  }`}
                />
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  )
}
