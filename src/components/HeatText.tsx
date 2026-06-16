import { useEffect, useRef, type ElementType, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Props = {
  text: string
  as?: ElementType
  className?: string
  /** delay between characters */
  stagger?: number
  /** start animation on mount instead of on scroll-into-view */
  immediate?: boolean
  delay?: number
  /** fill each glyph with the molten gradient (per-char background-clip) */
  molten?: boolean
  children?: ReactNode
}

/**
 * Splits `text` into per-character spans and reveals them with a "heat" motion:
 * each glyph rises from below, unblurs, and flares with an ember glow that then
 * cools to steel. Driven by GSAP, triggered when the element scrolls into view.
 */
export default function HeatText({
  text,
  as,
  className = '',
  stagger = 0.035,
  immediate = false,
  delay = 0,
  molten = false,
}: Props) {
  const charClass = molten ? 'char text-molten' : 'char'
  const ref = useRef<HTMLElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag = (as ?? 'span') as any

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const chars = el.querySelectorAll<HTMLElement>('.char')
    if (!chars.length) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      gsap.set(chars, { opacity: 1, y: 0, filter: 'blur(0px)' })
      return
    }

    gsap.set(chars, {
      opacity: 0,
      yPercent: 115,
      filter: 'blur(14px)',
      textShadow: '0 0 24px rgba(255,140,40,0.9)',
    })

    const tl = gsap.timeline({
      delay,
      defaults: { ease: 'power3.out' },
      scrollTrigger: immediate
        ? undefined
        : { trigger: el, start: 'top 85%', once: true },
    })

    tl.to(chars, {
      opacity: 1,
      yPercent: 0,
      filter: 'blur(0px)',
      duration: 1.1,
      stagger,
    }).to(
      chars,
      {
        textShadow: '0 0 0px rgba(255,140,40,0)',
        duration: 1.4,
        stagger,
        ease: 'power2.out',
      },
      0.25,
    )

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [delay, immediate, stagger, text])

  // Preserve spaces as non-breaking so layout stays intact.
  const words = text.split(' ')

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap" aria-hidden="true">
          {word.split('').map((ch, ci) => (
            <span key={ci} className={charClass}>
              {ch}
            </span>
          ))}
          {wi < words.length - 1 && <span className={charClass}>&nbsp;</span>}
        </span>
      ))}
    </Tag>
  )
}
