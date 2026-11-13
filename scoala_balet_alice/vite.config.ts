import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Chat apps build a link preview from the HTML the server sends, before any
// script runs, so the runtime title is invisible to them. Writes a copy of
// index.html per school (dist/<slug>/index.html) carrying its own title,
// description and share image. SITE_URL (set in the deploy workflow) makes
// the image and page URLs absolute, which Facebook and WhatsApp require.
function schoolPages(): Plugin {
  let outDir = 'dist'
  let base = '/'
  return {
    name: 'school-pages',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
      base = config.base
    },
    writeBundle(_, bundle) {
      const html = readFileSync(join(outDir, 'index.html'), 'utf8')
      const site = (process.env.SITE_URL ?? '').replace(/\/$/, '')
      const schoolsDir = resolve(__dirname, 'src/schools')

      for (const slug of readdirSync(schoolsDir)) {
        let school
        try {
          school = JSON.parse(readFileSync(join(schoolsDir, slug, 'school.json'), 'utf8'))
        } catch {
          continue
        }
        const { title, description, shareImage } = school.meta
        const asset =
          shareImage &&
          Object.values(bundle).find(
            (o) =>
              o.type === 'asset' &&
              o.originalFileNames?.some((n) => n.endsWith(`schools/${slug}/${shareImage}`)),
          )
        const image = asset ? `${site}${base}${asset.fileName}` : ''
        const url = `${site}${base}${slug}/`

        const tags = [
          `<meta property="og:type" content="website" />`,
          `<meta property="og:title" content="${escape(title)}" />`,
          `<meta property="og:description" content="${escape(description)}" />`,
          `<meta property="og:url" content="${escape(url)}" />`,
          image && `<meta property="og:image" content="${escape(image)}" />`,
          `<meta name="twitter:card" content="summary_large_image" />`,
        ]
          .filter(Boolean)
          .join('\n    ')

        const page = html
          .replace(/<title>.*?<\/title>/, `<title>${escape(title)}</title>`)
          .replace(
            /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
            `<meta name="description" content="${escape(description)}" />`,
          )
          .replace('</head>', `  ${tags}\n  </head>`)

        mkdirSync(join(outDir, slug), { recursive: true })
        writeFileSync(join(outDir, slug, 'index.html'), page)
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), schoolPages()],
  // GitHub Pages serves a project site from /<repo>/, so assets need that
  // prefix. The workflow sets VITE_BASE; local dev and custom domains stay "/".
  base: process.env.VITE_BASE ?? '/',
})
