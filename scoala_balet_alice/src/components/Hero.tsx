import { useLayoutEffect, useRef } from 'react'
import { useSchool } from '../schools/SchoolContext'
import './Hero.css'

// a rose-and-lilac watercolour bloom behind the dancer. Translucent washes
// are pushed around by fractal noise so their edges run like wet paint, then
// the edge is sharpened against a blurred copy — pigment pools at the rim of
// a real wash, and that darker rim is what sells it
function Splash() {
  return (
    <svg className="hero__splash" viewBox="0 0 600 600" aria-hidden="true">
      <defs>
        <filter id="wash" x="-25%" y="-25%" width="150%" height="150%">
          <feTurbulence type="fractalNoise" baseFrequency="0.017" numOctaves="5" seed="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="62" result="ran" />
          <feGaussianBlur in="ran" stdDeviation="7" result="soft" />
          <feComposite in="ran" in2="soft" operator="arithmetic" k2="1.7" k3="-0.7" />
        </filter>
        <filter id="drops" x="-25%" y="-25%" width="150%" height="150%">
          <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="2" seed="9" />
          <feDisplacementMap in="SourceGraphic" scale="14" />
        </filter>
      </defs>

      <g filter="url(#wash)">
        <ellipse cx="300" cy="305" rx="205" ry="215" fill="#f2bfcd" opacity="0.55" />
        <ellipse cx="225" cy="240" rx="140" ry="125" fill="#d9b6e8" opacity="0.5" />
        <ellipse cx="390" cy="390" rx="135" ry="120" fill="#f6c7b8" opacity="0.5" />
        <ellipse cx="385" cy="215" rx="105" ry="95" fill="#e9a3b8" opacity="0.4" />
        <ellipse cx="230" cy="410" rx="95" ry="80" fill="#e6b3d6" opacity="0.38" />
      </g>

      {/* stray drops flicked off the brush */}
      <g className="hero__drops" filter="url(#drops)" fill="#dc97ad" opacity="0.6">
        <circle cx="72" cy="260" r="8" />
        <circle cx="52" cy="312" r="3.5" />
        <circle cx="105" cy="438" r="5.5" />
        <circle cx="528" cy="150" r="6.5" />
        <circle cx="556" cy="206" r="3" />
        <circle cx="545" cy="440" r="8.5" />
        <circle cx="486" cy="540" r="4" />
        <circle cx="205" cy="548" r="5" />
        <circle cx="310" cy="48" r="4.5" />
        <circle cx="160" cy="92" r="3" />
        <circle cx="440" cy="70" r="2.5" />
      </g>
    </svg>
  )
}

// a rose brushstroke under the name, like a marker swipe: a tapered band
// whose edges are roughened by noise, lighter where the brush runs dry
function Swash({ ref }: { ref: React.Ref<SVGSVGElement> }) {
  return (
    <svg ref={ref} className="hero__swash" viewBox="0 0 400 40" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <filter id="swash-edge" x="-5%" y="-40%" width="110%" height="180%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035 0.25" numOctaves="3" seed="2" />
          <feDisplacementMap in="SourceGraphic" scale="7" />
        </filter>
        <linearGradient id="swash-ink" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#eaa6bb" />
          <stop offset="0.7" stopColor="#f0b9c8" />
          <stop offset="1" stopColor="#f6d2dc" />
        </linearGradient>
      </defs>
      <path
        d="M6 16 C 90 9, 230 12, 394 7 L 392 31 C 270 35, 140 34, 9 37 C 4 30, 3 22, 6 16 Z"
        fill="url(#swash-ink)"
        filter="url(#swash-edge)"
      />
    </svg>
  )
}

function Hero() {
  const { school, img } = useSchool()
  const nameText = useRef<HTMLSpanElement>(null)
  const swash = useRef<SVGSVGElement>(null)

  // a long name wraps onto two lines; the brushstroke belongs under the last
  // one only, so size it to that line instead of the whole name block
  useLayoutEffect(() => {
    const text = nameText.current
    const stroke = swash.current
    const box = stroke?.parentElement
    if (!text || !stroke || !box) return

    const fit = () => {
      const lines = text.getClientRects()
      const last = lines[lines.length - 1]
      const boxLeft = box.getBoundingClientRect().left
      if (!last) return
      stroke.style.left = `${last.left - boxLeft - last.width * 0.03}px`
      stroke.style.width = `${last.width * 1.06}px`
    }
    fit()
    const observer = new ResizeObserver(fit)
    observer.observe(box)
    document.fonts.ready.then(fit)
    return () => observer.disconnect()
  }, [school.brand.name])
  return (
    <section className="hero" id="acasa">
      {/* soft floating blobs in the corners, as on the reference */}
      <span className="hero__blob hero__blob--a" aria-hidden="true" />
      <span className="hero__blob hero__blob--b" aria-hidden="true" />
      <span className="hero__blob hero__blob--c" aria-hidden="true" />

      <div className="hero__inner">
        <div className="hero__copy">
          <h1 className="hero__title">
            <span className="hero__name">
              <span ref={nameText}>{school.brand.name}</span>
              <Swash ref={swash} />
            </span>
            <span className="hero__kind">{school.brand.kind}</span>
          </h1>

          <p className="hero__motto">{school.hero.motto}</p>

          <a className="button" href="#contact">
            Programează o primă ședință
            <svg viewBox="0 0 20 10" aria-hidden="true">
              <path d="M0 5h18M14 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </a>
        </div>

        <div className="hero__art">
          <Splash />

          <figure className="hero__fig hero__fig--front">
            <img src={img(school.hero.image)} alt={school.hero.imageAlt} />
          </figure>
        </div>
      </div>
    </section>
  )
}

export default Hero
