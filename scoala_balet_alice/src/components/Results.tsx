import './Results.css'

type Result = {
  event: string
  place: string
  placements: string[]
}

const RESULTS: Result[] = [
  {
    event: 'Dance World Cup',
    place: 'Dublin',
    placements: ['Locul 8 mondial — balet', 'Locul 13 mondial — dans contemporan'],
  },
  {
    event: 'Grand Jeté Dance Awards',
    place: 'Portugalia',
    placements: ['Locul 1 — balet', 'Locul 4 — dans contemporan'],
  },
]

function Results() {
  return (
    <section className="results section section--alt" id="rezultate">
      <div className="section__inner">
        <h2 className="section__title">De la sala noastră, pe scene mari</h2>
        <p className="section__intro">
          În 2026, o elevă a academiei a ajuns, la 8 ani, în finala mondială de
          la Dublin și pe podium în Portugalia.
        </p>

        <ul className="results__list">
          {RESULTS.map((r) => (
            <li className="result" key={r.event}>
              <div className="result__event">
                <h3>{r.event}</h3>
                <p>{r.place}</p>
              </div>

              <ul className="result__places">
                {r.placements.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Results
