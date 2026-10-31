import { build } from 'vite'
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const serverOutDir = path.resolve('dist/server')

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

const { renderPage } = await import(pathToFileURL(path.join(serverOutDir, entry)).href)
const appHtml = renderPage()

if (!appHtml.includes('Track every expense')) {
  throw new Error('Prerendered HTML is missing the headline')
}

const indexPath = path.resolve('dist/index.html')
const template = fs.readFileSync(indexPath, 'utf8')
const marker = '<div id="root"></div>'

if (!template.includes(marker)) {
  throw new Error('Root placeholder missing from dist/index.html')
}

fs.writeFileSync(indexPath, template.replace(marker, `<div id="root">${appHtml}</div>`))
fs.rmSync(serverOutDir, { recursive: true, force: true })
