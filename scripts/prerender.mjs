import { build } from 'vite'
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const serverOutDir = path.resolve('dist/server')
const distDir = path.resolve('dist')
const origin = 'https://splitsmarter.app'

await build({
  build: {
    ssr: path.resolve('src/entry-server.tsx'),
    outDir: serverOutDir,
    emptyOutDir: true,
  },
})

const entry = fs
  .readdirSync(serverOutDir)
  .find((name) => name.startsWith('entry-server') && name.endsWith('.js'))

if (!entry) {
  throw new Error('SSR bundle was not written')
}

const { renderPage, pageHeads } = await import(pathToFileURL(path.join(serverOutDir, entry)).href)
const templatePath = path.join(distDir, 'index.html')
const template = fs.readFileSync(templatePath, 'utf8')
const rootMarker = '<div id="root"></div>'

if (!template.includes(rootMarker)) {
  throw new Error('Root placeholder missing from dist/index.html')
}

function escapeAttr(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
}

function applyHead(html, page) {
  const url = `${origin}${page.path}`
  let next = html
  next = next.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeAttr(page.title)}</title>`)
  next = next.replace(/(<meta name="description" content=")[^"]*(")/, `$1${escapeAttr(page.description)}$2`)
  next = next.replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${escapeAttr(page.title)}$2`)
  next = next.replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${escapeAttr(page.description)}$2`)
  next = next.replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${escapeAttr(page.title)}$2`)
  next = next.replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${escapeAttr(page.description)}$2`)
  next = next.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
  next = next.replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
  const json = page.jsonLd.replaceAll('<', '\\u003c')
  next = next.replace(
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script type="application/ld+json">${json}</script>`,
  )
  return next
}

for (const page of pageHeads) {
  const appHtml = renderPage(page.path)
  if (!appHtml.includes(page.marker)) {
    throw new Error(`Prerendered HTML for ${page.path} is missing ${page.marker}`)
  }
  let html = template.replace(rootMarker, `<div id="root">${appHtml}</div>`)
  if (page.path !== '/') html = applyHead(html, page)
  const outFile = page.path === '/'
    ? templatePath
    : path.join(distDir, page.path.slice(1), 'index.html')
  fs.mkdirSync(path.dirname(outFile), { recursive: true })
  fs.writeFileSync(outFile, html)
}

const siteUrls = pageHeads.map((page) => {
  const loc = page.path === '/' ? `${origin}/` : `${origin}${page.path}`
  return `  <url><loc>${loc}</loc></url>`
})

fs.writeFileSync(
  path.join(distDir, 'sitemap-site.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${siteUrls.join('\n')}
</urlset>
`,
)

fs.writeFileSync(
  path.join(distDir, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${origin}/sitemap-site.xml</loc></sitemap>
  <sitemap><loc>${origin}/guide/sitemap.xml</loc></sitemap>
</sitemapindex>
`,
)

fs.rmSync(serverOutDir, { recursive: true, force: true })
