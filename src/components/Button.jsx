import { motion } from 'framer-motion'

export default function Button({ children, primary = false, onClick, className = '', as: Tag }) {
  const base = `px-6 py-3 md:px-8 md:py-4 text-[11px] tracking-[0.18em] uppercase font-medium border transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer`
  const styles = primary
    ? `bg-[var(--button-bg)] text-[var(--button-text)] border-[var(--button-bg)] hover:opacity-85`
    : `bg-transparent text-[var(--text-main)] border-[var(--border-color)] hover:border-[var(--text-main)]`

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`${base} ${styles} ${className}`}
    >
      {children}
    </motion.button>
  )
}