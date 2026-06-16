import { useSmoothScroll } from './lib/useSmoothScroll'
import ForgeCanvas from './three/ForgeCanvas'
import Loader from './components/Loader'
import Nav from './components/Nav'
import ScrollRail from './components/ScrollRail'
import Hero from './sections/Hero'
import Creed from './sections/Creed'
import Marquee from './sections/Marquee'
import Stations from './sections/Stations'
import Blades from './sections/Blades'
import Rack from './sections/Rack'
import Smith from './sections/Smith'
import Temper from './sections/Temper'

export default function App() {
  useSmoothScroll()

  return (
    <>
      <Loader />
      <ForgeCanvas />
      <Nav />
      <ScrollRail />
      <main className="relative z-10">
        <Hero />
        <Creed />
        <Marquee />
        <Stations />
        <Blades />
        <Rack />
        <Smith />
        <Temper />
      </main>
    </>
  )
}
