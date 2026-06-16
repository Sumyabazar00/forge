import { useEffect, useState } from 'react'
import { Anvil } from './icons'

/** Short cinematic preloader: a bar "heats up", then the curtain lifts. */
export default function Loader() {
  const [gone, setGone] = useState(false)
  const [lift, setLift] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const liftT = window.setTimeout(() => setLift(true), reduce ? 200 : 1500)
    const goneT = window.setTimeout(() => setGone(true), reduce ? 500 : 2300)
    return () => {
      window.clearTimeout(liftT)
      window.clearTimeout(goneT)
    }
  }, [])

  if (gone) return null

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        lift ? '-translate-y-full' : ''
      }`}
    >
      <div className="flex flex-col items-center gap-6">
        <Anvil width={34} height={34} className="text-ember glow-ember" />
        <div className="h-[2px] w-44 overflow-hidden rounded-full bg-line">
          <div className="h-full origin-left animate-[heat_1.4s_ease-out_forwards] bg-gradient-to-r from-forge-deep via-ember to-whitehot" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ash">
          Stoking the fire
        </span>
      </div>
      <style>{`@keyframes heat { from { transform: scaleX(0) } to { transform: scaleX(1) } }`}</style>
    </div>
  )
}
