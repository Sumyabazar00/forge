import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { scrollState } from '../lib/scrollState'

// Ashima 3D simplex noise (public domain) for organic surface displacement.
const snoise = /* glsl */ `
  vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
  float snoise(vec3 v){
    const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);
    vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
    vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
    vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
    i=mod289(i);
    vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
    float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;
    vec4 j=p-49.0*floor(p*ns.z*ns.z);
    vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);
    vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);
    vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
    vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));
    vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
    vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
    vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
    vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;
    return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }
`

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uHeat;
  varying float vNoise;
  varying vec3 vNormal;
  varying vec3 vView;
  ${snoise}
  void main(){
    vec3 pos = position;
    float n = snoise(pos * 1.1 + vec3(0.0, uTime * 0.15, 0.0));
    float n2 = snoise(pos * 2.7 + vec3(uTime * 0.2));
    float disp = n * 0.45 + n2 * 0.18;
    disp *= (0.6 + uHeat * 0.9);
    vNoise = disp;
    vec3 displaced = pos + normal * disp;
    vec4 mv = modelViewMatrix * vec4(displaced, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`

const fragment = /* glsl */ `
  uniform float uHeat;
  varying float vNoise;
  varying vec3 vNormal;
  varying vec3 vView;
  void main(){
    float fres = pow(1.0 - max(dot(vNormal, vView), 0.0), 2.2);
    // valleys glow molten, ridges cool to dark iron
    float heat = smoothstep(-0.4, 0.5, vNoise);
    vec3 deep = vec3(0.18, 0.02, 0.0);
    vec3 mid = vec3(0.95, 0.28, 0.04);
    vec3 hot = vec3(1.0, 0.78, 0.4);
    vec3 col = mix(deep, mid, heat);
    col = mix(col, hot, smoothstep(0.55, 1.0, heat));
    col += fres * vec3(1.0, 0.45, 0.12) * (0.4 + uHeat * 0.7);
    float intensity = (0.2 + uHeat * 0.55);
    gl_FragColor = vec4(col * intensity, 1.0);
  }
`

export default function MoltenCore() {
  const mesh = useRef<THREE.Mesh>(null)
  const mat = useRef<THREE.ShaderMaterial>(null)

  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uHeat: { value: 0.2 } }),
    [],
  )

  useFrame((_, delta) => {
    const m = mat.current
    if (!m || !mesh.current) return
    m.uniforms.uTime.value += delta
    m.uniforms.uHeat.value = scrollState.heat
    mesh.current.rotation.y += delta * 0.06
    mesh.current.rotation.x += delta * 0.02
    // drift subtly with pointer for parallax life
    mesh.current.position.x += (scrollState.pointerX * 1.0 - mesh.current.position.x) * 0.02
    mesh.current.position.y += (-6.2 - scrollState.pointerY * 0.6 - mesh.current.position.y) * 0.02
  })

  return (
    <mesh ref={mesh} position={[0, -6.2, -4]} scale={3.0}>
      <icosahedronGeometry args={[1, 32]} />
      <shaderMaterial ref={mat} uniforms={uniforms} vertexShader={vertex} fragmentShader={fragment} />
    </mesh>
  )
}
