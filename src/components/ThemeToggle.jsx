import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle({ theme, toggleTheme }) {
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full border border-[var(--border-color)] hover:bg-[var(--accent-glow)] transition-colors duration-200"
      aria-label="Cambiar tema"
    >
      {theme === 'dark'
        ? <Sun size={16} color="var(--text-muted)" />
        : <Moon size={16} color="var(--text-muted)" />
      }
    </button>
  )
}