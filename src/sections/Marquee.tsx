import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { marquee } from '../data/content'
import { Spark } from '../components/icons'

export default function Marquee() {
  const track = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = track.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    // translate by half (content is duplicated) for a seamless loop
    const tween = gsap.to(el, {
      xPercent: -50,
      duration: 28,
      ease: 'none',
      repeat: -1,
    })
    return () => {
      tween.kill()
    }
  }, [])

  const items = [...marquee, ...marquee]

  return (
    <div className="relative overflow-hidden border-y border-line/70 bg-coal/60 py-6">
      <div ref={track} className="flex w-max items-center gap-10 whitespace-nowrap will-change-transform">
        {items.map((m, i) => (
          <div key={i} className="flex items-center gap-10">
            <span className="font-display text-xl font-medium tracking-tight text-steel/80">
              {m}
            </span>
            <Spark width={14} height={14} className="text-ember/70" />
          </div>
        ))}
      </div>
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-void to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-void to-transparent" />
    </div>
  )
}
