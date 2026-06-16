import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { creedBody } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

const WORDS = [
  { t: 'I build things that', em: false },
  { t: 'last', em: true },
  { t: 'and have real', em: false },
  { t: 'substance', em: true },
]

export default function Creed() {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lines = el.querySelectorAll<HTMLElement>('[data-line]')

    if (reduce) {
      gsap.set(lines, { opacity: 1, y: 0 })
      return
    }

    gsap.set(lines, { opacity: 0.12 })
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top top',
        end: '+=140%',
        pin: true,
        scrub: 0.6,
      },
    })
    lines.forEach((line) => {
      tl.to(line, { opacity: 1, ease: 'none' }, '>')
        .to(line, { opacity: 1, duration: 0.4 })
    })
    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [])

  return (
    <section id="creed" className="relative">
      <div
        ref={root}
        className="flex min-h-[100svh] items-center justify-center overflow-hidden px-5 sm:px-8"
      >
        <div className="mx-auto max-w-5xl">
          <p className="mb-10 font-mono text-[11px] uppercase tracking-[0.28em] text-ash">
            <span className="text-ember">/</span> The Creed
          </p>
          <h2 className="font-display text-[clamp(2.2rem,7vw,5.5rem)] font-semibold leading-[1.04] tracking-[-0.02em]">
            {WORDS.map((w, i) => (
              <span
                key={i}
                data-line
                className={`inline ${w.em ? 'text-molten glow-ember' : 'text-steel'}`}
              >
                {w.t}{' '}
              </span>
            ))}
          </h2>
          <p data-line className="mt-10 max-w-xl text-lg leading-relaxed text-ash">
            {creedBody}
          </p>
        </div>
      </div>
    </section>
  )
}
