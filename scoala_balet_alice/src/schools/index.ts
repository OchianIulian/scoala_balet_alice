import type { School } from './types'

// every folder under src/schools/ with a school.json is one school; the
// folder name is the slug the URL ends with
const configs = import.meta.glob<School>('./*/school.json', {
  eager: true,
  import: 'default',
})

const SCHOOLS: Record<string, School> = Object.fromEntries(
  Object.entries(configs).map(([path, school]) => [path.split('/')[1], school]),
)

const images = import.meta.glob<string>('./*/**/*.{jpg,jpeg,png,webp,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
})

export const getSchool = (slug: string): School | undefined => SCHOOLS[slug]

// turns a path from school.json into the built asset URL
export function asset(slug: string, path: string): string {
  const url = images[`./${slug}/${path}`]
  if (!url) console.warn(`[schools] missing image: ${slug}/${path}`)
  return url ?? ''
}

// the school is the first path segment after the site's base
// (/alice-academy, or /<repo>/alice-academy on GitHub Pages)
export function slugFromLocation(): string {
  const base = import.meta.env.BASE_URL
  const path = window.location.pathname
  const rest = path.startsWith(base) ? path.slice(base.length) : path.replace(/^\//, '')
  return rest.split('/')[0].toLowerCase()
}
