import HeatText from '../components/HeatText'
import { identity } from '../data/content'
import { Mail, GitLab, ArrowUpRight, Anvil } from '../components/icons'
import embersImg from '../assets/forge/embers.webp'

export default function Temper() {
  const year = 2026

  return (
    <section
      id="temper"
      className="grain relative overflow-hidden px-5 pt-28 sm:px-8 sm:pt-36"
    >
      {/* cooling embers backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen"
        style={{
          backgroundImage: `url(${embersImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          maskImage: 'linear-gradient(to top, black, transparent 75%)',
          WebkitMaskImage: 'linear-gradient(to top, black, transparent 75%)',
        }}
      />

      <div className="relative mx-auto max-w-5xl text-center [filter:drop-shadow(0_2px_22px_rgba(5,6,8,0.9))]">
        <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.28em] text-ash">
          <span className="text-ember">/</span> Temper &amp; Finish
        </p>
        <HeatText
          as="h2"
          text="Have something worth forging?"
          className="mx-auto max-w-4xl font-display text-[clamp(2.2rem,7vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-steel"
        />
        <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-ash">
          I take on systems that need to actually run — backend to mobile,
          database to deploy. If it has to last, let's talk.
        </p>

        <div className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={`mailto:${identity.email}`}
            className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-b from-ember-bright to-ember px-7 py-3.5 font-medium text-void ring-ember transition-transform hover:scale-[1.03]"
          >
            <Mail width={18} height={18} />
            {identity.email}
          </a>
          <a
            href={identity.gitlab}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-full border border-line bg-iron/40 px-7 py-3.5 font-medium text-steel transition-colors hover:border-ember/40 hover:text-ember-bright"
          >
            <GitLab width={18} height={18} />
            GitLab
            <ArrowUpRight width={14} height={14} className="opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

      {/* footer */}
      <footer className="relative mx-auto mt-28 max-w-[1800px] border-t border-line/60 py-10">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2.5 text-ash">
            <Anvil width={16} height={16} className="text-ember/70" />
            <span className="font-display text-sm font-medium text-steel">
              {identity.firstName}
              <span className="text-ash">{identity.lastName}</span>
            </span>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ash">
            Forged in {identity.location.split(',')[0]} · {year}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ash/70">
            Built with Claude · R3F · GSAP · Higgsfield
          </p>
        </div>
      </footer>
    </section>
  )
}
