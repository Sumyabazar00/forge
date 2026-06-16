# The Forge — Sumiyabazar

A cinematic, scroll-driven portfolio built as a blacksmith's forge: raw
requirements hammered into production systems. Dark steel and molten heat,
live WebGL embers, a glowing forge core, and per-character "heat reveal"
typography choreographed to scroll.

**Live:** https://sumyabazar00.github.io/forge/

## Stack

- **Vite + React + TypeScript**
- **Three.js / React Three Fiber + drei** — GPU ember particle system and a
  noise-displaced molten core with a custom fresnel emissive shader
- **@react-three/postprocessing** — additive bloom for the glow
- **GSAP + ScrollTrigger** — pinned sections, parallax, counters, reveals
- **Lenis** — smooth scroll, synced to GSAP's ticker
- **Tailwind CSS v4**

AI-generated forge imagery (hero furnace, glowing blade, anvil sparks, molten
pour, ember field) was produced with **Higgsfield** (GPT Image 2).

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
npm run preview  # serve the build locally
```

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds with
`GITHUB_PAGES=true` (so assets resolve under the `/forge/` base path) and
publishes `dist/` to GitHub Pages.

---

Built with Claude. Concept, 3D, motion and AI imagery generated end to end.
