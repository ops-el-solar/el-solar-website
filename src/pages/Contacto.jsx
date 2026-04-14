import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Button from '../components/Button'
import PageSEO from '../components/PageSEO'

const revenueOptions = {
  COP: [
    { value: '', label: 'Selecciona rango de facturación' },
    { value: '<10M', label: 'Menos de 10M COP/mes' },
    { value: '10-30M', label: '10M – 30M COP/mes' },
    { value: '30-100M', label: '30M – 100M COP/mes' },
    { value: '100-300M', label: '100M – 300M COP/mes' },
    { value: '>300M', label: 'Más de 300M COP/mes' },
  ],
  USD: [
    { value: '', label: 'Select revenue range' },
    { value: '<5k', label: 'Less than $5K/month' },
    { value: '5-15k', label: '$5K – $15K/month' },
    { value: '15-50k', label: '$15K – $50K/month' },
    { value: '50-150k', label: '$50K – $150K/month' },
    { value: '>150k', label: 'More than $150K/month' },
  ],
}

const services = [
  'Sistema Inteligente de Ventas',
  'Estrategia Creativa (Programa DWY)',
  'Cultura IA',
  'Google Ads / Meta Ads',
  'Automatizaciones con IA',
  'Desarrollo web e-commerce',
  'Otro',
]

export default function Contacto() {
  const [currency, setCurrency] = useState('COP')
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    revenue: '',
    service: '',
    message: '',
  })

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then((r) => r.json())
      .then((data) => {
        if (data.country_code === 'US' || data.country_code === 'CA') setCurrency('USD')
      })
      .catch(() => {})
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')

    // Build WhatsApp message
    const text = encodeURIComponent(
      `Hola, vengo desde elsolaragencia.co.\n\n*Nombre:* ${form.name}\n*Empresa:* ${form.company || 'No indicado'}\n*Email:* ${form.email}\n*Facturación:* ${form.revenue}\n*Servicio de interés:* ${form.service}\n*Mensaje:* ${form.message}`
    )
    window.open(`https://wa.me/573203223580?text=${text}`, '_blank')
    setStatus('sent')
  }

  const isFormValid =
    form.name.trim() &&
    form.email.trim() &&
    form.revenue &&
    form.service &&
    form.message.trim()

  return (
    <div className="pt-32 pb-24">
      <PageSEO
        title="Contacto — El Solar Creative Group"
        description="Agenda tu diagnóstico inteligente gratuito. Cuéntanos tu reto de negocio y evaluamos si podemos ayudarte a construir un sistema de crecimiento estructurado."
        path="/contacto"
        ogImage="og-default.png"
      />
      <section className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left col */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="block text-[10px] font-bold tracking-[0.22em] text-[var(--text-muted)] mb-6 uppercase">
              Contacto
            </span>
            <h1 className="text-5xl md:text-6xl font-light leading-tight text-[var(--text-main)] font-space mb-8 text-balance">
              Antes de trabajar<br />
              <span className="text-[var(--text-muted)]">hablemos.</span>
            </h1>
            <p className="text-[var(--text-muted)] leading-relaxed mb-12 max-w-md">
              El primer paso es una auditoría de 45 minutos sin costo. Revisamos tu situación actual, identificamos dónde se está perdiendo el dinero y evaluamos si tiene sentido trabajar juntos.
            </p>

            {/* Lo que pasa después */}
            <div className="space-y-6">
              <p className="text-[10px] font-bold tracking-[0.22em] text-[var(--text-muted)] uppercase">
                Lo que sucede después
              </p>
              {[
                'Revisas el formulario en menos de 5 minutos.',
                'Te contactamos en menos de 24 horas para agendar la auditoría.',
                'En la llamada de 45 minutos identificamos el problema central.',
                'Si hay fit, presentamos una propuesta concreta al final de la llamada.',
              ].map((step, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <span className="shrink-0 w-6 h-6 rounded-full border border-[var(--border-color)] flex items-center justify-center text-[9px] font-bold text-[var(--text-muted)]">
                    {i + 1}
                  </span>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed pt-0.5">{step}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {status === 'sent' ? (
              <div className="card-depth p-12 text-center">
                <div className="w-12 h-12 rounded-full border border-[var(--accent-blue)] flex items-center justify-center mx-auto mb-6">
                  <span className="text-[var(--accent-blue)] text-lg">✓</span>
                </div>
                <h3 className="text-2xl font-light font-space text-[var(--text-main)] mb-4">
                  Mensaje enviado
                </h3>
                <p className="text-[var(--text-muted)] leading-relaxed">
                  Se abrió WhatsApp con tu información. Si no se abrió automáticamente, escríbenos directamente al{' '}
                  <a
                    href="https://wa.me/573203223580"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--text-main)] underline underline-offset-4"
                  >
                    +57 320 3223580
                  </a>
                  .
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-8 text-xs tracking-[0.15em] uppercase text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
                >
                  Volver al formulario
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card-depth p-8 md:p-10 space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-[10px] tracking-[0.15em] uppercase text-[var(--text-muted)] mb-2">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Juan García"
                    className="w-full bg-transparent border border-[var(--border-color)] px-4 py-3 text-sm text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--text-muted)] transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[10px] tracking-[0.15em] uppercase text-[var(--text-muted)] mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="juan@tunegocio.com"
                    className="w-full bg-transparent border border-[var(--border-color)] px-4 py-3 text-sm text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--text-muted)] transition-colors"
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="block text-[10px] tracking-[0.15em] uppercase text-[var(--text-muted)] mb-2">
                    Empresa / Marca
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Nombre del negocio"
                    className="w-full bg-transparent border border-[var(--border-color)] px-4 py-3 text-sm text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--text-muted)] transition-colors"
                  />
                </div>

                {/* Revenue */}
                <div>
                  <label className="block text-[10px] tracking-[0.15em] uppercase text-[var(--text-muted)] mb-2">
                    Facturación mensual aproximada *
                  </label>
                  <select
                    name="revenue"
                    value={form.revenue}
                    onChange={handleChange}
                    required
                    className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] px-4 py-3 text-sm text-[var(--text-main)] focus:outline-none focus:border-[var(--text-muted)] transition-colors"
                  >
                    {revenueOptions[currency].map((opt) => (
                      <option key={opt.value} value={opt.value} disabled={!opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Service */}
                <div>
                  <label className="block text-[10px] tracking-[0.15em] uppercase text-[var(--text-muted)] mb-2">
                    ¿En qué podemos ayudarte? *
                  </label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    required
                    className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] px-4 py-3 text-sm text-[var(--text-main)] focus:outline-none focus:border-[var(--text-muted)] transition-colors"
                  >
                    <option value="" disabled>
                      Selecciona un servicio
                    </option>
                    {services.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[10px] tracking-[0.15em] uppercase text-[var(--text-muted)] mb-2">
                    Cuéntanos sobre tu situación *
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Qué está pasando en tu negocio, qué has intentado, cuál es el principal problema que quieres resolver..."
                    className="w-full bg-transparent border border-[var(--border-color)] px-4 py-3 text-sm text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--text-muted)] transition-colors resize-none"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    primary
                    className="w-full"
                    onClick={() => {}}
                  >
                    {status === 'sending' ? 'Enviando...' : 'Solicitar Auditoría de Fit'}
                  </Button>
                  <p className="text-[10px] text-[var(--text-muted)] text-center mt-4">
                    Se abrirá WhatsApp con tu información para agilizar la respuesta.
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  )
}