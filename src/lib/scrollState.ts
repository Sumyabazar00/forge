// Mutable bridge between Lenis (DOM scroll) and R3F (useFrame loop).
// Reading/writing a shared object avoids React re-renders on every scroll tick.
export const scrollState = {
  progress: 0, // 0..1 over the whole page
  velocity: 0, // signed px/frame-ish from Lenis
  heat: 0, // 0..1 eased "heat" used to drive ember intensity
  pointerX: 0, // -1..1
  pointerY: 0, // -1..1
}

if (typeof window !== 'undefined') {
  window.addEventListener(
    'pointermove',
    (e) => {
      scrollState.pointerX = (e.clientX / window.innerWidth) * 2 - 1
      scrollState.pointerY = (e.clientY / window.innerHeight) * 2 - 1
    },
    { passive: true },
  )
}
