import './Contact.css'

const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=Strada+Bradului+5+Nicolina+Ia%C8%99i'

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21.5c4.2-5 6.5-8.3 6.5-11.4a6.5 6.5 0 1 0-13 0c0 3.1 2.3 6.4 6.5 11.4Z" />
      <circle cx="12" cy="9.8" r="2.4" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8.2 3.5 10 7.4l-2 1.8a12.4 12.4 0 0 0 6.1 6.1l1.8-2 3.9 1.8v3.6c0 .9-.8 1.6-1.7 1.5C10.6 19.7 4.9 14 3.3 6.2a1.5 1.5 0 0 1 1.5-1.8h3.4Z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.1" cy="6.9" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function Contact() {
  return (
    <section className="contact section" id="contact">
      <div className="section__inner">
        <h2 className="section__title">Vă așteptăm în sală</h2>
        <p className="section__intro">
          Sunați sau scrieți-ne pe Instagram și stabilim împreună o primă ședință.
        </p>

        <ul className="contact__list">
          <li className="contact__item">
            <a href={MAPS_URL} target="_blank" rel="noreferrer">
              <span className="contact__icon">
                <PinIcon />
              </span>
              <span className="contact__label">Adresă</span>
              <span className="contact__value">
                Strada Bradului nr. 5
                <br />
                Nicolina, Iași
              </span>
            </a>
          </li>

          <li className="contact__item">
            <a href="tel:+40753611711">
              <span className="contact__icon">
                <PhoneIcon />
              </span>
              <span className="contact__label">Telefon</span>
              <span className="contact__value contact__value--strong">
                0753 611 711
              </span>
            </a>
          </li>

          <li className="contact__item">
            <a
              href="https://www.instagram.com/tuduriialiceballet/"
              target="_blank"
              rel="noreferrer"
            >
              <span className="contact__icon">
                <InstagramIcon />
              </span>
              <span className="contact__label">Instagram</span>
              <span className="contact__value">@tuduriialiceballet</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Contact
