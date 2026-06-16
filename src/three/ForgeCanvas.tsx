import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { Suspense } from 'react'
import EmberField from './EmberField'
import MoltenCore from './MoltenCore'

/**
 * Fixed, full-viewport WebGL layer that sits behind all DOM content.
 * Renders the live ember field + molten core with additive bloom so the
 * sparks and the forge heart actually glow. Pointer-events are disabled so
 * the scroll/DOM stays fully interactive.
 */
export default function ForgeCanvas() {
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <div
      className="fixed inset-0 -z-10"
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 1.8]}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 9], fov: 55 }}
      >
        <Suspense fallback={null}>
          <MoltenCore />
          <EmberField />
          {!reduce && (
            <EffectComposer multisampling={0}>
              <Bloom
                intensity={1.0}
                luminanceThreshold={0.22}
                luminanceSmoothing={0.4}
                mipmapBlur
                radius={0.7}
              />
              <Vignette eskil={false} offset={0.25} darkness={0.85} />
            </EffectComposer>
          )}
        </Suspense>
      </Canvas>
    </div>
  )
}
