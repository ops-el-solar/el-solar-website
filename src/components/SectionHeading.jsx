import { motion } from 'framer-motion'

export default function SectionHeading({ children, subtitle }) {
  return (
    <div className="mb-16 md:mb-20">
      {subtitle && (
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="block text-[10px] font-bold tracking-[0.22em] text-[var(--text-muted)] mb-4 uppercase"
        >
          {subtitle}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-[var(--text-main)] text-balance font-space"
      >
        {children}
      </motion.h2>
    </div>
  )
}