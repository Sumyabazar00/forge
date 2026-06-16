import HeatText from '../components/HeatText'
import Reveal from '../components/Reveal'
import { about } from '../data/content'
import pourImg from '../assets/forge/pour.webp'

export default function Smith() {
  return (
    <section id="smith" className="relative overflow-hidden px-5 py-28 sm:px-8 sm:py-36">
      {/* faint molten pour backdrop */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-20 mix-blend-screen"
        style={{
          backgroundImage: `url(${pourImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          maskImage: 'linear-gradient(to left, black, transparent)',
          WebkitMaskImage: 'linear-gradient(to left, black, transparent)',
        }}
      />
      <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
        <div>
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-ash">
            <span className="text-ember">/</span> The Smith
          </p>
          <HeatText
            as="h2"
            text="Who swings the hammer"
            className="font-display text-[clamp(2rem,5.5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-steel"
          />
          <Reveal stagger className="mt-8 flex max-w-2xl flex-col gap-5">
            {about.lines.map((line, i) => (
              <p
                key={i}
                className={`leading-relaxed ${i === 0 ? 'text-xl text-steel/90' : 'text-base text-ash'}`}
              >
                {line}
              </p>
            ))}
          </Reveal>
        </div>

        <Reveal className="lg:pt-20">
          <div className="glass rounded-2xl p-7">
            <div className="mb-5 font-mono text-[11px] uppercase tracking-[0.2em] text-ember/80">
              Maker's mark
            </div>
            <dl className="flex flex-col divide-y divide-line/70">
              {about.facts.map((f) => (
                <div key={f.k} className="flex items-baseline justify-between gap-4 py-3.5">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.15em] text-ash">
                    {f.k}
                  </dt>
                  <dd className="text-right text-sm font-medium text-steel">{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
