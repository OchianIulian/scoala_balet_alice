import { createContext, useContext } from 'react'
import { asset } from '.'
import type { School } from './types'

type Ctx = { slug: string; school: School }

export const SchoolContext = createContext<Ctx | null>(null)

export function useSchool() {
  const ctx = useContext(SchoolContext)
  if (!ctx) throw new Error('useSchool must be used inside <SchoolContext>')
  return {
    ...ctx,
    // resolves an image path from school.json
    img: (path: string) => asset(ctx.slug, path),
  }
}
