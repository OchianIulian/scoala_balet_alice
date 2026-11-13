import { useSchool } from '../schools/SchoolContext'
import './Reviews.css'

// parents' own words, quoted from the school's public reviews
function Reviews() {
  const { school } = useSchool()
  if (!school.reviews) return null
  const { summary, url, items } = school.reviews

  return (
    <section className="reviews section section--alt" id="recenzii">
      <div className="section__inner">
        <h2 className="section__title">Ce spun părinții</h2>
        <p className="section__intro">
          <a className="reviews__summary" href={url} target="_blank" rel="noreferrer">
            {summary}
          </a>
        </p>

        <ul className="reviews__list">
          {items.map((r) => (
            <li className="review reveal" key={r.name}>
              <blockquote className="review__text">{r.text}</blockquote>
              <p className="review__name">{r.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Reviews
