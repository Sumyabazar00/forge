import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Counts up to the numeric part of `value` when scrolled into view,
 * preserving any prefix/suffix (e.g. "5000+", "110+").
 */
export default function Counter({ value, className = '' }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const match = value.match(/^(\D*)(\d[\d,]*)(.*)$/)
    if (!match) {
      el.textContent = value
      return
    }
    const [, prefix, numStr, suffix] = match
    const target = parseInt(numStr.replace(/,/g, ''), 10)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      el.textContent = value
      return
    }
    const obj = { n: 0 }
    const tween = gsap.to(obj, {
      n: target,
      duration: 1.6,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = prefix + Math.round(obj.n).toLocaleString() + suffix
      },
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [value])

  return <span ref={ref} className={className}>{value}</span>
}
