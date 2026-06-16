import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { blades, type Blade } from '../data/content'
import Counter from '../components/Counter'
import HeatText from '../components/HeatText'
import Reveal from '../components/Reveal'
import { ArrowUpRight } from '../components/icons'
import bladeImg from '../assets/forge/blade.webp'
import anvilImg from '../assets/forge/anvil.webp'

gsap.registerPlugin(ScrollTrigger)

const images: Record<string, string> = { insure: bladeImg, dbox: anvilImg }

function BladeCase({ blade, idx }: { blade: Blade; idx: number }) {
  const root = useRef<HTMLDivElement>(null)
  const img = useRef<HTMLImageElement>(null)
  const flip = idx % 2 === 1

  useEffect(() => {
    const el = root.current
    if (!el || !img.current) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const tween = gsap.fromTo(
      img.current,
      { yPercent: -12, scale: 1.18 },
      {
        yPercent: 12,
        scale: 1.05,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    )
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return (
    <article ref={root} className="relative border-t border-line/60 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        {/* visual */}
        <div className={`relative overflow-hidden rounded-2xl border border-line ${flip ? 'lg:order-2' : ''}`}>
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              ref={img}
              src={images[blade.id]}
              alt={`${blade.name} — forged`}
              className="absolute inset-0 h-full w-full object-cover will-change-transform"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent" />
            <div
              className="absolute inset-0 mix-blend-color opacity-30"
              style={{ background: blade.accent }}
            />
            <div className="absolute bottom-5 left-5 font-mono text-[11px] uppercase tracking-[0.2em] text-steel/80">
              <span style={{ color: blade.accent }}>●</span> Blade No.{blade.index}
            </div>
          </div>
        </div>

        {/* content */}
        <div className={`[filter:drop-shadow(0_2px_22px_rgba(5,6,8,0.92))] ${flip ? 'lg:order-1' : ''}`}>
          <p
            className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em]"
            style={{ color: blade.accent }}
          >
            {blade.kicker}
          </p>
          <HeatText
            as="h3"
            text={blade.name}
            className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-none tracking-[-0.02em] text-steel"
          />
          <p className="mt-5 font-serif text-xl italic leading-snug text-steel/85">
            {blade.tagline}
          </p>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ash">
            {blade.description}
          </p>

          {/* stats */}
          <div className="mt-9 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
            {blade.stats.map((s) => (
              <div key={s.label} className="bg-coal px-4 py-4">
                <Counter
                  value={s.value}
                  className="font-display text-2xl font-bold text-steel"
                />
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ash">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* features */}
          <Reveal stagger className="mt-8 grid gap-2.5">
            {blade.features.map((f) => (
              <div key={f} className="flex items-start gap-3 text-sm text-steel/85">
                <span
                  className="mt-[7px] size-1.5 shrink-0 rounded-full"
                  style={{ background: blade.accent }}
                />
                {f}
              </div>
            ))}
          </Reveal>

          {/* stack + link */}
          <div className="mt-8 flex flex-wrap items-center gap-2">
            {blade.stack.map((t) => (
              <span
                key={t}
                className="rounded-full border border-line bg-iron/40 px-3 py-1 font-mono text-[11px] text-ash"
              >
                {t}
              </span>
            ))}
            {blade.url && (
              <a
                href={blade.url}
                target="_blank"
                rel="noreferrer"
                className="group ml-1 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-ember-bright transition-colors hover:text-whitehot"
              >
                {blade.url.replace('https://', '')}
                <ArrowUpRight width={13} height={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

export default function Blades() {
  return (
    <section id="blades" className="relative px-0 py-12">
      <div className="mx-auto mb-4 max-w-7xl px-5 sm:px-8">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-ash">
          <span className="text-ember">/</span> The Blades
        </p>
        <HeatText
          as="h2"
          text="Pulled from the fire"
          className="font-display text-[clamp(2.2rem,6vw,4.5rem)] font-semibold leading-none tracking-[-0.02em] text-steel"
        />
        <p className="mt-5 max-w-xl text-base leading-relaxed text-ash">
          The two systems I keep alive in production — each one built, shipped and
          operated end to end by a single engineer.
        </p>
      </div>
      {blades.map((b, i) => (
        <BladeCase key={b.id} blade={b} idx={i} />
      ))}
    </section>
  )
}
