import arabesque from '../assets/cutouts/arabesque.png'
import tutu from '../assets/cutouts/tutu.png'
import './Hero.css'

const NAV = [
  { label: 'Acasă', href: '#acasa', active: true },
  { label: 'Cursuri', href: '#cursuri' },
  { label: 'Profesori', href: '#profesori' },
  { label: 'Rezultate', href: '#rezultate' },
  { label: 'Contact', href: '#contact' },
]

function Hero() {
  return (
    <section className="hero" id="acasa">
      <header className="hero__nav">
        <a className="hero__brand" href="#acasa">
          <span className="hero__brand-name">Alice Tudurii</span>
          <span className="hero__brand-kind">Ballet Academy</span>
        </a>

        <nav aria-label="Navigare principală">
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

        <button className="hero__burger" type="button" aria-label="Deschide meniul">
          <span />
          <span />
          <span />
        </button>
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
            <svg viewBox="0 0 28 8" aria-hidden="true">
              <path
                d="M0 4h26M22 1l4 3-4 3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
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
