import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading'
import Button from '../components/Button'
import PageSEO from '../components/PageSEO'

const team = [
  {
    name: 'Juan Manuel Plazas',
    role: 'CEO · Ventas y Estrategia',
    bio: 'Operador de negocios con formación en narrativa, comunicación estratégica e IA aplicada. Lidera ventas, relaciones con clientes y la dirección de El Solar. Diseña sistemas de decisión con Claude Code y herramientas de IA para optimizar operaciones y escalar resultados. Obsesionado con que los sistemas funcionen sin supervisión constante.',
    img: '/assets/images/quienes-somos/team/juan-manuel-plazas.webp',
  },
  {
    name: 'Juan Pablo Ruiz Jara',
    role: 'Dirección de Estrategia',
    bio: 'Arquitecto de campañas data driven. Traduce objetivos de negocio en estructuras de medios y mensajes que generan resultados predecibles. Integra IA en cada capa del análisis estratégico — desde el diagnóstico de audiencia hasta la optimización de pauta — y lidera equipos de alto rendimiento orientados a métricas reales.',
    img: '/assets/images/quienes-somos/team/juan-pablo-ruiz.webp',
  },
  {
    name: 'Alejandra Diaz',
    role: 'Gestión y Retención',
    bio: 'Punto de contacto principal para clientes activos. Garantiza que los resultados se entreguen a tiempo, que la comunicación sea clara y que el cliente entienda qué está pasando con su inversión. Aplica IA en la gestión de procesos, automatización de seguimiento y análisis de satisfacción para escalar la retención sin escalar el equipo.',
    img: '/assets/images/quienes-somos/team/alejandra-diaz.webp',
  },
  {
    name: 'Diego Lozano',
    role: 'Contenido IA y Producción masiva',
    bio: 'Combina dirección creativa con producción asistida por IA para escalar el volumen sin perder la calidad. Responsable de creatividades, guiones de video y librería de formatos. Lidera la producción con herramientas de IA generativa para garantizar que el mensaje correcto tenga la forma correcta — en cada plataforma y a escala.',
    img: '/assets/images/quienes-somos/team/diego-lozano.webp',
  },
]

const values = [
  {
    title: 'Resultados primero',
    desc: 'Todo se mide. Todo se reporta. Si no podemos demostrarte que la inversión tiene sentido, no la hacemos.',
  },
  {
    title: 'Claridad sobre brillo',
    desc: 'Un mensaje claro que llega al cliente correcto supera cualquier producción espectacular sin estrategia detrás.',
  },
  {
    title: 'Sistemas, no heroísmos',
    desc: 'No somos una agencia que vive de reacciones. Construimos procesos que funcionan aunque el fundador esté de vacaciones.',
  },
  {
    title: 'Fit antes que dinero',
    desc: 'Solo tomamos clientes donde podemos impactar de verdad. Si no eres el fit correcto, te lo decimos antes de cobrar.',
  },
]

export default function QuienesSomos() {
  return (
    <div className="pb-24">
      <PageSEO
        title="Quiénes Somos — El Solar Creative Group"
        description="Somos un equipo de 4 operadores de negocios que usan IA para diseñar sistemas de crecimiento estructurado. Basados en Bogotá, trabajamos con empresas en Latinoamérica."
        path="/quienes-somos"
        ogImage="og-quienes-somos.png"
      />
      {/* Hero — brand color solid background */}
      <section
        className="relative flex items-end overflow-hidden"
        style={{
          minHeight: '80vh',
          background: 'linear-gradient(135deg, var(--color-brand-dark) 0%, var(--color-brand) 60%, var(--color-brand-light) 100%)',
        }}
      >
        {/* Grain texture */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: '128px 128px',
          }}
        />
        {/* Bottom fade to bg */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--bg-main)] to-transparent pointer-events-none" />

        <div className="relative z-10 container mx-auto px-6 pb-20 pt-40">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="block text-[10px] font-bold tracking-[0.25em] text-white/50 mb-6 uppercase">
              Quiénes Somos
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-tight text-white font-space mb-8 text-balance">
              Somos una agencia data driven con sistemas de IA para tu negocio.
            </h1>
            <p className="text-lg text-white/70 leading-relaxed max-w-2xl mb-10 font-light">
              Desarrollamos sistemas operativos con inteligencia artificial para empresas que quieren crecer
              con datos, no con suposiciones. Performance, data driven, tecnología aplicada a ventas,
              mercadeo y operaciones.
            </p>
            <Link
              to="/contacto"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white/90 transition-colors"
            >
              Tu Diagnóstico Inteligente — Fase 1 Gratis
            </Link>
          </motion.div>
        </div>
      </section>

      {/* El Manifiesto */}
      <section className="bg-[var(--bg-section)] py-24 mt-16 mb-28">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <SectionHeading subtitle="El Manifiesto">
              Empezamos como<br />
              <span className="text-[var(--text-muted)]">lo que criticábamos</span>
            </SectionHeading>
            <div className="space-y-6 pt-4 text-[var(--text-muted)] leading-relaxed">
              <p>
                Somos dueños de negocios. Nerdos y obsesionados de tecnología y negocios que vimos de cerca
                cómo funciona la industria: equipos inflados, reportes que se ven bien pero no explican nada,
                y clientes que pagan meses sin saber si están creciendo. Nos dimos cuenta de algo simple:
                los resultados están en la ejecución y los accionables, no en los informes.
              </p>
              <p>
                Nuestra regla como agencia: trabajar solo con clientes donde podamos demostrar impacto
                medible en un tiempo concreto. Si no podemos entregarle valor real en ese periodo,
                no es el cliente correcto.
              </p>
              <p>
                Eso nos obligó a dar un paso atrás. Organizar para ejecutar bien. Construir sistemas,
                no servicios. Documentar procesos. Y decir que no a contratos grandes con fit malo.
              </p>
              <p className="text-[var(--text-main)] font-medium">
                Nos enfocamos en tener 3 a 5 clientes ancla activos por servicio. Nos interesan empresas
                con crecimiento sostenido, equilibrado, abiertas a implementar tecnología e IA en sus
                sistemas de ventas, mercadeo y operaciones. No nos interesa trabajar con Coca-Cola ni
                McDonald's — nos interesa el crecimiento mutuo, uno a uno.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section className="container mx-auto px-6 mb-28">
        <SectionHeading subtitle="El equipo">
          Las personas detrás<br />
          <span className="text-[var(--text-muted)]">del trabajo</span>
        </SectionHeading>
        <p className="text-[var(--text-muted)] text-sm mb-10 -mt-4 max-w-xl">
          Nerdos y obsesionados por negocios y tecnología.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="card-depth p-6 flex flex-col transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
            >
              {/* Photo */}
              <div className="w-full aspect-square rounded-lg overflow-hidden mb-5 bg-[var(--border-color)]">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    const initials = member.name.split(' ').map(n => n[0]).join('').slice(0, 2)
                    e.target.parentElement.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:2rem;font-weight:500;color:var(--text-muted);background:var(--bg-secondary)">${initials}</div>`
                  }}
                />
              </div>
              <h3 className="text-base font-medium text-[var(--text-main)] font-space mb-1 leading-snug">
                {member.name}
              </h3>
              <span className="text-[10px] tracking-[0.15em] uppercase text-[var(--text-muted)] block mb-3">
                {member.role}
              </span>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed flex-1">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Fundamentos */}
      <section className="container mx-auto px-6 mb-28">
        <SectionHeading subtitle="Fundamentos">
          Los cimientos de<br />
          <span className="text-[var(--text-muted)]">nuestro negocio</span>
        </SectionHeading>
        <div className="grid md:grid-cols-2 gap-4">
          {values.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-depth p-8"
            >
              <div className="w-8 h-px bg-[var(--accent-blue)] mb-5" />
              <h3 className="text-xl font-medium text-[var(--text-main)] font-space mb-3">
                {item.title}
              </h3>
              <p className="text-[var(--text-muted)] leading-relaxed text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card-depth p-12 md:p-16 text-center max-w-2xl mx-auto"
        >
          <span className="block text-[10px] font-bold tracking-[0.22em] text-[var(--text-muted)] mb-6 uppercase">
            Siguiente paso
          </span>
          <h2 className="text-3xl md:text-4xl font-light font-space text-[var(--text-main)] mb-6 text-balance">
            ¿Tu negocio es el fit correcto?
          </h2>
          <p className="text-[var(--text-muted)] mb-10 leading-relaxed text-sm">
            La única forma de saberlo es hablando. 45 minutos, sin compromiso, sin propuesta de venta en la primera llamada.
          </p>
          <a href="https://tidycal.com/elsolar/sesion-de-diagnostico-auditoria-de-adquisicion-b2b" target="_blank" rel="noopener noreferrer">
            <Button primary>Tu Diagnóstico Inteligente — Fase 1 Gratis</Button>
          </a>
        </motion.div>
      </section>
    </div>
  )
}