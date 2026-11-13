import { useEffect, useState, type CSSProperties } from 'react'
import { navFor } from '../nav'
import { useSchool } from '../schools/SchoolContext'
import './Header.css'

function Header() {
  const { school } = useSchool()
  const NAV = navFor(school)
  // Contact is the pill on the right, so the inline links leave it out
  const LINKS = NAV.filter((item) => item.href !== '#contact')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // the bar is transparent over the hero and turns solid once the page moves
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 12)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

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
    <header className={scrolled ? 'header is-scrolled' : 'header'}>
      <div className="header__inner">
        <a className="header__brand" href="#acasa">
          <span className="header__name">{school.brand.name}</span>
          <span className="header__kind">{school.brand.kind}</span>
        </a>

        <nav className="header__links" aria-label="Navigare principală">
          {LINKS.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className="header__cta" href="#contact">
          Contact
        </a>

        <button
          className={menuOpen ? 'header__burger is-open' : 'header__burger'}
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
      </div>

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
  )
}

export default Header
