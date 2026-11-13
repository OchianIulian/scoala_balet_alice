export type Day = 'Luni' | 'Marți' | 'Miercuri' | 'Joi' | 'Vineri' | 'Sâmbătă' | 'Duminică'

// Everything that differs between schools. Image fields are paths relative to
// the school's own folder (src/schools/<slug>/), resolved by `asset()`.
// `results` and `gallery` are optional: leave them out and the section (and
// its nav link) disappears.
export type School = {
  meta: { title: string; description: string }
  brand: { name: string; kind: string }
  hero: { motto: string; image: string; imageAlt: string }
  courses: {
    lede: string
    photo: string
    photoAlt: string
    groups: { age: string; name: string; days: Day[]; time: string }[]
    extras: { name: string; desc: string }[]
  }
  teachers: { name: string; role: string; note: string; photo?: string }[]
  results?: {
    intro: string
    placements: { rank: string; style: string; event: string; place: string }[]
  }
  gallery?: { src: string; alt: string }[]
  contact: {
    addressLines: string[]
    mapsUrl: string
    phone: string
    phoneHref: string
    instagram: string
  }
}
