import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { scrollState } from '../lib/scrollState'

const COUNT = 2600

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uHeat;     // 0..1 overall heat
  uniform float uBurst;    // scroll-velocity driven turbulence
  uniform float uPixelRatio;
  attribute float aSeed;
  attribute float aSpeed;
  attribute float aSize;
  varying float vLife;
  varying float vSeed;

  void main() {
    vSeed = aSeed;
    float range = 26.0;
    // rise + wrap; faster when there's heat/scroll burst
    float t = uTime * (aSpeed * (0.6 + uHeat * 1.4)) + aSeed * 100.0;
    float y = mod(position.y + t, range) - range * 0.5;
    float life = 1.0 - (y + range * 0.5) / range; // 1 at bottom -> 0 at top
    vLife = life;

    float sway = sin(uTime * 0.7 + aSeed * 30.0) * (0.5 + uBurst * 2.2);
    float drift = cos(uTime * 0.4 + aSeed * 17.0) * 0.6;

    vec3 p = vec3(position.x + sway, y, position.z + drift);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;

    float size = aSize * (40.0 + uHeat * 35.0) * uPixelRatio;
    gl_PointSize = size * (1.0 / -mv.z) * (0.4 + life * 0.9);
  }
`

const fragment = /* glsl */ `
  uniform float uHeat;
  varying float vLife;
  varying float vSeed;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float glow = smoothstep(0.5, 0.0, d);
    glow = pow(glow, 1.6);

    // hotter (white) near birth, cooling to deep ember as it rises
    vec3 hot = vec3(1.0, 0.92, 0.7);
    vec3 mid = vec3(1.0, 0.42, 0.08);
    vec3 cool = vec3(0.55, 0.09, 0.02);
    float life = vLife;
    vec3 col = mix(cool, mid, smoothstep(0.0, 0.5, life));
    col = mix(col, hot, smoothstep(0.6, 1.0, life) * (0.5 + uHeat * 0.5));

    float flick = 0.7 + 0.3 * sin(vSeed * 50.0 + life * 12.0);
    float alpha = glow * life * flick * (0.5 + uHeat * 0.6);
    gl_FragColor = vec4(col, alpha);
  }
`

export default function EmberField() {
  const ref = useRef<THREE.Points>(null)
  const mat = useRef<THREE.ShaderMaterial>(null)

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry()
    const positions = new Float32Array(COUNT * 3)
    const seed = new Float32Array(COUNT)
    const speed = new Float32Array(COUNT)
    const size = new Float32Array(COUNT)
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30
      positions[i * 3 + 1] = (Math.random() - 0.5) * 26
      positions[i * 3 + 2] = (Math.random() - 0.5) * 14 - 4
      seed[i] = Math.random()
      speed[i] = 0.4 + Math.random() * 1.6
      size[i] = 0.4 + Math.random() * Math.random() * 2.4
    }
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1))
    g.setAttribute('aSpeed', new THREE.BufferAttribute(speed, 1))
    g.setAttribute('aSize', new THREE.BufferAttribute(size, 1))
    return g
  }, [])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uHeat: { value: 0.2 },
      uBurst: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    }),
    [],
  )

  useFrame((_, delta) => {
    const u = mat.current?.uniforms
    if (!u) return
    u.uTime.value += delta
    // heat eases toward a baseline lifted by scroll position
    const targetHeat = 0.25 + scrollState.progress * 0.55
    scrollState.heat += (targetHeat - scrollState.heat) * 0.05
    u.uHeat.value = scrollState.heat
    const burst = Math.min(Math.abs(scrollState.velocity) * 0.02, 1)
    u.uBurst.value += (burst - u.uBurst.value) * 0.1
  })

  return (
    <points ref={ref} geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        vertexShader={vertex}
        fragmentShader={fragment}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
