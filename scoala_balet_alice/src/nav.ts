import type { School } from './schools/types'

// page sections, shared by the header links and the full-screen menu;
// sections a school doesn't have are left out
export const navFor = (school: School) =>
  [
    { label: 'Acasă', href: '#acasa' },
    { label: 'Cursuri', href: '#cursuri' },
    { label: 'Profesori', href: '#profesori' },
    school.results && { label: 'Rezultate', href: '#rezultate' },
    school.gallery?.length && { label: 'Galerie', href: '#galerie' },
    { label: 'Contact', href: '#contact' },
  ].filter((item) => !!item)
