import { useEffect, useState, type CSSProperties } from 'react'
import arabesque from '../assets/cutouts/arabesque.png'
import tutu from '../assets/cutouts/tutu.png'
import './Hero.css'

const NAV = [
  { label: 'Acasă', href: '#acasa', active: true },
  { label: 'Cursuri', href: '#cursuri' },
  { label: 'Profesori', href: '#profesori' },
  { label: 'Rezultate', href: '#rezultate' },
  { label: 'Galerie', href: '#galerie' },
  { label: 'Contact', href: '#contact' },
]

function Hero() {
  const [menuOpen, setMenuOpen] = useState(false)

  // while the full-screen menu is open: no page scroll behind it, Escape closes
  useEffect(() => {
    if (!menuOpen) return
    const close = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false)
    document.documentElement.style.overflow = 'hidden'
    window.addEventListener('keydown', close)
    return () => {
      document.documentElement.style.overflow = ''
      window.removeEventListener('keydown', close)
    }
  }, [menuOpen])

  return (
    <section className="hero" id="acasa">
      <header className="hero__nav">
        <a className="hero__brand" href="#acasa">
          <span className="hero__brand-name">Alice Tudurii</span>
          <span className="hero__brand-kind">Ballet Academy</span>
        </a>

        <nav className="hero__links" aria-label="Navigare principală">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={item.active ? 'is-active' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          className={menuOpen ? 'hero__burger is-open' : 'hero__burger'}
          type="button"
          aria-label={menuOpen ? 'Închide meniul' : 'Deschide meniul'}
          aria-expanded={menuOpen}
          aria-controls="meniu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          id="meniu"
          className={menuOpen ? 'menu is-open' : 'menu'}
          aria-label="Meniu"
          inert={!menuOpen}
        >
          {NAV.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              style={{ '--i': i } as CSSProperties}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <div className="hero__stage">
        <p className="hero__ghost" aria-hidden="true">
          Ballet Academy
        </p>

        <figure className="hero__fig hero__fig--back">
          <img src={tutu} alt="Balerină în arabesque, costum alb de scenă" />
        </figure>

        <figure className="hero__fig hero__fig--front">
          <img src={arabesque} alt="Dansatoare într-un salt de dans contemporan" />
        </figure>

        <div className="hero__copy">
          <h1 className="hero__motto">Unde pașii mici cresc în dansatori mari</h1>

          <a className="hero__cta" href="#contact">
            Programează o primă ședință
            <span className="hero__cta-dot">
              <svg viewBox="0 0 20 10" aria-hidden="true">
                <path
                  d="M0 5h18M14 1l4 4-4 4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
              </svg>
            </span>
          </a>
        </div>

        <a className="hero__scroll" href="#cursuri" aria-label="Derulează">
          <span>Descoperă</span>
          <svg viewBox="0 0 20 28" aria-hidden="true">
            <path
              d="M10 0v26M3 19l7 7 7-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            />
          </svg>
        </a>
      </div>
    </section>
  )
}

export default Hero
