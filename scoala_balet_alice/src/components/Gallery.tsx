import { useEffect, useRef, useState } from 'react'
import { useSchool } from '../schools/SchoolContext'
import './Gallery.css'

function Arrow({ flip }: { flip?: boolean }) {
  return (
    <svg viewBox="0 0 20 10" aria-hidden="true" style={flip ? { scale: '-1 1' } : undefined}>
      <path d="M0 5h18M14 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

function Gallery() {
  const { school, img } = useSchool()
  const PHOTOS = school.gallery ?? []
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
            <img src={img(src)} alt={alt} loading="lazy" />
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
