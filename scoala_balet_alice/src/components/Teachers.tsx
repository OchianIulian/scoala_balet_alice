import { useSchool } from '../schools/SchoolContext'
import './Teachers.css'

function Teachers() {
  const { school, img } = useSchool()
  return (
    <section className="teachers section" id="profesori">
      <div className="section__inner">
        <h2 className="section__title">Cine îi îndrumă pe cei mici</h2>

        {/* a lone teacher stands photo beside text rather than half a pair */}
        <ul className={school.teachers.length === 1 ? 'teachers__list teachers__list--solo' : 'teachers__list'}>
          {school.teachers.map((t) => (
            <li className="teacher reveal" key={t.name}>
              {t.photo && (
                <figure className="teacher__photo">
                  <img src={img(t.photo)} alt={t.name} loading="lazy" />
                </figure>
              )}

              <div className="teacher__text">
                <h3 className="teacher__name">{t.name}</h3>
                <p className="teacher__role">{t.role}</p>
                {t.note && <p className="teacher__note">{t.note}</p>}
                {t.quote && <blockquote className="teacher__quote">{t.quote}</blockquote>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Teachers
