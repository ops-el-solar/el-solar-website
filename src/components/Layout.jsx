import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppFloat from './WhatsAppFloat'

export default function Layout({ children, theme, toggleTheme }) {
  return (
    <>
      <div className="noise-overlay" />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>{children}</main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}