export type Day = 'Luni' | 'Marți' | 'Miercuri' | 'Joi' | 'Vineri' | 'Sâmbătă' | 'Duminică'

// Everything that differs between schools. Image fields are paths relative to
// the school's own folder (src/schools/<slug>/), resolved by `asset()`.
// `results`, `reviews` and `gallery` are optional: leave them out and the
// section (and its nav link) disappears.
export type School = {
  // `shareImage` is the picture shown when the link is pasted into a chat
  meta: { title: string; description: string; shareImage?: string }
  brand: { name: string; kind: string }
  hero: {
    motto: string
    image: string
    imageAlt: string
    // the main button; defaults to "Programează o primă ședință" → #contact
    cta?: { label: string; href: string }
  }
  courses: {
    title: string
    lede: string
    photo: string
    photoAlt: string
    // a short muted clip from the studio, beside and behind the course cards
    video?: string
    // what the school teaches, as cards; used when there is no timetable yet
    offerings?: { name: string; desc?: string }[]
    offeringsHeading?: string
    // the weekly timetable: leave out until the school's schedule is known
    groups?: { age: string; name: string; days: Day[]; time: string }[]
    // start times to show as rows even with no class in them yet
    times?: string[]
    extras?: { name: string; desc: string }[]
  }
  // `quote` is the teacher's own words, shown under the note. Leave the list
  // empty until the school names its teachers: the section and its nav link
  // drop out
  teachers: { name: string; role: string; note?: string; quote?: string; photo?: string }[]
  results?: {
    intro: string
    placements: { rank: string; style: string; event: string; place: string }[]
  }
  // parents' own reviews; `summary` is the rating line above them
  reviews?: {
    summary: string
    url: string
    items: { text: string; name: string }[]
  }
  gallery?: { src: string; alt: string }[]
  contact: {
    addressLines: string[]
    mapsUrl: string
    phone: string
    phoneHref: string
    // a school taking enrolments on several numbers lists them all, each
    // labelled with what it's for; shown in the phone card instead of `phone`
    phones?: { number: string; href: string; label: string }[]
    // a school may be on Instagram, Facebook or both; each adds a card
    instagram?: string
    // the page's full address, e.g. https://www.facebook.com/BaletCraiova
    facebook?: string
    // international digits only, e.g. 40756318284
    whatsapp?: string
    // the line under the contact title; defaults to a call / Instagram invite
    intro?: string
  }
}
