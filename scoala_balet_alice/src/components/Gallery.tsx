import './Gallery.css'
import salt from '../assets/galerie/01-salt.jpg'
import arabesqueAlb from '../assets/galerie/02-arabesque-tutu-alb.jpg'
import extensie from '../assets/galerie/03-extensie-pe-scena.jpg'
import inSala from '../assets/galerie/04-in-sala.jpg'
import douaBalerine from '../assets/galerie/05-doua-balerine.jpg'
import arabesqueRoz from '../assets/galerie/06-arabesque-roz.jpg'

type Shape = 'arch' | 'round' | 'rect'

// order matters: each position has its own slot in the collage (Gallery.css)
const PHOTOS: { src: string; alt: string; shape: Shape }[] = [
  { src: salt, alt: 'Elevă în salt pe scenă', shape: 'arch' },
  { src: inSala, alt: 'Elevă zâmbind la încălzire, în sala academiei', shape: 'round' },
  { src: extensie, alt: 'Elevă în extensie, așezată pe scenă', shape: 'rect' },
  { src: arabesqueAlb, alt: 'Elevă în arabesque, în tutu alb', shape: 'rect' },
  { src: douaBalerine, alt: 'Două eleve în tutu alb pe scenă', shape: 'arch' },
  { src: arabesqueRoz, alt: 'Elevă în arabesque, în costum roz', shape: 'rect' },
]

function Gallery() {
  return (
    <section className="gallery section" id="galerie">
      <div className="section__inner">
        {/* wording from the academy's own post */}
        <h2 className="section__title">Primii pași către marea scenă</h2>

        <div className="gallery__stage">
          <ul className="gallery__collage">
            {PHOTOS.map(({ src, alt, shape }) => (
              <li className={`gallery__item gallery__item--${shape}`} key={src}>
                <div className="gallery__frame">
                  <img src={src} alt={alt} loading="lazy" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Gallery
