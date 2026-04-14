import sharp from 'sharp'
import { readFileSync } from 'fs'
import { mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUTPUT_DIR = join(__dirname, '../public/assets/images/global/social')

mkdirSync(OUTPUT_DIR, { recursive: true })

// Brand colors
const BRAND = '#14273E'
const GOLD = '#d4a853'
const WHITE = '#ffffff'
const WHITE_DIM = 'rgba(255,255,255,0.6)'

// Logo SVG path
const LOGO_PATH = join(__dirname, '../public/assets/images/global/logo/logo-light.svg')
const logoBase64 = readFileSync(LOGO_PATH).toString('base64')

function buildSVG({ title, subtitle }) {
  // Wrap long titles
  const words = title.split(' ')
  const lines = []
  let current = ''
  for (const word of words) {
    const test = current ? `${current} ${word}` : word
    if (test.length > 38) {
      lines.push(current)
      current = word
    } else {
      current = test
    }
  }
  if (current) lines.push(current)

  const titleY = lines.length === 1 ? 290 : lines.length === 2 ? 265 : 245
  const LINE_H = 68

  const titleLines = lines
    .map((line, i) => `<text x="60" y="${titleY + i * LINE_H}" font-family="Inter, Arial, sans-serif" font-size="54" font-weight="700" fill="${WHITE}">${line}</text>`)
    .join('\n    ')

  const subtitleY = titleY + lines.length * LINE_H + 28

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <!-- Background -->
  <rect width="1200" height="630" fill="${BRAND}"/>

  <!-- Accent line -->
  <rect x="0" y="0" width="6" height="630" fill="${GOLD}"/>

  <!-- Subtle grid pattern -->
  <defs>
    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#grid)"/>

  <!-- Logo -->
  <image href="data:image/svg+xml;base64,${logoBase64}" x="60" y="56" width="180" height="50"/>

  <!-- Title -->
  ${titleLines}

  <!-- Subtitle -->
  <text x="60" y="${subtitleY}" font-family="Inter, Arial, sans-serif" font-size="26" font-weight="400" fill="${WHITE_DIM}">${subtitle}</text>

  <!-- Bottom domain -->
  <text x="60" y="590" font-family="Inter, Arial, sans-serif" font-size="20" font-weight="400" fill="${GOLD}" letter-spacing="3">ELSOLAR.CO</text>

  <!-- Right decorative element -->
  <circle cx="1050" cy="315" r="240" fill="none" stroke="rgba(212,168,83,0.08)" stroke-width="1"/>
  <circle cx="1050" cy="315" r="180" fill="none" stroke="rgba(212,168,83,0.05)" stroke-width="1"/>
</svg>`
}

const pages = [
  {
    file: 'og-home.png',
    title: 'Sistemas de Crecimiento Estructurado',
    subtitle: 'El Solar Creative Group — Bogotá, Colombia',
  },
  {
    file: 'og-siv.png',
    title: 'Sistema Inteligente de Ventas B2B',
    subtitle: 'Diagnóstico · Calificación · Seguimiento con IA',
  },
  {
    file: 'og-ec.png',
    title: 'Estrategia Creativa',
    subtitle: 'Programa DWY 90 días — Contenido que convierte',
  },
  {
    file: 'og-growth-os.png',
    title: 'Cultura IA',
    subtitle: 'Inteligencia artificial integrada en tu operación',
  },
  {
    file: 'og-quienes-somos.png',
    title: 'Quiénes Somos',
    subtitle: 'Operadores de negocio que construyen sistemas',
  },
  {
    file: 'og-default.png',
    title: 'El Solar Creative Group',
    subtitle: 'No vendemos servicios. Vendemos orden.',
  },
]

for (const page of pages) {
  const svg = buildSVG({ title: page.title, subtitle: page.subtitle })
  const outPath = join(OUTPUT_DIR, page.file)
  await sharp(Buffer.from(svg))
    .png()
    .toFile(outPath)
  console.log(`✓ ${page.file}`)
}

console.log('\nOG images generated in:', OUTPUT_DIR)