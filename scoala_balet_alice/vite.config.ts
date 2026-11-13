import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// width and height of a JPEG or PNG, read from its header. Facebook shows no
// image on the first shares of a link unless the page states its size
function imageSize(file: Buffer): { width: number; height: number; type: string } | null {
  if (file.readUInt32BE(0) === 0x89504e47) {
    return { width: file.readUInt32BE(16), height: file.readUInt32BE(20), type: 'image/png' }
  }
  if (file.readUInt16BE(0) !== 0xffd8) return null
  for (let i = 2; i < file.length - 9; ) {
    const marker = file.readUInt16BE(i)
    // start-of-frame markers carry the dimensions (C4, C8 and CC are not frames)
    if (marker >= 0xffc0 && marker <= 0xffcf && ![0xffc4, 0xffc8, 0xffcc].includes(marker)) {
      return { height: file.readUInt16BE(i + 5), width: file.readUInt16BE(i + 7), type: 'image/jpeg' }
    }
    i += 2 + file.readUInt16BE(i + 2)
  }
  return null
}

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
      // URL lowercases the host: GitHub's owner name arrives capitalised
      const site = process.env.SITE_URL ? new URL(process.env.SITE_URL).origin : ''
      const schoolsDir = resolve(__dirname, 'src/schools')

      for (const slug of readdirSync(schoolsDir)) {
        let school
        try {
          school = JSON.parse(readFileSync(join(schoolsDir, slug, 'school.json'), 'utf8'))
        } catch {
          continue
        }
        const { title, description, shareImage } = school.meta
        const size = shareImage ? imageSize(readFileSync(join(schoolsDir, slug, shareImage))) : null
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
          `<meta property="og:locale" content="ro_RO" />`,
          `<meta property="og:site_name" content="${escape(`${school.brand.name} ${school.brand.kind}`)}" />`,
          `<meta property="og:title" content="${escape(title)}" />`,
          `<meta property="og:description" content="${escape(description)}" />`,
          `<meta property="og:url" content="${escape(url)}" />`,
          image && `<meta property="og:image" content="${escape(image)}" />`,
          image && size && `<meta property="og:image:type" content="${size.type}" />`,
          image && size && `<meta property="og:image:width" content="${size.width}" />`,
          image && size && `<meta property="og:image:height" content="${size.height}" />`,
          image && `<meta property="og:image:alt" content="${escape(school.brand.name)}" />`,
          `<meta name="twitter:card" content="${image ? 'summary_large_image' : 'summary'}" />`,
          `<link rel="canonical" href="${escape(url)}" />`,
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
