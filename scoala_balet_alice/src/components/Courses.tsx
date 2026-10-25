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
    desc: 'Pentru progres accelerat.',
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
        <h2 className="section__title">Primii pași către marea scenă încep aici!</h2>
        <p className="section__intro">
          La Alice Tudurii Ballet Academy, transformăm pasiunea pentru dans
          într-o disciplină plină de grație. Oferim un mediu profesionist și cald
          unde pașii mici cresc în dansatori mari.
        </p>

        <p className="courses__lead" id="program-grupe">
          <span>Program pe grupe de vârstă</span>
        </p>

        <div className="schedule">
          <table className="schedule__table" aria-labelledby="program-grupe">
            <thead>
              <tr>
                <th scope="col">Vârstă</th>
                <th scope="col">Curs</th>
                <th scope="col">Zile</th>
                <th scope="col">Ora</th>
              </tr>
            </thead>
            <tbody>
              {COURSES.map((c) => (
                <tr key={c.age + c.time}>
                  <th scope="row" data-label="Vârstă">
                    <span className="schedule__pill">
                      <span className="schedule__age">{c.age}</span>
                      <span className="schedule__unit">ani</span>
                    </span>
                  </th>
                  <td data-label="Curs" className="schedule__name">
                    {c.name}
                  </td>
                  <td data-label="Zile" className="schedule__days">
                    {c.days}
                  </td>
                  <td data-label="Ora" className="schedule__time">
                    {c.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="courses__lead">
          <span>Opțiuni personalizate</span>
        </p>

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
