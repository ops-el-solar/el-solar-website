import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading'
import Button from '../components/Button'
import PageSEO from '../components/PageSEO'

// ── Glossary SVG icons ────────────────────────────────────────────────────────

function IconLLM({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="10" width="36" height="28" rx="3" stroke="currentColor" strokeWidth="1.75" />
      <path d="M14 18h20M14 24h20M14 30h12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <circle cx="38" cy="30" r="5" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" />
      <path d="M36 30l1.5 1.5L40 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconRAG({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="24" r="7" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="36" cy="24" r="7" stroke="currentColor" strokeWidth="1.75" />
      <path d="M19 24h10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M12 17V9M12 39v-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2" />
      <path d="M36 17V9M36 39v-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2" />
      <circle cx="12" cy="24" r="2.5" fill="currentColor" />
      <circle cx="36" cy="24" r="2.5" fill="currentColor" />
    </svg>
  )
}

function IconEstadoCero({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
      <circle cx="24" cy="24" r="3" fill="currentColor" />
      <path d="M24 8v4M24 36v4M8 24h4M36 24h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

// ── Ecosystem Diagram ─────────────────────────────────────────────────────────

const ecosystemNodes = [
  {
    id: 'siv',
    label: 'Sistema Inteligente\nde Ventas',
    abbr: 'SIV',
    desc: 'Arquitectura completa de adquisición: oferta, contenido, data y decisión conectados en un flujo automatizado.',
    color: '#60a5fa', // blue-400
    cx: 160,
    cy: 300,
  },
  {
    id: 'ec',
    label: 'Estrategia\nCreativa',
    abbr: 'EC',
    desc: 'Programa DWY 90 días. Construye el sistema de mensajes, creatividades y canales para vender más con menos fricción.',
    color: '#a78bfa', // violet-400
    cx: 480,
    cy: 300,
  },
  {
    id: 'growth',
    label: 'Growth OS\ncon IA',
    abbr: 'GOS',
    desc: 'El sistema nervioso que conecta ventas, operaciones y datos usando LLM y RAG entrenados con tu negocio.',
    color: '#34d399', // emerald-400
    cx: 320,
    cy: 100,
  },
]

const ecosystemEdges = [
  { from: 'siv', to: 'growth' },
  { from: 'ec', to: 'growth' },
  { from: 'siv', to: 'ec' },
]

function EcosystemDiagram() {
  const [hovered, setHovered] = useState(null)

  const nodeMap = Object.fromEntries(ecosystemNodes.map(n => [n.id, n]))

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <svg
        viewBox="0 0 640 420"
        className="w-full h-auto"
        style={{ overflow: 'visible' }}
      >
        {/* Animated connecting lines */}
        {ecosystemEdges.map(({ from, to }, i) => {
          const a = nodeMap[from]
          const b = nodeMap[to]
          const isActive = hovered === from || hovered === to
          return (
            <line
              key={i}
              x1={a.cx} y1={a.cy}
              x2={b.cx} y2={b.cy}
              stroke={isActive ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.08)'}
              strokeWidth={isActive ? 1.5 : 1}
              strokeDasharray="6 4"
              style={{ transition: 'stroke 0.3s, stroke-width 0.3s' }}
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="-20"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </line>
          )
        })}

        {/* Nodes */}
        {ecosystemNodes.map((node) => {
          const isActive = hovered === node.id
          return (
            <g
              key={node.id}
              transform={`translate(${node.cx}, ${node.cy})`}
              onMouseEnter={() => setHovered(node.id)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: 'pointer' }}
            >
              {/* Outer glow ring */}
              <circle
                r={isActive ? 52 : 44}
                fill="none"
                stroke={node.color}
                strokeOpacity={isActive ? 0.25 : 0.1}
                strokeWidth={isActive ? 1.5 : 1}
                style={{ transition: 'all 0.35s' }}
              />
              {/* Main circle */}
              <circle
                r="36"
                fill={isActive ? `${node.color}22` : 'rgba(255,255,255,0.04)'}
                stroke={node.color}
                strokeOpacity={isActive ? 0.7 : 0.35}
                strokeWidth="1.5"
                style={{ transition: 'all 0.35s' }}
              />
              {/* Abbreviation */}
              <text
                textAnchor="middle"
                dominantBaseline="middle"
                fill={node.color}
                fontSize="13"
                fontFamily="'Space Grotesk', sans-serif"
                fontWeight="500"
                fillOpacity={isActive ? 1 : 0.7}
                style={{ transition: 'fill-opacity 0.3s' }}
              >
                {node.abbr}
              </text>
              {/* Label below */}
              {node.label.split('\n').map((line, li) => (
                <text
                  key={li}
                  textAnchor="middle"
                  x="0"
                  y={52 + li * 16}
                  fill="rgba(255,255,255,0.5)"
                  fontSize="10"
                  fontFamily="'Inter', sans-serif"
                  style={{ transition: 'fill 0.3s' }}
                >
                  {line}
                </text>
              ))}
            </g>
          )
        })}
      </svg>

      {/* Hover description panel */}
      <div className="min-h-[64px] mt-4">
        <AnimatePresence mode="wait">
          {hovered && (
            <motion.div
              key={hovered}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="card-depth p-5 text-center"
            >
              <span
                className="text-[10px] font-bold tracking-[0.18em] uppercase mb-2 block"
                style={{ color: nodeMap[hovered].color }}
              >
                {nodeMap[hovered].abbr}
              </span>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                {nodeMap[hovered].desc}
              </p>
            </motion.div>
          )}
          {!hovered && (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-[11px] text-[var(--text-muted)] tracking-wide pt-3"
            >
              Pasa el cursor sobre cada nodo
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// ── Glossary interactive ──────────────────────────────────────────────────────

const glossary = [
  {
    term: 'LLM',
    full: 'Large Language Models',
    Icon: IconLLM,
    color: 'text-blue-400',
    borderColor: 'border-blue-400/20',
    bgColor: 'bg-blue-400/8',
    def: 'Modelos de lenguaje de gran escala que procesan, analizan y generan información en lenguaje natural. Son la base de herramientas como ChatGPT. En El Solar los usamos para diagnósticos, análisis de datos y generación de insights específicos para tu negocio.',
  },
  {
    term: 'RAG',
    full: 'Retrieval-Augmented Generation',
    Icon: IconRAG,
    color: 'text-violet-400',
    borderColor: 'border-violet-400/20',
    bgColor: 'bg-violet-400/8',
    def: 'Técnica que combina la búsqueda de información específica de tu empresa con la generación de respuestas inteligentes. Permite que la IA "entienda" tus datos propios — no solo información genérica de internet.',
  },
  {
    term: 'Estado Cero',
    full: 'El destino operativo',
    Icon: IconEstadoCero,
    color: 'text-emerald-400',
    borderColor: 'border-emerald-400/20',
    bgColor: 'bg-emerald-400/8',
    def: 'El punto donde todos los sistemas de tu empresa (ventas, marketing, operaciones, datos) están conectados y alineados. Lectura de datos clara, sistemas armados, ventas escalables, operaciones predecibles. Es el destino del Growth OS.',
  },
]

function GlossaryItem({ item, i }) {
  const [open, setOpen] = useState(false)
  const { Icon } = item
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.1 }}
      className={`card-depth border ${item.borderColor} overflow-hidden`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-7 flex items-center gap-5 text-left group"
        aria-expanded={open}
      >
        {/* Icon */}
        <div className={`w-12 h-12 rounded-sm border ${item.borderColor} ${item.bgColor} flex items-center justify-center shrink-0 ${item.color}`}>
          <Icon className="w-6 h-6" />
        </div>
        {/* Text */}
        <div className="flex-1 min-w-0">
          <span className={`text-xl font-space font-medium block ${item.color}`}>
            {item.term}
          </span>
          <span className="text-[10px] tracking-[0.15em] uppercase text-[var(--text-muted)]">
            {item.full}
          </span>
        </div>
        {/* Toggle indicator */}
        <span
          className="text-[var(--text-muted)] text-sm shrink-0 transition-transform duration-300"
          style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}
        >
          +
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={`px-7 pb-7 pt-0 border-t ${item.borderColor}`}>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed pt-5">
                {item.def}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ── Nivel 1 vs Nivel 2 toggle ─────────────────────────────────────────────────

const level2Services = [
  'Guía de atención al cliente con IA para e-commerce',
  'Automatizaciones de operaciones repetitivas',
  'Implementación de cultura de datos para empresas pequeñas',
  'Predicción de datos para PYMEs, medianas y grandes empresas',
  'Transformación digital completa con ecosistema de IA',
]

function NivelesTabs() {
  const [active, setActive] = useState(0)

  const tabs = [
    {
      label: 'Nivel 1',
      sublabel: 'Incluido en cada servicio',
      content: (
        <motion.div
          key="n1"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          transition={{ duration: 0.3 }}
          className="space-y-5"
        >
          <p className="text-[var(--text-muted)] leading-relaxed">
            Desde el sondeo inicial hasta la optimización continua, la IA está presente en cada
            paso de nuestros servicios. Diagnosticamos con LLM, analizamos datos con RAG, y
            cada decisión está respaldada por datos reales de tu negocio — no suposiciones.
          </p>
          <div className="p-6 bg-[var(--accent-glow)] border border-[var(--border-color)] rounded-sm">
            <p className="text-[10px] tracking-[0.15em] uppercase text-[var(--text-muted)] mb-2">Motor principal de datos</p>
            <p className="text-sm text-[var(--text-main)] leading-relaxed">
              Ventas como motor central. De ahí se desprenden datos para operaciones, administrativo,
              legal y financiera. Las ventas son siempre el motor del negocio.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            {['SIV incluido', 'Estrategia Creativa incluida', 'Diagnóstico IA incluido'].map(tag => (
              <span key={tag} className="text-[10px] tracking-[0.12em] uppercase px-3 py-1 border border-blue-400/20 text-blue-400">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      ),
    },
    {
      label: 'Nivel 2',
      sublabel: 'Para proyectos de profundidad',
      content: (
        <motion.div
          key="n2"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.3 }}
          className="space-y-5"
        >
          <p className="text-[var(--text-muted)] leading-relaxed">
            Cuando tu negocio necesita ir más allá, diseñamos un ecosistema de IA completo y
            personalizado. Un proceso estructurado que parte de entender tu propósito y hasta
            dónde quieres llegar.
          </p>
          <ul className="space-y-3">
            {level2Services.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className="flex gap-3 text-sm text-[var(--text-muted)]"
              >
                <span className="text-violet-400 shrink-0 mt-0.5">—</span>
                {item}
              </motion.li>
            ))}
          </ul>
          <p className="text-xs text-[var(--text-muted)] pt-2 border-t border-[var(--border-color)]">
            Sin precio en página — cada proyecto es personalizado según el alcance y la empresa.
          </p>
        </motion.div>
      ),
    },
  ]

  return (
    <div className="max-w-2xl">
      {/* Tab buttons */}
      <div className="flex gap-2 mb-8">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="flex-1 p-4 border text-left transition-all duration-300"
            style={{
              borderColor: active === i ? 'rgba(255,255,255,0.2)' : 'var(--border-color)',
              background: active === i ? 'rgba(255,255,255,0.04)' : 'transparent',
            }}
          >
            <span
              className="block text-[9px] font-bold tracking-[0.2em] uppercase mb-1"
              style={{ color: active === i ? (i === 0 ? '#60a5fa' : '#a78bfa') : 'var(--text-muted)' }}
            >
              {tab.label}
            </span>
            <span className="block text-xs text-[var(--text-muted)]">{tab.sublabel}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="card-depth p-8">
        <AnimatePresence mode="wait">
          {tabs[active].content}
        </AnimatePresence>
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function CulturaIA() {
  return (
    <div className="pb-24">
      <PageSEO
        title="Cultura IA — El Solar Creative Group"
        description="Implementamos inteligencia artificial en el ADN de tu empresa. Automatizaciones, flujos de decisión y sistemas operativos que escalan sin escalar el equipo."
        path="/cultura-ia"
        ogImage="og-growth-os.png"
      />

      {/* ── Hero — animated gradient ── */}
      <section className="relative flex items-end overflow-hidden" style={{ minHeight: '90vh' }}>

        {/* Animated gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, var(--color-brand-dark) 0%, var(--color-brand) 50%, #0d1f33 100%)',
            backgroundSize: '300% 300%',
            animation: 'gradientShift 8s ease infinite',
          }}
        />

        {/* Video override (if available) */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay muted loop playsInline preload="none"
          aria-hidden="true"
        >
          <source src="/assets/videos/growth-os/hero/hero-growth-os.webm" type="video/webm" />
          <source src="/assets/videos/growth-os/hero/hero-growth-os.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Grain texture */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: '128px 128px',
          }}
        />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 pb-20 pt-40">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="block text-[10px] font-bold tracking-[0.25em] text-white/50 mb-6 uppercase">
              Growth OS con IA
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-tight text-white font-space mb-8 text-balance">
              La IA no reemplaza al equipo.{' '}
              <span className="font-light" style={{ opacity: 0.6 }}>Lo multiplica.</span>
            </h1>
            <p className="text-lg text-white/70 leading-relaxed max-w-2xl mb-10 font-light">
              Diseñamos e implementamos el ecosistema de inteligencia artificial de tu negocio. Desde la
              lectura diagnóstica con LLM y RAG hasta la toma de decisiones basada en datos — todo
              construido para llevarte al Estado Cero: sistemas conectados, ventas predecibles,
              crecimiento medible.
            </p>
            <Link
              to="/contacto"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white/90 transition-colors"
            >
              Tu Diagnóstico Inteligente — Fase 1 Gratis
            </Link>
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--bg-main)] to-transparent pointer-events-none" />

        {/* Gradient animation keyframes */}
        <style>{`
          @keyframes gradientShift {
            0%   { background-position: 0% 50%; }
            50%  { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
      </section>

      {/* ── Posicionamiento ── */}
      <section className="bg-[var(--bg-secondary)] py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <SectionHeading subtitle="Posicionamiento">
                Un ecosistema de IA construido sobre tus datos.
              </SectionHeading>
              <p className="text-[var(--text-muted)] leading-relaxed">
                El Solar no implementa IA como herramienta aislada. La integramos como sistema nervioso
                de tu negocio — desde el sondeo inicial hasta la optimización continua. Cada decisión,
                cada mensaje, cada sistema está apalancado con LLM y RAG que entienden los datos
                específicos de TU empresa.
              </p>
            </div>
            <div className="card-depth p-8">
              <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-[var(--text-muted)] mb-6">
                Principio rector
              </p>
              <p className="text-xl font-light text-[var(--text-main)] font-space leading-relaxed mb-6">
                Growth OS con IA no es un servicio extra. Es algo intrínseco que está desde el día
                cero en todos los servicios de El Solar.
              </p>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                Pero si tu negocio necesita ir más profundo — automatizaciones, predicción,
                cultura de datos — existe un camino personalizado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Ecosistema diagram — fondo oscuro ── */}
      <section className="py-24" style={{ background: 'var(--color-brand-dark)' }}>
        <div className="container mx-auto px-6">
          <SectionHeading subtitle="Cómo se conectan los servicios">
            El ecosistema<br />
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>de El Solar</span>
          </SectionHeading>
          <EcosystemDiagram />
        </div>
      </section>

      {/* ── Glosario interactivo — fondo oscuro ── */}
      <section className="py-24" style={{ background: '#080808' }}>
        <div className="container mx-auto px-6">
          <SectionHeading subtitle="Glosario técnico">
            Los términos que usamos<br />
            <span className="text-[var(--text-muted)]">y lo que significan</span>
          </SectionHeading>
          <div className="grid md:grid-cols-1 gap-3 max-w-3xl">
            {glossary.map((item, i) => (
              <GlossaryItem key={i} item={item} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Nivel 1 vs Nivel 2 — toggle ── */}
      <section className="bg-[var(--bg-secondary)] py-24">
        <div className="container mx-auto px-6">
          <SectionHeading subtitle="Cómo funciona">
            Dos niveles de<br />
            <span className="text-[var(--text-muted)]">implementación</span>
          </SectionHeading>
          <NivelesTabs />
        </div>
      </section>

      {/* ── Onboarding ── */}
      <section className="bg-[var(--bg-main)] py-24">
        <div className="container mx-auto px-6">
          <SectionHeading subtitle="Proceso de onboarding — Nivel 2">
            El primer paso es<br />
            <span className="text-[var(--text-muted)]">una conversación</span>
          </SectionHeading>
          <div className="space-y-4 max-w-3xl">
            {[
              {
                num: '01',
                title: 'Reunión de Conocimiento',
                desc: 'La primera reunión es para entender el propósito de tu negocio, tu situación actual y hasta dónde quieres llegar. Sin compromisos — es una conversación para mapear el terreno.',
              },
              {
                num: '02',
                title: 'Reuniones de profundidad',
                desc: 'Reuniones según la complejidad del proyecto. Se definen objetivos, alcance, herramientas y cronograma de implementación. El número depende del tamaño del proyecto.',
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card-depth p-8 grid md:grid-cols-[80px_1fr] gap-6 items-start"
              >
                <span className="font-mono text-4xl font-light text-[var(--text-muted)] opacity-40">{step.num}</span>
                <div>
                  <h3 className="text-lg font-medium text-[var(--text-main)] font-space mb-2">{step.title}</h3>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Adaptabilidad / Estado Cero ── */}
      <section className="bg-[var(--bg-secondary)] py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading subtitle="Adaptabilidad">
                B2B o B2C,<br />
                <span className="text-[var(--text-muted)]">la metodología se adapta</span>
              </SectionHeading>
              <p className="text-[var(--text-muted)] leading-relaxed">
                La metodología de Growth OS con IA se adapta a la naturaleza de cada negocio. B2B o B2C,
                mayorista o retail, producto o servicio — simplemente se construye lo que tu negocio
                necesita. La IA se entrena con tus datos, tu mercado y tus objetivos.
              </p>
            </div>
            <div className="card-depth p-10">
              <h3 className="text-lg font-space font-medium text-[var(--text-main)] mb-6">
                El Estado Cero — El destino
              </h3>
              <p className="text-[var(--text-muted)] leading-relaxed mb-6">
                El Estado Cero es donde todo converge: datos de ventas fluyendo, sistemas conectados,
                operaciones predecibles, decisiones basadas en evidencia. No es un destino estático —
                es un estado operativo donde tu negocio funciona con claridad. Growth OS con IA es el
                camino para llegar ahí.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Datos conectados', 'Ventas escalables', 'Decisiones predecibles', 'Operaciones fluidas'].map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] tracking-[0.15em] uppercase px-3 py-1 border border-[var(--border-color)] text-[var(--text-muted)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[var(--bg-main)] py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card-depth p-12 md:p-16 text-center max-w-3xl mx-auto"
          >
            <span className="block text-[10px] font-bold tracking-[0.22em] text-[var(--text-muted)] mb-6 uppercase">
              Siguiente paso
            </span>
            <h2 className="text-3xl md:text-4xl font-light font-space text-[var(--text-main)] mb-6 text-balance">
              ¿Tu negocio es el fit correcto?
            </h2>
            <p className="text-[var(--text-muted)] mb-10 leading-relaxed text-sm">
              La única forma de saberlo es hablando. Sin compromisos, sin propuesta de venta en la primera conversación.
            </p>
            <Link to="/contacto">
              <Button primary>Tu Diagnóstico Inteligente — Fase 1 Gratis</Button>
            </Link>
            <p className="mt-4 text-xs text-[var(--text-muted)]">
              Sin precio en página — cada proyecto es personalizado según el alcance y la empresa.
            </p>
          </motion.div>
        </div>
      </section>

    </div>
  )
}