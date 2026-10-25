import './Courses.css'

type Course = {
  age: string
  name: string
  days: string
  time: string
}

const COURSES: Course[] = [
  {
    age: '3–4',
    name: 'Introducere magică în lumea baletului',
    days: 'Marți & Joi',
    time: '17:00',
  },
  {
    age: '3–5',
    name: 'Primii pași de balet',
    days: 'Duminică',
    time: '10:00',
  },
  {
    age: '5–7',
    name: 'Dezvoltarea posturii și a coordonării',
    days: 'Marți & Joi',
    time: '18:00',
  },
  {
    age: '7–10',
    name: 'Perfecționarea tehnicii și a expresivității',
    days: 'Luni, Miercuri & Vineri',
    time: '17:00',
  },
]

const EXTRAS = [
  {
    name: 'Ședințe individuale 1:1',
    desc: 'Pentru progres accelerat, în ritmul propriu.',
  },
  {
    name: 'Program flexibil în weekend',
    desc: 'Adaptat nevoilor familiei tale.',
  },
]

function Courses() {
  return (
    <section className="courses section section--alt" id="cursuri">
      <div className="section__inner">
        <h2 className="section__title">Fiecare copil, în grupa lui</h2>
        <p className="section__intro">
          Copilașii sunt repartizați într-o grupă alături de copii de vârsta lor,
          ca să înceapă de unde le e cel mai comod. Programul îl găsiți mai jos.
        </p>

        <ul className="courses__list">
          {COURSES.map((c) => (
            <li className="course" key={c.age + c.time}>
              <span className="course__age">
                {c.age}
                <i>ani</i>
              </span>

              <h3 className="course__name">{c.name}</h3>

              <p className="course__when">
                <span className="course__days">{c.days}</span>
                <span className="course__time">{c.time}</span>
              </p>
            </li>
          ))}
        </ul>

        <div className="courses__extras">
          {EXTRAS.map((e) => (
            <article className="extra" key={e.name}>
              <h3 className="extra__name">{e.name}</h3>
              <p className="extra__desc">{e.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Courses
