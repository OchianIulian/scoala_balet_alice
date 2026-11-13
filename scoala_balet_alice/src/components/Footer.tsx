import { useSchool } from '../schools/SchoolContext'
import './Footer.css'

const YEAR = new Date().getFullYear()

// contact details deliberately stay out of here — they live in the contact
// section only (see CLAUDE.md)
function Footer() {
  const { school } = useSchool()
  const { name, kind } = school.brand
  return (
    <footer className="footer">
      <div className="section__inner">
        <a className="footer__brand" href="#acasa">
          <span className="footer__name">{name}</span>
          <span className="footer__kind">{kind}</span>
        </a>

        <div className="footer__base">
          <p>© {YEAR} {name} {kind}</p>
          <a className="footer__top" href="#acasa">
            Înapoi sus
            <svg viewBox="0 0 10 14" aria-hidden="true">
              <path
                d="M5 13V1M1 5l4-4 4 4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.1"
              />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
