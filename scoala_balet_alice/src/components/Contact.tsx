import { Fragment } from 'react'
import { useSchool } from '../schools/SchoolContext'
import './Contact.css'

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

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.4L3.5 20.5l1.4-4.2a8.5 8.5 0 1 1 15.6-4.6Z" />
      <path d="M9.2 8.3c.3-.4.9-.4 1.1 0l.7 1.5c.1.3 0 .6-.2.8l-.5.5c.6 1.2 1.5 2.1 2.7 2.7l.5-.5c.2-.2.5-.3.8-.2l1.5.7c.4.2.4.8 0 1.1-.8.7-1.9.9-2.9.4a8.4 8.4 0 0 1-4.1-4.1c-.5-1-.3-2.1.4-2.9Z" />
    </svg>
  )
}

function Contact() {
  const { school } = useSchool()
  const { contact } = school
  return (
    <section className="contact section section--alt" id="contact">
      <div className="section__inner">
        <h2 className="section__title">Vă așteptăm în sală</h2>
        <p className="section__intro">
          {contact.intro ?? 'Sunați sau scrieți-ne pe Instagram și stabilim împreună o primă ședință.'}
        </p>

        <ul className="contact__list">
          <li className="contact__item reveal">
            <a href={contact.mapsUrl} target="_blank" rel="noreferrer">
              <span className="contact__icon">
                <PinIcon />
              </span>
              <span className="contact__label">Adresă</span>
              <span className="contact__value">
                {contact.addressLines.map((line, i) => (
                  <Fragment key={line}>
                    {i > 0 && <br />}
                    {line}
                  </Fragment>
                ))}
              </span>
            </a>
          </li>

          <li className="contact__item reveal">
            <a href={contact.phoneHref}>
              <span className="contact__icon">
                <PhoneIcon />
              </span>
              <span className="contact__label">Telefon</span>
              <span className="contact__value contact__value--strong">
                {contact.phone}
              </span>
            </a>
          </li>

          {contact.whatsapp && (
            <li className="contact__item reveal">
              <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noreferrer">
                <span className="contact__icon">
                  <WhatsAppIcon />
                </span>
                <span className="contact__label">WhatsApp</span>
                <span className="contact__value">Trimite-ne un mesaj</span>
              </a>
            </li>
          )}

          <li className="contact__item reveal">
            <a
              href={`https://www.instagram.com/${contact.instagram}/`}
              target="_blank"
              rel="noreferrer"
            >
              <span className="contact__icon">
                <InstagramIcon />
              </span>
              <span className="contact__label">Instagram</span>
              {/* long handles break at their dots rather than overflow the card */}
              <span className="contact__value">
                @
                {contact.instagram.split('.').map((part, i) => (
                  <Fragment key={i}>
                    {i > 0 && (
                      <>
                        .<wbr />
                      </>
                    )}
                    {part}
                  </Fragment>
                ))}
              </span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Contact
