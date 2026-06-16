import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeatText from '../components/HeatText'
import { identity } from '../data/content'
import { ArrowDown } from '../components/icons'
import heroImg from '../assets/forge/hero.webp'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const root = useRef<HTMLElement>(null)
  const bg = useRef<HTMLDivElement>(null)
  const meta = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // entrance for tagline + meta
    gsap.fromTo(
      meta.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, delay: 1.1, ease: 'power3.out' },
    )

    if (reduce) return
    // parallax: background drifts + dims as you scroll past the hero
    const tl = gsap.to(bg.current, {
      yPercent: 18,
      scale: 1.12,
      filter: 'brightness(0.4)',
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
    })
    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [])

  return (
    <section
      id="ignition"
      ref={root}
      className="grain vignette relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* AI-forged backdrop */}
      <div
        ref={bg}
        className="absolute inset-0 will-change-transform"
        style={{
          backgroundImage: `url(${heroImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-void/80 via-void/45 to-void" />
      <div className="absolute inset-0 bg-gradient-to-r from-void/85 via-void/20 to-void/70" />
      {/* soft scrim anchored under the headline so molten text stays legible */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(70% 55% at 28% 52%, rgba(5,6,8,0.78), transparent 70%)',
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start [filter:drop-shadow(0_4px_28px_rgba(0,0,0,0.7))]">
          <div className="mb-7 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-ember-bright">
            <span className="inline-block h-px w-10 bg-ember/60" />
            Fullstack engineer · {identity.location}
          </div>

          <h1 className="font-display text-[clamp(3rem,13vw,11rem)] font-bold leading-[0.86] tracking-[-0.03em]">
            <HeatText text={identity.firstName} className="block glow-ember" molten immediate stagger={0.05} />
            <HeatText text={identity.lastName} className="block text-steel" immediate stagger={0.05} delay={0.35} />
          </h1>

          <div ref={meta} className="mt-9 max-w-2xl">
            <p className="font-serif text-2xl italic leading-snug text-steel/90 sm:text-3xl">
              I forge entire production platforms <span className="text-ember-bright not-italic font-sans font-medium">solo</span>.
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-ash sm:text-lg">
              Insurance ecosystems, real-money gaming, AI-driven claims — raw
              requirements hammered into systems that run in production with real
              users and real money.
            </p>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <a
        href="#creed"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-ash transition-colors hover:text-ember-bright"
      >
        Stoke the fire
        <ArrowDown className="animate-bounce" width={16} height={16} />
      </a>
    </section>
  )
}
