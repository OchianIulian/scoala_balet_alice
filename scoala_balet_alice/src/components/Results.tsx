import { useSchool } from '../schools/SchoolContext'
import './Results.css'

function Results() {
  const { school } = useSchool()
  if (!school.results) return null
  const { intro, placements } = school.results

  return (
    <section className="results section section--velvet" id="rezultate">
      <div className="section__inner">
        <h2 className="section__title">De la sala noastră, pe scene mari</h2>
        <p className="section__intro">
          {intro}
        </p>

        <ul className="results__list">
          {placements.map((p) => (
            <li className="result reveal" key={p.rank + p.style}>
              <p className="result__rank">{p.rank}</p>
              <p className="result__style">{p.style}</p>
              <p className="result__event">
                {p.event} · {p.place}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Results
