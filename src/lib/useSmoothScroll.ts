import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { scrollState } from './scrollState'

gsap.registerPlugin(ScrollTrigger)

/**
 * Initializes Lenis smooth scrolling and binds it to GSAP's ticker so that
 * ScrollTrigger and Lenis share a single, synchronized scroll position.
 * Also pushes progress/velocity into the shared scrollState for the 3D layer.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !reduce,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    })

    lenis.on('scroll', (e: { progress: number; velocity: number }) => {
      scrollState.progress = e.progress
      scrollState.velocity = e.velocity
      ScrollTrigger.update()
    })

    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    // Let images/fonts settle, then recalc trigger positions.
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    const t = window.setTimeout(refresh, 600)

    return () => {
      gsap.ticker.remove(raf)
      window.removeEventListener('load', refresh)
      window.clearTimeout(t)
      lenis.destroy()
    }
  }, [])
}
