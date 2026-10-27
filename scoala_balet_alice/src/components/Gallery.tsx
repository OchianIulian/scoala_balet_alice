import { useEffect, useRef, useState } from 'react'
import './Gallery.css'

// alt text per file in assets/galerie/; anything without an entry falls back
// to a generic description
const ALT: Record<string, string> = {
  '01-salt.jpg': 'Elevă în salt pe scenă',
  '02-arabesque-tutu-alb.jpg': 'Elevă în arabesque, în tutu alb',
  '03-extensie-pe-scena.jpg': 'Elevă în extensie, așezată pe scenă',
  '04-in-sala.jpg': 'Elevă zâmbind la încălzire, în sala academiei',
  '05-doua-balerine.jpg': 'Două eleve în tutu alb pe scenă',
  '06-arabesque-roz.jpg': 'Elevă în arabesque, în costum roz',
  '07-arabesque-rosu.jpg': 'Elevă în arabesque, în costum roșu',
  '08-contemporan.jpg': 'Elevă într-un moment de dans contemporan',
  '09-arabesque-voal.jpg': 'Elevă în arabesque, în rochie albă de voal',
}

// every image dropped into assets/galerie/ joins the carousel, in filename order
const PHOTOS = Object.entries(
  import.meta.glob<string>('../assets/galerie/*.{jpg,jpeg,png,webp}', {
    eager: true,
    import: 'default',
  }),
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src]) => ({
    src,
    alt: ALT[path.split('/').pop()!] ?? 'Elevă a academiei dansând',
  }))

function Arrow({ flip }: { flip?: boolean }) {
  return (
    <svg viewBox="0 0 20 10" aria-hidden="true" style={flip ? { scale: '-1 1' } : undefined}>
      <path d="M0 5h18M14 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

function Gallery() {
  const track = useRef<HTMLUListElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const update = () => {
    const el = track.current
    if (!el) return
    setAtStart(el.scrollLeft < 4)
    setAtEnd(el.scrollLeft + el.clientWidth > el.scrollWidth - 4)
  }

  useEffect(() => {
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // most of a screen per click; scroll-snap settles it on a photo edge
  const go = (dir: 1 | -1) =>
    track.current?.scrollBy({ left: dir * track.current.clientWidth * 0.7, behavior: 'smooth' })

  if (PHOTOS.length === 0) return null

  return (
    <section className="gallery section" id="galerie" aria-label="Galerie foto">
      <ul className="gallery__track" ref={track} onScroll={update}>
        {PHOTOS.map(({ src, alt }) => (
          <li className="gallery__item" key={src}>
            <img src={src} alt={alt} loading="lazy" />
          </li>
        ))}
      </ul>

      <div className="section__inner gallery__controls">
        <button type="button" aria-label="Pozele anterioare" disabled={atStart} onClick={() => go(-1)}>
          <Arrow flip />
        </button>
        <button type="button" aria-label="Pozele următoare" disabled={atEnd} onClick={() => go(1)}>
          <Arrow />
        </button>
      </div>
    </section>
  )
}

export default Gallery
