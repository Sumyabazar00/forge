import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Props = {
  children: ReactNode
  className?: string
  y?: number
  delay?: number
  /** stagger direct children instead of animating as one block */
  stagger?: boolean
}

/** Fade + rise a block (or its children) when it scrolls into view. */
export default function Reveal({ children, className = '', y = 40, delay = 0, stagger = false }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const targets = stagger ? (Array.from(el.children) as HTMLElement[]) : [el]
    if (reduce) {
      gsap.set(targets, { opacity: 1, y: 0 })
      return
    }
    gsap.set(targets, { opacity: 0, y })
    const tween = gsap.to(targets, {
      opacity: 1,
      y: 0,
      duration: 1,
      delay,
      ease: 'power3.out',
      stagger: stagger ? 0.09 : 0,
      scrollTrigger: { trigger: el, start: 'top 84%', once: true },
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [delay, stagger, y])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
