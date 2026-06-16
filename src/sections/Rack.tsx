import HeatText from '../components/HeatText'
import Reveal from '../components/Reveal'
import { rack } from '../data/content'
import { Hammer } from '../components/icons'

export default function Rack() {
  return (
    <section id="rack" className="relative px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-ash">
            <span className="text-ember">/</span> The Rack
          </p>
          <HeatText
            as="h2"
            text="More on the wall"
            className="font-display text-[clamp(2.2rem,6vw,4.5rem)] font-semibold leading-none tracking-[-0.02em] text-steel"
          />
        </div>

        <Reveal stagger className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
          {rack.map((p, i) => (
            <div
              key={p.name}
              className="group relative flex flex-col gap-4 bg-coal p-8 transition-colors hover:bg-iron/50"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-ember/70">
                  0{i + 1}
                </span>
                <Hammer
                  width={18}
                  height={18}
                  className="text-ash/40 transition-all duration-300 group-hover:text-ember group-hover:rotate-[-12deg]"
                />
              </div>
              <h3 className="font-display text-2xl font-semibold tracking-tight text-steel">
                {p.name}
              </h3>
              <p className="text-sm leading-relaxed text-ash">{p.description}</p>
              <div className="mt-auto flex flex-wrap gap-2 pt-2">
                {p.stack.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-line bg-void/40 px-2.5 py-1 font-mono text-[10px] text-ash"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
