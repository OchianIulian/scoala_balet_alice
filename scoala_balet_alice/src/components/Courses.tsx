import { useSchool } from '../schools/SchoolContext'
import type { Day } from '../schools/types'
import './Courses.css'

// a looping clip shouldn't start by itself for people who asked for less motion
const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches

const WEEK: Day[] = ['Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă', 'Duminică']

type Course = { age: string; name: string; days: Day[]; time: string }

function Slot({ course }: { course: Course }) {
  return (
    <div className="slot">
      <span className="slot__age">{course.age} ani</span>
      <span className="slot__time">{course.time}</span>
      <span className="slot__name">{course.name}</span>
    </div>
  )
}

function Courses() {
  const { school, img } = useSchool()
  const { groups: COURSES = [], times: EXTRA_TIMES = [], offerings: OFFERINGS = [], extras: EXTRAS = [] } = school.courses

  // the timetable's rows: every distinct start time, earliest first
  const TIMES = [...new Set([...COURSES.map((c) => c.time), ...EXTRA_TIMES])].sort()

  const at = (day: Day, time: string) =>
    COURSES.filter((c) => c.time === time && c.days.includes(day))

  return (
    <section className="courses section section--alt" id="cursuri">
      <div className="section__inner">
        <div className="courses__intro reveal">
          <div className="courses__text">
            <h2 className="section__title section__title--left">
              {school.courses.title}
            </h2>
            <p className="courses__lede">{school.courses.lede}</p>
          </div>

          <figure className="courses__photo">
            <img src={img(school.courses.photo)} alt={school.courses.photoAlt} />
          </figure>
        </div>
      </div>

      {/* with a studio clip, the course cards sit on a full-bleed band with
          the clip running behind a velvet wash, and a sharp copy of it
          standing beside them */}
      {OFFERINGS.length > 0 && (
        <div className={school.courses.video ? 'offerings offerings--band' : 'offerings'}>
          {school.courses.video && (
            <video
              className="offerings__bg"
              src={img(school.courses.video)}
              poster={img(school.courses.photo)}
              aria-hidden="true"
              autoPlay={!REDUCED_MOTION}
              muted
              loop
              playsInline
              preload="metadata"
            />
          )}

          <div className="section__inner">
            <h3 className="courses__heading">{school.courses.offeringsHeading}</h3>

            <div className="offerings__body">
              {school.courses.video && (
                <figure className="offerings__video reveal">
                  <video
                    src={img(school.courses.video)}
                    poster={img(school.courses.photo)}
                    aria-label={school.courses.photoAlt}
                    autoPlay={!REDUCED_MOTION}
                    controls={REDUCED_MOTION}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                </figure>
              )}

              <div className="courses__extras">
                {OFFERINGS.map((o) => (
                  <article className="extra reveal" key={o.name}>
                    <h4 className="extra__name">{o.name}</h4>
                    {o.desc && <p className="extra__desc">{o.desc}</p>}
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="section__inner">
        {TIMES.length > 0 && (
          <>
            {/* with no classes yet the phone list would be empty, so phones
                skip the heading too */}
            <h3
              className={COURSES.length ? 'courses__heading' : 'courses__heading courses__heading--wide'}
              id="program-grupe"
            >
              Program pe grupe de vârstă
            </h3>

            {/* desktop: the week as a timetable, start times down the side */}
            <div className="timetable reveal" role="table" aria-labelledby="program-grupe">
              <div className="timetable__row timetable__row--head" role="row">
                <span className="timetable__corner" role="columnheader">
                  <span className="sr-only">Ora</span>
                </span>
                {WEEK.map((day) => (
                  <span className="timetable__day" role="columnheader" key={day}>
                    {day}
                  </span>
                ))}
              </div>

              {TIMES.map((time) => (
                <div className="timetable__row" role="row" key={time}>
                  <span className="timetable__time" role="rowheader">
                    {time}
                  </span>
                  {WEEK.map((day) => (
                    <div className="timetable__cell" role="cell" key={day}>
                      {at(day, time).map((c) => (
                        <Slot course={c} key={c.age} />
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* phones: the same week as a list, only the days with classes */}
            <ol className="daylist reveal" aria-label="Program pe zile">
              {WEEK.filter((day) => COURSES.some((c) => c.days.includes(day))).map((day) => (
                <li className="daylist__day" key={day}>
                  <h4>{day}</h4>
                  {TIMES.flatMap((time) => at(day, time)).map((c) => (
                    <Slot course={c} key={c.age} />
                  ))}
                </li>
              ))}
            </ol>
          </>
        )}

        {EXTRAS.length > 0 && (
          <>
            <h3 className="courses__heading">Opțiuni personalizate</h3>

            <div className="courses__extras">
              {EXTRAS.map((e) => (
                <article className="extra reveal" key={e.name}>
                  <h4 className="extra__name">{e.name}</h4>
                  <p className="extra__desc">{e.desc}</p>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Courses
