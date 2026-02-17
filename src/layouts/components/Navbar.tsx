import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'home',
        'products',
        'about',
        'features',
        'where-to-buy',
        'cta',
      ]
      let current = 'home'

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100) {
            current = section
          }
        }
      }
      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#products', label: 'Productos', id: 'products' },
    { href: '#about', label: 'Nuestra Historia', id: 'about' },
    { href: '#features', label: 'Esencia', id: 'features' },
    { href: '#where-to-buy', label: 'Encuéntranos', id: 'where-to-buy' },
  ]

  return (
    <nav className="bg-background/80 sticky top-0 z-50 flex w-full items-center justify-between px-6 py-3 backdrop-blur-lg md:px-12">
      <a
        href="/"
        className="text-primary flex items-center gap-2 transition-opacity hover:opacity-80"
      >
        <span className="font-heading text-foreground text-2xl font-bold">
          Mininos Café
        </span>
      </a>

      {/* Desktop Nav */}
      <div className="hidden items-center gap-8 font-medium md:flex">
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            className={`font-heading relative w-fit transition-colors duration-300 ${
              activeSection === link.id
                ? 'text-primary'
                : 'text-muted-foreground hover:text-primary'
            }`}
          >
            <span className="relative z-10">{link.label}</span>

            {/* El truco de la transición está aquí */}
            {activeSection === link.id && (
              <motion.div
                layoutId="activeTab"
                className="bg-primary absolute right-0 bottom-0 left-0 h-1 rounded-full"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </a>
        ))}

        <a href="/join">
          <button className="font-heading cta-btn font-medium">
            Contáctanos
          </button>
        </a>
      </div>

      {/* Mobile Nav Toggle */}
      <button
        className="text-foreground bg-primary/10 hover:bg-primary/25 rounded-full p-2 transition-colors md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-x"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M18 6l-12 12"></path>
            <path d="M6 6l12 12"></path>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-menu-2"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M4 6l16 0"></path>
            <path d="M4 12l16 0"></path>
            <path d="M4 18l16 0"></path>
          </svg>
        )}
      </button>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border-border/60 absolute top-full right-4 left-4 z-50 mt-2 flex w-[calc(100%-2rem)] flex-col gap-6 rounded-2xl border p-8 shadow-2xl md:hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`w-fit text-lg font-medium transition-colors ${
                activeSection === link.id ? 'text-primary' : 'text-foreground'
              }`}
            >
              {link.label}
            </a>
          ))}
          <div className="border-border/40 border-t pt-6">
            <a href="/join" onClick={() => setIsOpen(false)}>
              <button className="cta-btn font-heading w-full font-medium">
                Contáctanos
              </button>
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  )
}
