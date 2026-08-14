import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const BLOG_DIR = path.join(ROOT, 'content/blog')
const OUT_DIR = path.join(ROOT, 'public/covers')

// Charte ArabClaw
const CORAL = '#FF5A36'
const CORAL_DARK = '#E23E1C'
const INK = '#0E1116'
const INK2 = '#1A1F27'
const FONT = 'Tajawal'

const W = 1200
const H = 630

// Badge mascotte (logo) en base64, chargé une fois
const BADGE = fs.readFileSync(path.join(ROOT, 'public/mascot-badge.png')).toString('base64')

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

// Word-wrap arabe : estimation de largeur (Tajawal Bold ~0.52em/glyphe moyen)
function wrap(text, fontSize, maxWidth) {
  const words = text.trim().split(/\s+/)
  const lines = []
  let line = ''
  const charW = fontSize * 0.55
  for (const w of words) {
    const test = line ? line + ' ' + w : w
    if (test.length * charW > maxWidth && line) {
      lines.push(line)
      line = w
    } else {
      line = test
    }
  }
  if (line) lines.push(line)
  return lines.slice(0, 3)
}

// Motif thématique selon tags/slug
function motifKind(slug, tags) {
  const hay = (slug + ' ' + (tags || []).join(' ')).toLowerCase()
  if (/(install|تثبيت|windows|linux|mac|raspberry|setup)/.test(hay)) return 'install'
  if (/(security|أمان|خصوصية|privacy|backup|نسخ)/.test(hay)) return 'security'
  if (/(whatsapp|telegram|chat|رسائل|محادثة|بريد|email|mail)/.test(hay)) return 'chat'
  if (/(compar|vs|مقارنة|zapier|make|n8n)/.test(hay)) return 'compare'
  if (/(cron|automation|أتمتة|workflow|مهام)/.test(hay)) return 'automation'
  return 'network'
}

function motif(kind) {
  const c = 'rgba(255,255,255,0.10)'
  const cc = 'rgba(255,90,54,0.55)'
  switch (kind) {
    case 'install':
      return `<g transform="translate(120,300)" fill="none" stroke="${cc}" stroke-width="6">
        <rect x="0" y="0" width="150" height="150" rx="18"/>
        <path d="M75 40 v55 M50 70 l25 25 25-25" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M35 120 h80" stroke-linecap="round"/></g>`
    case 'security':
      return `<g transform="translate(120,290)" fill="none" stroke="${cc}" stroke-width="6">
        <path d="M80 0 L155 30 V95 C155 140 120 165 80 178 C40 165 5 140 5 95 V30 Z"/>
        <path d="M50 92 l22 22 42-46" stroke-linecap="round" stroke-linejoin="round"/></g>`
    case 'chat':
      return `<g transform="translate(110,300)" fill="none" stroke="${cc}" stroke-width="6">
        <rect x="0" y="0" width="160" height="110" rx="20"/><path d="M40 110 v28 l34-28"/>
        <circle cx="55" cy="55" r="7" fill="${cc}" stroke="none"/><circle cx="90" cy="55" r="7" fill="${cc}" stroke="none"/><circle cx="125" cy="55" r="7" fill="${cc}" stroke="none"/></g>`
    case 'compare':
      return `<g transform="translate(120,300)" fill="none" stroke="${cc}" stroke-width="6">
        <rect x="0" y="30" width="55" height="130" rx="10"/><rect x="90" y="0" width="55" height="160" rx="10"/>
        <path d="M-10 175 h170" stroke-linecap="round"/></g>`
    case 'automation':
      return `<g transform="translate(120,300)" fill="none" stroke="${cc}" stroke-width="6">
        <circle cx="80" cy="80" r="70"/><circle cx="80" cy="80" r="26"/>
        <path d="M80 10 v22 M80 128 v22 M10 80 h22 M128 80 h22" stroke-linecap="round"/></g>`
    default: // network
      return `<g transform="translate(115,290)" fill="none" stroke="${cc}" stroke-width="5">
        <circle cx="40" cy="40" r="16" fill="${cc}" stroke="none"/><circle cx="160" cy="20" r="12"/><circle cx="150" cy="150" r="14"/><circle cx="20" cy="150" r="12"/><circle cx="95" cy="95" r="10" fill="${cc}" stroke="none"/>
        <path d="M40 40 L95 95 M95 95 L160 20 M95 95 L150 150 M95 95 L20 150"/></g>`
  }
}

function buildSvg({ title, eyebrow }, kind) {
  const RM = 1140 // marge droite (ancrage RTL)
  const titleSize = 58
  const lines = wrap(title, titleSize, 760)
  const lineH = titleSize * 1.4
  const blockH = lines.length * lineH
  const startY = 250 + (210 - blockH) / 2 + titleSize
  const tspans = lines
    .map((l, i) => `<tspan x="${RM}" dy="${i === 0 ? 0 : lineH}">${esc(l)}</tspan>`)
    .join('')
  const eyeW = eyebrow.length * 18 + 54

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${INK}"/><stop offset="1" stop-color="${INK2}"/>
    </linearGradient>
    <linearGradient id="coral" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${CORAL}"/><stop offset="1" stop-color="${CORAL_DARK}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.18" cy="0.42" r="0.5">
      <stop offset="0" stop-color="rgba(255,90,54,0.35)"/><stop offset="1" stop-color="rgba(255,90,54,0)"/>
    </radialGradient>
    <pattern id="dots" width="26" height="26" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="2" fill="rgba(255,255,255,0.05)"/>
    </pattern>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#dots)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect x="0" y="0" width="14" height="${H}" fill="url(#coral)"/>

  ${motif(kind)}

  <!-- eyebrow -->
  <g>
    <rect x="${RM - eyeW}" y="116" width="${eyeW}" height="50" rx="25" fill="rgba(255,90,54,0.15)" stroke="${CORAL}" stroke-width="1.5"/>
    <text x="${RM - eyeW / 2}" y="150" font-family="${FONT}" font-size="24" font-weight="700" fill="${CORAL}" text-anchor="middle" direction="rtl">${esc(eyebrow)}</text>
  </g>

  <!-- title -->
  <text y="${startY}" font-family="${FONT}" font-size="${titleSize}" font-weight="700" fill="#ffffff" text-anchor="start" direction="rtl">${tspans}</text>

  <!-- footer brand lockup (droite) : logo mascotte + marque -->
  <g>
    <circle cx="${RM - 28}" cy="556" r="30" fill="${INK}" stroke="${CORAL}" stroke-width="2.5"/>
    <image href="data:image/png;base64,${BADGE}" x="${RM - 28 - 27}" y="${556 - 27}" width="54" height="54"/>
    <text x="${RM - 68}" y="565" font-family="${FONT}" font-size="29" font-weight="700" fill="#fff" text-anchor="start" direction="rtl">ArabClaw · أوبن كلاو</text>
  </g>
  <!-- watermark (coin gauche) -->
  <text x="60" y="582" font-family="${FONT}" font-size="20" font-weight="400" fill="rgba(255,255,255,0.5)" text-anchor="start">arabclaw.com</text>
</svg>`
}

async function genOne(slug, { force = false } = {}) {
  const file = path.join(BLOG_DIR, slug + '.md')
  if (!fs.existsSync(file)) throw new Error('No such article: ' + slug)
  const { data } = matter(fs.readFileSync(file, 'utf8'))
  const title = data.title || slug
  const eyebrow = (Array.isArray(data.tags) && data.tags[0]) || 'أوبن كلاو'
  const kind = motifKind(slug, data.tags)
  const out = path.join(OUT_DIR, slug + '.png')
  if (fs.existsSync(out) && !force) return { slug, skipped: true }
  const svg = buildSvg({ title, eyebrow }, kind)
  fs.mkdirSync(OUT_DIR, { recursive: true })
  await sharp(Buffer.from(svg)).png().toFile(out)
  return { slug, out, kind, eyebrow }
}

async function main() {
  const args = process.argv.slice(2)
  const force = args.includes('--force')
  const slugs = args.filter((a) => !a.startsWith('--'))
  const list = slugs.length
    ? slugs
    : fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, ''))
  let done = 0
  for (const s of list) {
    const r = await genOne(s, { force })
    if (r.skipped) continue
    done++
    console.log('✓', r.slug, '·', r.kind, '·', r.eyebrow)
  }
  console.log(`\n${done} cover(s) generated → public/covers/`)
}

main().catch((e) => { console.error(e); process.exit(1) })
