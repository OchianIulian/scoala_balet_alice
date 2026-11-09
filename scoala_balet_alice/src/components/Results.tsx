import './Results.css'

type Placement = {
  rank: string
  style: string
  event: string
  place: string
}

const PLACEMENTS: Placement[] = [
  { rank: 'Locul 8 mondial', style: 'Balet', event: 'Dance World Cup', place: 'Dublin' },
  { rank: 'Locul 13 mondial', style: 'Dans contemporan', event: 'Dance World Cup', place: 'Dublin' },
  { rank: 'Locul 1', style: 'Balet', event: 'Grand Jeté Dance Awards', place: 'Portugalia' },
  { rank: 'Locul 4', style: 'Dans contemporan', event: 'Grand Jeté Dance Awards', place: 'Portugalia' },
]

function Results() {
  return (
    <section className="results section section--velvet" id="rezultate">
      <div className="section__inner">
        <h2 className="section__title">De la sala noastră, pe scene mari</h2>
        <p className="section__intro">
          În 2026, o elevă a academiei a ajuns, la 8 ani, în finala mondială de
          la Dublin și pe podium în Portugalia.
        </p>

        <ul className="results__list">
          {PLACEMENTS.map((p) => (
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
