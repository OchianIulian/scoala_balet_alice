import alicePhoto from '../assets/teachers/alice.jpg'
import maraPhoto from '../assets/teachers/mara.jpg'
import './Teachers.css'

type Teacher = {
  name: string
  role: string
  note: string
  photo?: string
}

const TEACHERS: Teacher[] = [
  {
    name: 'Alice-Diana Tudurii',
    role: 'Fondatoare · profesor coordonator',
    note: 'Predă grupele de balet clasic și coordonează programul academiei.',
    photo: alicePhoto,
  },
  {
    name: 'Mara Boană',
    role: 'Profesor · balerină',
    note: 'Balerină la Opera Națională Română Iași, formată la Kyiv Choreographic College, Ballettakademie München și UNAGE Iași. Predă dans contemporan și grupa de duminică.',
    photo: maraPhoto,
  },
]

function Teachers() {
  return (
    <section className="teachers section" id="profesori">
      <div className="section__inner">
        <h2 className="section__title">Cine îi îndrumă pe cei mici</h2>

        <ul className="teachers__list">
          {TEACHERS.map((t) => (
            <li className="teacher" key={t.name}>
              {t.photo && (
                <figure className="teacher__photo">
                  <img src={t.photo} alt={t.name} loading="lazy" />
                </figure>
              )}

              <p className="teacher__role">{t.role}</p>
              <h3 className="teacher__name">{t.name}</h3>
              <p className="teacher__note">{t.note}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Teachers
