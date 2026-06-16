import HeatText from '../components/HeatText'
import Reveal from '../components/Reveal'
import { stations } from '../data/content'

export default function Stations() {
  return (
    <section id="stations" className="relative px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-[1800px]">
        <div className="mb-16 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-ash">
              <span className="text-ember">/</span> The Workshop
            </p>
            <HeatText
              as="h2"
              text="Six stations"
              className="font-display text-[clamp(2.2rem,6vw,4.5rem)] font-semibold leading-none tracking-[-0.02em] text-steel"
            />
          </div>
          <p className="max-w-sm text-base leading-relaxed text-ash">
            Every production system passes through the same fire — from the metal
            of the backend to the finish of the interface.
          </p>
        </div>

        <Reveal stagger className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {stations.map((s) => (
            <div
              key={s.no}
              className="steel-surface group relative flex flex-col gap-5 p-7 transition-colors hover:bg-iron/40"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs tracking-[0.2em] text-ember/80">
                  ST·{s.no}
                </span>
                <span className="size-2 rounded-full bg-line transition-all duration-300 group-hover:bg-ember group-hover:shadow-[0_0_12px_2px_rgba(255,106,26,0.6)]" />
              </div>
              <h3 className="font-display text-2xl font-semibold tracking-tight text-steel">
                {s.name}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {s.tools.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-line/80 bg-void/40 px-3 py-1 font-mono text-[11px] text-ash transition-colors group-hover:border-ember/30 group-hover:text-steel/90"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
